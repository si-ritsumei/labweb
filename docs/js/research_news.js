

fetch("../json/presentations.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(rawPresentations) {

        articles = [];

        const outputField = document.getElementById("output_field");
        const lang = outputField.classList.value;


        for (let label in rawPresentations) { //jsonDataの要素を取り出す
            articles = [];
            for(let article of rawPresentations[label]){
                let currentArticle = {
                    type: "presentation",
                    year: article.year,
                    month: article.month,
                    date: article.date,
                    text: checkLangage(lang,article.text) ? checkLangage(lang,article.text): null,
                    linkFile: checkLangage(lang,article.link_file) ? checkLangage(lang,article.link_file): null ,
                    image: article.image,
                    note: article.note
                }
                articles.push(currentArticle);
            }
        }
        
        fetch("../json/papers.json")
            .then(function(response) {
                return response.json();
            })
            .then(function(rawPapers) {
                // jsonData2には2つ目のJSONデータが含まれています

                // ここでjsonData1とjsonData2を使って必要な処理を行います
                for (let label in rawPapers) { //jsonDataの要素を取り出す
                    for(let article of rawPapers[label]){
                        let currentArticle = {
                            type:"paper",
                            year: article.year,
                            month: article.month,
                            date: article.date,
                            leadAuthor:checkLangage(lang,article.lead_author) ? checkLangage(lang,article.lead_author): null,
                            paperTitle: checkLangage(lang,article.paper_title) ? checkLangage(lang,article.paper_title): null,
                            publication: checkLangage(lang,article.publication) ? checkLangage(lang,article.publication): null,
                            linkFile: checkLangage(lang,article.link_file) ? checkLangage(lang,article.link_file): null ,
                            image: article.image,
                            note: article.note
                        }
                        articles.push(currentArticle);
                    }

                }
                
                sortedArticles = sortByDate(articles);
                        
                //オブジェクトを出力する
                sortedArticles.forEach(function(article){
                    console.log("type:",article.type);
                    if(article.type === "presentation"){
                        print_presentation(article,outputField,lang);
                    }else if(article.type === "paper"){
                        print_paper(article,outputField,lang);
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

    let articleDate = new Date(article.year, article.month - 1, article.date);
    articleDate.setDate(articleDate.getDate() + 30);

    if(articleDate > today){
        return "new"
    }else{
        return null
    }
}

function print_presentation(article,outputField,lang){
    let container = document.createElement("div");
    container.classList.add("col");
    container.classList.add("s6");
    container.classList.add("m4");
    container.classList.add("l3");
    outputField.appendChild(container);

    let car]d = document.createElement("div");
    card.classList.add("card");
    card.classList.add("large");
    container.appendChild(card);

    console.log("link:"+article.linkFile)
    let content = document.createElement("a");
    if (article.linkFile !== null){
        content.href = "ResearchNews_articles/" + article.linkFile;
    }
    if(article.note === "book"){
        content.href = article.linkFile;
    }
    card.appendChild(content);
    

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("activity-card-image");
    content.appendChild(imgContainer);

    
    let img = document.createElement("img");
    img.src = "img/research_news/presentation/" + article.year + "/" + article.image;
    imgContainer.appendChild(img);

    let textContainer = document.createElement("div");
    textContainer.classList.add("card-content");
    textContainer.style.maxHeight = "70%";
    content.appendChild(textContainer)

    let articleText = document.createElement("p");
    articleText.classList.add("grey-text");
    articleText.classList.add("text-darken-4");
    articleText.innerHTML = article.text;
    textContainer.appendChild(articleText);

    articleText.appendChild(document.createElement("br"));

    let articleDate = document.createElement("span");
    articleDate.classList.add("d");
    articleDate.textContent =  create_date(lang, article);
    articleText.appendChild(articleDate);

    if(check_new(article)==="new"){
        console.log("new")
        let newBadge = document.createElement("span");
        newBadge.classList.add("new");
        newBadge.classList.add("badge");
        newBadge.classList.add("red");
        articleText.appendChild(newBadge);
    }
}

function print_paper(article,outputField,lang){
    let container = document.createElement("div");
    container.classList.add("col");
    container.classList.add("s6");
    container.classList.add("m4");
    container.classList.add("l3");
    outputField.appendChild(container);

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("large");
    container.appendChild(card);

    console.log("link:"+article.linkFile)
    let content = document.createElement("a");
    content.classList.add("news")
    content.target="_blank";
    if (article.linkFile !== null){
        content.href = article.linkFile;
    }
    card.appendChild(content);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("activity-card-image");
    content.appendChild(imgContainer);

    
    let img = document.createElement("img");
    img.src = "img/research_news/paper/" + article.image;
    imgContainer.appendChild(img);

    let textContainer = document.createElement("div");
    textContainer.classList.add("card-content");
    textContainer.style.maxHeight = "70%";
    content.appendChild(textContainer)

    
    let articleText = document.createElement("p");
    articleText.classList.add("grey-text");
    articleText.classList.add("text-darken-4");
    if (lang==="ja"){
        articleText.innerHTML=article.leadAuthor+"らの論文「" + article.paperTitle + "」が<i>" + article.publication + "</i>に採録されました。"
    }else if(lang==="en"){
        articleText.innerHTML = article.leadAuthor + "'s paper titled \"" + article.paperTitle + "\" has been accepted for<i>" + article.publication +"</i>."
    }
    textContainer.appendChild(articleText);
    

    articleText.appendChild(document.createElement("br"));
    
    if(check_new(article)==="new"){
        console.log("new")
        let newBadge = document.createElement("span");
        newBadge.classList.add("new");
        newBadge.classList.add("badge");
        newBadge.classList.add("red");
        articleText.appendChild(newBadge);
    }

    let articleDate = document.createElement("span");
    articleDate.classList.add("d");
    articleDate.textContent =  create_date(lang, article);
    articleText.appendChild(articleDate);
}