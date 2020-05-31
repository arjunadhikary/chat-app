const socket = io();
$selectForm = document.querySelector('form');
$selectBtn = $selectForm.querySelector('button');
$selectInput = $selectForm.querySelector('input');
$selectLoc = document.querySelector('#getlocation');
$selectMsg = document.querySelector('#message');
const htmlTemp = document.querySelector('#msg-temp').innerHTML

socket.on('message', (msg) => {
    console.log(msg)
    const html = Mustache.render(htmlTemp,{
        message:msg
    });
    $selectMsg.insertAdjacentHTML('beforeend',html)
})

$selectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $selectBtn.setAttribute('disabled', 'disabled')
    let msg = e.target.elements.message.value
    socket.emit('sendMsg', msg, (error) => {
        $selectBtn.removeAttribute('disabled')
        $selectInput.value = ""
        $selectInput.focus()
        if (error) {
            return console.log(error)
        }
        console.log('Delevered')
    })
})
$selectLoc.addEventListener('click', (e) => {
    e.preventDefault();
    $selectLoc.setAttribute('disabled', 'Sharing')
    if (!navigator.geolocation) {
        console.log('Geolocation Not Supported!!!')
    }
    navigator.geolocation.getCurrentPosition(position => {
        socket.emit('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (data) => {
            console.log('Location Shared With Server' + data);
            $selectLoc.removeAttribute('disabled')

        })
    })
})
socket.on('loc', (link) => {
    console.log(link)
})

