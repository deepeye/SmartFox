import type { ComponentProps, ReactNode } from 'react'
import { DOC_LINKS_ENABLED } from '@/features/branding'

type DocLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  children: ReactNode
}

export function DocLink({ href, children, target, rel, ...props }: DocLinkProps) {
  if (!DOC_LINKS_ENABLED) {
    const { className } = props
    return <span className={className}>{children}</span>
  }

  return (
    <a {...props} href={href} target={target ?? '_blank'} rel={rel ?? 'noopener noreferrer'}>
      {children}
    </a>
  )
}
