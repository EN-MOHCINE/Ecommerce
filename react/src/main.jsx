import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={Routes} />
);
