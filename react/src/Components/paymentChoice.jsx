import React, { useState } from 'react';
import paypalLogo from '../photos/Paypal_2014_logo.png';
import MasterLogo from '../photos/MasterCard_Logo.png';
import style from "./cssComponents/choice.module.css";




function PaymentForm() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
    <br />
    <div >
        
      <div>
      <img width={70} src={paypalLogo} alt="PayPal Logo" />
        <input  
          type="radio"
          name="paymentOption"
          value="paypal"
          checked={selectedOption === 'paypal'}
          onChange={handleOptionChange}
        />
        PayPal
    
        <img  width={70} src={MasterLogo} alt="PayPal Logo" />
         <input 
          type="radio"
          name="paymentOption"
          value="creditCard"
          checked={selectedOption === 'creditCard'}
          onChange={handleOptionChange}
        />
        Credit Card
        
      </div>
      
       
      

      {selectedOption === 'paypal' && (
        <div>
          {/* PayPal payment form goes here */}
          <p>{selectedOption} </p>
          <label>
          Email:
          <input 
           id={style.paypal}
          
          type="email" 
          name="paypalEmail" />
        </label>
        <label>
          Password:
          <input
           id={style.paypal}
           
          type="password" 
          name="paypalPassword" />
        </label>
        {/* Add more PayPal form fields as needed */}
      </div>
      )}

      {selectedOption === 'creditCard' && (
        <div>
          {/* Credit card payment form goes here */}
          <p>{selectedOption} </p>
          <label>
          Card Number:
          <input
          id={style.master}
          type="text" name="cardNumber" />
        </label>
        <label>
          Expiration Date:
          <input
          id={style.master}
           type="text" name="expirationDate" />
        </label>
        <label>
          CVV:
          <input 
          id={style.master}
          type="text" name="cvv" />
        </label>
        </div>
      )}
    </div>
    </>
  );
}

export default PaymentForm;
