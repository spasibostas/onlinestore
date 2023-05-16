import {createBrowserRouter, RouterProvider, Outlet, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home/Home';
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import { getToken } from "./helpers";
import Basket from "./pages/Basket/Basket";
import './app.scss'



const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      path: "/",
      element: <Home />
    },
    {
      path: "/products/:id",
      element: <Products />
    },
    {
      path: "/product/:id",
      element: <Product />
    },
    {
      path: "/basket",
      element: <Basket />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/userprofile",
      element: getToken() ?  <UserProfile /> : <Navigate to='/login'/>
    },
  ]
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
