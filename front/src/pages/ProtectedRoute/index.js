import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';

export default function ProtectedRoute({ errorPage, targetPage }){
    var [page, setPage] = useState(<></>);

    function renderPage(){
        const token = sessionStorage.getItem('token');
        console.log(token)
        if(!token) {
            setPage(errorPage)
            return
        }

        const decodeToken = jwt_decode(token)
        const { exp } = decodeToken;

        if(exp+'000' - Date.now()){
            setPage(errorPage)
            return
        }
        setPage(targetPage)
    }

    useEffect(() => {
        renderPage()
    }, [])
    
    return page;
}