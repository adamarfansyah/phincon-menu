import { useEffect, useState } from "react";
import { callApi } from "./domain/api";
import HomePage from "./pages/home";

function App() {
  const [categories, setCategories] = useState([]);

  const fetchMeal = async () => {
    try {
      const response = await callApi({ endpoint: `/categories.php` });
      setCategories(response.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  return <HomePage categories={categories} />;
}

export default App;
