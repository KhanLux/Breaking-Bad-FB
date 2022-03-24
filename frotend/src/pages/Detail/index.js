import { useFetch } from "../../hooks/useFetch";
import baseUrl from "../../api/breakingApi";
import Loader from "../../components/Loader/index";
import Quote from "../../components/Quote";

const Detail = ({ params }) => {
  const { data, loading } = useFetch(
    `${baseUrl}/quote/random?author=${params.author}`
  );

  return (
    <div>
      {loading && <Loader />}
      {data.length > 0 ? (
        <Quote data={data[0]} />
      ) : (
        <h1 className="center mt-5">Sin resultados...</h1>
      )}
    </div>
  );
};

export default Detail;
