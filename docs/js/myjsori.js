$('#myNavbar').load("../nav.html", addActive);
$('#myFooter').load("../footer.html");

function addActive(eventObject) {
      // items in main menu
      var items = {'ja':['index-ja.html', 'lablife-ja.html', 'publications-ja.html', 'joinus-ja.html', 'contact-ja.html'],
                    'en':['index.html', 'lablife.html', 'publications.html', 'joinus.html', 'contact.html']}
      // items in about
      var subitems = {'ja':['index-ja.html#lab-mission', 'index-ja.html#projects', 'index-ja.html#members'],
                      'en':['index.html#lab-mission', 'index.html#projects', 'index.html#members']}
      var activeNum = $('#myNavbar').data("active");
      var lang = $('#myNavbar').data("language");
      var contents = $('#nav-pc').children();
      var about = $('#about').children();
      var languages = $('#languages, #sidenav-languages').children();

      // navigation var setting
      $('#logo-container').attr('href', items[lang][0]);

      var i = 0;

      for(i in contents) {
          if(i == 5) break;
          if(i == activeNum) {
              contents.eq(i).addClass('active');
          }
          // set a url of each item in menu and submenu
          if(i == 0){
              var j = 0;
              for(j in about){
                  about.eq(j).children().attr('href', subitems[lang][j]);
              }
          }else{
              contents.eq(i).children().attr('href', items[lang][i]);
          }
      }

      // side-navigation var setting
      var sidecontents = $('#nav-mobile').children();
      var sideabout = $('#sidenav-about').children();
      var i = 0;
      for(i in sidecontents) {
          if(i == 5) break;
          if(i == activeNum) {
              sidecontents.eq(i).addClass('active');
          }
          // set a url of each item in menu and submenu
          if(i == 0){
              var j = 0;
              for(j in about){
                  sideabout.eq(j).children().attr('href', subitems[lang][j]);
              }
          }else{
              sidecontents.eq(i).children().attr('href', items[lang][i]);
          }
      }

      // set a url of each item in languages
      var i = 0;
      for(i in languages){
          if(i%2 == 0){
              languages.eq(i).children().attr('href', items['ja'][activeNum]);
          }else{
              languages.eq(i).children().attr('href', items['en'][activeNum]);
          }
      }
    }

window.onload = function() {
    $('.dropdown-trigger').dropdown({hover: true, constrain_width: false, coverTrigger: false});
}
