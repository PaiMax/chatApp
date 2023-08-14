let selectedOptions=[]; 
document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        //const curreng=localStorage.getItem('currentGroup');
        //showGroup(curreng);
        
        const token =localStorage.getItem('token');


         const usergropus=await axios.get('http://localhost:2000/usergroups/getdata',{headers:{"Authorization":token}});
         console.log(usergropus);
         for(const value of usergropus.data){
            const groups=await axios.get(`http://localhost:2000/group/get/data/${value.groupId}`);
            console.log('group data'+groups.data.data);
            showgroupbutton(groups.data.data);


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
        let currentgroup=localStorage.getItem('currentGroup');
        const response=await axios.post('http://localhost:2000/user/message',{message:message,group:currentgroup},{headers:{"Authorization":token}})
        const room=document.getElementById('room');
        const name=localStorage.getItem('name');
        if(response.data.message==='sucesss'){
            //localStorage.setItem('message',message);
            const child=`<p>${name}: ${message}</p>`;
            room.innerHTML+=child;

        }
        




    }
    catch(err){
        console.log(err);
    }
    
}
const openButton = document.getElementById('group');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');
const options=document.getElementById('mySelect');

openButton.addEventListener('click',async () => {
    const users=await axios.get('http://localhost:2000/user/get/name');
    console.log()
    for(const user of users.data.data){
       try{
        const child=`<option value=${user.name}>${user.name}</option>`;
        options.innerHTML+=child;


       }
       catch(err){
           console.log(err);
       }
    }
    overlay.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});












document.getElementById('mySelect').addEventListener('change',(event)=>{ 
    
    selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    console.log('Selected options:', selectedOptions);
});



async function showGroup(id){
    try{
    const maindiv=document.getElementById('windowdiv');
    localStorage.removeItem('messages');
    localStorage.setItem('currentGroup',id);


    const chatWindow=document.getElementById('room');
    chatWindow.innerText=localStorage.getItem('name');
    chatWindow.innerText+=' joined';
    let messageId;
    let messagesLocal;
    console.log("mesaagges= "+typeof(localStorage.getItem('messages')));
    if(localStorage.getItem('messages')===null){
        messageId='undefined';

    }
    
else{
     messagesLocal=JSON.parse(localStorage.getItem('messages'));
    messageId=messagesLocal[messagesLocal.length-1].id

    }
    let currentgroup=localStorage.getItem('currentGroup');
         
        
        
    
        
    
    
        const arrayofmessages=await axios.get(`http://localhost:2000/user/get/messages/${currentgroup}?messageId=${messageId}`)
        
        
        
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






    maindiv.style.display='block';
}
catch(err){console.log(err);}

    
}




 document.getElementById('submitform').addEventListener('click',addGroup);
  async function addGroup(e){
            try{
                e.preventDefault();
                const name=document.getElementById('groupname').value;
                
                console.log('submit button running');
            
                const res=await axios.post('http://localhost:2000/group/post/data',{groupName:name,users:selectedOptions});
                if(res.data.message==='sucess'){
                    showgroupbutton(res.data.groupdata);
                    
                    
        
        
                }
            
        
            }
            catch(err){
                console.log(err);
            }
           
        
            
             }




 async function showgroupbutton(groups){
           
            const name=groups.name;

            const parent =document.getElementById('formbuttonplace');
            const button=`<button onclick=showGroup("${groups.id}")>${name}</button>`;
            parent.innerHTML+=button;

        }




