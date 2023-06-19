import { useSelector } from "react-redux";

import CurrentPage from "../CurrentPage/CurrentPage";
import FilterAndOrder from "../FilterAndOrder/FilterAndOrder";

const Favorites = () => {
  const { favoriteDogs, temperaments } = useSelector((state) => state);

  return (
    <div>
      <div>
        <FilterAndOrder
          temperaments={temperaments}
          isInFavs={favoriteDogs.length}
        />
      </div>
      <div>
        {favoriteDogs.length ? (
          <CurrentPage dogs={favoriteDogs} />
        ) : (
          <div>
            <h5>Sorry, you dont have favorites added</h5>
            <h5>☹</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
