import bottle from 'assets/images/bottle.png';
import bodyBottle from 'assets/images/bodyBottle.png';
import topBottle from 'assets/images/topBottle.png';
import video1 from 'assets/videos/science_10_11PM_Face.mp4';
import videoGraph from 'assets/videos/Virtual_08_Full_Fluctuation_Graph_Full_Loop_3_EN.mp4';
import video2Transition from 'assets/videos/Virtual_09_01_Apply_PITERA_Face_Transition01_11PMtoDay01.mp4';
import video2Loop from 'assets/videos/Virtual_09_02_Apply_PITERA_Face_Day01_Loop.mp4';
import video3Transition from 'assets/videos/Virtual_09_03_Apply_PITERA_Face_Transition01_Day01toDay07.mp4';
import video3Loop from 'assets/videos/Virtual_09_04_Apply_PITERA_Face_Day07_Loop_alt.mp4';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import Step11 from 'science-expose/11';
import TransitionVideo, {
  TransitionVideoApi,
} from 'science-expose/transition-video';
import { StepProps } from '../common';
import '../Slider.scss';
import styles from './06.module.scss';
gsap.registerPlugin(DrawSVGPlugin);

const firstStep = 1;
const lastStep = 7;

const steps: { [key: number]: boolean } = {
  [firstStep]: true,
  4: true,
  5: true,
  [lastStep]: true,
};

// in seconds
const overlayShowDelayStart = 3;
const overlayShowDelayEnd = 3.3;
const overlayHideDelay = 5;

let overlayTimer: ReturnType<typeof setTimeout>;

