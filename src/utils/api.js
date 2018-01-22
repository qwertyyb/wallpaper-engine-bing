import axios from 'axios';

const proxy = 'https://bird.ioliu.cn/v2?url=';
export function getImage(idx = 0, n = 1) {
  return axios.get(`${proxy}https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=${n}`)
    .then(res => res.data);
}
export function getImageDetail(date) {
  const params = date ? {
    currentDate: date,
  } : {};
  return axios.get(`${proxy}https://cn.bing.com/cnhp/life`, { params })
    .then(res => res.data);
}
