$('#myNavbarJa').load("../nav-ja.html");
$('#myNavbar').load("../nav.html");
$('#myFooterJa').load("../footer-ja.html");
$('#myFooter').load("../footer.html");
window.onload = function() {
    $('.dropdown-trigger').dropdown({hover: true, constrain_width: false, coverTrigger: false});
}
