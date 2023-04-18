import React, { useState } from 'react'
import FileBase from 'react-file-base64';

import { Paper, Stack, TextField, Button, Typography, ButtonGroup, Autocomplete } from '@mui/material'

import { useCreatePost } from '../../hooks/useCreatePost'
import { usePostContext } from '../../contexts/PostContext'

const Form = () => {
    const initialState = { title: '', message: '', tags: [], selectedFile: null }
    const { posts } = usePostContext()
    const [form, setForm] = useState(initialState)

    const { createPost, isLoading, error } = useCreatePost()

    const handleSubmit = (e) => {
        e.preventDefault()
        createPost(form)
    }

    const recommendTags = [...(new Set(posts.map(post => post.tags).flat()))]

    return (
        <Paper elevation={4} sx={{ px: 2, py: 1, mt: 1,borderRadius: '15px' }}>
            <Stack spacing={2} alignItems='center'>
                <Typography variant='h6'>Create Post</Typography>
                <TextField label="Title" required fullWidth variant="outlined"
                    value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <TextField label="Message" fullWidth variant="outlined"
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
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
                    value={form.tags}
                    onChange={(e, v) => setForm({ ...form, tags: v })}

                />

                <FileBase type="file" multiple={false} onDone={(e) => setForm({ ...form, selectedFile: e.base64 })} />
                {form?.selectedFile &&
                    <embed src={form.selectedFile} maxHeight="150px" maxWidth='100%' />}
                {error && <Typography color='error'> {error}</Typography>}
                <ButtonGroup variant='contained' size='large'>
                    <Button onClick={handleSubmit} disabled={isLoading}>Confirm</Button>
                    <Button color='error' onClick={() => setForm(initialState)}>Reset</Button>
                </ButtonGroup>

            </Stack>
        </Paper >
    )
}

export default Form