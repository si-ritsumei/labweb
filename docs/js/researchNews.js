document.addEventListener("DOMContentLoaded", () => {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js";

  const JSON_BASE_PATH = "../json/researchNews/";
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
  fetch(`${JSON_BASE_PATH}${jsonFile}`)
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
      document.querySelector(".header.text_b").textContent =
        data.laboratoryLife;

      document.querySelector(".normal").innerHTML = `
      <br />
      ${data.date}
      <br />
      ${data.place}
      <br />
      `;

      /* ---------- summary ---------- */
      document.querySelector(".smallheader").textContent = data.abstract;

      document.getElementById("abstractContent").textContent =
        data.abstractContent;

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

        const imgIndex = i % data.images.length;
        img.src = data.path + data.images[imgIndex];
      });

      /* ---------- presentation ---------- */
      const container = document.getElementById("presentations");
      data.presentations.forEach((p) => {
        container.appendChild(makePresentation(p, data.path));
      });

      /* ---------- voyageDiary ---------- */
      document.querySelector(".voyage").textContent = data.voyage;
      document.querySelector(".voyageDiary").innerHTML = `${data.voyageDiary}`;
    })
    .catch((err) => {
      console.error(err);
    });
});

/**
 *
 * @param {*} data
 * @param {*} path
 * @returns
 */
function makePresentation(data, path) {
  const tpl = document.getElementById("presentation-template");
  const node = tpl.content.cloneNode(true);

  node.querySelector(".speaker").textContent = data.speaker;
  node.querySelector(".title").textContent = data.title;
  node.querySelector(".title").href = data.link;
  node.querySelector(".abstract").textContent = data.abstract;

  const pdfContainer = node.querySelector(".pdf-container");
  pdfContainer.id = data.pdfId;
  pdfContainer.dataset.pdfUrl = path + data.path;
  initPdfViewer(pdfContainer);

  return node;
}

function initPdfViewer(pdfContainer) {
  const url = pdfContainer.dataset.pdfUrl;
  if (!url) return;

  const canvas = pdfContainer.querySelector(".pdf-render");
  const ctx = canvas.getContext("2d");

  const pageNumEl = pdfContainer.querySelector(".page-num");
  const pageCountEl = pdfContainer.querySelector(".page-count");

  let pdfDoc = null;
  let pageNum = 1;
  const scale = 1.2;

  pdfjsLib.getDocument(url).promise.then((pdf) => {
    pdfDoc = pdf;

    //  総ページ数を表示
    pageCountEl.textContent = pdf.numPages;

    renderPage(pageNum);
  });

  function renderPage(num) {
    pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: ctx,
        viewport,
      });

      //  現在ページ番号を表示
      pageNumEl.textContent = num;
    });
  }
}
