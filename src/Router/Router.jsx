import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import AllBlogs from "../Pages/AllBlogs";
import LoadingSpinner from "../Components/LoadingSpinner";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          const res = await fetch(
            `${import.meta.env.VITE_API_LINK}/recentBlogs`
          );
          return res.json();
        },
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "/allBlogs",
        Component: AllBlogs,
        loader: async () => {
          const res = await fetch(`${import.meta.env.VITE_API_LINK}/blogs`);
          return res.json();
        },
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
