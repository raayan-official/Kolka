import React from "react";
//import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import CategoriesPage from "../pages/category/CategoriesPage";
import Search from "../pages/search/Search";
import Shop from "../pages/shop/Shop";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../../src/pages/dashboard/admin/AdminDashboard";
import UserDashboard from "../pages/dashboard/user/UserDashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoriesPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "admin",
        children: [
          {
            path: "Dashboard",
            element: <Dashboard />, // Admin Dashboard
          },
        ]

      },
      {
        path: "user",
        children: [
          {
            path: "UserDashboard",
            element: <UserDashboard/>
          }
        ]
      }


    ]}
   
]);
export default router;
