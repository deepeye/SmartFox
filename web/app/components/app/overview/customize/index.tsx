'use client'

import type { ReactNode } from 'react'
import { Button, buttonVariants } from '@langgenius/dify-ui/button'
import { cn } from '@langgenius/dify-ui/cn'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeaderCloseButton,
  DialogTitle,
  DialogTrigger,
} from '@langgenius/dify-ui/dialog'
import { useTranslation } from 'react-i18next'
import { useDocLink } from '@/context/i18n'
import { DocLink } from '@/features/branding/doc-link'

type CustomizeDialogProps = {
  disabled?: boolean
  triggerLabel?: string
  api_base_url: string
  appId: string
}

const StepNum = ({ children }: { children: ReactNode }) => (
  <div className="me-3 flex size-7 shrink-0 items-center justify-center rounded-2xl bg-util-colors-blue-blue-50 text-text-accent">
    {children}
  </div>
)

const prefixCustomize = 'overview.appInfo.customize'

export function CustomizeDialog({
  disabled,
  triggerLabel,
  appId,
  api_base_url,
}: CustomizeDialogProps) {
  const { t } = useTranslation(['appOverview', 'common'])
  const docLink = useDocLink()
  const apiDocLink = docLink('/api-reference/guides/get-started')

  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        render={<Button variant="secondary" className="flex items-center gap-1 px-3" />}
      >
        <span aria-hidden className="i-custom-vender-deploy-code-block size-4" />
        {triggerLabel ?? t(($) => $['overview.appInfo.customize.entry'], { ns: 'appOverview' })}
      </DialogTrigger>
      <DialogContent className="w-160">
        <DialogHeader>
          <DialogTitle>
            {t(($) => $[`${prefixCustomize}.title`], { ns: 'appOverview' })}
          </DialogTitle>
          <DialogDescription>
            {t(($) => $[`${prefixCustomize}.explanation`], { ns: 'appOverview' })}
          </DialogDescription>
          <DialogHeaderCloseButton aria-label={t(($) => $['operation.close'], { ns: 'common' })} />
        </DialogHeader>
        <DialogBody>
          <div className="w-full rounded-lg border-[0.5px] border-components-panel-border px-6 py-5">
            <span className="inline-flex shrink-0 rounded-[5px] border border-text-accent-secondary bg-components-badge-bg-dimm px-1 py-0.5 system-2xs-medium-uppercase text-text-accent-secondary">
              {t(($) => $[`${prefixCustomize}.way`], { ns: 'appOverview' })} 1
            </span>
            <p className="my-2 system-sm-medium text-text-secondary">
              {t(($) => $[`${prefixCustomize}.way1.name`], { ns: 'appOverview' })}
            </p>
            <div className="flex py-4">
              <StepNum>1</StepNum>
              <div className="flex flex-col">
                <div className="text-text-primary">
                  {t(($) => $[`${prefixCustomize}.way1.step1`], { ns: 'appOverview' })}
                </div>
                <div className="mt-1 mb-2 text-xs text-text-tertiary">
                  {t(($) => $[`${prefixCustomize}.way1.step1Tip`], { ns: 'appOverview' })}
                </div>
              </div>
            </div>
            <div className="flex pt-4">
              <StepNum>2</StepNum>
              <div className="flex flex-col">
                <div className="text-text-primary">
                  {t(($) => $[`${prefixCustomize}.way1.step2`], { ns: 'appOverview' })}
                </div>
                <div className="mt-1 mb-2 text-xs text-text-tertiary">
                  {t(($) => $[`${prefixCustomize}.way1.step2Tip`], { ns: 'appOverview' })}
                </div>
                <a
                  href="https://vercel.com/docs/concepts/deployments/git/vercel-for-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants()}
                >
                  <div className="border-s-[7px] border-e-[7px] border-t-0 border-b-12 border-solid border-text-primary border-s-transparent border-e-transparent border-t-transparent"></div>
                  <span>
                    {t(($) => $[`${prefixCustomize}.way1.step2Operation`], { ns: 'appOverview' })}
                  </span>
                </a>
              </div>
            </div>
            <div className="flex py-4">
              <StepNum>3</StepNum>
              <div className="flex w-full flex-col overflow-hidden">
                <div className="text-text-primary">
                  {t(($) => $[`${prefixCustomize}.way1.step3`], { ns: 'appOverview' })}
                </div>
                <div className="mt-1 mb-2 text-xs text-text-tertiary">
                  {t(($) => $[`${prefixCustomize}.way1.step3Tip`], { ns: 'appOverview' })}
                </div>
                <pre className="box-border overflow-x-scroll rounded-lg border-[0.5px] border-components-panel-border bg-background-section px-4 py-3 text-xs font-medium text-text-secondary select-text">
                  NEXT_PUBLIC_APP_ID=
                  {`'${appId}'`} <br />
                  NEXT_PUBLIC_APP_KEY=
                  {"'<Web API Key From Dify>'"} <br />
                  NEXT_PUBLIC_API_URL=
                  {`'${api_base_url}'`}
                </pre>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full rounded-lg border-[0.5px] border-components-panel-border px-6 py-5">
            <span className="inline-flex shrink-0 rounded-[5px] border border-text-accent-secondary bg-components-badge-bg-dimm px-1 py-0.5 system-2xs-medium-uppercase text-text-accent-secondary">
              {t(($) => $[`${prefixCustomize}.way`], { ns: 'appOverview' })} 2
            </span>
            <p className="my-2 system-sm-medium text-text-secondary">
              {t(($) => $[`${prefixCustomize}.way2.name`], { ns: 'appOverview' })}
            </p>
            <DocLink href={apiDocLink} className={cn(buttonVariants(), 'mt-2')}>
              <span className="text-sm text-text-secondary">
                {t(($) => $[`${prefixCustomize}.way2.operation`], { ns: 'appOverview' })}
              </span>
              <span
                aria-hidden="true"
                className="i-heroicons-arrow-top-right-on-square size-4 shrink-0 text-text-secondary"
              />
            </DocLink>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
