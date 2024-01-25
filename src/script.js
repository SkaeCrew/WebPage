function openMenu(){
    let menu = document.getElementById('menu');
    let nav = document.getElementById('nav')
    if(menu.classList.contains('-translate-x-full')){
        menu.classList.remove('-translate-x-full');
        menu.classList.add('-translate-x-0');
    }
    else{
        menu.classList.remove('-translate-x-0');
        menu.classList.add('-translate-x-full');
    }
    if(nav.classList.contains('bg-gray-700')){
        nav.classList.remove('bg-gray-700');
        nav.classList.add('bg-gray-800');
    }
    else{
        nav.classList.remove('bg-gray-800');
        nav.classList.add('bg-gray-700');    
    }
}


const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('my-show');
        } /*else{
            entry.target.classList.remove('my-show');
        }*/
    });
});

const hiddenElements = document.querySelectorAll('.my-hidden');
hiddenElements.forEach((el) => observer.observe(el));

//To recieve messages:
let message = false;

const form = document.getElementById('form');
const result = document.getElementById('result');


form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."
    let name = document.getElementById('name');
    let nameValue = name.value;
    let email = document.getElementById('email');
    let emailValue = email.value;
    let msg = document.getElementById('message');
    let msgValue = msg.value;
    
    if(nameValue != '' && emailValue != '' && msgValue != ''){
    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            console.log(response);
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-green-500");
            message = true;
            showToast();
          } else {
            console.log(response);
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-red-500");
            message = false;
            showToast();
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
          message = false;
          showToast();
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
    }
    else{
        message = false;
        showToast();
    }
});


function getMessage(){
    return message;
}

let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-solid fa-circle-check" style="color: #ffffff; margin: 0 20px; font-size: 35px;"></i> Successfully submitted!'
let errorMsg = '<i class="fa-solid fa-circle-xmark" style="color: #ffffff; margin: 0 20px; font-size: 35px;"></i> Not submitted - Please, fill all the fields!'

function showToast(){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    if(message){
        toast.innerHTML = successMsg;
    }

    else toast.innerHTML = errorMsg;
    toastBox.appendChild(toast);
    setTimeout(() =>{
        toast.remove();
    }, 3000)
}


window.onscroll = function(){
    if(document.documentElement.scrollTop > 50){
        document.getElementById('go-top-container').classList.add('go-top-container');
        document.getElementById('go-top-button').classList.add('go-top-button');
    }
    else{
        document.getElementById('go-top-container').classList.remove('go-top-container');
        document.getElementById('go-top-button').classList.remove('go-top-button');
    }
}

document.getElementById('go-top-button').addEventListener('click', () =>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})