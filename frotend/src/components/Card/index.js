import { Link } from "wouter";
import "./index.css";
import PropTypes from "prop-types";

const Card = ({ character }) => {
  let { img, name, nickname, portrayed, birthday, status } = character;

  return (
    <div className="card">
      <Link to={`/detail/${name.replace(" ", "+")}`}>
        <div className="card-inner">
          <div className="card-front">
            <img src={img} alt="" />
          </div>
          <div className="card-back">
            <h1>{name}</h1>
            <ul>
              <li>
                <strong>Actor Name:</strong> {portrayed}
              </li>
              <li>
                <strong>Nickname:</strong> {nickname}
              </li>
              <li>
                <strong>Birthday:</strong> {birthday}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  character: PropTypes.object.isRequired
};

export default Card;
