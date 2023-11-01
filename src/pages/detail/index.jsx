import CardMeal from "../../components/card-meal";
import { useParams } from "react-router-dom";
import styles from "./detail.module.scss";
import MoreRecipes from "../../components/more-recipes";
import { useState, useEffect } from "react";
import { callApi } from "../../domain/api";

export default function DetailPage() {
  const { id } = useParams();
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    try {
      const response = await callApi({ endpoint: `/search.php?s=h` });
      const sliceResponse = response.meals.slice(0, 6);
      setRandomRecipes(sliceResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Delicacy</h1>
      <div className={styles.detailPage__cards}>
        <CardMeal mealId={id} type="detailPage" />
        <MoreRecipes payload={randomRecipes} />
      </div>
    </div>
  );
}
