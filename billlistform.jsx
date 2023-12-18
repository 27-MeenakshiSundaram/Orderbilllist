import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';

function Billlistform({ backpage, selectedItem, deselect }) {
  const [editing, setEditing] = useState(false);
  const today = new Date();
  const todaydate = today.toISOString().split('T')[0];

  const [values, setValues] = useState({
    itemCode: selectedItem?.itemCode || '',
    itemName: selectedItem?.itemName || '',
    stock: selectedItem?.stock || '',
    rate: selectedItem?.rate || '',
    gstRate: selectedItem?.gstRate || '',
  });

  useEffect(() => {
    if (selectedItem) {
      setEditing(true);
      setValues({
        itemCode: selectedItem?.itemCode || '',
        itemName: selectedItem?.itemName || '',
        stock: selectedItem?.stock || '',
        rate: selectedItem?.rate || '',
        gstRate: selectedItem?.gstRate || '',
      });
    } else {
      setEditing(false);
    }
  }, [selectedItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing && selectedItem?.itemId) {
        const response = await axios.patch(`http://localhost:5000/api/Item`, {
          itemId: selectedItem.itemId,
          ...values,
        });
        deselect();
        console.log('API Response:', response.data);
        document.getElementById('cancelbtn').click();
      } else {
        const response = await axios.post('http://localhost:5000/api/Item', values);
        console.log('API Response:', response.data);
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div"></Typography>

          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="form-group my-2 row">
                <div className="col-sm-6">
                  <b>Customer Name:</b>
                  <TextField
                    className="form-control"
                    id="itemCode"
                    size="small"
                    placeholder="Enter Customer Name"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.customername}
                  />
                </div>
                <div className="col-sm-6">
                  <b>Bill Number:</b>
                  <TextField
                    className="form-control"
                    id="itemme"
                    size="small"
                    placeholder="Enter bill Number"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.itemName}
                  />
                </div>
              </div>

              <div className="form-group my-3 row">
              <div className="col-sm-6">
                  <b>Customer Details:</b>
                  <TextField
                    className="form-control"
                    id="itemCode"
                    size="small"
                    placeholder="Enter Customer Details"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.itemCode}
                   
                  />
                </div>
                <div className="col-sm-6">
                  <b>Bill Date:</b>
                  <TextField
                    className="form-control"
                    id="itemName"
                    size='small'
                    type='date'
                    variant="outlined"
                    onChange={handleChange}
                    value={values.iteName}
                    inputProps={{ max: todaydate }}
                  />
                </div>
              </div>

              <div className="form-group my-3 row">
              <div className="col-sm-6">
                  <b>outstandingAmount:</b>
                  <TextField
                    className="form-control"
                    id="itemCode"
                    size="small"
                    placeholder="Enter outstandingAmount"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.itemCode}
                  />
                </div>
                
                <div className="col-sm-6">
                  <b>Payment Mode:</b>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentMode"
                        value="Cash"
                        onChange={handleChange}
                        checked={values.paymentMode === 'Cash'}
                      />
                      Credit
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentMode"
                        value="Credit Card"
                        onChange={handleChange}
                        checked={values.paymentMode === 'Credit Card'}
                      />
                      Cash
                    </label>
                  </div>
              </div>

              <div className="form-group my-3 row">
              <div className="col-sm-6">
                  <b>outstanding Limit:</b>
                  <TextField
                    className="form-control"
                    id="itemCode"
                    size="small"
                    placeholder="Enter outstanding Limit"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.itemCode}
                  />
                </div>
                <div className="col-sm-6">
                  <b>Total Amount:</b>
                  <TextField
                    className="form-control"
                    id="itemNme"
                    size="small"
                    placeholder="Enter Total Amount"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.itemNae}
                  />
                </div>
              </div>

              <div className="text-end">
                <button className="btn btn-success me-2 btn-sm" type="submit">
                  Save
                </button>
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
