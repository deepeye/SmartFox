import { ENABLE_FEATURE_PREVIEW } from '@/config'
import { accountCommand } from './account'
import { createCommand } from './create'
import { goCommand } from './go'
import { languageCommand } from './language'
import { modelsCommand } from './models'
import { refineCommand } from './refine'
import { SlashCommandRegistry } from './registry'
import { themeCommand } from './theme'

export const slashCommandRegistry = new SlashCommandRegistry([
  themeCommand,
  languageCommand,
  modelsCommand,
  accountCommand,
  goCommand,
  ...(ENABLE_FEATURE_PREVIEW ? [createCommand, refineCommand] : []),
])
