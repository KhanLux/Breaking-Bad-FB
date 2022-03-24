import Card from "../Card/index";
import Loader from "../Loader";
import "./index.css"
import PropTypes from "prop-types";

const Cards = ({ characters, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <section className="cards">
      {characters.map((character) => (
        <Card character={character} />
      ))}
    </section>
  );
};
 
Cards.propTypes = {
  characters: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default Cards;
