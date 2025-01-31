import { useNavigate } from "react-router-dom";

function NotFound() {

    let navit = useNavigate();
    return ( <>
        <h2> 404 - Page Doesn't Exist..</h2>
        <br />

        <button onClick={() => {navit("/")}}>Home</button>
        <button onClick={() => {navit(-1)}}>Go Back</button>
    </> );
}
export default NotFound;