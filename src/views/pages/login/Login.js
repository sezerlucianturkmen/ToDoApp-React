import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { fetchLogin } from '../../../store/features/AuthSlice'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const isLogin = useSelector((state) => state.auth.isAuthanticated)
  console.log(isLogin)

  const getEmail = (evt) => {
    setEmail(evt.target.value)
  }
  const getPassword = (evt) => {
    setPassword(evt.target.value)
  }

  const login = async () => {
    if (email === '' || password === '') {
      alert('Please enter your email and password!')
    } else if (password.length < 8 || password.length > 32) {
      alert('Password can be between 8 to 32 characters!')
    } else {
      dispatch(
        fetchLogin({
          email: email,
          password: password,
        }),
      )
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }

  const goHome = async () => {
    isLogin ? <Link to="/*"></Link> : <Link to="/login"></Link>
  }

  React.useEffect(() => {
    goHome()
  }, [isLogin])

  if (isLogin) {
    return <Navigate to="/*" />
  } else {
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCardGroup>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          id="floatingInputInvalid"
                          floatingLabel="Email addresss"
                          placeholder="name@example.com"
                          autoComplete="email"
                          onChange={getEmail}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="floatingInputInvalid"
                          floatingLabel="Password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={getPassword}
                        />
                      </CInputGroup>
                      <CRow className="d-grid gap-2 d-md-block">
                        <Link>
                          <CButton
                            size="lg"
                            color="success"
                            className="px-4"
                            onClick={login}
                            onKeyDown={handleKeyDown}
                          >
                            Login
                          </CButton>
                        </Link>
                        <Link to={`/createpassword`}>
                          <CButton size="lg" color="secondary" className="px-4">
                            Sign Up
                          </CButton>
                        </Link>
                      </CRow>
                      <CRow className="justify-content-center">
                        <CCol className="text-right">
                          <Link to={`/forgetpassword`}>
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default Login
