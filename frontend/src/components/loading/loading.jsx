import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        style={{
          borderTopColor: "transparent",
        }}
        className="w-24 h-24 border-4 border-blue-400 border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;