# Netflix Clone 
 
![스크린샷 2022-07-02 오전 2 34 57](https://user-images.githubusercontent.com/74564995/176943760-30a5814e-fd58-4ce7-bed0-2c5536fc69e3.png)

<p align='center'>
    <a href="https://react-neeetflix-clone.netlify.app/">Published Webpage</a>
</p>


## 🛠 Using Skill
- React Router DOM
- typescript
- React query
- styled-components
- Framer Motion
- serveless function (Netlify Functions) -> for hiding api key

## Caution
- Youtube Data API는 일일 제한량이 있으므로 이를 초과하여 사용한 경우에 403 Error를 보냅니다. 
  - Youtube Data API 할당량 : 10,000 / 1일
  - 넘으면 수습불가. 특히 현재 사용하고 있는 기능인 search 가 할당량을 많이 소비함. 소비 내역은 google console api 에서 확인 가능. 나중에 어떻게 할당량 줄일지 고민해보기
- Netlify Functions의 무료사용량 한도는 아래와 같습니다.
  - 1달간 125,000 Request
  - 1달간 functions run time 100시간
