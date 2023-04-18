import React, { useState, useRef } from 'react';
import moment from 'moment';

import { Typography, TextField, Button, Stack, Container, Box, Avatar, Divider } from '@mui/material';
import logo from '../../assets/logo.png';


import { useCommentPost } from '../../hooks/useCommentPost';
import { useAuthContext } from '../../contexts/AuthContext';


const CommentSection = ({ post }) => {
    const { user } = useAuthContext();
    const [content, setContent] = useState('');
    const { commentPost, isLoading, error } = useCommentPost();

    const commentsRef = useRef();

    const handleComment = async () => {
        commentPost(post._id, content)
        setContent('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    console.log(post.comments.reverse())

    return (
        <Container>
            <div>
                <Typography gutterBottom variant="h6">Write a comment</Typography>
                <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={content} onChange={(e) => setContent(e.target.value)} />
                <br />
                {error && <Typography color="error">{error}</Typography>}
                <Button style={{ marginTop: '10px' }} fullWidth disabled={!content.length || isLoading} color="primary" variant="contained" onClick={handleComment}>
                    Comment
                </Button>
            </div>
            <Box sx={{ height: '100%', overflow: 'auto' }}>
            <div ref={commentsRef} />
                <Typography gutterBottom variant="h6">Comments</Typography>
                {[...post.comments].reverse().map((comment, index) => (<>
                    <Stack direction='row' spacing={2} alignItems='center' key={index}>
                        <Avatar src={comment.user.avatar ? comment.user.avatar : logo} sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography variant="h6">
                                {` ${comment.user.name}`}
                            </Typography>
                            <Typography variant="body1">{moment(comment.time).fromNow()}</Typography>
                        </Stack>
                        <Typography>{comment.content}</Typography>
                    </Stack>
                    <Divider sx={{ m: 1 }} />
                </>))}

            </Box>

        </Container>
    );
};

export default CommentSection;