import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="min-h-20">
      <nav className="fixed z-50 top-6 inset-x-4 h-16 bg-white/40 backdrop-blur-md border max-w-screen-lg mx-auto rounded-full shadow-md">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center w-28 mx-3">
            <Link to={"/"}>
              <img src="/logo.svg" alt="logo" />
            </Link>
          </div>
          {isSignedIn ? (
            <div className="flex gap-3 items-center">
              <Link to={"/dashboard"}>
                <Button
                  variant="outline"
                  className="rounded-full text-indigo-900 border-indigo-900/50 hover:border-primary hover:bg-primary hover:text-white"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link to={"/auth/sign-in"}>
              <Button className="rounded-full bg-primary text-white hover:text-indigo-900 hover:border-indigo-900 ">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
