import React from 'react';
import ImgLogin from "../img/RickAndMorty1.png"
import { NavLink, useNavigate } from "react-router-dom";
import Contexto from '../context/Contexto';
import { useContext } from 'react';

const Inicio = () => {
    const { usuario, cerrar_sesion } = useContext(Contexto);
    const user = typeof usuario === "object" ? JSON.parse(usuario) : usuario;
    const navegacion = useNavigate();

    const logout = () => {
        cerrar_sesion()
        navegacion("/Login", { replace: true })
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-auto">
                    <div className="card justify-content-center" id="card">
                        <img className="mx-auto d-block mt-2" src={ImgLogin} alt="ImgLogin" height="150" width="150px" />
                        <h2 className="text-center p-3">Hola ¡Bienvenido!</h2>
                        <h3 className="text-center p-3">usuario: {user}</h3>
                        <div className="text-center mb-3 p-3">
                            <div className="d-flex justify-content-center text-center mt-1">
                                <button onClick={() => logout()} className='btn btn-danger me-1'>Cerrar sesion</button>
                                <NavLink to="/registro" className="btn btn-warning me-1"> Registrar</NavLink>
                            </div>
                            <div className="d-flex justify-content-center text-center mt-1">
                                <NavLink to="/personajes" className="btn btn-success me-1"> Personajes</NavLink>
                                <NavLink to="/localizacion" className="btn btn-info me-1"> Localizacion</NavLink>
                                <NavLink to="/episodios" className="btn btn-secondary me-1"> Episodios</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Inicio;
