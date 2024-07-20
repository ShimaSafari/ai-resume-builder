import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    <div className="w-screen h-screen">
      <div class="fixed left-0 top-0 -z-10 h-full w-full">
        <div
          class="absolute inset-0 -z-10 h-full w-full bg-white 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
        >
          <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_300px,#C9EBFF,transparent)]"></div>
        </div>
      </div>
      <div className="flex justify-center items-center my-16">
        <SignIn appearance={{
          elements: {
            formButtonPrimary: "bg-gradient-to-r  from-sky-500 to-indigo-500 focus:ring-4 focus:ring-primary-300 transition ease-in-out delay-150",
            logoImage: "h-8"
          },
          layout:{
            logoImageUrl:"/logo.svg",
            logoLinkUrl:""
          }
        }}/>
      </div>
    </div>
  );
}

export default SignInPage;
