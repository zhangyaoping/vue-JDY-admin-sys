import $axios from './axiosSetting';

// const renderToken = (config) => {
//   if (config) {
//     if (config.headers) {
//       config.headers = Object.assign({}, config.headers, headers);
//       return config;
//     } else {
//       return Object.assign({}, config, {headers})
//     }
//   } else {
//     return {headers};
//   }
// }
export const axiosGet = (url, params, config) => $axios.get(url, Object.assign({}, config, {params}));
export const axiosPost = (url, params, config) => $axios.post(url, params, config);

