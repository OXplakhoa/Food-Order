import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../util/http";
import Meals from "./Meals";
import Loading from "./UI/Loading";
import Error from "./UI/Error";
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
  if(error){
    return <Error title="Failed to fetch meals" message={error}/>
  }
  return (
    <ul id="meals">
      {availableMeals.map((meal) => (
        <Meals key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
