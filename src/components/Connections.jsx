import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
      console.log(res.data.data, "res fetch");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections</h1>;
  return (
    <div>
      <h1>Connections</h1>
      {connections?.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="border 2px red ">
            <img src={photoUrl} alt="photo" />
            <h1>{firstName + " " + lastName}</h1>
            <p>{about}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
