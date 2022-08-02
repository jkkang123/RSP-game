import * as Styled from "./App.style";
import { useState, useEffect, useRef } from "react";
import { BattleCounter, BattleResultInfo } from "./components";

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }
function App() {
  const [computerHand, setComputerHand] = useState<string>("");
  const [countNum, setCountNum] = useState<string>("Ready");

  useEffect(() => {
    const countDown = setInterval(() => {
      if (Number(countNum) > 0) {
        setCountNum((count) => String(Number(count) - 1));
      }
      if (Number(countNum) <= 0) {
        clearInterval(countDown);
        setComputerHand(
          ["가위", "바위", "보"][
            Math.floor(Math.random() * ["가위", "바위", "보"].length)
          ]
        );
      }
    }, 1000);
    return () => clearInterval(countDown);
  }, [countNum]);
  return (
    <Styled.Container>
      {/*
       * TODO: 라운드 카운트
       *
       * ROUND는 localStorage로 관리되어야 하고
       * 게임의 결과가 나올 때마다 1씩 증가한다.
       */}
      <Styled.BattleRoundTitle>ROUND: 3</Styled.BattleRoundTitle>
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
        <BattleCounter activeLife={2} />
        {/*
         * TODO: 라운드 종료 / 경기 종료 - 게임 시작 버튼
         *
         * 경기가 시작되면 CountDown이 되어야 합니다.
         * 3초 동안 카운트 다운이 진행되며 3 / 2 / 1
         * 3초가 지나면 이번 라운드의 승패가 나옵니다. Win / Lose / Draw
         * 사용자가 재경기 버튼을 클릭하면 'READY'로 변경되어야 합니다.
         */}
        <Styled.CountDownNumber>{countNum}</Styled.CountDownNumber>
        <BattleCounter activeLife={1} isComputer computerHand={computerHand} />
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
      <Styled.GameControlButton onClick={() => setCountNum("3")}>
        대결!
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
      <BattleResultInfo />
      <BattleResultInfo />
      <BattleResultInfo />
    </Styled.Container>
  );
}

export default App;
