import React, { useEffect, useState } from "react";
import { useCart } from "../cartContext";
import Cards from "./Cards";
import { Link } from "react-router-dom";
function Cart() {
  const {cart} = useCart();
  const [totalPrice,setTotalPrice] = useState(0)
 
  const calcAmount = () =>{
    let total = 0
    for(let dish of cart)
        total += (dish.price * dish.amount)
    setTotalPrice(total)    
  }

  useEffect(calcAmount,[cart])


  return (
    <div style={{ marginTop: "25px", textAlign: "center" }}>
      <h4 style={{ color: "black" }}>Order summary</h4>
      <h5 style={{ margin: "17px", fontFamily: "Times New Roman" }}>
        total amount: ${totalPrice}
      </h5>
      
     <Link to={"/info"} className="btn btn-primary">
              Proceed
            </Link>
      {cart && <Cards propDishes={cart}/>}
    </div>
  );
}

export default Cart;
