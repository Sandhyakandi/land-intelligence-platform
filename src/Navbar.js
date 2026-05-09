import { Link } from "react-router-dom";
import i18n from "./i18n";

export default function Navbar() {

        
  return (
    <div style={{ padding: 15, borderBottom: "1px solid #ddd" }}>
      <b>Land Pricing Platform</b> |
      <Link to="/"> Map </Link> |
      <Link to="/submit"> Submit </Link> |
      <Link to="/history"> History </Link> |
      <Link to="/moderation"> Moderation </Link>



    </div>
  );
}
