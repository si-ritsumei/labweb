$('#myNavbar').load("../nav.html", addActive);
$('#myFooter').load("../footer.html");

function addActive(eventObject) {
      // items in main menu
      var items = {'ja':['/index-ja.html', '/research-ja.html','/lablife-ja.html', '/publications-ja.html', '/joinus-ja.html'],
                    'en':['/index.html', '/research.html','/lablife.html', '/publications.html', '/joinus.html']}
      // items in about
      var subitems = {'ja':['/index-ja.html#lab-mission', '/index-ja.html#projects', '/index-ja.html#members','/contact-ja.html'],
                      'en':['/index.html#lab-mission', '/index.html#projects', '/index.html#members','/contact.html']}
      // items in research
      var subitems2 = {'ja':['/research-ja.html','/research_service-ja.html','/research_language-ja.html','/research_collab-ja.html'],
                      'en':['/research.html', '/research_service.html','/research_language.html','/research_collab.html']}
      // items in publication
      var subitems3 = {'ja':['/publications-ja.html', '/thesis-ja.html'],
                      'en':['/publications.html', '/thesis.html']}
      // items in lablife
      var subitems4 = {'ja':['/lablife-ja.html', '/activity-ja.html'],
                      'en':['/lablife.html', '/activity.html']}
      // items in joinus
      // var subitems4 = {'ja':['/joinus-ja.html', '/openlab2021.html'],
      //                 'en':['/joinus.html', '/openlab2021.html']}
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
          // for submenu of About
          if(i == 0){
              var j = 0;
              for(j in about){
                  about.eq(j).children().attr('href', subitems[lang][j]);
              }}
          // for submenu of Research
          else if(i == 1){
              var j = 0;
              var research = $('#research').children();
              for(j in research){
                  research.eq(j).children().attr('href', subitems2[lang][j]);
              }}
          // for submenu of Lab. Life
          else if(i == 2){
              var j = 0;
              var research = $('#lablife').children();
              for(j in research){
                  research.eq(j).children().attr('href', subitems4[lang][j]);
              }}
          // for submenu of Publication
          else if(i == 3){
              var j = 0;
              var research = $('#publication').children();
              for(j in research){
                  research.eq(j).children().attr('href', subitems3[lang][j]);
              }}

          // for submenu of joinus
          // else if(i == 4){
          //     var j = 0;
          //     var research = $('#joinus').children();
          //     for(j in research){
          //         research.eq(j).children().attr('href', subitems4[lang][j]);
          //     }}

          else{
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
          }
          else if(i == 1){
              var j = 0;
              var sideresearch = $('#sidenav-research').children();
              for(j in sideresearch){
                  sideresearch.eq(j).children().attr('href', subitems2[lang][j]);
              }
          }
          else if(i == 2){
              var j = 0;
              var sideresearch = $('#sidenav-lablife').children();
              for(j in sideresearch){
                  sideresearch.eq(j).children().attr('href', subitems4[lang][j]);
              }
          }
          else if(i == 3){
              var j = 0;
              var research = $('#sidenav-publication').children();
              for(j in research){
                  research.eq(j).children().attr('href', subitems3[lang][j]);
              }}

          // else if(i == 4){
          //     var j = 0;
          //     var research = $('#sidenav-joinus').children();
          //     for(j in research){
          //         research.eq(j).children().attr('href', subitems4[lang][j]);
          //     }}

          else{
              sidecontents.eq(i).children().attr('href', items[lang][i]);
          }
      }

      // set a url of each item in languages
      var i = 0;
      for(i in languages){
          if(i%2 == 0){
              languages.eq(i).children().attr('href', getPageInLanguage("ja"));
          }else{
              languages.eq(i).children().attr('href', getPageInLanguage("en"));
          }
      }
    }
function getPageInLanguage(targetLanguage){
    let currentPage = window.location.href
    let parts = currentPage.split("/")
    let link = "/" + parts[parts.length - 1]
    if (targetLanguage == "ja"){
        if (link =="/"){
            return "/index-ja.html"
        }
        else if (link.includes("-ja")){
            return link
        }
        else{
            return link.replace(".html","-ja.html")
        }
    }
    if (targetLanguage == "en"){
        if (link.includes("-ja")){
            return link.replace("-ja.html",".html")
        }
        else{
            return link
        }
    }

}
window.onload = function() {
    $('.dropdown-trigger').dropdown({hover: true, constrain_width: false, coverTrigger: false});
}
