import MealItem from "./MealItem";
import useHttp from "./http/useHttp.js";
import Error from "./Error.jsx"

const requestConfig = {};

export default function Meals() {
    const {
        data : loadedMeals,
        loading,
        error
    } = useHttp('http://localhost:3000/meals',requestConfig,[]);


    if (loading) {
        return <p> Fetching Meals ...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return <ul id="meals">{loadedMeals.map((meal) =>(
        <MealItem key={meal.id} meal={meal} />
    ))}</ul>
}