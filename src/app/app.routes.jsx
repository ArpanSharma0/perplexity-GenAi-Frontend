import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

const Home = () => <div className="text-white bg-black min-h-screen flex items-center justify-center text-4xl font-bold">Home Page (Coming Soon)</div>;

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <Protected>
            <Dashboard />
        </Protected>,
    },
    {
        path: "/search",
        element: <Protected>
            <Dashboard />
        </Protected>,
    },
    {
        path: "/dashboard",
        element: <Protected>
            <Dashboard />
        </Protected>,
    },
]);
