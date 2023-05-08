import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addData } from "../redux/actions/index";

const useData = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState({
    category: false,
    data: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading({ ...loading, category: true });
    fetch(
      "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
    )
      .then((res) => res.json())
      .then((json) => {
        setLoading({ ...loading, category: false });
        setCategory(json.items.slice(0, 10));
      })
      .catch(() => {
        setCategory([]);
        setLoading({ ...loading, category: false });
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoading({ ...loading, data: true });
    fetch(
      `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow`
    )
      .then((res) => res.json())
      .then((json) => {
        setLoading({ ...loading, data: false });
        dispatch(addData(json.items));
      })
      .catch(() => {
        dispatch(addData([]));
        setLoading({ ...loading, data: false });
      });
    // eslint-disable-next-line
  }, [category]);

  return { category, loading };
};

export default useData;
