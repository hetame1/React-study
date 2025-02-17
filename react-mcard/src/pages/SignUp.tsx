import { useCallback } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import Form from '@/components/signup/Form'
import { FormValues } from '@/models/signup'
import { auth, db } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'

function SignUpPage() {
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password, name } = formValues

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      await updateProfile(user, {
        displayName: name,
      })

      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      }

      await setDoc(doc(collection(db, COLLECTIONS.USERS), user.uid), newUser)
      navigate('/home')
    },
    [navigate],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignUpPage
