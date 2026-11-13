'use client'
import { Button } from '@langgenius/dify-ui/button'
import { Field, FieldError, FieldLabel, FieldValidity } from '@langgenius/dify-ui/field'
import { Form } from '@langgenius/dify-ui/form'
import { Input } from '@langgenius/dify-ui/input'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useLocale } from '#i18n'
import Split from '@/app/(auth)/signin/split'
import { emailRegex } from '@/config'
import Link from '@/next/link'
import { useSearchParams } from '@/next/navigation'
import { consoleQuery } from '@/service/console'

type Props = {
  onSuccess: (email: string, payload: string) => void
}

type SignupEmailFormValues = {
  email: string
}

export default function SignupEmailForm({ onSuccess }: Props) {
  const { t } = useTranslation(['login'])
  const locale = useLocale()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const signinHref = queryString ? `/signin?${queryString}` : '/signin'

  const { mutateAsync: submitMail, isPending } = useMutation(
    consoleQuery.emailRegister.sendEmail.post.mutationOptions(),
  )

  const handleSubmit = async (email: string) => {
    if (isPending) return
    const res = await submitMail({ body: { email, language: locale } })
    if (res.result === 'success') onSuccess(email, res.data ?? '')
  }

  return (
    <Form<SignupEmailFormValues> onFormSubmit={({ email }) => void handleSubmit(email)}>
      <Field
        name="email"
        validate={(value) => {
          const emailValue = String(value)
          return !emailValue || emailRegex.test(emailValue)
            ? null
            : t(($) => $['error.emailInValid'], { ns: 'login' })
        }}
        className="mb-3"
      >
        <FieldLabel>{t(($) => $.email, { ns: 'login' })}</FieldLabel>
        <Input
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder={t(($) => $.emailPlaceholder, { ns: 'login' })}
        />
        <FieldValidity>
          {({ validity }) => (
            <FieldError>
              {t(($) => $[validity.valueMissing ? 'error.emailEmpty' : 'error.emailInValid'], {
                ns: 'login',
              })}
            </FieldError>
          )}
        </FieldValidity>
      </Field>
      <div className="mb-2">
        <Button variant="primary" type="submit" loading={isPending} className="w-full">
          {t(($) => $['signup.verifyMail'], { ns: 'login' })}
        </Button>
      </div>
      <Split className="mt-4 mb-5" />

      <div className="text-[13px] leading-4 font-medium text-text-secondary">
        <span>{t(($) => $['signup.haveAccount'], { ns: 'login' })}</span>
        <Link className="text-text-accent" href={signinHref}>
          {t(($) => $['signup.signIn'], { ns: 'login' })}
        </Link>
      </div>
    </Form>
  )
}
