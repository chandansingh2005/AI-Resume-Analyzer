const axios = require("axios");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(fileUrl) {
    console.log("Downloading resume from:", fileUrl);

    try {
        const response = await axios.get(fileUrl, {
            responseType: "arraybuffer",
            headers: {
                // Mimics a standard browser client to bypass automated bot mitigation layers
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        const data = await pdfParse(Buffer.from(response.data));
        return data.text;
    } catch (error) {
        if (error.response) {
            console.error("Cloudinary Response Error Status:", error.response.status);
            console.error("Error Headers:", error.response.headers);
            throw new Error(`Cloudinary download failed with status ${error.response.status}`);
        }
        throw error;
    }
}

module.exports = { extractTextFromPDF };