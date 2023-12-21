import { Link } from "react-router-dom";
import pp from "../../assets/images/pp.png";
import "./styles.css";
const ProfileIcon = () => {
  return (
    <section>
      <div className="profile-icon">
        <Link to={"/pp"}>
          <img src={pp} alt="Profile Icon" />
        </Link>
      </div>
    </section>
  );
};

export default ProfileIcon;
