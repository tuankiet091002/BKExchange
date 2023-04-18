import { createContext, useReducer, useContext } from "react";

export const PostContext = createContext();

export const postReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return { posts: action.payload }
        case 'CREATE_POST':
            console.log(state.posts)
            console.log(action.payload)
            return { posts: [...state.posts, action.payload] }
        case 'UPDATE_POST':
        case 'LIKE_POST':
        case 'COMMENT_POST':
            return { posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case 'DELETE_POST':
            return { posts: state.posts.filter((post) => post._id !== action.payload._id) }
        default:
            return state
    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, { posts: [] })

    return <PostContext.Provider value={{ ...state, dispatch }}>{children}</PostContext.Provider>
}

export const usePostContext = () => {
    const context = useContext(PostContext)

    if (!context) {
        throw Error('usePostContext must be used inside an PostContextProvider')
    }

    return context
}