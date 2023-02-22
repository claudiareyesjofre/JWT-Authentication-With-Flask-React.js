import React,{useContext} from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { Context } from "../store/appContext";


export const Login = () => {
	const { store, actions } = useContext(Context);
	let navigate = useNavigate();

	
	const login = async (evento) => {
		evento.preventDefault();
		let email = evento.target[0].value;
		let pass= evento.target[1].value;
	  
		if (email == "" || pass == "") {
		  alert("Debes completar los datos");
		} else {     
			const success = await actions.login(email, password);
		  if (!success) {
			setErrorMessage(true);
		  }
		  alert("iniciado");
			navigate("/")
		}
	  };

    return(
        <div className="container">
	<div className="d-flex justify-content-center h-100">
		<div className="card">
			<div className="card-header">
				<h3>Sign In</h3>
				<div className="d-flex justify-content-end social_icon">
					<span><i className="fab fa-facebook-square"></i></span>
					<span><i className="fab fa-google-plus-square"></i></span>
					<span><i className="fab fa-twitter-square"></i></span>
				</div>
			</div>
			<div className="card-body">
				<form>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div>
						<input type="text" className="form-control" placeholder="username"/>
						
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input type="password" className="form-control" placeholder="password"/>
					</div>
					<div className="row align-items-center remember">
						<input type="checkbox"/>Remember Me
					</div>
					<div className="form-group-login">
						<input type="submit" value="Login" className="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div className="card-footer">
				<div className="d-flex justify-content-center links">
					Don't have an account?<a href="#">Sign Up</a>
				</div>
				<div className="d-flex justify-content-center">
					<a href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
    )
}