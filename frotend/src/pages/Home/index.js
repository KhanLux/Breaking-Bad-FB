import React, { useState } from "react";
import "./index.css";
import Cards from "../../components/Cards/index";
import baseUrl from "../../api/breakingApi";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
  const { data, loading } = useFetch(`${baseUrl}/characters`);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filter = (data) => {
    const filtered = data.filter((character) =>
      character.name.includes(search)
    );

    return filtered;
  };

  const filteredCharacteres = () => {
    if (search.length === 0) return data.slice(currentPage, currentPage + 5);

    return filter(data).slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (filter(data).length > currentPage + 5) setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 5);
  };

  const onSearchChange = ({ target }) => {
    setCurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="mb-5 form-control"
        placeholder="Buscar personaje"
        value={search}
        onChange={onSearchChange}
      />
      <Cards characters={filteredCharacteres()} isLoading={loading} />
      <div className="center">
        <button type="button" className="mt-3 btn m-2" onClick={prevPage}>
          Anterior
        </button>
        <button type="button" className="mt-3 btn" onClick={nextPage}>
          siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
