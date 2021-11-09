import { FC, useState } from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { registration, login } from "../../../api/userAPI";
import { RootState } from "../../../store/store";
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
      await registration(email, password);
      dispatch(updateEmailAndRole({ email, role: "ADMIN" }));
      onHide();
    } catch (e: any) {
      setAlertText(e.response.data.message);
    }
  };
  const handleLoginBtnClick = async () => {
    try {
      await login(email, password);
      dispatch(updateEmailAndRole({ email, role: "ADMIN" }));
      onHide();
    } catch (e: any) {
      setAlertText(e.response.data.message);
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
              <FormControl
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e-mail"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="пароль"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="password"
              />
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
              <FormControl
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e-mail"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="пароль"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="password"
              />
            </InputGroup>
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

const StyledTabs = styled(Tabs)``;

export default LoginModal;
