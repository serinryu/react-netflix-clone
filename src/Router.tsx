import {BrowserRouter, Routes, Route, useRoutes} from "react-router-dom"
import Header from "./Components/Header";
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from "./Routes/Search";

function Router() {
  const Element = () => useRoutes([
    {path: "/", element: <Home />},
    {path: "/movies/:movieId", element: <Home />}
  ]);
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Element/>
    </BrowserRouter>
  )
}

export default Router;