document.addEventListener('submit',loginUser);
const email=document.getElementById('email');
const password=document.getElementById('password');
function loginUser(event){
    
    event.preventDefault();
    axios.post('http://localhost:2000/user/login',{email:email.value,password:password.value})
    .then((res)=>{
        console.log('in event');
        const para=document.getElementById('para');
        console.log(res.data.message);
        para.innerText=res.data.message;
        if(res.data.message!="Password does'nt match"&& res.data.message!="User does'nt exist"){
            
            window.location.href='';


        }
        
    })
    .catch(err=>console.log(err));


}
document.getElementById('signup').addEventListener('click',sign);
function sign(){
    window.location.href='../signup/signup.html';

}