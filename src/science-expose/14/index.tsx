import icRestart from 'assets/images/icRestart.svg';
import videoSrc from 'assets/videos/Virtual_14_01_Apply_PITERA_Face_Transition01_Day28toCCS.mp4';
import videoLoop from 'assets/videos/Virtual_14_02_CCS_Face_Loop.mp4';
import { useTranslation } from 'react-i18next';
import TransitionVideo from 'science-expose/transition-video';
import { StepProps } from '../common';
import styles from './14.module.scss';

function Step14({ onNext, onBack }: StepProps) {
  const { t } = useTranslation();

  return (
    <>
      <TransitionVideo
        className={`blend-bg ${styles.video}`}
        video1={videoSrc}
        video2={videoLoop}
        autoPlay={true}
      ></TransitionVideo>
      <div className="se-popup-body align-bottom">
        <div className="title2">{t('science.14.title')}</div>
        <div
          className="text mt-2"
          dangerouslySetInnerHTML={{
            __html: t('science.14.desc1', {
              interpolation: { escapeValue: false },
            }),
          }}
        ></div>
        <div
          className={styles.subText}
          dangerouslySetInnerHTML={{
            __html: t('science.14.desc2', {
              interpolation: { escapeValue: false },
            }),
          }}
        ></div>
      </div>

      <div className={`se-popup-footer ${styles.footer}`}>
        <button className="cta-button icon" onClick={onBack}>
          <img src={icRestart}></img>
          {t('science.14.replay')}
        </button>
        <button className={`cta-button primary ${styles.ctaButton}`} onClick={onNext}>
          {t('science.14.cta')}
        </button>
      </div>
    </>
  );
}

export default Step14;
