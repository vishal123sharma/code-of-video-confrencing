import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    const navigate = useNavigate();


    const login = async (inputs) =>{

        try{
            const res = await axios.post('http://localhost:6001/auth/login', inputs)
            
                 localStorage.setItem('userToken', res.data.token);
                 localStorage.setItem('userId', res.data.user._id);
                 localStorage.setItem('userName', res.data.user.username);
                 localStorage.setItem('userEmail', res.data.user.email);
                navigate('/');
            

        }catch(err){
            console.log(err);
        }
    }



    const register = async (inputs) =>{

         console.log("Register payload:", inputs); 
        try{
            const res = await axios.post('http://localhost:6001/auth/register', inputs)
            
                 localStorage.setItem('userToken', res.data.token);
                 localStorage.setItem('userId', res.data.user._id);
                 localStorage.setItem('userName', res.data.user.username);
                 localStorage.setItem('userEmail', res.data.user.email);
                navigate('/');
            

        }catch(err){
            console.log(err);
        }
    }




    const logout =  () =>{
         localStorage.setItem('userToken', '');
         localStorage.setItem('userId', '');
         localStorage.setItem('userName', '');
         localStorage.setItem('userEmail', '');
        navigate('/');
    }


    

    return(
        <AuthContext.Provider value={{login, register, logout}}>{children}</AuthContext.Provider>
    )


}