import ImgRegistro from "../img/RickAndMorty2.png"
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Registro = () => {
    const validacion = {
        nombre: {
            required: "El nombre es obligatorio",
            pattern: {
                value: /^[A-Za-z]+$/i,
                message: "El nombre solo debe contener letras"
            }
        },
        apellido_pa: {
            required: "El apellido paterno es obligatorio",
            pattern: {
                value: /^[A-Za-z]+$/i,
                message: "El apellido paterno solo debe contener letras"
            }
        },
        apellido_ma: {
            required: "El apellido materno es obligatorio",
            pattern: {
                value: /^[A-Za-z]+$/i,
                message: "El apellido materno solo debe contener letras"
            }
        },
        usuario: {
            required: "El usuario es obligatorio",
            pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: "El usuario solo debe contener letras y números"
            }
        },
        password: {
            required: "El password es obligatorio",
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                message: "El password debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
            }
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        Swal.fire({
            title: 'Registro Exitoso',
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
                            <img className="mx-auto d-block mt-2" src={ImgRegistro} alt="ImgRegistro" height="150" width="150px" />
                            <h2 className="text-center">Registrar</h2>
                            <div className="row text-center g-3 mb-3 p-3">
                                <div className="col-12">
                                    {errors.nombre && <b className="text-danger">{errors.nombre.message}</b>}
                                    <label htmlFor="nombre" className="form-label">Nombre(s) </label>
                                    <input {...register("nombre", validacion.nombre)} type="text" className="form-control" id="nombre" placeholder="Fulano" />
                                </div>
                                <div className="col-md-6">
                                    {errors.apellido_pa && <b className="text-danger mb-2">{errors.apellido_pa.message}</b>}
                                    <label htmlFor="apellido_pa" className="form-label">Apellido Paterno</label>
                                    <input {...register("apellido_pa", validacion.apellido_pa)} type="text" className="form-control" id="apellido_pa" placeholder="Flores" />
                                </div>
                                <div className="col-md-6">
                                    {errors.apellido_ma && <b className="text-danger mb-2">{errors.apellido_ma.message}</b>}
                                    <label htmlFor="apellido_ma" className="form-label">Apellido Materno</label>
                                    <input {...register("apellido_ma", validacion.apellido_ma)} type="text" className="form-control" id="apellido_ma" placeholder="Flores" />
                                </div>
                                <div className="col-md-6">
                                    {errors.usuario && <b className="text-danger mb-2">{errors.usuario.message}</b>}
                                    <label htmlFor="usuario" className="form-label">Usuario</label>
                                    <input {...register("usuario", validacion.usuario)} type="text" className="form-control" id="usuario" />
                                </div>
                                <div className="col-md-6">
                                    {errors.password && <b className="text-danger mb-2">{errors.password.message}</b>}
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input {...register("password", validacion.password)} type="password" className="form-control" id="password" />
                                </div>
                                <div className="d-flex justify-content-center text-center">
                                    <button type="submit" className="btn btn-success me-1"> Registrar</button>
                                    <NavLink to="/login" className="btn btn-warning me-1"> Iniciar</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registro;