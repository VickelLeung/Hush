import axios from "axios";

export const userPostFetch = (user) => {
  return (dispatch) => {
    return axios
      .post("https://hushbackend.herokuapp.com/user/register", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        // localStorage.setItem("usertoken", response.data);
        console.log(response.data);
        dispatch(loginUser(response.data));
        // return response.data;
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };
};

export const userLogin = (user) => {
  console.log("inside login");
  return (dispatch) => {
    return axios
      .post("https://hushbackend.herokuapp.com/user/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("usertoken", response.data);
        console.log("Logged");
        console.log(response.data);
        if ("error" in response.data) {
          return "Failure";
        } else {
          dispatch(loginUser(response.data));
          return "Success";
        }
      })
      .catch((err) => {
        console.log("Error " + err);
        return "Failure";
      });
  };
};

export const getProfileFetch = () => {
  //  export const getProfile = user => {
  return (dispatch) => {
    return axios
      .get("https://hushbackend.herokuapp.com/user/profile", {})
      .then((response) => {
        console.log(response);
        dispatch(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // };
  // return dispatch => {
  //   const token = localStorage.token;
  //   if (token) {
  //     return fetch("http://localhost:3000/api/v1/profile", {
  //       method: "GET",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //       .then(resp => resp.json())
  //       .then(data => {
  //         if (data.message) {
  //           // An error will occur if the token is invalid.
  //           // If this happens, you may want to remove the invalid token.
  //           localStorage.removeItem("token")
  //         } else {
  //           dispatch(loginUser(data.user))
  //         }
  //       })
  //   }
  // }
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
