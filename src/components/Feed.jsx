import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
      console.log("res", res);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  console.log("feed", feed);
  return (
    feed && (
      <div className="flex justify-center my-8">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
