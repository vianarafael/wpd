import icRestart from 'assets/images/icRestart.svg';
import video2 from 'assets/videos/Virtual_03_7AM_Face_Loop.mp4';
import video1 from 'assets/videos/Virtual_03_Fluctuation_Full.mp4';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { StepProps } from '../common';
import TransitionVideo from '../transition-video';
import styles from './02.module.scss';

function Step2({ onNext }: StepProps) {
  const { t } = useTranslation();
  const [footerVisible, setFooterVisible] = useState(false);
  const videoRef = useRef<any>(null);

  const handleReplay = useCallback(() => {
    setFooterVisible(false);
    videoRef.current.replay();
  }, [videoRef]);

  const handleContinue = useCallback(() => {
    onNext && onNext();
  }, [onNext]);

  const handleTimeUpdate = useCallback((e: any) => {
    if (e.target.currentTime >= 16) {
      setFooterVisible(true);
    }
  }, []);

  return (
    <>
      <TransitionVideo
        className={`blend-bg ${styles.video}`}
        video1={video1}
        video2={video2}
        autoPlay={true}
        onTimeUpdate={handleTimeUpdate}
        ref={videoRef}
      ></TransitionVideo>
      <div className={'se-popup-body align-bottom'}>
        <div className="title2">{t('science.02.title')}</div>
        <div className="text mt-2">{t('science.02.desc')}</div>
      </div>
      <CSSTransition
        in={footerVisible}
        unmountOnExit
        timeout={1000}
        classNames="flyup"
      >
        <div className="se-popup-footer mt-3">
          <button className="cta-button icon" onClick={handleReplay}>
            <img src={icRestart}></img>
            {t('science.02.replay')}
          </button>
          <button className="cta-button primary" onClick={handleContinue}>
            {t('science.02.continue')}
          </button>
        </div>
      </CSSTransition>
      <div className={styles.overlayBottom}></div>
    </>
  );
}

export default Step2;
