import React from "react";
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({setPagePagination}) {
    return (
        <div className={styles.root}>
            <ReactPaginate className={styles.pagination}
                           breakLabel="..."
                           nextLabel=">"
                           previousLabel="<"
                           onPageChange={(event) => setPagePagination(event.selected + 1)}
                           pageRangeDisplayed={5}
                           pageCount={3}
                           renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination;