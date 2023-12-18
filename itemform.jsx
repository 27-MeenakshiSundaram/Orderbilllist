import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useFormik } from 'formik';
import CardContent from '@mui/material/CardContent';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import axios from 'axios';



function Itemform({backpage,selectedItem,deselect}){
  const [editing, setEditing] = useState(false);
    const formik = useFormik({
        initialValues: {
          itemCode: selectedItem?.itemCode ||'',
          itemName: selectedItem?.itemName ||'',
        stock: selectedItem?.stock ||'',
        rate: selectedItem?.rate ||'',
        gstRate: selectedItem?.gstRate ||'',
        },
        validationSchema: Yup.object({
        itemCode: Yup.string().required('Item Code is required'),
        itemName: Yup.string().required('Item Name is required'),
        stock: Yup.string().required('Stock is required'),
        rate: Yup.string().required('Rate is required'),
        gstRate: Yup.string().required('Gst Rate is required'),
         
        }),
        onSubmit: async(values) => {
            try {
              if (editing && selectedItem?.itemId) {
                // Make a PUT request to update existing data
                const response = await axios.patch(`http://localhost:5000/api/Item`,{itemId:selectedItem.itemId,...values});
                deselect()
                // Log the response or handle it according to your needs
                console.log('API Response:', response.data);
                document.getElementById("cancelbtn").click();
              } else {
                // Make a POST request to your API endpoint with the form values
                const response = await axios.post('http://localhost:5000/api/Item', values);
        
                // Log the response or handle it according to your needs
                console.log('API Response:', response.data);
             
              }
              } catch (error) {
                // Handle any errors that occurred during the API call
                console.error('Error adding data:', error);
              }
          
        },
      });
      useEffect(() => {
        // Update form values when selectedCustomer changes (for editing)
        if (selectedItem) {
          setEditing(true);
        formik.setValues({
          itemCode: selectedItem?.itemCode ||'',
        itemName: selectedItem?.itemName ||'',
        stock: selectedItem?.stock ||'',
        rate: selectedItem?.rate ||'',
        gstRate: selectedItem?.gstRate ||'',
        });
      }else{
        setEditing(false);
      }
      }, [selectedItem]);
    return(
        <div>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        
        
        <Typography variant="h5" component="div">
        
        </Typography>
      
        <form onSubmit={formik.handleSubmit}>
        <div className="container">
           <div className="form-group my-2 row">
              <div className="col-sm-6 ">
              <b>Item Code:</b>
              <TextField
          className="form-control"
          id="itemCode" size='small' placeholder='Enter Item Code'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.itemCode}
          error={formik.touched.itemCode && Boolean(formik.errors.itemCode)}
          helperText={formik.touched.itemCode && formik.errors.itemCode}
        />
              </div>
              <div className="col-sm-6">
                <b>Item Name:</b>
                <TextField
          className="form-control"
          id="itemname" size='small' placeholder='Enter Item Name'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.itemName}
          error={formik.touched.itemName && Boolean(formik.errors.itemName)}
          helperText={formik.touched.itemName && formik.errors.itemName}
        />     
        </div>  
        </div>

            <div className="form-group my-3 row">
              <div className="col-sm-6">
                <b>Stock:</b>
                <TextField
          className="form-control"
          id="rate" size='small' placeholder='Enter Rate'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rate}
          error={formik.touched.rate && Boolean(formik.errors.rate)}
          helperText={formik.touched.rate && formik.errors.rate}
        />
              </div>
              <div className="col-sm-6">
                <b>Rate:</b>
                <TextField
          className="form-control"
          id="stock" size='small' placeholder='Enter stock'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.stock}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
        />
             </div>
               
            </div>

            <div className="form-group my-3 row">
            <div className="col-sm-6">
                <b>Gst Rate:</b>
                <TextField
          className="form-control"
          id="gstRate" size='small' placeholder='Enter GST Rate'
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gstRate}
          error={formik.touched.gstRate && Boolean(formik.errors.gstRate)}
          helperText={formik.touched.gstRate && formik.errors.gstRate}
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

export default Itemform;