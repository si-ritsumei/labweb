$('#myNavbarJa').load("../nav-ja.html");
$('#myNavbar').load("../nav.html");
window.onload = function() {
    $('.dropdown-trigger').dropdown({hover: true, constrain_width: false, coverTrigger: false});
}
