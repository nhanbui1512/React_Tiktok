import Button from '../../Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import SwitchButton from '../../SwitchButton';

import { ThemeContext } from '../../../Context';
import { useContext } from 'react';

const cx = classNames.bind(styles);
function MenuItem({ className, primary = false, data, onClick }) {
  const context = useContext(ThemeContext);

  const classes = cx('menu-item', {
    [className]: className,
    separate: data.separate,
    primary: primary,
  });
  return (
    <div className={cx('container')}>
      <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
        {data.title}
      </Button>

      {data.switch ? (
        <div className={cx('switch-btn')}>
          <SwitchButton
            isChecked={context.theme === 'dark' ? true : false}
            handleOnClick={context.toggleTheme}
          ></SwitchButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default MenuItem;
