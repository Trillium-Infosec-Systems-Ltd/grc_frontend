import { useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { logout, setUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routesConstants";
import { message } from "antd";

const useAuthHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoaing] = useState(false);

  const loginUser = async (data) => {
    setIsLoaing(true);

    let payload = {
      ...APIS.POST_AUTH,
      URL: APIS.POST_AUTH.URL + "login",
    };

    payload.PAYLOAD = data ?? {};

    let result = await callApi(payload);
    const { status, data: respData } = result ?? {};

    if (status === 200) {
      dispatch(
        setUser({ ...respData, remember_me: data?.remember_me ?? false })
      );
      navigate(ROUTES.PRIVATE.ROOT);
      setIsLoaing(false);
    }
    setIsLoaing(false);
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate(ROUTES.PUBLIC.ROOT);

    // window.location.href = ROUTES.PUBLIC.ROOT;
  };

  return { isLoading, login: loginUser, logout: logoutUser };
};

export default useAuthHook;
