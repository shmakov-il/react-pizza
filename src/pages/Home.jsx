import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://63fc646c859df29986bb930b.mockapi.io/items')
            .then(res => res.json())
            .then(pizzas => {
                setItems(pizzas);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map(pizzaInfo => <PizzaBlock {...pizzaInfo} key={pizzaInfo.id}/>)
                }
            </div>
        </div>
    )
}

export default Home;