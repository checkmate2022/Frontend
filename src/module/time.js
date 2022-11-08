import moment from 'moment';

// 현재 시간 이후
export const checkafternow = (date) => {
  var now = new Date();

  var now_text = Number(moment(now).format('YYYYMMDD'));
  var date_text = Number(moment(date).format('YYYYMMDD'));

  if (now_text > date_text) {
    return false;
  } else {
    return true;
  }
};

export const changeEndDateData = (date) => {
  var now = new Date();

  var moment = require('moment');
  var now_y = moment(now).format('YYYY');
  var now_m = moment(now).format('MM');
  var now_d = moment(now).format('DD');
  var now_h = moment(now).format('hh');
  var now_min = moment(now).format('mm');
  var y = moment(date).format('YYYY');
  var m = moment(date).format('MM');
  var d = moment(date).format('DD');
  var h = moment(date).format('hh');
  var min = moment(date).format('mm');
  var yy = y - now_y;

  var res = '';
  if (yy > 0) {
    if (m == now_m) {
      res = '약 ' + yy + '년 ';
    } else if (m > now_m) {
      var mm = m - now_m;
      res = '약 ' + yy + '년 ' + mm + '달';
    } else {
      var mm = 12 - now_m + m;
      res = '약 ' + (yy - 1) + '년 ' + mm + '달';
    }
  } else if (m - now_m > 0) {
    res = '약 ' + (m - now_m) + '달';
  } else if (d - now_d) {
    res = '약 ' + (d - now_d) + '일';
  } else if (h - now_h > 0) {
    res = '약 ' + (h - now_h) + '시간';
  } else {
    res = '약 ' + (min - now_min) + '분';
  }

  return res;
};

// 달력 일 format
export const formatDay = (date) => {
  let fdate = moment(date).format('DD');
  if (fdate[0] === '0') {
    fdate = fdate[1];
  }

  return fdate;
};
