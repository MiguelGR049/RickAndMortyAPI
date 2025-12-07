import ImgLogin from "../img/RickAndMorty1.png"
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import Contexto from '../context/Contexto.jsx';

const Login = () => {

    const { login } = useContext(Contexto);
    const navegacion = useNavigate();

    const validacion = {
        usuario: {
            required: "El usuario es obligatorio"
        },
        password: {
            required: "El password es obligatorio"
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        login(data.usuario)
        navegacion("/", {replace:true})
        Swal.fire({
            title: 'Inicio de Sesión Exitoso',
            text: `¡Bienvenido, ${data.usuario}!`,
            icon: 'success',
            color: '#000000ff',
            background: '#9e3fb6b6',
            confirmButtonText: 'Aceptar'
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-auto">
                    <div className="card justify-content-center" id="card">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <img className="mx-auto d-block mt-2" src={ImgLogin} alt="ImgRegistro" height="150" width="150px" />
                            <h2 className="text-center">Inici de Sesión</h2>
                            <div className="text-center mb-3 p-3">
                                <div className="col-12 mb-3">
                                    {errors.usuario && <b className="text-danger mb-2">{errors.usuario.message}</b>}
                                    <label htmlFor="usuario" className="form-label">Usuario</label>
                                    <input {...register("usuario", validacion.usuario)} type="text" className="form-control" id="usuario" />
                                </div>
                                <div className="col-12 mb-3">
                                    {errors.password && <b className="text-danger mb-2">{errors.password.message}</b>}
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input {...register("password", validacion.password)} type="password" className="form-control" id="password" />
                                </div>
                                <div className="d-flex justify-content-center text-center">
                                    <button type="submit" className="btn btn-success me-1"> Iniciar</button>
                                    <NavLink to="/registro" className="btn btn-warning me-1"> Registrar</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;