import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom";

export const Perfilcliente = () =>{
  let navigate = useNavigate();
  const { store, actions } = useContext(Context);
  
  const llamada = async () => {
    if (sessionStorage.getItem("token")?? localStorage.getItem("token")) {
      const ruta = await actions.tokenValidation("/perfilcliente");
      console.log("ruta", ruta);
      if (ruta !== "/perfilcliente") {
        navigate(ruta);
      }      
    }
    else 
    navigate("/login")
  };
  

  useEffect(() => {
    llamada();
  }, []);

    return(
        <div className="container">
    <blockquote className="quote-box">
      <p className="quotation-mark">
        “
      </p>
      <p className="quote-text">
        este es el perfil cliente
      </p>
      <hr/>
      <div className="blog-post-actions">
        <p className="blog-post-bottom pull-left">
        {store.userInfo?.email}
        </p>
        <p className="blog-post-bottom pull-right">
          <span className="badge quote-badge">click</span>  ❤
        </p>
      </div>
    </blockquote>
</div>
    )
}