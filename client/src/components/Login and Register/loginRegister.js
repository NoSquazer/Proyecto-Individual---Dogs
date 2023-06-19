import axios from "axios";
import store from "../../redux/store";
import { login, register } from "../../redux/actions";

const loginRegister = async (userData, loginOrRegister) => {
  try {
    if (loginOrRegister) {
      const { data } = await axios.post(
        "http://localhost:3001/dogs/users/login",
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }
      );

      store.dispatch(login(data.accessToken, data.userId));

      return { status: 200, message: data.message, access: true };
    } else {
      const { data } = await axios.post(
        "http://localhost:3001/dogs/users/register",
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }
      );

      store.dispatch(register(data.accessToken, data.userId));

      return { status: 201, message: data.message, access: true };
    }
  } catch ({ request, response }) {
    switch (request.status) {
      case 400:
        return { status: request.status, message: response.data.error };
      case 404:
        return { status: request.status, message: response.data.error };
      case 409:
        return { status: request.status, message: response.data.error };
      default:
        return console.log(response.data.error);
    }
  }
};

export default loginRegister;
