import React from "react";
import ListOfRatings from "../ListOfRating/index";
import StartRating from "../StartRating/index";
import PropTypes from "prop-types";

const Quote = ({ data }) => {
  const { quote_id, quote, author } = data;

  return (
    <div className="row">
      <div
        className="col-6"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="card-main col-9">
          <h2>Breaking Bad Frases</h2>
          <p className="card-text mt-2">{quote}</p>
          <p>- {author} -</p>
        </div>
        <StartRating data={data} />
      </div>
      <ListOfRatings id={quote_id} />
    </div>
  );
};

Quote.propTypes = {
  data: PropTypes.object.isRequired
}

export default Quote;
