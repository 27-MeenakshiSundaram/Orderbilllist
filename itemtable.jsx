import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; 
import { Button, Card, CardContent, CardHeader } from '@mui/material';

function Itemtable({nextpage,handleEdit,selectedItem}){
    const [apiData, setApiData] =useState([]);
    const handleDelete = async (id) => {
        try {
          console.log(id)  
          await axios.delete(`http://localhost:5000/api/Item/${id}`);
          console.log("deleted")
        } catch (error) {
          console.error('Error deleting data:', error);
        }
        fetchData();
      };
    const columns = [
    
        {
          field: 'itemCode',
          headerName: 'Item Code',
          width: 170,
          editable: true,
        },
        {
          field: 'itemName',
          headerName: 'Item Name',
          width: 170,
          editable: true,
        },
        {
          field: 'stock',
          headerName: 'Stock',
          type: 'text',
          width: 170,
          editable: true,
        },
        {
          field: 'rate',
          headerName: 'Rate',
          type: 'text',
          width: 170,
          editable: true,
        },
        {
          field: 'gstRate',
          headerName: 'Gst rate',
          type: 'text',
          width: 170,
          editable: true,
        },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 170,
          renderCell: (params) => (
            <div>
              <Button variant="contained" color="primary" size="small" style={{ marginRight: 8 }} onClick={() =>handleEdit(params.row)}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(params.row.itemId)} >
                Delete
              </Button>
            </div>
          ),
        },
       
      ];
     
        const fetchData = async () => {
            try {
              // Replace 'API_ENDPOINT_URL' with your actual API endpoint URL
              const response = await axios.get('http://localhost:5000/api/Item');
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
            <CardHeader  title="Item List" action={<Button onClick={nextpage} color="secondary">ADD</Button>}/>
            <CardContent>
            <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={apiData}
        columns={columns}
        getRowId={(row)=>row.itemId}
        pageSize={5} // Use pageSize instead of paginationModel for the default page size
        pageSizeOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
            </CardContent>
        </Card>
        
  );
}
    export default Itemtable;