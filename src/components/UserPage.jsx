import { useParams } from "react-router-dom";

function UserPage() {

    let urlParams = useParams();

    return (<>
        <h4>This is a user page for: {urlParams.id}!</h4>
        <p>More Functionalities Coming Soon...</p>
    </>);
}
export default UserPage;