'use client'

import type { GetAccountProfileResponse } from '@dify/contracts/api/console/account/types.gen'
import type { GetWorkspacesCurrentSummaryResponse } from '@dify/contracts/api/console/workspaces/types.gen'
import { useAtomValue } from 'jotai'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef, useSyncExternalStore } from 'react'
import { setUserId, setUserProperties } from '@/app/components/base/amplitude'
import {
  flushRegistrationSuccess,
  getRegistrationSuccessSnapshot,
  subscribeRegistrationSuccess,
} from '@/app/components/base/amplitude/registration-tracking'
import { useAmplitudeInitialized } from '@/app/components/base/amplitude/use-amplitude-initialized'
import { useAnalyticsConsent } from '@/app/components/base/analytics-consent/consent-store'
import { currentWorkspaceAtom } from '@/context/workspace-state'
import { userProfileQueryOptions } from '@/features/account-profile/client'

type AmplitudeProperties = Record<string, string | number | boolean>

function buildAmplitudeProperties({
  currentWorkspace,
  userProfile,
}: {
  currentWorkspace: GetWorkspacesCurrentSummaryResponse
  userProfile: GetAccountProfileResponse
}) {
  const properties: AmplitudeProperties = {
    email: userProfile.email,
    name: userProfile.name,
    has_password: userProfile.is_password_set,
  }

  if (currentWorkspace.id) {
    properties.workspace_id = currentWorkspace.id
    properties.workspace_name = currentWorkspace.name
    if (currentWorkspace.plan) properties.workspace_plan = currentWorkspace.plan
    properties.workspace_role = currentWorkspace.role
  }

  return properties
}

export function AmplitudeIdentitySync() {
  const { data: userProfile } = useSuspenseQuery({
    ...userProfileQueryOptions(),
    select: (data) => data.profile,
  })
  const currentWorkspace = useAtomValue(currentWorkspaceAtom)
  const lastIdentityRef = useRef<string | undefined>(undefined)
  const registrationSnapshot = useSyncExternalStore(
    subscribeRegistrationSuccess,
    getRegistrationSuccessSnapshot,
    getRegistrationSuccessSnapshot,
  )

  useEffect(() => {
    if (!userProfile.id) return

    const properties = buildAmplitudeProperties({
      currentWorkspace,
      userProfile,
    })
    const identity = JSON.stringify({
      userId: userProfile.email,
      properties,
    })

    if (identity !== lastIdentityRef.current) {
      setUserId(userProfile.email)
      setUserProperties(properties)
      lastIdentityRef.current = identity
    }

    void flushRegistrationSuccess()
  }, [currentWorkspace, registrationSnapshot, userProfile])

  return null
}

export function ExternalServiceSync() {
  const analyticsConsent = useAnalyticsConsent()
  const amplitudeInitialized = useAmplitudeInitialized()

  return (
    <Fragment>
      {analyticsConsent === 'granted' && amplitudeInitialized && <AmplitudeIdentitySync />}
    </Fragment>
  )
}
