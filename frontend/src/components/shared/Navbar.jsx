import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

const user = false;
function Navbar() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div>
          <h1 className="text-2xl font-bold">Job Portal</h1>
        </div>
        <div className="flex items-center font-medium gap-12">
          <ul className="flex items-center font-medium gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
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
                    <AvatarImage
                      src={"https://www.github.com/shadcn.png"}
                      alt="user"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="min-w-3">
                  <div className="flex gap-4 items-center">
                    <Avatar>
                      <AvatarImage
                        src={"https://www.github.com/shadcn.png"}
                        alt="user"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-medium">Krishna</h2>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />

                      <Button variant="link">View Profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">Logout</Button>
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
