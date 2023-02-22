import React,{ useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png"
import { Link } from "react-router-dom";
import { ImUser, ImProfile, ImHome, ImUserMinus } from "react-icons/im";


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
        {!store.token ? (
						<li className="nav-item d-none d-sm-block">
							<Link to="/login">
								<ImUser/>
							</Link>
						</li>)

						:
						(<li className="nav-item d-none d-sm-block">
							<button onClick={() => actions.logout()} className="botonlogout"> <ImUserMinus/> </button>
						</li>
						)}
         
         {!store.token ? (
						<li className="nav-item d-none d-sm-block">
							<Link to="/signup">
							 <ImProfile/>
							</Link>
						</li>
							) : (null)}
						
		
        </ul>
        
      </div>
    </div>
  </div>
</nav>
	);
};

