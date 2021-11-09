import styled from "styled-components";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ShopPage from "./pages/shopPage";
import MyShelfPage from "./pages/myShelfPage";
import ReadPage from "./pages/readPage";

import BooksIcon from "./pictures/books.png";
import Header from "./components/Header";

function App() {
  return (
    <StyledAppWrapper>
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
            <Route path="/read">
              <ReadPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </StyledAppWrapper>
  );
}

const StyledAppWrapper = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default App;
