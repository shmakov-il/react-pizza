import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectFilterSort, selectSortType, selectToggleSort} from "../redux/filter/selectors";
import {SortType} from "../redux/filter/types";
import {setSort, setToggleSort} from "../redux/filter/slice";


const Sort: React.FC = React.memo(() => {
    const dispatch = useDispatch();
    const selectedSort = useSelector(selectFilterSort);
    const sortType = useSelector(selectSortType);
    const toggleSort = useSelector(selectToggleSort);

    const [open, setOpen] = React.useState<boolean>(false);

    const sortRef = React.useRef<HTMLDivElement>(null);

    const changeSortType = (obj: SortType) => {
        dispatch(setSort(obj));
        setOpen(false);
    }

    React.useEffect(() => {
        const handleClickSort = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setOpen(false);
            }
        }

        document.body.addEventListener('click', handleClickSort);

        return () => document.body.removeEventListener('click', handleClickSort);
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <div className={!toggleSort ? "sort__button active" : "sort__button"}
                     onClick={() => dispatch(setToggleSort())}>
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                </div>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{selectedSort.name}</span>
            </div>
            {
                open && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sortType.map((value, i) => {
                                    return <li className={selectedSort.name === value.name ? 'active' : ''}
                                               onClick={() => changeSortType(value)}
                                               key={i}>{value.name}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
})

export default Sort;