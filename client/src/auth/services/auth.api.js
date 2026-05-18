import axios from 'axios'
import { useContext } from 'react'
import {toast} from 'react-toastify'



const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
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
    if (err.response?.data?.errors) {
    // show each Zod error as a separate toast
    err.response.data.errors.forEach(issue => {
      toast.error(issue.message)
    })
  } else {
    toast.error("Something went wrong")
  }
}
}

export const login = async ({ email, password }) => {
  try {
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
  } catch (err) {
    if (err.response?.data?.errors) {
      
      err.response.data.errors.forEach(issue => {
        toast.error(issue.message)
      })
    } else if (err.response?.data?.message) {
      
      toast.error(err.response.data.message)
    } else {
      toast.error("Something went wrong")
    }
  }
}

export const logout = async ()=>{
    try{
        const response = await api.get('/api/auth/logout',)
        
        return response.data

    }catch(err){
       if (err.response?.data?.errors) {
    // show each Zod error as a separate toast
    err.response.data.errors.forEach(issue => {
      toast.error(issue.message)
    })
  } else {
    toast.error("Something went wrong")
    console.log(err)
  }
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