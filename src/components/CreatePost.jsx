import React, { useState } from 'react';
import {Card, CardContent, TextField, Typography, Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {

  const [contact, setContact] = useState({name: "", phone: "", email:""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  
    setContact({...contact, [name]: value})
  }
  const handleSubmit = async () => {
    console.log(contact);
    const res = await fetch("https://contactbackend-6qfi.onrender.com/api/contact/create", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify(contact)
    })

    const data = await res.json();
    if (res.ok) {
      console.log(data);
      alert("Contact Added");
      setContact({name: "", phone: "", email: ""});
      navigate('/');
    }
    else {
      console.log(data);
    }
  }

  return (
    <Card sx={{ p:3, py:4, maxWidth: "600px", margin: "10px auto", display: "flex", flexDirection: "column", gap:2}} elevation={10}>
      <CardContent sx={{m:0}}>
          <Typography gutterBottom variant="h4" component="div" sx={{m: 0, textAlign: "center"}}>
            Write Here!
          </Typography>
      </CardContent>
          <TextField id="outlined-basic" label="Name" variant='outlined' name='name' onChange={handleChange} value={contact.name} />
          <TextField id="outlined-basic" label="Phone" variant='outlined' name='phone' onChange={handleChange} value={contact.phone} />
          <TextField id="outlined-basic" label="Email" variant='outlined' name='email' onChange={handleChange} value={contact.email} />
          
          <Button variant='contained' onClick={handleSubmit}>Add Contact</Button>
    </Card>
  )
}
