import React,{useState,useContext,createContext, Children} from 'react'
import axios from 'axios'

export const authContext = createContext()
function AuthContextProvider({children}){
    const [user, setUser] = useState(null)
    const [owner, setOwner] = useState(null)
    

    const setRegister = async (e,email,password,type)=>{
        e.preventDefault()
        console.log("Register called")
        
        const newUser = {
            email:email.current.value,
            password:password.current.value
        }
        const userType = type.current.value
        console.log(userType)
        if(userType==="user"){
            const data = await axios.post('/user/register', newUser)
            console.log(data);
        }
        else if(userType==="owner"){
            const data = axios.post('/owner/register', newUser)
            console.log(data)
        }
    }

    const setLogin=async(e,email,password,type)=>{
        e.preventDefault()
        console.log("Login called")
        const newUser = {
            email:email.current.value,
            password:password.current.value
        }
        const userType = type.current.value
        if(userType==="user"){
            const result = await axios.post('/user/login', newUser)
            console.log(result.data);
            localStorage.setItem("user-token", JSON.stringify(result.data))
            setUser(result.data)

    
        }
        else if(userType==="owner"){
            const result = await axios.post('/owner/login', newUser)
            console.log(result.data)
            localStorage.setItem("owner-token",JSON.stringify(result.data))
            setOwner(result.data)
        }
    }

    return(
        <authContext.Provider value={{setRegister, setLogin, user,owner}}>
            {children}
        </authContext.Provider>
    )
}
export default AuthContextProvider