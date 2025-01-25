// 첫 글자를 대문자로 변환하는 헬퍼 함수
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export default capitalize
