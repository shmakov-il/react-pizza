import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import qs from "qs";
import {selectFilterData, setFilters} from "../redux/slices/fitlersSlice";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {fetchPizza, selectPizza} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";


const Home: React.FC = () => {

    const dispatch = useAppDispatch();
    const {sort, categoryID: activeCategories, toggleSort, currentPage, searchValue} = useSelector(selectFilterData);
    const {items, isLoading} = useSelector(selectPizza);

    const navigate = useNavigate();

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const fetchPizzas = () => {
        const category = activeCategories !== 0 ? `&category=${activeCategories}` : '';
        const sortBy = `&sortBy=${sort.sortProperty}`;
        const order = `&order=${toggleSort ? 'asc' : 'desc'}`;
        const search = `&title=${searchValue}`;
        const page = `&page=${currentPage}&limit=4`;

        dispatch(fetchPizza({
            category,
            sortBy,
            order,
            search,
            page
        }));
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search, {ignoreQueryPrefix: true});
            dispatch(setFilters({
                activeCategories: params.activeCategories as string,
                currentPage: params.currentPage as string,
                selectedSort: params.selectedSort as string,
                toggleSort: params.toggleSort as string,
            }));

            const {activeCategories, toggleSort, selectedSort} = params;
            isSearch.current = !(activeCategories === '0' && toggleSort === 'true' && selectedSort === 'rating');
        }
    }, []);

    React.useEffect(() => {
        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [activeCategories, sort.sortProperty, toggleSort, searchValue, currentPage]);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                activeCategories,
                selectedSort: sort.sortProperty,
                toggleSort,
                currentPage
            }, {addQueryPrefix: true});

            navigate(queryString);
        }

        isMounted.current = true;
    }, [activeCategories, sort.sortProperty, toggleSort, currentPage]);

    const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index}/>);
    const pizzas = items
        .map((pizzaInfo) => <PizzaBlock {...pizzaInfo} key={pizzaInfo.id}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading === 'error'
                        ? <h2>Пицц не найдено</h2>
                        : isLoading === 'loading'
                            ? skeleton
                            : pizzas.length === 0 ? <h2>Пицц не найдено</h2> : pizzas
                }
            </div>
            <Pagination/>
        </div>
    )
}

export default Home;