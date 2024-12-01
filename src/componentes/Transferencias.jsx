import Swal from 'sweetalert2';
import axios from 'axios';
import Contactos from './Contactos';

const cuentas = [
  { id: 1, nombre: 'Cuenta A', cbu: '0170099220000067797370' },
  { id: 2, nombre: 'Cuenta B', cbu: '0170099220000061234567' },
  { id: 3, nombre: 'Cuenta C', cbu: '0170099220000067654321' },
];

export default function Transferencias() {

  const handleTransfer = (event) => {
    event.preventDefault(); 

    // Mostrar alerta de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Transferencia realizada con éxito!',
      showConfirmButton: true,
      timer: 2000 
    });
  };

  const handleConversion = async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario
    const formData = new FormData(event.target);
    const amount = parseFloat(formData.get('amount-convertir'));
    const fromCurrency = formData.get('moneda-base');
    const toCurrency = formData.get('moneda-receptor');

    // Validar que se seleccionó una moneda válida
    if (fromCurrency === 'nada' || toCurrency === 'nada' || fromCurrency === toCurrency) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, selecciona diferentes monedas para la conversión.',
      });
      return;
    }

    // Obtener la tasa de cambio
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      const convertedAmount = amount * rate;

      // Mostrar alerta con el resultado de la conversión
      Swal.fire({
        icon: 'success',
        title: '¡Conversión realizada con éxito!',
        text: `${amount} ${fromCurrency} es equivalente a ${convertedAmount.toFixed(2)} ${toCurrency}.`,
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'No se pudo realizar la conversión. Por favor, intenta de nuevo.',
      });
    }
  };

  return (
    <main className="flex ml-24 text-wrap text-black text-gray-300 min-h-screen" id="main">
      <div className="flex flex-col items-center w-full gap-5 bg-gray-800">
        <h2 className="font-bold text-2xl uppercase mt-12">Transferencias</h2>
        <ul role="list" className="divide-y divide-gray-100 w-full max-w-[800px] border-solid border-2 border-sky-500 border-gray-700 rounded-sm p-4" id="lista-contactos">
          <h2 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl text-white text-center">
            Tus contactos
          </h2>
          <Contactos/>
        </ul>
        <div className="w-full flex justify-around my-12 flex-wrap gap-5">
          {/* Sección de Transferir */}
          <section className="bg-gray-900 w-full sm:min-w-[300px] max-w-[700px]">
            <div className="flex flex-col bg-gray-800">
              <div className="w-full rounded-sm shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700 max-w-[800px] sm:min-w-[300px]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 justify-center">
                  <h2 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl text-white text-center">
                    Transferir
                  </h2>
                  <form className="space-y-4 md:space-y-6" id="hi-transferir-plata" onSubmit={handleTransfer}>
                    <div>
                      <label htmlFor="receptor" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                        CBU / Alias
                      </label>
                      <input
                        type="text"
                        name="receptor"
                        required={true}
                        id="receptor-tranferencia"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0170099220000067797370"
                        autoComplete="off"
                        maxLength="22"
                        minLength="6"
                      />
                    </div>
                    <div>
                      <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                        Monto
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="amount"
                          id="amount-transfer"
                          required
                          autoComplete="off"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 text-white bg-gray-700 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">Currency</label>
                          <select
                            id="currency"
                            name="currency"
                            className="h-full rounded-md border-0 bg-transparent py-0 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm text-white bg-gray-700"
                          >
                            <option defaultValue value="ARS">ARS</option>
                            <option value="USD">USD</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="emisor-transferencia" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                        Cuenta
                      </label>
                      <div className="mt-2">
                        <select
                          id="emisor-transferencia"
                          name="emisor-transferencia"
                          autoComplete="emisor-cuenta"
                          required
                          className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700 text-white"
                        >
                          <option defaultValue value="nada">Selecciona una cuenta</option>
                          {cuentas.map((cuenta) => (
                            <option key={cuenta.id} value={cuenta.cbu}>
                              {cuenta.nombre} - {cuenta.cbu}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:ring-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
                      Realizar Transferencia
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Convertir */}
          <section className="bg-gray-900 w-full sm:min-w-[300px] max-w-[700px]">
            <div className="flex flex-col bg-gray-800 h-full">
              <div className="w-full rounded-sm shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700 max-w-[800px] sm:min-w-[300px]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 justify-center">
                  <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl text-white text-center">
                    Convertir
                  </h1>
                  <form className="space-y-4 md:space-y-6" id="hi-convertir-plata" onSubmit={handleConversion}>
                    <div>
                      <label htmlFor="amount-convertir" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                        Monto a convertir
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="amount-convertir"
                          id="amount-convertir"
                          required
                          autoComplete="off"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 text-white bg-gray-700 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="moneda-base" className="sr-only">moneda-base</label>
                          <select
                            id="moneda-base"
                            name="moneda-base"
                            className="h-full rounded-md border-0 bg-transparent py-0 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm text-white bg-gray-700"
                          >
                            <option defaultValue value="nada">Selecciona moneda</option>
                            <option value="ARS">ARS - Pesos Argentinos</option>
                            <option value="USD">USD - Dolares Americanos</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="moneda-receptor" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                        Convertir a
                      </label>
                      <div className="mt-2">
                        <select
                          id="moneda-receptor"
                          name="moneda-receptor"
                          autoComplete="moneda-receptor"
                          required
                          className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700 text-white"
                        >
                          <option defaultValue value="nada">Selecciona moneda</option>
                          <option value="ARS">ARS - Pesos Argentinos</option>
                          <option value="USD">USD - Dolares Americanos</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cuenta-conversion" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                        Cuenta
                      </label>
                      <div className="mt-2">
                        <select
                          id="cuenta-conversion"
                          name="cuenta-conversion"
                          autoComplete="emisor-cuenta"
                          required
                          className="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-700 text-white"
                        >
                          <option defaultValue value="nada">Selecciona una cuenta</option>
                          {cuentas.map((cuenta) => (
                            <option key={cuenta.id} value={cuenta.cbu}>
                              {cuenta.nombre} - {cuenta.cbu}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button className="w-full text-white bg-primary-600 hover:bg-primary-700 hover:ring-4 hover:ring-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center">
                      Realizar conversión
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
