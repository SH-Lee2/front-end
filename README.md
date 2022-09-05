# 👀 밖에봐봐 LOOK-OUTSIDE

## 🌈 프로젝트 소개

 "오늘 옷 뭐 입지..?" 고민하신 적 있으신가요? 날씨가 어떤 지에 따라 가디건을 입어야 할지, 반팔만 입어야 할지... 기상청의 온도 숫자는 와닿지가 않단말이죠..!  타지에 놀러 가야 하는데 그곳의 날씨를 알 수 없어 고민이 들기도 하구요.

이러한 니즈에 따라, 매일 날씨에 맞는 옷차림을 서로 공유하며 자유롭게 대화하는 커뮤니티, ✨밖에 봐봐✨ 서비스를 개발했습니다! 각 지역의 사람들은 “오늘 가디건만 입기 딱 좋은 날씨네요”와 같이 글을 올리며 니즈를 해결하고 커뮤니티를 활성화할 수 있습니다.

## 🔨 기술 스택

**Front-end**

* TypeScript
* React, Zustand
* HTML, CSS, styled-components
* Netlify

**Back-end**

- Java 8
- SpringBoot 2.5.2, Gradle, Spring Security, OAuth2.0 + JWT
- MySQL 8.0.28(RDB), JPA & QueryDSL (ORM)
- AWS - EC2, RDS, S3, Route53
- Nginx (Reverse Proxy Server)

**협업 Tool**

- Git, Notion, Zoom, Discord

## 📆 개발 기간
2022년 8월 1일 ~ 2022년 9월 4일

## 📜 기획 및 설계

### **Diagram**

<p align="center">
    <img src="https://user-images.githubusercontent.com/97022695/188375741-79edbb1d-d82a-4883-8081-22e4354f61ac.png" width="60%" />
</p>

### **API**
[API 설계 (notion)](https://www.notion.so/look-outiside/API-e388c9ea0b624e8abf3f1981ef4e00f7)

### **ERD**

<p align="center">
    <img src="https://user-images.githubusercontent.com/97022695/188367117-73b6f0fc-cec0-470a-b6fb-a2c3887485d6.png" width="80%" />
</p>






## 👨‍👨‍👧‍👧 팀원

 역할 | 팀원 | 구현 기능
 :--: | :--: | :-- 
 Front | [진현주](https://github.com/realzu) | - 프로젝트 총괄 및 아이디어 기획<br>- 마이페이지 (정보수정, 작성글/댓글목록, 탈퇴)<br>- 관리자페이지 (회원목록, 관리자임명/해임 기능)<br>- 지도 (open weather API 데이터 및 UI 구현)<br>- 페이지네이션 작업<br>- 오늘의 옷, 데일리룩, 오늘의 하늘 카테고리 개발
 Front | [이시형](https://github.com/SH-Lee2) | - 메인페이지(헤더, 풋터)<br>- 로그인, 회원가입<br>- 상세페이지 작업<br>- 게시물 작성 기능 구현<br>- 오늘 뭐 입지?, 오늘의 모임 카테고리 개발
 Back | [이한솔](https://github.com/Lee-Han-Sol) | - 로그인 및 소셜로그인(GOOGLE, KAKAO) 관리<br>- 회원가입 CRUD 작업<br>- 게시물 페이지 관련 CRUD 작업<br>- 관리자 페이지 관련 CRUD 작업<br>- 메인 페이지 기능 구현<br>- AWS(RDS, S3, EC2, Route53) 인프라 연동<br>- API 작성
 Back | [이나영](https://github.com/nlee013) | - AWS(S3) 인프라 연동<br>- 게시물 페이지 관련 CRUD 작업<br>- 댓글 관련 CRUD 작업<br>- API 작성
