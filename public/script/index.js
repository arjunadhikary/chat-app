const socket = io();
$selectForm=document.querySelector('form');
$selectBtn =$selectForm.querySelector('button');
$selectInput=$selectForm.querySelector('input');
$selectLoc = document.querySelector('#getlocation');


socket.on('message',(msg)=>{
console.log(msg)})

$selectForm.addEventListener('submit',(e)=>{
    e.preventDefault();
$selectBtn.setAttribute('disabled', 'disabled')
    let msg = e.target.elements.message.value
    socket.emit('sendMsg',msg,(error)=>{
        $selectBtn.removeAttribute('disabled')
        $selectInput.value=""
        $selectInput.focus()
        if(error){
            return console.log(error)
        }
        console.log('Delevered')
    })
})
$selectLoc.addEventListener('click',(e)=>{
    e.preventDefault();
    $selectLoc.setAttribute('disabled','Sharing')
    if(!navigator.geolocation){
        console.log( 'Geolocation Not Supported!!!')
    }
    navigator.geolocation.getCurrentPosition(position=>{
        socket.emit('location',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
},(data)=>{
    $selectLoc.removeAttribute('disabled')
            console.log('Location Shared With Server'+data)
        })
    })
})
socket.on('loc',(link)=>{
    document.querySelector('.sendlocation').textContent=link

})

