
import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchContextProvider = ({children}) => {

    const [searchDishes,setSearchDishes] = useState([]);

    return <SearchContext.Provider
    value={{searchDishes,setSearchDishes}}>
        {children}
    </SearchContext.Provider>
}

export const useSearchDishes = () => {
    const context = useContext(SearchContext)
    return context;
}