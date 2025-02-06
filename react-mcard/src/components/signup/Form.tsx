import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import validator from 'validator'

import Flex from '@components/shared/Flex'
import TextField from '@components/shared/TextField'
import FixedBottomButton from '@components/shared/FixedBottomButton'
import Spacing from '@components/shared/Spacing'
import { FormValues } from '@/models/signup'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: 'true',
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한상태인가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="test@test.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(errors.email) && Boolean(dirty.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />

      <Spacing size={16} direction="vertical" />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(errors.password) && Boolean(dirty.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />

      <Spacing size={16} direction="vertical" />
      <TextField
        label="패스워드 확인"
        type="password"
        name="passwordConfirm"
        value={formValues.passwordConfirm}
        onChange={handleFormValues}
        hasError={
          Boolean(errors.passwordConfirm) && Boolean(dirty.passwordConfirm)
        }
        helpMessage={
          Boolean(dirty.passwordConfirm) ? errors.passwordConfirm : ''
        }
        onBlur={handleBlur}
      />

      <Spacing size={16} direction="vertical" />
      <TextField
        label="이름"
        placeholder="홍길동"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(errors.name) && Boolean(dirty.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        disabled={!제출가능한상태인가}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }

  if (
    validator.equals(formValues.password, formValues.passwordConfirm) === false
  ) {
    errors.passwordConfirm = '패스워드가 일치하지 않습니다.'
  }

  if (validator.isLength(formValues.password, { min: 8 }) === false) {
    errors.password = '패스워드는 8자 이상이어야 합니다.'
  }

  if (validator.isLength(formValues.name, { min: 2 }) === false) {
    errors.name = '이름은 2자 이상이어야 합니다.'
  }

  return errors
}

export default Form
