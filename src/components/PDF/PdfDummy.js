import React, { useState, useRef } from 'react';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import PdfReactInvoice from './PdfReactInvoice';

	const PdfDummy = ({ invoiceId }) => {
		PdfDummy.propTypes = {
			invoiceId: PropTypes.any,
		  };
		  
		const invoiceRef = useRef(null);
	  const [pdfGenerated, setPdfGenerated] = useState(false);
	
		const handleGeneratePdf = () => {
		  console.log('Generating PDF...');
		const input = invoiceRef.current;
		if (input) {
		  // Create a new jsPDF instance
	
		  // Convert the invoice HTML element to a canvas
	
		  // Convert the invoice HTML element to a canvas with a higher scale (e.g., 2)
		  html2canvas(input, { scale: 3 }).then((canvas) => {
			const imgData = canvas.toDataURL('image/jpeg');
			const pdf = new JsPDF('p', 'mm', 'a4');
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
	
			pdf.setFont('Inter-Regular', 'normal');
	
			// Add the canvas image to the PDF
	
			// Save the PDF
			pdf.save('invoice.pdf');
			setPdfGenerated(true);
		  });
		}
	  };
	
	  return (
		<div>
		  {/* Conditionally render the invoice */}
			<div>
			<PdfReactInvoice invoiceId={invoiceId} invoiceRef={invoiceRef} />       
		   </div>
	  
	
		  {/* Display the "Generate PDF" button */}
			<button className="button" type="submit" onClick={handleGeneratePdf}>
			  Generate PDF
			</button>
		 
		  {/* Styles to hide the PDF image */}
		  <style>
			{`.pdf-canvas {
			  display: ${pdfGenerated ? 'none' : 'block'};
			}`}
		  </style>
		</div>
	  );
	  };

export default PdfDummy;