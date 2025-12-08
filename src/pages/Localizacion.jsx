import Swal from "sweetalert2";
import { useRef, useState, useEffect } from "react";

import Locacion from "../components/Locacion.jsx";
import "../style/main.css";
import { NavLink } from "react-router-dom";

const Localizacion = () => {
    const refContenedor = useRef();

    const [datos, setDatos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [dimension, setDimension] = useState("");

    const cargarLocalizaciones = () => {
        let url = `https://rickandmortyapi.com/api/location?page=${pagina}`;

        if (nombre.trim() !== "") url += `&name=${nombre}`;
        if (tipo.trim() !== "" && tipo !== "Tipo") url += `&type=${tipo}`;
        if (dimension.trim() !== "" && dimension !== "Dimension") url += `&dimension=${dimension}`;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setDatos([]);
                    setTotalPaginas(1);
                    return;
                }
                setDatos(res.results);
                setTotalPaginas(res.info.pages);
            })
            .catch(() => {
                Swal.fire("Error", "No se pudieron cargar las localizaciones.", "error");
            });
    };

    useEffect(() => {
        cargarLocalizaciones();
    }, [pagina, nombre, tipo, dimension]);

    const getPagesToShow = () => {
        const maxVisible = 5;

        let start = Math.max(1, pagina - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPaginas) {
            end = totalPaginas;
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const paginasMostrar = getPagesToShow();

    return (
        <div ref={refContenedor}>
            <nav className="navbar fixed-top" id="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand me-3" href="#" id="titulo">Rick And Morty</a>
                    <div className="d-flex justify-content-center text-center mt-1">

                        {/* BUSCAR POR NOMBRE */}
                        <input id="buscar" type="text" className="form-control me-3"
                            placeholder="Buscar..."
                            onChange={(e) => {
                                setPagina(1);
                                setNombre(e.target.value);
                            }} />

                        {/* SELECT: TIPO */}
                        <select id="tipo" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setTipo(e.target.value === "Todos" ? "" : e.target.value);
                        }}>
                            <option value="Todos">Tipo</option>
                            <option value="Planet">Planet</option>
                            <option value="Cluster">Cluster</option>
                            <option value="Space station">Space station</option>
                            <option value="Microverse">Microverse</option>
                            <option value="TV">TV</option>
                            <option value="Resort">Resort</option>
                            <option value="Fantasy town">Fantasy town</option>
                            <option value="Dream">Dream</option>
                            <option value="Menagerie">Menagerie</option>
                            <option value="Game">Game</option>
                            <option value="Customs">Customs</option>
                            <option value="Dwarf planet">Dwarf planet</option>
                            <option value="Miniverse">Miniverse</option>
                            <option value="Teenyverse">Teenyverse</option>
                            <option value="Machine">Machine</option>
                            <option value="Arcade">Arcade</option>
                            <option value="Dimension">Dimension</option>
                            <option value="Unknown">Unknown</option>
                        </select>

                        {/* SELECT: DIMENSION */}
                        <select id="dimension" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setDimension(e.target.value === "Todas" ? "" : e.target.value);
                        }}>
                            <option value="Todas">Dimension</option>
                            <option value="Dimension C-137">Dimension C-137</option>
                            <option value="Post-Apocalyptic Dimension">Post-Apocalyptic Dimension</option>
                            <option value="Replacement Dimension">Replacement Dimension</option>
                            <option value="Cronenberg Dimension">Cronenberg Dimension</option>
                            <option value="Fantasy Dimension">Fantasy Dimension</option>
                            <option value="Evil Rick's Dimension">Evil Rick's Dimension</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Rick And Morty</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item"><NavLink to="/inicio" className="nav-link active mt-2"><b>Inicio</b></NavLink></li>
                                <li className="nav-item"><NavLink to="/Personajes" className="nav-link active mt-2"><b>Personajes</b></NavLink></li>
                                <li className="nav-item"><NavLink to="/Localizacion" className="nav-link active mt-2"><b>Localizacion</b></NavLink></li>
                                <li className="nav-item"><NavLink to="/Episodios" className="nav-link active mt-2"><b>Episodios</b></NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center text-center mt-5">

                    <div className="row justify-content-center mt-5">
                        {datos.length > 0 ? (
                            datos.map((info) => {
                                let { id, name, type, dimension } = info;

                                return (
                                        <Locacion
                                        key={id}
                                        nombre={name}
                                        tipo={type}
                                        dimension={dimension}
                                        />
                                );
                            })
                        ) : (
                            <p>No se encontraron resultados</p>
                        )}
                    </div>

                    {/* PAGINACIÓN */}
                    <div className="row mt-4">
                        <div className="col">
                            <nav>
                                <ul className="pagination justify-content-center">

                                    <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
                                        <button className="page-link"
                                            onClick={() => pagina > 1 && setPagina(pagina - 1)}>
                                            Anterior
                                        </button>
                                    </li>

                                    {paginasMostrar.map((num) => (
                                        <li key={num}
                                            className={`page-item ${pagina === num ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setPagina(num)}>
                                                {num}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${pagina === totalPaginas ? "disabled" : ""}`}>
                                        <button className="page-link"
                                            onClick={() => pagina < totalPaginas && setPagina(pagina + 1)}>
                                            Siguiente
                                        </button>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Localizacion;
