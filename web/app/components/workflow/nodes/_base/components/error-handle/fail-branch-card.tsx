import { RiMindMap } from '@remixicon/react'
import { useTranslation } from 'react-i18next'
import { useDocLink } from '@/context/i18n'
import { DocLink } from '@/features/branding/doc-link'

const FailBranchCard = () => {
  const { t } = useTranslation(['workflow'])
  const docLink = useDocLink()

  return (
    <div className="px-4 pt-2">
      <div className="rounded-[10px] bg-workflow-process-bg p-4">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-[10px] border-[0.5px] border-components-card-border bg-components-card-bg shadow-lg">
          <RiMindMap className="size-5 text-text-tertiary" />
        </div>
        <div className="mb-1 system-sm-medium text-text-secondary">
          {t(($) => $['nodes.common.errorHandle.failBranch.customize'], { ns: 'workflow' })}
        </div>
        <div className="system-xs-regular text-text-tertiary">
          {t(($) => $['nodes.common.errorHandle.failBranch.customizeTip'], { ns: 'workflow' })}
          &nbsp;
          <DocLink
            href={docLink('/use-dify/debug/error-type')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-accent"
          >
            {t(($) => $['common.learnMore'], { ns: 'workflow' })}
          </DocLink>
        </div>
      </div>
    </div>
  )
}

export default FailBranchCard
