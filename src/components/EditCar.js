import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
export default function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        price: ""
    });


    const handlerClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            year: props.data.row.year,
            fuel: props.data.row.fuel,
            price: props.data.row.price,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCar({...car, [event.target.name] : event.target.value});
    };

    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();
    }
  return (
    <div>
        <Button onClick={handlerClickOpen}><EditIcon/></Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit car</DialogTitle>
            <DialogContent>
                <Stack>
                <TextField 
                    label='brand'
                    variant='standard'
                    name='brand'
                    value={car.brand}
                    onChange={handleChange}
                />
                <br />
                <TextField 
                    label='color'
                    variant='standard'
                    name='color'
                    value={car.color}
                    onChange={handleChange}
                />
                <br />
                <TextField 
                    label='year'
                    variant='standard'
                    name='year'
                    value={car.year}
                    onChange={handleChange}
                />
                <br />
                <TextField 
                    label='price'
                    variant='standard'
                    name='price'
                    value={car.price}
                    onChange={handleChange}
                />
                <br />
                </Stack>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
