
import Customertable from './customertable';
import CustomerForm from './customerform';
import React, { useEffect, useState } from 'react';

function Customer() {

    const [next,setnext]=useState(true);
    function nextpage(){
        setnext(false)
    }
    function backpage(){
        setnext(true)
    }



  return (
    <div>
        {next 
          ? (<Customertable nextpage={nextpage}/>)
            :(<CustomerForm backpage={backpage}/>)
        }
      
    </div>
  );
}

export default Customer;
