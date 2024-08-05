import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../service/service.config";

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password
    }

    // ... contactar al backend para validar credenciales de usuario aqui
    try {
      
      // const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, userCredentials)
      const response = await service.post("/auth/login", userCredentials)
      console.log(response)

      localStorage.setItem("authToken", response.data.authToken)

      authenticateUser()

      navigate("/private-page-example")

    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // aqui deberiamos hacer un navigate a pagina de error si hay fallo del servidor
      }    
    }

  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Login;
