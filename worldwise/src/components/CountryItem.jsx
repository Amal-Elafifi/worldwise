import propTypes from "prop-types";
import styles from "./CountryItem.module.css";

function CountryItem({country}) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

CountryItem.propTypes= {
  country: propTypes.shape({
    emoji: propTypes.string.isRequired,
    country: propTypes.string.isRequired
  }).isRequired,
}

export default CountryItem;
