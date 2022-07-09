import s from './Progress.module.scss';
export default function Progress({
  activeIndex,
  years,
}: {
  activeIndex: number;
  years: string[];
}) {
  const finished = activeIndex === years.length;
  return (
    <div
      className={s.timeline}
      style={{ opacity: finished ? '0' : '1', transition: 'opacity 0.5s' }}
    >
      <div
        className={s.inner}
        style={{ transform: `translateX(-${activeIndex * 25}%)` }}
      >
        {years.map((point, i) => (
          <div
            key={point}
            className={`${s.container} ${
              activeIndex === i ? s.active : s.inactive
            }`}
          >
            <div className={s.box}>
              <h4 className={s.year}>{point}</h4>
              <div className={s.outerCircle}>
                <div
                  className={s.innerCircle}
                  style={{
                    backgroundColor: activeIndex >= i ? 'red' : 'white',
                    opacity:
                      i - 2 === activeIndex || i + 2 === activeIndex ? 0 : 1,
                  }}
                >
                  <div className={s.fraction}>{i + 1}/9</div>
                </div>
              </div>
              <div
                className={s.conContainer}
                style={{ opacity: i === 8 ? 0 : 1 }}
              >
                <div
                  className={s.connector}
                  style={{ width: activeIndex > i ? '100%' : '0' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
