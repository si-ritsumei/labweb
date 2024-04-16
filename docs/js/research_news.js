
Promise.all([
    fetch("../json/presentation.json").then(response => response.json()),
    fetch("../json/paper.json").then(response => response.json())
]).then(([presentationData, paperData]) => {
    articles = [];
    var lablife_label = document.getElementById("output_field");
    var lang = lablife_label.classList.value;

    for (var label in presentationData) { //presentationDataの要素を取り出す
        articles = [];
        for(var presentation of presentationData[label]){
            var presentations_ofyear = {
                type: "presentation",
                year: presentation.year,
                month: presentation.month,
                date: presentation.date,
                title: checkLangage(lang,presentation.title) ? checkLangage(lang,presentation.title): null,
                link_file: checkLangage(lang,presentation.link_file) ? checkLangage(lang,presentation.link_file): null ,
                image: presentation.image,
                note: presentation.note
            }
            articles.push(presentations_ofyear);
        }
        for(var paper of paperData[label]){
            var papers_ofyear = {
                type: "paper",
                year: paper.year,
                month: paper.month,
                date: paper.date,
                lead_author: checkLangage(lang,paper.lead_author) ? checkLangage(lang,paper.lead_author): null,
                paper_title: checkLangage(lang,paper.paper_title) ? checkLangage(lang,paper.paper_title): null,
                publication: checkLangage(lang,paper.publication) ? checkLangage(lang,paper.publication): null,
                link_file: checkLangage(lang,paper.link_file) ? checkLangage(lang,paper.link_file): null ,
                image: paper.image,
                note: paper.note
            }
            articles.push(papers_ofyear);
        }
    }
    //日付順でソートする
    articles.sort(function(a, b) {
        console.log("a.date:", a.date, typeof a.date);
        console.log("b.date:", b.date, typeof b.date);
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
    //オブジェクトを出力する
    articles.sort(function(a, b) {
        console.log("a.date:", a.date, typeof a.date);
        console.log("b.date:", b.date, typeof b.date);
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
    //ここから修正
    articles.forEach(function(article){
        var div_col = document.createElement("div");
        div_col.classList.add("col");
        div_col.classList.add("s6");
        div_col.classList.add("m4");
        div_col.classList.add("l3");
        lablife_label.appendChild(div_col);

        var div_card = document.createElement("div");
        div_card.classList.add("card");
        div_card.classList.add("small");
        div_col.appendChild(div_card);

        console.log("link:"+article.link_file)
        var a_link = document.createElement("a");
        if (article.link_file !== null){
            a_link.href = "Lablife_articles/" +article.link_file;
        }
        div_card.appendChild(a_link);
        

        var card_image_div = document.createElement("div");
        card_image_div.classList.add("card-image");
        a_link.appendChild(card_image_div);

        var card_image = document.createElement("img");
        card_image.src = "img/lablife/" + article.image;
        card_image_div.appendChild(card_image);

        var card_content = document.createElement("div");
        card_content.classList.add("card-content");
        a_link.appendChild(card_content)

        var article_title = document.createElement("p");
        article_title.classList.add("grey-text");
        article_title.classList.add("text-darken-4");
        article_title.textContent = article.title;
        card_content.appendChild(article_title);

        article_title.appendChild(document.createElement("br"));

        var article_date = document.createElement("span");
        article_date.classList.add("d");
        article_date.textContent =  create_date(lang, article);
        article_title.appendChild(article_date);
    });

}).catch(error => {
    console.log("エラーが発生しました: " + error);
});
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
