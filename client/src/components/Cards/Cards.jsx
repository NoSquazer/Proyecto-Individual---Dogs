import Card from "../Card/Card";
import styles from "./Cards.module.css";

const Cards = ({ dogs }) => {
  return (
    <>
      {dogs.length ? (
        <div className={styles.div_container}>
          {dogs?.map(({ id, image, name, weight, temperament }, index) => {
            return (
              <Card
                key={index}
                id={id}
                image={image}
                name={name}
                weight={weight}
                temperament={temperament}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <h5>There are no results!</h5>
        </div>
      )}
    </>
  );
};

export default Cards;
