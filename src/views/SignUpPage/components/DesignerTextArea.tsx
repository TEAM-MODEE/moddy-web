import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

interface DesignerTextAreaProps {
  placeholderText: string;
  onChangeFn: (value: string) => void;
  value?: string;
}

const DesignerTextArea = ({ placeholderText, onChangeFn, value }: DesignerTextAreaProps) => {
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    setTextLength(value ? value.length : 0);
  }, [value]);

  return (
    <S.TextAreaLayout>
      <S.TextArea
        placeholder={placeholderText}
        onChange={(e) => {
          setTextLength(e.target.value.length);
          onChangeFn(e.target.value);
        }}
        maxLength={200}
        value={value}
      />
      <S.TextAreaSpan>
        <S.TextAreaCountSpan $isZero={textLength === 0}>{textLength}</S.TextAreaCountSpan> / 200
      </S.TextAreaSpan>
    </S.TextAreaLayout>
  );
};

export default DesignerTextArea;

const S = {
  TextAreaLayout: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    align-items: end;

    width: 100%;
  `,
  TextAreaSpan: styled.span`
    color: ${({ theme }) => theme.colors.moddy_gray20};
    ${({ theme }) => theme.fonts.Body04};
  `,
  TextAreaCountSpan: styled.span<{ $isZero: boolean }>`
    color: ${({ theme, $isZero }) => ($isZero ? theme.colors.moddy_gray20 : theme.colors.moddy_blue2)};
    ${({ theme }) => theme.fonts.Body04};
  `,
  TextArea: styled.textarea`
    width: 100%;
    height: 15rem;
    padding: 1.2rem 1.6rem;
    border: 1.5px solid ${({ theme }) => theme.colors.moddy_gray20};
    border-radius: 8px;
    resize: none;

    color: ${({ theme }) => theme.colors.moddy_bk};

    ${({ theme }) => theme.fonts.Body02};

    &:focus {
      outline: none;

      border: 1.5px solid ${({ theme }) => theme.colors.moddy_blue};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.moddy_gray20};

      ${({ theme }) => theme.fonts.Body02};
    }
  `,
};
