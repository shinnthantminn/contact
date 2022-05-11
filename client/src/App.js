import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Tool from "./components/Tool";
import Contact from "./components/Contact";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import DetailContact from "./components/DetailContact";
import Search from "./components/Search";
import Trash from "./components/Trash";
import User from "./components/User";
import Register from "./components/Register";
import UserShare from "./components/UserShare";
import { useSelector } from "react-redux";
import Copy from "./components/Copy";

function App() {
  const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

  return (
    <div className="w-[100%] mx-auto font-['Montserrat']">
      <Router>
        <Nav />
        <Routes>
          <Route path={"/"} element={<User />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/"} element={<Tool />}>
            <Route path={"contact/"} element={<Contact />} />
            <Route path={"add/category"} element={<AddContact />} />
            <Route path={"edit/contact"} element={<EditContact />} />
            <Route path={"detail/contact"} element={<DetailContact />} />
            <Route path={"search"} element={<Search />} />
            <Route path={"trash/"} element={<Trash />} />
            <Route path={"share"} element={<UserShare />} />
            <Route path={"copy"} element={<Copy />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
