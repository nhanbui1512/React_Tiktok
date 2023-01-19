import { useState, forwardRef } from 'react';
import images from '../../../assests/images';
const Image = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handleErr = () => {
        setFallBack(images.noImage);
    };
    return <img src={fallBack || src} alt={alt} ref={ref} {...props} onError={handleErr} />;
});
export default Image;
