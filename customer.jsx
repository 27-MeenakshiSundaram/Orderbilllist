
import Customertable from './customertable';
import CustomerForm from './customerform';
import React, { useEffect, useState } from 'react';

function Customer() {

    const [next,setnext]=useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    function nextpage(){
        setnext(false)
    }
    function backpage(){
        setnext(true)
        deselect()
    }
    const handleEdit = (row) => {
      
      // Find the selected row data based on id
      
      setSelectedCustomer(row);
      setnext(false)
    };
    function deselect(){
      setSelectedCustomer('')
    }

  return (
    <div>
        {next 
          ? (<Customertable nextpage={nextpage} handleEdit={handleEdit} selectedCustomer={selectedCustomer}/>)
            :(<CustomerForm backpage={backpage} selectedCustomer={selectedCustomer} deselect={deselect}/>)
        }
      
    </div>
  );
}

export default Customer;
