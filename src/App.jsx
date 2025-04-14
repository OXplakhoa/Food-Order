import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./route/Home";
import AuthForm from "./components/auth/AuthForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
