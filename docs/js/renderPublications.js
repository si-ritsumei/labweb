/**
 * render_publications.js
 * JSON から研究業績リストを生成する
 */

async function loadPublications(jsonPath, targetId) {
  const res = await fetch(jsonPath);
  if (!res.ok) {
    console.error(`Failed to load ${jsonPath}`);
    return;
  }

  const data = await res.json();
  const list = document.getElementById(targetId);
  if (!list) return;

  // 年で降順ソート
  data.sort((a, b) => (b.year || 0) - (a.year || 0));

  data.forEach((pub) => {
    const li = document.createElement("li");

    /* ===== authors ===== */
    const authorsSpan = document.createElement("span");
    authorsSpan.className = "authors";
    authorsSpan.textContent = pub.authors.join(", ");
    li.appendChild(authorsSpan);

    li.appendChild(document.createTextNode(". "));

    /* ===== title ===== */
    const titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.textContent = pub.title;
    li.appendChild(titleSpan);

    li.appendChild(document.createTextNode(", "));

    /* ===== venue ===== */
    const venueSpan = document.createElement("i");
    venueSpan.className = "venue";
    venueSpan.textContent = pub.venue;
    li.appendChild(venueSpan);

    /* ===== volume / number / pages ===== */
    if (pub.volume)
      li.appendChild(document.createTextNode(`, Vol. ${pub.volume}`));
    if (pub.number)
      li.appendChild(document.createTextNode(`, No. ${pub.number}`));
    if (pub.pages)
      li.appendChild(document.createTextNode(`, pp. ${pub.pages}`));

    /* ===== year / month ===== */
    if (pub.year) {
      const ym = pub.month ? ` (${pub.month} ${pub.year})` : ` (${pub.year})`;
      li.appendChild(document.createTextNode(ym));
    }

    /* ===== note ===== */
    if (pub.note) {
      const noteSpan = document.createElement("span");
      noteSpan.className = "note";
      noteSpan.textContent = ` [${pub.note}]`;
      li.appendChild(noteSpan);
    }

    /* ===== link ===== */
    if (pub.link) {
      li.appendChild(document.createTextNode(" "));
      const a = document.createElement("a");
      a.href = pub.link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "[link]";
      li.appendChild(a);
    }

    /* ===== icons ===== */
    if (Array.isArray(pub.icons)) {
      pub.icons.forEach((icon) => {
        const i = document.createElement("i");
        i.className = `ai ai-${icon}`;
        i.style.marginLeft = "6px";
        li.appendChild(i);
      });
    }

    /* ===== awards ===== */
    if (Array.isArray(pub.awards) && pub.awards.length > 0) {
      pub.awards.forEach((award) => {
        const awardDiv = document.createElement("div");
        awardDiv.className = "award";
        awardDiv.textContent =
          `🏆 ${award.name}` + (award.year ? ` (${award.year})` : "");
        li.appendChild(awardDiv);
      });
    }

    list.appendChild(li);
  });
}

/* ===== 呼び出し ===== */
document.addEventListener("DOMContentLoaded", () => {
  loadPublications("../json/publications/journal.json", "journal-list");
  loadPublications("../json/publications/conference.json", "conference-list");
  loadPublications("../json/publications/book.json", "book-list");
  loadPublications("../json/publications/domestic.json", "domestic-list");
});
