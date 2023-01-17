import React from "react";
import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <div>
            <h1>ERROR! Page not found!</h1>
                <h2><Link to="/">Return to home page</Link></h2>
        </div>
    );
}

export default ErrorPage;
