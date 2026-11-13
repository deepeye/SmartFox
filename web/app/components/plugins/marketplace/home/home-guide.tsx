'use client'

import { SubmitRequestMenu } from '@/app/components/plugins/plugin-page/nav-operations'

export default function HomeGuide() {
  // Standalone Marketplace and the embedded console share the same menu now
  // that it only links to the creator center.
  return <SubmitRequestMenu dividerAfterFirst />
}
