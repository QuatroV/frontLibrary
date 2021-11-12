import { FC, useState } from "react";
import { Button, ButtonGroup, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setFilteredShopShowcase } from "../../../../store/bookSlice";
import { RootState } from "../../../../store/store";
// @ts-ignore
import AddBookModal from "./AddBookModal";

interface IButtonPanel {
  onUpdateBooks: () => void;
}

const ButtonPanel: FC<IButtonPanel> = ({ onUpdateBooks }) => {
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const shopShowcase = useSelector(
    (state: RootState) => state.book.shopShowcase
  );

  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchValue === "") onUpdateBooks();
    const filteredBooks = shopShowcase?.filter(({ title, author }) => {
      return (
        title.toLocaleUpperCase().indexOf(searchValue.toLocaleUpperCase()) >
          -1 ||
        author.toLocaleUpperCase().indexOf(searchValue.toLocaleUpperCase()) > -1
      );
    });
    if (filteredBooks) {
      dispatch(setFilteredShopShowcase({ bookDescriptions: filteredBooks }));
    }
    setSearchValue("");
  };

  return (
    <StyledButtonPanel>
      {showModal && (
        <AddBookModal
          isVisible={showModal}
          onHide={() => setShowModal(false)}
          onUpdateBooks={onUpdateBooks}
        />
      )}
      {user.role === "ADMIN" && (
        <StyledButtonGroup className="mb-2">
          <Button variant="secondary" onClick={() => setShowModal(true)}>
            Добавить книгу в библиотеку
          </Button>
        </StyledButtonGroup>
      )}
      <StyledForm className="d-flex" onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder="Поиск"
          className="me-2"
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="outline-success" onClick={handleSearch}>
          Найти
        </Button>
      </StyledForm>
    </StyledButtonPanel>
  );
};

const StyledButtonGroup = styled(ButtonGroup)`
  margin-right: 8px;
`;

const StyledForm = styled(Form)`
  height: 38px;
  margin-left: auto;
`;

const StyledButtonPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 0;
`;

export default ButtonPanel;
