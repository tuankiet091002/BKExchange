import React from 'react'

import { Container, Grid } from '@mui/material'

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Search from '../Search/Search';

const Home = () => {
    return (<Container maxWidth={false}>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={9}>
                <Posts />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Search />
                <Form />
            </Grid>
        </Grid>
        </Container>
    )
}

export default Home