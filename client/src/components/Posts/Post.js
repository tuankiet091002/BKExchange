import React from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Stack, Box } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import scapegoat from '../../assets/scapegoat.jpg'

import { useAuthContext } from '../../contexts/AuthContext';
import { useLikePost } from '../../hooks/useLikePost';
import { useDeletePost } from '../../hooks/useDeletePost';

const Post = ({ post }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { likePost, isLoadingLike, errorLike } = useLikePost();
    const { deletePost, isLoadingDelete, errorDelete } = useDeletePost();

    const Likes = () => {
        const num = post.likes.length;

        if (num > 0) {
            return post.likes.map(x => x._id).indexOf(user._id) != -1
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{num > 2 ? `You and ${num - 1} others` : `${num} like${num > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{num} {num === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card raised elevation={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '15px',
                position: 'relative',
                height: '37vh'
            }}>
            <ButtonBase sx={{ display: 'block', textAlign: 'initial' }} onClick={()=> navigate(`/posts/${post._id}`)}>
                <CardMedia
                    component="span"
                    sx={{ height: '20vh', width: '100%' }}
                    image={post.selectedFile ? post.selectedFile.search("data:image/") !== -1 ? post.selectedFile : scapegoat : scapegoat}
                    title={post.title} />
                <Box style={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
                    <Typography variant="h6">{post.creator.name}</Typography>
                    <Typography variant="subtitle1">{moment(post.createdAt).fromNow()}</Typography>
                </Box>
            </ButtonBase>
            <CardContent sx={{ py: 1 }}>
                <Stack direction='row' justifyContent='space-between' >
                    <Typography variant="body2" color="text.secondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </Stack>
                <Typography variant="h5" >{post.title}</Typography>
                <Typography variant="subtitle2">
                    {post.message.split(' ').splice(0, 5).join(' ')}...
                </Typography>
            </CardContent>

            <CardActions sx={{ pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                {errorLike && <Typography variant="subtitle2" color="error">{errorLike}</Typography>}
                <Button size="small" color="primary" disabled={isLoadingLike} onClick={() => likePost(post._id)}>
                    <Likes />
                </Button>
                {post.creator._id === user._id &&
                <> {errorDelete && <Typography variant="subtitle2" color="error">{errorDelete}</Typography>}
                    <Button size="small" color="error" disabled={isLoadingDelete} onClick={() => deletePost(post._id)}>
                        <DeleteIcon fontSize="small" /> &nbsp; Delete
                    </Button></>}
            </CardActions>
        </Card>
    )
}


export default Post;