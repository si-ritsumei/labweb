

fetch("../json/presentations.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {

        articles = [];
        var day, i_title,i_link;

        var research_news_label = document.getElementById("output_field");
        var lang = research_news_label.classList.value;


        for (var label in jsonData) { //jsonDataの要素を取り出す
            articles = [];
            for(var article of jsonData[label]){
                var articles_ofyear = {
                    type: "presentation",
                    year: article.year,
                    month: article.month,
                    date: article.date,
                    text: checkLangage(lang,article.text) ? checkLangage(lang,article.text): null,
                    link_file: checkLangage(lang,article.link_file) ? checkLangage(lang,article.link_file): null ,
                    image: article.image,
                    note: article.note
                }
                articles.push(articles_ofyear);
            }
        }
        
        fetch("../json/papers.json")
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData2) {
                // jsonData2には2つ目のJSONデータが含まれています

                // ここでjsonData1とjsonData2を使って必要な処理を行います
                for (var label in jsonData2) { //jsonDataの要素を取り出す
                    for(var article of jsonData2[label]){
                        var articles_ofyear = {
                            type:"paper",
                            year: article.year,
                            month: article.month,
                            date: article.date,
                            lead_author:checkLangage(lang,article.lead_author) ? checkLangage(lang,article.lead_author): null,
                            paper_title: checkLangage(lang,article.paper_title) ? checkLangage(lang,article.paper_title): null,
                            publication: checkLangage(lang,article.publication) ? checkLangage(lang,article.publication): null,
                            link_file: checkLangage(lang,article.link_file) ? checkLangage(lang,article.link_file): null ,
                            image: article.image,
                            note: article.note
                        }
                        articles.push(articles_ofyear);
                    }

                }
                
                articles_sorted = sortByDate(articles);
                        
                //オブジェクトを出力する
                articles_sorted.forEach(function(article){
                    console.log("type:",article.type);
                    if(article.type === "presentation"){
                        print_presentation(article,research_news_label,lang);
                    }else if(article.type === "paper"){
                        print_paper(article,research_news_label,lang);
                    };
                });
            })


    })
    .catch(function(error) {
        console.log("エラーが発生しました: " + error);
    });


function sortByDate(articles) {
    articles.sort(function(a, b) {
        console.log("a:", a.year,a.month,a.date, "b:", b.year,b.month,b.date);
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

function day_sign(date){
    if (date == 1){
        return "st";
    }else if (date == 2){
        return "nd";
    }else{
        return "th";
    }
}

function create_date(lang, article){
    if (lang === "ja"){
        return article.year + "年" + article.month + "月" + article.date + "日"
    }else if (lang === "en"){
        return month_en(article.month) + " " + article.date + day_sign(article.date) + ", " + article.year;
    }
}


function checkLangage(lang, data) {
    if (lang === "ja"){
        return data.ja
    }else if(lang === "en"){
        return data.en
    }
}

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
    var div_col = document.createElement("div");
    div_col.classList.add("col");
    div_col.classList.add("s6");
    div_col.classList.add("m4");
    div_col.classList.add("l3");
    research_news_label.appendChild(div_col);

    var div_card = document.createElement("div");
    div_card.classList.add("card");
    div_card.classList.add("large");
    div_col.appendChild(div_card);

    console.log("link:"+article.link_file)
    var a_link = document.createElement("a");
    if (article.link_file !== null){
        a_link.href = "ResearchNews_articles/" + article.link_file;
    }
    div_card.appendChild(a_link);
    

    var card_image_div = document.createElement("div");
    card_image_div.classList.add("card-image");
    a_link.appendChild(card_image_div);

    
    var card_image = document.createElement("img");
    card_image.src = "img/" + article.image;
    card_image_div.appendChild(card_image);

    var card_content = document.createElement("div");
    card_content.classList.add("card-content");
    card_content.style.maxHeight = "70%";
    a_link.appendChild(card_content)

    var article_text = document.createElement("p");
    article_text.classList.add("grey-text");
    article_text.classList.add("text-darken-4");
    article_text.textContent = article.text;
    card_content.appendChild(article_text);

    article_text.appendChild(document.createElement("br"));

    var article_date = document.createElement("span");
    article_date.classList.add("d");
    article_date.textContent =  create_date(lang, article);
    article_text.appendChild(article_date);

    if(check_new(article)==="new"){
        console.log("new")
        var new_badge = document.createElement("span");
        new_badge.classList.add("new");
        new_badge.classList.add("badge");
        new_badge.classList.add("red");
        article_text.appendChild(new_badge);
    }
}

function print_paper(article,research_news_label,lang){
    var div_col = document.createElement("div");
    div_col.classList.add("col");
    div_col.classList.add("s6");
    div_col.classList.add("m4");
    div_col.classList.add("l3");
    research_news_label.appendChild(div_col);

    var div_card = document.createElement("div");
    div_card.classList.add("card");
    div_card.classList.add("large");
    div_col.appendChild(div_card);

    console.log("link:"+article.link_file)
    var a_link = document.createElement("a");
    a_link.classList.add("news")
    a_link.target="_blank";
    if (article.link_file !== null){
        a_link.href = article.link_file;
    }
    div_card.appendChild(a_link);

    var card_image_div = document.createElement("div");
    card_image_div.classList.add("card-image");
    a_link.appendChild(card_image_div);

    
    var card_image = document.createElement("img");
    card_image.src = "img/activity/" + article.image;
    card_image_div.appendChild(card_image);

    var card_content = document.createElement("div");
    card_content.classList.add("card-content");
    card_content.style.maxHeight = "70%";
    a_link.appendChild(card_content)

    
    var article_text = document.createElement("p");
    article_text.classList.add("grey-text");
    article_text.classList.add("text-darken-4");
    if (lang==="ja"){
        article_text.innerHTML=article.lead_author+"らの論文「" + article.paper_title + "」が<i>" + article.publication + "</i>に採録されました。"
    }else if(lang==="en"){
        article_text.innerHTML = article.lead_author + "'s paper titled \"" + article.paper_title + "\" has been accepted for<i>" + article.publication +"</i>."
    }
    card_content.appendChild(article_text);
    

    article_text.appendChild(document.createElement("br"));
    
    if(check_new(article)==="new"){
        console.log("new")
        var new_badge = document.createElement("span");
        new_badge.classList.add("new");
        new_badge.classList.add("badge");
        new_badge.classList.add("red");
        article_text.appendChild(new_badge);
    }

    var article_date = document.createElement("span");
    article_date.classList.add("d");
    article_date.textContent =  create_date(lang, article);
    article_text.appendChild(article_date);
}