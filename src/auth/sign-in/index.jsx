import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex justify-center py-4">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-800 hover:bg-blue-900 text-white border-blue-800",
              logoImage: "h-7",
            },
            layout: {
              logoImageUrl: "/logo.svg",
              logoLinkUrl: "/",
            },
          }}
        />
      </div>
    </div>
  );
}

export default SignInPage;
