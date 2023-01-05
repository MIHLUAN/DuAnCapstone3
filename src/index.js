import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

import { HomeTemplate } from "./Templates/HomeTemplate";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Profile from "./Pages/Profile/Profile"
import Search from "./Pages/Search/Search"
import Carts from "./Pages/Carts/Carts"
import Detail from "./Pages/Detail/Detail"

import "./assets/CSS/styles.css"
import "./assets/CSS/scss/styles.css"
import { createBrowserHistory } from 'history';
//Cấu hình redux
import { Provider } from 'react-redux'
import { store } from './redux/configStore';

export const history = createBrowserHistory();



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='carts' element={<Carts />}></Route>
          <Route path='detail' >
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          

          <Route path='*' element={<Navigate to="/" />}></Route>
    
        </Route>
      </Routes>

    </HistoryRouter>
  </Provider>
);
