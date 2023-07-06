import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMoon,
    faPlus,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '../../config';

import styles from './Header.module.scss';
import images from '../../assests/images';
import Menu from '../Popper/Menu';
import Button from '../Button';
import { MessageIcon, InboxIcon } from '../Icons';
import Image from '../Image';
import Search from '../Search';

import { ThemeContext } from '../../Context';
import { useContext } from 'react';

import PopperLogin from '../PopperLogin';

const cx = classNames.bind(styles);

function Header({ className, isFullWidth = false }) {
    const context = useContext(ThemeContext);
    // const currentUser = isLogin;

    const handleLoginClick = () => {
        context.setLoginPopper(!context.loginPopper);
    };

    const classesWrapper = cx(['wrapper', context.theme]);

    const classesInner = cx('inner', {
        [className]: className,
        isFullWidth,
    });

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'Language':
                // handle
                break;
            default:
            // handle
        }
    };

    var menuItem = context.currentUser
        ? [
              {
                  icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>,
                  title: 'View profile',
                  to: `/@${context.user.nickname}`,
              },
              {
                  icon: <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>,
                  title: 'Get coins',
                  to: '/coin',
              },
              {
                  icon: <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>,
                  title: 'Setting',
                  to: '/settings',
              },
              {
                  icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
                  title: 'English',
                  children: {
                      title: 'Language',
                      data: [
                          {
                              type: 'Language',
                              code: 'en',
                              title: 'English',
                          },
                          {
                              type: 'Language',
                              code: 'vi',
                              title: 'Tiếng Việt',
                          },
                      ],
                  },
              },

              {
                  icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
                  title: 'Feedback and Help',
                  to: '/feedback',
              },
              {
                  icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
                  title: 'Keyboard shorcuts',
              },
              {
                  icon: <FontAwesomeIcon icon={faMoon} />,
                  switch: true,
                  title: 'Dark Mode',
              },
              {
                  icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
                  title: 'Log out',
                  separate: true,
              },
          ]
        : [
              {
                  icon: <FontAwesomeIcon icon={faEarthAsia}></FontAwesomeIcon>,
                  title: 'English',
                  children: {
                      title: 'Language',
                      data: [
                          {
                              type: 'Language',
                              code: 'en',
                              title: 'English',
                          },
                          {
                              type: 'Language',
                              code: 'vi',
                              title: 'Tiếng Việt',
                          },
                      ],
                  },
              },
              {
                  icon: <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>,
                  title: 'Feedback and Help',
                  to: '/feedback',
              },
              {
                  icon: <FontAwesomeIcon icon={faKeyboard}></FontAwesomeIcon>,
                  title: 'Keyboard shorcuts',
              },
              {
                  icon: <FontAwesomeIcon icon={faMoon} />,
                  switch: true,
                  title: 'Dark Mode',
              },
          ];

    return (
        <header className={classesWrapper}>
            <div className={classesInner}>
                <Link to={config.routes.root} className={cx('logo')}>
                    <img src={context.theme === 'dark' ? images.logoDark : images.logo} alt="tiktok"></img>
                </Link>

                {/* search  */}

                <Search />

                <div className={cx('actions', { dark: context.theme === 'dark' ? true : false })}>
                    {context.currentUser ? (
                        <>
                            <Button
                                dark={context.theme === 'dark' ? true : false}
                                leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                                divbox
                                to="/upload"
                                text
                                className={cx('upload_btn')}
                            >
                                Upload
                            </Button>

                            <Tippy delay={[0, 200]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button
                                dark={context.theme === 'dark' ? true : false}
                                primary={false}
                                leftIcon={<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>}
                                divbox
                                to="/upload"
                                text
                            >
                                Upload
                            </Button>
                            <Button
                                className={cx('login-btn')}
                                onClick={() => {
                                    context.setLoginPopper(true);
                                }}
                                primary
                            >
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={menuItem} onChange={handleMenuChange}>
                        {context.currentUser ? (
                            <Image src={context.user.avatar} className={cx('user-avatar')} alt="Nguyen Van A" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>

            {context.loginPopper && (
                <Tippy onClickOutside={() => context.setLoginPopper(false)}>
                    <>
                        <PopperLogin handleClose={handleLoginClick}></PopperLogin>
                    </>
                </Tippy>
            )}
        </header>
    );
}
export default Header;
