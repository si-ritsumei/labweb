

fetch("../json/lablife.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {

        articles = [];
        var day, i_title,i_link;


        var lablife_label = document.getElementById("output_lablife");
        var classes = lablife_label.classList;
        var lang;
        if (classes.contains("ja")) {
            lang = "ja";
          } else if (classes.contains("en")){
            lang = "en";
          }


        for (var label in jsonData) { //jsonDataの要素を取り出す
            articles = [];
            for(var article of jsonData[label]){
                var articles_ofyear = {
                    year: article.year,
                    month: article.month,
                    date: article.date,
                    title: checkLangage(lang,article.title) ? checkLangage(lang,article.title): null,
                    link_file: checkLangage(lang,article.link_file) ? checkLangage(lang,article.link_file): null ,
                    image: article.image,
                    note: article.note
                }
                articles.push(articles_ofyear);
            }
        }

        //日付でソート
        articles.sort(function(a, b) {
            //console.log("a.date:", a.date, typeof a.date);
            //console.log("b.date:", b.date, typeof b.date);
            if (parseInt(a.year) == parseInt(b.year)){
                if (parseInt(a.month) == parseInt(b.month)){
                    return parseInt(b.date)-parseInt(a.date);
                }else{
                    return parseInt(b.month) - parseInt(a.month);
                }  
            }else{
                return parseInt(b.year) - parseInt(a.year);
            }
        });

        //オブジェクトを出力
        var h5_col = document.createElement("h5");
        h5_col.classList.add("header");
        h5_col.classList.add("grey-text");
        h5_col.classList.add("text-darken-1");
        h5_col.textContent = "Lab News";
        lablife_label.appendChild(h5_col);

        var a_lablife_link = document.createElement("a");
        if (lang==="ja"){
            a_lablife_link.href = "lablife-ja.html"
        }else if(lang==="en"){
            a_lablife_link.href = "lablife.html"
        }
        h5_col.appendChild(a_lablife_link);

        var font_view = document.createElement("font");
        font_view.setAttribute("size", "2");
        font_view.innerHTML="　>>> View more";
        a_lablife_link.appendChild(font_view);


        var count = 0;
        articles.forEach(function(article){
            if (count >= 5){
                return;
            }
            var div_col = document.createElement("div");
            div_col.classList.add("row");
            lablife_label.appendChild(div_col);
            
            var a_link = document.createElement("a")
            a_link.href="Lablife_articles/" + article.link_file;
            a_link.classList.add("news");
            div_col.appendChild(a_link);

            var div_img = document.createElement("div");
            div_img.classList.add("col");
            div_img.classList.add("s3");
            a_link.appendChild(div_img);

            var img = document.createElement("img");
            img.src = "img/event_news/" + article.year + "/" + article.image;
            img.style.width = "100%";
            div_img.appendChild(img);

            var div_title = document.createElement("div");
            div_title.classList.add("col");
            div_title.classList.add("s9");
            div_title.innerHTML = article.title + "</br>";
            a_link.appendChild(div_title);

            var span_date = document.createElement("span");
            span_date.classList.add("d")
            span_date.innerHTML = create_date(lang, article);
            div_title.appendChild(span_date);

            if(check_new(article)==="new"){
                //console.log("new");
                var new_badge = document.createElement("span");
                new_badge.classList.add("new");
                new_badge.classList.add("badge");
                new_badge.classList.add("red");
                div_title.appendChild(new_badge);
            }

            count += 1;

        });





    })
    .catch(function(error) {
        console.log("エラーが発生しました: " + error);
    });

//日にちを英語表記にする
function day_sign(date){

    if (date == 1){
        return "st";
    }else if (date == 2){
        return "nd";
    }else{
        return "th";
    }

}

//日付を英語表記にする
function create_date(lang, article){
    if (lang === "ja"){
        return article.year + "年" + article.month + "月" + article.date + "日"
    }else if (lang === "en"){

        return month_en(article.month) + " " + article.date + day_sign(article.date) + ", " + article.year;
    }
}

//表示言語を確認する
function checkLangage(lang, data) {
    if (lang === "ja"){
        return data.ja
    }else if(lang === "en"){
        return data.en
    }
}

//月を英語表記にする
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

//新着の記事かどうかを確認(1ヶ月以内の記事)
function check_new(article){
    var today = new Date(Date.now());
    var article_date = new Date(article.year,article.month,article.date);
    if(article_date > today){
        return "new";
    }else{
        return null;
    }
}