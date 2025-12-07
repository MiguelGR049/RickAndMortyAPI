import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Inicio from './pages/Inicio.jsx';
import Personajes from './pages/Personajes.jsx';
import Error from './pages/Error.jsx';
import RutasPrivadas from './routes/RutasPrivadas.jsx';
import RutasPublicas from './routes/RutasPublicas.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<RutasPrivadas><Inicio /></RutasPrivadas>} />
                <Route path='/Inicio' element={<RutasPrivadas><Inicio /></RutasPrivadas>} />
                <Route path='/Login' element={<RutasPublicas><Login /></RutasPublicas>} />
                <Route path='/Registro' element={<RutasPublicas><Registro /></RutasPublicas>} />
                <Route path='/Personajes' element={<Personajes />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;