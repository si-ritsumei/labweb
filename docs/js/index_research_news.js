

fetch("../json/research.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
      var articles = [];
      var day, i_title, i_link;

      var research_news_label = document.getElementById("output_research_news");
      var classes = research_news_label.classList;
      var lang;
      if (classes.contains("ja")) {
        lang = "ja";
      } else if (classes.contains("en")) {
        lang = "en";
      }

      articles = [];
      for (let article of jsonData["presentations"]) {
        let articles_ofyear = {
          type: "presentation",
          year: article.year,
          month: article.month,
          date: article.date,
          text: checkLangage(lang, article.text)
            ? checkLangage(lang, article.text)
            : null,
          link_file: checkLangage(lang, article.link_file)
            ? checkLangage(lang, article.link_file)
            : null,
          image: article.image,
          note: article.note,
        };
        articles.push(articles_ofyear);
      }

      for (let article of jsonData["papers"]) {
        let articles_ofyear = {
          type: "paper",
          year: article.year,
          month: article.month,
          date: article.date,
          lead_author: checkLangage(lang, article.lead_author)
            ? checkLangage(lang, article.lead_author)
            : null,
          paper_title: checkLangage(lang, article.paper_title)
            ? checkLangage(lang, article.paper_title)
            : null,
          publication: checkLangage(lang, article.publication)
            ? checkLangage(lang, article.publication)
            : null,
          link_file: checkLangage(lang, article.link_file)
            ? checkLangage(lang, article.link_file)
            : null,
          image: article.image,
          note: article.note,
        };
        articles.push(articles_ofyear);
      }

      articles_sorted = sortByDate(articles); //日にちでソートするメソッド

      //オブジェクトを出力
      var h5_col = document.createElement("h5");
      h5_col.classList.add("header");
      h5_col.classList.add("grey-text");
      h5_col.classList.add("text-darken-1");
      h5_col.textContent = "Research News";
      research_news_label.appendChild(h5_col);

      var a_research_news_link = document.createElement("a");
      if (lang === "ja") {
        a_research_news_link.href = "activity-ja.html";
      } else if (lang === "en") {
        a_research_news_link.href = "activity.html";
      }
      h5_col.appendChild(a_research_news_link);

      var font_view = document.createElement("font");
      font_view.setAttribute("size", "2");
      font_view.innerHTML = "　>>> View more";
      a_research_news_link.appendChild(font_view);

      var count = 0;

      //オブジェクトを出力する
      articles_sorted.forEach(function (article) {
        if (count >= 5) {
          return;
        }
        //console.log("type:",article.type);
        if (article.type === "presentation") {
          print_presentation(article, research_news_label, lang);
        } else if (article.type === "paper") {
          print_paper(article, research_news_label, lang);
        }

        count += 1;
      });
    })
    .catch(function(error) {
        console.log("エラーが発生しました: " + error);
    });

//日にちでソート
function sortByDate(articles) {
    articles.sort(function(a, b) {
        //console.log("a:", a.year,a.month,a.date, "b:", b.year,b.month,b.date);
        if (parseInt(a.year) === parseInt(b.year)){
            if (parseInt(a.month) === parseInt(b.month)){
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(b.month) - parseInt(a.month);
            }  
        } else {
            return parseInt(b.year) - parseInt(a.year);
        }
    });
    return articles;
}

//日にちの表記を英語表記にする
function day_sign(date){
    if (date == 1){
        return "st";
    }else if (date == 2){
        return "nd";
    }else{
        return "th";
    }
}

//日付の表記を作成
function create_date(lang, article){
    if (lang === "ja"){
        return article.year + "年" + article.month + "月" + article.date + "日"
    }else if (lang === "en"){
        return month_en(article.month) + " " + article.date + day_sign(article.date) + ", " + article.year;
    }
}

//表示言語を確認
function checkLangage(lang, data) {
    if (lang === "ja"){
        return data.ja
    }else if(lang === "en"){
        return data.en
    }
}

