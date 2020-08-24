import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://46.101.246.71:8000/'
});

instance.interceptors.request.use(
  function(config) {
    const login_data = localStorage.getItem("login_data"); 
    console.log(btoa(login_data))
    if (login_data) {
      config.headers["Authorization"] = 'Basic ' + btoa(login_data);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;