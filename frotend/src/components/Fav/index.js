import React from "react";
import Swal from "sweetalert2";
import { helpHttp } from "../../helpers/helpHttp";
import PropTypes from "prop-types";

const Fav = ({ data }) => {
  const { quote_author, quote_info, id } = data;

  const handleSubmit = (e) => {
    e.preventDefault();

    helpHttp()
      .del(`http://localhost:9000/api/favs/${id}`)
      .then((resp) => {
        if (resp.status === 0) {
          return Swal.fire({
            icon: "error",
            title: "Upps a ocurrido un error, intenta de nuevo",
            showConfirmButton: true,
          });
        }

        Swal.fire({
          icon: "success",
          title: resp.msg,
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      });
  };

  return (
    <div className="card text-left col-3 favs m-5">
      <div className="card-body">
        <h4 className="card-title">{quote_info}</h4>
        <p className="card-text">-{quote_author}-</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-danger" onClick={handleSubmit}>
          Eliminar favorito
        </button>
      </div>
    </div>
  );
};

Fav.propTypes = {
  data: PropTypes.object.isRequired
}

export default Fav;
