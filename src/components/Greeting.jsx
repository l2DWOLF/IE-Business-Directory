import { useSelector } from "react-redux";


function Greeting() {
    const user = useSelector((state) => state.user);
    
    return (<div>
    {user.user.isAdmin && <>
            <h4>Welcome Back Admin </h4>
            <h5>User Info: {user.user._id}</h5>
            <button>Add Business Cards</button>
            <button>Delete Business Cards</button>
        </>
    }

    {user.user.isBusiness && !user.user.isAdmin && <>
        <h4>Welcome Back Business User</h4>
        <button>View Cards</button>
        <button>Create Business Card</button>
    </>}

    {user.user._id != "" && !user.user.isBusiness && !user.user.isAdmin && <>
        <h4>Welcome Back User</h4>
        <button>View Cards</button>
    </>}

    {user.user._id == "" && <>
            <h4>Log in or register to like and create business cards.</h4>
    </>}
    </div> );

}

export default Greeting;