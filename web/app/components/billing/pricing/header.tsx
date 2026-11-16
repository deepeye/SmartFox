import { DialogDescription, DialogTitle } from '@langgenius/dify-ui/dialog'
import { useTranslation } from 'react-i18next'
import { SmartFoxLogo } from '@/app/components/base/logo/smartfox-logo'

export default function Header() {
  const { t } = useTranslation(['billing'])

  return (
    <div className="min-h-16 pe-11">
      <DialogTitle>
        <span className="flex items-center gap-2 text-2xl leading-[37px] font-normal">
          <SmartFoxLogo alt="" size="large" />
          <span>Cloud</span>
        </span>
      </DialogTitle>
      <DialogDescription>
        <span className="mt-[3px] block font-[PricingInter,sans-serif] text-base leading-6 text-text-tertiary">
          {t(($) => $['plansCommon.title.description'])}
        </span>
      </DialogDescription>
    </div>
  )
}
