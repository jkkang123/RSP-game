import styled from "styled-components";
import Colors from "~/constants/Colors";

export const Container = styled.p<{ status: string | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 50px;

  border-radius: 6px;

  background-color: ${(props) =>
    props.status === "win"
      ? Colors.green96
      : props.status === "lose"
      ? Colors.redff
      : Colors.greyf7};

  & + & {
    margin-top: 20px;
  }
`;
