import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={".."}>
        <Button variant="outline" className="my-4">
          Back to Home
        </Button>
      </Link>
      <img src="/error404.gif" alt="error-404" className="" />
    </div>
  );
}

export default ErrorPage;
