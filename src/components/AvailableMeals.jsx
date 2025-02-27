import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../util/http";
import Meals from "./Meals";
import Logo from "../assets/logo.jpg";
import Loading from "./UI/Loading";
export default function AvailableMeals() {
  const {
    isLoading,
    error,
    data: availableMeals,
  } = useFetch(fetchAvailableMeals, []);
  if (isLoading) {
    return (
      <Loading/>
    );
  }
  return (
    <ul id="meals">
      {availableMeals.map((meal) => (
        <Meals key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
