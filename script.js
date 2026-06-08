// ============================================
// 1. IMAGE VIEWER (Zoom with Scroll Wheel)
// ============================================
const imageEl = document.getElementById('mainImage');
let currentZoom = 1;
const zoomStep = 0.1;
const maxZoom = 5;
const minZoom = 0.5;

function updateZoom() {
    if (imageEl) {
        imageEl.style.transform = `scale(${currentZoom})`;
        const zoomPercentSpan = document.getElementById('zoomPercent');
        if (zoomPercentSpan) zoomPercentSpan.innerText = `${Math.round(currentZoom * 100)}%`;
    }
}

const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const resetZoomBtn = document.getElementById('resetZoomBtn');

if (zoomInBtn) zoomInBtn.onclick = () => { if (currentZoom + zoomStep <= maxZoom) { currentZoom += zoomStep; updateZoom(); } };
if (zoomOutBtn) zoomOutBtn.onclick = () => { if (currentZoom - zoomStep >= minZoom) { currentZoom -= zoomStep; updateZoom(); } };
if (resetZoomBtn) resetZoomBtn.onclick = () => { currentZoom = 1; updateZoom(); };

if (imageEl) {
    imageEl.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0 && currentZoom + zoomStep <= maxZoom) currentZoom += zoomStep;
        else if (e.deltaY > 0 && currentZoom - zoomStep >= minZoom) currentZoom -= zoomStep;
        updateZoom();
    });
}

// ============================================
// 2. IMPROVED PDF VIEWER
// ============================================
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let currentScale = 1.5;

const canvasPdf = document.getElementById('pdfCanvas');
const ctx = canvasPdf ? canvasPdf.getContext('2d') : null;
const loadingIndicator = document.getElementById('pdfLoading');

async function initPdfViewer() {
    if (!canvasPdf || !ctx) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const pdfPath = 'assets/MT_Gimble.pdf';

    try {
        loadingIndicator.style.display = 'block';
        const loadingTask = pdfjsLib.getDocument(pdfPath);
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        
        document.getElementById('pageNumDisplay').innerText = `Page ${currentPage} / ${totalPages}`;
        await renderPage(currentPage, currentScale);
    } catch (error) {
        console.error("PDF Error:", error);
        if (ctx) {
            ctx.fillStyle = "#1e2a3a";
            ctx.fillRect(0, 0, canvasPdf.width || 800, canvasPdf.height || 600);
            ctx.fillStyle = "#ffaa88";
            ctx.font = "18px sans-serif";
            ctx.fillText("⚠️ PDF not found", 50, 100);
            ctx.fillText("Place MT_Gimble.pdf in /assets folder", 50, 140);
        }
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

async function renderPage(pageNum, scale) {
    if (!pdfDoc) return;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    canvasPdf.height = viewport.height;
    canvasPdf.width = viewport.width;

    const renderContext = { canvasContext: ctx, viewport };
    await page.render(renderContext).promise;
}

// Button handlers
document.getElementById('prevPage').onclick = () => {
    if (currentPage > 1) { currentPage--; updatePageDisplay(); renderPage(currentPage, currentScale); }
};
document.getElementById('nextPage').onclick = () => {
    if (currentPage < totalPages) { currentPage++; updatePageDisplay(); renderPage(currentPage, currentScale); }
};

document.getElementById('zoomPdfIn').onclick = () => { currentScale += 0.3; renderPage(currentPage, currentScale); };
document.getElementById('zoomPdfOut').onclick = () => { currentScale = Math.max(0.6, currentScale - 0.3); renderPage(currentPage, currentScale); };
document.getElementById('fitWidthBtn').onclick = () => { currentScale = 1.8; renderPage(currentPage, currentScale); };

function updatePageDisplay() {
    document.getElementById('pageNumDisplay').innerText = `Page ${currentPage} / ${totalPages}`;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') document.getElementById('prevPage').click();
    if (e.key === 'ArrowRight') document.getElementById('nextPage').click();
});

initPdfViewer();

/// ============================================
// 3. ALTIUM ONLINE VIEWER
// ============================================
const altiumIframe = document.getElementById('altiumIframe');

if (altiumIframe) {
    // Optional: Auto-resize or error handling
    altiumIframe.onerror = () => {
        console.warn("Altium viewer failed to load - check your embed URL");
    };
}