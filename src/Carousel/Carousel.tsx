import { ReactElement, useState } from 'react';
import s from './Carousel.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Card = {
  header: string;
  text: string;
  footnote?: string;
  img?: string;
  video?: any;
};

type Props = {
  cards: Card[];
  next: () => void;
};

type ItemProps = {
  index: number;
  activeIndex: number;
  children: ReactElement;
};

export const CarouselItem = ({ children, index, activeIndex }: ItemProps) => {
  const style = () => {
    if (index < activeIndex) {
      return `${s.carouselItem} ${s.left}`;
    }
    if (index > activeIndex) {
      return `${s.carouselItem} ${s.right}`;
    }
    return s.carouselItem;
  };
  return <div className={style()}>{children}</div>;
};

const Carousel = ({ cards, next }: Props) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { t, i18n } = useTranslation();

  const isChinese =
    i18n.language === 'zh-CN' ||
    i18n.language === 'zhCN' ||
    i18n.language === 'zh-TW' ||
    i18n.language === 'zhTW';

  let touchStart: number;
  let touchEnd: number;
  const minSwipeDistance = 50;
  const onTouchStart = (e: any) => {
    touchEnd = 0;
    touchStart = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: any) => {
    touchEnd = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: any) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (activeIndex === 2) return;
      setActiveIndex(activeIndex + 1);
    }

    if (isRightSwipe) {
      if (activeIndex === 0) return;
      setActiveIndex(activeIndex - 1);
    }
  };

  const isActive = (index: number) => (index === activeIndex ? s.active : '');

  return (
    <>
      <div className={s.carousel}>
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={s.inner}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {cards.map(({ header, text, footnote, img, video }, index) => (
            <CarouselItem key={index} index={index} activeIndex={activeIndex}>
              <div
                className={`${s.itemContainer} ${isChinese ? s.chinese : ''}`}
              >
                <div>
                  <h3>{header}</h3>
                  <h4>{text} </h4>
                  <h5>{footnote}</h5>
                </div>
                {img && <img className={s.carouselImg} src={img}></img>}
                {video && (
                  <video
                    style={{
                      borderRadius: '20px',
                    }}
                    autoPlay
                    playsInline
                    loop
                    muted
                  >
                    <source src={video} type="video/mp4"></source>
                  </video>
                )}
              </div>
            </CarouselItem>
          ))}
        </div>
      </div>
      <div className={s.indicatorContainer}>
        <div className={`${s.indicator} ${isActive(0)}`}></div>
        <div className={`${s.indicator} ${isActive(1)}`}></div>
        <div className={`${s.indicator} ${isActive(2)}`}></div>
      </div>
      <div className={s.nextButtonContainer}>
        <div onClick={next} className={s.nextButton}>
          <div>{t('essence.04.next')}</div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
