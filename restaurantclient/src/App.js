import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ClientInfo from "./pages/ClientInfo";
import EndScreen from "./pages/EndScreen";
import Navbar from "./pages/Navbar";
import { Card } from "@mui/material";
import Cards from "./pages/Cards";
import {useState} from "react";

function App() {
 const [order,setOrder] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route
            path="category/:id"
            element={<Cards />}/>
          <Route path="cart/" element={<Cart />} />
          <Route path="info/" element={<ClientInfo setOrder={setOrder}/>} />
          <Route path="endscreen/" element={<EndScreen order={order}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
