document.getElementById('footerYear').innerText = new Date().getFullYear();

window.addEventListener('popstate', (event) => {
  var prevUrl = event.state?.url;
  if(!prevUrl){
    return;
  }
   
  if(prevUrl === "/"){
    homePage(false);
    return;
  }

  loadPage(event.state.name, event.state.url, false);  
});

$(document).ready(function() {
  var url = window.location.pathname;  
  window.history.replaceState(
    {name: "", url: url === "/" || url.endsWith(".html") ? url : url + ".html"}, 
    "", url.replace(".html", ""));  
});

function homePage(pushState = true){
  if(pushState && window.location.pathname !== "/") {
    window.history.pushState({name: "Home", url: "/"}, "Home", "/");
  };
  document.getElementById('body').classList.replace('dark', 'light');
  document.getElementById('subTitle').classList.replace('sub-title-hide', 'sub-title-show');
  document.getElementById('infoBox').classList.add('hide');
  document.getElementById('infoBox').innerHTML = "";
  document.getElementById('signature').classList.remove('signature-corner');   
  toggleMenu(hide = true);
  setTimeout(function(){
    document.getElementById('subTitle').classList.remove('hide');
  }, 500) 
}

function addContentClasses() {        
    document.getElementById('body').classList.remove('light');        
    document.getElementById('body').classList.add('dark');
    document.getElementById('infoBox').classList.remove('hide');
    document.getElementById('subTitle').classList.remove('sub-title-show');      
    document.getElementById('subTitle').classList.add('sub-title-hide');
}

function loadPage(name, url, pushState = true) {
  addContentClasses();
  $.get(url, function(data) {
    var newUrl = "/"+url.replace(".html", "");
    if(pushState && window.location.pathname !== newUrl) {
      window.history.pushState({name, url}, name, newUrl);
    }    
    var storedHTML = $(data);
    $('#infoBox').html($(storedHTML.find("#infoBox")).html())
    calculateExperience();
    toggleMenu(hide = true);
  });
}

function toggleElement(id) {
  var element = document.getElementById(id);
  if(element.classList.contains('cookieShow')){    
    element.classList.replace('cookieShow', 'cookieHide');
  }
  else {    
    element.classList.remove('hide', 'cookieHide');
    element.classList.add('cookieShow');
  }
}

function calculateExperience() {
    const startDate = new Date("2019-03-13");
    const currentDate = new Date();
    let yearsDiff = currentDate.getFullYear() - startDate.getFullYear();

    // Adjust if the current date hasn't reached March 13 yet
    if (
        currentDate.getMonth() < startDate.getMonth() ||
        (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() < startDate.getDate())
    ) {
        yearsDiff--;
    }
    if(document.getElementById("yearsExp")){
      document.getElementById("yearsExp").innerText = yearsDiff;
    }
}


function toggleMenu(hide = false) {
  var sideMenu = document.getElementById('sideMenu');
  var menuToggle = document.getElementById('menuToggle');
  if (hide || sideMenu.style.display === 'block') {
    sideMenu.style.display = 'none';
    menuToggle.innerText = '☰'
  } else {
    sideMenu.style.display = 'block';    
    menuToggle.innerText = '✕'
  }
}
