import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something Went Wrong");
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-lg text-[#727171]">You have no Connections</h1>
      </div>
    );
  }

  return (
    connections &&
    user && (
      <div className="px-16 py-4 min-h-[80vh]">
        <h1 className="text-xl text-[#727171] my-4 text-center">
          {user.firstName} you have{" "}
          <span className="text-[#BF5CC9] font-semibold">
            {connections.length}
          </span>{" "}
          {connections.length === 1 ? "Connection" : "Connections"}
        </h1>
        <ul className="flex flex-wrap gap-y-4 mt-8 flex-col items-center">
          {connections.map((eachConnection) => {
            const { avatar, firstName, lastName, _id, gender, age, bio } =
              eachConnection;
            return (
              <li
                className="flex gap-x-6 w-[50%] shadow-md p-6 rounded-sm bg-white/50"
                key={_id}
              >
                <img
                  src={avatar}
                  alt="profile pic"
                  className="w-18 h-18 rounded-full object-cover shadow-md"
                />
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-[#BF5CC9] font-[600] ">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-[#727171]">
                    {age && <span className="text-[#727171]">{age}</span>},{" "}
                    {gender[0].toUpperCase() + gender.slice(1).toLowerCase()}
                  </p>
                  <p className="text-[#727171] text-sm italic">{bio}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default Connections;
