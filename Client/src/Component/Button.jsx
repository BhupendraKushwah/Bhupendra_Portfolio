import React, { useEffect } from "react";

const Button = ({ Button_text, isInvert = false, icon }) => {
    return (
        !isInvert ?
            <div className="flex gap-2 items-center bg-primary text-white py-2 px-3 border border-primary rounded cursor-pointer hover:bg-secondary transition duration-300 ease hover:text-primary hover:border-primary">
                {icon}
                <span className="">{Button_text}</span>
            </div>

            :
            <div className="flex gap-2 items-center bg-secondary text-primary py-2 px-3 border border-primary rounded cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition duration-300 ease">
                {icon}
                <span>{Button_text}</span>
            </div>
    )
}

export default Button;