import React, { useState } from 'react'
import { Paper, Stack, TextField, Button, Autocomplete, Typography, ButtonGroup } from '@mui/material'

import { useGetPosts } from '../../hooks/useGetPosts'
import { usePostContext } from '../../contexts/PostContext'

const Search = () => {
    const { posts } = usePostContext()
    const { getPosts, isLoading, error } = useGetPosts()
    const initialState = { creator: '', title: '', tags: [] }
    const [query, setQuery] = useState(initialState)

    const recommendTags = [...(new Set(posts.map(post => post.tags).flat()))]

    const handleSubmit = (e) => {
        e.preventDefault()
        getPosts({ ...query, tags: query.tags.join(',') })
    }

    return (
        <Paper elevation={4} sx={{ px: 2, py: 1, borderRadius: '15px'}}>
            <Stack spacing={2} alignItems='center'>
                <TextField label="Creator" fullWidth variant="outlined"
                    value={query.creator} onChange={(e) => setQuery({ ...query, creator: e.target.value })} />
                <TextField label="Title" fullWidth variant="outlined"
                    value={query.title} onChange={(e) => setQuery({ ...query, title: e.target.value })} />
                <Autocomplete
                    multiple
                    options={recommendTags}
                    getOptionLabel={(option) => option}
                    fullWidth
                    freeSolo
                    disablePortal
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
                        />
                    )}
                    value={query.tags}
                    onChange={(e, v) => setQuery({ ...query, tags: v })}

                />
                {error && <Typography color='error'>{error}</Typography>}
                <ButtonGroup variant='contained' size='large'>
                    <Button color='success' onClick={handleSubmit} disabled={isLoading}>Search</Button>
                    <Button color='error' onClick={() => setQuery(initialState)}>Reset</Button>
                </ButtonGroup>
            </Stack>
        </Paper>
    )
}

export default Search