import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root/Root";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Home from "./Components/Home/Home";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import AddTask from "./Components/Dashboard/Pages/AddTask";
import Collaborators from "./Components/Dashboard/Pages/Collaborators";
import Completed from "./Components/Dashboard/Pages/Categorize Task/Completed";
import Todo from "./Components/Dashboard/Pages/Categorize Task/Todo/Todo";
import Ongoing from "./Components/Dashboard/Pages/Categorize Task/OnGoing/Ongoing";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import AllTasks from "./Components/Dashboard/Pages/AllTask/AllTasks";
import AllUser from "./Components/Dashboard/AdminDashboard/Pages/AllUsers/AllUsers";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
  // Dashboard Layout
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "addTask",
        element: <AddTask></AddTask>,
      },
      {
        path: "allTasks",
        element: <AllTasks></AllTasks>,
      },
      {
        path: "todo",
        element: <Todo></Todo>,
      },
      {
        path: "ongoing",
        element: <Ongoing></Ongoing>,
      },
      {
        path: "completed",
        element: <Completed></Completed>,
      },
      {
        path: "collaborators",
        element: <Collaborators></Collaborators>,
      },
      {
        path: "allUser",
        element: <AllUser></AllUser>,
      },
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
