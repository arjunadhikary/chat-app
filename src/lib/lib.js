const getMsg =(username,message)=>{
    return {
        message,
        createdAt:new Date().getTime(),
        username
    }
}
const getUrl =(username,url)=>{
    return {
        url,
        createdAt:new Date().getTime(),
        username
    }
}
module.exports ={
    getMsg,
    getUrl
}