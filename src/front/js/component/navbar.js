import React,{ useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png"
import { Link } from "react-router-dom";


export const Navbar = () => {

  const { store, actions } = useContext(Context);

	return (
  <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
   <Link to="/"><a className="navbar-brand"><img src={Logo}/></a></Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"><img src={Logo}/></h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
          {!store.token?
            <Link to="/login"> <a className="nav-link active" aria-current="page" >Login</a> </Link>
            :
            <button  onClick={()=> actions.Logout()} className="nav-link active" aria-current="page" >Logout</button> 
          }
          }
          </li>
          <li className="nav-item">
           <Link to="/signup"><a className="nav-link">Register</a></Link> 
          </li>

        </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>
	);
};

