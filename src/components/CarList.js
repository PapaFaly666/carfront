import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../Constants';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from './AddCar';


import EditCar from './EditCar';

export default function CarList() {
  const columns = [
    { field: 'brand', headerName: 'Marque', width: 200 },
    { field: 'model', headerName: 'Modèle', width: 200 },
    { field: 'color', headerName: 'Couleur', width: 200 },
    { field: 'year', headerName: 'Année', width: 150 },
    { field: 'price', headerName: 'Prix', width: 150 },
    {
      field: "_links.car.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: row => 
      <IconButton>
        <EditCar data={row} updateCar = {updateCar} />
      </IconButton>

    },
    {
      field: "_links.self.href",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: row => (
        <IconButton>
          <IconButton onClick={() => onDelClick(row.id)}>
            <DeleteIcon color='error'/>
          </IconButton>
        </IconButton>

      ),
    }
   ];
   
    const [cars, setCars] = useState([]);
    useEffect(() => {
        fetchCars();
        
    },[]);

    const [open, setOpen] = useState(false);
    const fetchCars = () => {
      fetch(SERVER_URL + "api/cars")
      .then(response => response.json()).then(data => setCars(data._embedded.cars))
      .catch(err => console.error(err));
    }

    const onDelClick = url => {
      if (window.confirm('Are you sure to delete this ?')){
          fetch(url, {method: "DELETE"})
          .then(response => {
            if (response.ok){
              fetchCars();
              setOpen(true);
            }else{
              alert("Quelque chose s'est mal passé !!");
            }
          })
          .catch(err => console.error(err));
      }
    }

    const addCar = car => {
      fetch(SERVER_URL + "api/cars", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(car),
      }).then(response => {
        if (response.ok){
          fetchCars();
        }else{
          alert("Something went wrong");
        }
      })
      .catch(err => console.error(err));
    };

    const updateCar = (car, link) => {
      fetch(link, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(car),
      })
      .then(response => {
        if (response.ok){
          fetchCars();
        }else{
          alert("Something went wrong");
        }
      }).catch(err => console.error(err));
    };
  return (
    <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddCar addCar={addCar}/>
      </Stack>
    <div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={cars}
          columns={columns}
          disableRowSelectionOnClick = {true}
          getRowId={row => row._links.self.href}
          />

          <Snackbar
            open = {open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Voiture supprimée"
          />
      </div>
    </div>
    </React.Fragment>
  );
}
