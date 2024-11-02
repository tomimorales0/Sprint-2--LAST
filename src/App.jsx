import Footer from "./componentes/Footer";
import Header from "./componentes/Header";
import Main from "./componentes/Main";
import Asside from "./componentes/Asside";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cuentas from "./componentes/Cuentas";
import Transferencias from "./componentes/Transferencias";
import Pagos from "./componentes/Pagos";
import PoliticaDePrivacidad from './componentes/PoliticaDePrivacidad';
import TerminosYCondiciones from './componentes/TerminosYCondiciones';
import Login from "./componentes/login"; 

function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 dark:bg-gray-800 w-full">
        <Header />
        <Asside />
        <div className="flex-1 flex flex-col mt-20 opacity-1">
          <Routes>
            <Route element={<Main />} path="/" />
            <Route element={<Cuentas />} path="/cuentas" />
            <Route element={<Transferencias />} path="/transferencias" />
            <Route element={<Pagos />} path="/pagos" />
            <Route element={<PoliticaDePrivacidad />} path="/politica-de-privacidad" />
            <Route element={<TerminosYCondiciones />} path="/terminos-y-condiciones" />
            <Route element={<Login />} path="/login" /> 
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
