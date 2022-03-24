import React from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};


const Rating = ({ data }) => {
  const { comment, rating, user_info } = data;
  const stars = Array(5).fill(0);

  return (
    <div className="mt-3 border border-white">
      <div className="container mt-3">
        <label htmlFor="">Usuario</label>
        <p>{user_info}</p>
      </div>
      <div className="container">
        <label htmlFor="">Comentario</label>
        <p>{comment}</p>
      </div>
      <div className="container mb-3">
        <label htmlFor="">Calificacion</label>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                name="rating"
                size={24}
                color={
                  (rating) > index
                    ? colors.orange
                    : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

Rating.propTypes = {
  data: PropTypes.object.isRequired
}

export default Rating;
