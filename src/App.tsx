import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";
import RootLayout from "./layouts/RootLayout";
import { SuspenseWithProgress } from "./components/SuspenseWithProgress";

const Home = lazy(() => import("./pages/Home/index"));

const router = createBrowserRouter([
  {
    id: "Home",
    path: "/",
    element: <RootLayout />,
    children: [
      {
        id: "home",
        path: "/",
        element: (
          <SuspenseWithProgress>
            <Home />
          </SuspenseWithProgress>
        ),
      },
      { id: "any", path: "*", element: <Navigate to={"/"} /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
