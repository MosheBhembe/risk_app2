
const test = (Request, Response) => {
    return Response.status(200).json({
        data: 'this is fully functional'
    }); 
}

module.exports = test; 