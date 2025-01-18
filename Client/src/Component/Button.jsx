import React from "react";

const Button = ({ Button_text, isInvert = false, icon }) => {
  const baseClasses =
    "flex gap-2 items-center py-2 px-3 border rounded cursor-pointer transition duration-300 ease";

  const lightClasses = !isInvert
    ? "bg-primary text-white border-primary hover:bg-secondary hover:text-primary hover:border-primary"
    : "bg-secondary text-primary border-primary hover:bg-primary hover:text-white hover:border-primary";

  const darkClasses = !isInvert
    ? "dark:hover:bg-white dark:hover:text-primary dark:hover:border-white"
    : "dark:bg-white dark:text-primary dark:border-white dark:hover:bg-primary dark:hover:text-white";

  return (
    <div className={`${baseClasses} ${lightClasses} ${darkClasses}`}>
      {icon}
      <span>{Button_text}</span>
    </div>
  );
};

export default Button;
