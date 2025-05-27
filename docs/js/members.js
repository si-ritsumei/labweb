

fetch("../json/member.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {

        // jsonファイルのデータをオブジェクトに入れる

        var members_label = document.getElementById("output_members");
        var lang = members_label.classList.item(0);
        
        var profs = ["Professor","Lecturer"]

        //村上先生を表示
        for(var pr of profs){
            for (var prof of jsonData[pr]){
                var info = {
                    role: role_check(lang,pr)? role_check(lang,pr) : null,
                    name: checkLangage(lang,prof.name) ? checkLangage(lang,prof.name): null,
                    image: prof.image,
                    //main_link: prof.main_link,
                    main_link: prof.main_link!=="" ? prof.main_link : null,
                    links: prof.links,
                    note:prof.note
                }
                output(info,lang,members_label);
            }
        }

        //生徒の出力
        var grades = ["D3","D2","D1","M2","M1","B4","B3"]
        for (var grade of grades){
            if (grade in jsonData) {
                var prof_stus=[];
                for (var prof of jsonData[grade]){
                    var info = {
                        role: role_check(lang,grade)? role_check(lang,grade) : null,
                        name: checkLangage(lang,prof.name) ? checkLangage(lang,prof.name): null,
                        name_s: prof.name.en,
                        image: prof.image,
                        main_link: prof.main_link!=="" ? prof.main_link : null,
                        links: prof.links,
                        note:prof.note
                    }
                    prof_stus.push(info);
                }
                prof_stus.sort(function(a, b) {
                    return a.name_s.localeCompare(b.name_s);
                    });
                for (var prof_stu of prof_stus){
                    output(prof_stu,lang,members_label);
                }
            }
        }

        
    })
    .catch(function(error) {
        console.log("エラーが発生しました: " + error);
    });


function checkLangage(lang, data) {
    if (lang === "ja"){
        return data.ja
    }else if(lang === "en"){
        return data.en
    }
}

function output(data,lang,members_label){
    var div_col = document.createElement("div");
    div_col.classList.add("col");
    div_col.classList.add("s6");
    div_col.classList.add("m4");
    div_col.classList.add("l3");
    members_label.appendChild(div_col);

    var div_card = document.createElement("div");
    div_card.classList.add("card");
    div_card.classList.add("card-avatar");
    div_col.appendChild(div_card);

    var div_wave = document.createElement("div");
    div_wave.classList.add("waves-effect");
    div_wave.classList.add("waves-block");
    div_wave.classList.add("waves-light");
    div_card.appendChild(div_wave);
    if (data.main_link !== null){
        var a_hp = document.createElement("a");
        a_hp.href=data.main_link;
        a_hp.target="_blank";
        div_wave.appendChild(a_hp);
    }

    var img = document.createElement("img");
    img.src="img/members/"+ data.image;
    div_wave.appendChild(img);

    var div_con = document.createElement("div");
    div_con.classList.add("card-content");
    div_card.appendChild(div_con);

    if (data.main_link !== null){
        var a_con = document.createElement("a");
        a_con.href=data.main_link;
        a_con.target="_blank";
        div_con.appendChild(a_con);
    }

    var span = document.createElement("span");
    span.classList.add("card-title");
    span.classList.add("grey-text");
    span.classList.add("text-darken-4");
    if (data.note ==="long-name"){
        a_con.appendChild(span);
        var span_l = document.createElement("span");
        span_l.classList.add(data.note);
        span_l.innerHTML = data.name +"</br>";
        span.appendChild(span_l);

    }else{
        span.innerHTML = data.name +"</br>";
        if (data.main_link !== null){
            a_con.appendChild(span);
        }else{
            div_con.appendChild(span);
        }
    }

    var small = document.createElement("small");
    small.classList.add("red-text");
    small.classList.add("text-darken-1");
    small.innerHTML=data.role;
    span.appendChild(small);


    var p = document.createElement("p");
    div_con.appendChild(p);

    if (data.main_link !== null){
        for(var link of data.links){
            output_link(p,link);
        }
    }
}


function output_link(p,link){
    var a_link = document.createElement("a");
        a_link.classList.add("promo");
        a_link.href=link.link;
        a_link.target="_brank"
        p.appendChild(a_link);

    var classes = link.class.split(" ");
    var i = document.createElement("i");
    for(var aclass of classes){
        i.classList.add(aclass);
    }
    i.style="margin-right: 3px";
    a_link.appendChild(i);  
    
}

function role_check(lang,role){
    var role_ja = {
        "Professor":"教授",
        "Assistant Professor":"助教",
        "Lecturer":"講師",
        "D3":"博士3回生",
        "D2":"博士2回生",
        "D1":"博士1回生",
        "M2":"修士2回生",
        "M1":"修士1回生",
        "B4":"学部4回生",
        "B3":"学部3回生"
    }
    
    if (lang==="en"){
        return role;
    }else{
        return role_ja[role]
    }
}