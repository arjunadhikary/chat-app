const users = [];
const storeUsers = ({ id, username, room }) => {
    //Data Sanitize
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();
    //No Null Data
    if (!username || !room) {
        return { error: 'Enter UserName or Chatroom' }
    }
    const existingUser = users.find(user => {
        return user.username === username && user.room === room
    })
    if (existingUser) {
        return { error: 'User Exists Already' }
    }

    const user = { id, username, room }
    users.push(user)
    return  {user}

}
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    return users.splice(index, 1)[0]
}
const findBy = (id) => { return users.find(user => user.id === id) }
const findall = (room) => { return users.filter(user => user.room === room) }

module.exports ={
    storeUsers,
    removeUser,
    findBy,
    findall
}