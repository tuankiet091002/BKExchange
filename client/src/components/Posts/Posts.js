import React, { useEffect } from 'react'

import { Grid, Stack, Pagination } from '@mui/material'

import Post from './Post'
import { usePostContext } from '../../contexts/PostContext'
import { useGetPosts } from '../../hooks/useGetPosts'

const Posts = () => {
    const { posts } = usePostContext()
    const { getPosts } = useGetPosts()
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Stack alignItems='center' justifyContent='space-between' sx={{ height: 'calc(100vh - 100px)' }}>
            <Grid container spacing={3} sx={{ pr: '12px', height: '100%', overflow: 'auto' }}>
                {posts.slice(page * 6 - 6, page * 6)?.map((post) => (
                    <Grid key={post._id} item xs={12} md={6} lg={4}>
                        <Post post={post} />
                    </Grid>
                ))}
            </Grid>
            <Pagination size="large" sx={{ py: 1 }}
                variant='outlined'
                count={Math.ceil(posts.length / 6)}
                page={page} onChange={(e, p) => setPage(p)}
                showFirstButton showLastButton />
        </Stack>
    )
}

export default Posts