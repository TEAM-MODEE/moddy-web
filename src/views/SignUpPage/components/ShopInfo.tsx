import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IcSearch } from '../assets/icons';
import { DAYS } from '../constants/days';
import { HELPER_MESSAGE } from '../constants/message';
import { TOTAL_STEP } from '../constants/step';
import { EnterProfileProp } from '../utils/enterProfileProp';

import Field from './Field';
import LimitInput from './LimitInput';
import PostCode from './PostCode';

import { shopInfoState, addressState, detailShopInfoState, dateState } from '@/recoil/atoms/signUpState';
import Button from '@/views/@common/components/Button';
import Modal from '@/views/@common/components/Modal';
import ProgressBar from '@/views/@common/components/ProgressBar';

const ShopInfo = ({ setStep }: EnterProfileProp) => {
  // 클릭시 변경되게
  const [isClicked, setIsClicked] = useState<boolean[]>(Array(6).fill(false));
  const handleDayOffClick = (index: number) => {
    setIsClicked((prevIsClicked) => {
      const updatedData = prevIsClicked.map((item, idx) => (idx === index ? !item : item));
      setClickedDateInfo({ data: updatedData });
      return updatedData;
    });
  };

  //이동
  const navigate = useNavigate();
  const [isOpenModal, setOpenModal] = useState(false);

  //입력값 넣기
  const [Address, setAddress] = useState<string>('');

  const handleInputAddress = (value: string) => {
    setAddress(value);
    setAddressInfo((prevAddressInfo) => ({
      ...prevAddressInfo,
      data: value,
    }));
  };

  const [isAddressModal, setIsAddressModal] = useState(false);
  const handleOpenAddressModal = () => {
    setIsAddressModal(true);
  };

  //입력 시 CTA 상태변화
  const [placeTextValue, setPlaceTextValue] = useState('');

  const handlePlaceText = (value: string) => {
    setPlaceTextValue(value);
    setShopInfo({ data: value, verifyStatus: true });
  };

  const [addressDetailValue, setAddressDetailValue] = useState('');
  const handleDetialAddressText = (value: string) => {
    setAddressDetailValue(value);
    setDetailAddressInfo({ data: value, verifyStatus: true });
  };

  //recoil 적용 CTA 클릭시 저장
  const [shopInfo, setShopInfo] = useRecoilState(shopInfoState);
  const [addressInfo, setAddressInfo] = useRecoilState(addressState);
  const [detailAddressInfo, setDetailAddressInfo] = useRecoilState(detailShopInfoState);
  const [clickedDateInfo, setClickedDateInfo] = useRecoilState(dateState);

  const saveDataToRecoil = () => {
    setShopInfo((prevShopInfo) => ({
      ...prevShopInfo,
      data: placeTextValue,
      verifyStatus: true,
    }));

    setAddressInfo((prevAddressInfo) => ({
      ...prevAddressInfo,
      data: Address,
    }));

    setDetailAddressInfo((prevDetailAddressInfo) => ({
      ...prevDetailAddressInfo,
      data: addressDetailValue,
      verifyStatus: true,
    }));

    setClickedDateInfo((prevClickedInfo) => ({
      ...prevClickedInfo,
      data: isClicked,
    }));
  };

  const isActive = Address && shopInfo.data !== '' && detailAddressInfo.data;

  useEffect(() => {
    const applyChanges = async () => {
      if (clickedDateInfo) {
        const clickedIndex = clickedDateInfo.data
          .map((value, index) => (value ? index : undefined))
          .filter((index) => index !== undefined) as number[];

        clickedIndex.forEach((index) => {
          return handleDayOffClick(index);
        });
      }
      if (addressInfo) {
        {
          const inputAddress = addressInfo.data;
          handleInputAddress(inputAddress);
        }
      }
    };

    applyChanges();
  }, []);

  return (
    <>
      <S.PostCodeBox>
        {isAddressModal && <PostCode setIsAddressModal={setIsAddressModal} setAddress={handleInputAddress} />}
      </S.PostCodeBox>

      <ProgressBar whole={TOTAL_STEP.DESIGNER_VIEW} current={3} />
      <S.ShopInfoLayout>
        <Field name="소속" isEssential={true} />

        <LimitInput
          placeholderText={HELPER_MESSAGE.INPUT_SHOP_NAME}
          initialValue={shopInfo.data}
          onChangeFn={handlePlaceText}
          maxLength={25}
        />
        <Field name="주소" isEssential={true} />
        <S.AddressBox onClick={handleOpenAddressModal}>
          {Address ? (
            <S.InputAddressBox>{addressInfo.data}</S.InputAddressBox>
          ) : (
            <S.DefaultText>{HELPER_MESSAGE.INPUT_ADDRESS}</S.DefaultText>
          )}

          <IcSearch />
        </S.AddressBox>
        <LimitInput
          placeholderText={HELPER_MESSAGE.INPUT_DETAIL_ADRESS}
          initialValue={detailAddressInfo.data}
          onChangeFn={handleDetialAddressText}
          maxLength={25}
        />

        <Field name="휴무" isEssential={false} />

        <S.DayOffWrapperBox>
          {DAYS.map((day, index) => (
            <S.DayOffBox key={day} onClick={() => handleDayOffClick(index)} $isClicked={isClicked[index]}>
              {day}
            </S.DayOffBox>
          ))}
        </S.DayOffWrapperBox>
      </S.ShopInfoLayout>
      <Button
        text="다음"
        isFixed={true}
        disabled={!isActive}
        onClickFn={() => {
          setStep((prev) => prev + 1);
          setOpenModal(true);
          saveDataToRecoil();
        }}
      />

      {isOpenModal && (
        <Modal
          title="이대로 가입하시겠어요?"
          description="가입 후에는 수정이 어려워요"
          leftBtnText="돌아가기"
          rightBtnText="확인"
          leftBtnFn={() => setOpenModal(false)}
          rightBtnFn={() => navigate('/')}
        />
      )}
    </>
  );
};

