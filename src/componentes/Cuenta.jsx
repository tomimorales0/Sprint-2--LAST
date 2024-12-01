import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cuenta() {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const accounts = localStorage.getItem("accounts");

    if (usuarioLogueado && accounts) {
      const user = JSON.parse(usuarioLogueado);
      const cuentasFiltradas = JSON.parse(accounts).filter(
        (cuenta) => cuenta.user.uuid === user.login.uuid
      );
      setCuentas(cuentasFiltradas);
    }
  }, []);

  return (
    <div
      className="flex flex-wrap 2xl:justify-around gap-2 w-full"
      id="cuentas-container"
    >
      {cuentas.length > 0 ? (
        cuentas.map((cuenta, i) => (
          <Link
            key={i}
            to={`/accounts${i + 1}`}
            className="m-4 border rounded-lg border-stone-400 p-8 flex flex-col gap-2 shadow-md shadow-stone-800/50 border-l-8 border-l-green-600 w-full max-w-[550px] dark:bg-gray-800 hover:bg-gray-600"
          >
            <h2 className="font-bold text-xl uppercase">Cuenta</h2>
            <p className="font-bold text-xl uppercase">${cuenta.code}</p>
            <div className="flex justify-between flex-col md:flex-row">
              <p className="font-medium">Saldo disponible (ARS):</p>
              <p className="font-bold">$ {cuenta.ARS.toLocaleString()}</p>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <p className="font-medium">Saldo disponible (USD):</p>
              <p className="font-bold">u$s {cuenta.USD.toLocaleString()}</p>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <p className="font-bold">Tipo de Cuenta:</p>
              <p className="font-bold uppercase">{cuenta.type}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No se encontraron cuentas disponibles.</p>
      )}
    </div>
  );
}
