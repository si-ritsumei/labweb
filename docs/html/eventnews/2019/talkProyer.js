fetch("content.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("content").innerHTML = html;
  });

document.addEventListener("DOMContentLoaded", () => {
  fetch("./message.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      const filePath = "../../../img/event_news/2019/talkProyer/"; // 画像ファイルがあるフォルダのパスを変数に格納
      const fileNames = [
        "2019Proyer.JPG",
        "2019Proyer2.JPG",
        "2019Proyer3.JPG",
      ];

      const tpl = document.getElementById("ween");
      const container = document.getElementById("content");
      const clone = tpl.content.cloneNode(true);
      const normal = clone.querySelectorAll(".normal");
      normal[0].textContent = jsonData.normal;
      normal[1].textContent = jsonData.text;
      // for文を使用して画像のsrcを設定
      for (let i = 0; i < fileNames.length; i++) {
        clone.querySelector(`.img${i + 1}`).src = filePath + fileNames[i];
      }

      clone.querySelector(".smallheader").textContent = jsonData.abstract;
      container.appendChild(clone);
    });
});
