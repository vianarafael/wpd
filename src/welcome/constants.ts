import moment from 'moment';

export const liveStreamTime = {
  LIVESTREAM_DAY_IS_STARTED: '13 July 2022 00:00 GMT +09:00',
  LIVESTREAM_IS_STARTED: '13 July 2022 19:15 GMT +09:00',
  LIVESTREAM_IS_ENDED: '13 July 2022 20:00 GMT +09:00'
}

export const liveStreamStatuses = {
  BEFORE_LIVESTREAM_DAY: 'before livestream day',
  BEFORE_LIVESTREAM_TIME_BUT_IN_LIVESTREAM_DAY: 'before livestream time',
  IN_LIVESTREAM_TIME: 'in livestream time',
  AFTER_LIVESTREAM_TIME: 'after livestream time'
};

// export const liveStreamTime = {
//   LIVESTREAM_DAY_IS_STARTED: moment().add(10, 'seconds').valueOf(),
//   LIVESTREAM_IS_STARTED: moment().add(20, 'seconds').valueOf(),
//   LIVESTREAM_IS_ENDED: moment().add(30, 'seconds').valueOf()
// };
