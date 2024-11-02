import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { users } from './users'; // Importa el archivo de usuarios

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate para la redirección

  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica si los datos coinciden con algún usuario en la lista
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('isAuthenticated', true); // Autenticación en localStorage
      navigate('/cuentas'); // Redirige a la ruta protegida
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
