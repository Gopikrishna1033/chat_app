const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error)
}


const errorHandler = (err,req,res,next)=>{
    console.log(res.statusCode);
    const statusCode = res.statusCode 
    res.status(statusCode)
    console.log(err.message)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === "production"? null :err.stack
    })
}
module.exports = {notFound,errorHandler}