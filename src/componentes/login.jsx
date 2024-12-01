import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function LoginForm() {

  useEffect(()=>{
    const localStorageUsers = () => {
      const storedJsonString = localStorage.getItem('users');
      if(!storedJsonString){
      fetch("/json/usuarios-contraseñas.json")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const usuarios = data.users;
    
          localStorage.setItem('users', JSON.stringify(usuarios));
        })
        .catch((error) => console.error(error));
      }
    };
    
    const localStorageAccounts = () => {
      const storedJsonString = localStorage.getItem("accounts");
      if (!storedJsonString) {
        fetch("/json/accounts.json")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const cuentas = data.accounts;
    
            localStorage.setItem("accounts", JSON.stringify(cuentas));
          })
          .catch((error) => console.error(error));
      }
    };

    localStorageUsers();
    localStorageAccounts();
  },[])

  const users = JSON.parse(localStorage.getItem('users'));


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioLogueado = users.find(
      (user) => user.email === email && user.login.password === password
    );

    if (usuarioLogueado) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
      localStorage.setItem('isAuthenticated', true); 
      navigate('/cuentas'); 
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default LoginForm;
