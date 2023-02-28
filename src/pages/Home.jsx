import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import sort from "../components/Sort";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

function Home() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeCategories, setActiveCategories] = React.useState(0);
    const [selectedSort, setSelectedSort] = React.useState({name: 'популярности', sortProperty: 'rating'});
    const [toggleSort, setToggleSort] = React.useState(true);
    const [pagePagination, setPagePagination] = React.useState(1);
    const {searchValue} = React.useContext(SearchContext);

    React.useEffect(() => {
        setIsLoading(true);

        const category = activeCategories !== 0 ? `&category=${activeCategories}` : '';
        const sortBy = `&sortBy=${selectedSort.sortProperty}`;
        const order = `&order=${toggleSort ? 'asc' : 'desc'}`;
        const search = `&search=${searchValue}`;
        const page = `&page=${pagePagination}&limit=4`;

        fetch(`https://63fc646c859df29986bb930b.mockapi.io/items?${category}${sortBy}${order}${search}${page}`)
            .then(res => res.json())
            .then(pizzas => {
                setItems(pizzas);
                setIsLoading(false);
                window.scrollTo(0, 0);
            });
    }, [activeCategories, selectedSort, toggleSort, searchValue, pagePagination]);

    const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items
        //.filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(pizzaInfo => <PizzaBlock {...pizzaInfo} key={pizzaInfo.id}/>);
    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategories={activeCategories}
                            setActiveCategories={setActiveCategories}/>
                <Sort selectedSort={selectedSort}
                      setSelectedSort={setSelectedSort}
                      toggleSort={toggleSort}
                      setToggleSort={setToggleSort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination setPagePagination={setPagePagination}/>
        </div>
    )
}

export default Home;