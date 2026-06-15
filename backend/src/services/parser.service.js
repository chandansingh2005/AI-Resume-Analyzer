const fs = require('fs');
const pdfParse = require('pdf-parse');

async function extractTextFromPDF(filePath) {

    if (!fs.existsSync(filePath)) {
        throw new Error("PDF file not found");
    }

    const pdfBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(pdfBuffer);

    return data.text;
}

module.exports = { extractTextFromPDF };