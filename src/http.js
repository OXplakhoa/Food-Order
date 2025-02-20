export async function fetchAvailableMeals() {
  const res = await fetch("http://localhost:3000/meals");
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch available places");
  }
  return data;
}

