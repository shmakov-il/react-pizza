import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setCategoryID} from "../redux/slices/fitlersSlice";

function Categories() {

    const dispatch = useDispatch();
    const activeCategories = useSelector((state: any) => state.filters.categoryID);
    const categories = useSelector((state: any) => state.filters.categories);

    return (
        <div className="categories">
            <ul>
                {categories.map((value: string, i: number) => {
                    return (
                        <li className={activeCategories === i ? 'active' : ''}
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