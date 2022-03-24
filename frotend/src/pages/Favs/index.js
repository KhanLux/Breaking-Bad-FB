import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../api/backendApi";
import Fav from "../../components/Fav";
import { helpHttp } from "../../helpers/helpHttp";

const Favs = () => {
  const [listOfFavs, setListOfFavs] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      helpHttp()
        .get(`${baseUrl}/favs/${user.sub}`)
        .then((resp) => {
          setListOfFavs(resp);
        });
    }
  }, [user, isAuthenticated]);

  return (
    <div className="container">
      <div className="row">
        {listOfFavs.length > 0 ? (
          listOfFavs.map((el) => <Fav data={el} />)
        ) : (
          <p>Sin favoritos</p>
        )}
      </div>
    </div>
  );
};

export default Favs;
