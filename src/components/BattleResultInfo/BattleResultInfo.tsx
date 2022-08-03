import * as Styled from "./BattleResultInfo.style";
import { ResultObjType } from "../../App";

type BattleResultInfoProps = {
  data: ResultObjType;
};

const BattleResultInfo = (props: BattleResultInfoProps) => {
  return (
    <Styled.Container
      status={props.data.result}
    >{`YOU: ${props.data.you} COMPUTER: ${props.data.computer}`}</Styled.Container>
  );
};

export default BattleResultInfo;
