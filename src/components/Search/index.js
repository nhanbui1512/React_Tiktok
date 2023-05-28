import { useEffect, useState, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import * as searchServices from '../../service/searchServices';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountItem from '../AccountItem';
import styles from './Search.module.scss';
import { useDebounce } from '../../hooks';

const cx = classNames.bind(styles);

function Search({ dark = true }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setloading] = useState(false);

    const debounceValue = useDebounce(searchValue, 600);

    const inputRef = useRef();

    const classesSearch = cx('search', { dark });

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setloading(true);
            const result = await searchServices.search(debounceValue);

            setSearchResult(result);
            setloading(false);
        };
        fetchApi();
    }, [debounceValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        // them the div ngoai de fix warning tippy
        <div className={cx('search-container')}>
            <HeadlessTippy
                interactive={true}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result}></AccountItem>;
                            })}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={classesSearch}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')}></FontAwesomeIcon>}

                    <button className={cx('search-btn')} onMouseDown={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}
export default Search;
