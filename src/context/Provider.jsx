import { useReducer } from 'react'
import Contexto from './Contexto.jsx';
import MiReducer from './MiReducer.jsx';
import types from './types.js';

const inicio = () => {
    const user = localStorage.getItem("usuario");
    return {
        logged: !!user,
        usuario: user
    }
}
const Provider = ({ children }) => {
    const [logeado, dispatch] = useReducer(MiReducer, {}, inicio);

    const login = (sesion) => {
        const action = {
            type: types.login,
            payload: sesion
        }
        localStorage.setItem("usuario", JSON.stringify(sesion));
        dispatch(action);
    }

    const cerrar_sesion = () => {
        const action = {
            type: types.logout,
            payload: null
        }
        localStorage.removeItem("usuario")
        dispatch(action)
    }
    return (
        <Contexto.Provider value={{ ...logeado, login, cerrar_sesion }}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider;