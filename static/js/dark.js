document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
document.getElementById("link").style.color = sessionStorage.getItem('cc');
function theme() {
     if ( sessionStorage.getItem('bg') === 'rgb(255, 255, 255)') {
         
            sessionStorage.setItem('bg', 'rgb(000, 000, 000)');
            sessionStorage.setItem('cc', '#aaaaaa');
 
     }
    else if (sessionStorage.getItem('bg') == null || undefined) {
        sessionStorage.setItem('bg', 'rgb(000, 000, 000)');
        sessionStorage.setItem('cc', '#aaaaaa');
                
    }
    else if( sessionStorage.getItem('bg') === 'rgb(000, 000, 000)') {
        
        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#000');

    }

document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
document.getElementById("link").style.color = sessionStorage.getItem('cc');
}