/**
 * Visualização Arquitetônica - Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initGaleria();
    initAntesDepois();
    initForm();
});

// ----- Navegação fixa e menu mobile -----
function initNav() {
    const nav = document.getElementById('nav-main');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    // Scroll: adiciona classe para background
    const onScroll = () => {
        if (window.scrollY > 80) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Menu mobile
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => links.classList.remove('open'));
        });
    }
}

// ----- Filtro da galeria -----
function initGaleria() {
    const btns = document.querySelectorAll('.filtro-btn');
    const items = document.querySelectorAll('.galeria-item');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.categoria;

            items.forEach(item => {
                const itemCat = item.dataset.categoria;
                const show = cat === 'todos' || itemCat === cat;
                item.classList.toggle('hidden', !show);
            });
        });
    });
}

// ----- Slider Antes e Depois (arrastar) -----
function initAntesDepois() {
    const slider = document.querySelector('.antes-depois-slider');
    const handle = document.querySelector('.slider-handle');
    if (!slider || !handle) return;

    let pos = 50; // percentual (0-100)

    const updatePos = (p) => {
        pos = Math.max(0, Math.min(100, p));
        slider.style.setProperty('--pos', pos + '%');
    };

    // Arrastar
    let dragging = false;

    const onMove = (clientX) => {
        if (!dragging) return;
        const rect = slider.getBoundingClientRect();
        const x = clientX - rect.left;
        const p = (x / rect.width) * 100;
        updatePos(p);
    };

    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        dragging = true;
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => onMove(e.clientX));
    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });

    // Touch
    handle.addEventListener('touchstart', (e) => {
        dragging = true;
    });
    document.addEventListener('touchmove', (e) => {
        if (dragging && e.touches.length) onMove(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener('touchend', () => { dragging = false; });

    // Clique na área do slider também move
    slider.addEventListener('click', (e) => {
        if (e.target.closest('.slider-handle')) return;
        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        updatePos((x / rect.width) * 100);
    });

    updatePos(50);
}

// ----- Formulário de contato -----
function initForm() {
    const form = document.querySelector('.form-contato');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aqui você pode integrar com backend, Formspree, etc.
        alert('Obrigado! Sua mensagem foi enviada. Entraremos em contato em breve.');
        form.reset();
    });
}
