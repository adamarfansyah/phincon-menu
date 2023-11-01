/* eslint-disable react/prop-types */
// import styles from "./favourite.module.scss";
import { useNavigate } from "react-router-dom";
import { URL_JSONSERVER } from "../../config/url";
import { callApi } from "../../domain/api";
import styles from "./favourite.module.scss";

export default function Favourite({ payload }) {
  const navigate = useNavigate();
  const deleteFavourite = async (id) => {
    try {
      await callApi({
        baseURL: URL_JSONSERVER,
        endpoint: `/favourite/${id}`,
        method: "DELETE",
      });
      alert("Success delete Favourite");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (payload.length === 0) {
    return (
      <div>
        <h1>you dont have any favourites</h1>
      </div>
    );
  }

  return (
    <div className={styles.cards}>
      {payload.map((item) => {
        return (
          <div key={item.idMeal} to={`/detail/${item?.idMeal}`} className={styles.favourite__card}>
            <img src={item?.strMealThumb} alt={item?.strMeal} />
            <h3>{item?.strMeal}</h3>
            <button className={styles.btn} onClick={() => deleteFavourite(item?.id)}>
              Delete from Favourite
            </button>
          </div>
        );
      })}
    </div>
  );
}
