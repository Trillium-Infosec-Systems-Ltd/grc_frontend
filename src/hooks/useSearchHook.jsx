import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../utils/utils";
import { setUserQuery } from "../features/user/userSlice";

const useSearchHook = () => {
  const DEBOUNCE_DELAY_MS = 400;
  const dispatch = useDispatch();
  const { userQuery } = useSelector((state) => state.session);

  const [queryText, setQueryText] = useState(userQuery);

  useEffect(() => {
    setQueryText(userQuery);
  }, [userQuery]);

  const debouncedDispatch = useCallback(
    debounce((val) => {
      dispatch(setUserQuery(val));
    }, DEBOUNCE_DELAY_MS),
    [dispatch]
  );

  const onSearch = (e) => {
    const value = e.target.value;
    setQueryText(value);
    debouncedDispatch(value);
  };

  return { queryText, onSearch };
};

export default useSearchHook;
