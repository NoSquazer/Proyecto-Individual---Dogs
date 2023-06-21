import { useEffect, useState } from "react";
import styles from "./Create.module.css";

import validateForm from "./validations";
import gettemperamentList from "./getData";
import {
  handleOnChange,
  handleOnFocus,
  handleOnBlur,
  handleDisabled,
  handleAddTemperament,
  handleRemoveTemperament,
  clearError,
} from "./formHandlers";
import sendData from "./sendData";
import AlertMessage from "../AlertMessage/AlertMessage";
import InputField from "../InputField/InputField";
import ErrorInput from "../ErrorInput/ErrorInput";
import SelectOptions from "../SelectOption/SelectOption";

const Create = () => {
  const [temperamentList, setTemperamentList] = useState([]);

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const [dogData, setDogData] = useState({
    name: "",
    origin: "",
    image: "",
    height: { minHeight: "", maxHeight: "" },
    weight: { minWeight: "", maxWeight: "" },
    lifeSpan: { minLifeSpan: "", maxLifeSpan: "" },
    temperamentList: [],
  });

  const [error, setError] = useState({
    name: { isInvalid: "", lengthInvalid: "" },
    origin: { isInvalid: "", lengthInvalid: "" },
    image: "",
    height: { isMinor: "", isEmpty: "" },
    weight: { isMinor: "", isEmpty: "" },
    lifeSpan: { isMinor: "", isEmpty: "" },
  });

  const [focus, setFocus] = useState({
    name: false,
    origin: false,
    image: false,
    height: false,
    weight: false,
    lifeSpan: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendData(dogData, setAlert);
  };

  useEffect(() => {
    const fetchTemperamentList = async () => {
      const data = await gettemperamentList();
      setTemperamentList(data);
    };

    fetchTemperamentList();
  }, []);

  useEffect(() => {
    validateForm(dogData, setError);
  }, [dogData]);

  return (
    <>
      <>
        {alert.status && (
          <AlertMessage
            status={alert.status}
            message={alert.message}
            clearError={() => clearError(setAlert)}
          />
        )}
      </>
      <div className={styles.div_container}>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <InputField
            type="text"
            name="name"
            placeholder="Enter name"
            value={dogData.name}
            error={error.name}
            focus={focus.name}
            onChange={(event) => handleOnChange(event, setDogData)}
            onFocus={(event) => handleOnFocus(event, setFocus)}
            onBlur={(event) => handleOnBlur(event, setFocus)}
            className={styles.input_name}
          />
          <InputField
            type="text"
            name="origin"
            placeholder="Enter origin"
            value={dogData.origin}
            error={error.origin}
            focus={focus.origin}
            onChange={(event) => handleOnChange(event, setDogData)}
            onFocus={(event) => handleOnFocus(event, setFocus)}
            onBlur={(event) => handleOnBlur(event, setFocus)}
            className={styles.input_name}
          />
          <InputField
            type="text"
            name="image"
            placeholder="Enter image url"
            value={dogData.image}
            error={error.image}
            focus={focus.image}
            onChange={(event) => handleOnChange(event, setDogData)}
            onFocus={(event) => handleOnFocus(event, setFocus)}
            onBlur={(event) => handleOnBlur(event, setFocus)}
            className={styles.input_name}
          />
          <div>
            {focus.height && (
              <div className={styles.div_error}>
                {Object.keys(error.height).map((prop, index) => {
                  return (
                    prop && (
                      <ErrorInput
                        key={index}
                        active={true}
                        message={error.height[prop]}
                      />
                    )
                  );
                })}
              </div>
            )}
          </div>
          <label htmlFor="height">Height</label>
          <div className={styles.div_double_inputs}>
            <input
              type="text"
              name="height.minHeight"
              placeholder="Min"
              value={dogData.height.minHeight}
              onChange={(event) => handleOnChange(event, setDogData)}
              onFocus={(event) => handleOnFocus(event, setFocus)}
              onBlur={(event) => handleOnBlur(event, setFocus)}
              className={
                styles.input_double_numbers
                // !focus.height
                //   ? styles.input_default
                //   : error.height.isMinor || error.height.isEmpty
                //   ? styles.input_active_errors
                //   : styles.input_inactive_errors
              }
            ></input>

            <input
              type="number"
              name="height.maxHeight"
              placeholder="Max"
              value={dogData.height.maxHeight}
              onChange={(event) => handleOnChange(event, setDogData)}
              onFocus={(event) => handleOnFocus(event, setFocus)}
              onBlur={(event) => handleOnBlur(event, setFocus)}
              className={
                styles.input_double_numbers
                // !focus.height
                //   ? styles.input_default
                //   : error.height.isMinor || error.height.isEmpty
                //   ? styles.input_active_errors
                //   : styles.input_inactive_errors
              }
            ></input>
          </div>
          <div>
            {focus.weight && (
              <div className={styles.div_error}>
                {Object.keys(error.weight).map((prop, index) => {
                  return (
                    prop && (
                      <ErrorInput
                        key={index}
                        active={true}
                        message={error.weight[prop]}
                      />
                    )
                  );
                })}
              </div>
            )}
          </div>
          <label htmlFor="weight">Weight</label>
          <div className={styles.div_double_inputs}>
            <input
              type="number"
              name="weight.minWeight"
              placeholder="Min"
              value={dogData.weight.minWeight}
              onChange={(event) => handleOnChange(event, setDogData)}
              onFocus={(event) => handleOnFocus(event, setFocus)}
              onBlur={(event) => handleOnBlur(event, setFocus)}
              className={
                styles.input_double_numbers
                // !focus.weight
                //   ? styles.input_default
                //   : error.weight.isMinor || error.weight.isEmpty
                //   ? styles.input_active_errors
                //   : styles.input_inactive_errors
              }
            ></input>

            <input
              type="number"
              name="weight.maxWeight"
              placeholder="Max"
              value={dogData.weight.maxWeight}
              onChange={(event) => handleOnChange(event, setDogData)}
              onFocus={(event) => handleOnFocus(event, setFocus)}
              onBlur={(event) => handleOnBlur(event, setFocus)}
              className={
                styles.input_double_numbers
                // !focus.weight
                //   ? styles.input_default
                //   : error.weight.isMinor || error.weight.isEmpty
                //   ? styles.input_active_errors
                //   : styles.input_inactive_errors
              }
            ></input>
          </div>
          <div>
            {focus.lifeSpan && (
              <div className={styles.div_error}>
                {Object.keys(error.lifeSpan).map((prop, index) => {
                  return (
                    prop && (
                      <ErrorInput
                        key={index}
                        active={true}
                        message={error.lifeSpan[prop]}
                      />
                    )
                  );
                })}
              </div>
            )}
          </div>
          <label htmlFor="lifeSpan">Life span</label>
          <div className={styles.div_double_inputs}>
            <input
              type="number"
              name="lifeSpan.minLifeSpan"
              placeholder="Min"
              value={dogData.lifeSpan.minLifeSpan}
              onChange={(event) => handleOnChange(event, setDogData)}
              onFocus={(event) => handleOnFocus(event, setFocus)}
              onBlur={(event) => handleOnBlur(event, setFocus)}
              className={
                styles.input_double_numbers
                // !focus.lifeSpan
                //   ? styles.input_default
                //   : error.lifeSpan.isMinor || error.lifeSpan.isEmpty
                //   ? styles.input_active_errors
                //   : styles.input_inactive_errors
              }
            ></input>

            <input
              type="number"
              name="lifeSpan.maxLifeSpan"
              placeholder="Max"
              value={dogData.lifeSpan.maxLifeSpan}
              onChange={(event) => handleOnChange(event, setDogData)}
              onFocus={(event) => handleOnFocus(event, setFocus)}
              onBlur={(event) => handleOnBlur(event, setFocus)}
              className={
                styles.input_double_numbers
                // !focus.lifeSpan
                //   ? styles.input_default
                //   : error.lifeSpan.isMinor || error.lifeSpan.isEmpty
                //   ? styles.input_active_errors
                //   : styles.input_inactive_errors
              }
            ></input>
          </div>
          <div>
            <h5 className={styles.h5_text}>
              You can use click to add or remove a temperamentList!
            </h5>
          </div>
          <div>
            <h5 className={styles.h5_text}>All temperamentList</h5>
            <SelectOptions
              options={temperamentList}
              onClick={(event) =>
                handleAddTemperament(event, setDogData, setTemperamentList)
              }
            />
          </div>
          <div>
            <h5 className={styles.h5_text}>Dog's temperamentList</h5>
            <SelectOptions
              options={dogData.temperamentList}
              onClick={(event) =>
                handleRemoveTemperament(event, setDogData, setTemperamentList)
              }
            />
          </div>
          <button
            disabled={handleDisabled(error)}
            className={styles.button_create}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
