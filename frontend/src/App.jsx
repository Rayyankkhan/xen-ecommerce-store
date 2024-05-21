import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

//pages
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

// images & svg 
import bannermens from './assets/bannermens.png'
import bannerwomens from './assets/bannerwomens.png'
import bannerkids from './assets/bannerkids.png'
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <main className="text-tertiary">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/mens" element={<Category category={"men"} banner={bannermens}/>}/>
          <Route path="/womens" element={<Category category={"women"} banner={bannerwomens}/>}/>
          <Route path="/kids" element={<Category category={"kid"} banner={bannerkids}/>}/>
          <Route path="/product" element={<Product/>}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path="/cart-page" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>

          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </main>
  )
}