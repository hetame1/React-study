import { app } from "@/firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, password)

      toast.success('로그인이 완료되었습니다.')
      navigate('/')
    } catch (error: any) {
      toast.error(error?.code)
      console.log(error);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'email') {
      setEmail(value)
      const validRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
      if(!value?.match(validRegex) && !value?.includes('@')) {
        setError('이메일 형식이 올바르지 않습니다.')
      } else {
        setError('')
      }
    }
    else if (name === 'password') {
      setPassword(value)

      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상이어야 합니다.')
      }  else {
        setError('')
      }
    } 
  }

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input 
          type="email" 
          name="email" 
          id="title" 
          required
          value={email}
          onChange={onChange}
        />
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input 
          type="password" 
          name="password" 
          id="title" 
          required
          value={password}
          onChange={onChange}
        />
      </div>

      {error && error?.length > 0 && (
        <div className="form__block">
          <p className="form__error">{error}</p>
        </div>
      )}

      <div className="form__block">
        계정이 없으신가요? <Link to="/signup" className="form__link">회원가입하기</Link>
      </div>

      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" disabled={error?.length > 0}/>
      </div>
    </form>
  )
}

export default LoginForm