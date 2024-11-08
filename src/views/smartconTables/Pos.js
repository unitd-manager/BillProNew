import React, { useState, useEffect } from 'react';
import { Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; import AsyncSelect from 'react-select/async';
import message from '../../components/Message';
import api from '../../constants/api';

const OrderList = () => {
    
    const [sessionOrderId, setSessionOrderId] = useState('');
    const [billId, setbillId] = useState('');
    const [valueQty, setValueqty] = useState('');
    const [companyId, setcompanyId] = useState('');
    const [companyId1, setcompanyId1] = useState('');
    const [sessionOrder, setSessionOrder] = useState('');
    const [shippingCharges, setshippingCharges] = useState(0);
    const [discountCharge, setdiscountCharges] = useState(0);
    const [orderItems, setOrderItems] = useState([]);
    const [modeOfPayment, setModeOfPayment] = useState('');
    const [qtyTotal, setQtyTotal] = useState(0);
    const [discountPercentageAmountSum, setDiscountPercentageAmountSum] = useState(0);
    const [totalOverall, setTotalOverall] = useState(0);
    const [roundOffAmount, setRoundOffAmount] = useState(0);
    const [overallNetTotal, setOverallNetTotal] = useState(0);
    const [roundOffAmount1, setRoundOffAmount1] = useState(0);
    const [overallNetTotal1, setOverallNetTotal1] = useState(0);
    const [amountGiven, setAmountGiven] = useState('');
    const [change, setChange] = useState(0);
    const [selectedClient, setSelectedClient] = useState(null); // State for selected client
    const [overallSubtotalWithoutDiscount, setOverallSubtotalWithoutDiscount] = useState(0);
    const [overallSubtotalWithDiscount, setOverallSubtotalWithDiscount] = useState(0);
    console.log("sdasd", overallSubtotalWithoutDiscount)
    console.log("companyId", companyId1)
    const [numRows, setNumRows] = useState(0);
    const mopArray = ["Cash", "Credit Card"];
    const discountTypeOptions = ["No discount", "%", "Value"];

    // const [isGSTEnabled, setIsGSTEnabled] = useState(true); // Step 1: State to track GST enable/disable

    const toggleGSTCalculation = () => {
        const newGSTStatus = sessionOrder === "ON" ? "OFF" : "ON"; // Determine the new GST status
        setSessionOrder(newGSTStatus); // Toggle the state

        // Update the GST status in the database
        api.post('/poss/updateGSTStatus', { order_id: sessionOrderId, gst_status: newGSTStatus })
            .then(() => {
                message(`GST ${newGSTStatus}`, 'success');

            })
            .catch(error => {
                console.error('Error updating GST status:', error);
                message('Unable to update GST status.', 'error');
            });
    };
    const [isOrderActive, setIsOrderActive] = useState(true); // State to track order active/cancelled status
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/poss/getOrders');
                const order = res.data.data[0];
                console.log('order',order)
                if (order && order.order_id) {
                    setSessionOrderId(order.order_id);
                    setbillId(order.bill_number);
                    setcompanyId(order.company_name);
                    setcompanyId1(order.company_id);
                    setSessionOrder(order.gst_status);
                    setshippingCharges(parseFloat(order.shipping_charge) || 0);
                    setdiscountCharges(parseFloat(order.discount) || 0);
                    setIsOrderActive(order.order_status);
                } else {
                    console.error('Invalid order data', order);
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };
        fetchData();
    }, []);

    const Calculation = (orderItem) => {
        if (orderItem) {
            api.post('/finance/getOrdersByIds', { order_id: sessionOrderId })
                .then((res) => {
                    const items = res.data.data;
                    setOrderItems(items.map(item => ({
                        ...item,
                    })));
                    // Calculate totals based on the fetched items
                    let totalQty = 0;
                    let totalDiscount = 0;
                    let subtotalWithoutDiscount = 0;
                    let subtotalWithDiscount1 = 0;
                    let total = 0;
                    let total1 = 0;

                    items.forEach(item => {
                        totalQty += item.qty;
                        const subtotal = item.qty * item.unit_price;
                        const discount = item.discount_type === "%"
                            ? (subtotal * item.discounted_amount) / 100
                            : item.discounted_amount;
                        totalDiscount += discount;
                        subtotalWithoutDiscount += subtotal;
                        subtotalWithDiscount1 += subtotal - discount;
                        const subtotalWithDiscount = subtotal - discount;
                        const gstValue = subtotalWithDiscount * item.vat / 100;
                        total += subtotalWithDiscount + gstValue;
                        total1 += subtotalWithDiscount;
                    });
                    setQtyTotal(totalQty);
                    setDiscountPercentageAmountSum(totalDiscount);
                    setOverallSubtotalWithoutDiscount(subtotalWithoutDiscount);
                    setOverallSubtotalWithDiscount(subtotalWithDiscount1);
                    // Include shipping charges in total calculation
                    const shippingChargesValue = parseFloat(shippingCharges) || 0;
                    const discountChargeValue = parseFloat(discountCharge) || 0;
                    const totalWithShipping = total + shippingChargesValue - discountChargeValue;
                    const total1WithShipping1 = total1 + shippingChargesValue - discountChargeValue;
                    setTotalOverall(totalWithShipping);
                    setRoundOffAmount(Math.round(totalWithShipping) - totalWithShipping);
                    setOverallNetTotal(Math.round(totalWithShipping));
                    setRoundOffAmount1(Math.round(total1WithShipping1) - total1WithShipping1);
                    setOverallNetTotal1(Math.round(total1WithShipping1));
                    setNumRows(items.length);
                })
                .catch((error) => {
                    console.error('Error fetching order items:', error);
                });
        }
    }
    useEffect(() => {
        Calculation(orderItems)
    }, [sessionOrderId, shippingCharges, discountCharge]);

    const handleModeOfPaymentChange = (e) => {
        setModeOfPayment(e.target.value);
    };
    const [companies, setCompany] = useState('');

    const getOrdersByOrderId = () => {
        api.post('/poss/getCompanyById', { company_id: companyId1 }).then((res) => {
            setCompany(res.data.data[0]);

        });
    };
    useEffect(() => {
        getOrdersByOrderId();
    }, [companyId1]);
    const clearOrderState = () => {
        setSessionOrderId('');
        setbillId('');
        setcompanyId('');
        setcompanyId1('');
        setSessionOrder('');
        setshippingCharges(0);
        setdiscountCharges(0);
        setOrderItems([]);
        setModeOfPayment('');
        setQtyTotal(0);
        setDiscountPercentageAmountSum(0);
        setTotalOverall(0);
        setRoundOffAmount(0);
        setOverallNetTotal(0);
        setRoundOffAmount1(0);
        setOverallNetTotal1(0);
        setAmountGiven('');
        setChange(0);
        setOverallSubtotalWithoutDiscount(0);
        setOverallSubtotalWithDiscount(0);
        setNumRows(0);
        setIsOrderActive(true);
        setCompany('');
        setSelectedClient(null);
    };
    

    
    const endNewOrder = () => {
        api.post('/poss/cancelOrder', { order_id: sessionOrderId })
            .then(() => {
                clearOrderState();
                setIsOrderActive("Cancelled");
                message('Order ended successfully.', 'success');
                Calculation(orderItems)
            })
            .catch(error => {
                console.error('Error ending order:', error);
                message('Unable to end order.', 'error');
            });
    };
    
    const startNewOrder = () => {
        api.get('/poss/createNewOrder')
            .then((res) => {
                console.log('API Response:', res.data); // Log the response to verify structure
                const newOrderData = res.data;
    
                if (!newOrderData) {
                    throw new Error('New order data is undefined');
                }
    
                clearOrderState(); // Clear the order state first
    
                // Update the state with new order data
                setSessionOrderId(newOrderData.order_id);
                setbillId(newOrderData.bill_number);
                setcompanyId(newOrderData.company_name);
                setcompanyId1(newOrderData.company_id);
                setSessionOrder(newOrderData.gst_status);
                setshippingCharges(parseFloat(newOrderData.shipping_charge) || 0);
                setdiscountCharges(parseFloat(newOrderData.discount) || 0);
                setIsOrderActive(newOrderData.order_status);
    
                // Display success message
                message('New order started successfully.', 'success');
            })
            .catch(error => {
                console.error('Error starting new order:', error);
                message('Unable to start new order.', 'error');
            });
    };
    
    const StartendNewOrder = () => {
        api.post('/poss/cancelOrderandNew', { order_id: sessionOrderId })
            .then((res) => {
                console.log('API Response:', res.data); // Log the response to verify structure

                const newOrderData = res.data;
    
                if (!newOrderData) {
                    throw new Error('New order data is undefined');
                }
    
                clearOrderState();
    
                setSessionOrderId(newOrderData.order_id);
                setbillId(newOrderData.bill_number);
                setcompanyId(newOrderData.company_name);
                setcompanyId1(newOrderData.company_id);
                setSessionOrder(newOrderData.gst_status);
                setshippingCharges(parseFloat(newOrderData.shipping_charge) || 0);
                setdiscountCharges(parseFloat(newOrderData.discount) || 0);
                setIsOrderActive(newOrderData.order_status);
    
                message('Order canceled and new order started successfully.', 'success');
            })
            .catch(error => {
                console.error('Error starting and ending new order:', error);
                message('Unable to start and end new order.', 'error');
            });
    };
    
    const loadOptions = (inputValue, callback) => {
        api.get(`/product/getProductsbySearchFilter`, { params: { keyword: inputValue } })
            .then((res) => {
                const items = res.data.data;
                const options = items.map((item) => ({
                    value: item.product_id,
                    label: item.title,
                    price: item.price,
                    unit: item.unit,
                    gst: item.gst,
                }));
                callback(options);
            })
            .catch(error => {
                console.error('Error loading product options:', error);
            });
    };

    const addProductToOrderItems = (selectedProduct) => {
        const costPrice = selectedProduct.unit_price * selectedProduct.qty;
        console.log("q1q1q1q1", costPrice)
        // Create newItem object with cost_price included
        const newItem = {
            order_id: sessionOrderId,
            qty: selectedProduct.qty,
            record_id: selectedProduct.value,
            item_title: selectedProduct.label,
            unit: selectedProduct.unit,
            unit_price: selectedProduct.price,
            vat: selectedProduct.gst,
            discount_type: "No discount",
            cost_price: costPrice  // Include cost_price in newItem
        };

        api.post('/poss/insertorder_item', newItem)
            .then(() => {
                message('Product added successfully', 'success');
                setOrderItems([...orderItems, newItem]);
                Calculation(orderItems)
            })
            .catch(() => {
                message('Unable to add product.', 'error');
            });
    };

    const deleteItem = (orderItemId) => {
        api.post('/poss/deleteOrderItem', { order_item_id: orderItemId })
            .then(() => {
                setOrderItems(orderItems.filter(item => item.order_item_id !== orderItemId));
                message('Product deleted successfully', 'success');
                Calculation(orderItems)

            })
            .catch(error => {
                console.error('Error deleting product:', error);
                message('Unable to delete product.', 'error');
            });
    };
    console.log("111", sessionOrder)
    
    const updateQuantity = (orderItemId, newQty) => {

        setValueqty(newQty)
        const updatedItem = orderItems.find(item => item.order_item_id === orderItemId);
        
        if (updatedItem) {
            const newCostPrice = updatedItem.unit_price * newQty;

            // Prepare updated data object
            const updatedData = {
                ...updatedItem,
                qty: newQty,
                cost_price: newCostPrice
            };


            api.post('/poss/updateOrderItem', updatedData)
                .then(() => {
                    message('Quantity updated successfully.', 'success');
                    setOrderItems(orderItems.map(item =>
                        item.order_item_id === orderItemId ? updatedData : item
                    ));
                    Calculation(orderItems)
                })
                .catch(() => {
                    message('Unable to update quantity.', 'error');
                });
        }
       
    };

    const updateDiscount = (orderItemId, newDis) => {
        const updatedItem = orderItems.find(item => item.order_item_id === orderItemId);
        if (updatedItem) {
            const updatedData = { ...updatedItem, discounted_amount: newDis };

            api.post('/poss/updateDiscount', updatedData)
                .then(() => {
                    message('Discount updated successfully.', 'success');
                    setOrderItems(orderItems.map(item =>
                        item.order_item_id === orderItemId ? updatedData : item
                    ));
                    Calculation(orderItems)
                  
                })
                .catch(() => {
                    message('Unable to update discount.', 'error');
                });
        }
    };



    const updateDiscountType = (orderItemId, newType) => {
        const updatedItem = orderItems.find(item => item.order_item_id === orderItemId);
        if (updatedItem) {
            const updatedData = {
                ...updatedItem,
                discount_type: newType,
                discounted_amount: newType === "No discount" ? 0 : updatedItem.discounted_amount
            };

            api.post('/poss/updateDiscountType', updatedData)
                .then(() => {
                    message('Discount type updated successfully.', 'success');
                    setOrderItems(orderItems.map(item =>
                        item.order_item_id === orderItemId ? updatedData : item
                    ));
                  Calculation(orderItems)
                })
                .catch(() => {
                    message('Unable to update discount type.', 'error');
                });
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const [shippingCharge, setShippingCharge] = useState(0);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };


    const openModal1 = () => {
        setIsModalOpen1(true);
    };

    // Function to close the modal
    const closeModal1 = () => {
        setIsModalOpen1(false);
    };

    const handleDiscountChargeChange = (e) => {
        setdiscountCharges(parseFloat(e.target.value));
    };

    // Function to handle input change for shipping charge amount
    const handleShippingChargeChange = (e) => {
        setShippingCharge(parseFloat(e.target.value));
    };

    // Function to apply shipping charge
    const applyShippingCharge = () => {
        // Close the modal
        closeModal();

        // Update the shipping charge in the order table using an API call
        api.post('/poss/updateShippingCharge', { order_id: sessionOrderId, shipping_charge: shippingCharge })
            .then(() => {
                // Success message
                message('Shipping charge applied successfully.', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 300);
                // Perform any necessary actions after updating the shipping charge
            })
            .catch(error => {
                // Error handling
                console.error('Error applying shipping charge:', error);
                message('Unable to apply shipping charge.', 'error');
            });
    };


    const applyDiscount = () => {
        // Close the modal
        closeModal1();

        // Update the shipping charge in the order table using an API call
        api.post('/poss/updateDiscountCharge', { order_id: sessionOrderId, discount: discountCharge })
            .then(() => {
                // Success message
                message('Discount charge applied successfully.', 'success');
                Calculation(orderItems)
                // Perform any necessary actions after updating the shipping charge
            })
            .catch(error => {
                // Error handling
                console.error('Error applying shipping charge:', error);
                message('Unable to apply shipping charge.', 'error');
            });
    };

    const UpdateInventory = () => {
        api.post('/finance/getOrdersByIds', { order_id: sessionOrderId })
          .then((res1) => {
            const productIds = res1.data.data.map(item => item.record_id);
      
            productIds.forEach(productId => {
              api.post('/finance/getProductByIds', { record_id: productId })
                .then((res) => {
                  const { inventory_id: inventoryId, actual_stock: actualStockValue } = res.data.data[0];
                  console.log('Product Data:', res.data.data);
                  const updateActualStock = actualStockValue - valueQty;
      
                  api.post('/poss/updateActualStock', { actual_stock: updateActualStock, inventory_id:inventoryId })
                    .then(() => {
                      console.log('Actual stock updated');
                    })
                    .catch(() => {
                      message('Unable to add actual stock.', 'error');
                    });
                })
                .catch(() => {
                  message('Unable to fetch product details.', 'error');
                });
            });
            setTimeout(() => {
                window.location.reload();
            }, 300); })
          .catch(() => {
            message('Unable to fetch order details.', 'error');
          });
      };
      

    const saveAmountGiven = () => {
     
        const data = {
            order_id: sessionOrderId,
            amount_given: amountGiven,
            subtotal_amount: overallNetTotal,
            mode_of_payment: modeOfPayment,
            company_id:companyId
        };

        api.post('/poss/generateBillAndCreateOrder', data)
            .then(() => {
                message('Amount saved successfully.', 'success');
                setTimeout(() => {
                    // window.location.reload();
                }, 300);
            })
            .catch(error => {
                console.error('Error saving amount:', error);
                message('Unable to save amount.', 'error');
            });

    };


    const handleAmountGivenChange = (e) => {
        const givenAmount = parseFloat(e.target.value);
        setAmountGiven(givenAmount);
        setChange(givenAmount - overallNetTotal);
    };



    const loadClientOptions = (inputValue, callback) => {
    api.get(`/poss/getClientsByName`, { params: { keyword: inputValue } })
        .then((res) => {
            const clients = res.data.data;
            const options = clients.map((client) => ({
                value: client.company_id,
                label: client.company_name,
                company_name: client.company_name,
                address: client.address_street,
                phone: client.phone,
                email: client.email,
            }));
            callback(options);
        })
        .catch((error) => {
            console.error('Error loading client options:', error);
        });
};
    
    const addClient = () => {
        if (selectedClient) {
            api.post('/poss/updateClientId', { order_id: sessionOrderId, company_id: selectedClient.value })
                .then(() => {
                    message('Client added successfully', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                })
                .catch(() => {
                    message('Unable to add client.', 'error');
                });
        } else {
            message('Please select a client.', 'error');
        }
    };


    const removeClient = () => {
        api.post('/poss/removeClientId', { order_id: sessionOrderId })
            .then(() => {
                message('Client removed successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            })
            .catch(() => {
                message('Unable to add client.', 'error');
            });
    };

   
    return (
        <div>
            <div className="panel panel-info">
                <div className="panel-heading floatbox">
                    {/* <div className="orderDatePOSHeader float_left">
                        <Input type="text" value='' readOnly />
                    </div> */}


                    <div className="float_left viewAllOrderBtnml20" style={{ marginLeft: 5 ,marginBottom:10}}>
                        <a target='_blank' href="/#/Finance" className="btn btn-primary">View All Order</a>

                        {/* <Button onClick={toggleGSTCalculation} className="btn btn-primary ml10">
                            {sessionOrder === "ON" ? "Disable GST" : "Enable GST"}

                        </Button> */}
                        <Button
                            type="button"
                            className="btn btn-success"
                            onClick={startNewOrder}
                        >
                            Start Order
                        </Button>

                        <Button
                            type="button"
                            className="btn btn-success"
                            onClick={endNewOrder}
                        >
                            End Order
                        </Button>
                        <div className="gst-toggle">
                        <Label>ON
                            </Label>&nbsp;
                                <Input type="radio" name="gst-status" value="ON" checked={sessionOrder === "ON"} onChange={toggleGSTCalculation} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Label>  OFF
                            </Label> &nbsp;
                                <Input type="radio" name="gst-status" value="OFF" checked={sessionOrder === "OFF"} onChange={toggleGSTCalculation} />
                                
                        </div>

                       
                        

                        <Button
                            type="button"
                            className="btn btn-danger ml20"
                            onClick={StartendNewOrder}
                        >
                            Cancel Order
                        </Button>
                        
                    </div>

                </div>

                <div className="panel-body">
                    <table className="addProductTablePOS" width="100%">
                        <tbody>
                            <tr>
                                <td width="35%">
                                    <div className="addProduct">
                                        <AsyncSelect
                                            loadOptions={loadOptions}
                                            onChange={addProductToOrderItems}
                                            placeholder="Please Type Product Name"
                                            isDisabled={isOrderActive === "Cancelled"}
                                        />
                                    </div>
                                </td>
                                <td width="3%" align="center"></td>
                                <td width="13%" align="center"><Label style={{fontWeight:'bold' }}>Mode Of Payment</Label>
                                    <div className="float_left modeOfPaymentDropdown">
                                        <select value={modeOfPayment} onChange={handleModeOfPaymentChange}style={{borderRadius:3 }}>
                                            <option value=''>Please Select</option>
                                            {mopArray.map((mop) => (
                                                <option value={mop}>{mop}</option>
                                            ))}
                                        </select>
                                    </div></td>

                                <td width="15%" align="center">
                                    <>
                                        {isOrderActive !== "Cancelled" ? (
                                            <>
                                                <div className="OrderNoOnTop"style={{fontWeight:'bold' }}>BILL NO: {billId}</div>
                                                <div className="OrderNoOnTop" style={{fontWeight:'bold' }}>ORDER NO: {sessionOrderId}</div>
                                            </>
                                        ) : (
                                            <p></p>
                                        )}
                                    </>
                                </td>

                                <td width="6%" align="center">
                                    <>
                                        {isOrderActive !== "Cancelled" ? (
                                            <>
                                                <b>No.Of Products</b>
                                                <div className="OrderNoOnTop NoOfProductsOnTop">{orderItems.length}</div>
                                            </>
                                        ) : (
                                            <p></p>
                                        )}
                                    </>
                                </td>

                                <td width="29%" align='center'>
                                    <>
                                        {isOrderActive !== "Cancelled" ? (
                                            <div className="TotalAmountDisplayTop float_right"><b>{sessionOrder === "ON" ? overallNetTotal.toFixed(2) : overallNetTotal1.toFixed(2)}</b></div>
                                        ) : (
                                            <p></p>
                                        )}
                                    </>
                                </td>


                            </tr>
                        </tbody>
                    </table>
                 
                    <table className="table table-hover table-bordered mt20" id="addProductTablePOS">
                        <thead>
                            <tr>
                                <th width="2%" style={{textAlign:'center'}} >Sr No.</th>
                                <th width="35%" style={{textAlign:'center'}}   >Product Name</th>
                                <th width="4%" style={{textAlign:'center'}} >Unit</th>
                                <th width="7%"  style={{textAlign:'center'}}>Qty</th>
                                <th width="4%" style={{textAlign:'center'}}>Rate</th>
                                <th width="9%" style={{textAlign:'center'}}>Dis Type</th>
                                <th width="7%"  style={{textAlign:'center'}}>Dis Amt</th>
                                {sessionOrder === "ON" && (
                                    <th width="5%" className="txtRight" style={{textAlign:'center'}} >GST Amount</th>
                                )}

                                <th width="5%"style={{textAlign:'center'}} >Amt</th>
                                <th width="5%" style={{textAlign:'center'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item, index) => {
                                // Calculate the subtotal without discount for each item
                                const subtotalWithoutDiscount = item.qty * item.unit_price;
                                const discountAmount = item.discount_type === "%"
                                    ? (subtotalWithoutDiscount * item.discounted_amount) / 100
                                    : item.discounted_amount;
                                const subtotalWithDiscount = subtotalWithoutDiscount - discountAmount;
                                const gstValue = subtotalWithDiscount * item.vat / 100;
                                const total = subtotalWithDiscount + gstValue;
                                return (
                                    <>
                                        {isOrderActive !== "Cancelled" ? (
                                            <tr key={item.order_item_id}>
                                                <td style={{fontWeight:'bold' }}>{index + 1}</td>
                                                <td>{item.item_title}</td>
                                                <td>{item.unit}</td>
                                                <td className="txtCenter">
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        value={item.qty}
                                                        onChange={(e) => updateQuantity(item.order_item_id, e.target.value)}
                                                    />
                                                </td>
                                                <td className="txtRight">{item.unit_price}</td>
                                                <td>
                                                    <select
                                                        value={item.discount_type}
                                                        onChange={(e) => updateDiscountType(item.order_item_id, e.target.value)}
                                                    >
                                                        <option value="">Please Select</option>
                                                        {discountTypeOptions.map((option) => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="txtRight">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={item.discount_type === "No discount" ? 0 : item.discounted_amount}
                                                        onChange={(e) => updateDiscount(item.order_item_id, e.target.value)}
                                                        disabled={item.discount_type === "No discount"}
                                                    />
                                                </td>
                                                {sessionOrder === "ON" && (
                                                    <td className="txtRight">
                                                        {Number.isNaN(gstValue) ? "0.00" : gstValue.toFixed(2)} ({item.vat}%)
                                                    </td>

                                                )}
                                                <td className="txtRight" style={{fontWeight:'bold' }}>
                                                    {sessionOrder === "ON"
                                                        ? (Number.isNaN(total) ? "0.00" : total.toFixed(2))
                                                        : (Number.isNaN(subtotalWithDiscount) ? "0.00" : subtotalWithDiscount.toFixed(2))}
                                                </td>

                                                <td>
                                                    <Button color="danger" onClick={() => deleteItem(item.order_item_id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ) : (
                                            <p></p>
                                        )}
                                    </>
                                );

                            })}

                        </tbody>
                    </table>
                   

                    <>
                        {isOrderActive !== "Cancelled" ? (
                            <table className="table table-bordered mt10" style={{fontWeight:'bold' }}>
                                <tbody>

                                    <tr>
                                        <td colSpan={5} className='totalFontSize' style={{fontWeight:'bold' }}>Shipping Charge</td>
                                        <td id='fld_shipping_charge' className='txtRight totalFontSize'>{shippingCharges}</td>
                                        <td colSpan={3} className='totalDiscount totalFontSize' style={{fontWeight:'bold' }}>Total Qty</td>
                                        <td className='totalQty'>{qtyTotal}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className='totalFontSize' style={{fontWeight:'bold' }}>Total Amount</td>
                                        <td id='fld_net_amount' className='txtRight totalFontSize'>
                                            {sessionOrder === "ON" ? (parseFloat(totalOverall) || 0).toFixed(2) : (parseFloat(overallSubtotalWithDiscount) || 0).toFixed(2)}
                                        </td>
                                        <td colSpan={3} className='totalDiscount totalFontSize'style={{fontWeight:'bold' }}>Total Discount</td>
                                        <td id='fld_totalDiscount_amount' className='totalDiscount totalFontSize'>{discountPercentageAmountSum + discountCharge}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className='totalFontSize' style={{fontWeight:'bold' }}>Round Off</td>
                                        <td id='fld_roundOff_amount' className='txtRight totalFontSize'>
                                            {sessionOrder === "ON" ? (parseFloat(roundOffAmount) || 0).toFixed(2) : (parseFloat(roundOffAmount1) || 0).toFixed(2)}
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className='netTotal' style={{fontWeight:'bold' }}>Net Total</td>
                                        <td id='fld_netTotal_amount' className='txtRight netTotal'>
                                            {sessionOrder === "ON" ? (parseFloat(overallNetTotal) || 0).toFixed(2) : (parseFloat(overallNetTotal1) || 0).toFixed(2)}
                                        </td>
                                        <td></td>
                                    </tr>

                                    <tr className='txt_20px'>
                                        <td colSpan={5} className='txtRight' style={{fontWeight:'bold' }}>Amount Paid</td>
                                        <td className='txtRight amountGiven'>
                                            <input
                                                type='number'
                                                value={amountGiven}
                                                id='fld_amount_given'
                                                className='text w150 txtRight txt_20px'
                                                name='amount_given'
                                                total={overallNetTotal}
                                                onChange={handleAmountGivenChange}
                                            />
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr className='balanceRow'>
                                        <td colSpan={5} className='netTotal'>Change</td>
                                        <td className='netTotal balance'>{change}</td>
                                        <td></td>
                                        <td>
                                        
                                        </td>
                                    </tr>
                                    <input type='hidden' id='fld_subtotal_amount' name='subtotal_amount' value={overallNetTotal} />
                                    <input type='hidden' id='fld_qty_total' name='qty_total' value={qtyTotal} />
                                    <input type='hidden' id='fld_products_total' name='fld_products_total' value={numRows} />
                                    <input type='hidden' id='fld_current_order_id' name='fld_current_order_id' value={sessionOrderId} />
                                    <input type='hidden' id='fld_current_mode_of_payment' name='mode_of_payment' value={modeOfPayment} />

                                </tbody>
                            </table>
                        ) : (
                            <p></p>
                        )}
                    </>
                    <>
                        {isOrderActive !== "Cancelled" ? (
                            <div className="float_left viewAllOrderml20 mt50">
                                
                                <Modal isOpen={isModalOpen1} toggle={closeModal1}>
                                    <ModalHeader toggle={closeModal1}>Enter Discount</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={discountCharge}
                                            onChange={handleDiscountChargeChange}
                                            placeholder="Enter discount charge amount"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={applyDiscount}>Apply</Button>{' '}
                                        <Button color="secondary" onClick={closeModal1}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>

                            
                                <Modal isOpen={isModalOpen} toggle={closeModal}>
                                    <ModalHeader toggle={closeModal}>Enter Shipping Charge</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={shippingCharge}
                                            onChange={handleShippingChargeChange}
                                            placeholder="Enter shipping charge amount"
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={applyShippingCharge}>Apply</Button>{' '}
                                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                                <div className="client-search mt-2" style={{ maxWidth: '300px' }}>
    <AsyncSelect
        loadOptions={loadClientOptions}
        onChange={setSelectedClient}
        isClearable
        placeholder="Search for a client"
        styles={{
            container: (provided) => ({
                ...provided,
                marginBottom: '10px',
            }),
        }}
    />
    {companyId && companies && (
        <div>
            <p>Company Name: {companies.company_name || 'N/A'}</p>
            <p>Mobile: {companies.phone || 'N/A'}</p>
            <p>Email: {companies.email || 'N/A'}</p>
            <p>Address: {companies.address_street || 'N/A'}</p>
        </div>
    )}
</div>;
                                <Button onClick={addClient} className="btn btn-primary mr-2 mb-2">
                                    Add Client
                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  
                                <Button onClick={removeClient} className="btn btn-primary mb-2">
                                    Remove Client
                                </Button>
                                    
                                <Button onClick={openModal} className="btn btn-primary mr-2 mb-2" style={{ marginLeft: 480 }} >
                                    Apply Shipping Charge
                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button onClick={openModal1} className="btn btn-primary mr-2 mb-2">
                                    Apply Discount
                                </Button>&nbsp;
                                <Button onClick={() => { saveAmountGiven(); UpdateInventory(); }} className="btn btn-primary mr-2 mb-2" style={{ marginLeft: 14 }}>Submit</Button>
                                
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </>
                </div>
            </div>
        </div>

    );
};

export default OrderList;
