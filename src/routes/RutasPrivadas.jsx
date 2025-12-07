import { useContext } from "react";
import Contexto from '../context/Contexto.jsx';
import { Navigate } from "react-router-dom";

const RutasPrivadas = ({ children }) => {
    const {usuario} = useContext(Contexto);
    return usuario ? children : <Navigate to="/Login" />;
}

export default RutasPrivadas;