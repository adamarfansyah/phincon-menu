import CardMeal from "../../components/card-meal";
import { useParams } from "react-router-dom";
import styles from "./detail.module.scss";
import MoreRecipes from "../../components/more-recipes";
import { useState, useEffect } from "react";

import {
  fetchRandomRecipes,
  fetchListFavourite,
  fetchDetailRecipes,
  addToFavourite,
  removeFromFavourite,
} from "../../config/configApi";

export default function DetailPage() {
  const { id } = useParams();
  const [detailRecipes, setDetailRecipes] = useState();
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    Promise.all([fetchRandomRecipes(), fetchListFavourite(), fetchDetailRecipes(id)])
      .then(([recipes, favorites, detailRecipes]) => {
        setFavList(favorites);
        setRandomRecipes(recipes);
        setDetailRecipes(detailRecipes);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="container">
      <h1>Delicacy</h1>
      <div className={styles.detailPage__cards}>
        <CardMeal
          menu={detailRecipes}
          favList={favList}
          type="detailPage"
          removeFromFavourite={removeFromFavourite}
          addToFavourite={addToFavourite}
        />
        <MoreRecipes payload={randomRecipes} />
      </div>
    </div>
  );
}
