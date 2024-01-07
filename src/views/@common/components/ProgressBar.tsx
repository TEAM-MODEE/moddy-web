import styled from 'styled-components';

import { IcStepDone, IcStepOngoing, IcStepWaiting } from '../assets/icons';

interface ProgressBarProps {
  whole: number;
  current: number;
}
const ProgressBar = ({ whole, current }: ProgressBarProps) => {
  const arr = new Array(whole).fill(0);

  return (
    <S.ProgressBarLayout>
      <S.ProgressBarBox>
        {arr.map((_, idx) =>
          idx < current - 1 ? (
            <IcStepDone key={idx} />
          ) : idx === current - 1 ? (
            <IcStepOngoing key={idx} />
          ) : (
            <IcStepWaiting key={idx} />
          ),
        )}
      </S.ProgressBarBox>
    </S.ProgressBarLayout>
  );
};

export default ProgressBar;

const S = {
  ProgressBarLayout: styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
  `,
  ProgressBarBox: styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
  `,
};