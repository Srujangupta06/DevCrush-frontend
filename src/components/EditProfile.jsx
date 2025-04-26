import { useState, useRef } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
const EditProfile = ({ user, setIsProfileEdit }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [email, setemail] = useState(user.email);
  const [skills, setSkills] = useState(user.skills);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const onHandleSaveChanges = (e) => {
    e.preventDefault();
    // Check the new Data is same as prev data or not
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("skills", skills);
    formData.append("bio", bio);
    formData.append("age", age);
    formData.append("gender", gender);

    editProfile(formData);
  };
  const editProfile = async (formData) => {
    const loadingId = toast.loading(
      "Please Wait while we make changes for you"
    );
    try {
      const response = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });

      dispatch(addUser(response?.data?.updatedData));
      toast.success(response?.data?.message, {
        style: {
          minWidth: "450px",
        },
        duration: 3000,
        id: loadingId,
      });
      setIsProfileEdit(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong", {
        id: loadingId,
      });
    }
  };
  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };
  return (
    <div className="w-[45%] mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4 text-[#BF5CC9]">
        Edit Profile
      </h2>

      <form
        className="w-full bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6"
        onSubmit={onHandleSaveChanges}
      >
        {/*User Profile Picture */}
        <div className="relative w-40 h-40 mx-auto rounded-full shadow-md border border-gray-200">
          {avatar ? (
            typeof avatar === "string" ? (
              // If avatar is string URL, show directly
              <img
                src={avatar}
                alt="profile pic"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              // If avatar is a file object, create object URL
              <img
                src={URL.createObjectURL(avatar)}
                alt="profile pic"
                className="w-full h-full rounded-full object-cover"
              />
            )
          ) : (
            // If no avatar, show initials
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h1 className="text-3xl font-semibold text-gray-700">
                {firstName[0]} {lastName[0]}
              </h1>
            </div>
          )}

          {/* Camera icon for uploading */}
          <div className=" absolute bottom-5 right-[5px]  flex flex-col items-center justify-center p-1 rounded-full bg-white/50 border border-gray-300">
            <MdCameraAlt
              className="text-[#727171] cursor-pointer text-xl "
              onClick={handleIconClick}
              data-tooltip-id="profile-pic-tooltip"
              data-tooltip-content={"Change Profile Picture"}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden outline-none"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
            <Tooltip id="profile-pic-tooltip" place="top" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              placeholder="First Name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              placeholder="Last Name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            disabled={true}
            placeholder="you@example.com"
            className="cursor-not-allowed w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Skills (comma separated)
          </label>
          <input
            id="skills"
            type="text"
            value={skills}
            onChange={(e) => {
              setSkills(e.target.value);
            }}
            placeholder="React, MongoDB, UI Design"
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows="3"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
            placeholder="A short bio about yourself..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-400"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="age"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              id="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="number"
              placeholder="Enter your age"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="gender"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              id="gender"
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className={`cursor-pointer w-1/2 py-2 px-4 rounded-md text-sm font-medium transition duration-200 bg-[#BF5CC9] text-white hover:bg-[#9853a0] hover:border-[#9853a0] border border-[#BF5CC9]`}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsProfileEdit(false)}
            className={`cursor-pointer grow py-2 px-4 rounded-md text-sm font-medium transition duration-200 bg-white border border-[#BF5CC9] text-[#BF5CC9] hover:bg-white/50 hover:border-[#9853a0] `}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
