import React, { useEffect, useRef, useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AnimatedHOC from 'components/AnimatedHOC';
import Header from 'components/header';

import {
  products,
  nextProductWhenSwipedLeft,
  nextProductWhenSwipedRight,
  chosenProduct,
  backgroundVideos,
  backToFountain,
} from './constants';
import { ReactComponent as IcPiteraLogo } from 'assets/images/icPiteraLogo.svg';
import { ReactComponent as IcPointingHandWhite } from 'assets/images/icPointingHandWhite.svg';
import icRoom7 from '../assets/images/Room 7.png';
import { ReactComponent as IcArrowRightBlack } from 'assets/images/icArrowRightBlack.svg';
import { ReactComponent as IcFTEACTIVE } from 'assets/images/FTE_ACTIVE.svg';
import { ReactComponent as IcSPCACTIVE } from 'assets/images/SPC_ACTIVE.svg';
import { ReactComponent as IcGAEACTIVE } from 'assets/images/GAE_ACTIVE.svg';
import styles from './PiteraEssentials.module.scss';
import { MainContext } from 'App';

const PiteraEssentials = () => {
  const { hasSeenEssentials } = useContext(MainContext);
  const isChoseProduct = window.localStorage.getItem('chosen_product');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const FTEBackgroundRef = useRef<HTMLVideoElement | null>(null);
  const SPCBackgroundRef = useRef<HTMLVideoElement | null>(null);
  const GAEBackgroundRef = useRef<HTMLVideoElement | null>(null);
  const GotoScienceExposeVideoRef = useRef<HTMLVideoElement | null>(null);
  const FTESwipeLeftVideoRef = useRef<HTMLVideoElement | null>(null);
  const SPCSwipeLeftVideoRef = useRef<HTMLVideoElement | null>(null);
  const GAESwipeLeftVideoRef = useRef<HTMLVideoElement | null>(null);
  const FTESwipeRightVideoRef = useRef<HTMLVideoElement | null>(null);
  const SPCSwipeRightVideoRef = useRef<HTMLVideoElement | null>(null);
  const GAESwipeRightVideoRef = useRef<HTMLVideoElement | null>(null);
  const FTEGoToProductPageVideoRef = useRef<HTMLVideoElement | null>(null);
  const SPCGoToProductPageVideoRef = useRef<HTMLVideoElement | null>(null);
  const GAEGoToProductPageVideoRef = useRef<HTMLVideoElement | null>(null);
  const FTEBackToFountainVideoRef = useRef<HTMLVideoElement | null>(null);
  const SPCBackToFountainVideoRef = useRef<HTMLVideoElement | null>(null);
  const GAEBackToFountainVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isSwippingRunning, setIsSwippingRunning] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<string>(products.FTE);

  const resetVideos = () => {
    if (FTESwipeLeftVideoRef.current)
      FTESwipeLeftVideoRef.current.currentTime = 0;
    if (SPCSwipeLeftVideoRef.current)
      SPCSwipeLeftVideoRef.current.currentTime = 0;
    if (GAESwipeLeftVideoRef.current)
      GAESwipeLeftVideoRef.current.currentTime = 0;
    if (FTESwipeRightVideoRef.current)
      FTESwipeRightVideoRef.current.currentTime = 0;
    if (SPCSwipeRightVideoRef.current)
      SPCSwipeRightVideoRef.current.currentTime = 0;
    if (GAESwipeRightVideoRef.current)
      GAESwipeRightVideoRef.current.currentTime = 0;
    FTESwipeLeftVideoRef?.current?.classList?.remove(styles.background1);
    GAESwipeLeftVideoRef?.current?.classList?.remove(styles.background1);
    SPCSwipeLeftVideoRef?.current?.classList?.remove(styles.background1);
    FTESwipeRightVideoRef?.current?.classList?.remove(styles.background1);
    GAESwipeRightVideoRef?.current?.classList?.remove(styles.background1);
    SPCSwipeRightVideoRef?.current?.classList?.remove(styles.background1);
  };
  const moveBackgroundToSwippingAnimation = (
    prevBackgroundVideo: HTMLVideoElement | null,
    swippingVideo: HTMLVideoElement | null,
    nextBackgroundVideo: HTMLVideoElement | null
  ) => {
    prevBackgroundVideo?.pause();
    swippingVideo?.classList.add(styles.background1);
    swippingVideo?.play();
    prevBackgroundVideo?.classList.remove(styles.background2);
    nextBackgroundVideo?.classList.add(styles.background2);
    nextBackgroundVideo?.play();
  };

  const handleSwipedLeft = () => {
    if (!isSwippingRunning) {
      setIsSwippingRunning(true);
      if (currentProduct === products.FTE) {
        moveBackgroundToSwippingAnimation(
          FTEBackgroundRef.current,
          FTESwipeLeftVideoRef.current,
          SPCBackgroundRef.current
        );
      }
      if (currentProduct === products.SPC) {
        moveBackgroundToSwippingAnimation(
          SPCBackgroundRef.current,
          SPCSwipeLeftVideoRef.current,
          GAEBackgroundRef.current
        );
      }
      if (currentProduct === products.GAE) {
        moveBackgroundToSwippingAnimation(
          GAEBackgroundRef.current,
          GAESwipeLeftVideoRef.current,
          FTEBackgroundRef.current
        );
      }
    }
  };
  const handleEndSwipedLeft = () => {
    setIsSwippingRunning(false);
    setCurrentProduct(nextProductWhenSwipedLeft[currentProduct].product);
    resetVideos();
  };

  const handleSwipedRight = () => {
    if (!isSwippingRunning) {
      setIsSwippingRunning(true);
      if (currentProduct === products.FTE) {
        moveBackgroundToSwippingAnimation(
          FTEBackgroundRef.current,
          FTESwipeRightVideoRef.current,
          GAEBackgroundRef.current
        );
      }
      if (currentProduct === products.SPC) {
        moveBackgroundToSwippingAnimation(
          SPCBackgroundRef.current,
          SPCSwipeRightVideoRef.current,
          FTEBackgroundRef.current
        );
      }
      if (currentProduct === products.GAE) {
        moveBackgroundToSwippingAnimation(
          GAEBackgroundRef.current,
          GAESwipeRightVideoRef.current,
          SPCBackgroundRef.current
        );
      }
    }
  };
  const handleEndSwipedRight = () => {
    setIsSwippingRunning(false);
    setCurrentProduct(nextProductWhenSwipedRight[currentProduct].product);
    resetVideos();
  };

  const handleOnChoose = () => {
    setIsSwippingRunning(true);
    if (currentProduct === products.FTE) {
      FTEGoToProductPageVideoRef?.current?.classList.add(styles.background1);
      FTEGoToProductPageVideoRef?.current?.play();
    }
    if (currentProduct === products.SPC) {
      SPCGoToProductPageVideoRef?.current?.classList.add(styles.background1);
      SPCGoToProductPageVideoRef?.current?.play();
    }
    if (currentProduct === products.GAE) {
      GAEGoToProductPageVideoRef?.current?.classList.add(styles.background1);
      GAEGoToProductPageVideoRef?.current?.play();
    }
  };
  const handleEndChooseProduct = () => {
    window.localStorage.setItem('chosen_product', 'true');
    if (currentProduct === products.FTE) goToFTEPage();
    if (currentProduct === products.SPC) goToSPCPage();
    if (currentProduct === products.GAE) goToGAEPage();
  };

  const goToFTEPage = () => {
    navigate('/essence');
  };
  const goToSPCPage = () => {
    navigate('/cream');
  };
  const goToGAEPage = () => {
    navigate('/genoptics');
  };
  const goToFountain = () => {
    navigate('/welcome');
  };
  const goBack = () => {
    navigate(-1);
  };

  const handleClickBackToFountain = () => {
    setIsSwippingRunning(true);
    if (currentProduct === products.FTE) {
      FTEBackToFountainVideoRef?.current?.classList.add(styles.background1);
      FTEBackToFountainVideoRef?.current?.play();
    }
    if (currentProduct === products.SPC) {
      SPCBackToFountainVideoRef?.current?.classList.add(styles.background1);
      SPCBackToFountainVideoRef?.current?.play();
    }
    if (currentProduct === products.GAE) {
      GAEBackToFountainVideoRef?.current?.classList.add(styles.background1);
      GAEBackToFountainVideoRef?.current?.play();
    }
  };
  const handleEndBackToFountain = () => {
    goToFountain();
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
  });

  return (
    <AnimatedHOC>
      <section {...handlers} className={styles.container}>
        <Header onBack={goBack} isSound />
        {!isSwippingRunning && (
          <>
            <div className={styles.logo}>
              <IcPiteraLogo />
            </div>
            <button
              className={`${styles.fingerButton} 
            ${currentProduct === products.FTE ? styles.fingerButtonFTE : null}
            ${currentProduct === products.SPC ? styles.fingerButtonSPC : null}
            ${currentProduct === products.GAE ? styles.fingerButtonGAE : null}
          `}
              onClick={handleOnChoose}
            >
              <IcPointingHandWhite />
            </button>
            <button
              className={styles.transparentButton}
              onClick={handleOnChoose}
            />
            <p className={styles.text}>
              {currentProduct === products.FTE && (
                <>{t('pitera-essentials.instructionPTE')}</>
              )}
              {currentProduct === products.SPC && (
                <>{t('pitera-essentials.instructionSPC')}</>
              )}
              {currentProduct === products.GAE && (
                <>{t('pitera-essentials.instructionGAE')}</>
              )}
            </p>
            {currentProduct === products.FTE && (
              <IcFTEACTIVE className={styles.navigator} />
            )}
            {currentProduct === products.SPC && (
              <IcSPCACTIVE className={styles.navigator} />
            )}
            {currentProduct === products.GAE && (
              <IcGAEACTIVE className={styles.navigator} />
            )}
            {isChoseProduct && (
              <button
                className={styles.mainButton}
                onClick={handleClickBackToFountain}
              >
                <img src={icRoom7}></img>
                PITERA™ FOUNTAIN
                <IcArrowRightBlack />
              </button>
            )}
          </>
        )}
        {/* background looping animation */}
        <video
          loop
          autoPlay
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background3}`}
          ref={FTEBackgroundRef}
          src={backgroundVideos.FTE}
        />
        <video
          loop
          autoPlay
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background4}`}
          ref={SPCBackgroundRef}
          src={backgroundVideos.SPC}
        />
        <video
          loop
          autoPlay
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background5}`}
          ref={GAEBackgroundRef}
          src={backgroundVideos.GAE}
        />
        {/* swipping left animation */}
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background6}`}
          ref={FTESwipeLeftVideoRef}
          onEnded={handleEndSwipedLeft}
          src={nextProductWhenSwipedLeft.FTE.video}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background7}`}
          ref={SPCSwipeLeftVideoRef}
          onEnded={handleEndSwipedLeft}
          src={nextProductWhenSwipedLeft.SPC.video}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background8}`}
          ref={GAESwipeLeftVideoRef}
          onEnded={handleEndSwipedLeft}
          src={nextProductWhenSwipedLeft.GAE.video}
        />
        {/* swipping right animation */}
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background9}`}
          ref={FTESwipeRightVideoRef}
          onEnded={handleEndSwipedRight}
          src={nextProductWhenSwipedRight.FTE.video}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background10}`}
          ref={SPCSwipeRightVideoRef}
          onEnded={handleEndSwipedRight}
          src={nextProductWhenSwipedRight.SPC.video}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background11}`}
          ref={GAESwipeRightVideoRef}
          onEnded={handleEndSwipedRight}
          src={nextProductWhenSwipedRight.GAE.video}
        />
        {/* click on product animation */}
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background12}`}
          ref={FTEGoToProductPageVideoRef}
          onEnded={handleEndChooseProduct}
          src={chosenProduct.FTE}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background13}`}
          ref={SPCGoToProductPageVideoRef}
          onEnded={handleEndChooseProduct}
          src={chosenProduct.SPC}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background14}`}
          ref={GAEGoToProductPageVideoRef}
          onEnded={handleEndChooseProduct}
          src={chosenProduct.GAE}
        />
        {/* click on Back to Fountain animation */}
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background15}`}
          ref={FTEBackToFountainVideoRef}
          onEnded={handleEndBackToFountain}
          src={backToFountain.FTE}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background16}`}
          ref={SPCBackToFountainVideoRef}
          onEnded={handleEndBackToFountain}
          src={backToFountain.SPC}
        />
        <video
          muted
          controls={false}
          playsInline={true}
          className={`${styles.background} ${styles.background17}`}
          ref={GAEBackToFountainVideoRef}
          onEnded={handleEndBackToFountain}
          src={backToFountain.GAE}
        />
      </section>
    </AnimatedHOC>
  );
};
export default PiteraEssentials;
