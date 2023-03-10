import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../redux/store";
import {setCategoryID} from "../redux/filter/slice";

const Categories: React.FC = React.memo(() => {
    const dispatch = useDispatch();

    const activeCategories = useSelector((state: RootState) => state.filters.categoryID);
    const categories = useSelector((state: RootState) => state.filters.categories);

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
})


export default Categories;