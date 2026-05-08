import { createBrowserRouter } from "react-router";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import Home from "./interview/pages/Home";
import Interview from "./interview/pages/Interview";
import ProtectedRoute from "./auth/components/ProtectedRoute";
import Layout from "./Layout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: '/',
                element: <ProtectedRoute><Home /></ProtectedRoute>
            },
            {
                path: 'interview/:interviewId',
                element: <ProtectedRoute><Interview /></ProtectedRoute>
            }
        ]
    }
])

