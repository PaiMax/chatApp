
document.addEventListener('DOMContentLoaded',()=>{
    const chatWindow=document.getElementById('room');
    chatWindow.innerText=localStorage.getItem('name');
    chatWindow.innerText+=' joined';


})
document.getElementById('send').addEventListener('click',sendMessage);
async function sendMessage(){
    try{

        const message=document.getElementById('text').value;
        const token =localStorage.getItem('token');
        const response=await axios.post('http://localhost:2000/user/message',{message:message},{headers:{"Authorization":token}})
        const room=document.getElementById('room');
        const name=localStorage.getItem('name');
        if(response.data.message==='sucesss'){
            const child=`<p>${name}: ${message}</p>`;
            room.innerHTML+=child;

        }
        




    }
    catch(err){
        console.log(err);
    }
    
}