function Step6({ onNext }: StepProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(firstStep);
  const [overlayId, setOverlayId] = useState(0);
  const vid4Ref = useRef<TransitionVideoApi>(null);
  const vid5Ref = useRef<TransitionVideoApi>(null);
  const vid7Ref = useRef<TransitionVideoApi>(null);
  const [sliderMoved, setSliderMoved] = useState(false);

  function handleSlide(step: any) {
    setStep(step);
    if(step !== firstStep){
      setSliderMoved(true);
    }
    vid4Ref.current!.stop();
    vid5Ref.current!.stop();
    vid7Ref.current!.stop();
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (step) {
      case 4:
        vid4Ref.current!.replay();
        break;
      case 5:
        vid5Ref.current!.replay();
        break;
      case 7:
        vid7Ref.current!.replay();
        break;
    }
  }

  const handleReplay = useCallback(() => {
    setSliderMoved(false);
    setStep(firstStep);
    hideOverlay();
  }, []);

  function handleTimeUpdate(e: any, step: number, autoclose = true) {
    if (
      e.target.currentTime >= overlayShowDelayStart &&
      e.target.currentTime < overlayShowDelayEnd
    ) {
      showOverlay(step, autoclose);
    }
  }

  function showOverlay(step: number, autoclose = true) {
    setOverlayId(step);
    if (autoclose) {
      overlayTimer = setTimeout(() => {
        hideOverlay();
      }, overlayHideDelay * 1000);
    }
  }

  function hideOverlay() {
    setOverlayId(0);
    clearTimeout(overlayTimer);
  }

  const graphIndicatorStyle = useMemo(() => {
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (step) {
      case 1:
        return {
          left: 0,
        };

      case 4:
        return {
          left: '56%',
        };

      case 5:
        return {
          left: '62%',
        };

      case 7:
        return {
          left: 'calc(99% + 1px)',
        };
    }
  }, [step]);

  const heightBodyBottle = useMemo(() => {
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (step) {
      case 1:
        return {
          height: '52px',
        };

      case 4:
        return {
          height: '32px',
        };

      case 5:
        return {
          height: '26px',
        };

      case 7:
        return {
          height: '12px',
        };
    }
  }, [step]);

  function renderFaceVideo(step: number) {
    function getStyle(visible: boolean) {
      return { opacity: visible ? 1 : 0 };
    }
    return (
      <>
        <video
          className={`blend-bg ${styles.video}`}
          src={video1}
          autoPlay
          loop
          playsInline
          muted
          style={getStyle(step === 1)}
        ></video>

        <div style={getStyle(step === 4)}>
          <TransitionVideo
            className={`blend-bg ${styles.video}`}
            video1={video2Transition}
            video2={video2Loop}
            autoPlay={false}
            onTimeUpdate={(e) => handleTimeUpdate(e, 4)}
            ref={vid4Ref}
          ></TransitionVideo>
        </div>

        <div style={getStyle(step === 5)}>
          <TransitionVideo
            className={`blend-bg ${styles.video}`}
            video1={video3Transition}
            video2={video3Loop}
            autoPlay={false}
            onTimeUpdate={(e) => handleTimeUpdate(e, 5)}
            ref={vid5Ref}
          ></TransitionVideo>
        </div>

        <div style={getStyle(step === 7)}>
          <TransitionVideo
            className={`blend-bg ${styles.video}`}
            video1={video3Transition}
            video2={video3Loop}
            autoPlay={false}
            onTimeUpdate={(e) => handleTimeUpdate(e, 7, false)}
            ref={vid7Ref}
          ></TransitionVideo>
        </div>
      </>
    );
  }

  return (
    <>
      {renderFaceVideo(step)}
      <div className={styles.graph}>
        <div className={styles.graphHeader}>
          <div
            className={`${styles.textBefore} ${
              step === 1 ? styles.textActive : styles.textPassive
            }`}
          >
            <div className={styles.light}>{t('science.06.graph.before.1')}</div>
            <div className={styles.dark}>{t('science.06.graph.before.2')}</div>
          </div>
          <div
            className={`${styles.textAfter} ${
              step > 1 ? styles.textActive : styles.textPassive
            }`}
          >
            <div className={styles.light}>{t('science.06.graph.after.1')}</div>
            <div className={styles.dark}>{t('science.06.graph.after.2')}</div>
          </div>
        </div>
        <div className={styles.graphVideo}>
          <video
            className="blend-bg"
            src={videoGraph}
            autoPlay
            playsInline
            loop
            muted
          ></video>
          <div className={styles.indicator} style={graphIndicatorStyle}></div>
        </div>
        <div className={styles.sliderWrapper}>
          <Slider
            className="slider with-dots"
            value={step}
            min={firstStep}
            max={lastStep}
            step={null}
            marks={steps}
            onChange={handleSlide}
          ></Slider>
          <div className={styles.wrapBottle}>
            <img className={styles.bottle} src={bottle}></img>
            <div className={styles.bottleAnimation}>
              <img className={styles.topBottle} src={topBottle}></img>
              <div className={styles.wrapBody} style={heightBodyBottle}>
                <img className={styles.bodyBottle} src={bodyBottle}></img>
              </div>
            </div>
          </div>
        </div>
        <div style={{ opacity: sliderMoved ? '0' : '1', transition: 'opacity 0.3s' }} className="text">{t('science.06.desc')}</div>
      </div>

      <CSSTransition
        in={overlayId === 4}
        timeout={300}
        unmountOnExit
        classNames="fade"
      >
        <div
          className={`se-popup-overlay full ${styles.overlay}`}
          onClick={hideOverlay}
        >
          <div className="se-popup-body">
            <div className="title2">{t('science.07.title')}</div>
            <div className="text mt-3">{t('science.07.desc')}</div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={overlayId === 5}
        timeout={300}
        unmountOnExit
        classNames="fade"
      >
        <div
          className={`se-popup-overlay full ${styles.overlay}`}
          onClick={hideOverlay}
        >
          <div className="se-popup-body">
            <div className="title2">{t('science.09.title')}</div>
            <div className="text mt-3">{t('science.09.desc')}</div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={overlayId === 7}
        timeout={300}
        unmountOnExit
        classNames="fade"
      >
        <div className={'se-popup-overlay'} style={{ zIndex: '8' }}>
          <Step11 onBack={handleReplay} onNext={onNext}></Step11>
        </div>
      </CSSTransition>
    </>
  );
}

export default Step6;
