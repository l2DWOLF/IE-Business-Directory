import { useSelector } from "react-redux";

function Greeting() {
    const user = useSelector((state) => state.user);
    
    return (<div>
    {user.user.isAdmin && !user.user.isBusiness && <>
            <h4>Welcome Back! </h4>
            <p>Your Admin Permissions allows you to view the Sandbox/CRM Page.</p>
        </>
    }

    {user.user.isBusiness && user.user.isAdmin && <>
        <h4>Welcome Back !</h4>
        <p>Your Admin & Business Permissions allows you to view Sandbox/CRM Page, Create/Edit/Delete/Like Business Cards.</p>
    </>}

    {user.user._id != "" && !user.user.isBusiness && !user.user.isAdmin && <>
        <h4>Welcome Back!</h4>
            <p>Your Regular User Permissions allows you to Like and Save Business Cards to Your Liked Cards Page.</p>
    </>}

    {user.user._id == "" && <>
            <h4>Log in or Register to Like or Add your Business Cards to our Directory.</h4>
    </>}
    </div> );
}
export default Greeting;