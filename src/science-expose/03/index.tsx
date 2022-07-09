import video11PM from 'assets/videos/science_10_11PM_Face.mp4';
import video7AM from 'assets/videos/science_4_7AM_Face.mp4';
import video9AM from 'assets/videos/science_5_9AM_Face.mp4';
import video11AM from 'assets/videos/science_6_11AM_Face.mp4';
import video2PM from 'assets/videos/science_7_2PM_Face.mp4';
import video7PM from 'assets/videos/science_8_7PM_Face.mp4';
import video9PM from 'assets/videos/science_9_9PM_Face.mp4';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import Step4 from '../04';
import { StepProps } from '../common';
import '../Slider.scss';
import styles from './03.module.scss';
gsap.registerPlugin(DrawSVGPlugin);

const videos: { [key: string]: string } = {
  1: video7AM,
  2: video9AM,
  3: video11AM,
  4: video2PM,
  5: video7PM,
  6: video9PM,
  7: video11PM,
};

const firstVideo = 1;
const lastVideo = 7;
const startPourcent = 9;
const pourcentArray = [10, 25.5, 38, 45.5, 56.5, 66, 78];

function Step3({ onNext }: StepProps) {
  const { t } = useTranslation();
  const videoRef = useRef({} as { [id: string]: HTMLVideoElement | null });
  const [videoId, setVideoId] = useState(firstVideo);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [sliderMoved, setSliderMoved] = useState(false);

  const handleSlide = useCallback((videoId: any, isFirstTime = false) => {
    setVideoId(videoId);
    if(videoId !== firstVideo){
      setSliderMoved(true);
    }
    Object.values(videoRef.current).forEach((ref) => {
      ref!.currentTime = 0;
    });
    videoRef.current[videoId]!.play();
    gsap.to('#animatedGraph', {
      drawSVG: `${startPourcent}% ${pourcentArray[videoId - 1]}%`,
      duration: isFirstTime ? 0 : 1,
    });
  }, []);

  const handleReplay = useCallback(() => {
    handleSlide(firstVideo);
    setSliderMoved(false)
    setOverlayVisible(false);
  }, [handleSlide]);

  const handleTimeUpdate = useCallback(
    (e: any) => {
      if (videoId === lastVideo && e.target.currentTime >= 2) {
        setOverlayVisible(true);
      }
    },
    [videoId]
  );

  useEffect(() => {
    handleSlide(firstVideo, true);
  }, [handleSlide]);

  const graphIndicatorStyle = useMemo(() => {
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (videoId) {
      case 1:
        return {
          left: '20px',
        };

      case 2:
        return {
          left: '67px',
        };
      case 3:
        return {
          left: '112px',
        };
      case 4:
        return {
          left: '158px',
        };

      case 5:
        return {
          left: '205px',
        };
      case 6:
        return {
          left: '251px',
        };

      case 7:
        return {
          left: '298px',
        };
    }
  }, [videoId]);

  return (
    <>
      <div className={`${styles.body}`}>
        {Object.entries(videos).map(([idStr, source]) => {
          const id = Number.parseInt(idStr);
          return (
            <video
              key={id}
              className={`blend-bg ${styles.video} ${
                videoId === id ? styles.show : styles.hide
              }`}
              src={source}
              ref={(ref) => (videoRef.current[id] = ref)}
              playsInline
              loop
              muted
              onTimeUpdate={lastVideo === id ? handleTimeUpdate : undefined}
            ></video>
          );
        })}
        <div className={styles.graph}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 332 212"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M43 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <path d="M91 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <path d="M139 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <path d="M187 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <path d="M235 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <path d="M283 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <path d="M331 62V198.43" stroke="#404040" strokeWidth="0.5" />
            <g mask="url(#mask0_5977_28865)">
              <path
                id="animatedGraph"
                d="M-15.8848 189.939C-4.34467 190.046 51.6952 196.553 62.6323 124.322C66.8332 98.4533 71.2722 66.3633 88.8551 66.3633C94.4635 66.3633 101.715 71.1917 112.653 101.081C121.272 124.635 129.318 133.087 143.271 143.875C144.029 144.461 154.4 153.585 168.13 153.585C176.203 153.585 182.857 147.021 185.993 141.866C188.503 137.739 191.018 133.998 194.353 133.998C196.956 133.998 199.854 136.898 201.932 142.369C204.564 149.3 204.15 157.232 209.056 163.965C214.058 170.829 221.036 170.394 222.849 170.159C228.645 169.408 234.216 158.314 241.777 147.152C245.017 142.369 249.387 134.449 251.497 130.77C257.618 120.1 266.866 120.1 269.139 120.1C275.259 120.1 285.34 123.779 289.3 135.921L292.9 147.152C296.3 160.905 305.575 189.939 326.327 189.939C328.793 190.429 488.807 189.939 488.807 189.939"
                stroke="#E7D8D3"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDashoffset="0.001"
                strokeDasharray="0px, 999999px"
              />
            </g>
            <path
              opacity="0.5"
              d="M24.893 60.7611L22.0633 60.7611V57.8021H21.077V60.7611H18.2311V61.7151H21.077L21.077 64.7873H22.0633L22.0633 61.7151H24.893V60.7611Z"
              fill="white"
            />
            <path
              opacity="0.5"
              d="M18.1586 205.226H24.9659V204.288H18.1586V205.226Z"
              fill="white"
            />
            <path
              opacity={videoId === 1 ? 1 : 0.2}
              d="M42.01 28H43.1L46.02 21.47V20.97H41.19V21.9H44.78L42.01 28ZM54.251 28H55.351L52.351 20.97H51.591L48.571 28H49.661L50.271 26.52H53.651L54.251 28ZM51.961 22.41L53.291 25.63H50.621L51.961 22.41ZM66.5267 28L66.2767 20.97H65.6167L62.8367 25.79L60.1367 20.97H59.4667L59.2067 28H60.2267L60.3567 23.07L62.5067 27.01H63.1767L65.3867 23.09L65.5067 28H66.5267Z"
              fill="white"
            />
            <path
              opacity={videoId === 7 ? 1 : 0.2}
              d="M301.032 20.97L298.712 21.89L299.022 22.71L300.652 22.12V28H301.662V20.97H301.032ZM308.045 20.97L305.725 21.89L306.035 22.71L307.665 22.12V28H308.675V20.97H308.045ZM315.949 20.97H313.559V28H314.589V25.83L315.909 25.82C317.559 25.82 318.729 24.96 318.729 23.41C318.729 21.87 317.569 20.97 315.949 20.97ZM315.899 24.9H314.589V21.89H315.899C316.959 21.89 317.659 22.49 317.659 23.4C317.659 24.31 316.969 24.9 315.899 24.9ZM330.175 28L329.925 20.97H329.265L326.485 25.79L323.785 20.97H323.115L322.855 28H323.875L324.005 23.07L326.155 27.01H326.825L329.035 23.09L329.155 28H330.175Z"
              fill="white"
            />
          </svg>
          <div className={styles.indicator} style={graphIndicatorStyle}></div>
          <Slider
            className="slider"
            value={videoId}
            min={1}
            max={7}
            step={null}
            marks={videos}
            onChange={handleSlide}
          />
        </div>
        <div style={{ opacity: sliderMoved ? '0' : '1' }} className={styles.sliderDesc}>{t('science.03.desc')}</div>
      </div>
      <CSSTransition
        in={overlayVisible}
        timeout={300}
        unmountOnExit
        classNames="fade"
      >
        <div className="se-popup-overlay" style={{ zIndex: '8' }}>
          <Step4 onNext={onNext} onBack={handleReplay}></Step4>
        </div>
      </CSSTransition>
    </>
  );
}

export default Step3;
