import icRestart from 'assets/images/icRestart.svg';
import videoSrc from 'assets/videos/Virtual_07_Before_Pitera_Fluctuation_Graph_Full_Loop_3.mp4';
import { useTranslation } from 'react-i18next';
import { StepProps } from '../common';
import '../Slider.scss';
import styles from './04.module.scss';
import ButtonApplyPITERA from 'science-expose/04/button';

function Step4({ onNext, onBack }: StepProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles.bodyPopup} se-popup-body`}>
        <div className={styles.title}>
          <div className={styles.title1}>{t('science.04.title1')}</div>
          <div className={styles.title2}>{t('science.04.title2')}</div>
        </div>
        <video
          className={`blend-bg ${styles.video}`}
          src={videoSrc}
          autoPlay
          playsInline
          loop
          muted
        ></video>
        <div className="text">{t('science.04.desc')}</div>
      </div>
      <div className="se-popup-footer">
        <button className="cta-button icon" onClick={onBack}>
          <img src={icRestart}></img>
          {t('science.04.replay')}
        </button>
        <ButtonApplyPITERA onClick={onNext} isPlay={true}>
          {t('science.04.cta')}
        </ButtonApplyPITERA>
      </div>
    </>
  );
}

export default Step4;
