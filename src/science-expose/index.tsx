import icBack from 'assets/images/icBack.svg';
import icNext from 'assets/images/icNext.svg';
import icNextToEss from 'assets/images/icNextToEss.png';
import { ReactComponent as IcPointingHandWhite } from 'assets/images/icPointingHandWhite.svg';
import icReplaySE from 'assets/images/icReplaySE.png';
import piteraLogo from 'assets/images/logoPitera.svg';
import icLogo from 'assets/images/logoScienceExpose.svg';
import bgVideo from 'assets/videos/science_1_landing.mp4';
import Header from 'common/header';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Step1 from './01';
import Step2 from './02';
import Step3 from './03';
import Step5 from './05';
import Step6 from './06';
import Step12 from './12';
import Step13 from './13';
import './popup.scss';
import styles from './ScienceExpose.module.scss';
import './ScienceExpose.scss';
import './utils.scss';
import {
  useNavigate
} from 'react-router-dom';

function ScienceExposePage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [ended, setEnded] = useState(false);
  let navigate = useNavigate();

  const handleContinue = useCallback(() => {
    setStep(1);
  }, []);

  const handleBack = useCallback(() => {
    setStep(0);
  }, []);

  const handleEnd = useCallback(() => {
    setStep(0);
    setEnded(true);
  }, []);

  const handleReplay = useCallback(() => {
    setStep(1);
  }, []);

  const handleNextToEss = useCallback(() => {
    navigate('/pitera-essentials');
  }, []);

  return (
    <>
      <video className={styles.bgVideo} autoPlay playsInline loop muted>
        <source src={bgVideo} type="video/mp4"></source>
      </video>
      <div className={styles.container}>
        <Header className={styles.header}></Header>
        <div className={styles.overlayHeader}></div>
        <div className={styles.body}>
          <div className={styles.topContent}>
            <div className={styles.title}>
              <img src={piteraLogo}></img>
              <div>{t('science.title')}</div>
            </div>
            {ended ? (
              <img
                className={styles.icReplaySE}
                src={icReplaySE}
                alt="icon"
                onClick={handleReplay}
              />
            ) : (
              <div className={styles.icPlay}>
                <IcPointingHandWhite />
              </div>
            )}
          </div>
          <div className={styles.spacer} onClick={handleContinue}></div>
          <div className={styles.bodyContent}>
            <div className={styles.desc}>{t('science.desc')}</div>
            <button
              className={`${styles.ctaBtn} ${styles.ctaEndBtn}`}
              onClick={handleNextToEss}
            >
              <img
                className={styles.icNextToEss}
                src={icNextToEss}
                alt="icon"
              />
              {t('science.ctaEnd')}
              <img className={styles.icNext} src={icNext} alt="icon" />
            </button>
          </div>
          {/* <button className={styles.ctaBtn} onClick={handleContinue}>
            {t('science.cta')}
          </button> */}
        </div>
        {step > 0 && (
          <StepComponent
            step={step}
            onStep={setStep}
            onClose={handleBack}
            onEnd={handleEnd}
          ></StepComponent>
        )}
      </div>
    </>
  );
}

export default ScienceExposePage;

function StepComponent({ step, onStep, onClose, onEnd }: any) {
  const handleNextStep = useCallback(() => {
    onStep(step + 1);
  }, [step, onStep]);

  const ref = useRef<HTMLDivElement>(null);

  const stepEl = useMemo(() => {
    setTimeout(() => {
      ref.current?.classList.add('fade-enter-active');
    }, 50);

    const el = (() => {
      /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
      switch (step) {
        case 1:
          return <Step1 onNext={handleNextStep}></Step1>;
        case 2:
          return <Step2 onNext={handleNextStep}></Step2>;
        case 3:
        case 4:
          return <Step3 onNext={() => onStep(5)}></Step3>;
        case 5:
          return <Step5 onNext={handleNextStep}></Step5>;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
          return <Step6 onNext={() => onStep(12)}></Step6>;
        case 12:
          return <Step12 onNext={handleNextStep}></Step12>;
        case 13:
        case 14:
          return <Step13 onNext={onEnd}></Step13>;
      }
    })();
    return (
      <div key={step} ref={ref} className="se-popup-body-wrapper fade-enter">
        {el}
      </div>
    );
  }, [step, onEnd, onStep, handleNextStep]);

  return (
    <div className="se-popup">
      <div className="se-popup-header">
        <img className="se-popup-header__back" src={icBack} onClick={onClose} />
        <img className="se-popup-header__logo" src={icLogo} />
      </div>
      {stepEl}
    </div>
  );
}
