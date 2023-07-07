import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddFeedback from "../AddFeedback/AddFeedback";
const ToRate = () => {
     const accessToken = localStorage.getItem('jwtToken');
     const [orderList, setOrderList] = useState([]);
     const [ShowLogItemsNull, setShowLogItemsNull] = useState(true);
     const [ShowFeedTable, setShowFeedTable] = useState(false);

     useEffect(() => {
          const LoadApi = () => {
               axios.get("https://localhost:7241/api/Shop/Product_To_Feedback", {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })
                    .then((response) => {

                         if (response.data.length) {
                              setShowLogItemsNull(false)
                              setOrderList(response.data);
                         }


                    })
                    .catch(error => {
                         console.log(error);
                    });
          }
          if(ShowFeedTable === false  ){
               LoadApi()
          }
     }, [ShowFeedTable]);

     const handleFeedback = () => {
          setShowFeedTable(true)
     }
     return (
          <div className="option-page-MyPurChase" >
               {ShowLogItemsNull && (
                    <div style={{ minHeight: '500px', backgroundColor: '#fff' }}></div>
               )}

               {
                    orderList.map((orderListItem) =>

                         <div className="toRate-log-item  mb-3" key={orderListItem.orderDetailId} style={{ backgroundColor: '#fff', padding: "0px 10px" }}>

                              <div className="toPay-nameShop">
                                   <div className="toPay-nameShop-log" style={{ fontSize: "18px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="iconShop-log-toPay">
                                             <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                             <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                                        </svg>
                                        {orderListItem.shopName}
                                   </div>
                                   <div className="toPay-Product-text">

                                        <div className="toPay-subitem-text" style={{ color: "green" }}>COMPLETED</div>
                                   </div>
                              </div>


                              <div className="toPay-product" key={orderListItem.productId} >
                                   <div style={{ display: "flex" }}>
                                        <img src={orderListItem.imagePath} alt="" />
                                        <div className="toPay-ProductName">
                                             <div className="toPay-name">{orderListItem.nameProduct}</div>
                                             <div className="toPay-quantity">x{orderListItem.quantity}</div>
                                        </div>
                                   </div>

                                   <div className="toPay-Product-price">
                                        <div className="toPay-num" style={{ textDecoration: "line-through" }}>${orderListItem.soldPrice}</div>
                                        <div className="toPay-numSoldPrice">${orderListItem.discountPrice}</div>

                                   </div>
                                   <div style={{ width: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>Into Money: <div style={{ width: "20%", display: "inline", fontSize: "20px", fontWeight: "500", paddingLeft: "10px", color: "#dc3545" }}> {orderListItem.totalDetail}</div></div>
                                   <div className="button-feedback" style={{ width: "15%", display: "flex", alignItems: "center", justifyContent: "center", }}>
                                        <button style={{ border: "none", backgroundColor: "#176eb0", color: "#fff", padding: "5px 10px", borderRadius: "3px" }} onClick={() => handleFeedback(orderListItem)}>
                                             Feedback
                                        </button>
                                   </div>
                              </div>
                              {
                                   ShowFeedTable && (
                                        <AddFeedback productId={orderListItem.productId} orderDetailId={orderListItem.orderDetailId} productName={orderListItem.nameProduct} setShowFeedTable={setShowFeedTable} />
                                   )
                              }
                         </div>

                    )
               }

          </div>
     )

}
export default ToRate;