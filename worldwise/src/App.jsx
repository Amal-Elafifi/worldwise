import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {lazy, Suspense} from "react";



// import HomePage from "./pages/HomePage";
// import Product from "./pages/product";
// import Pricing from "./pages/pricing";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const HomePage = lazy(()=> import("./pages/HomePage"));
const Product = lazy(()=> import("./pages/product"));
const Pricing = lazy(()=> import("./pages/pricing"));
const PageNotFound = lazy(()=> import("./pages/PageNotFound"));
const Login = lazy(()=> import("./pages/Login"));

import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import ProtectAuthentication from "./components/ProtectAuthentication";
import SpinnerFullPage from "./components/SpinnerFullPage";



const App = () => {


  return (
    <CitiesProvider>
          <AuthProvider> 
              <BrowserRouter>
                <Suspense fallback={<SpinnerFullPage/>}>
                <Routes>
                  <Route index element={<HomePage/>}/>
                  <Route path="Product" element={<Product/>}/>
                  <Route path="Pricing" element={<Pricing/>}/>
                  <Route path="Login" element={<Login/>}/>
                  <Route path="*" element={<PageNotFound/>}/>

                  <Route path="App" element={
                    <ProtectAuthentication>
                      <AppLayout/>
                    </ProtectAuthentication>
                  }>
                        <Route index element={<Navigate replace to="cities"/>}/>
                        <Route path="cities" element={<CityList />}/>
                        <Route path="/App/cities/:id" element={<City/>} />
                    <Route path="countries" element={<CountryList />}/>
                    <Route path="form" element={<Form/>}/>
                  </Route>

                </Routes>
                </Suspense>
              </BrowserRouter>
      </AuthProvider>
          </CitiesProvider>
  )
}



export default App ;
