import styled from "styled-components";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ShopPage from "./pages/shopPage";
import MyShelfPage from "./pages/myShelfPage";
import ReadPage from "./pages/readPage";

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
            <Route path="/">
              <Redirect to="/shop" />
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
