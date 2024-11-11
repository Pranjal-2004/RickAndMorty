import React, { useState } from "react";
import { useQuery } from "react-query";
import "../App.css";

const Page = () => {
  const [page, setPage] = useState(1);

  function prevPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function nextPage() {
    setPage(page + 1);
  }

  const isDisabled = page === 1;
  const isDisabled2 = page === 42;

  const fetchData = async ({queryKey}) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${queryKey[1]}`
    );
    const data = await response.json();
    return data.results;
  };

  const { data, isLoading, isError } = useQuery(
    ["characters", page],
    fetchData,
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="bottomPage">
      <div className="container">
        {data.map((item) => (
          <div key={item.id} className="card-container">
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h2>{item.name}</h2>
              <p>
                Species: {item.status} - {item.species}
              </p>
              <p className="blur">Last Found Alive :</p>
              <p>{item.location.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="prevnxtbtn">
        <button disabled={isDisabled} className="prevbtn" onClick={prevPage}>
          Prev
        </button>
        <button disabled={isDisabled2} className="nextbtn" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
