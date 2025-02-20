import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../http";
import Meals from "./Meals";

export default function AvailableMeals() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [availableMeals, setAvailableMeals] = useState([]);
  useEffect(() => {
    async function fetchAvailableMeals() {
      try {
        const res = await fetch("http://localhost:3000/meals");
        if (!res.ok) return; //Should handle Error later
        const data = await res.json();
        setAvailableMeals(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAvailableMeals();
  }, []);
  return (
    <ul id="meals">
      {availableMeals.map((meal) => (
        <Meals key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}
