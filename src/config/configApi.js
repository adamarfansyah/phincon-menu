import { URL_JSONSERVER } from "./url";
import { callApi } from "../domain/api";

export const fetchListFavourite = async () => {
  try {
    const response = await callApi({ baseURL: URL_JSONSERVER, endpoint: "/favourite" });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchDetailRecipes = async (id) => {
  try {
    const response = await callApi({ endpoint: `/lookup.php?i=${id}` });
    return response.meals[0];
  } catch (error) {
    console.log(error);
  }
};

export const fetchRandomRecipes = async () => {
  try {
    const response = await callApi({ endpoint: `/search.php?s=h` });
    const sliceResponse = response.meals.slice(0, 6);
    return sliceResponse;
  } catch (error) {
    console.log(error);
  }
};

export const addToFavourite = async (data) => {
  try {
    await callApi({
      baseURL: URL_JSONSERVER,
      endpoint: "/favourite",
      method: "POST",
      body: data,
    });
    alert("Success tambah favourite");
  } catch (error) {
    console.log(error);
  }
};

export const removeFromFavourite = async (favourite, id) => {
  const getFavourite = favourite.filter((item) => item.idMeal === id);
  try {
    await callApi({
      baseURL: URL_JSONSERVER,
      endpoint: `/favourite/${getFavourite[0]?.id}`,
      method: "DELETE",
    });
    alert("Success Delete Data");
  } catch (error) {
    console.log(error);
  }
};
