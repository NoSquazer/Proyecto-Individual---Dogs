import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./Home.module.css";
import { updateMultipleFavDogs } from "../../redux/actions";
import getFavorites from "./getFavorites";

import SearchBar from "../SearchBar/SearchBar";
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder";
import CurrentPage from "../CurrentPage/CurrentPage";

const Home = () => {
  const { dogs, temperaments, userId, favoriteDogs } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId && !favoriteDogs.length) {
      return async () => {
        const dogIdList = await getFavorites(userId);

        dispatch(updateMultipleFavDogs(dogIdList));
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div className={styles.filters}>
          <FilterAndOrder temperaments={temperaments} />
        </div>
        <div className={styles.currentPage}>
          <CurrentPage dogs={dogs} />
        </div>
      </div>
    </div>
  );
};

export default Home;
