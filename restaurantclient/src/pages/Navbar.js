import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSearchDishes } from "../searchContext";

function Navbar() {

    const {setSearchDishes} = useSearchDishes()
  function navToCategoryLink(category,categoryId) {
    return  <li className="nav-item">
      <Link className="nav-link active" to={`/category/${categoryId}`}>
            {category}
    </Link>
    </li>
  }

  const navbarStyle = {
    display:'flex',
    flexDirection:'row',
    width:'100%'
  }
  const cartStyle = {
    padding:'8px',
    maxHeight:'40px',
    marginRight:'30px',
    borderRadius:'4px'
  }



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Noyni
          </a>
      
          <div style = {navbarStyle}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {navToCategoryLink("All",'all')}
              
                {navToCategoryLink("Burgers",1)}

                {navToCategoryLink("Others",3)}

                {navToCategoryLink("Sides",4)}

                {navToCategoryLink("Drinks",5)}

                {navToCategoryLink("Milkshakes",6)}

            </ul>
          
            <Link to={"/cart"} className="btn btn-primary" style={cartStyle}>
              My cart
            </Link>
            <br/>
          </div>
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
              <form className="d-flex" onSubmit={(e) => {
                e.preventDefault();
                setSearchDishes(document.querySelector('#search_input').value.toLowerCase())
              }}>
                <input
                  className="form-control me-2"
                  type="search"
                  id="search_input"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
