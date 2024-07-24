import { print } from 'react-html2pdf';
import React from 'react'

function Pdfrhtp() {
  return (
    <div>
    <div id='jsx-template' >
        <span style={{color:'black'}}>adsf</span>
        <h4 style={{color:'blue'}}>السلام عليكم english</h4>
        
    </div>
    <span onClick={()=>print('a', 'jsx-template')}> print</span></div>
  )
}

export default Pdfrhtp