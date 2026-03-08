import {createBrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Protect from './componets/Protect';
import Home from '../Home/pages/Home';


const authRoutes = createBrowserRouter([
    {
        path:'/',
        element:<Protect>
             <Home/>
        </Protect>
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    }
])

export default authRoutes;