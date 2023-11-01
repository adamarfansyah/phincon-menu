/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { callApi } from "../../domain/api";
import styles from "./cardMeal.module.scss";
import vector from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";
import { URL_JSONSERVER } from "../../config/url";

export default function CardMeal({ mealId, type = "homePage" }) {
  const [meal, setMeal] = useState();
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();
  const isMealInFavourites = favourites?.some((favorite) => favorite?.idMeal === meal?.idMeal);

  useEffect(() => {
    fetchFavourites();
    fetchMealById();
  }, []);

  console.log(meal);

  const fetchMealById = async () => {
    try {
      const response = await callApi({ endpoint: `/lookup.php?i=${mealId}` });
      setMeal(response.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavourites = async () => {
    try {
      const response = await callApi({ baseURL: URL_JSONSERVER, endpoint: "/favourite" });
      setFavourites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavourite = async (data) => {
    try {
      const response = await callApi({
        baseURL: URL_JSONSERVER,
        endpoint: "/favourite",
        method: "POST",
        body: data,
      });
      await fetchFavourites();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.cardMeal}>
      <div className={styles.cardMeal__desc}>
        <h1>{meal?.strMeal}</h1>
        <p>{meal?.strInstructions}</p>
        <div className={styles.cardMeal__ingridients}>
          <h2>Ingridients</h2>
          <div className={styles.cardMeal__ingridientsContents}>
            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{meal?.strIngredient1}</h3>
                <p>{meal?.strMeasure1}</p>
              </div>
            </div>

            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{meal?.strIngredient2}</h3>
                <p>{meal?.strMeasure2}</p>
              </div>
            </div>

            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{meal?.strIngredient3}</h3>
                <p>{meal?.strMeasure3}</p>
              </div>
            </div>

            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{meal?.strIngredient4}</h3>
                <p>{meal?.strMeasure4}</p>
              </div>
            </div>

            <div className={styles.cardMeal__btnContainer}>
              {type === "homePage" ? (
                <button
                  className={styles.cardMeal__btn}
                  onClick={() => navigateToDetail(meal?.idMeal)}
                >
                  Detail
                </button>
              ) : null}
              {!isMealInFavourites ? (
                <button className={styles.cardMeal__btn} onClick={() => addToFavourite(meal)}>
                  Add to Favourite
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <img src={meal?.strMealThumb} alt={meal?.strMeal} className={styles.cardMeal__img} />
    </div>
  );
}
