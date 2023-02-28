import React from "react";

function Categories({activeCategories, setActiveCategories}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((value, i) => {
                    return (
                        <li className={activeCategories === i ? 'active' : null}
                            onClick={() => setActiveCategories(i)}
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