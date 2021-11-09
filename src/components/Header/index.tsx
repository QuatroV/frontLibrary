import styled from "styled-components";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import BooksIcon from "../../pictures/books.png";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getIsUserAuth } from "../../api/userAPI";
import { updateEmailAndRole } from "../../store/userSlice";
import { UserRole } from "../../globalTypes";

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const isUserAuth = Boolean(user?.email);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    getIsUserAuth()
      .then((data: any) =>
        dispatch(updateEmailAndRole({ email: data.email, role: data.role }))
      )
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(updateEmailAndRole({ email: "", role: null }));
  };
  return (
    <>
      <LoginModal onHide={() => setShowModal(false)} isVisible={showModal} />
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/shop">
            <StyledBookIcon src={BooksIcon} />
            dotLibrary
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/shop">Магазин</Nav.Link>
              {isUserAuth && <Nav.Link href="/shelf">Моя полка</Nav.Link>}
            </Nav>
            {!isUserAuth ? (
              <Nav className="justify-content-end">
                <Nav.Link onClick={() => setShowModal(true)}>
                  Вход/Регистрация
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="justify-content-end">
                <StyledNavLink onClick={handleLogout} disabled>
                  {user.email}
                </StyledNavLink>
                <Nav.Link onClick={handleLogout}>Выход</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const StyledNavLink = styled(Nav.Link)`
  color: red;
`;

const StyledBookIcon = styled.img`
  width: 40px;
  margin-right: 12px;
`;

export default Header;
