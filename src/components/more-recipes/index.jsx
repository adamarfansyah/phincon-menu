/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./moreRecipes.module.scss";

export default function MoreRecipes({ payload }) {
  return (
    <div className={styles.moreRecipes}>
      <h1>More Recipes</h1>
      <div className={styles.overFlow}>
        <div className={styles.moreRecipes__cards}>
          {payload?.map((item) => {
            return (
              <Link
                key={item.idMeal}
                to={`/detail/${item?.idMeal}`}
                className={styles.moreRecipes__card}
              >
                <div>
                  <img src={item?.strMealThumb} alt={item?.strMeal} />
                  <h3>{item?.strMeal}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
