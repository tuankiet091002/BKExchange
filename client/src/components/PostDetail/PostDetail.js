import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import moment from 'moment'
import { triggerBase64Download } from 'common-base64-downloader-react';


import { Typography, Grid, Divider, Stack, Box, Container, Avatar, Button, Tooltip } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import logo from '../../assets/logo.png'

import CommentSection from './CommentSection'

import { usePostContext } from '../../contexts/PostContext'
import { useAuthContext } from '../../contexts/AuthContext';
import { useLikePost } from '../../hooks/useLikePost'
import Post from '../Posts/Post'

const PostDetail = () => {
    const { id } = useParams()
    const { user } = useAuthContext()
    const { posts } = usePostContext()
    const { likePost, isLoadingLike, errorLike } = useLikePost()

    const post = posts.find(x => x._id === id)
    if (!post) return (<Navigate to='/posts' />)

    const recommendPost = post.tags.length > 0 ?
        posts.filter(x => x._id != id && post.tags.reduce((a, b) => x.tags.includes(a) || b)) : []



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

    const File = () => {
        if (post.selectedFile?.search("data:image/") !== -1)
            return <img
                src={post.selectedFile}
                loading="lazy"
                maxWidth="100%"
                maxHeight='100%'
            />
        else if (post.selectedFile?.search("data:application/pdf") !== -1)
            return <embed
                src={post.selectedFile}
                loading="lazy"
                width="100%"
                height='100%'
            />
        else if (post.selectedFile)
            return <Button variant='contained' onClick={() => triggerBase64Download(post.selectedFile, 'Document')}>
                Download File
            </Button>
        else return <></>
    }


    return (
        <Container maxWidth={false}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{}}>
                    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 100px)', pr: '24px' }}>
                        <File />
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                            {post.tags.map((tag) => (
                                ` #${tag} `))}
                        </Typography>

                        <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar src={post.creator.avatar ? post.creator.avatar : logo} sx={{ width: 40, height: 40 }} />
                            <Stack>
                                <Typography variant="h6">
                                    {` ${post.creator.name}`}
                                </Typography>
                                <Typography variant="body1">{moment(post.createdAt).format("h:mm:ss, Do MMM YYYY")}</Typography>
                            </Stack>
                        </Stack>

                        <Typography variant="h3" align='center'>{post.title}</Typography>
                        <Typography variant="body1" sx={{ padding: 3 }}>{post.message}</Typography>

                        <Divider style={{ margin: '10px 0' }} />
                        {errorLike && <Typography variant="subtitle2" color="error">{errorLike}</Typography>}
                        <Tooltip title={post.likes.length && post.likes.map(x => <div>{x.name}</div>)} arrow placement='right'>
                            <Button size="small" color="primary" disabled={isLoadingLike} onClick={() => likePost(post._id)}>
                                <Likes />
                            </Button>
                        </Tooltip>
                        <Divider style={{ margin: '10px 0' }} />

                        <CommentSection post={post} />
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ overflow: 'auto', height: 'calc(100vh - 100px)' }}>
                        <Typography variant="h6">Post you also like: </Typography>
                        {recommendPost.map((post) => (
                            <div style={{ margin: '12px' }}>
                                <Post key={post._id} post={post} />
                            </div>
                        ))}
                    </Box>
                </Grid>
            </Grid>

        </Container >
    )
}

export default PostDetail