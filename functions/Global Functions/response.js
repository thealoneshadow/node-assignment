
exports.responseGenerator = (res,status,succcess,message,result) => {

    if(!succcess){
        return res.status(status).json({
            success: succcess,
            message: message
        })
    }
    else{
        return res.status(status).json({
            success: succcess,
            message: message,
            result: [result]
        })
    }
}
