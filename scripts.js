document.getElementById('footerYear').innerText = new Date().getFullYear();

function homePage(){
  window.history.replaceState({page: "updated"}, 'Home', "/");
  document.getElementById('body').classList.replace('dark', 'light');
  document.getElementById('subTitle').classList.replace('sub-title-hide', 'sub-title-show');
  document.getElementById('infoBox').classList.add('hide');
  document.getElementById('infoBox').innerHTML = "";
  document.getElementById('signature').classList.remove('signature-corner');   
  toggleMenu();
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

function loadPage(name, url) {
  addContentClasses();
  $.get(url, function(data) {
    window.history.replaceState({page: "replaced"}, name, "/"+url.replace(".html", ""));
    var storedHTML = $(data);
    $('#infoBox').html($(storedHTML.find("#infoBox")).html())
    calculateExperience();
    toggleMenu();
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


function toggleMenu() {
  var sideMenu = document.getElementById('sideMenu');
  var menuToggle = document.getElementById('menuToggle');
  if (sideMenu.style.display === 'block') {
    sideMenu.style.display = 'none';
    menuToggle.innerText = '☰'
  } else {
    sideMenu.style.display = 'block';    
    menuToggle.innerText = '✕'
  }
}
