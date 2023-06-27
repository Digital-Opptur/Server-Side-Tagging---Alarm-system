// pages/api/list.js
import axios from 'axios';
import { setCookie } from 'nookies';

export default function handler(req, res) {
  // Check user credentials
  axios.post('http://localhost:3330/check', {url: req.body.url})
  .then(({data}) => {
    console.log(data)
    return res.status(200).json(data);
  })
  .catch(error => {
    return res.status(200).send(error);
  })
}