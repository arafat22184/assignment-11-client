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
import ErrorPage from "../Pages/ErrorPage";
import Contact from "../Pages/Contact";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyBlogs from "../Pages/MyBlogs";
import DashboardHome from "../Pages/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () =>
          fetch(`${import.meta.env.VITE_API_LINK}/recentBlogs`).then((res) =>
            res.json()
          ),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "/allBlogs",
        Component: AllBlogs,
        loader: () =>
          fetch(`${import.meta.env.VITE_API_LINK}/blogs`).then((res) =>
            res.json()
          ),
        hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <DetailsBlog></DetailsBlog>
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
      },
      {
        path: "/contact",
        Component: Contact,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/addBlog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myBlogs",
        element: (
          <PrivateRoute>
            <MyBlogs></MyBlogs>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage publicComponent={true} />,
  },
]);

export default router;
