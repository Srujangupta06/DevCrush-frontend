import { SlDislike } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ userInfo }) => {
  const { avatar, firstName, lastName, bio } = userInfo;
  const [isInterested, setIsInterested] = useState("false");
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userInfo._id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
    }
  };
  return (
    <div className="card bg-base-100 w-[80%] md:w-80 shadow-lg">
      <figure className="px-10 pt-10">
        <img
          src={avatar}
          alt="profile pic"
          className="w-40 h-40 rounded-full object-cover shadow"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[#BF5CC9] text-xl font-semibold tracking-wide">
          {firstName + " " + lastName}
        </h2>
        <p className="text-[#727171] italic text-sm mt-1">"{bio}"</p>
        <div className="divider my-2" />
        <div className="card-actions gap-6 mt-2">
          <button
            className="cursor-pointer"
            data-tooltip-id="feed-ignore-tooltip"
            data-tooltip-content={"Ignore"}
            onClick={() => {
              handleSendRequest("ignored", userInfo._id);
            }}
          >
            <SlDislike className="text-xl text-gray-500 " />
          </button>
          <Tooltip id="feed-ignore-tooltip" place="bottom" />
          <button
            className="cursor-pointer"
            data-tooltip-id="feed-interested-tooltip"
            data-tooltip-content={"Interested"}
            onClick={() => setIsInterested(!isInterested)}
          >
            <FaRegHeart
              className="text-xl text-[#727171]"
              onClick={() => {
                handleSendRequest("interested", userInfo._id);
              }}
            />
          </button>
          <Tooltip id="feed-interested-tooltip" place="bottom" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
