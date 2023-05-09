import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { Wrapper as PopperWrapper } from '../../Popper';
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

import * as LocalService from '../../../service/local/cookie';

const cx = classNames.bind(styles);

const defFunc = () => {};

function Menu({ children, items = [], onChange = defFunc }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const handleLogout = () => {
        LocalService.removeToken();
        window.location.replace('/');
    };

    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            const handleChangeItem = () => {
                if (isParent) {
                    setHistory((prev) => [...prev, item.children]);
                } else {
                    onChange(item);
                }
            };

            return (
                <MenuItem key={index} data={item} onClick={item.separate ? handleLogout : handleChangeItem}></MenuItem>
            );
        });
    };
    return (
        <HeadlessTippy
            offset={[12, 8]}
            interactive
            delay={[0, 700]}
            placement="bottom-end"
            hideOnClick={false}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            ></Header>
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => {
                setHistory((prev) => prev.slice(0, 1));
            }}
        >
            {children}
        </HeadlessTippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
    onChange: PropTypes.func,
};
export default Menu;
