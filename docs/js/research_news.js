

fetch("../json/lablife.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {



        var lablife_label = document.getElementById("output_field");
        var lang = lablife_label.classList.value;

        // var text = "Pituxcoosuvarnさんらの論文「Effect of Cultural Misunderstanding Warning in MT-Mediated Communication」が<i>the 26th International Conference on Collaboration Technologies and Social Computing (CollabTech 2020)</i>に採録されました。"
        // var test = document.createElement("p");
        // test.innerHTML = text;
        // lablife_label.appendChild(test);



    })
    .catch(function(error) {
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
    if (lang == "ja"){
        return article.year + "年" + article.month + "月" + article.date + "日"
    }else if (lang == "en"){
        return article.month + " " + article.date + day_sign(article.date) + ", " + article.year;
    }
}


function checkLangage(lang, data) {
    if (lang === "ja"){
        return data.ja
    }else if(lang === "en"){
        return data.en
    }
}