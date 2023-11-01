/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { callApi } from "../../domain/api";
import styles from "./home.module.scss";
import CardMeal from "../../components/card-meal";
import MoreRecipes from "../../components/more-recipes";
import Favourite from "../../components/favourite";
import {
  removeFromFavourite,
  addToFavourite,
  fetchRandomRecipes,
  fetchListFavourite,
} from "../../config/configApi";

export default function HomePage({ categories }) {
  const [categoryName, setCategoryName] = useState("Beef");
  const [menusCategory, setMenusCategory] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (categoryName !== "Favourite") {
      fetchMenuCategory();
    } else {
      fetchListFavourite();
    }
  }, [categoryName]);

  useEffect(() => {
    Promise.all([fetchRandomRecipes(), fetchListFavourite()])
      .then(([randomRecipes, favorites]) => {
        setRandomRecipes(randomRecipes);
        setFavList(favorites);
      })
      .catch((error) => console.log(error));
  }, []);

  const fetchDetail = async (item) => {
    try {
      return await callApi({ endpoint: `/lookup.php?i=${item.idMeal}` });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenuCategory = async () => {
    try {
      const response = await callApi({ endpoint: `/filter.php?c=${categoryName}` });
      const sliceResponse = response.meals.slice(0, 5);
      const modifiedData = [];
      Promise.all(
        sliceResponse?.map(async (item) => {
          return fetchDetail(item).then((res) => {
            modifiedData.push({
              ...item,
              strInstructions: res?.meals[0]?.strInstructions,
              strIngredient1: res?.meals[0]?.strIngredient1,
              strIngredient2: res?.meals[0]?.strIngredient2,
              strIngredient3: res?.meals[0]?.strIngredient3,
              strIngredient4: res?.meals[0]?.strIngredient4,
              strMeasure1: res?.meals[0]?.strMeasure1,
              strMeasure2: res?.meals[0]?.strMeasure2,
              strMeasure3: res?.meals[0]?.strMeasure3,
              strMeasure4: res?.meals[0]?.strMeasure4,
            });
          });
        })
      ).finally(() => {
        setMenusCategory(modifiedData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryName = (name) => {
    setCategoryName(name);
  };

  return (
    <div className={`${styles.homePage} container`}>
      <h1>Delicacy</h1>
      <div className={styles.homePage__container}>
        <div className={styles.homePage__categories}>
          {categories.map((item) => {
            return (
              <h4 key={item.idCategory} onClick={() => getCategoryName(item.strCategory)}>
                {item.strCategory}
              </h4>
            );
          })}
          <h4 onClick={() => getCategoryName("Favourite")}>Favourite</h4>
        </div>
        {categoryName === "Favourite" ? (
          <Favourite payload={favList} />
        ) : (
          <div className={styles.homePage__cardMeal}>
            {menusCategory.map((item) => {
              return (
                <CardMeal
                  key={item.idMeal}
                  menu={item}
                  favList={favList}
                  addToFavourite={addToFavourite}
                  removeFromFavourite={removeFromFavourite}
                />
              );
            })}
          </div>
        )}
        <MoreRecipes payload={randomRecipes} />
      </div>
    </div>
  );
}
