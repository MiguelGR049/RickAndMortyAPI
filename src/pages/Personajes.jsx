import Swal from "sweetalert2";
import { useRef, useState, useEffect } from "react";

import Imagen from "../components/Imagen.jsx";
import "../style/main.css";
import { NavLink } from "react-router-dom";

const Personajes = () => {
    const refContenedor = useRef();

    const [datos, setDatos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("");
    const [especie, setEspecie] = useState("");
    const [genero, setGenero] = useState("");
    const [tipo, setTipo] = useState("");

    const personajes = () => {
        let url = `https://rickandmortyapi.com/api/character?page=${pagina}`;

        if (nombre.trim() !== "") url += `&name=${nombre}`;
        if (estado.trim() !== "" && estado !== "Estado") url += `&status=${estado}`;
        if (especie.trim() !== "" && especie !== "Especie") url += `&species=${especie}`;
        if (genero.trim() !== "" && genero !== "Genero") url += `&gender=${genero}`;

        if (tipo.trim() === "Desconocido") {
            url += `&type=`;
        } else if (tipo.trim() !== "" && tipo !== "Tipo") {
            url += `&type=${tipo}`;
        }

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
            .catch(err => {
                Swal.fire("Error", "No se pudieron cargar los personajes.", "error");
            });
    };

    useEffect(() => {
        personajes();
    }, [pagina, nombre, estado, especie, genero, tipo]);

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
                        <input id="buscar" type="text" className="form-control me-3" placeholder="Buscar..." onChange={(e) => {
                            setPagina(1);
                            setNombre(e.target.value);
                        }} />
                        <select id="estado" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setEstado(e.target.value);
                        }}>
                            <option>Estado</option>
                            <option value="Alive">Alive</option>
                            <option value="Dead">Dead</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                        <select id="especie" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setEspecie(e.target.value);
                        }}>
                            <option>Especie</option>
                            <option value="Human">Human</option>
                            <option value="Alien">Alien</option>
                            <option value="Humanoid">Humanoid</option>
                            <option value="Animal">Animal</option>
                            <option value="Robot">Robot</option>
                            <option value="Mythological Creature">Mythological Creature</option>
                            <option value="Cronenberg">Cronenberg</option>
                            <option value="Disease">Disease</option>
                            <option value="Poopybutthole">Poopybutthole</option>
                            <option value="Planet">Planet</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                        <select id="genero" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setGenero(e.target.value);
                        }}>
                            <option>Genero</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Genderless">Genderless</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                        <select id="tipo" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setTipo(e.target.value === "Desconocido" ? "" : e.target.value);
                        }}>
                            <option>Tipo</option>
                            <option value="Desconocido">Desconocido</option>

                            <option value="Genetic experiment">Genetic experiment</option>
                            <option value="Fish-Person Hybrid">Fish-Person Hybrid</option>
                            <option value="Clone">Clone</option>
                            <option value="Robot">Robot</option>
                            <option value="Parasite">Parasite</option>
                            <option value="Disease">Disease</option>
                            <option value="Superhuman">Superhuman</option>
                            <option value="Gromflomite">Gromflomite</option>
                            <option value="Human with antennae">Human with antennae</option>
                            <option value="Animal">Animal</option>
                            <option value="Humanoid">Humanoid</option>
                            <option value="Time Traveler">Time Traveler</option>
                            <option value="Microverse inhabitant">Microverse inhabitant</option>
                            <option value="Robot Dog">Robot Dog</option>
                            <option value="Soulless Puppet">Soulless Puppet</option>
                            <option value="Mythological Creature">Mythological Creature</option>
                            <option value="Cronenberg">Cronenberg</option>
                            <option value="Goddess">Goddess</option>
                            <option value="Plutonian">Plutonian</option>
                            <option value="Interdimensional Being">Interdimensional Being</option>
                            <option value="Giant">Giant</option>
                            <option value="Cyborg">Cyborg</option>
                            <option value="Host">Host</option>
                            <option value="Centaur">Centaur</option>
                            <option value="Vampire">Vampire</option>
                            <option value="Squid alien">Squid alien</option>
                            <option value="Planet">Planet</option>
                            <option value="Arcade character">Arcade character</option>
                            <option value="Snake">Snake</option>
                            <option value="Washed up monster">Washed up monster</option>
                            <option value="Unknown creature">Unknown creature</option>
                        </select>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Rick And Morty</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <NavLink to="/inicio" className="nav-link active mt-2"><b>Inicio</b></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Personajes" className="nav-link active mt-2"><b>Personajes</b></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Localizacion" className="nav-link active mt-2"><b>Localizacion</b></NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Episodios" className="nav-link active mt-2"><b>Episodios</b></NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center text-center">
                    <div className="col-12 justify-content-center text-center mt-4">
                        <div className="row justify-content-center mt-3">
                            {datos.length > 0 ? (
                                datos.map((info) => {
                                    let { gender, type, species, status, name, id, image } = info;

                                    return (
                                        <Imagen
                                            key={id}
                                            genero={gender}
                                            tipo={type}
                                            especie={species}
                                            estado={status}
                                            nombre={name}
                                            img={image}
                                        />
                                    );
                                })
                            ) : (
                                <p>No se encontraron resultados</p>
                            )}
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <nav>
                                    <ul className="pagination justify-content-center">

                                        <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => pagina > 1 && setPagina(pagina - 1)}
                                            >
                                                Anterior
                                            </button>
                                        </li>

                                        {paginasMostrar.map((num) => (
                                            <li
                                                key={num}
                                                className={`page-item ${pagina === num ? "active" : ""}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => setPagina(num)}
                                                >
                                                    {num}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${pagina === totalPaginas ? "disabled" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    pagina < totalPaginas && setPagina(pagina + 1)
                                                }
                                            >
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
        </div>
    );
};

export default Personajes;
