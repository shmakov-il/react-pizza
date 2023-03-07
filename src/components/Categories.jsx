import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCategoryID, setFilters} from "../redux/slices/fitlersSlice";
import qs from "qs";

function Categories() {

    const dispatch = useDispatch();
    const activeCategories = useSelector((state) => state.filters.categoryID);
    const categories = useSelector((state) => state.filters.categories);

    return (
        <div className="categories">
            <ul>
                {categories.map((value, i) => {
                    return (
                        <li className={activeCategories === i ? 'active' : null}
                            onClick={() => dispatch(setCategoryID(i))}
                            key={i}>
                            {value}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories;