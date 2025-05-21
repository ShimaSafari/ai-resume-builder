import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="h-14 bg-white/40 border border-t-1 max-w-full mx-auto flex items-center justify-center gap-4 px-4">
      <span className="text-gray-700 text-sm font-medium">
        &copy; {new Date().getFullYear()} All rights reserved.
      </span>
      <span className="text-gray-700 text-sm font-medium">
        Made with
        <Heart className="mx-1 h-4 w-4 text-pink-400 fill-pink-400 inline" />
        Shima Safari
      </span>
    </footer>
  );
};

export default Footer;
