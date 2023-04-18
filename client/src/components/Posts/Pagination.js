import React from 'react'

import { Pagination, Stack } from '@mui/material'

const PostPagination = ({ count, page, setPage }) => {
    return (
        <Pagination count={10} size="large" sx={{ py: 1 }}
            variant='outlined'
            page={page} onChange={setPage}
            showFirstButton showLastButton />
    )
}

export default PostPagination