import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Billlistform({ backpage, selectedbill, deselect,handleClick }) {
  const [editing, setEditing] = useState(false);
  const [billId, setBillId] = useState(0);
  const [apiData, setApiData] =useState([]);
  const today = new Date();
  console.log(selectedbill)
  const todaydate = today.toISOString().split('T')[0];
  const [customerDetails, setCustomerDetails] = useState({
    customerDetails: '',
    outstandingAmount: '',
    outstandingLimit: '',
  });
  const [itemdetails,setitemdetails]=useState({
    itemName:'',
    rate:'',
    gstRate:'',
  })
  const [itemvalues,setitemvalues]=useState({
    billId: 0,
    itemId: 0,
    quantity: 0,
    rate: 0,
    value: 0,
    gstPercent: 0,
    gstValue: 0,
    amount: 0
  })

  const [values, setValues] = useState({
    billNumber: selectedbill?selectedbill.billNumber:'',
    billDate: '',
    totalValue:0,
    totalTax:0,
    totalAmount:0,
    customerId:0,
    isCredit:true,
  });
  const handleQuantityChange = (e) => {
    let q = e.target.value;
    let v =q * itemdetails.rate
    let gstv=v * itemdetails.gstRate/100
    let ta=v+gstv

    setitemdetails({
      ...itemdetails,
      quantity:q,
      value:v,
      gstValue:gstv,
      amount:ta,
    });
    setitemvalues({
      ...itemvalues,
      quantity:q,
      value:v,
      gstValue:gstv,
      amount:ta,
    });
   
  };
  const handleCancel = () => {
    setitemdetails({
      itemName: '',
      rate: '',
      gstRate: '',
      quantity: '',
    });

    setitemvalues({
      itemId: 0,
      itemCode: '',
      itemName: '',
      stock: 0,
      rate: 0,
      gstPercent: 0,
      value: 0,
      gstValue: 0,
      amount: 0,
      quantity:''
    });
  };
 
  
    
  const fetchBillData = async (bn) => {
    try {
      // Replace 'API_ENDPOINT_URL' with your actual API endpoint URL
      const response = await axios.get('http://localhost:5000/api/Bill');
      console.log(response.data)
       // Map the received data and assign a unique 'id' property to each row
      let bd=response.data.rows
      if(bn){
        let b=bd.find(it=> it.billNumber==bn)
        setBillId(b.billId)
        console.log(b.billId)
        fetchData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleadd = async (e) => {
    e.preventDefault();
    try {
      // Increment bill ID before submitting
      //setBillId((prevBillId) => prevBillId + 1);

      // Your submission logic here using 'values' state
      // For example:
      console.log('Form submitted:', itemvalues);
      await axios.post('http://localhost:5000/api/BillDetails', {billDetailId:itemvalues.billDetailId?itemvalues.billDetailId:0,...itemvalues}).then((response)=>
      {
        console.log(response.data.status)
        handleClick(response.data.status)
        fetchData()
      }
      );
      // Display the generated bill ID in the console
      console.log('Generated Bill ID:', billId);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const [customerOptions, setCustomerOptions] = useState([]);

  useEffect(() => {
    // Fetch options for Autocomplete from the API
    async function fetchCustomerOptions() {
      try {
        const response = await axios.get('http://localhost:5000/api/Customer');
        setCustomerOptions(response.data.rows || []); // Assuming response.data contains an array of customers
        setValues({...values,customerId:selectedbill?selectedbill.customerId:""})
        if(selectedbill){
          let a=(response.data.rows).find(it=>it.customerId==selectedbill.customerId)
          setBillId(selectedbill.billId)
          fetchData()
          setCustomerDetails({
            customerId:a.customerId,
            customerName:a.customerName,
            customerDetails: `${a.address || ''}, \n${a.city || ''}, \n${a.phone || ''}`,
            outstandingAmount: a.outstandingAmount || '',
            outstandingLimit: a.outstandingLimit || '',
          });
          setValues({
            ...values,
            customerId: a.customerId || 0,
            //billDate:todaydate
          });
        }
      } catch (error) {
        console.error('Error fetching customer options:', error);
      }
    }
    fetchCustomerOptions();
  }, []);

  useEffect(() => {
    async function fetchBillNumber() {
      

        try {
          const response = await axios.get('http://localhost:5000/api/Bill/BillNumber');
          const { billNumber } = response.data; 
          // Assuming the response contains a 'billNumber' field
          if (selectedbill) {
            setValues({ ...values, billNumber: selectedbill.billNumber});
          } else {
            setValues({ ...values, billNumber: response.data}); 
          }
         // Update the 'billNumber' field in the state with the received value
        } catch (error) {
          console.error('Error fetching bill number:', error);
        }
      
    }
    
    fetchBillNumber();
    
  }, [selectedbill]); // Make sure to include selectedbill as a dependency
  
  
  const handleCustomerChange = async (event, newValue) => {
    if (newValue) {
      try {
        const response = await axios.get(`http://localhost:5000/api/Customer/${newValue.customerId}`);
        const { data } = response;
        setCustomerDetails({
          customerId:data.customerId,
          customerDetails: `${data.address || ''}, \n${data.city || ''}, \n${data.phone || ''}`,
          outstandingAmount: data.outstandingAmount || '',
          outstandingLimit: data.outstandingLimit || '',
        });
        setValues({
          ...values,
          customerId: newValue.customerId || 0,
          billDate:todaydate,
        });
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    } else {
      // Clear form values when deselecting customer
      resetForm();
    }
  };
  const resetForm = () => {
    setCustomerDetails({
      customerDetails: '',
      outstandingAmount: '',
      outstandingLimit: '',
    });
    
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', values);
    try {
      // Your submission logic here using 'values' state
      // For example:
      await axios.post('http://localhost:5000/api/Bill', values).then((response)=>
      {
        console.log(response.data)
        fetchBillData(response.data.billNumber)
      })
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };
  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '5rem',
    height: '5rem',
  };
 
  const [itemoption, setitemoption] = useState([]);
  useEffect(()=>{
    async function fetchitemoption() {
      try {
        const response = await axios.get('http://localhost:5000/api/Item');
        setitemoption(response.data.rows || []); // Assuming response.data contains an array of customers
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    }
    fetchitemoption();
  }, [] );

  const handleitemChange = async (event, newValue) => {
    if (newValue) {
      try {
        const response = await axios.get(`http://localhost:5000/api/Item/${newValue.itemId}`);
        const { data } = response;
        setitemdetails({
          ...itemdetails,
          itemCode:data.itemCode||'',
          itemName:data.itemName||'',
          billId:billId,
          rate:data.rate ||'',
          gstRate:data.gstRate||'',
        });
        const value = itemdetails.quantity * data.rate;
      const gstValue = (value * data.gstRate) / 100;
      const amount = value + gstValue;
        setitemvalues({
          ...itemvalues,
          itemId:data.itemId,
          billId:billId,
          rate:data.rate ||'',
          gstPercent:data.gstRate||'',
          value: value,
          gstValue: gstValue,
          amount: amount,
          quantity:''
        });  
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    } 

    // useEffect(() => {
    //   const newValue = quantity * rate;
    //   setValue(newValue);
    // }, [quantity, rate]);

  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/BillDetails',{
        params:{billId:selectedbill?selectedbill.billId:billId}
      });
      setApiData(response.data.rows)
      console.log(response.data) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleEdit = (rowData) => {
    // Update the state with the selected row data to populate the form fields for editing
    setitemdetails({
      billDetailId:rowData.billDetailId || '',
      itemCode:rowData.itemCode || "",
      itemName: rowData.itemName || '',
      rate: rowData.rate || '',
      itemId: rowData.itemId || 0,
      billId: rowData.billId || 0,
      gstPercent: rowData.gstPercent || 0,
      quantity: rowData.quantity || 0,
      value: rowData.billValue || 0,
      gstValue: rowData.gstValue || 0,
      amount: rowData.amount || 0,
    });
  
    setitemvalues({
      billDetailId:rowData.billDetailId || '',
      itemId: rowData.itemId || 0,
      billId: rowData.billId || 0,
      rate: rowData.rate || 0,
      gstPercent: rowData.gstPercent || 0,
      quantity: rowData.quantity || 0,
      value: rowData.billValue || 0,
      gstValue: rowData.gstValue || 0,
      amount: rowData.amount || 0,
    });
  
    // Set the editing state to true to switch the form to edit mode
    setEditing(true);
  };
  const handleDelete = async (id) => {
    try {
      // Perform the deletion logic using the item ID (assuming 'id' is the unique identifier)
      await axios.delete(`http://localhost:5000/api/BillDetails/${id}`);
      // Fetch the updated data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const columns = [
    
    {
      field: 'itemName',
      headerName: 'Item Name',
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'rate',
      headerName: 'Rate',
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'text',
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'billValue',
      headerName: 'value',
      type: 'text',
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'gstPercent',
      headerName: 'GST %',
      type: 'text',
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'gstValue',
      headerName: 'GST Value',
      type: 'text',
      width: 150,
      editable: true,
      headerClassName: 'custom-header'
    },
    {
      field: 'amount',
      headerName: 'Total Amount',
      type: 'text',
      width: 150,
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
          <IconButton variant="contained" color="error" size="small" onClick={() => handleDelete(params.row.billDetailId)} >
            <DeleteIcon/>
          </IconButton>
        </div>
      ),
    },
   
  ];
  return (
    <div>
      <Card variant='outlined' sx={{ minWidth: 575 }}>
        <CardContent>
          <Typography variant="h5" component="div"></Typography>

          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="form-group my-2 row">
                <div className="col-sm-6">
                  
                  <Autocomplete
                      disablePortal size='small'
                      id="combo-box-demo"
                      options={customerOptions}
                      getOptionLabel={(option) => option.customerName || ''}
                      onChange={handleCustomerChange}
                      renderInput={(params) => <TextField {...params} label="Enter Customer Name" fullWidth />}
                      value={customerOptions.find(option => option.customerId === values.customerId) || null}
                    />
                </div>
                <div className="col-sm-6">
                  <TextField id="billNumber"  label="Bill Number" variant="outlined" fullWidth size='small' value={values.billNumber}
                    onChange={handleChange} InputProps={{readOnly: true}}/>
                </div>
              </div>

              <div className="form-group my-3 row">
              <div className="col-sm-6">
                  <TextField id="customerDetails" label="Customer Details:" variant="outlined" fullWidth multiline rows={4} value={customerDetails.customerDetails}
                    onChange={handleChange}/>
                </div>
                <div className="col-sm-6">
                  <TextField
                    className="form-control"
                    id="billDate"
                    size='small'
                    type='date'
                    variant="outlined"
                    value={todaydate}
                    inputProps={{ max: todaydate }}
                  />
                </div>
              </div>

              
            <div className="form-group my-3 row">
              <div className="col-sm-6">     
                  <TextField id="outstandingAmount" label="Outstanding Amount" variant="outlined" fullWidth value={customerDetails.outstandingAmount}
                    onChange={handleChange} />
                </div>
                
                <div className="col-sm-6">
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Payment Mode</FormLabel>
                    <RadioGroup 
                        row
                         aria-labelledby="demo-radio-buttons-group-label" 
                          defaultValue={1}
                          name="radio-buttons-group"
                          onChange={handleChange}
                    >
                        <FormControlLabel value={0} control={<Radio size='small'/>} label="Cash" />
                        <FormControlLabel value={1} control={<Radio size='small'/>} label="Credit" />
        
                    </RadioGroup>
                  </FormControl>
         </div>
        </div>

              <div className="form-group my-3 row">
              <div className="col-sm-6">
                <TextField id="outstandingLimit" label="Outstanding Limit" variant="outlined" fullWidth size='small'  value={customerDetails.outstandingLimit}
                    onChange={handleChange}/>
                </div>
                <div className="col-sm-6">               
                  <TextField id="totalAmount" label="Total Amount" variant="outlined" fullWidth size='small' value={apiData && apiData.reduce((s,ac)=>s+ac.amount,0)}/>
                </div>
              </div>

              <div className="text-end">
                <button className="btn btn-success me-2 btn-sm" type="submit">
                  Save
                </button>
                <button className="btn btn-danger me-2 btn-sm" type="reset"onClick={backpage}>
                  Cancel
                </button>
              </div>
            
            </div>
          </form>
        </CardContent>
      </Card>

                    
      <Card className='mt-4' variant='outlined' sx={{ minWidth: 575 }}>
        <CardContent>
          <Typography  variant="h5" component="div"></Typography>

          <form onSubmit={handleadd}>
            <div className="container">
              <div className="form-group my-2 row">
                <div className="col-sm-2">
                  
                  <Autocomplete
                      disablePortal size='small'
                      id="itemCode"
                      options={itemoption}
                      getOptionLabel={(option) => option.itemCode || ''}
                      onChange={handleitemChange}
                      renderInput={(params) => <TextField {...params} label="Item Code:"  />}
                      value={itemdetails?itemdetails:null}
                    />
                </div>
                <div className="col-sm-2">
                <TextField id="itemName" label="ItemName:" variant="outlined"  size='small' value={itemdetails.itemName}
                    onChange={handleChange}/>
                </div>
                <div className="col-sm-2">
                  <TextField id="rate" label="Rate:" variant="outlined" size='small' type='number' value={itemdetails.rate}
                   />
                </div>

                <div className="col-sm-2">
                  <TextField id="quanlity" label="Quantity:" variant="outlined" type='number' size='small' value={itemvalues.quantity}
                    onChange={handleQuantityChange}/>
                </div>

                <div className="col-sm-2">
                  <TextField id="value" label="Value:" variant="outlined" size='small' type='number' value={itemvalues.value}
                    />
                </div>

                <div className="col-sm-2">
                  <TextField id="gst" label="GST%:" variant="outlined" size='small' type='number' value={itemvalues.gstPercent}
                    />
                </div>
              </div>


              
            <div className="form-group my-3 row">
              <div className="col-sm-2">     
                  <TextField id="gstvalue" label="GST Value" variant="outlined" type='number' size='small' value={itemvalues.gstValue}
                     />
                </div>

                <div className="col-sm-2">     
                  <TextField id="totalamount" label="Total Amount:" variant="outlined" type='number' size='small' value={itemvalues.amount}
                     />
                </div>
             </div>   
                
        

              <div className="text-end">
              <button className="btn btn-primary me-2 btn-sm" type="submit" >
                  Add
                </button>
                <button className="btn btn-danger me-2 btn-sm" type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
            <CardHeader  title="" />
            <CardContent>
            <Box sx={{ width: '100%' }}>
      {apiData.length>0 && (<DataGrid
        rows={apiData}
        columns={columns}
        getRowId={(row)=>row.billDetailId}
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
      />)}
      
    </Box>
            </CardContent>
        </Card>
        <Card variant='outlined' sx={{ minWidth: 575 }}>
        <CardContent>
          <Typography variant="h5" component="div"></Typography>

          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="form-group my-2 row">
                <div className="col-sm-6">
                  
                  
                </div>
               
              </div>

              
            
              <div className="form-group my-3 row">
              <div className="col-sm-4">
                <TextField id="Totalvalue" label="Total Value" variant="outlined" fullWidth size='small' value={apiData && apiData.reduce((s,ac)=>s+ac.billValue,0)}/>
                </div>
                <div className="col-sm-4">               
                  <TextField id="totalgstvalue" label="Total Gst Value" variant="outlined" fullWidth size='small' value={apiData && apiData.reduce((s,ac)=>s+ac.gstValue,0)}/>
                </div>
                <div className="col-sm-4">               
                  <TextField id="totalAmount" label="Total Amount" variant="outlined" fullWidth size='small'value={apiData && apiData.reduce((s,ac)=>s+ac.amount,0)}/>
                </div>
              </div>

             
            
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}

export default Billlistform;
