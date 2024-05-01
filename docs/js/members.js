

fetch("../json/members.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {

        // jsonファイルのデータをオブジェクトに入れる

        var lablife_label = document.getElementById("output_members");
        var lang = lablife_label.classList.value;
        var informations=[];
        console.log("pass");
        for (var post in jsonData) { //jsonDataの要素を取り出す
            informations = [];
            console.log("pass");
            for(var information of jsonData[post]){
                console.log("name:"+information.name.ja);
            }
        }
    })
    .catch(function(error) {
        console.log("エラーが発生しました: " + error);
    });