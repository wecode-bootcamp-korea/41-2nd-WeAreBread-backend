# 41-2st-WeAreBread-backend

# WeAreBread 2차 프로젝트 (다이닝코드 사이트를 디자인을 기반으로 리프로덕트)🥾
- WeAreBread의 주 목적은 Bread Shop에 대한 정보교류 & 사업자와 소비자간의 피드백과 소통을 도와주는 사이트입니다.

- 짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인 / 기획 부분만 클론했습니다.


- 개발은 초기 세팅부터 전부 직접 구현 했으며, 아래 데모 영상에서 보이는 부분은 모두 프론트엔드와 백엔드가 통신하여 실제 서비스 수준으로 개발한 것입니다.
<br />

## 기간

- 개발기간: 2022.01.30 ~ 2022.02.10 (2주)
<br />
<br />


## 팀원

- Frontend (4명) : 황선용, 윤지수, 이세윤, 임가림
- Backend (2명)  : 김광휘, 김승
<br />
<br />
<a href="https://github.com/wecode-bootcamp-korea/41-2nd-WeAreBread-frontend">프론트엔드 Github</a>
<br />
<a href="https://github.com/wecode-bootcamp-korea/41-2nd-WeAreBread-backend">  백엔드 Github</a>
<br />
<br />

## 사용된 기술
- JavaScript
- Node.js (express)
- MySQL
- Git
- AWS (EC2, RDS)
- Oracle
- DBmate
- Jest
- Supertest
<br />
<br />


## 협업

- Github
- Slack
- Notion
- Trello
- Agile Process (Scrum)
<br />
<br />



## 클론 영상


<a href="">Demo Video Link 준비중</a>



<br />
<br />


## ERD
![스크린샷 2023-01-04 오후 3 37 03](https://user-images.githubusercontent.com/119113904/218299538-c6c659c5-0317-4515-99fc-518da3410cbc.png)


<br />
<br />


## 담당 구현 사항 및 구현 기능

#### 김광휘 - 🤖  

#### 김승 - 🙂

<br />
<br />

- Project Modeling 🤖
- 소셜로그인(kakao) 🤖
- 소셜회원가입(kakao) 🤖
- mainPage (필터링 기능 구현) 🤖
- shop 리스트 (검색 & 정렬 기능 구현) 🤖
  - shop 리스트 검색 🤖
  - shop 리스트 정렬(좋아요순, 리뷰순, 평점순) 🤖
- shop 디테일 🤖
- reviews 디테일 
  - getreviewData 🤖
  - createReview 🤖
  - modifyReview 🤖
  - deleteReview 🤖

<br />

---

## 🥾 User
<br />
회원가입 - kakao에서 받은 토큰을 통해 db에 저장돼있는 유저인지 일치여부 확인, 일치하지 않으면 db에 새 유저 정보 생성후 jwt 토큰 발급
<br />
<br />
로그인 - kakao에서 받은 토큰을 통해 db에 저장돼있는 유저인지 일치여부 확인, 일치하면 jwt 토큰 발급
<br />
<br />
인가 - Auth.js middleware를 작성하여 인가가 필요한 모든 API에 적용
<br />
<br />

## 🥾 Product
<br />
mainPage (필터링 기능 구현) - mainPage에 필요한 카테고리로 분류된 데이터 기능 구현
<br />
shop 리스트 (검색 & 정렬 기능 구현) - 검색 기능 구현, 정렬 기능 구현, 페이지네이션 기능 구현
<br />
<br />
shop 디테일 - shop 상세페이지 조회
reviews 디테일 - review 리스트, 리뷰생성, 리뷰수정, 리뷰삭제
<br />
<br />

## API Documentstion

<a href="https://documenter.getpostman.com/view/25063140/2s935it5r1">Postman API</a>
<br />
<br />



### Reference
-----
- 이 프로젝트는 <a href="https://www.diningcode.com/">다이닝코드</a> 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
