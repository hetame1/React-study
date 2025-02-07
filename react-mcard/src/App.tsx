import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '@pages/Home'
import TestPage from '@pages/Test'
import CardPage from '@pages/Card'
import SignInPage from '@pages/SignIn'
import SignUpPage from '@pages/SignUp'
import ApplyPage from '@pages/Apply'

import ScrollToTop from '@components/shared/ScrollToTop'
import Navbar from '@components/shared/Navbar'
import PrivateRoute from '@components/auth/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
