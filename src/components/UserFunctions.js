import axios from "axios";

export const register = newUser => {
  return axios
    .post("https://hushbackend.herokuapp.com/user/register", {
      displayName: newUser.displayName,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      //   console.log("registered");
      //   console.log(newUser);
      //   console.log(res);
      return res;
    });
};

export const login = user => {
  return axios
    .post("https://hushbackend.herokuapp.com/user/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log("Error " + err);
    });
};

export const getProfile = user => {
  return axios
    .get("https://hushbackend.herokuapp.com/user/profile", {})
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};