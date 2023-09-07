var timer;
var img;
var count = 0;
var i = 1;
function showSlot(){
    img = document.getElementById("img"+String(i));
    img.src = "animals/animal"+ ((count + number)%5 + 1) +".png";
    count = count + 1;
    if(count == 5){
        clearInterval(timer);
        if (i<3){
            i = i+1;
            count = 0;
            startSlot();
        }
    }
}
function startSlot(){
    number = Math.floor(Math.random()*5)+1;
    timer = setInterval(showSlot,500);
}