import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSllice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div>
          <h1 className="text-2xl font-bold">Job Portal</h1>
        </div>
        <div className="flex items-center font-medium gap-12">
          <ul className="flex items-center font-medium gap-5">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/jobs">
              <li>Jobs</li>
            </Link>
            <Link to="/browse">
              <li>Browse</li>
            </Link>
          </ul>

          {!user ? (
            <>
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant={"outline"}>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#6b38c2cc]">
                    Signup
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="user" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="min-w-3">
                  <div className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="user"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-medium">{user?.fullname}</h2>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />

                      <Button variant="link">
                        {" "}
                        <Link to="/profile"> View Profile </Link>
                      </Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
