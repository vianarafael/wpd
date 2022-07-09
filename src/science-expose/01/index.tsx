import icLogo from 'assets/images/icLogo.svg';
import video from 'assets/videos/science_2_fluctuation_opening_face.mp4';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { StepProps } from '../common';
import styles from './01.module.scss';

function Step1({ onNext }: StepProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const handleContinue = useCallback(() => {
    if (step === 0) {
      setStep(1);
    } else {
      onNext && onNext();
    }
  }, [step, onNext]);

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
      <div className={`se-popup-body align-top ${styles.popupContainer}`}>
        <img className={styles.logo} src={icLogo} />
        {step === 0 && (
          <>
            <div className={`title1 mt-3 mb-3 ${styles.title}`}>
              {t('science.01.part1.title')}
            </div>
            <div className="text">
              {t('science.01.part1.desc')}
            </div>
          </>
        )}
        <CSSTransition
          in={step === 1}
          timeout={1000}
          unmountOnExit
          classNames="fade"
        >
          <div>
            <div className={`title1 mt-3 mb-3 ${styles.title}`}>
              {t('science.01.part2.title')}
            </div>
            <div className="text">
              {t('science.01.part2.desc')}
            </div>
          </div>
        </CSSTransition>
      </div>
      <div className="se-popup-footer">
        <button className="cta-button" onClick={handleContinue}>
          {t(step === 0 ? 'science.01.part1.cta' : 'science.01.part2.cta')}
        </button>
      </div>
      <div className={styles.overlayBottom}></div>
    </>
  );
}

export default Step1;
