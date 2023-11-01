/* eslint-disable react/prop-types */
import styles from "./cardIngredient.module.scss";
import vector from "../../assets/Vector.svg";

export default function CardIngredient({ title, measure }) {
  return (
    <div className={styles.cardMeal__cardIngridient}>
      <div className={styles.cardIngridient__img}>
        <img src={vector} alt="vector" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{measure}</p>
      </div>
    </div>
  );
}
