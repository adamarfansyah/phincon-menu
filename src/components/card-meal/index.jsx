/* eslint-disable react/prop-types */
import styles from "./cardMeal.module.scss";
import { useNavigate } from "react-router-dom";
import CardIngredient from "../card-ingredient";

export default function CardMeal({
  menu,
  favList,
  type = "homePage",
  addToFavourite,
  removeFromFavourite,
}) {
  const navigate = useNavigate();
  const isMealInFavourites = favList?.some((favorite) => favorite?.idMeal === menu?.idMeal);

  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.cardMeal}>
      <div className={styles.cardMeal__desc}>
        <h1>{menu?.strMeal}</h1>
        <div className={styles.instructions}>
          <p>{menu?.strInstructions}</p>
        </div>
        <div className={styles.cardMeal__ingridients}>
          <h2>Ingridients</h2>
          <div className={styles.cardMeal__ingridientsContents}>
            <div>
              <CardIngredient title={menu?.strIngredient1} measure={menu?.strMeasure1} />
              <CardIngredient title={menu?.strIngredient2} measure={menu?.strMeasure2} />
            </div>
            <div>
              <CardIngredient title={menu?.strIngredient4} measure={menu?.strMeasure4} />
              <CardIngredient title={menu?.strIngredient3} measure={menu?.strMeasure3} />
            </div>
          </div>
          <div className={styles.cardMeal__btnContainer}>
            {type === "homePage" ? (
              <button
                className={styles.cardMeal__btn}
                onClick={() => navigateToDetail(menu?.idMeal)}
              >
                Detail
              </button>
            ) : null}
            {!isMealInFavourites ? (
              <button className={styles.cardMeal__btn} onClick={() => addToFavourite(menu)}>
                Add to Favourite
              </button>
            ) : (
              <button
                className={styles.cardMeal__btn}
                onClick={() => removeFromFavourite(favList, menu?.idMeal)}
              >
                Remove from Favourite
              </button>
            )}
          </div>
        </div>
      </div>
      <img src={menu?.strMealThumb} alt={menu?.strMeal} className={styles.cardMeal__img} />
    </div>
  );
}
