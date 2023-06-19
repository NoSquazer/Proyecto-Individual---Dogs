import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addTemperaments, filterCards, orderCards } from "../../redux/actions";
import styles from "./FilterAndOrder.module.css";

const FilterAndOrder = ({ temperaments, isInFavs }) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    if (name === "TemperametList") {
      return dispatch(filterCards("TEMPERAMENTS", value, isInFavs));
    }

    if (value === "TEMPERAMENTS") {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }

    switch (value) {
      case "CREATED":
        dispatch(filterCards("CREATED", isInFavs));
        break;

      case "A":
        dispatch(orderCards("A", isInFavs));
        break;

      case "D":
        dispatch(orderCards("D", isInFavs));
        break;

      case "A-Z":
        dispatch(orderCards("A-Z", isInFavs));
        break;

      case "WEIGHT":
        dispatch(orderCards("WEIGHT", isInFavs));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(addTemperaments());
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h5 className={styles.title}>Order</h5>
          <select className={styles.select} onChange={handleOnChange}>
            <option disabled selected>
              Select an order
            </option>
            <option value="A">Ascending</option>
            <option value="D">Descending</option>
            <option value="A-Z">A-Z</option>
            <option value="WEIGHT">Weight</option>
          </select>
        </div>
        <div>
          <h5 className={styles.title}>Filter</h5>
          <select className={styles.select_filter} onChange={handleOnChange}>
            <option disabled selected>
              Select a filter
            </option>
            <option value="CREATED">Created</option>
            <option value="TEMPERAMENTS">Temperament</option>
          </select>
        </div>
        {isSelected ? (
          <select
            className={`${styles.select_temperament} ${styles.selectTemperament}`}
            name="TemperametList"
            onChange={handleOnChange}
          >
            <option disabled selected>
              Select a temperament
            </option>
            {temperaments?.sort().map((temperament, index) => {
              return (
                <option value={temperament} key={index}>
                  {temperament}
                </option>
              );
            })}
          </select>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FilterAndOrder;
