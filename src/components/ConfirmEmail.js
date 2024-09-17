import { useParams } from "react-router-dom";

function ConfirmEmail(props) {
  const { token } = useParams();    

    console.log(token);
}


export default ConfirmEmail;