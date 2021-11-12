import { FC } from "react";
import styled from "styled-components";

import { Carousel } from "react-bootstrap";

import libraryPicture1 from "../../../../pictures/libraryPicture1.jpg";
import libraryPicture2 from "../../../../pictures/libraryPicture2.jpg";
import libraryPicture3 from "../../../../pictures/libraryPicture3.jpg";

const LibraryCarousel: FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <StyledImgWrapper>
          <img className="d-block" src={libraryPicture1} alt="First slide" />
        </StyledImgWrapper>
        <Carousel.Caption>
          <StyledLabelBackground>
            <h3>Откройте мир русской классической литературы</h3>
            <p>Откройте для себя чудесный мир чтения</p>
          </StyledLabelBackground>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImgWrapper>
          <img className="d-block" src={libraryPicture2} alt="Second slide" />
        </StyledImgWrapper>

        <Carousel.Caption>
          <StyledLabelBackground>
            <h3>Познакомьтесь с иностранной классикой</h3>
            <p>Откройте для себя чудесный мир чтения</p>
          </StyledLabelBackground>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImgWrapper>
          <img className="d-block" src={libraryPicture3} alt="Third slide" />
        </StyledImgWrapper>

        <Carousel.Caption>
          <StyledLabelBackground>
            <h3>Познакомьтесь с произведениями представителей бит-поколения</h3>
            <p>Откройте для себя чудесный мир чтения</p>
          </StyledLabelBackground>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

const StyledImgWrapper = styled.div`
  max-height: 40vh;
`;

const StyledLabelBackground = styled.div`
  background-color: #1717176e;
  border-radius: 10px;
`;

export default LibraryCarousel;
