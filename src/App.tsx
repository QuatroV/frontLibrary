import styled from "styled-components";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ShopPage from "./pages/shopPage";
import MyShelfPage from "./pages/myShelfPage";

import BooksIcon from "./pictures/books.png";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/shop">
              <ShopPage />
            </Route>
            <Route path="/shelf">
              <MyShelfPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
