import axios from 'axios';
import moment from 'moment';

const apiRoot = 'https://proxy.bing.com/cn.bing.com';

export function getImage(idx = 0, n = 1) {
  return axios.get(`${apiRoot}/HPImageArchive.aspx?format=js&idx=${idx}&n=${n}`)
    .then(res => res.data);
}
export function getImageDetail(offset = 0) {
  const date = moment().subtract(offset, 'days').format('YYYYMMDD');
  const params = {
    currentDate: date,
  };
  return axios.get(`${apiRoot}/cnhp/life`, { params })
    .then(res => res.data);
}
