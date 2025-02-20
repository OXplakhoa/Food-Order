import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchAvailableMeals } from "../http";

export default function AvailableMeals() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [availableMeals, setAvailableMeals] = useState([]);
  //   const {
  //     isLoading,
  //     error,
  //     data: availableMeals,
  //   } = useFetch(fetchAvailableMeals, []);
  //   if (error){
  //     return; //Show Error Comps
  //   }
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
    // <section id="meals">
    //   <ul className="meal-item">
    //     {availableMeals.map((meal) => (
    //       <li key={meal.id} className="meal-item">
    //         <article>
    //           <img src={meal.image} alt={meal.name} />
    //           <h3>{meal.name}</h3>
    //           <p className="meal-item-price">{meal.price}</p>
    //           <p className="meal-item-description">{meal.description}</p>
    //           <button className="meal-item-actions">Add to Cart</button>
    //         </article>
    //       </li>
    //     ))}
    //   </ul>
    // </section>
    <ul id="meals">
        {availableMeals.map((meal) => (
            <li key={meal.id}>
                {meal.name}
            </li>
        ))}
    </ul>
  );
}
