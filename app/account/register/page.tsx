import React from "react";
import { RegisterForm } from "./register";

const page = () => {
  return (
    <div className="flex w-full items-center justify-center py-10 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
