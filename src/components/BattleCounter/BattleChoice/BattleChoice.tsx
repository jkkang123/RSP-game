import * as Styled from "./BattleChoice.style";
import { Dispatch, SetStateAction } from "react";
import * as gameString from "../../../constants/string";

interface BattleChoiceProps {
  onChangeButton: Dispatch<SetStateAction<string>>;
  hand: string;
}

const BattleChoice = (props: BattleChoiceProps) => {
  return (
    <Styled.Container>
      <Styled.RadioWrapper>
        <input
          name="battle-choice"
          id="battle-choice-scissors"
          type="radio"
          checked={props.hand === gameString.handString.scissors}
          value={gameString.handString.scissors}
          onChange={(e) => {
            props.onChangeButton(e.target.value);
          }}
        />
        <label htmlFor="battle-choice-scissors">
          {gameString.handString.scissors}
        </label>
      </Styled.RadioWrapper>

      <Styled.RadioWrapper>
        <input
          name="battle-choice"
          id="battle-choice-rock"
          type="radio"
          checked={props.hand === gameString.handString.rock}
          value={gameString.handString.rock}
          onChange={(e) => {
            props.onChangeButton(e.target.value);
          }}
        />
        <label htmlFor="battle-choice-rock">{gameString.handString.rock}</label>
      </Styled.RadioWrapper>

      <Styled.RadioWrapper>
        <input
          name="battle-choice"
          id="battle-choice-paper"
          type="radio"
          checked={props.hand === gameString.handString.paper}
          value={gameString.handString.paper}
          onChange={(e) => {
            props.onChangeButton(e.target.value);
          }}
        />
        <label htmlFor="battle-choice-paper">
          {gameString.handString.paper}
        </label>
      </Styled.RadioWrapper>
    </Styled.Container>
  );
};

export default BattleChoice;
