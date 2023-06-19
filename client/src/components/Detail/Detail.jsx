import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import getData from "./getData";

const Detail = () => {
  const { id } = useParams();
  const [dog, setDog] = useState();

  useEffect(() => {
    getData(id, setDog);
  }, []);

  return (
    <div>
      <div>
        <NavLink to="/home">
          <h5>Back</h5>
        </NavLink>
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        {dog ? (
          <>
            <h5>Name: {dog.name}</h5>
            <h5>Origin: {dog.origin}</h5>
            <h5>Height: {dog.height}</h5>
            <h5>Weight: {dog.weight}</h5>
            <h5>Life Span: {dog.life_span}</h5>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Detail;
