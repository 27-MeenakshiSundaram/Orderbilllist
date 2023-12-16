import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; 
import { Button, Card, CardContent, CardHeader } from '@mui/material';

function Customertable({nextpage}){
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
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 150,
          editable: true,
        },
        {
          field: 'street',
          headerName: 'Street',
          type: 'text',
          width: 110,
          editable: true,
        },
        {
          field: 'city',
          headerName: 'city',
          type: 'text',
          width: 110,
          editable: true,
        },
        {
          field: 'pincode',
          headerName: 'Pincode',
          type: 'text',
          width: 110,
          editable: true,
        },
        {
          field: 'mobileNumber',
          headerName: 'Mobile No',
          type: 'text',
          width: 110,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'text',
          width: 110,
          editable: true,
        },
        {
          field: 'outstandingAmount',
          headerName: 'Outstanding amount',
          type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: 'outstandingLimit',
          headerName: 'Outstanding limit',
          type: 'text',
          width: 110,
          editable: true,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 150,
          renderCell: (params) => (
            <div>
              <Button variant="contained" color="primary" size="small" style={{ marginRight: 8 }}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(params.row.customerId)} >
                Delete
              </Button>
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
            <CardHeader  title="Customer List" action={<Button onClick={nextpage} color="secondary">ADD</Button>}/>
            <CardContent>
            <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={apiData}
        columns={columns}
        getRowId={(row)=>row.customerId}
        pageSize={5} // Use pageSize instead of paginationModel for the default page size
        pageSizeOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
            </CardContent>
        </Card>
        
  );
}
    export default Customertable;