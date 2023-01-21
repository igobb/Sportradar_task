import React from "react";

const ErrorPage = (props) => {
    return <div className="error">
        {props.errorData ?
            <>
                <h1>Sorry, we have a problem...</h1>
                <p>{props.errorData?.message}</p>
            </>: null
        }
    </div>
}

export default ErrorPage;