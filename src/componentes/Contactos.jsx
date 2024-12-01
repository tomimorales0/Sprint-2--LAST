import { useEffect, useState, useRef } from "react";

const Contactos = () => {
  const [contactos, setContactos] = useState([]);
  const cbuInputRef = useRef(null);

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    const usuarios = localStorage.getItem("users");

    if (usuarioLogueado && usuarios) {
      const usuarioLogueadoObj = JSON.parse(usuarioLogueado);
      const usuariosArray = JSON.parse(usuarios);
      const contactosFiltrados = usuariosArray.filter(
        (usuario) => usuario.email !== usuarioLogueadoObj.email
      );
      setContactos(contactosFiltrados);
    }
  }, []);

  const cambiarCBU = (email) => {
    const usuarios = JSON.parse(localStorage.getItem("users"));
    const contactoSeleccionado = usuarios.find(
      (usuario) => usuario.email === email
    );
    const cuentaDelContacto = JSON.parse(localStorage.getItem("accounts")).find(
      (cuenta) =>
        cuenta.user.uuid === contactoSeleccionado.login.uuid &&
        cuenta.type === "Corriente"
    );

    if (cbuInputRef.current && cuentaDelContacto) {
      cbuInputRef.current.value = cuentaDelContacto.CBU;
    }
  };

  return (
    <>
      <input
        ref={cbuInputRef}
        id="receptor-tranferencia"
        type="text"
        className="hidden"
      />
      <ul>
        {contactos.map((contacto, index) => (
          <li
            key={index}
            className="flex justify-between gap-x-6 py-5 hover:bg-gray-700 rounded-sm cursor-pointer"
            onClick={() => cambiarCBU(contacto.email)}
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={contacto.picture.thumbnail}
                alt={`imagen-${contacto.name.first}`}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {contacto.name.first} {contacto.name.last}
                </p>
                <p className="mt-1 truncate text-xs leading-5 dark:text-gray-500">
                  {contacto.email}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contactos;

