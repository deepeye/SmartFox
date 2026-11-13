import type { VariantProps } from 'class-variance-authority'
import { cn } from '@langgenius/dify-ui/cn'
import { cva } from 'class-variance-authority'
import { BRAND_NAME } from '@/features/branding'
import { basePath } from '@/utils/var'

const smartFoxLogoVariants = cva('inline-flex select-none items-center gap-1.5 align-middle', {
  variants: {
    size: {
      small: 'h-4',
      medium: 'h-5.5',
      large: 'h-7',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const smartFoxWordmarkVariants = cva('whitespace-nowrap leading-none text-text-primary', {
  variants: {
    size: {
      small: 'system-sm-semibold',
      medium: 'system-md-semibold',
      large: 'system-xl-semibold',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

export type SmartFoxLogoProps = {
  alt: string
  className?: string
  size?: VariantProps<typeof smartFoxLogoVariants>['size']
}

export function SmartFoxLogo({ alt, className, size }: SmartFoxLogoProps) {
  return (
    <span
      role="img"
      aria-label={alt || BRAND_NAME}
      className={cn(smartFoxLogoVariants({ size }), className)}
    >
      <img
        src={`${basePath}/logo/smartfox-icon.svg`}
        alt=""
        aria-hidden
        className="block h-full w-auto shrink-0"
      />
      <span aria-hidden className={smartFoxWordmarkVariants({ size })}>
        {BRAND_NAME}
      </span>
    </span>
  )
}
