
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartContextProvider = ({children}) => {

    const [cart,setCart] = useState([]);

    return <CartContext.Provider
    value={{cart,setCart}}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext)
    return context;
}