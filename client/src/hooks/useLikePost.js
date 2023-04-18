import { useState } from 'react'
import { usePostContext } from '../contexts/PostContext'

export const useLikePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = usePostContext()

    const likePost = async (id) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/post/${id}/like`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}`},
            body: JSON.stringify()
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'LIKE_POST', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { likePost, isLoading, error }
}