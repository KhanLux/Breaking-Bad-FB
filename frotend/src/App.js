import "./App.css";
import { LoginButton } from "./components/Login";
import { Route } from "wouter";
import Detail from "./pages/Detail/index";
import Favs from "./pages/Favs/index";
import Home from "./pages/Home/index";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <LoginButton />
      <Header />
      <Route component={Detail} path={"/detail/:author"} />
      <Route component={Favs} path={"/favs"} />
      <Route component={Home} path={"/"} />
    </div>
  );
}

export default App;
