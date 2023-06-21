import { useEffect, useState } from "react";
import styles from "./CurrentPage.module.css";

import Cards from "../Cards/Cards";

const CurrentPage = ({ dogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = dogs.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(dogs.length / cardsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleDisabled = () => {
    return currentPage <= 1;
  };

  const handleOnClick = (direction) => {
    if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "back") {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [dogs]);

  return (
    <div className={styles.container}>
      <div>
        <Cards dogs={currentCards} />
      </div>
      {dogs.length ? (
        <div className={styles.pagination}>
          <button
            className={styles.button}
            disabled={handleDisabled()}
            onClick={() => handleOnClick("back")}
          >
            Back
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={styles.button}
              onClick={() => setCurrentPage(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={styles.button}
            onClick={() => handleOnClick("next")}
          >
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CurrentPage;
