import React, { useEffect,useState } from 'react';
import Billlistform from './billlistform';
import Billlisttable from './billlisttable';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function BillList() {
  const [next,setnext]=useState(true);
  const [selectedbill, setselectedbill] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [alert1,setalert1]=useState('')
    function nextpage(){
        setnext(false)
    }
    function backpage(){
        setnext(true)
        deselect()
    }
    const handleEdit = (row) => {
      setselectedbill(row);
      setnext(false)
    };
    function deselect(){
      setselectedbill('')
    }
    const handleClick = (a) => {
      setOpen(true);
      setalert1(a)
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  return (
    <div>
      <h1><center>Bill Services</center></h1>
      {
        next
        ?(<Billlisttable nextpage={nextpage}handleEdit={handleEdit} />)
        :(<Billlistform backpage={backpage}selectedbill={selectedbill} deselect={deselect} handleClick={handleClick}/>)
      }
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alert1}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BillList;
