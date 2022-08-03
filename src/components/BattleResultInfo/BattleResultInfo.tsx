import * as Styled from "./BattleResultInfo.style";
import { ResultObjType } from "../../App";
import * as gameString from "../../constants/string";

type BattleResultInfoProps = {
  data: ResultObjType;
};

const BattleResultInfo = (props: BattleResultInfoProps) => {
  const parsingStr = (str: string) => {
    return str === gameString.handString.rock
      ? "rock"
      : str === gameString.handString.scissors
      ? "scissors"
      : "paper";
  };
  return (
    <Styled.Container status={props.data.result}>{`YOU: ${parsingStr(
      props.data.you
    )}, COMPUTER: ${parsingStr(props.data.computer)}`}</Styled.Container>
  );
};

export default BattleResultInfo;
