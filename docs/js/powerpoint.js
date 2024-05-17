document.addEventListener('DOMContentLoaded', function () {
    const pdfContainers = document.querySelectorAll('.pdf-container');

    pdfContainers.forEach((pdfContainer, index) => {
        const pdfUrl = pdfContainer.getAttribute('data-pdf-url');
        const canvas = pdfContainer.querySelector('.pdf-render');
        const pageNumElement = pdfContainer.querySelector('.page-num');
        const pageCountElement = pdfContainer.querySelector('.page-count');
        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null,
            ctx = canvas.getContext('2d');

        // PDFのレンダリング
        const renderPage = num => {
            pageIsRendering = true;

            // ページを取得
            pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderCtx = {
                    canvasContext: ctx,
                    viewport
                };

                page.render(renderCtx).promise.then(() => {
                    pageIsRendering = false;

                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });

                // ページ番号を出力
                pageNumElement.textContent = num;
            });
        };

        // ページのキュー
        const queueRenderPage = num => {
            if (pageIsRendering) {
                pageNumIsPending = num;
            } else {
                renderPage(num);
            }
        };

        // 前のページ
        const prevPage = () => {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        };

        // 次のページ
        const nextPage = () => {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        };

        // 前後のページ遷移ボタンのイベントリスナーを追加
        pdfContainer.querySelector('.prev').addEventListener('click', prevPage);
        pdfContainer.querySelector('.next').addEventListener('click', nextPage);

        // PDFを読み込む
        const loadPDF = url => {
            pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
                pdfDoc = pdfDoc_;
                pageCountElement.textContent = pdfDoc.numPages;

                pageNum = 1; // ページ番号をリセット
                renderPage(pageNum);
            });
        };

        // PDFの読み込みを開始
        loadPDF(pdfUrl);
    });
});
