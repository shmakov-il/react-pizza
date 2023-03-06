import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import {setFilters} from "../redux/slices/fitlersSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

function Home() {
    const dispatch = useDispatch();
    const selectedSort = useSelector((state) => state.filters.sort);
    const activeCategories = useSelector((state) => state.filters.categoryID);
    const toggleSort = useSelector((state) => state.filters.toggleSort);
    const currentPage = useSelector((state) => state.filters.currentPage);

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const {searchValue} = React.useContext(SearchContext);

    const navigate = useNavigate();

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const fetchPizzas = () => {
        setIsLoading(true);
        const category = activeCategories !== 0 ? `&category=${activeCategories}` : '';
        const sortBy = `&sortBy=${selectedSort.sortProperty}`;
        const order = `&order=${toggleSort ? 'asc' : 'desc'}`;
        const search = `&title=${searchValue}`;
        const page = `&page=${currentPage}&limit=4`;
        axios.get(`https://63fc646c859df29986bb930b.mockapi.io/items?${category}${sortBy}${order}${search}${page}`)
            .then(response => {
                setItems(response.data);
                setIsLoading(false);
                window.scrollTo(0, 0);
            });
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search, {ignoreQueryPrefix: true});
            dispatch(setFilters({
                ...params
            }));

            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [activeCategories, selectedSort.sortProperty, toggleSort, searchValue, currentPage]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                activeCategories,
                selectedSort: selectedSort.sortProperty,
                toggleSort,
                currentPage
            }, {addQueryPrefix: true});

            navigate(queryString);
        }

        isMounted.current = true;
    }, [activeCategories, selectedSort.sortProperty, toggleSort, currentPage]);

    const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items
        //.filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(pizzaInfo => <PizzaBlock {...pizzaInfo} key={pizzaInfo.id}/>);
    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination/>
        </div>
    )
}

export default Home;