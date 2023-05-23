import classNames from 'classnames/bind';
import styles from './AdjustVideo.module.scss';
import Button from '../../../components/Button';
import Image from '../../../components/Image';

const cx = classNames.bind(styles);

function AdjustVideo() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('edit-card')}>
                <div className={cx('video-info')}>
                    <div className={cx('video-index')}>
                        <span>1</span>
                    </div>
                    <div className={cx('video-cover')}>
                        <div className={cx('video-loadingBox')}></div>
                        <Image
                            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0ea272d422aef4cc6a1bcdd6020c9d09~c5_100x100.jpeg?x-expires=1684378800&x-signature=pkoe1OAxKLHbi3jmEMlQFpbPFJM%3D"
                            className={cx('video-imageCover')}
                        ></Image>
                    </div>
                    <div className={cx('video-basic')}>video basic</div>
                </div>
                <Button primary>Chỉnh sửa video</Button>
            </div>
            <div className={cx('split-card')}>slip card</div>
        </div>
    );
}

export default AdjustVideo;
