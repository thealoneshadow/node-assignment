
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


exports.newResponseGenerator = (res,status,succcess,message,result) => {

    if(!succcess){
        return res.status(status).json({
            success: succcess,
            isAuth: true,
            errorCode: -1,
            message: message,
            result: []
        })
    }
    else{
        return res.status(status).json({
            success: succcess,
            isAuth: true,
            message: message,
            result: [result]
        })
    }
}