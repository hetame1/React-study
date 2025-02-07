import { useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

import { auth } from '@remote/firebase'
import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'
import { useAlertContext } from '@/contexts/AlertContext'

function SignInPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (formValues: FormValues) => {
    const { email, password } = formValues

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/wrong-password') {
          open({
            title: '계정의 정보를 확인해주세요.',
            onButtonClick: () => {},
          })

          return
        }
      }

      open({
        title: '로그인에 실패했습니다.',
        onButtonClick: () => {},
      })
    }
  }, [])

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignInPage
