document.getElementById('home').addEventListener('click', function () {
    window.history.pushState({page: "new"}, 'Home', "/");
    document.getElementById('body').classList.replace('dark', 'light');
    document.getElementById('subTitle').classList.replace('sub-title-hide', 'sub-title-show');
    document.getElementById('infoBox').classList.add('hide');
    document.getElementById('signature').classList.remove('signature-corner'); 
    setTimeout(function(){
      document.getElementById('subTitle').classList.remove('hide');
    }, 500)        
});

document.getElementById('footerYear').innerText = new Date().getFullYear();

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
    window.history.pushState({page: "new"}, name, "/"+url);
    var storedHTML = $(data);
    $('#infoBox').html($(storedHTML.find("#infoBox")).html())
    calculateExperience();
  });
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