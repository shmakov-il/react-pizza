import React from "react";
import {useSelector, useDispatch} from "react-redux";
import ReactPaginate from 'react-paginate';
import {setCurrentPage} from "../../redux/slices/fitlersSlice";
import {RootState} from "../../redux/store";
import styles from './Pagination.module.scss';

const Pagination: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.filters.currentPage)

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
            />
        </div>
    )
}

export default Pagination;