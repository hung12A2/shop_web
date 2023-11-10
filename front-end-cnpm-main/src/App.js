
import { Routes, Route } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react'
import './App.css';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import Login from './components/Pages/Login';
import Menu from './components/Pages/Menu';
import Cart from './components/Pages/Cart';
import Product from './components/Pages/Product/product';
import Signup from './components/Pages/Sign up/signUp';
import AdminPage from './components/Pages/Admin/admin';
import Home from './components/Pages/Home/home';
import Info from './components/Pages/Info/info';
import ProtectRoutes from './ProtectRoutes';
import ProtectRoutesUser from './ProtectRoutesUser';
import getCart from './api/cartApi';
import getDish, { getCate } from './api/dishApi';
import ErrorPage from './components/Pages/404 Page/errorPage';
import Forgetpass from './components/Pages/Forget Pass/forgetPass';
import Sendsuccess from './components/Pages/Forget Pass/sendSuccess';
import EnterNewPass from './components/Pages/EnterNewPass/enterNewPass';

export const AddContext = createContext();
function App() {

  const [foodList, setFoodList] = useState ([]);
  const [cateList, setCateList] = useState ([]);

  const [cartItems, setCartItems] = useState([]);

  // update cart by user
  useEffect(() => {

    // call api
    (async () => {

      const res = await getCart()
      const food = await getDish();
      const cate = await getCate();
      setCateList (cate);
      setFoodList (food);
      setCartItems (res)

    })()

  }, [])

  function onAdd(product) {
    const exist = cartItems.find(x => x.name === product.name);

    if (exist) {
      setCartItems(cartItems.map(x => x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x));
    }
    else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function onRemove(product) {
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === product.name) {
        setCartItems(cartItems.splice(i, 1));
        console.log(cartItems);
      }
    }
  }

  return (
    <>

      <AddContext.Provider value={cartItems}>
        <Routes>
          <Route path="/Menu" element={<Menu foodList={foodList} cateList={cateList} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPass" element={<Forgetpass />} />
          <Route path="/sendSuccess" element={<Sendsuccess />} />
          <Route path="/Product/:_id" element={<Product cartItems={cartItems} onAdd={onAdd} foodList={foodList} />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/EnterNewPassword" element={<EnterNewPass />} />


          <Route element={<ProtectRoutesUser />}>
            <Route path="/Cart" element={<Cart onRemove={onRemove} />} />
            <Route path="/info" element={<Info />} />
          </Route>

          <Route path="/" element={<Home foodList={foodList} />} />
          <Route path="*" element={<ErrorPage />} />

          {/*Admin route */}

          <Route element={<ProtectRoutes />}>
            <Route path="/admin/*" element={<AdminPage />} />
          </Route>

        </Routes>
      </AddContext.Provider>


    </>
  )
}

export default App;
