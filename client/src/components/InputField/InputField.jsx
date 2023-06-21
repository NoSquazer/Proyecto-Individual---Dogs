import ErrorInput from "../ErrorInput/ErrorInput";

import styles from "./InputField.module.css";

const InputField = ({
  type,
  name,
  placeholder,
  value,
  error,
  focus,
  onChange,
  onFocus,
  onBlur,
  className,
}) => (
  <>
    {focus && (
      <div className={styles.div_error}>
        {Object.keys(error).length > 1 ? (
          Object.keys(error).map((prop, index) => {
            return (
              prop && (
                <ErrorInput key={index} active={true} message={error[prop]} />
              )
            );
          })
        ) : (
          <ErrorInput active={true} message={error} />
        )}
      </div>
    )}
    <label htmlFor={name}>{name}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
    />
  </>
);

export default InputField;
