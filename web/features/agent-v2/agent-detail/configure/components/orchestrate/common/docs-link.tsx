import type { ReactNode } from 'react'
import { DocLink } from '@/features/branding/doc-link'

export function DocsLink({ children, href }: { children?: ReactNode; href: string }) {
  return (
    <DocLink href={href} className="text-text-accent hover:underline">
      {children}
    </DocLink>
  )
}
