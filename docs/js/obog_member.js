fetch("../json/obog_member.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    // jsonファイルのデータをオブジェクトに入れる
    var results = [];
    var each_year = [];

    for (var year in jsonData) {
      //jsonDataの要素を取り出す
      each_year = [];
      for (var i of [3, 9]) {
        //3,9を順にiに入れる
        if (Array.isArray(jsonData[year][i])) {
          var each_monthObject = {
            month: i,
            data: jsonData[year][i],
          };
          each_year.push(each_monthObject);
        }
      }
      var monthsObject = {
        year: year,
        data: each_year,
      };
      results.push(monthsObject);
    }
    console.log("results:" + JSON.stringify(results));

    results.sort(function (a, b) {
      return b.year - a.year;
    });

    //オブジェクトを出力する
    var ogob_label = document.getElementById("output_field");
    var lang = ogob_label.classList.value;

    results.forEach(function (result) {
      result.data.sort(function (a, b) {
        return b.month - a.month;
      });
      console.log("result:" + JSON.stringify(result.data));
      result.data.forEach(function (datas) {
        var year_month = document.createElement("h5");
        if (lang == "ja") {
          year_month.textContent = result.year + "年" + datas.month + "月";
        } else if (lang == "en") {
          year_month.textContent = result.year + ".0" + datas.month;
        }
        year_month.classList.add("header");
        year_month.classList.add("text_b");
        ogob_label.appendChild(year_month);

        var div_row = document.createElement("div");
        div_row.classList.add("row");
        ogob_label.appendChild(div_row);

        //cardの表示
        datas.data.forEach(function (item) {
          var div_col = document.createElement("div");
          div_col.classList.add("col");
          div_col.classList.add("s6");
          div_col.classList.add("m4");
          div_col.classList.add("l3");
          div_row.appendChild(div_col);

          var div_card = document.createElement("div");
          div_card.classList.add("card");
          div_card.classList.add("card-avatar");
          div_col.appendChild(div_card);

          var div_waves = document.createElement("div");
          div_waves.classList.add("waves-effect");
          div_waves.classList.add("waves-block");
          div_waves.classList.add("waves-light");
          div_card.appendChild(div_waves);

          console.log(JSON.stringify(item));
          var member_image = document.createElement("img");
          member_image.src = "../img/members/" + item.image;
          div_waves.appendChild(member_image);

          var card_content = document.createElement("div");
          card_content.classList.add("card-content");
          div_card.appendChild(card_content);

          var name = document.createElement("span");
          console.log("OK");
          name.classList.add("card-title");
          name.classList.add("grey-text");
          name.classList.add("text-darken-4");
          name.textContent = item.name[lang];
          card_content.appendChild(name);

          name.appendChild(document.createElement("br"));

          var grade = document.createElement("small");
          grade.classList.add("red-text");
          grade.classList.add("text-darken-1");
          grade.textContent = item.grade[lang];
          name.appendChild(grade);
          console.log("OK");
        });
      });
    });
  })
  .catch(function (error) {
    console.log("エラーが発生しました: " + error);
  });