export default ShopInfo;

const S = {
  PostCodeBox: styled.div`
    position: fixed;
    top: 0;
    z-index: 5;

    width: 100%;
    margin-top: 5rem;
  `,
  ShopInfoLayout: styled.div`
    margin-top: 8.6rem;
    padding: 0 1.6rem;
  `,

  DayOffWrapperBox: styled.div`
    display: flex;
    gap: 0.8rem;
    justify-content: space-between;

    width: 100%;
  `,

  DayOffBox: styled.div<{ $isClicked: boolean }>`
    display: flex;
    flex: 1;
    justify-content: center;

    padding: 1.2rem 0;
    border: 1.5px solid ${({ $isClicked, theme }) => ($isClicked ? theme.colors.moddy_blue : theme.colors.moddy_gray20)};
    border-radius: 8px;

    box-shadow: ${({ $isClicked, theme }) => ($isClicked ? theme.effects.shadow3 : '0 0 0 transparent')};

    color: ${({ $isClicked, theme }) => ($isClicked ? theme.colors.moddy_blue : theme.colors.moddy_gray50)};
    ${({ theme }) => theme.fonts.Body02};

    ${({ theme }) => theme.fonts.Body02};
  `,

  AddressBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-bottom: 0.8rem;
    padding: 1.2rem 1.6rem;
    border: 1.5px solid;
    border-color: ${({ theme }) => theme.colors.moddy_gray20};
    border-radius: 8px;
  `,
  InputAddressBox: styled.div`
    color: ${({ theme }) => theme.colors.moddy_bk};
    ${({ theme }) => theme.fonts.Body02};

    text-decoration: none;
  `,
  DefaultText: styled.p`
    color: ${({ theme }) => theme.colors.moddy_gray50};
    ${({ theme }) => theme.fonts.Body02};
  `,
};
