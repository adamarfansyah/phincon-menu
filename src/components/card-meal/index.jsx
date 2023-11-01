/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { callApi } from "../../domain/api";
import styles from "./cardMeal.module.scss";
import vector from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";
import { URL_JSONSERVER } from "../../config/url";

export default function CardMeal({ mealId, menu, favList, type = "homePage" }) {
  const navigate = useNavigate();
  const isMealInFavourites = favList?.some((favorite) => favorite?.idMeal === menu?.idMeal);

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
        <h1>{menu?.strMeal}</h1>
        <div className={styles.instructions}>
          <p>{menu?.strInstructions}</p>
        </div>
        <div className={styles.cardMeal__ingridients}>
          <h2>Ingridients</h2>
          <div className={styles.cardMeal__ingridientsContents}>
            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{menu?.strIngredient1}</h3>
                <p>{menu?.strMeasure1}</p>
              </div>
            </div>

            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{menu?.strIngredient2}</h3>
                <p>{menu?.strMeasure2}</p>
              </div>
            </div>

            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{menu?.strIngredient3}</h3>
                <p>{menu?.strMeasure3}</p>
              </div>
            </div>

            <div className={styles.cardMeal__cardIngridient}>
              <div className={styles.cardIngridient__img}>
                <img src={vector} alt="vector" />
              </div>
              <div>
                <h3>{menu?.strIngredient4}</h3>
                <p>{menu?.strMeasure4}</p>
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
              ) : <button className={styles.cardMeal__btn} onClick={() => addToFavourite(menu)}>
              Remove to Favourite
            </button>}
            </div>
          </div>
        </div>
      </div>
      <img src={menu?.strMealThumb} alt={menu?.strMeal} className={styles.cardMeal__img} />
    </div>
  );
}
