#!/usr/bin/env node
// Fails when user-visible Dify branding is left in the rebranded surfaces.
// Technical identifiers (plugin compatibility, CLI, protocol headers) and
// locales outside en-US/zh-Hans are intentionally out of scope.
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = path.resolve(import.meta.dirname, '..')
const issues = []

const localeFiles = ['en-US', 'zh-Hans']
const localeAllowlist = new Set([
  'difyVersionNotCompatible',
  'details.notDifyAccount',
  'ssoError.emailBelongsToDifyAccount',
])
const skipLocaleFiles = new Set(['billing.json', 'education.json'])
// Third-party tool and protocol identifiers that intentionally keep their name.
const allowedTokens = /Difyctl|Dify-WebClient|X-Dify-SSO-Token/g

for (const locale of localeFiles) {
  const dir = path.join(root, 'web/i18n/locales', locale)
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith('.json') || skipLocaleFiles.has(name))
      continue
    const entries = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'))
    for (const [key, value] of Object.entries(entries)) {
      if (localeAllowlist.has(key) || typeof value !== 'string')
        continue
      if (/Dify/.test(value.replace(allowedTokens, '')))
        issues.push(`${locale}/${name} ${key}: ${value}`)
    }
  }
}

for (const file of fs.globSync('api/templates/**/*.html', { cwd: root })) {
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  if (/Dify|dify\.ai/.test(text))
    issues.push(`${file}: contains Dify branding`)
}

const jsxRoots = ['web/app', 'web/features']
for (const jsxRoot of jsxRoots) {
  for (const file of fs.globSync(`${jsxRoot}/**/*.tsx`, { cwd: root })) {
    if (file.includes('/__tests__/') || file.includes('.stories.'))
      continue
    const text = fs.readFileSync(path.join(root, file), 'utf8')
    if (/alt="Dify"|aria-label="Dify/.test(text))
      issues.push(`${file}: Dify alt/aria-label`)
  }
}

if (issues.length) {
  console.error('Brand residue found:')
  for (const issue of issues)
    console.error(`  ${issue}`)
  process.exit(1)
}

console.log('No Dify branding left in user-visible surfaces.')
