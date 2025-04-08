import { Link } from "react-router-dom";
import "../styles/WelcomeCard.css";

const WelcomeCard = () => {
  return (
    <div className="welcome-container">
      <div className="overlay"></div> {/* затемнение фона */}
      <div className="welcome-content">
        <h1>Welcome!</h1>
        <p className="quote">
          “A true movie lover is distinguished by the way they watch films.” <br /> 
          <span>— Théo, The Dreamers (2003)</span>
        </p>
        <div className="button-container">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
