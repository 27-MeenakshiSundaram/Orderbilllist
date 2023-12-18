import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useFormik } from 'formik';
import CardContent from '@mui/material/CardContent';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import axios from 'axios';


function CustomerForm({backpage,selectedCustomer,deselect}){
  const [editing, setEditing] = useState(false);
    const formik = useFormik({
        initialValues: {
          customerName: selectedCustomer?.customerName || '',
          email: selectedCustomer?.email || '',
          address: selectedCustomer?.address || '',
          street: selectedCustomer?.street || '',
          city: selectedCustomer?.city || '',
          pincode: selectedCustomer?.pincode || '',
          mobileNumber: selectedCustomer?.mobileNumber || '',
          outstandingAmount: selectedCustomer?.outstandingAmount || '',
          outstandingLimit: selectedCustomer?.outstandingLimit || '',
        },
        validationSchema: Yup.object({
          customerName: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email address').required('Email is required'),
          address: Yup.string().required('Address is required'),
          street: Yup.string().required('Street is required'),
          city: Yup.string().required('City is required'),
          pincode: Yup.string().required('Pincode is required'),
          mobileNumber: Yup.number().required('Mobile No is required'),
          outstandingAmount: Yup.string().required('Outstanding Amount is required'),
          outstandingLimit: Yup.string().required('Outstanding Limit is required'),
        }),
        onSubmit: async (values) => {
          try {
            if (editing && selectedCustomer?.customerId) {
              // Make a PUT request to update existing data
              const response = await axios.patch(`http://localhost:5000/api/Customer`,{customerId:selectedCustomer.customerId,...values});
              deselect()
              // Log the response or handle it according to your needs
              console.log('API Response:', response.data);
              document.getElementById("cancelbtn").click();
            } else {
              // Make a POST request to create new data
              const response = await axios.post('http://localhost:5000/api/Customer', values);
    
              // Log the response or handle it according to your needs
              console.log('API Response:', response.data);
              document.getElementById("cancelbtn").click();
            }
          } catch (error) {
            // Handle any errors that occurred during the API call
            console.error('Error updating data:', error);
          }
        },
      });
      useEffect(() => {
        // Update form values when selectedCustomer changes (for editing)
        if (selectedCustomer) {
          setEditing(true);
        formik.setValues({
          customerName: selectedCustomer?.customerName || '',
          email: selectedCustomer?.email || '',
          address: selectedCustomer?.address || '',
          street: selectedCustomer?.street || '',
          city: selectedCustomer?.city || '',
          pincode: selectedCustomer?.pincode || '',
          mobileNumber: selectedCustomer?.mobileNumber || '',
          outstandingAmount: selectedCustomer?.outstandingAmount || '',
          outstandingLimit: selectedCustomer?.outstandingLimit || '',
        });
      }else{
        setEditing(false);
      }
      }, [selectedCustomer]);
    return(
        <div>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
        
        <Typography variant="h5" component="div">
          Customer
        </Typography>
      
        <form onSubmit={formik.handleSubmit}>
        <div className="container">
           <div className="form-group my-2 row">
              <div className="col-sm-4 ">
              <b>CustomerName:</b>
              <TextField
          className="form-control"
          id="customerName" size='small' placeholder='Enter Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.customerName}
          error={formik.touched.customerName && Boolean(formik.errors.customerName)}
          helperText={formik.touched.customerName && formik.errors.customerName}
        />
              </div>
              <div className="col-sm-4">
                <b>Address:</b>
                <TextField
          className="form-control"
          id="address" size='small' placeholder='Enter Address'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
               
              </div>
              <div className="col-sm-4">
                <b>Street:</b>
                <TextField
          className="form-control"
          id="street" size='small' placeholder='Enter Street Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
        />
              </div>
            </div>
            <div className="form-group my-3 row">
              <div className="col-sm-4">
                <b>City:</b>
                <TextField
          className="form-control"
          id="city" size='small' placeholder='Enter city Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
              </div>
              <div className="col-sm-4">
                <b>Pincode:</b>
                <TextField
          className="form-control"
          id="pincode" size='small' placeholder='Enter pincode'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.pincode}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
        />
              </div>
              <div className="col-sm-4">
                <b>Mobile No:</b>
                <TextField
          className="form-control"
          id="mobileNumber" size='small' placeholder='Enter Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobileNumber}
          error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
          helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
        />
              </div>   
            </div>
            <div className="form-group my-3 row">
              <div className="col-sm-4">
                <b>Email:</b>
                <TextField
          className="form-control"
          id="email" size='small' placeholder='Enter Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
              </div>
              <div className="col-sm-4">
                <b>Outstanding amount:</b>
                <TextField
          className="form-control"
          id="outstandingAmount" size='small' placeholder='Enter Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.outstandingAmount}
          error={formik.touched.outstandingAmount && Boolean(formik.errors.outstandingAmount)}
          helperText={formik.touched.outstandingAmount && formik.errors.outstandingAmount}
        />
              </div>
              <div className="col-sm-4">
                <b>Outstanding Limit:</b>
                <TextField
          className="form-control"
          id="outstandingLimit" size='small' placeholder='Enter Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.outstandingLimit}
          error={formik.touched.outstandingLimit && Boolean(formik.errors.outstandingLimit)}
          helperText={formik.touched.outstandingLimit && formik.errors.outstandingLimit}
        />
              </div>
            </div>
            <div className='text-end'>
              {editing ? (
                <button className="btn btn-success me-2 btn-sm" type="submit">
                Update
              </button>
              ):(
            <button className="btn btn-success me-2 btn-sm "  type="submit" >
                Save
            </button>
              )}
            <button className="btn btn-danger me-2 btn-sm " id="cancelbtn" type="reset" onClick={backpage}>
                Cancel
            </button>
            </div>
          </div>
          </form>
      
     
    
    </CardContent>
    </Card>
    </div>
    );
}

export default CustomerForm;