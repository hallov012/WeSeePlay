# 목차
### [1. 서비스 소개](#1서비스-소개)
### [2. 기술 스택](#2기술-스택)  
### [3. 적용 게임 소개](#3적용-게임-소개)  
### [4. 프로젝트 진행](#4프로젝트-진행)  
### [5. 배포](#5배포)  

## [1&nbsp;서비스 소개](#목차)  
* ### 서비스 설명  
    + 개요  
        * 서비스 명 : We See Play &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/uploads/5fb825b93032521b01baa380e896c042/Logo.PNG" height="50" alt="Logo 이미지가 없습니다."/>
        * 슬로건 : We See! We Play!&nbsp;&nbsp;&nbsp;&nbsp;
<img src="/uploads/e0b473308a3602dbbc2b445f7c714959/Slogan.PNG" height="40" alt="Slogan 이미지가 없습니다."/>  <br>
        * 더욱 커지는 비대면의 중요성을 겨냥한 서비스  
    * 타겟  
        * 사정상(전염병 유행, 거리 문제 등) 만나지 못하는 친구들  
        * 프로젝트로 새롭게 만난 팀원들  <br><br>
* ### 기획 배경  

* ### 기능 정의서<br>
<img src="/uploads/dc9d70af1a196b5eb992023431dc3714/기능정의서.PNG" height="600" alt="기능 정의서 이미지가 없습니다."/><br>

* ### Wire Frame<br>
<img src="/uploads/f6fe5520516289b5082746e54e795185/wireframe.gif" height="400" alt="Wire Frame 이미지가 없습니다."/><br>
* ### 서비스 화면  

## [2&nbsp;기술 스택](#목차)  
* ### Openvidu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/uploads/85ed6aeebb1d9d7b6e2b0043a3dc8647/OpenVidu.PNG" height="40" alt="OpenVidu 이미지가 없습니다."/>  <br>

* ### Vue.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white">  <br>

* ### Spring Boot(https 적용, Restful API) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">  <br>
<img src="/uploads/61e0df00be91dd436689679a5c98956c/Https.PNG" height="150" alt="Https 이미지가 없습니다."/>  <br>
<img src="/uploads/e83e84f8a7f5c065a88fafedf0436a9e/Rest_API.PNG" height="450" alt="Rest API 이미지가 없습니다."/>  <br>

* ### 추가할 것들  

* ### 추가할 것들  

## [3&nbsp;적용 게임 소개](#목차)  
* ### 라이어 게임<br><br>
<img src="/uploads/de6160ea596a35252620c3d8e9cd4a45/Liar_game_logo.PNG" height="90" alt="Liar game 이미지가 없습니다."/>  <br><br>
시스템에 의해 선정된 제시어를 한명만 제외하고 모든 참여자들에게 알려줍니다.  
그 제외된 한명은 일명 '라이어'이며 라이어는 제시어를 본 것 처럼 연기를 해야합니다.  
돌아가면서 제시어에 대한 설명을 하며 라이어를 찾는 게임입니다.  
<br>
* ### Call My Name<br><br>
<img src="/uploads/c00783fa0907c7fbaafe169b4b392bfb/call_my_name_logo.PNG" height="80" alt="Liar game 이미지가 없습니다."/>  <br><br>
런닝맨에서 양세찬 게임으로도 불리는 Call My Name 입니다.  
모든 참가자들은 각각 특정 이름을 부여받지만 자신을 제외한 참가자들만 해당 이름을 확인 할 수 있습니다.  
서로 질문을 하며 자신의 이름을 맞추는 방식입니다.  

## [4&nbsp;프로젝트 진행](#목차)  
데일리 스크럼을 진행하며 매번 회의를 Notion에 기록하고 Git Lab에 Git Flow 전략을 적용하여 코드를 관리하였으며 Jira를 이용하여 팀원들의 할 일과 일정을 조절하였습니다.  <br>
### Notion
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"><br>
팀장님의 주도하에 Daily Scrum을 진행하였고 회의 내용을 비롯하여 API 설계, WireFrame, ERD 등 필요한 자료들을 한눈에 확인할 수 있도록 정리하였습니다.<br>
깔끔하게 정리함으로써 지난 회의 내용이나 필요한 자료를 찾는 수고를 덜 수 있었고 원만한 협업의 원동력이 되었습니다.
<br><br>
<img src="/uploads/ba611d2e411bfcce780204f31a336532/Notion_1.PNG" alt="Notion 이미지가 없습니다."/><br>
<img src="/uploads/c3683a76b8de0457f8edd93eb79ea948/Notion_2.PNG" alt="Notion 이미지가 없습니다."/>  
<img src="/uploads/206be6cd806f481f7386d1b11649c7b2/Notion_3.PNG" alt="Notion 이미지가 없습니다."/>  <br>

### Git Lab(Git Flow 전략)
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=GitLab&logoColor=white"><br><br>
여러 Git Branch 전략 중 Git Flow 전략을 적용했습니다.<br>
주요 Branch는 Front, Back, Dev, Main 이렇게 4가지를 두고 특정 기능을 구현하는 Branch를 생성해서 각각 Front나 Back에 Merge Request를 생성하고 이를 검수하여 합치는 방식으로 진행했습니다. <br>
Dev Branch에서 통합 테스트를 하고 Main Branch는 문제 없이 최종적으로 배포하는 Branch입니다.
<br><br>
<img src="/uploads/89ea8ea842fd916edbbccc84a33632db/Git_Flow.gif" height="520" alt="Git Flow 이미지가 없습니다."/><br>

### Jira &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"><br>
매주 초에 회의를 통해 각자 일주일 동안 진행할 내용을 정하고 하루 Story Point 8을 기준으로 Backlog에 Issue를 생성하였습니다.<br>
크게 Epic(기획, 개발, 학습 등)으로 분류했고 명명 규칙(FE : 개발 > ErrorPage > CSS 등)을 정하여 어떤 작업을 하는지 쉽게 이해할 수 있도록 했습니다.
<br><br>
<img src="/uploads/398468719ebc7b698a276c6e6c462260/Jira_Backlog.PNG" alt="Jira 이미지가 없습니다."/><br><br>
처음 적용 하다보니 작업에 대한 시간을 정확하게 할당하지 못하여 미숙한 부분이 많았지만 Burndown Chart는 우하향 그래프를 그리고 있습니다.<br><br>
<img src="/uploads/6c22e9c94b32e95fda3c12d3b495ed99/Jira_Burndown_chart.PNG" alt="Jira 이미지가 없습니다."/><br><br>

## [5&nbsp;배포](#목차)  

### Docker &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"><br>

### MSA 적용<br><br>
<img src="/uploads/e6525277761b845bb1a843dfdc76650a/MSA.PNG" alt="MSA 이미지가 없습니다."/>  
