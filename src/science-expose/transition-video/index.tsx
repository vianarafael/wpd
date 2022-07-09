import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import styles from './TransitionVideo.module.scss';
interface Props extends React.HTMLProps<HTMLVideoElement> {
  video1: string;
  video2: string;
}

export interface TransitionVideoApi {
  replay: () => void;
  stop: () => void;
}

const TransitionVideo = forwardRef((props: Props, ref: any) => {
  const { video1, video2, autoPlay, className, onTimeUpdate } = props;
  const [transitionDone, setTransitionDone] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => {
    const api: TransitionVideoApi = {
      replay() {
        video1Ref.current!.currentTime = 0;
        video2Ref.current!.currentTime = 0;
        video1Ref.current!.play();
        video2Ref.current!.play();
        setTransitionDone(false);
      },
      stop() {
        video1Ref.current!.currentTime = 0;
        video2Ref.current!.currentTime = 0;
        video1Ref.current!.pause();
        video2Ref.current!.pause();
        setTransitionDone(false);
      },
    };
    return api;
  });

  const handleEnded = useCallback(() => {
    setTransitionDone(true);
    video2Ref.current!.play();
  }, [video2Ref]);

  return (
    <>
      <video
        className={`${styles.video} ${className} ${
          !transitionDone ? styles.show : styles.hide
        }`}
        src={video1}
        ref={video1Ref}
        autoPlay={autoPlay}
        playsInline
        muted
        onTimeUpdate={onTimeUpdate}
        onEnded={handleEnded}
      ></video>
      <video
        className={`${styles.video} ${className} ${
          transitionDone ? styles.show : styles.hide
        }`}
        src={video2}
        ref={video2Ref}
        playsInline
        loop
        muted
      ></video>
    </>
  );
});

export default TransitionVideo;
