
const test = (req, res, next) => {
    try {
        const image = req.file;
        console.log("uploaded file:", image);

        if (image) {
            return res.status(200).json({
                message: 'file uploaded successfully',
                file: image,
            })
        } else {
            return res.status(400).json({
                message: 'No file uploaded',
            })
        }
    } catch (error) {
        console.log('error handling file upload', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

module.exports = test; 