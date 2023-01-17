import React from "react";
import {Link} from "react-router-dom";

import './ErrorPage.css'

function ErrorPage() {
    return (
        <div className="error__container">
            <div className='error__link-wrapper'>
                <Link className="match-info__link" to="/"><button className='match-info__link-button'>Return to home page</button></Link>
            </div>
            <h1>ERROR! Page not found!</h1>
        </div>
    );
}

export default ErrorPage;
