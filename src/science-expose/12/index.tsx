import piteraLogo from 'assets/images/logoPitera.svg';
import videoSrc from 'assets/videos/Virtual_12_Deep_Skin_Penetration_Opening_Loop.mp4';
import { useTranslation } from 'react-i18next';
import { StepProps } from '../common';
import '../Slider.scss';
import styles from './12.module.scss';

function Step12({ onNext }: StepProps) {
  const { t } = useTranslation();

  return (
    <>
      <video
        className={`blend-bg ${styles.video}`}
        src={videoSrc}
        autoPlay
        playsInline
        loop
        muted
      ></video>
      <div className={`se-popup-body ${styles.body}`}>
        <div className="title2">{t('science.12.title')}</div>
        <img className={`${styles.logo} mt-2`} src={piteraLogo}></img>
        <div className="title2 mt-3">{t('science.12.title02')}</div>
        <div className="text mt-2">{t('science.12.desc')}</div>
      </div>
      <div className="se-popup-footer">
        <button className="cta-button" onClick={onNext}>
          {t('science.05.cta')}
        </button>
      </div>
    </>
  );
}

export default Step12;
