import { useState } from 'react'
import { usePostContext } from '../contexts/PostContext'

export const useCommentPost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = usePostContext()

    const commentPost = async (id, content) => {
        const token = localStorage.getItem('token')
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:5000/post/${id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON.parse(token)}`},
            body: JSON.stringify({content})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            // update the auth context
            dispatch({ type: 'COMMENT_POST', payload: json.result })
            // update loading state
            setIsLoading(false)
        }
    }

    return { commentPost, isLoading, error }
}