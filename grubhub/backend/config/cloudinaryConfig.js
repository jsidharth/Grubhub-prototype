
import { config, uploader } from 'cloudinary';

const cloudinaryConfig = (req, res, next) => {
config({
    cloud_name: 'sidharth-image-upload',
    api_key: '966454399759437',
    api_secret: '4yeKdht7aUF9m06Zd8BKvKbwpIU',
});
next();
}
export { cloudinaryConfig, uploader };
