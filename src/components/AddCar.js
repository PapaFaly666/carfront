import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import {Button} from '@mui/material'
export default function AddCar(props) {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color:"",
        year: "",
        fuel:"",
        price: ""
    });
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>+ CREATE</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>

          <Stack spacing={2} mt={0.5}>
          <TextField 
            label='brand'
            variant='standard'
            name='brand'
            value={car.brand}
            onChange={handleChange}
            />
            <br/>
            <TextField 
            label='model'
            variant='standard'
            name='model'
            value={car.model}
            onChange={handleChange}
            />
            <br/>
            <TextField 
            label='color'
            variant='standard'
            name='color'
            value={car.color}
            onChange={handleChange}
            />
            <br/>
            <TextField 
            label='year'
            variant='standard'
            name='year'
            value={car.year}
            onChange={handleChange}
            />
            <br/>
            <TextField 
            label='price'
            variant='standard'
            name='price'
            value={car.price}
            onChange={handleChange}
            />
            <br/>
          </Stack>
            
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
