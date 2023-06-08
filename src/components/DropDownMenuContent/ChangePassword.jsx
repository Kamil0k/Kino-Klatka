import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import Button from '../UI/Button'

import './ChangePassword.css'

const ChangePassword = () => {
  const { changePassword } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      oldPassword.trim().length === 0 ||
      newPassword.trim().length === 0 ||
      repeatPassword.trim().length === 0
    ) {
      setErrorMessage('Uzupełnij wszystkie pola!')
      return
    }

    if (newPassword.trim().length < 10) {
      setErrorMessage('Nowe hasło powinno zawierać co najmniej 10 znaków!')
      return
    }

    if (newPassword !== repeatPassword) {
      setErrorMessage('Powtórzone hasło nie zgadza się z nowym hasłem!')
      return
    }

    try {
      setIsSubmitting(true)
      await changePassword(oldPassword, newPassword)
      setOldPassword('')
      setNewPassword('')
      setRepeatPassword('')
      setErrorMessage('')
      navigate('/') 
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const submittingContent = (
    <p className="change-password__submitting">
      Proszę czekać...
      <br />
      Trwa zmiana hasła!
    </p>
  )

  return (
    <form className="change-password" onSubmit={handleSubmit}>
      <p className="change-password__title">Formularz zmiany hasła</p>
      {errorMessage && <div className="change-password__error">{errorMessage}</div>}
      {isSubmitting && submittingContent}
      {!isSubmitting && (
        <>
          <div className="change-password__fields">
            <label className="change-password__fields-label">
              Stare hasło:
              <input
                type="password"
                name="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label className="change-password__fields-label">
              Nowe hasło:
              <input
                type="password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label className="change-password__fields-label">
              Powtórz hasło:
              <input
                type="password"
                name="repeat-password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </label>
          </div>
          <Button type="submit" className="change-password__button">
            Zmień hasło
          </Button>
        </>
      )}
    </form>
  )
}

export default ChangePassword
