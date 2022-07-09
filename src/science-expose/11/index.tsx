import icRestart from 'assets/images/icRestart.svg';
import video1 from 'assets/videos/Virtual_11_01_Apply_PITERA_Face_Transition01_Day07toDay28.mp4';
import video2 from 'assets/videos/Virtual_11_02_Apply_PITERA_Face_Day28_Loop_alt.mp4';
import { useTranslation } from 'react-i18next';
import TransitionVideo from 'science-expose/transition-video';
import { StepProps } from '../common';
import styles from './11.module.scss';

function Step11({ onNext, onBack }: StepProps) {
  const { t } = useTranslation();

  return (
    <>
      <TransitionVideo
        className={`blend-bg ${styles.video}`}
        video1={video1}
        video2={video2}
        autoPlay={true}
      ></TransitionVideo>
      <div className={'se-popup-body align-bottom'}>
        <div
          className="text"
          dangerouslySetInnerHTML={{
            __html: t('science.11.desc1', {
              interpolation: { escapeValue: false },
            }),
          }}
        ></div>
        <div
          className={styles.subText}
          dangerouslySetInnerHTML={{
            __html: t('science.11.desc2', {
              interpolation: { escapeValue: false },
            }),
          }}
        ></div>
      </div>
      <div className="se-popup-footer mt-3">
        <button className="cta-button icon" onClick={onBack}>
          <img src={icRestart}></img>
          {t('science.11.replay')}
        </button>
        <button className="cta-button primary" onClick={onNext}>
          {t('science.11.cta')}
        </button>
      </div>
    </>
  );
}

export default Step11;
