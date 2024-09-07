
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            header.classList.add('hidden'); 
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = currentScroll;
    });

    
    const lightbox = document.getElementById('lightbox');
    const images = document.querySelectorAll('.image-item img');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close');
    const downloadLink = document.getElementById('downloadLink');
    let scale = 1;
    let isDragging = false;
    let startX, startY, moveX = 0, moveY = 0;

    images.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = image.src;
            downloadLink.href = image.src;
            header.style.display = 'none'; 
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        header.style.display = 'block'; 
        resetZoom(); 
    });

   
    lightboxImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 0.1;
        scale += e.deltaY * -zoomSpeed;
        scale = Math.min(Math.max(.5, scale), 3); 
        lightboxImg.style.transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`;
    });

    lightboxImg.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - moveX;
        startY = e.pageY - moveY;
        lightboxImg.style.cursor = 'grabbing';
    });

    lightboxImg.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveX = e.pageX - startX;
        moveY = e.pageY - startY;
        lightboxImg.style.transform = `scale(${scale}) translate(${moveX}px, ${moveY}px)`;
    });

    lightboxImg.addEventListener('mouseup', () => {
        isDragging = false;
        lightboxImg.style.cursor = 'grab';
    });

    lightboxImg.addEventListener('mouseleave', () => {
        isDragging = false;
    });

   
    function resetZoom() {
        scale = 1;
        moveX = 0;
        moveY = 0;
        lightboxImg.style.transform = 'scale(1)';
    }

   
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const images = document.querySelectorAll('.image-item');

        images.forEach(image => {
            const keywords = image.querySelector('img').getAttribute('data-keywords');
            if (keywords.toLowerCase().includes(filter)) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
        });
    });
});
