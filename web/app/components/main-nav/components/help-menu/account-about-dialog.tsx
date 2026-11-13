'use client'
import type { LangGeniusVersionInfo } from '@/context/app-context-types'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogHeaderCloseButton,
  DialogTitle,
} from '@langgenius/dify-ui/dialog'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { SmartFoxLogo } from '@/app/components/base/logo/smartfox-logo'

type AccountAboutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  langGeniusVersionInfo: LangGeniusVersionInfo
}

export default function AccountAboutDialog({
  open,
  onOpenChange,
  langGeniusVersionInfo,
}: AccountAboutDialogProps) {
  const { t } = useTranslation(['common'])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t(($) => $['userProfile.about'], { ns: 'common' })}
          </DialogTitle>
          <DialogHeaderCloseButton aria-label={t(($) => $['operation.close'], { ns: 'common' })} />
        </DialogHeader>
        <DialogBody className="flex flex-col items-center gap-4">
          <SmartFoxLogo alt="SmartFox" size="large" className="mx-auto" />

          <div className="text-center system-xs-regular text-text-tertiary">
            Version {langGeniusVersionInfo.current_version}
          </div>
          <div className="flex flex-col items-center gap-2 text-center system-xs-regular text-text-secondary">
            <div>©{dayjs().year()} LangGenius, Inc., Contributors.</div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
