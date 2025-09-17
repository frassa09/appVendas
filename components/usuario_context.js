import React, { createContext, useState } from "react";

const USUARIO_CONTEXTO = createContext()

export default USUARIO_CONTEXTO

export const USUARIO_PROVIDER = ({children}) => {
    const [usuario, setUsuario] = useState('')


    return(
        <USUARIO_CONTEXTO.Provider value={{usuario, setUsuario}}>
            {children}    
        </USUARIO_CONTEXTO.Provider>
    )
}