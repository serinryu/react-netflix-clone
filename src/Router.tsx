import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./Components/Header";
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from "./Routes/Search";

function Router() {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;