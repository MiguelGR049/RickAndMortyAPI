import Swal from "sweetalert2";

const Locacion = ({ dimension, tipo, nombre}) => {
    const mostrar = () => {
        Swal.fire({
            html: `
                <div class="card border-success">
                <div class="card-header text-center">
                    <h3><b>${nombre}</b></h3>
                </div>
                <div class="card-body">
                    <div class="row justify-content-center">
                    <div class="col-7 align-self-center">
                        <p class="lead"><small class="text-warning">Tipo: <b>${tipo}</b></small></p>
                        <p class="lead"><small class="text-info">Dimension: <b>${dimension}</b></small></p>
                    </div>
                    </div>
                </div>
                </div>
            `,
            showConfirmButton: false,
            background: "#ffffff0d",
            width: "500px",
        });
    };


    return (
        <div className="col-2 mb-3">
            <button className="btn" id="person" onClick={() => mostrar()}>
                <h5>{nombre}</h5>
            </button>
        </div>
    )
}

export default Locacion;