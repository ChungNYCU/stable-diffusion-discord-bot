import axios from 'axios';

const txt2img = async (reqBody) => {
    const endpoint = process.env.SD_ENDPOINT
    try {
        // Make a POST request to a URL with the specified data
        const response = await axios.post(endpoint, reqBody);
        //console.log('Response:', response.data);
        return response.data.images[0];
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}

export { txt2img };