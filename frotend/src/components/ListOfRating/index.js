import { useFetch } from "../../hooks/useFetch";
import Rating from "../Rating/index";
import PropTypes from "prop-types";

const ListOfRatings = ({ id }) => {
  const { data, loading } = useFetch(`http://localhost:9000/api/ratings/${id}`);

  return (
    <div className="col-6" style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowY: "auto"
    }}>
      <div className="card col-9">
        <div className="card-body">
          <h2 className="card-title mb-5" style={{ color: "white", textAlign: "center" }}>
            Valoraciones
          </h2>
          {data.length > 0 ? (
            data.map((el) => <Rating data={el} />)
          ) : (
            <p>Sin valoraciones</p>
          )}
        </div>
      </div>
    </div>
  );
};

ListOfRatings.propTypes = {
  id: PropTypes.number.isRequired
}

export default ListOfRatings;
