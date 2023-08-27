import classNames from 'classnames/bind';
import styles from './Saved.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context';

const cx = classNames.bind(styles);

function MainDetail({ icon, title, desc, userIcon = false }) {
    const context = useContext(ThemeContext);
    const Icon = icon;

    const classes = cx('wrapper', {
        dark: context.theme === 'dark' ? true : false,
    });
    return (
        <div className={classes}>
            <div className={cx('body')}>
                <div>
                    <Icon className={cx('icon', { userIcon })} />
                </div>
                <p className={cx('title')}>{title}</p>
                <p className={cx('desc')}>{desc}</p>
            </div>
        </div>
    );
}

export default MainDetail;
