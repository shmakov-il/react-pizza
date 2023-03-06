import React from "react";
import {useSelector, useDispatch} from "react-redux";
import ReactPaginate from 'react-paginate';
import {setCurrentPage} from "../../redux/slices/fitlersSlice";

import styles from './Pagination.module.scss';

function Pagination() {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.filters.currentPage)

    return (
        <div className={styles.root}>
            <ReactPaginate className={styles.pagination}
                           breakLabel="..."
                           nextLabel=">"
                           previousLabel="<"
                           onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
                           pageRangeDisplayed={5}
                           pageCount={3}
                           forcePage={currentPage - 1}
                           renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination;