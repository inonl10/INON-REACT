import React from "react";
import { Link } from "react-router-dom";

function EndScreen({order}) {
  console.log(order)
  return (
    <div style={{ marginTop: "25px", textAlign: "center" }}>
      <h4>Thank you for your order</h4>
      <h6 style={{ marginTop: "30px" }}>Your order number is: {order.id}</h6>
      <div style={{ marginTop: "40px" }}></div>
      <Link to={"/"} className="btn btn-primary">
        To Home screen
      </Link>
    </div>
      
  );
}

export default EndScreen;
