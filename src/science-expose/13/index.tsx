import videoFull from 'assets/videos/Virtual_13_02_Deep_Skin_Penetration_Full.mp4';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { StepProps } from '../common';
import Step14 from '../14';
import styles from './13.module.scss';

function Step13({ onNext }: StepProps) {
  const { t } = useTranslation();
  const videoFullRef = useRef<HTMLVideoElement>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleTimeUpdate = useCallback((e: any) => {
    if (e.target.currentTime >= 13) {
      setOverlayVisible(true);
    }
  }, []);

  const handleReplay = useCallback(() => {
    setOverlayVisible(false);
    videoFullRef.current!.currentTime = 0;
    videoFullRef.current!.play();
  }, [videoFullRef]);

  return (
    <>
      <video
        ref={videoFullRef}
        className={`blend-bg ${styles.video}`}
        src={videoFull}
        autoPlay
        playsInline
        muted
        onTimeUpdate={handleTimeUpdate}
      ></video>
      <div className="se-popup-body align-bottom" style={{ zIndex: '8' }}>
        <div className="title2">{t('science.13.title')}</div>
        <div
          className="text mt-2"
          dangerouslySetInnerHTML={{
            __html: t('science.13.desc1', {
              interpolation: { escapeValue: false },
            }),
          }}
        ></div>
        <div
          className={styles.subText}
          dangerouslySetInnerHTML={{
            __html: t('science.13.desc2', {
              interpolation: { escapeValue: false },
            }),
          }}
        ></div>
      </div>
      <CSSTransition
        in={overlayVisible}
        timeout={300}
        unmountOnExit
        classNames="fade"
      >
        <div className={'se-popup-overlay'} style={{ zIndex: '8' }}>
          <Step14 onBack={handleReplay} onNext={onNext}></Step14>
        </div>
      </CSSTransition>
    </>
  );
}

export default Step13;
