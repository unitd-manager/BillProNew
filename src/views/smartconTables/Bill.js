import React from 'react';
import PropTypes from 'prop-types';

const Bill = React.forwardRef(({ customerName }, ref) => (

    
    <div ref={ref} style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <h2>Invoice</h2>
        <p>Customer: {customerName}</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Item</th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Quantity</th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Price</th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>Total</th>
                </tr>
            </thead>
            <tbody>
                {/*  */}
            </tbody>
        </table>
       
    </div>
));

// Define prop types for validation
Bill.propTypes = {
    
 
    customerName: PropTypes.string.isRequired,
};

export default Bill;
