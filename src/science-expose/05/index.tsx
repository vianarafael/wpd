import piteraLogo from 'assets/images/logoPitera.svg';
import video from 'assets/videos/science_power_of_pitera_intro.mp4';
import { useTranslation } from 'react-i18next';
import { StepProps } from '../common';
import '../Slider.scss';
import styles from './05.module.scss';

function Step5({ onNext }: StepProps) {
  const { t } = useTranslation();

  return (
    <>
      <video
        className={`blend-bg ${styles.video}`}
        src={video}
        autoPlay
        playsInline
        loop
        muted
      ></video>
      <div className={`se-popup-body align-top ${styles.body}`}>
        <div className="title2">{t('science.05.title')}</div>
        <img className={styles.logo} src={piteraLogo}></img>
        <div className="text mt-3">{t('science.05.desc')}</div>
      </div>
      <div className="se-popup-footer">
        <button className="cta-button" onClick={onNext}>
          {t('science.05.cta')}
        </button>
      </div>
    </>
  );
}

export default Step5;
