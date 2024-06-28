// client/src/components/InvoiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvoiceForm.css';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: '',
      address: '',
      cityStatePincode: '',
      pan: '',
      gst: '',
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      cityStatePincode: '',
      stateCode: '',
    },
    shippingDetails: {
      name: '',
      address: '',
      cityStatePincode: '',
      stateCode: '',
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: '',
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDate: '',
    },
    reverseCharge: '',
    number_of_items: 1,
    items: [
      { 
        description: '',
        unitPrice: '',
        quantity: '', 
        discount: '', 
        taxRate: '' 
      }
    ],
    signature: '',
    totalAmount: 0,
  });

  // Function to calculate total amount
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
      const netAmount = (item.unitPrice * item.quantity) - item.discount;
      return total + netAmount;
    }, 0);
  };

  useEffect(() => {
    const totalAmount = calculateTotalAmount(formData.items);
    setFormData((prevState) => ({
      ...prevState,
      totalAmount
    }));
  }, [formData.items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setFormData((prevState) => {
      const newState = { ...prevState };
      let pointer = newState;
      
      // check if keys length is equal to 1 and key is  'number_of_items'
      console.log(keys);
      if (keys.length === 1 && keys[0] === 'number_of_items') {
        // convert value to number and append objects to items so that form is rendered updated
        if (value >= 1 && value <= 10) {
          newState.items = Array(parseInt(value)).fill().map((_, index) => ({
            description: '',
            unitPrice: '',
            quantity: '', 
            discount: '', 
            taxRate: ''
          }));
        } else {
          alert('Number of items should be between 1 and 10.');
          return prevState;
        }
      }
      let key_list;
      let key_index;
      
      keys.forEach((key, index) => {
        // check if '[' is present in the key
        if (key.includes('[')) {
          key_list = key.split('[');
          key = key_list[0]
          key_index = parseInt(key_list[1].replace(']', ''));
        } 

        if (index === keys.length - 1) {
          if (key_index >= 0) {
            pointer[key_index][key] = value;
          }
          else {
            pointer[key] = value;
          }
        }
  
         else {
          // Initialize nested object if it doesn't exist
          if (!pointer[key]) {
            pointer[key] = {};
          }
          pointer = pointer[key];
        }
        const totalAmount = calculateTotalAmount(newState.items);
        newState.totalAmount = totalAmount;
      });
      
      return newState;
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/invoices', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating invoice', error);
    }
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <h2>Seller Details</h2>
      <input type="text" name="sellerDetails.name" placeholder="Name" required onChange={handleChange} />
      <input type="text" name="sellerDetails.address" placeholder="Address" required onChange={handleChange} />
      <input type="text" name="sellerDetails.cityStatePincode" placeholder="City, State, Pincode" required onChange={handleChange} />
      <input type="text" name="sellerDetails.pan" placeholder="PAN No." required onChange={handleChange} />
      <input type="text" name="sellerDetails.gst" placeholder="GST Registration No." required onChange={handleChange} />

      <h2>Place of Supply</h2>
      <input type="text" name="placeOfSupply" placeholder="Place of Supply" required onChange={handleChange} />

      <h2>Billing Details</h2>
      <input type="text" name="billingDetails.name" placeholder="Name" required onChange={handleChange} />
      <input type="text" name="billingDetails.address" placeholder="Address" required onChange={handleChange} />
      <input type="text" name="billingDetails.cityStatePincode" placeholder="City, State, Pincode" required onChange={handleChange} />
      <input type="text" name="billingDetails.stateCode" placeholder="State Code" required onChange={handleChange} />

      <h2>Shipping Details</h2>
      <input type="text" name="shippingDetails.name" placeholder="Name" required onChange={handleChange} />
      <input type="text" name="shippingDetails.address" placeholder="Address" required onChange={handleChange} />
      <input type="text" name="shippingDetails.cityStatePincode" placeholder="City, State, Pincode" required onChange={handleChange} />
      <input type="text" name="shippingDetails.stateCode" placeholder="State Code" required onChange={handleChange} />

      <h2>Order Details</h2>
      <input type="text" name="orderDetails.orderNo" placeholder="Order No" required onChange={handleChange} />
      <input type="date" name="orderDetails.orderDate" placeholder="Order Date" required onChange={handleChange} />

      <h2>Invoice Details</h2>
      <input type="text" name="invoiceDetails.invoiceNo" placeholder="Invoice No" required onChange={handleChange} />
      <input type="date" name="invoiceDetails.invoiceDate" placeholder="Invoice Date" required onChange={handleChange} />

      <h2>Reverse Charge</h2>
      <input type="text" name="reverseCharge" placeholder="Yes/No" required onChange={handleChange} />

      <h2>Items</h2>
      <h3>Number of Items: {formData.number_of_items}</h3>
      <input type="number" name="number_of_items" placeholder="Number of Items"  onChange={handleChange} />
      <div className="item-inputs">
        {formData.items.map((item, index) => (
          <div key={index}>
            <h4>Item {index + 1}</h4>
            <input type="text" name={`items[${index}].description`} placeholder="Description" required onChange={handleChange} />
            <input type="number" name={`items[${index}].unitPrice`} placeholder="Unit Price" required onChange={handleChange} />
            <input type="number" name={`items[${index}].quantity`} placeholder="Quantity" required onChange={handleChange} />
            <input type="number" name={`items[${index}].discount`} placeholder="Discount"  onChange={handleChange} />
            <input type="number" name={`items[${index}].taxRate`} placeholder="Tax Rate" onChange={handleChange} />
          </div>
        ))}
        {/* add element for total amount for items */}
        
      </div>
      <h3>Total Amount: {formData.totalAmount}</h3>

      <h2>Signature</h2>
      <input type="text" name="signature" placeholder="Signature URL" onChange={handleChange} />

      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
