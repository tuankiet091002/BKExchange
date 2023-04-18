import { useState } from 'react'
import { usePostContext } from '../contexts/PostContext'

export const useCreatePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = usePostContext()

    const createPost = async (form) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}`},
            body: JSON.stringify(form)
        })
        const json = await response.json()
        console.log(json.result)

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'CREATE_POST', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { createPost, isLoading, error }
}