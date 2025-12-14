document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("event-root");

  if (!root) {
    console.error("#event-root not found");
    return;
  }

  // ① URLパラメータ ?json=xxx を取得
  const params = new URLSearchParams(window.location.search);
  const jsonFromUrl = params.get("json");

  // ② data-json fallback
  const jsonFromDataset = root.dataset.json;

  // ③ 使用する JSON を決定
  const jsonFile = jsonFromUrl || jsonFromDataset;

  if (!jsonFile) {
    return;
  }

  // ④ JSON 読み込み
  fetch(`../json/event_news/${jsonFile}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load JSON: " + jsonFile);
      }
      return res.json();
    })
    .then((data) => {
      /* ---------- title ---------- */
      document.title = data.title;

      /* ---------- header ---------- */
      document.getElementById("page-header").textContent = data.header;

      /* ---------- summary ---------- */
      document.getElementById("page-summary").innerHTML = `
        ${data.summary.lead}<br>
        場所: ${data.summary.place}<br>
        日時: ${data.summary.date}
      `;

      /* ---------- overview ---------- */
      document.getElementById("page-overview").innerHTML = data.overview
        .map((line) => (line === "" ? "<br>" : line))
        .join("<br>");

      /* ---------- images ---------- */
      const ids = [
        "img1",
        "img2",
        "img3",
        "img4",
        "img5",
        "img6",
        "img7",
        "img8",
        "img9",
        "img10",
      ];

      ids.forEach((id, i) => {
        const img = document.getElementById(id);
        if (!img) return;

        const imgIndex = i % data.images.files.length;
        img.src = data.images.path + data.images.files[imgIndex];
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
