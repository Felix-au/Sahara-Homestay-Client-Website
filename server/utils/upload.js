const axios = require('axios');
const FormData = require('form-data');

const uploadToImgBB = async (fileBuffer) => {
    const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
    const form = new FormData();
    form.append('image', fileBuffer.toString('base64'));

    try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });
        return response.data.data.url;
    } catch (error) {
        console.error('ImgBB Upload Error:', error.response?.data || error.message);
        throw new Error('Failed to upload image to ImgBB');
    }
};

module.exports = uploadToImgBB;
