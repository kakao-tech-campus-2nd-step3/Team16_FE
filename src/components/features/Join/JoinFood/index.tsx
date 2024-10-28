import styled from '@emotion/styled';

export const JoinFood = () => {
  return (
    <>
      <LikeFood>선호하는 음식</LikeFood>
      <DislikeFood>꺼려하는 음식</DislikeFood>
    </>
  );
};

const LikeFood = styled.div`
  display: flex;
  background-color: #b4c1b9;
  height: 200px;
  width: 100%;
`;

const DislikeFood = styled.div`
  display: flex;
  background-color: #b4c1b9;
  height: 200px;
  width: 100%;
`;
