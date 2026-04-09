import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  console.log("age", user);
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Edit PRofile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">FirstName</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">LastName</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </fieldset>{" "}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">PhotoUrl</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center">
            {/* <p className="py-4 text-red-500">{error}</p> */}
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
