import Itemform from './itemform';
import Itemtable from './itemtable';
import React, { useEffect,useState } from 'react';
function Item() {
  const [next,setnext]=useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
    function nextpage(){
        setnext(false)
    }
    function backpage(){
        setnext(true)
        deselect()
    }
    const handleEdit = (row) => {
      
      // Find the selected row data based on id
      
      setSelectedItem(row);
      setnext(false)
    };
    function deselect(){
      setSelectedItem('')
    }
    

  return (
    <div>
      
      {
        next 
        ?(<Itemtable nextpage={nextpage}handleEdit={handleEdit} selectedItem={selectedItem}/>)
        :( <Itemform backpage={backpage}selectedItem={selectedItem} deselect={deselect}/>)
      }
      
     
    </div>
  );
}

export default Item;
