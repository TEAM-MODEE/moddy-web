import { useState } from 'react';
import { styled } from 'styled-components';

import { IcCheckBlue, IcInformation } from '../../@common/assets/icons';
import Button from '../../@common/components/Button';
import Input from '../../@common/components/Input';
import ProgressBar from '../../@common/components/ProgressBar';
import { USER_TYPE } from '../constants/userType';

import Field from './Field';
interface PersonalInfoProp {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const PersonalInfo = ({ setStep }: PersonalInfoProp) => {
  const userType = USER_TYPE.MODEL;

  const [birthYear, setBirthYear] = useState('');
  const [validateStatus, setValidateStatus] = useState(false);

  const handleBirthYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]{0,4}$/;

    if (regex.test(e.target.value)) {
      setBirthYear(e.target.value);
      if (e.target.value.length === 4) {
        const regex = /^(19[0-9]{2}|200[0-9]|201[0-9]|202[0-4])$/;
        regex.test(e.target.value) ? setValidateStatus(true) : setValidateStatus(false);
      } else {
        setValidateStatus(false);
      }
    }
  };

  return (
    <>
      <ProgressBar whole={userType === USER_TYPE.DESIGNER ? 5 : 3} current={1} />
      <S.PersonalInfoLayout>
        <S.FormBox>
          <Field name="디자이너명" isEssential={true} />
          <Input placeholderText="이름을 입력해주세요" />
          <S.HelperBox>
            <IcInformation />
            <S.HelperSpan>실명을 입력해주세요</S.HelperSpan>
          </S.HelperBox>
          {userType === USER_TYPE.DESIGNER ? null : (
            <>
              <Field name="출생 연도" isEssential={true} />
              <S.InputBox>
                <S.VerifyInput
                  placeholder="출생 연도(YYYY)를 입력해주세요"
                  value={birthYear}
                  onChange={handleBirthYear}
                />
                {validateStatus ? <IcCheckBlue /> : null}
              </S.InputBox>
            </>
          )}
          <Field name="성별" isEssential={true} />
          <S.GenderSelectBox>
            <S.RadioInput type="radio" id="female" name="gender-type" />
            <S.GenderTypeLabel htmlFor="female">여성</S.GenderTypeLabel>
            <S.RadioInput type="radio" id="male" name="gender-type" />
            <S.GenderTypeLabel htmlFor="male">남성</S.GenderTypeLabel>
          </S.GenderSelectBox>
        </S.FormBox>
      </S.PersonalInfoLayout>
      <Button text="다음" isFixed={true} onClickFn={() => setStep((prev) => prev + 1)} />
    </>
  );
};

export default PersonalInfo;
const PersonalInfoLayout = styled.div`
  margin-top: 8.6rem;
  padding: 0 1.6rem;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2.4rem;
`;

const HelperBox = styled.div`
  display: flex;
  gap: 0.4rem;

  margin-top: 0.8rem;
`;

const HelperSpan = styled.span`
  color: ${({ theme }) => theme.colors.moddy_blue2};
  ${({ theme }) => theme.fonts.Body04};
`;

const RadioInput = styled.input`
  display: none;

  &:checked + label {
    border: 1.5px solid ${({ theme }) => theme.colors.moddy_blue};

    box-shadow: ${({ theme }) => theme.effects.shadow2};

    color: ${({ theme }) => theme.colors.moddy_bk};
  }
`;

const GenderTypeLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  width: 16.4rem;
  padding: 1.2rem 0;
  border: 1.5px solid ${({ theme }) => theme.colors.moddy_gray20};
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.moddy_wt};

  color: ${({ theme }) => theme.colors.moddy_gray50};
  ${({ theme }) => theme.fonts.Body01};
`;

const GenderSelectBox = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const InputBox = styled.div`
  position: relative;

  width: 100%;
  margin-top: 0.8rem;

  & > svg {
    position: absolute;
    top: 0.9rem;
    right: 1.3rem;
  }
`;

const VerifyInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.6rem;
  border: 1.5px solid ${({ theme }) => theme.colors.moddy_gray20};
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.moddy_bk};
  ${({ theme }) => theme.fonts.Body02};

  &::placeholder {
    color: ${({ theme }) => theme.colors.moddy_gray50};
  }

  &:focus {
    outline: 1.5px solid ${({ theme }) => theme.colors.moddy_blue};
  }
`;
const S = {
  PersonalInfoLayout,
  FormBox,
  HelperBox,
  HelperSpan,
  RadioInput,
  GenderTypeLabel,
  GenderSelectBox,
  InputBox,
  VerifyInput,
};