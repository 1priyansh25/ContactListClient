import React, { useState } from 'react';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';

export default function PostCard() {
    
  return (
    <TableContainer component={Paper}>
        <Table aria-label='simple table'>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone No.</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>

            </TableBody>
        </Table>
    </TableContainer>
  )
}
