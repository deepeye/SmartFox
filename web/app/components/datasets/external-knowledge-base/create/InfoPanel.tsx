import { RiBookOpenLine } from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import { useDocLink } from '@/context/i18n'
import { DocLink } from '@/features/branding/doc-link'

const InfoPanel = () => {
  const { t } = useTranslation(['dataset'])
  const docLink = useDocLink()

  return (
    <div className="flex w-90 flex-col items-start pe-8 pt-27 pb-2">
      <div className="flex w-full min-w-60 flex-col items-start gap-3 self-stretch rounded-xl bg-background-section p-6">
        <div className="flex h-10 w-10 grow items-center justify-center gap-2 self-stretch rounded-lg border-[0.5px] border-components-card-border bg-components-card-bg p-1">
          <RiBookOpenLine className="size-5 text-text-accent" />
        </div>
        <p className="flex flex-col items-start gap-2 self-stretch">
          <span className="self-stretch system-xl-semibold text-text-secondary">
            {t(($) => $['connectDatasetIntro.title'], { ns: 'dataset' })}
          </span>
          <span className="system-sm-regular text-text-tertiary">
            {t(($) => $['connectDatasetIntro.content.front'], { ns: 'dataset' })}
            <DocLink
              className="ms-1 system-sm-regular text-text-accent"
              href={docLink('/use-dify/knowledge/external-knowledge-api')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(($) => $['connectDatasetIntro.content.link'], { ns: 'dataset' })}
            </DocLink>
            {t(($) => $['connectDatasetIntro.content.end'], { ns: 'dataset' })}
          </span>
          <DocLink
            className="self-stretch system-sm-regular text-text-accent"
            href={docLink('/use-dify/knowledge/connect-external-knowledge-base')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(($) => $['connectDatasetIntro.learnMore'], { ns: 'dataset' })}
          </DocLink>
        </p>
      </div>
    </div>
  )
}

export default InfoPanel
