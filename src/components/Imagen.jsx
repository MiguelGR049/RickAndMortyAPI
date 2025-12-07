import Swal from "sweetalert2";

const Imagen = ({ genero, tipo, especie, estado, nombre, img }) => {
  const mostrar = () => {
    Swal.fire({
      html: `
        <div class="card border-success">
          <div class="card-header text-center">
            <h3><b>${nombre}</b></h3>
          </div>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-5 align-self-center">
                <img src="${img}" alt="${nombre}" class="img-fluid mx-auto d-block rounded" />
              </div>
              <div class="col-7 align-self-center">
                <p class="lead text-light">Estado: <b>${estado}</b></p>
                <p class="lead"><small class="text-info">Especie: <b>${especie}</b></small></p>
                <p class="lead"><small class="text-warning">Genero: <b>${genero}</b></small></p>
                <p class="lead"><small class="text-dark">Tipo: <b>${tipo === "" ? "Desconocido" : tipo}</b></small></p>
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
        <img src={img} alt={nombre} className="img-fluid mx-auto d-block rounded-circle" />
        <h5>{nombre}</h5>
      </button>
    </div>
  )
}

export default Imagen;