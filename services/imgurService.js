import axios from "axios"



const uploadImg = async (img) => {

    const clientId = process.env.IMGUR_CLIENT_ID

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Client-ID ${clientId}`
    };

    const formData = new FormData();
    formData.append('image', img)

    // Make a POST request to a URL with the specified data
    try {
        // Make a POST request to a URL with the specified data
        const response = await axios.post('https://api.imgur.com/3/image', formData, { headers });
        return response.data.data.id; // Return data for further processing if needed
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-throw the error for handling at a higher level
    }
}

export { uploadImg }