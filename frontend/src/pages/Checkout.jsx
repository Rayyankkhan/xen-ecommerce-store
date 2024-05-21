/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
// import { Link } from "react-router-dom";
// import CartItems from "../Components/CartItems";

const Checkout = () => {
  const { all_products, cartItems, getTotalCartAmount } =
    useContext(ShopContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    postalCode: "",
    // Add more fields as needed
  });

  const [cardDetails, setCardDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    // Add more fields as needed
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e, data) => {
    const { name, value } = e.target;
    if (data === "formData") {
      setFormData({ ...formData, [name]: value });
    } else if (data === "cardDetails") {
      setCardDetails({ ...cardDetails, [name]: sanitizeNumericInput });
    }
  };

  const sanitizeNumericInput = (value) => {
    return value.replace(/\D/g, ""); // Remove non-numeric characters
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === 1) {
        // Move to next step if step 1 is completed
        setStep(step + 1);
      } else if (step === 2) {
        // Move to next step if step 2 is completed
        setStep(step + 1);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const totalAmount = getTotalCartAmount();
      const items = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const response = await fetch("https://xen-ecommerce-store-backend.vercel.app/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalAmount,
          paymentMethod,
          shippingDetails: formData,
          paymentDetails: paymentMethod === "card" ? cardDetails : {},
        }),
      });
      if (response.ok) {
        setStep(4);
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {/* <h2 className='opacity-40'>Step 1</h2> */}
            <form onSubmit={handleSubmit}>
              <h3 className="h3">Shipping Information</h3>
              <div className="flex flex-col gap-4 mt-7">
                <input
                  name="username"
                  value={FormData.username}
                  onChange={(e) => handleChange(e, "formData")}
                  type="text"
                  placeholder="Your Name"
                  className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                />
                <div className="flex items-center gap-x-5">
                  <input
                    name="email"
                    value={FormData.email}
                    onChange={(e) => handleChange(e, "formData")}
                    type="email"
                    placeholder="Your Email"
                    className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                  />
                  <input
                    name="phone"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={FormData.phone}
                    onChange={(e) => handleChange(e, "formData")}
                    type="tel"
                    placeholder="Phone no"
                    className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                  />
                </div>
                <input
                  name="address"
                  value={FormData.address1}
                  onChange={(e) => handleChange(e, "formData")}
                  type="text"
                  placeholder="Address 1"
                  className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                />
                <input
                  name="address"
                  value={FormData.address2}
                  onChange={(e) => handleChange(e, "formData")}
                  type="text"
                  placeholder="Address 2"
                  className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                />

                <div className="flex items-center gap-x-5 ">
                  <input
                    name="country"
                    value={FormData.country}
                    onChange={(e) => handleChange(e, "formData")}
                    type="text"
                    placeholder="Country"
                    className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                  />
                  <input
                    name="city"
                    value={FormData.city}
                    onChange={(e) => handleChange(e, "formData")}
                    type="text"
                    placeholder="City"
                    className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                  />
                  <input
                    name="postalcode"
                    value={FormData.postalcode}
                    onChange={(e) => handleChange(e, "formData")}
                    type="number"
                    placeholder="Postal Code"
                    className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                  />
                </div>
              </div>
              <button type="submit" className=" btn-dark rounded-xl my-5 !py-1">
                Next
              </button>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <h3 className="h3">Payment Method</h3>

              {paymentMethod === "card" ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="h3">Card </h3>
                  <div className="flex flex-col gap-4 mt-7">
                    <input
                      name="cardName"
                      value={cardDetails.cardName}
                      onChange={(e) => handleChange(e, "cardDetails")}
                      type="text"
                      placeholder="Enter Name on card"
                      className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                    />
                    <input
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={(e) => handleChange(e, "cardDetails")}
                      type="text"
                      placeholder="Card Number"
                      className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                    />
                    <div className="flex items-center gap-x-5">
                      <input
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleChange(e, "cardDetails")}
                        type="text"
                        pattern="[0-9]*"
                        maxLength="5"
                        placeholder="Expiry Date (mm/yy)"
                        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                      />
                      <input
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) => handleChange(e, "cardDetails")}
                        type="text"
                        pattern="[0-9]*"
                        maxLength="4"
                        placeholder="CVV"
                        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-3 mt-10">
                    <button
                      className="btn-dark-outline rounded-xl my-5 !py-1"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </button>
                    <button
                      className="btn-dark rounded-xl my-5 !py-1"
                      onClick={handlePlaceOrder}
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="h3">Order Summary</h3>
                  {/* Display order summary */}
                  <div className="flex flex-col gap-2 mt-4">
                  <table className="w-full mx-auto">
                <thead className="">
                    <tr className="bg-tertiary/90 text-white regular-16 sm:regular-18 text-start py-12">
                        <th className="p-1 py-2">Products</th>
                        <th className="p-1 py-2">title</th>
                        <th className="p-1 py-2">Price</th>
                       
                        
                       
                    </tr>
                </thead>
                <tbody>
                  {all_products.map((e)=> {
                    if(cartItems[e.id] > 0 ) {
                      return <tr key={e.id} className="border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center">
                        <td className="flexCenter"><img src={e.image} alt="productimg" height={43} width={43} className="rounded-lg ring-1 ring-slate-900/5 my-1" /></td>
                        <td ><div className="line-clamp-3">{e.name}</div></td>
                        <td className="">${e.new_price}</td>
                      </tr>
                    }
                    return null;
                  })}
                </tbody>
            </table> 
                  </div>
                  <div className="flex justify-between mt-4">
                    <span>Total Amount:</span>
                    <span>${getTotalCartAmount()}</span>
                  </div>
                  <button
                    className="btn-dark rounded-xl my-5 !py-1"
                    onClick={handlePlaceOrder}
                  >
                    Confirm Order
                  </button>
                </div>
              )}

              {/* payments button */}
              <div className="flex flex-col gap-4 mt-7">
                <button
                  className={`btn-dark rounded-xl my-2 !py-1 ${
                    paymentMethod === "card" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("card")}
                >
                  Pay with Card
                </button>
                <button
                  className={`btn-dark-outline rounded-xl my-2 !py-1 ${
                    paymentMethod === "COD" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("COD")}
                >
                  Cash on Delivery
                </button>
              </div>
            </div>
          </>
          //      {/* <div>
          //    <h3 className="h3">Card Payment</h3>
          //    <div className="flex flex-col gap-4 mt-7">
          //   <input
          //      name="cardname"
          //      value={FormData.cardName}
          //      onChange={handleChange}
          //      type="text"
          //      placeholder="Enter Name on card"
          //      className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          //    />
          //    <input
          //      name="cardnumber"
          //      value={FormData.cardNumber}
          //      onChange={handleChange}
          //      type="number"
          //      placeholder="Card Number"
          //      className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          //    />
          //    <div className="flex items-center gap-x-5">
          //      <input
          //        name="expiry"
          //        value={FormData.expiryDate}
          //        onChange={handleChange}
          //        type="number"
          //        pattern="[0-9]*"
          //        maxLength="5"
          //        placeholder="Expiry Date (mm/yy)"
          //        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          //      />
          //      <input
          //        name="cvv"
          //        value={FormData.cvv}
          //        onChange={handleChange}
          //        type="number"
          //        pattern="[0-9]*"
          //        maxLength="4"
          //        placeholder="CVV"
          //        className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
          //      />
          //    </div>
          //  </div>
          //    <button
          //      className="btn-dark rounded-xl my-5 !py-1"
          //      onClick={handlePlaceOrder}
          //    >
          //      Pay Now
          //    </button>
          //  </div> */}
        );
      // case 3:
      //   if (paymentMethod === "COD") {
      //     return (
      //       <div>
      //         <h3 className="h3">Order Summary</h3>
      //         {/* Display order summary */}
      //         <button
      //           className="btn-dark rounded-xl my-5 !py-1"
      //           onClick={handlePlaceOrder}
      //         >
      //           Confirm Order
      //         </button>
      //       </div>
      //     );
      //   } else if (paymentMethod === "card") {
      //     return (
      //       <div>
      //         <h3 className="h3">Card Payment</h3>
      //         <div className="flex flex-col gap-4 mt-7">
      //        <input
      //           name="cardname"
      //           value={FormData.cardName}
      //           onChange={handleChange}
      //           type="text"
      //           placeholder="Enter Name on card"
      //           className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //         />
      //         <input
      //           name="cardnumber"
      //           value={FormData.cardNumber}
      //           onChange={handleChange}
      //           type="number"
      //           placeholder="Card Number"
      //           className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //         />
      //         <div className="flex items-center gap-x-5">
      //           <input
      //             name="expiry"
      //             value={FormData.expiryDate}
      //             onChange={handleChange}
      //             type="number"
      //             pattern="[0-9]*"
      //             maxLength="5"
      //             placeholder="Expiry Date (mm/yy)"
      //             className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //           />
      //           <input
      //             name="cvv"
      //             value={FormData.cvv}
      //             onChange={handleChange}
      //             type="number"
      //             pattern="[0-9]*"
      //             maxLength="4"
      //             placeholder="CVV"
      //             className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //           />
      //         </div>
      //       </div>
      //         <button
      //           className="btn-dark rounded-xl my-5 !py-1"
      //           onClick={handlePlaceOrder}
      //         >
      //           Pay Now
      //         </button>
      //       </div>
      //     );
      //   }
      //   break;
      //   case 4:
      //     return (
      //       <>
      //       <h2 className="h3 text-center">Order Placed</h2>
      //       <p className=" text-center h2">Your order has been placed successfully!</p>
      //     </>
      //     );
      // case 3:
      //   return (
      //     <>
      //       {/* <h2>Step 2: Payment Information</h2> */}
      //       <form onSubmit={handleSubmit}>
      //         <h3 className="h3">Card Details</h3>
      //         <div className="flex flex-col gap-4 mt-7">
      //           <input
      //             name="cardname"
      //             value={FormData.cardName}
      //             onChange={handleChange}
      //             type="text"
      //             placeholder="Enter Name on card"
      //             className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //           />
      //           <input
      //             name="cardnumber"
      //             value={FormData.cardNumber}
      //             onChange={handleChange}
      //             type="number"
      //             placeholder="Card Number"
      //             className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //           />
      //           <div className="flex items-center gap-x-5">
      //             <input
      //               name="expiry"
      //               value={FormData.expiryDate}
      //               onChange={handleChange}
      //               type="number"
      //               pattern="[0-9]*"
      //               maxLength="5"
      //               placeholder="Expiry Date (mm/yy)"
      //               className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //             />
      //             <input
      //               name="cvv"
      //               value={FormData.cvv}
      //               onChange={handleChange}
      //               type="number"
      //               pattern="[0-9]*"
      //               maxLength="4"
      //               placeholder="CVV"
      //               className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
      //             />
      //           </div>
      //         </div>

      //         <div className="flex items-center gap-x-3 mt-10">
      //           <button
      //             className="btn-dark-outline rounded-xl my-5 !py-1"
      //             onClick={() => setStep(step - 1)}
      //           >
      //             Previous
      //           </button>
      //           <button
      //             className="btn-dark rounded-xl my-5 !py-1"
      //             type="submit"
      //           >
      //             Next
      //           </button>
      //         </div>
      //       </form>
      //     </>
      //   );
      case 3:
        return (
          <>
            <h2 className="h3 text-center">Order Placed</h2>
            <p className=" text-center h2">
              Your order has been placed successfully!
            </p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <section className="max-padd-container flexCenter py-32 flex-col bg bg-primary ">
        <div className="w-full max-w-[666px]   bg-primary !m-auto">
          {renderStepContent()}
        </div>
      </section>
    </>
  );
};

export default Checkout;
