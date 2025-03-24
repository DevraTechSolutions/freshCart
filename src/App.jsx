import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LauOut from "./component/Layout/LauOut"
import Home from "./component/Home/Home"
import About from "./component/About/About"
import Registe from "./component/Register/Registe"
import Login from "./component/Login/Login"
import NotFound from "./component/NotFound/NotFound"
import AuthContextProvider from "./context/authContext"
import SingleProduct from "./component/SingleProduct/SingleProduct"
import CartContextProvider from "./context/cartContext"
import Cart from "./component/cart/Cart"
import CheckOut from "./component/CheckOut/CheckOut"
import { useEffect, useState } from "react"
import Loader from "./component/Loader/Loader"

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "", element: <LauOut />, children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "register", element: <Registe /> },
        { path: "login", element: <Login /> },
        { path: "singleproduct/:id", element: <SingleProduct /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <CheckOut /> },

        { path: "*", element: <NotFound /> }




      ]
    },





  ])


  return (
    <>
      <AuthContextProvider>
      <CartContextProvider>
        {isLoading ? <Loader /> : <RouterProvider router={router} />}
      </CartContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
