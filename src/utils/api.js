import axios from 'axios';
import moment from 'moment';

const proxy = 'https://bird.ioliu.cn/v2?url=';
export function getImage(idx = 0, n = 1) {
  return axios.get(`${proxy}https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=${n}`)
    .then(res => res.data);
}
export function getImageDetail(offset = 0) {
  const date = moment().subtract(offset, 'days').format('YYYYMMDD');
  const params = {
    currentDate: date,
  };
  return axios.get(`${proxy}https://cn.bing.com/cnhp/life`, { params })
    .then(res => res.data);
}
