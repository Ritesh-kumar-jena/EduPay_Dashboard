import React from "react";

import {useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate=useNavigate()
  return (
    <div className="text-center">
      <h1 className="mb-2  dark:text-white">
        404 - Page Not Found
      </h1>
      <p mb-2  dark:text-white>Oops! The page you’re looking for does not exist.</p>
      <button
      className="mb-2  dark:text-white dark:bg-slate-500 bg-teal-200"
       onClick={()=>navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFoundPage;
