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
