# 가위바위보 게임 만들기

![가위바위보 썸네일](https://t3e9i9b6.stackpathcdn.com/wp-content/uploads/2020/07/1-28.png)

> 이미지 출처 사물궁이 잡학지식

### 기술 태그

React, JavaScript, TypeScript, styled-components

### 프로젝트 세팅

1. yarn install
   또는 yarn.lock 파일을 삭제한 뒤 npm install
2. npm start

## 용어 설명

1. 라운드 / 경기  
   경기가 종료될 때까지의 한 판 한 판을 '라운드' 라고 합니다.  
   예시:

   경기 시작  
   1라운드: 가위 vs 보 -> 승리  
   2라운드: 주먹 vs 가위 -> 승리  
   3라운드: 주먹 vs 가위 -> 승리  
   경기 결과: 당신이 승리하였습니다.

2. 가위바위보의 승패

   가위바위보 게임은 가위 / 바위 / 보 중 하나를 선택해 상대방과 선택지를 비교하는 게임입니다.  
   게임의 승패는 항상 하기와 같습니다.  
   가위 vs 주먹 -> 가위 패배, 주먹 승리  
   주먹 vs 보 -> 주먹 패배, 보 승리  
   보 vs 가위 -> 보 패배, 가위 승리
