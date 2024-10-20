import MealItem from "./MealItem";
import useHttp from "./http/useHttp.js";

export default function Meals() {
    const {data : loadedMeals , loading , error} = useHttp('http://localhost:3000/meals');

    return <ul id="meals">{loadedMeals.map((meal) =>(
        <MealItem key={meal.id} meal={meal} />
    ))}</ul>
}