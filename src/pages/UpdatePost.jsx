import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, TextField, Box, SpeedDial } from "@mui/material"
import { Add } from "@mui/icons-material"
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePost = () => {
  const [contact, setContact] = useState({name: "", phone: "", email: ""})
  const {id} = useParams()
  const navigator = useNavigate()

  useEffect(()=>{
    const fetchSingleContact = async () => {
      const res = await fetch("https://contactbackend-6qfi.onrender.com/api/contact/"+id, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      const data = await res.json()
      if(res.ok){
        setContact({
            name: data.result.name,
            phone: data.result.phone,
            email: data.result.email
        })
      }else{
        console.log(data);
      }
    }
    fetchSingleContact()
  }, [id])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({...contact, [name]: value})
  } 

  const handleSubmit = async () => {
    console.log(contact);
    const res = await fetch("https://contactbackend-6qfi.onrender.com/api/contact/update/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      },
      body: JSON.stringify(contact)
    })
    const data = await res.json()
    if(res.ok){
      alert("Contact Updated")
      navigator("/")
    }else{
      console.log(data);
    }
  }

  return (
    <Card sx={{ p: 3, py: 4, maxWidth: "600px", margin: "10px auto", display: "flex", flexDirection: "column", gap: 2, borderRadius: "15px" }} elevation={10}>
      <CardContent sx={{ m: 0 }}>
        <Typography gutterBottom variant="h4" component="div" sx={{ m: 0 }}>
          Update Contact!
        </Typography>
      </CardContent>
      <TextField id="outlined-basic" label="Name" variant="outlined" name='name' value={contact.name} onChange={handleChange} />
      <TextField id="outlined-basic" label="Phone" variant="outlined" name='phone' value={contact.phone} onChange={handleChange} />
      <TextField id="outlined-basic" label="Email" variant="outlined" name='email' value={contact.email} onChange={handleChange} />

      <Box sx={{ textAlign: "center" }}>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          onClick={handleSubmit}
          icon={<Add />}>

        </SpeedDial>
      </Box>
    </Card>
  )
}

export default UpdatePost;

