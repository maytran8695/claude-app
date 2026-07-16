import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Finance from "./pages/Finance";
import Health from "./pages/Health";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/finance"
            element={<Finance />}
          />

          <Route
            path="/health"
            element={<Health />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}