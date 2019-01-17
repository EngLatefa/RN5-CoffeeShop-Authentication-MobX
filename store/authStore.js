import { decorate, observable, action, computed } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";

const instance = axios.create({
  baseURL: "http://coffee.q8fawazo.me/api"
});

class authStore {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
  }

  loginUser(userData, navigation) {
    instance
      .post("/login/", userData)
      .then(res => res.data)
      .then(user => {
        this.setAuthToken(user.token);
        navigation.replace("CoffeeList");
      })
      .catch(err => console.error(err.response));
  }

  registerUser(userData, navigation) {
    console.log(userData);
    instance
      .post("/register/", userData)
      .then(res => res.data)
      .then(user => {
        console.log("signup");
        this.loginUser(userData, navigation);
      })
      .catch(err => console.log(err.response.data));
  }

  setAuthToken(token) {
    if (token) {
      return AsyncStorage.setItem("Token", token).then(() => {
        axios.defaults.headers.common.Authorization = `jwt ${token}`;
        const decodedUser = jwt_decode(token);
        this.user = decodedUser;
      });
    } else {
      return AsyncStorage.removeItem("Token").then(
        delete axios.defaults.headers.common.Authorization
      );
    }
  }

  checkForToken() {
    return AsyncStorage.getItem("Token").then(token => {
      const user = jwt_decode(token);
      if (user.exp > Date.now() / 1000) {
        this.setAuthToken(user.token);
      } else {
        this.logoutUser();
      }
    });
  }

  logoutUser() {
    this.user = null;
    this.setAuthToken();
  }
}
decorate(AuthStore, {
  user: observable
});
const AuthStore = new authStore();
AuthStore.checkForToken();
export default AuthStore;
