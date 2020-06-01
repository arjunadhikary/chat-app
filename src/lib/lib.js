const getMsg =(message)=>{
    return {
        message,
        createdAt:new Date().getTime()
    }
}
const getUrl =(url)=>{
    return {
        url,
        createdAt:new Date().getTime()
    }
}
module.exports ={
    getMsg,
    getUrl
}