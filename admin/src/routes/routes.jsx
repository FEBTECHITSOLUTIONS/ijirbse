import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signin from "../pages/Auth/Signin";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import Editors from "../pages/Admin/Editors.jsx";
import UploadedArticles from "../pages/Admin/UploadedArticles.jsx";
import PublisedArticle from "../components/admin/PublisedArticle.jsx";

// ✅ Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
    return null;
  }

  // You can still use cookies if token is not HttpOnly
  // const adminToken = getCookie("accessToken");
const user = JSON.parse(localStorage.getItem("user") || "{}");
useEffect(()=>{
    console.log('hi');
    
console.log(user);

  // if (!adminToken) {
  //   window.location.href = "/signin";
  //   return null;
  // }

  if (!user?.role) {
    console.log('not');
    
    window.location.href = "/";
    return null;
  }

},[])
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-red-600 font-semibold">
        Access Denied — You don’t have permission to view this page.
      </div>
    );
  }

  return children;
};

// ✅ Define all routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
       {
    path: "/",
    element: <Signin />,
  },
    ]
  },
 
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "editors", element: <Editors /> },
      { path: "articles", element: <UploadedArticles /> },
      { path: "publisedArticle", element: <PublisedArticle /> },
    ],
  },
  {
    path: "/editor",
    element: (
      <ProtectedRoute allowedRoles={["editor", "admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
       { path: "editors", element: <Editors /> },
       { path: "articles", element: <UploadedArticles /> },
      { path: "publisedArticle", element: <PublisedArticle /> },
    ],
  },
]);

export default routes;
