import { createContext, useEffect, useState } from "react";
import service from "../service/service.config";

// componente de contexto
const AuthContext = createContext()

// componente envoltorio
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)

  // bonus, configuraciones de roles
  const [ isAdmin, setIsAdmin ] = useState(false)

  const authenticateUser = async () => {
    // esta funcion ya a llamar a la ruta /verify para validar el token y actualizar los estados
    console.log("intentando validar el token")

    const authToken = localStorage.getItem("authToken")

    // esto en caso que el token no exista
    if (!authToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)

      setIsAdmin(false)
      return;
    }

    try {
      
      // const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
      //   headers: {
      //     authorization: `Bearer ${authToken}`
      //   } 
      // })

      const response = await service.get("/auth/verify")

      console.log(response)
      // el token es valido, el usuario está autenticado
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsAuthenticating(false)

      if (response.data.role === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }

    } catch (error) {
      console.log(error)
      // el token no es valido (no hay token, fue manipulado o expiró) el usuario no está autenticado
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)

      setIsAdmin(false)

    }

  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    isAdmin
  }

  // esto va a forzar al sistema a que cuando el usuario vaya por primera vez a la pagina o refresque, se intente validar el token
  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    return <h3>... validando credenciales</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}