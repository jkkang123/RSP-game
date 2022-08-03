import * as Styled from "./App.style";
import { useState, useEffect, useCallback, useMemo } from "react";
import { BattleCounter, BattleResultInfo } from "./components";
import * as gameString from "./constants/string";

export interface ResultObjType {
  you: string;
  computer: string;
  result: string | undefined;
  life: {
    my: number;
    computer: number;
  };
}

function App() {
  const defaultResult: ResultObjType = useMemo(() => {
    return {
      you: "",
      computer: "",
      result: "",
      life: {
        my: 3,
        computer: 3,
      },
    };
  }, []);
  const [hand, setHand] = useState<string>("");
  const [computerHand, setComputerHand] = useState<string>("");
  const [roundState, setRoundState] = useState<string | undefined>(
    gameString.roundString.ready
  );
  const [isClickedBtn, setIsClickedBtn] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [battleResults, setBattleResults] = useState<ResultObjType[]>([]);
  const [ctrlButtonStr, setCtrlButtonStr] = useState<string>(
    gameString.ctrlButtonString.match
  );

  const compareHand = useCallback((myHand: string, comHand: string) => {
    if (myHand === gameString.handString.scissors) {
      if (comHand === gameString.handString.scissors) {
        return gameString.roundString.draw;
      } else if (comHand === gameString.handString.rock) {
        return gameString.roundString.lose;
      } else {
        return gameString.roundString.win;
      }
    } else if (myHand === gameString.handString.rock) {
      if (comHand === gameString.handString.scissors) {
        return gameString.roundString.win;
      } else if (comHand === gameString.handString.rock) {
        return gameString.roundString.draw;
      } else {
        return gameString.roundString.lose;
      }
    } else if (myHand === gameString.handString.paper) {
      if (comHand === gameString.handString.scissors) {
        return gameString.roundString.lose;
      } else if (comHand === gameString.handString.rock) {
        return gameString.roundString.win;
      } else {
        return gameString.roundString.draw;
      }
    }
  }, []);

  const alertGameResult = (my: number, computer: number) => {
    if (my && !computer) {
      window.alert(gameString.resultString.my);
    } else if (!my && computer) {
      window.alert(gameString.resultString.computer);
    }
  };

  const changeCtrlButton = useCallback((obj: ResultObjType) => {
    if (!obj.life.my || !obj.life.computer) {
      return gameString.ctrlButtonString.reset;
    } else if (obj.life.my && obj.life.computer) {
      return gameString.ctrlButtonString.rematch;
    } else {
      return gameString.ctrlButtonString.match;
    }
  }, []);

  const onClickCtrlBtn = () => {
    if (ctrlButtonStr !== gameString.ctrlButtonString.reset) {
      if (hand) {
        setRoundState("3");
      } else {
        window.alert(gameString.isSelectedCtrlBtnString);
      }
    } else {
      setHand("");
      setRoundState(gameString.roundString.ready);
      setComputerHand("");
      setCtrlButtonStr(gameString.ctrlButtonString.match);
      setBattleResults([]);
      setRound(0);
      localStorage.removeItem("gameResult");
    }
  };

  useEffect(() => {
    const tempResult = localStorage.getItem("gameResult");
    if (tempResult) {
      const storageResult: ResultObjType[] = JSON.parse(tempResult);
      setBattleResults(storageResult);
      setRound(storageResult.length);
      setCtrlButtonStr(
        changeCtrlButton(storageResult[storageResult.length - 1])
      );
    }
  }, [changeCtrlButton]);

  useEffect(() => {
    const countDown = setInterval(() => {
      if (Number(roundState) > 0) {
        setRoundState((count) => String(Number(count) - 1));
      }
      if (Number(roundState) <= 0) {
        const randomHand = [
          gameString.handString.scissors,
          gameString.handString.rock,
          gameString.handString.paper,
        ][
          Math.floor(
            Math.random() *
              [
                gameString.handString.scissors,
                gameString.handString.rock,
                gameString.handString.paper,
              ].length
          )
        ];
        clearInterval(countDown);
        setComputerHand(randomHand);
        setIsClickedBtn(true);
      }
    }, 1000);
    return () => {
      clearInterval(countDown);
    };
  }, [roundState]);

  useEffect(() => {
    if (computerHand && hand && isClickedBtn) {
      const storageResult = localStorage.getItem("gameResult");
      const lastResult: ResultObjType =
        battleResults[battleResults.length - 1] ?? defaultResult;
      const resultString: string | undefined = compareHand(hand, computerHand);
      const resultObj: ResultObjType = {
        ...lastResult,
        you: hand,
        computer: computerHand,
        result: resultString,
        life: {
          my:
            resultString === gameString.roundString.lose
              ? lastResult.life.my - 1
              : lastResult.life.my,
          computer:
            resultString === gameString.roundString.win
              ? lastResult.life.computer - 1
              : lastResult.life.computer,
        },
      };
      if (storageResult && typeof storageResult === "string") {
        const gameResultArr: ResultObjType[] = JSON.parse(storageResult);
        gameResultArr.push(resultObj);
        localStorage.setItem("gameResult", JSON.stringify(gameResultArr));
        setBattleResults(gameResultArr);
      } else {
        localStorage.setItem("gameResult", JSON.stringify([resultObj]));
        setBattleResults([resultObj]);
      }
      alertGameResult(resultObj.life.my, resultObj.life.computer);
      setRoundState(resultObj.result);
      setCtrlButtonStr(changeCtrlButton(resultObj));
      setRound((num) => num + 1);
    }
    return () => setIsClickedBtn(false);
  }, [
    compareHand,
    changeCtrlButton,
    computerHand,
    hand,
    isClickedBtn,
    battleResults,
    defaultResult,
  ]);

  return (
    <Styled.Container>
      {/*
       * TODO: 라운드 카운트
       *
       * ROUND는 localStorage로 관리되어야 하고
       * 게임의 결과가 나올 때마다 1씩 증가한다.
       */}
      <Styled.BattleRoundTitle>{`ROUND: ${round}`}</Styled.BattleRoundTitle>
      <Styled.BattleGround>
        {/*
         * TODO: 라운드 종료 / 경기 종료 - 생명수 차감
         *
         * BattleCounter에게는 남은 생명수가 전달됩니다.
         * 남은 생명수는 카운터별로(YOU / Computer) localStorage에 저장되어야 하며
         * 대결에서 패배할 경우 1씩 줄어듭니다. (늘어나는 경우는 없음)
         * 어느 한 쪽이라도 생명수가 0이 되면 경기는 종료됩니다.
         * TODO: 경기 종료
         *
         * 경기가 종료되면 window.alert 메소드를 활용하여
         * "<컴퓨터가 / 당신이> 승리하였습니다." 를 띄워야합니다.
         */}
        <BattleCounter
          activeLife={
            battleResults.length
              ? battleResults[battleResults.length - 1].life.my
              : defaultResult.life.my
          }
          hand={hand}
          changHand={setHand}
        />
        {/*
         * TODO: 라운드 종료 / 경기 종료 - 게임 시작 버튼
         *
         * 경기가 시작되면 CountDown이 되어야 합니다.
         * 3초 동안 카운트 다운이 진행되며 3 / 2 / 1
         * 3초가 지나면 이번 라운드의 승패가 나옵니다. Win / Lose / Draw
         * 사용자가 재경기 버튼을 클릭하면 'READY'로 변경되어야 합니다.
         */}
        <Styled.CountDownNumber>{roundState}</Styled.CountDownNumber>
        <BattleCounter
          activeLife={
            battleResults.length
              ? battleResults[battleResults.length - 1].life.computer
              : defaultResult.life.computer
          }
          isComputer
          hand={computerHand}
          changHand={setComputerHand}
        />
      </Styled.BattleGround>

      {/*
       * TODO: 라운드 종료 / 경기 종료 - 게임 시작 버튼
       *
       * 경기를 시작하고 나서는 '재대결하기'로 보여져야 하고
       * 라운드를 시작하기 전에는 '대결!'로 보여져야 합니다.
       * 경기가 최종적으로 종료가 되면(어느 한 쪽이라도 생명수가 0이되면) '다시 시작하기'로 보여져야 합니다.
       * '다시 시작하기' 버튼의 배경 색상은 #E63C3C 이어야합니다.
       * TODO: 대결 유효성 검사
       *
       * 가위/바위/보 중 하나를 선택하지 않고 '대결!' 버튼을 누를 경우 window의 alert 메소드를 활용해
       * "'가위/바위/보' 중 하나를 선택해주세요!" 텍스트를 띄워야 합니다.
       * TODO: 컴퓨터의 랜덤한 선택
       * '대결!'을 누르게 되면 컴퓨터는 가위/바위/보 중 하나를 랜덤하게 선택하여
       * 사용자가 선택한 선택지와 대조해 승패를 판가름 합니다.
       * TODO: 경기 재시작
       * '다시 시작하기' 버튼을 클릭할 경우,
       * 최초의 상태로 리셋이 되어야 합니다.
       */}
      <Styled.GameControlButton status={ctrlButtonStr} onClick={onClickCtrlBtn}>
        {ctrlButtonStr}
      </Styled.GameControlButton>

      {/*
       * TODO: 라운드 종료 - 결과
       *
       * 가위바위보의 결과는 localStorage에 저장되어야 합니다.
       * 가위바위보의 결과를 가져와 map을 활용해 렌더링해야 합니다.
       * 승패의 결과에 따라 다른 배경색상이 띄워져야 합니다.
       * 승리 #96edc6
       * 패배 #ffc8c1
       * 무승부 #f7f7f7
       */}
      {battleResults.map((result: ResultObjType, index: number) => {
        return <BattleResultInfo key={index + 1} data={result} />;
      })}
    </Styled.Container>
  );
}

export default App;
