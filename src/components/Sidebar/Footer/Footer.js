import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import Image from '../../Image';
import images from '../../../assests/images';
import { StyledIcon } from '../../Icons';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context';

const cx = classNames.bind(styles);

function Footer() {
    const context = useContext(ThemeContext);

    return (
        <div className={cx(['wrapper', context.theme])}>
            <div className={cx('effect_house_container')}>
                <Link className={cx('image_container')}>
                    <Image className={cx('background_image')} src={images.backGround}></Image>
                    <div className={cx('text_container')}>
                        <StyledIcon className={cx('icon')}></StyledIcon>

                        <h4>Create Effect</h4>
                    </div>
                </Link>
            </div>

            <div className={cx('link_container')}>
                <Link className={cx('link_item')}>Giới thiệu</Link>
                <Link className={cx('link_item')}>Bảng tin</Link>
                <Link className={cx('link_item')}>Liên hệ</Link>
                <Link className={cx('link_item')}>Sự nghiệp</Link>
                <Link className={cx('link_item')}>ByteDance</Link>
            </div>
            <div className={cx('link_container')}>
                <Link className={cx('link_item')}>TikTok for Good</Link>
                <Link className={cx('link_item')}>Quảng cáo</Link>
                <Link className={cx('link_item')}>Developers</Link>
                <Link className={cx('link_item')}>Minh bạch</Link>
                <Link className={cx('link_item')}>TikTok Rewards</Link>
                <Link className={cx('link_item')}>TikTok Browse</Link>
                <Link className={cx('link_item')}>TikTok Embeds</Link>
            </div>

            <div className={cx('link_container')}>
                <Link className={cx('link_item')}>Trợ giúp</Link>
                <Link className={cx('link_item')}>An toàn</Link>
                <Link className={cx('link_item')}>Điều khoản</Link>
                <Link className={cx('link_item')}>Quyền riêng tư</Link>
                <Link className={cx('link_item')}>Cổng thông tin Tác giả</Link>
                <Link className={cx('link_item')}>Hướng dẫn Cộng đồng</Link>
            </div>
            <div className={cx('link_container')}>
                <Link className={cx('link_item')}>Thêm</Link>
            </div>
            <span className={cx('coppy_right')}>© 2023 TikTok</span>
        </div>
    );
}

export default Footer;
