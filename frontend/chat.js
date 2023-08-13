
document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const chatWindow=document.getElementById('room');
        chatWindow.innerText=localStorage.getItem('name');
        chatWindow.innerText+=' joined';
        let messageId;
        let messagesLocal;
        if(localStorage.getItem('messages')==='undefined'){
            messageId='undefined';

        }
        
    else{
         messagesLocal=JSON.parse(localStorage.getItem('messages'));
        messageId=messagesLocal[messagesLocal.length-1].id

        }
        
    
        
    
    
        const arrayofmessages=await axios.get(`http://localhost:2000/user/get/messages?messageId=${messageId}`)
        let  mergedArray=[];
        console.log(arrayofmessages.data.message.length);
        
        if(messagesLocal!=null){
            if(messagesLocal.length===10){
                messagesLocal.splice(0,arrayofmessages.data.message.length);
               }
             mergedArray=[...messagesLocal,...arrayofmessages.data.message];

        }
        else{
            mergedArray=arrayofmessages.data.message;

        }
            
    
        localStorage.setItem('messages',JSON.stringify(mergedArray));
        const addmessages=JSON.parse(localStorage.getItem('messages'));
        
        for(const element of addmessages){
            try{
                const username=await axios.get(`http://localhost:2000/user/get/userData/${element.userId}`)
                console.log(username);
                const child2=`<p>${username.data.data.name}: ${element.message}</p>`
                chatWindow.innerHTML+=child2;

            }
            catch(err){
                console.log(err)

            }
        }
        

    }
    catch(err){
        console.log(err);
    }
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
            localStorage.setItem('message',message);
            const child=`<p>${name}: ${message}</p>`;
            room.innerHTML+=child;

        }
        




    }
    catch(err){
        console.log(err);
    }
    
}


