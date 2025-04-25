import { Link, useNavigate } from "react-router-dom";
import { logoUrl } from "../assets/assets";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-sm px-16">
      <Link to="/" className="flex-1">
        <img src={logoUrl} alt="logo" className="w-44" />
      </Link>
      <div className="flex gap-2">
        {!user && (
          <button
            className="hover:bg-[#9853a0] hover:border-[#9853a0] bg-[#BF5CC9] px-6 text-white py-1.5 rounded-[4px] text-sm cursor-pointer border border-[#BF5CC9]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="avatar" src={user.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" to="/profile">
                  Profile
                </Link>
              </li>

              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
