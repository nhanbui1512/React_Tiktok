import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import videos from '../../../assests/videos';
import { useRef, useState, useContext, useEffect } from 'react';
import { UploadContext } from '..';

const cx = classNames.bind(styles);

function Slider() {
  const context = useContext(UploadContext);

  const [slidePosition, setSlidePosition] = useState(0);
  const videoRef = useRef();
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    function loaded() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // Xác định bước thời gian giữa các ảnh (ms)
      var frameInterval = 100; // Ví dụ: mỗi 100ms lấy một frame

      // Khi video đã sẵn sàng
      let counter = 0;

      canvas.width = currentVideoRef.offsetWidth;
      canvas.height = currentVideoRef.offsetHeight;

      const result = [];

      function myFunction() {
        // Lấy ra mốc thời gian cần cắt
        const step = 0.125; // vì 8 ảnh nên 1 step là 0.125
        const currentTime = Math.floor(step * counter * currentVideoRef.duration);
        currentVideoRef.currentTime = currentTime;

        // Vẽ frame hiện tại lên canvas
        ctx.drawImage(currentVideoRef, 0, 0, canvas.width, canvas.height);
        // Lấy dữ liệu hình ảnh từ canvas
        var imageData = canvas.toDataURL('image/png');

        result.push(imageData);
        counter++;

        if (counter >= 8) {
          clearInterval(intervalId);
          setPreviewImages(result);
        }
      }

      const intervalId = setInterval(myFunction, frameInterval);
    }

    currentVideoRef.addEventListener('loadeddata', loaded);
  }, []);
  return (
    <div className={cx('slider-container')}>
      <div className={cx('header')}>
        <p>Ảnh bìa</p>
      </div>
      <div className={cx('slider')}>
        <div className={cx('list-image')}>
          {previewImages.map((image, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${image})`,
              }}
              className={cx('image-preview')}
            ></div>
          ))}
        </div>
        <div
          style={{
            '--slide-data': `${slidePosition}%`,
          }}
          className={cx('video-preview-wrapper')}
        >
          <video ref={videoRef} src={context.file.preview || videos.linhMai} />
        </div>
        <input
          onInput={(e) => {
            const percent = e.target.value;
            const targetTime = (percent * videoRef.current.duration) / 100;
            videoRef.current.currentTime = targetTime;

            if (percent < 86) {
              setSlidePosition(percent);
            } else {
              setSlidePosition(85);
            }
          }}
          type="range"
          className={cx('ranger')}
        />
      </div>
    </div>
  );
}
export default Slider;
