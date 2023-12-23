import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'; 
import { Button, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Billlisttable({nextpage,handleEdit}){
    const [apiData, setApiData] =useState([]);
    
    const handleDelete = async (id) => {
        try {
          console.log(id)  
          await axios.delete(`http://localhost:5000/api/Bill/${id}`);
          console.log("deleted")
        } catch (error) {
          console.error('Error deleting data:', error);
        }
        fetchData();
      };

      
    const columns = [
    
        {
          field: 'billNumber',
          headerName: 'Bill No',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'billDate',
          headerName: 'Bill Date',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'totalValue',
          headerName: 'Total Value',
          type: 'text',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'totalTax',
          headerName: 'Total Tax',
          type: 'text',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'totalAmount',
          headerName: 'Total amount',
          type: 'text',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'customerId',
          headerName: 'Customer ID',
          type: 'text',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'customerName',
          headerName: 'Customer Name',
          type: 'text',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'isCredit',
          headerName: 'Is Credit',
          type: 'text',
          width: 120,
          editable: true,
          headerClassName: 'custom-header'
        },
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          width: 250,
          headerClassName: 'custom-header',
          renderCell: (params) => (
            <div>
              <IconButton variant="contained" color="primary" size="small" style={{ marginRight: 8 }} onClick={() =>handleEdit(params.row)}>
                <EditIcon/>
              </IconButton>
              <IconButton variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.billId)} >
                <DeleteIcon/>
              </IconButton>
            </div>
          ),
        },
       
      ];
     
        const fetchData = async () => {
            try {
              // Replace 'API_ENDPOINT_URL' with your actual API endpoint URL
              const response = await axios.get('http://localhost:5000/api/Bill');
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
            <CardHeader  title=" BillList" action={<Button variant='contained' onClick={nextpage} color="secondary">ADD</Button>}/>
            <CardContent>
            <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={apiData}
        columns={columns}
        getRowId={(row)=>row.billId}
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
    export default Billlisttable;