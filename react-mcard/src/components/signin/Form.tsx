import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { css } from '@emotion/react'

import Flex from '@components/shared/Flex'
import TextField from '@components/shared/TextField'
import Button from '@components/shared/Button'
import Spacing from '@components/shared/Spacing'
import Text from '@components/shared/Text'
import { colors } from '@styles/colorPalette'
import { FormValues } from '@models/signin'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      })
    },
    [formValues],
  )

  const errors = useMemo(() => validate(formValues), [formValues])

  const isSubmitable = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요."
        value={formValues.email}
        onChange={handleFormValues}
      />

      <Spacing size={16} direction="vertical" />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={formValues.password}
        onChange={handleFormValues}
      />

      <Spacing size={32} direction="vertical" />
      <Button
        size="medium"
        disabled={!isSubmitable}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>

      <Spacing size={12} direction="vertical" />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }

  if (validator.isLength(formValues.password, { min: 8 }) === false) {
    errors.password = '패스워드는 8자 이상이어야 합니다.'
  }

  return errors
}

export default Form
