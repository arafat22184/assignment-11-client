import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import AllBlogs from "../Pages/AllBlogs";
import LoadingSpinner from "../Components/LoadingSpinner";
import DetailsBlog from "../Pages/DetailsBlog";
import PrivateRoute from "../Provider/PrivateRoute";
import AddBlog from "../Pages/AddBlog";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import Wishlist from "../Pages/Wishlist";
import UpdateBlog from "../Pages/UpdateBlog";

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
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <DetailsBlog></DetailsBlog>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_LINK}/blogs/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "addBlog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateBlog/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_LINK}/blogs/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "featuredBlogs",
        Component: FeaturedBlogs,
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
