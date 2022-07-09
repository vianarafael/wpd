import moment from 'moment';

export const liveStreamTime = {
  LIVESTREAM_DAY_IS_STARTED: '13 July 2022 00:00 GMT +09:00',
  LIVESTREAM_IS_STARTED: '13 July 2022 19:15 GMT +09:00',
  LIVESTREAM_IS_ENDED: '13 July 2022 20:00 GMT +09:00'
}

export const liveStreamStatuses = {
  BEFORE_LIVESTREAM_TIME: 'before livestream time',
  IN_AND_AFTER_LIVESTREAM_TIME: 'in and after livestream time'
};

// export const liveStreamTime = {
//   LIVESTREAM_DAY_IS_STARTED: moment().add(10, 'seconds').valueOf(),
//   LIVESTREAM_IS_STARTED: moment().add(20, 'seconds').valueOf(),
//   LIVESTREAM_IS_ENDED: moment().add(30, 'seconds').valueOf()
// };

export const videoId = 'BUoT4AOtrkw';

export const items = [
  {
    title: 'livestream.item1.title',
    time: 'livestream.item1.time',
    isLive: true,
  },
  {
    title: 'livestream.item2.title',
    time: 'livestream.item2.time',
  },
];

export const youTubeOpt = {
  height: '210',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    modestbranding: 1,
    autoplay: 0,
    controls: 0,
  },
};
