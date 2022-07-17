# oneS.js

회사에서 퍼블리싱 할 때 쓸 jQuery 라이브러리, 책임님께 의견 제시후 개발 예정.

- [addEventOn]()

### addEventOn

특정 요소에 "on" 클래스를 추가하는 이벤트를 등록하는 메소드

```javascript
// 기본형태
// selector, 이벤트가 등록될 대상
$(selector).addEventOn(); // $(selector).toggleClass() 처럼 동작한다.

// 추가 옵션은 객체로 받는다.
$(selector).addEventOn({
  target: $(selector),
});
```

옵션

- `target`: jQuery Object  
   class "on"이 추가될 대상, jQuery 객체로 값 전달. ex) `$(".oneHeader")`
- `event`: String  
  등록될 이벤트 종류. ex) `"click"`
- `onIf`: Function  
   class "on"이 추가될 조건 함수. boolean값을 반환해야한다.
- `offIf`: Function  
   class "on"이 삭제될 조건 함수. boolean값을 반환해야한다.
- `onEvent`: Function  
   class "on"이 추가될 떄 실행 될 콜백함수.
- `offEvent`: Function  
   class "on"이 삭제될 때 실행 될 콜백함수.
