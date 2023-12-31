import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import axios from 'axios'; 
import { Button, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Customertable({nextpage,handleEdit,selectedCustomer}){
    const [apiData, setApiData] =useState([]);
    
    const handleDelete = async (id) => {
        try {
          console.log(id)  
          await axios.delete(`http://localhost:5000/api/Customer/${id}`);
          console.log("deleted")
        } catch (error) {
          console.error('Error deleting data:', error);
        }
        fetchData();
      };

      
    const columns = [
    
        {
          field: 'customerName',
          headerName: 'Name',
          width: 150,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 150,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'street',
          headerName: 'Street',
          type: 'text',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'city',
          headerName: 'city',
          type: 'text',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'pincode',
          headerName: 'Pincode',
          type: 'text',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'mobileNumber',
          headerName: 'Mobile No',
          type: 'text',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'text',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'outstandingAmount',
          headerName: 'Outstanding amount',
          type: 'number',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'outstandingLimit',
          headerName: 'Outstanding limit',
          type: 'number',
          width: 110,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 150,
          headerClassName: 'custom-header',
          renderCell: (params) => (
            <div>
              
              <IconButton variant="contained" color="primary" size="small" style={{ marginRight: 8 }} onClick={() =>handleEdit(params.row)}>
              <EditIcon/>
              </IconButton>
              <IconButton variant="contained" color='error' size="small" onClick={() => handleDelete(params.row.customerId)} >
                <DeleteIcon/>
              </IconButton>
            </div>
          ),
        },
       
      ];
     
        const fetchData = async () => {
            try {
              // Replace 'API_ENDPOINT_URL' with your actual API endpoint URL
              const response = await axios.get('http://localhost:5000/api/Customer/');
              console.log(response.data)
               // Map the received data and assign a unique 'id' property to each row
            const formattedData = response.data.rows.map((row, index) => ({
              id: index + 1, // You can adjust the logic to generate unique IDs according to your data
              ...row,
            }));
        
            setApiData(formattedData); 
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          useEffect(()=>{
          fetchData();
        }, []);

      

    
    return(
        <Card>
            <CardHeader  title="Customer List" action={<Button variant='contained' onClick={nextpage} size='small' color="secondary">ADD</Button>}/>
            <CardContent>
            <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={apiData}
        columns={columns}
        getRowId={(row)=>row.customerId}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: {disableToolbarButton:true},
            csvOptions: {disableToolbarButton:true},
          },
        }}
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      
        pageSizeOptions={[5,10]}
        disableSelectionOnClick
      />
    </Box>
            </CardContent>
        </Card>
        
  );
}
    export default Customertable;