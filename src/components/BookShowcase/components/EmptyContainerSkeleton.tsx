import { FC } from "react";
import styled from "styled-components";

const EmptyContainerSkeleton: FC = () => {
  return (
    <StyledSkeleton>
      <StyledTitle>Похоже что здесь совсем пусто</StyledTitle>
    </StyledSkeleton>
  );
};

const StyledSkeleton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const StyledTitle = styled.div`
  color: gray;
  font-size: 24px;
`;

export default EmptyContainerSkeleton;
