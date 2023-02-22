import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Signup = () => {
	let navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const token = sessionStorage.getItem("token");

	const register = async (evento) => {

		evento.preventDefault();
		let name = evento.target[0].value;
		let subname = evento.target[1].value;
		let email = evento.target[2].value;
		let pass = evento.target[3].value;
		let rpass = evento.target[4].value;

		if (pass != rpass) {
			alert("Contraseñas deben ser iguales");
		}
		if (name == "" || subname == "" || email == "" || pass == "" || rpass == "") {
			alert("Debes completar los datos");
		} else {
			await actions.infoRegister(
				JSON.stringify({
					email: email,
					password: email,

				})
			);
			alert("Registrado");
			navigate("/login")
		}
	};
	return (

		<div className="container">
			{token && token != "" && token != undefined ? (
        "you are registed in with this token " + token
      ) : (
			<div className="row centered-form">
				<div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">Registrate</h3>
						</div>
						<div className="panel-body">
							<form role="form" onSubmit={register}>
								<div className="row">

									<input type="text" name="name" id="name" className="form-control input-sm" placeholder="First Name" />
									<input type="text" name="subname" id="subname" className="form-control input-sm" placeholder="Last Name" />
									<input type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address" />
									<input type="password" placeholder="Contraseña" />
									<input type="password" placeholder="Repetir Contraseña" />
									<input type="submit" value="Register" className="btn btn-info btn-block" />
								</div>

							</form>
						</div>
					</div>
				</div>
			</div>
			)}
		</div>
	)
}