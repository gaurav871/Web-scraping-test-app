import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Page/Home";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="main-container-body">
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
