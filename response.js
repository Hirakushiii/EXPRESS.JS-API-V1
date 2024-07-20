const Response = (statusCode, data , message , result) => {
    result.status(statusCode).json({
        'Status' : {
            'StatusCode' : statusCode,
            'Message' : message
        },
        'Data' : {
            'Results' : data
        }
    })
}

module.exports = Response