import particule from 'assets/images/button/particule.png';
import wave from 'assets/images/button/wave.png';
import halo from 'assets/images/button/halo.png';

import gsap from 'gsap';
import './button.scss';
import { useEffect } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: any;
  isPlay: any;
}

function initParticules() {
  const PARTICULE_COUNT = 30;

  const particuleContainer = document.querySelector(
    '.cta__particule-container'
  );
  const particuleImg = document.querySelector('.cta__particule');
  for (let i = 0; i < PARTICULE_COUNT; i++) {
    if (particuleImg && particuleContainer) {
      const clone = particuleImg.cloneNode(true);
      particuleContainer.appendChild(clone);
    }
  }
}

function initTimeline() {
  const masterTL = gsap.timeline({
    repeat: 0,
    repeatDelay: 2,
    paused: true,
    ease: 'power1.out',
  });
  masterTL
    .addLabel('start', 0)
    .to(
      '.cta__wave',
      { duration: 2, force3D: false, yPercent: -100, ease: 'none' },
      'start'
    )
    .to(
      '.cta__wave',
      { duration: 3, force3D: false, xPercent: 100, x: '-160px', ease: 'none' },
      'start'
    )
    .to('.cta', { duration: 3, color: '#000' }, 'start+=1')

    .addLabel('show_halo', 1.7)
    .to(
      '.cta',
      { duration: 2, boxShadow: '0px 0px 30px #FFF', ease: 'power2.out' },
      'show_halo'
    )
    .fromTo(
      '.cta__halo',
      { opacity: 0 },
      { duration: 1, opacity: 1, ease: 'power2.out' },
      'show_halo'
    )
    .addLabel('hide_halo', 'show_halo+=1')
    .to(
      '.cta__halo',
      { duration: 1, opacity: 0, ease: 'power1.in' },
      'hide_halo'
    )
    .to('.cta', { duration: 1, boxShadow: '0px 0px 0px #FFF' }, 'hide_halo');

  const particuleTL = initParticuleTimeline();

  masterTL.addLabel('particule', 1.3).add(particuleTL, 'particule');

  return masterTL;
}

function initParticuleTimeline() {
  const PARTICULE_STAGGER = 0.05;
  const timeline = gsap.timeline();
  timeline.addLabel('start_particules', 0);
  const particules = document.querySelectorAll('.cta__particule');

  particules.forEach((particule, index) => {
    const duration = 1 + randomInteger(0, 9) / 10;
    const x = randomInteger(-100, 100);
    const y = randomInteger(-100, 100);
    const opacity = randomInteger(1, 9) / 10;
    const scale = randomInteger(0, 9) / 10;

    const staggeredTime = index * PARTICULE_STAGGER;
    timeline.to(
      particule,
      {
        duration: duration,
        x: x,
        y: y,
        scale: scale,
        immediateRender: false,
      },
      'start_particules+=' + staggeredTime
    );

    const showParticule = staggeredTime + 0.2;
    const hideParticule = showParticule + duration / 2;

    timeline.to(
      particule,
      { opacity: opacity, duration: duration / 2 },
      'start_particules+=' + showParticule
    );
    timeline.to(
      particule,
      { opacity: 0, duration: duration / 3 },
      'start_particules+=' + hideParticule
    );
  });

  return timeline;
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ButtonApplyPITERA({ className, onClick, isPlay }: Props) {
  useEffect(() => {
    if (isPlay) {
      initParticules();
      const masterTL = initTimeline();
      masterTL.play();
    }
  }, [isPlay]);
  return (
    <div className="cta" onClick={onClick}>
      <div className="cta__particule-container">
        <img className="cta__particule" src={particule} />
      </div>
      <div className="cta__content">
        <img className="cta__wave" src={wave} />
        <span className="cta__copy">APPLY PITERA™</span>
      </div>
      <img className="cta__halo" src={halo} />
    </div>
  );
}

export default ButtonApplyPITERA;
