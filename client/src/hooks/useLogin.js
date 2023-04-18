import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json.result))
            localStorage.setItem('token', JSON.stringify(json.token))
            // update the auth context
            dispatch({ type: 'LOGIN', payload: json.result })
            // update loading state
            setIsLoading(false)

            navigate("/")
        }
    }

    return { login, isLoading, error }
}