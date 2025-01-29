import { useNavigate } from "react-router-dom";

function NotFound() {

    let navit = useNavigate();
    return ( <>
        <h4> 404 - Page Not Found..</h4>
        <br />

        <button onClick={() => {navit("/")}}>Home</button>
        <button onClick={() => {navit(-1)}}>Go Back</button>
    </> );
}

export default NotFound;