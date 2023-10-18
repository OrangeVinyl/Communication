import React from "react";

type Prop = {
    children: React.ReactNode
}

const AuthLayout = ({children}: Prop) => {
    return (
        <div className={"h-full flex items-center justify-center"}>
            {children}
        </div>
    );
};

export default AuthLayout;