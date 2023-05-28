import Button from '../../Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import SwitchButton from '../../SwitchButton';

const cx = classNames.bind(styles);
function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <div className={cx('container')}>
            <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
                {data.title}
            </Button>

            {data.switch ? (
                <div className={cx('switch-btn')}>
                    <SwitchButton></SwitchButton>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
export default MenuItem;
