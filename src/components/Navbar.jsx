import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { isLoggedIn, authenticateUser, isAdmin } = useContext(AuthContext)

  const handleLogout = () => {

    // 1. borramos el token de localstorage
    localStorage.removeItem("authToken")

    // 2. forzamos los estados a cambiar a false y null
    authenticateUser()
    
    // 3. redireccionamos a cualquier pagina publica o login
    navigate("/login")

  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {!isLoggedIn && <Link to="/signup">Registro</Link>}
      {!isLoggedIn && <Link to="/login">Acceso</Link>}
      {isLoggedIn && <Link to="/private-page-example">Ejemplo Privado</Link>}
      {isLoggedIn && <button onClick={handleLogout}><span>Cerrar sesión</span></button> }
      {/* {isLoggedIn && <Link onClick={handleLogout} to="/login"><span>Cerrar sesión</span></Link> } */}
      {isAdmin && <Link to="/admin">Solo Admin</Link>}
    </nav>
  );
}

export default Navbar;
