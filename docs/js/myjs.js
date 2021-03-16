$('#myNavbar').load("../nav.html", addActive);
$('#myFooter').load("../footer.html");

function addActive(eventObject) {
      var items = {'ja':['index-ja.html#research', 'lablife-ja.html', 'publications-ja.html', 'joinus-ja.html', 'contact-ja.html'],
                    'en':['index.html#research', 'lablife.html', 'publications.html', 'joinus.html', 'contact.html']}
      var contents = $('#nav-pc').children();
      var activeNum = $('#myNavbar').data("active");
      var languages = $('#languages, #sidenav-languages').children();
      var lang = $('#myNavbar').data("language");

      var i = 0;
      for(i in contents) {
          // console.log(items[lang][i])
          // console.log(i)
          // console.log(contents.eq(i))
          if(i == 5) break;
          if(i == activeNum) {
              contents.eq(i).addClass('active');
          }
          contents.eq(i).children().attr('href', items[lang][i]);
      }

      var i = 0;
      for(i in languages){
          if(i/2 == 0){
              languages.eq(i).children().attr('href', items['ja'][activeNum]);
          }else{
              languages.eq(i).children().attr('href', items['en'][activeNum]);
          }
      }
    }

window.onload = function() {
    $('.dropdown-trigger').dropdown({hover: true, constrain_width: false, coverTrigger: false});
}
