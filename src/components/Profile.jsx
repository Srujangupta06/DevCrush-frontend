import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  return (
    user && (
      <div className="py-8 flex flex-col items-center">
        {!isProfileEdit && (
          <div className=" bg-white w-[40%] p-8 rounded-xl shadow-md">
            <div className="flex items-center gap-x-8 mb-4">
              {/*Profile Pic */}
              <img
                src={user.avatar}
                alt="profile pic"
                className="w-28 h-28 rounded-full object-cover "
              />
              <div>
                {/* Name and Email */}
                <h2 className="text-2xl font-semibold text-[#BF5CC9] mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-[#727171] mb-2">{user.email}</p>
                <button
                  className="bg-[#BF5CC9] rounded-[4px] text-white py-1 text-xs px-2 cursor-pointer hover:bg-[#9853a0]"
                  onClick={() => setIsProfileEdit(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
            {/* Bio*/}
            <div className="mb-4">
              <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">Bio</h5>
              <div className="border-[0.5px] border-gray-300 rounded-md p-2  text-[#727171] text-sm">
                <p>{user.bio}</p>
              </div>
            </div>
            {/* Skills Set*/}
            <div className="mb-4">
              <h5 className="text-md font-semibold text-[#BF5CC9] mb-2">
                Skills
              </h5>
              <div className="flex gap-3 flex-wrap">
                {user?.skills
                  ?.toString()
                  ?.split(",")
                  ?.map((eachSkill) => (
                    <span
                      className="bg-[#F8E1F4] text-[#BF5CC9] text-xs rounded-[4px] px-2 py-1.5 "
                      key={eachSkill}
                    >
                      {eachSkill}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* Edit Profile */}
        {isProfileEdit && (
          <EditProfile user={user} setIsProfileEdit={setIsProfileEdit} />
        )}
      </div>
    )
  );
};

export default Profile;
