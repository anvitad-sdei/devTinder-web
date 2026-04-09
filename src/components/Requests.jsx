import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }
  };
  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    getRequest();
  }, []);
  console.log(request.fromUserId, "res");
  if (!request) return;
  if (request.length === 0) return <h1>No request</h1>;
  return (
    <div>
      <h1>Request</h1>
      {request?.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div className="border 2px red ">
            <img src={photoUrl} alt="photo" />
            <h1>{firstName + " " + lastName}</h1>
            <p>{about}</p>
            <div>
              <button
                className="btn btn-warning"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
