import { FC } from "react";
import styled from "styled-components";

import { Carousel } from "react-bootstrap";

import libraryPicture from "../../../../pictures/libraryPicture1.jpg";

const LibraryCarousel: FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <StyledImgWrapper>
          <img className="d-block" src={libraryPicture} alt="First slide" />
        </StyledImgWrapper>
        <Carousel.Caption>
          <StyledLabelBackground>
            <h3>Откройте мир русской классической литературы</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </StyledLabelBackground>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImgWrapper>
          <img className="d-block" src={libraryPicture} alt="Second slide" />
        </StyledImgWrapper>

        <Carousel.Caption>
          <StyledLabelBackground>
            <h3>Откройте мир русской классической литературы</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </StyledLabelBackground>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <StyledImgWrapper>
          <img className="d-block" src={libraryPicture} alt="Third slide" />
        </StyledImgWrapper>

        <Carousel.Caption>
          <StyledLabelBackground>
            <h3>Откройте мир русской классической литературы</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
