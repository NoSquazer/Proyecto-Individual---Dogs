import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Detail.module.css";

import getData from "./getData";

const Detail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState();

  useEffect(() => {
    getData(id, setDog);
  }, []);

  return dog ? (
    <div className={styles.div_container}>
      <div className={styles.imageContainer}>
        <img src={dog.image} alt={dog.name} className={styles.img_dog} />
        <h5 className={styles.h5_name}>{dog.name}</h5>
      </div>
      <div>
        <div className={styles.div_h5}>
          <h5 className={styles.h5_props}>Origin: </h5>
          <h5 className={styles.h5_props}>{dog.origin}</h5>
        </div>
        <div className={styles.div_h5}>
          <h5 className={styles.h5_props}>Height: </h5>
          <h5 className={styles.h5_props}>{dog.height}</h5>
        </div>
        <div className={styles.div_h5}>
          <h5 className={styles.h5_props}>Weight: </h5>
          <h5 className={styles.h5_props}>{dog.weight}</h5>
        </div>
        <div className={styles.div_h5}>
          <h5 className={styles.h5_props}>Life span: </h5>
          <h5 className={styles.h5_props}>{dog.life_span}</h5>
        </div>
        <div className={styles.div_h5}>
          <h5 className={styles.h5_props}>Temperaments: </h5>
          <h5 className={styles.h5_props}>{dog.temperament}</h5>;
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Detail;
