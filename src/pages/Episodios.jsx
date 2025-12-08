import Swal from "sweetalert2";
import { useRef, useState, useEffect } from "react";

import Episodes from "../components/Episodes.jsx";
import "../style/main.css";
import { NavLink } from "react-router-dom";

const Episodios = () => {
    const refContenedor = useRef();
    const [datos, setDatos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [nombre, setNombre] = useState("");
    const [episodio, setEpisodio] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");

    const cargarEpisodios = () => {
        let url = `https://rickandmortyapi.com/api/episode?page=${pagina}`;

        // FILTROS VALIDOS PARA LA API
        if (nombre.trim() !== "") url += `&name=${nombre}`;
        if (episodio.trim() !== "" && episodio !== "Todas") {
            url += `&episode=${episodio}`; // S01, S02, ...
        }

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setDatos([]);
                    setTotalPaginas(1);
                    return;
                }

                let resultados = res.results;

                // FILTRAR POR FECHA (NO LO SOPORTA LA API)
                if (lanzamiento.trim() !== "" && lanzamiento !== "Lanzamiento") {
                    resultados = resultados.filter(ep => ep.air_date === lanzamiento);
                }

                setDatos(resultados);
                setTotalPaginas(res.info.pages);
            })
            .catch(() => {
                Swal.fire("Error", "No se pudieron cargar los episodios.", "error");
            });
    };

    useEffect(() => {
        cargarEpisodios();
    }, [pagina, nombre, episodio, lanzamiento]);

    const getPagesToShow = () => {
        const maxVisible = 5;

        let start = Math.max(1, pagina - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPaginas) {
            end = totalPaginas;
            start = Math.max(1, end - maxVisible + 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    const paginasMostrar = getPagesToShow();

    return (
        <div ref={refContenedor}>
            <nav className="navbar fixed-top" id="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand me-3" href="#" id="titulo">Rick And Morty</a>

                    {/* SELECTS Y BUSCADOR */}
                    <div className="d-flex justify-content-center text-center mt-1">

                        {/* BUSCAR POR NOMBRE */}
                        <input id="buscar" type="text"
                            className="form-control me-3"
                            placeholder="Buscar..."
                            onChange={(e) => {
                                setPagina(1);
                                setNombre(e.target.value);
                            }} />

                        {/* FILTRAR POR TEMPORADA */}
                        <select id="episodio" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setEpisodio(e.target.value === "Todos" ? "" : e.target.value);
                        }}>
                            <option value="Todos">Episodio</option>

                            {/* Temporada 1 */}
                            <optgroup label="Temporada 1">
                                <option value="S01E01">S01E01</option>
                                <option value="S01E02">S01E02</option>
                                <option value="S01E03">S01E03</option>
                                <option value="S01E04">S01E04</option>
                                <option value="S01E05">S01E05</option>
                                <option value="S01E06">S01E06</option>
                                <option value="S01E07">S01E07</option>
                                <option value="S01E08">S01E08</option>
                                <option value="S01E09">S01E09</option>
                                <option value="S01E10">S01E10</option>
                                <option value="S01E11">S01E11</option>
                            </optgroup>

                            {/* Temporada 2 */}
                            <optgroup label="Temporada 2">
                                <option value="S02E01">S02E01</option>
                                <option value="S02E02">S02E02</option>
                                <option value="S02E03">S02E03</option>
                                <option value="S02E04">S02E04</option>
                                <option value="S02E05">S02E05</option>
                                <option value="S02E06">S02E06</option>
                                <option value="S02E07">S02E07</option>
                                <option value="S02E08">S02E08</option>
                                <option value="S02E09">S02E09</option>
                                <option value="S02E10">S02E10</option>
                            </optgroup>

                            {/* Temporada 3 */}
                            <optgroup label="Temporada 3">
                                <option value="S03E01">S03E01</option>
                                <option value="S03E02">S03E02</option>
                                <option value="S03E03">S03E03</option>
                                <option value="S03E04">S03E04</option>
                                <option value="S03E05">S03E05</option>
                                <option value="S03E06">S03E06</option>
                                <option value="S03E07">S03E07</option>
                                <option value="S03E08">S03E08</option>
                                <option value="S03E09">S03E09</option>
                                <option value="S03E10">S03E10</option>
                            </optgroup>

                            {/* Temporada 4 */}
                            <optgroup label="Temporada 4">
                                <option value="S04E01">S04E01</option>
                                <option value="S04E02">S04E02</option>
                                <option value="S04E03">S04E03</option>
                                <option value="S04E04">S04E04</option>
                                <option value="S04E05">S04E05</option>
                                <option value="S04E06">S04E06</option>
                                <option value="S04E07">S04E07</option>
                                <option value="S04E08">S04E08</option>
                                <option value="S04E09">S04E09</option>
                                <option value="S04E10">S04E10</option>
                            </optgroup>
                        </select>

                        {/* FILTRAR POR FECHA */}
                        <select id="lanzamiento" className="form-select me-1" onChange={(e) => {
                            setPagina(1);
                            setLanzamiento(e.target.value === "Todos" ? "" : e.target.value);
                        }}>
                            <option value="Todos">Lanzamiento</option>

                            <option value="December 2, 2013">December 2, 2013</option>
                            <option value="December 9, 2013">December 9, 2013</option>
                            <option value="December 16, 2013">December 16, 2013</option>
                            <option value="January 13, 2014">January 13, 2014</option>
                            <option value="January 20, 2014">January 20, 2014</option>
                            <option value="January 27, 2014">January 27, 2014</option>
                            <option value="March 10, 2014">March 10, 2014</option>
                            <option value="March 17, 2014">March 17, 2014</option>
                            <option value="April 7, 2014">April 7, 2014</option>
                            <option value="April 14, 2014">April 14, 2014</option>
                            <option value="July 26, 2015">July 26, 2015</option>
                            <option value="August 2, 2015">August 2, 2015</option>
                            <option value="August 9, 2015">August 9, 2015</option>
                            <option value="August 16, 2015">August 16, 2015</option>
                            <option value="August 23, 2015">August 23, 2015</option>
                            <option value="August 30, 2015">August 30, 2015</option>
                            <option value="September 20, 2015">September 20, 2015</option>
                            <option value="September 27, 2015">September 27, 2015</option>
                            <option value="October 4, 2015">October 4, 2015</option>
                            <option value="October 11, 2015">October 11, 2015</option>
                            <option value="April 1, 2017">April 1, 2017</option>
                            <option value="July 30, 2017">July 30, 2017</option>
                            <option value="August 6, 2017">August 6, 2017</option>
                            <option value="August 13, 2017">August 13, 2017</option>
                            <option value="August 20, 2017">August 20, 2017</option>
                            <option value="August 27, 2017">August 27, 2017</option>
                            <option value="September 10, 2017">September 10, 2017</option>
                            <option value="September 17, 2017">September 17, 2017</option>
                            <option value="September 24, 2017">September 24, 2017</option>
                            <option value="October 1, 2017">October 1, 2017</option>
                            <option value="May 3, 2020">May 3, 2020</option>
                            <option value="May 10, 2020">May 10, 2020</option>
                            <option value="May 17, 2020">May 17, 2020</option>
                            <option value="May 24, 2020">May 24, 2020</option>
                            <option value="May 31, 2020">May 31, 2020</option>
                            <option value="June 7, 2020">June 7, 2020</option>
                            <option value="June 14, 2020">June 14, 2020</option>
                            <option value="June 21, 2020">June 21, 2020</option>
                            <option value="June 28, 2020">June 28, 2020</option>
                            <option value="July 5, 2020">July 5, 2020</option>
                        </select>

                    </div>

                    {/* MENÚ LATERAL */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Rick And Morty</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>

                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item"><NavLink to="/inicio" className="nav-link mt-2"><b>Inicio</b></NavLink></li>
                                <li className="nav-item"><NavLink to="/Personajes" className="nav-link mt-2"><b>Personajes</b></NavLink></li>
                                <li className="nav-item"><NavLink to="/Localizacion" className="nav-link mt-2"><b>Localización</b></NavLink></li>
                                <li className="nav-item"><NavLink to="/Episodios" className="nav-link mt-2"><b>Episodios</b></NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center text-center mt-5">

                    {/* LISTA DE EPISODIOS */}
                    <div className="row justify-content-center mt-5">
                        {datos.length > 0 ? (
                            datos.map((info) => {
                                let { id, name, air_date, episode } = info;

                                return (
                                    <Episodes
                                        key={id}
                                        nombre={name}
                                        lanzamiento={air_date}
                                        episodio={episode}
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
                                        <button className="page-link" onClick={() => pagina > 1 && setPagina(pagina - 1)}>Anterior</button>
                                    </li>

                                    {paginasMostrar.map((num) => (
                                        <li key={num} className={`page-item ${pagina === num ? "active" : ""}`}>
                                            <button className="page-link" onClick={() => setPagina(num)}>{num}</button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${pagina === totalPaginas ? "disabled" : ""}`}>
                                        <button className="page-link" onClick={() => pagina < totalPaginas && setPagina(pagina + 1)}>Siguiente</button>
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

export default Episodios;
