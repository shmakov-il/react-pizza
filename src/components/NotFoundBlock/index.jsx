import React from "react";

import styles from "./NotFoundBlock.module.scss"


function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1>
                <span className={styles.smile}>😕</span>
                <br/>
                Ничего не найдено
            </h1>
            <p>К сожалению, данная страница отсутствует в нашем интернет-магазине.</p>
        </div>
    )

}

export default NotFoundBlock;