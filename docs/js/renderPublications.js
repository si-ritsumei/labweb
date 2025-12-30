/**
 * render_publications.js
 * JSON から研究業績リストを生成する
 */

/* ===============================
 * 論文系（journal / conference / book / domestic）
 * =============================== */
async function loadPublications(jsonPath, targetId) {
  const res = await fetch(jsonPath);
  if (!res.ok) {
    console.error(`Failed to load ${jsonPath}`);
    return;
  }

  let data;
  try {
    data = await res.json();
  } catch (e) {
    console.error(`Invalid JSON: ${jsonPath}`, e);
    return;
  }

  const list = document.getElementById(targetId);
  if (!list) return;

  // 年で降順ソート
  data.sort((a, b) => (b.year || 0) - (a.year || 0));

  data.forEach((pub) => {
    if (!Array.isArray(pub.authors)) return;

    /* ===== row ===== */
    const row = document.createElement("div");
    row.className = "row";
    row.style.display = "flex";
    row.style.marginBottom = "0";

    /* ===== text column ===== */
    const colText = document.createElement("div");
    colText.className = "col s11";

    const li = document.createElement("li");

    // authors
    li.appendChild(document.createTextNode(pub.authors.join(", ") + ". "));

    // title
    if (pub.title) {
      const titleSpan = document.createElement("span");
      titleSpan.className = "title";
      titleSpan.textContent = pub.title;
      li.appendChild(titleSpan);
      li.appendChild(document.createTextNode(", "));
    }

    // venue
    if (pub.venue) {
      const venueSpan = document.createElement("i");
      venueSpan.textContent = pub.venue;
      li.appendChild(venueSpan);
    }

    // volume / number / pages
    if (pub.volume)
      li.appendChild(document.createTextNode(`, Vol. ${pub.volume}`));
    if (pub.number)
      li.appendChild(document.createTextNode(`, No. ${pub.number}`));
    if (pub.pages)
      li.appendChild(document.createTextNode(`, pp. ${pub.pages}`));

    // year / month
    if (pub.year) {
      const ym = pub.month ? ` (${pub.month} ${pub.year})` : ` (${pub.year})`;
      li.appendChild(document.createTextNode(ym));
    }

    // note
    if (pub.note) {
      li.appendChild(document.createTextNode(` (${pub.note})`));
    }

    // awards (論文に付随する受賞)
    if (Array.isArray(pub.awards) && pub.awards.length > 0) {
      li.appendChild(document.createElement("br"));

      pub.awards.forEach((award) => {
        const awardSpan = document.createElement("span");
        awardSpan.className = "award";
        awardSpan.textContent =
          (award.year ? ` ${award.year} ` : "") + `${award.name}`;
        li.appendChild(awardSpan);
      });
    }

    colText.appendChild(li);

    /* ===== icon column ===== */
    const colIcon = document.createElement("div");
    colIcon.className = "col s1 icon_box";

    if (pub.link && Array.isArray(pub.icons)) {
      pub.icons.forEach((icon) => {
        const a = document.createElement("a");
        a.href = pub.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";

        if (icon.type === "ai") {
          const i = document.createElement("i");
          i.className = `ai ${icon.name} ai-2x`;
          a.appendChild(i);
        }

        if (icon.type === "img") {
          const img = document.createElement("img");
          img.src = icon.src;
          img.width = 24;
          a.appendChild(img);
        }

        colIcon.appendChild(a);
      });
    }

    /* ===== assemble ===== */
    row.appendChild(colText);
    row.appendChild(colIcon);
    list.appendChild(row);
  });
}

/* ===============================
 * 受賞（award）
 * =============================== */
async function loadAwards(jsonPath, targetId) {
  const res = await fetch(jsonPath);
  if (!res.ok) return;

  const data = await res.json();
  const list = document.getElementById(targetId);
  if (!list) return;

  data.sort((a, b) => (b.year || 0) - (a.year || 0));

  data.forEach((award) => {
    const row = document.createElement("div");
    row.className = "row";
    row.style.display = "flex";
    row.style.marginBottom = "0";

    const colText = document.createElement("div");
    colText.className = "col s11";

    const li = document.createElement("li");
    li.textContent = award.text || "";
    colText.appendChild(li);

    const colIcon = document.createElement("div");
    colIcon.className = "col s1 icon_box";

    if (award.icon) {
      const img = document.createElement("img");
      img.src = award.icon;
      img.width = 24;

      if (award.link) {
        const a = document.createElement("a");
        a.href = award.link;
        a.target = "_blank";
        a.appendChild(img);
        colIcon.appendChild(a);
      } else {
        colIcon.appendChild(img);
      }
    }

    row.appendChild(colText);
    row.appendChild(colIcon);
    list.appendChild(row);
  });
}

/* ===============================
 * 呼び出し
 * =============================== */
document.addEventListener("DOMContentLoaded", () => {
  loadPublications("../json/publications/journal.json", "journal-list");
  loadPublications("../json/publications/conference.json", "conference-list");
  loadPublications("../json/publications/book.json", "book-list");
  loadPublications("../json/publications/domestic.json", "domestic-list");

  loadAwards("../json/publications/award.json", "award-list");
});
