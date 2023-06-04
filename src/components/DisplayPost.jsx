import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {Table, TableContainer, TableHead, TableBody, TableRow, TableCell, tableCellClasses, Paper, TablePagination} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));

export default function DisplayPost() {

    const [posts, setPosts] = useState([]);
    const navigator = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://contactbackend-6qfi.onrender.com/api/contact/", {
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            const data = await res.json();
            if (res.ok) {
                setPosts(data);
            }
            else {
                console.log(data);
            }
        }
        fetchData()
    }, [posts])


    const handleUpdate = (id) => {
        navigator("/update/"+id)
    }

    const handleDelete = async (id) => {
        const res = await fetch('https://contactbackend-6qfi.onrender.com/api/contact/delete/'+id, {
            method: "DELETE",
            headers: {
                token: localStorage.getItem('token')
            }
        })

        const data = await res.json();
        console.log(data);  
    }
    
  return (
    <div>
        <TableContainer component={Paper} sx={{width: '100%'}}>
        <Table aria-label='simple table' stickyHeader>
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Phone No.</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </StyledTableRow>
            </TableHead>

            <TableBody>
                {
                   posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post) => {
                       return(
                        <StyledTableRow>
                            <StyledTableCell>{post.name}</StyledTableCell>
                            <StyledTableCell>{post.phone}</StyledTableCell>
                            <StyledTableCell>{post.email}</StyledTableCell>
                            <StyledTableCell>
                            <Container sx={{ p:2, py:0.9, display: "flex", gap:2}}>
                                <button onClick={() => {
                                    handleUpdate(post._id)
                                }}><EditIcon /></button>
                                <button onClick={() => {
                                    handleDelete(post._id);
                                }}><DeleteIcon /></button>
                            </Container>
                            </StyledTableCell>
                        </StyledTableRow>
                       )
                   }) 
                }
            </TableBody>
        </Table>
        <TablePagination 
            rowsPerPageOptions={[5, 6, 7, 8, 9, 10]}
            count={posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, nextPage) => {
                setPage(nextPage);
            }}
            onRowsPerPageChange={(e) => {
                setRowsPerPage(e.target.value);
            }}
        />
        </TableContainer>
    </div>
  )
}
