/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { callApi } from "../../domain/api";
import styles from "./home.module.scss";
import CardMeal from "../../components/card-meal";
import MoreRecipes from "../../components/more-recipes";
import Favourite from "../../components/favourite";
import { URL_JSONSERVER } from "../../config/url";

export default function HomePage({ categories }) {
  const [categoryName, setCategoryName] = useState("Beef");
  const [menusCategory, setMenusCategory] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    if (categoryName !== "Favourite") {
      fetchMenuCategory();
    } else {
      fetchListFavourite();
    }
  }, [categoryName]);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchListFavourite = async () => {
    try {
      const response = await callApi({ baseURL: URL_JSONSERVER, endpoint: "/favourite" });
      setMenusCategory(response);
    } catch (error) {
      console.log(console.error());
    }
  };

  const fetchMenuCategory = async () => {
    try {
      const response = await callApi({ endpoint: `/filter.php?c=${categoryName}` });
      const sliceResponse = response.meals.slice(0, 5);
      setMenusCategory(sliceResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRandomRecipes = async () => {
    try {
      const response = await callApi({ endpoint: `/search.php?s=b` });
      const sliceResponse = response?.meals?.slice(0, 6);
      setRandomRecipes(sliceResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const getIdCategory = (name) => {
    setCategoryName(name);
  };

  return (
    <div className={`${styles.homePage} container`}>
      <h1>Delicacy</h1>
      <div className={styles.homePage__container}>
        <div className={styles.homePage__categories}>
          {categories.map((item) => {
            return (
              <h4 key={item.idCategory} onClick={() => getIdCategory(item.strCategory)}>
                {item.strCategory}
              </h4>
            );
          })}
          <h4 onClick={() => getIdCategory("Favourite")}>Favourite</h4>
        </div>
        {categoryName === "Favourite" ? (
          <Favourite payload={menusCategory} />
        ) : (
          <div className={styles.homePage__cardMeal}>
            {menusCategory.map((item) => {
              return <CardMeal key={item.idMeal} mealId={item.idMeal} />;
            })}
          </div>
        )}

        <MoreRecipes payload={randomRecipes} />
      </div>
    </div>
  );
}
