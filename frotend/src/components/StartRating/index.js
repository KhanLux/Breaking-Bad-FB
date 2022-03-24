import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { helpHttp } from "../../helpers/helpHttp";
import { useAuth0 } from "@auth0/auth0-react";
import { FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { baseUrl } from "../../api/backendApi";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

let initialForm = {
  rating: 0,
  comment: "",
  user_info: null,
  quote_id: 0,
  user_id: null,
};

const StartRating = ({ data }) => {
  const { isAuthenticated, user } = useAuth0();
  const { quote_id, quote, author } = data;

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [form, setForm] = useState(initialForm);
  const stars = Array(5).fill(0);

  useEffect(() => {
    form.quote_id = quote_id;
  }, [data]);

  const handleClick = (value) => {
    setCurrentValue(value);
    setForm({ ...form, rating: value });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.comment === "") {
      return Swal.fire({
        icon: "error",
        title: "Ningun campo debe estar vación",
        showConfirmButton: true,
      });
    }

    if (form.rating === 0) {
      return Swal.fire({
        icon: "error",
        title: "Debe de ingresar una valoración",
        showConfirmButton: true,
      });
    }
    if (!isAuthenticated) {
      return Swal.fire({
        icon: "error",
        title: "Debes de iniciar sesión para realizar una valoración",
        showConfirmButton: true,
      });
    }

    form.user_id = user.sub;
    form.user_info = user.nickname;

    let options = {
      body: form,
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .post(baseUrl, options)
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
          title: "Califación Enviada exitosamente!",
          showConfirmButton: true,
          timer: 1500,
        }).then((value) => {
          window.location.reload();
        });
      });
  };

  const handleFav = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return Swal.fire({
        icon: "warning",
        title: "Debes de iniciar sesión para agregar a favoritos",
        showConfirmButton: true,
      });
    }

    let initialFav = {
      quote_id,
      quote_info: quote,
      quote_author: author,
      user_id: user.sub,
    };

    let options = {
      body: initialFav,
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .post(`${baseUrl}/register_fav`, options)
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
        });
      });
  };

  return (
    <div style={styles.container}>
      <h2> Valoración </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              name="rating"
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
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
      <textarea
        placeholder="¿Cual es tu valoración?"
        style={styles.textarea}
        name="comment"
        value={form.comment}
        onChange={handleChange}
      />

      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          className="btn btn-danger m-1"
          onClick={handleFav}
          style={styles.button}
        >
          Añadir a favoritos &nbsp; <FaHeart style={{ color: "red" }} />
        </button>
        <button
          className="btn btn-success m-1"
          onClick={handleSubmit}
          style={styles.button}
        >
          Enviar valoración
        </button>
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
};

StartRating.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StartRating;
