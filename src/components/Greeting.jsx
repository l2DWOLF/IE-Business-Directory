import { useSelector } from "react-redux";


function Greeting() {
    const user = useSelector((state) => state.user);
    
    return (<div>
    Welcome Back! 
    </div> );

}

export default Greeting;