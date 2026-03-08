import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Protect from './componets/Protect';
import Home from '../Home/pages/Home';


import Landing from './pages/Landing';

const authRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/home',
        element: <Protect>
            <Home />
        </Protect>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])

export default authRoutes;