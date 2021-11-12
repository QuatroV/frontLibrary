import { FC, useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  Tabs,
  Tab,
  Alert,
  DropdownButton,
  Dropdown,
  FloatingLabel,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { registration, login } from "../../../api/userAPI";
import { UserRole } from "../../../globalTypes";
import { updateEmailAndRole } from "../../../store/userSlice";

interface ILoginModal {
  isVisible: boolean;
  onHide: () => void;
}

const LoginModal: FC<ILoginModal> = ({ isVisible, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertText, setAlertText] = useState("");

  const dispatch = useDispatch();

  const handleRegistrationBtnClick = async () => {
    try {
      await registration(email, password, role[1]);
      dispatch(updateEmailAndRole({ email, role: role[1] }));
      onHide();
    } catch (e: any) {
      setAlertText(e.response.data.message);
    }
  };

  const handleLoginBtnClick = async () => {
    try {
      await login(email, password);
      dispatch(updateEmailAndRole({ email, role: role[1] }));
      onHide();
    } catch (e: any) {
      setAlertText(e.response.data.message);
    }
  };

  const [role, setRole] = useState<[string, UserRole]>([
    "Пользователь",
    "USER",
  ]);

  const handleSelect = (e: any) => {
    switch (e) {
      case "USER":
        setRole(["Пользователь", e]);
        break;
      case "ADMIN":
        setRole(["Администратор", e]);
        break;
    }
  };

  return (
    <Modal show={isVisible} onHide={onHide}>
      <StyledTabs defaultActiveKey="login" className="mb-3">
        <Tab eventKey="login" title="Вход">
          <Modal.Header>
            <Modal.Title>Вход</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertText && (
              <Alert
                variant="danger"
                onClose={() => setAlertText("")}
                dismissible
              >
                <Alert.Heading>Ошибка!</Alert.Heading>
                {alertText}
              </Alert>
            )}
            <InputGroup className="mb-3">
              <StyledFloatingLabel controlId="floatingEmail" label="E-mail">
                <FormControl
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e-mail"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </StyledFloatingLabel>
            </InputGroup>
            <InputGroup className="mb-3">
              <StyledFloatingLabel controlId="floatingEmail" label="Пароль">
                <FormControl
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="пароль"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="password"
                />
              </StyledFloatingLabel>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleLoginBtnClick}>
              Войти
            </Button>
          </Modal.Footer>
        </Tab>
        <Tab eventKey="registration" title="Регистрация">
          <Modal.Header>
            <Modal.Title>Регистрация</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertText && (
              <Alert
                variant="danger"
                onClose={() => setAlertText("")}
                dismissible
              >
                <Alert.Heading>Ошибка!</Alert.Heading>
                {alertText}
              </Alert>
            )}
            <InputGroup className="mb-3">
              <StyledFloatingLabel controlId="floatingEmail" label="E-mail">
                <FormControl
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e-mail"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </StyledFloatingLabel>
            </InputGroup>
            <InputGroup className="mb-3">
              <StyledFloatingLabel controlId="floatingEmail" label="Пароль">
                <FormControl
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="пароль"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  type="password"
                />
              </StyledFloatingLabel>
            </InputGroup>
            <Form.Label>Роль:</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={role[0]}
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="USER">Пользователь</Dropdown.Item>
              <Dropdown.Item eventKey="ADMIN">Администратор</Dropdown.Item>
            </DropdownButton>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleRegistrationBtnClick}>
              Зарегистрироваться
            </Button>
          </Modal.Footer>
        </Tab>
      </StyledTabs>
    </Modal>
  );
};

const StyledFloatingLabel = styled(FloatingLabel)`
  width: 100%;
`;

const StyledTabs = styled(Tabs)``;

export default LoginModal;
