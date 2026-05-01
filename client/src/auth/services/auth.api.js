import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
// learn later why do we pass username email and password as an object iside the function
export const register=async({username,email,password})=>{
    try{
    const response = await api.post('/api/auth/register',{
        username, email, password
    },)
    return response.data;
}catch(err){
    console.log(err)
}
}

export const login=async({email,password})=>{
    try{
    const response = await api.post('/api/auth/login',{
        email, password
    })
    return response.data
}catch(err){
    console.log("ERROR RESPONSE:", err.response?.data);
}
}

export const logout = async ()=>{
    try{
        const response = await api.get('/api/auth/logout',)
    return response.data
    }catch(err){
        console.log(err)
    }
}

export const getMe = async ()=>{
    try{
        const response = await api.get('/api/auth/my-get')
    return response.data
    }catch(err){
        console.log(err)
    }
}