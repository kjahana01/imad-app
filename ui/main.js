console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = 'New Value';

// Movre The Image 
var img = document.getElementById('madi');
var marginLeft =  0;
function moveRight () {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function() {
     var inteerval = setInterval(moveRight, 50);
};