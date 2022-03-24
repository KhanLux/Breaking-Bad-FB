import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "wouter"
import React from "react";

export const LoginButton = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout, getTokenSilently } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return (
      <div style={{ color: "white" }}>
        <Link to="/favs" className="btn btn-success m-2">Mis favoritos</Link>
        <button
          className="btn btn-success"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Cerrar Sesión
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="btn btn-success float-right m-2"
        onClick={loginWithRedirect}
      >
        Iniciar Sesión
      </button>
    );
  }
};
