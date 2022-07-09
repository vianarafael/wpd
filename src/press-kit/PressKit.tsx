import logo from '../assets/images/logo-black.png';
import { useTranslation } from 'react-i18next';
// import { isInChina } from '../utils';
import { useNavigate } from 'react-router-dom';
import dropBG from '../assets/images/drop.png';
import flythrough from '../assets/videos/flythrough-PK.mp4';
import drop from '../assets/images/press-kit/drop.png';
import red from '../assets/images/press-kit/red.png';
import face from '../assets/images/press-kit/face.png';
import product from '../assets/images/press-kit/product.png';
import s from './PressKit.module.scss';

export default function PressKit() {
  const navigate = useNavigate();
  const returnToFront = () => navigate(-1);

  const { t, i18n } = useTranslation('', { keyPrefix: 'press-kit' });

  //   const isChinese =
  //     i18n.language === 'zh-CN' ||
  //     i18n.language === 'zhCN' ||
  //     i18n.language === 'zh-TW' ||
  //     i18n.language === 'zhTW';

  const downloads = [
    { video: flythrough, background: drop },
    { video: flythrough, background: face },
    { video: flythrough, background: red },
    { video: flythrough, background: product },
  ].map(({ video, background }, i) => ({
    title: t(`${i}.title`),
    subtitle: t(`${i}.subtitle`),
    footnote: t(`${i}.footnote`),
    video,
    background,
  }));

  const download = (num?: number) => {
    if (num !== undefined) {
      console.log('download ', num);
      return;
    }
    console.log('download all');
  };

  return (
    <div
      className={s.body}
      style={{ backgroundImage: `url(${dropBG})`, fontFamily: 'Trenda' }}
    >
      <div className={s.header}>
        <div className={s.backContainer} onClick={returnToFront}>
          <div className={s.backTop}></div>
          <div className={s.backBottom}></div>
        </div>
        <div className={s.logoBox}>
          <img src={logo} className={s.logo}></img>
          <h2>&nbsp;{t('header')}</h2>
        </div>
      </div>
      <h1 className={s.wpd}>{t('title')}</h1>
      <h2 className={s.downloadMsg}>{t('subtitle')}</h2>
      <div className={s.button}>
        <div
          onClick={() => {
            console.log('downloadAll');
          }}
        >
          {t('downloadButton')}
        </div>
      </div>
      {downloads.map((data, i) => (
        <DownloadBox key={i} data={data} i={i} />
      ))}
    </div>
  );
}

type Props = {
  data: {
    title: string;
    subtitle: string;
    footnote: string | null;
    video: string;
    background: string;
  };
  i: number;
};

function DownloadBox({
  data: { title, subtitle, footnote, video, background },
  i,
}: Props) {
  const hasFootnote = !!footnote;
  return (
    <div
      className={s.downloadBox}
      style={{
        backgroundImage: `${
          i === 0 || i === 3
            ? 'linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)), '
            : ''
        } url(${background})`,
      }}
    >
      <div className={s.container}>
        <h3 className={s.downloadText}>VIDEO / 2min, 324MB</h3>
        <h2 className={s.title}>{title}</h2>
        <h4 className={`${s.desc} ${hasFootnote ? s.hasFootnote : ''}`}>
          {subtitle}
        </h4>
        {hasFootnote && <h4 className={s.footnote}>{footnote}</h4>}
      </div>
      <div className={s.downloadButton}>
        <a download href={video}>
          <DownArrow />
        </a>
      </div>
    </div>
  );
}

function DownArrow() {
  return (
    <div className={s.arrow}>
      <div className={s.lArrow}></div>
      <div className={s.mArrow}></div>
    </div>
  );
}
