import React from "react";
import debounce from "lodash.debounce";
import {setSearchValues} from "../../redux/slices/fitlersSlice";
import styles from "./Search.module.scss";
import {useDispatch} from "react-redux";

function Search() {
    const dispatch = useDispatch();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [searchInput, setSearchInput] = React.useState<string>('');

    const updateSearchInput = React.useCallback(debounce((value) => {
            console.log(value)
            dispatch(setSearchValues(value));
        }, 500),
        []);

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        updateSearchInput(inputRef.current?.value);
    }

    const clearInput = () => {
        dispatch(setSearchValues(''));
        setSearchInput('');
        inputRef.current?.focus();
    };

    return (
        <div className={styles.root}>
            <svg className={styles.search} height="512px" viewBox="0 0 512 512" width="512px">
                <path
                    d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z"
                />
            </svg>
            <input className={styles.input}
                   ref={inputRef}
                   placeholder="Поиск пиццы..."
                   onChange={(event) => onChangeInput(event)}
                   value={searchInput}/>
            {searchInput &&
                <svg className={styles.clear}
                     onClick={clearInput}
                     height="48" viewBox="0 0 48 48" width="48">
                    <path
                        d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
                    <path d="M0 0h48v48H0z" fill="none"/>
                </svg>
            }
        </div>

    )
}

export default Search;