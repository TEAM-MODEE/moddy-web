export const readImg = (event: React.ChangeEvent<HTMLInputElement>): File | undefined => {
  const input = event.target.files;

  // 인풋 태그에 파일이 있는 경우
  if (input && input[0]) {
    // FileReader 인스턴스 생성
    const reader = new FileReader();
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input[0]);

    // 이미지가 로드가 된 경우
    reader.onload = (e) => {
      const previewImg = document.getElementById('profileImg') as HTMLImageElement;

      if (typeof e.target!.result === 'string') {
        previewImg.src = e.target!.result;
        const modelImgUrl = input[0];

        return modelImgUrl;
      }
    };
  }
  return undefined;
};
// const formData = new FormData();
// formData.append('image', file); API request body의 key에 맞게 설정