//月を英語表記に
function month_en(lang){
    switch(parseInt(lang)) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "Invalid month number";
    }
}

//新着記事かどうかを確認(1ヶ月以内の記事)
function check_new(article){
    const today = new Date(Date.now());

    var article_date = new Date(article.year, article.month - 1, article.date);
    article_date.setDate(article_date.getDate() + 30);

    if(article_date > today){
        return "new"
    }else{
        return null
    }
}

function print_presentation(article,research_news_label,lang){
    var div_row = document.createElement("div");
    div_row.classList.add("row");
    research_news_label.appendChild(div_row);

    var div_col = document.createElement("div");
    div_col.classList.add("col");
    div_col.classList.add("s3");
    div_row.appendChild(div_col);

    var a_link = document.createElement("a")
    if (article.link_file !== null){
        a_link.href = "ResearchNews_articles/" + article.link_file;
    }
    if(article.note === "book"){
        a_link.href = article.link_file;
    }
    a_link.classList.add("news");
    div_col.appendChild(a_link);
    
    var img = document.createElement("img");
    img.src = "img/research_news/presentation/" + article.year + "/" + article.image;
    img.style.width = "100%";
    a_link.appendChild(img);

    var div_text = document.createElement("div");
    div_text.classList.add("col");
    div_text.classList.add("s9");
    div_row.appendChild(div_text);

    var a_link2 = document.createElement("a")
    if(article.note === "book"){
        a_link2.href = article.link_file;
    }
    else if (article.link_file !== null){
        a_link2.href = "ResearchNews_articles/" + article.link_file;
    }
    a_link2.target="_blank";
    a_link2.innerHTML = article.text + "</br>";
    a_link2.classList.add("news");
    div_text.appendChild(a_link2);

    var span_date = document.createElement("span");
    span_date.classList.add("d")
    span_date.innerHTML = create_date(lang, article);
    div_text.appendChild(span_date);

    if(check_new(article)==="new"){
        //console.log("new");
        var new_badge = document.createElement("span");
        new_badge.classList.add("new");
        new_badge.classList.add("badge");
        new_badge.classList.add("red");
        div_text.appendChild(new_badge);
    }
}

function print_paper(article,research_news_label,lang){
    var div_row = document.createElement("div");
    div_row.classList.add("row");
    research_news_label.appendChild(div_row);

    var div_col = document.createElement("div");
    div_col.classList.add("col");
    div_col.classList.add("s3");
    div_row.appendChild(div_col);

    var a_link = document.createElement("a")
    a_link.target="_blank";
    if (article.link_file !== null){
        a_link.href = article.link_file;
    }
    a_link.classList.add("news");
    div_col.appendChild(a_link);

    
    var img = document.createElement("img");
    img.src = "img/research_news/paper/" + article.image;
    img.style.width = "100%";
    a_link.appendChild(img);

    var div_text = document.createElement("div");
    div_text.classList.add("col");
    div_text.classList.add("s9");
    div_text.target="_blank";
    div_row.appendChild(div_text);

    var a_link2 = document.createElement("a")
    a_link2.classList.add("news");
    if (article.link_file !== null){
        a_link2.href= article.link_file;
    }
    if (lang==="ja"){
        a_link2.innerHTML=article.lead_author+"らの論文「" + article.paper_title + "」が<i>" + article.publication + "</i>に採録されました。</br>"
    }else if(lang==="en"){
        a_link2.innerHTML = article.lead_author + "'s paper titled \"" + article.paper_title + "\" has been accepted for<i>" + article.publication +"</i>.</br>"
    }
    div_text.appendChild(a_link2);

    var span_date = document.createElement("span");
    span_date.classList.add("d")
    span_date.innerHTML = create_date(lang, article);
    div_text.appendChild(span_date);

    if(check_new(article)==="new"){
        //console.log("new");
        var new_badge = document.createElement("span");
        new_badge.classList.add("new");
        new_badge.classList.add("badge");
        new_badge.classList.add("red");
        div_text.appendChild(new_badge);
    }
}