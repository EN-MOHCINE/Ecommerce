import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Category from "./Components/Category";
import AddProduct from "./AdminComponents/AddProduct";
import Index from "./Components/Index";
import Layout from "./Components/Layout";
import ProductsLayout from "./Components/ProductsLayout";
import Contact from "./Components/Contact";
import ProductDetails from "./Components/ProductDetails";
import Collection from "./Components/Collection";
import Search from "./Components/Search";
import CheckOut from "./Components/CheckOut";
import AdminLayout from "./AdminComponents/adminLayout";
import UsersLayout from "./AdminComponents/UsersLayout";
import Products from "./AdminComponents/Products";
import ProductsAdminLayout from "./AdminComponents/ProductsAdminLayouts";
import Commands from "./AdminComponents/commands";
import CommandDetails from "./AdminComponents/CommandDetails";
import UpdateProduct from "./AdminComponents/UpdateProduct";
import CollectionList from "./AdminComponents/collectionList";
import CategoryList from "./AdminComponents/CategoryList";
import SizeList from "./AdminComponents/SizeList";
import PaymentChoice from './Components/PaymentChoice'
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/*",
        element: <Navigate to="/" />,
      },
      {
        path: "/products",
        element: <ProductsLayout />,
        children: [
          {
            path: "/products/search/:key?",
            element: <Search />,
          },
          {
            path: "/products/:type?/categories/:id?",
            element: <Category />,
          },
          {
            path: "/products/:type?/collections/:id?",
            element: <Collection />,
          },
        ],
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },{
        path: "/paymentMethod",
        element: <PaymentChoice />,
      },

      localStorage.getItem("user_role") === "2"
        ? {
            path: "/adminPannel",
            element: <AdminLayout />,
            children: [
                {
                    path:'/adminPannel/products',
                    element:<ProductsAdminLayout />,
                    children:[
                      {
                      index:true,
                      element:<Products/>
                      }
                  ]
                },
                {
                  path:'/adminPannel/addProduct',
                  element:<AddProduct/>
                },
                {
                  path:'/adminPannel/updateProduct/:id',
                  element:<UpdateProduct/>
                },
                {
                  path:'/adminPannel/category',
                  element:<CategoryList/>
                },{
                  path:'/adminPannel/collection',
                  element:<CollectionList/>
                },{
                  path:'/adminPannel/size',
                  element:<SizeList/>
                },{
                  path:'/adminPannel/commands',
                  element:<Commands/>
                },
                {
                  path:'/adminPannel/detailsCommand/:id',
                  element:<CommandDetails/>
                },
                {
                    path:'/adminPannel/users',
                    element:<UsersLayout/>
                }
            ],
          }
        : "",
    ],
  },
]);

export default Routes;
