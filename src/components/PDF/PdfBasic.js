import React from 'react';
import * as JsPDF from 'jspdf'

function PdfBasic() {
   
   const generatePDF = () => {
      const doc = new JsPDF('p', 'pt');
      
      doc.text(20, 20, 'This is the first title.')
      doc.addFont('helvetica', 'normal')
      doc.text(20, 60, 'This is السلام عليكم.')
      doc.text(20, 100, 'This is the thrid title.')      
      
      doc.save('demo.pdf')
    }   
    

      return (
         <div>
            <span onClick={generatePDF}>Download PDF</span> 
         </div>
      );
   
}
export default PdfBasic;