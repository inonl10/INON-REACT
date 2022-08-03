import { Button } from "@mui/material";
import React from "react";
import {useState,useEffect} from "react";
import { useCart } from "../cartContext";
import { useNavigate } from "react-router-dom";

function ClientInfo({setOrder}) {

  let navigate = useNavigate();
  const {cart}  = useCart()
//const [cartId, setCartId] = useState([]);

  const createCartId = () =>
  {
    let cartId=[]
    for (let i of cart) {
      cartId.push(i.id)
    }
    return cartId;
  }
 // useEffect(() => {
    //createCartId();
  //}, []);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone:"",
    dishes:createCartId()
  });

  const handleForm = (e) => {
    setForm((formState) => {
      return {
        ...formState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addOrder = (e) => {
     e.preventDefault();
    fetch("http://127.0.0.1:8000/api/order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(() => {
          return data;
        });
      });

    navigate("/endscreen", { replace: true });
  };

  return (

    
    <form  style={{ padding: "20px",width:"27%",minWidth:"300px" ,display:'flex',alignItems:'flex-start',flexDirection:'column',rowGap:'4px'}}  onSubmit={addOrder}>
      <h5>Delivery Info</h5>
       <input 
          type="text"
          name="first_name"
          placeholder="First name"
          className="form-control"
          onChange={handleForm}
          value={form.first_name}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          className="form-control"
          onChange={handleForm}
          value={form.last_name}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="form-control"
          onChange={handleForm}
          required
          value={form.address}
        />
        <input
          type="number"
          name="phone"
          placeholder="Phone"
          className="form-control"
          onChange={handleForm}
          value={form.phone}
          required
        />
      <button type='submit' className="btn btn-primary" style={{marginTop:'10px'}}>
              Submit order
      </button>
    </form>
  );
}

export default ClientInfo;
