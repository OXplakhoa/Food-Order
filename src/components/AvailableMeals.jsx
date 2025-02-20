import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../http";
import Meals from "./Meals";
export default function AvailableMeals() {
  const {
    isLoading,
    error,
    data: availableMeals,
  } = useFetch(fetchAvailableMeals, []);
  return (
    <ul id="meals">
      {availableMeals.map((meal) => (
        <Meals key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
