
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



    }
    catch(err){
        console.log(err);
    }
    
}


