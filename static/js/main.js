/**
 * 🎂 HBD Kaede - Underwater Floating & Bobbing Memories Engine
 * All interactions & texts in English
 */

(function () {
    'use strict';

    // -------------------------------------------------------------
    // 1. DOM Elements
    // -------------------------------------------------------------
    const underwaterStage = document.getElementById('underwater-stage');
    const memoryModal = document.getElementById('memory-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDesc = document.getElementById('modal-desc');
    const modalGallery = document.getElementById('modal-gallery');
    
    const letterModal = document.getElementById('letter-modal');
    const letterOpenBtn = document.getElementById('letter-open-btn');
    const letterTitle = document.getElementById('letter-title');
    const letterDate = document.getElementById('letter-date');
    const letterContent = document.getElementById('letter-content');

    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImgContainer = document.getElementById('lightbox-img-container');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
    const ambientCanvas = document.getElementById('ambient-canvas');

    // -------------------------------------------------------------
    // 2. Initial Setup from Configuration
    // -------------------------------------------------------------
    if (typeof BIRTHDAY_CONFIG !== 'undefined') {
        if (letterTitle) letterTitle.textContent = BIRTHDAY_CONFIG.letter.title;
        if (letterDate) letterDate.textContent = BIRTHDAY_CONFIG.letter.date;
        if (letterContent) letterContent.textContent = BIRTHDAY_CONFIG.letter.content;
    }

    // -------------------------------------------------------------
    // 3. Ambient Canvas: Subtle Twinkling Stars & Automatic Underwater Bubbles
    // -------------------------------------------------------------
    const stars = [];
    const bubbles = [];

    function initAmbientCanvas() {
        if (!ambientCanvas) return;
        const ctx = ambientCanvas.getContext('2d');
        let width = ambientCanvas.width = window.innerWidth;
        let height = ambientCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = ambientCanvas.width = window.innerWidth;
            height = ambientCanvas.height = window.innerHeight;
        });

        // Stars setup
        for (let i = 0; i < 40; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.8 + 0.6,
                alpha: Math.random(),
                speed: Math.random() * 0.015 + 0.005,
                dir: Math.random() > 0.5 ? 1 : -1
            });
        }

        // Automatic Underwater Bubbles setup
        function createBubble(randomY = true) {
            return {
                x: Math.random() * width,
                y: randomY ? Math.random() * height : height + Math.random() * 40 + 10,
                radius: Math.random() * 6 + 2.5,
                speedY: Math.random() * 0.75 + 0.45,
                wobbleSpeed: Math.random() * 0.03 + 0.015,
                wobbleAmp: Math.random() * 1.5 + 0.6,
                wobbleAngle: Math.random() * Math.PI * 2,
                alpha: Math.random() * 0.4 + 0.2
            };
        }

        for (let i = 0; i < 28; i++) {
            bubbles.push(createBubble(true));
        }

        function render() {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Stars
            for (let s of stars) {
                s.alpha += s.speed * s.dir;
                if (s.alpha >= 1) { s.alpha = 1; s.dir = -1; }
                else if (s.alpha <= 0.1) { s.alpha = 0.1; s.dir = 1; s.x = Math.random() * width; s.y = Math.random() * height; }

                ctx.save();
                ctx.fillStyle = `rgba(255, 248, 220, ${s.alpha * 0.55})`;
                ctx.shadowBlur = 5;
                ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // 2. Draw Automatic Underwater Bubbles (No button needed, auto rising)
            for (let i = 0; i < bubbles.length; i++) {
                const b = bubbles[i];
                b.y -= b.speedY;
                b.wobbleAngle += b.wobbleSpeed;
                const bx = b.x + Math.sin(b.wobbleAngle) * b.wobbleAmp;

                ctx.save();
                ctx.strokeStyle = `rgba(180, 245, 235, ${b.alpha * 0.8})`;
                ctx.fillStyle = `rgba(215, 255, 250, ${b.alpha * 0.15})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(bx, b.y, b.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Bubble highlight specular reflection
                ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9})`;
                ctx.beginPath();
                ctx.arc(bx - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // When bubble floats off top, recycle to bottom
                if (b.y < -20) {
                    b.y = height + Math.random() * 30 + 10;
                    b.x = Math.random() * width;
                }
            }

            requestAnimationFrame(render);
        }
        render();
    }
    initAmbientCanvas();

    // -------------------------------------------------------------
    // 4. Underwater Bobbing & Floating Memories Physics
    // (Photos sink from top, settle into fixed underwater positions,
    // and gently bob up/down with buoyancy)
    // -------------------------------------------------------------
    const floatingCards = [];

    // Screen distribution anchor layout ratios for 7 memories
    function getAnchorSlot(index) {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            // Mobile 2-column layout (Left & Right alternating down)
            const mobileSlots = [
                { rx: 0.28, ry: 0.24, rot: -6 },   // 1. First Meet
                { rx: 0.72, ry: 0.27, rot: 7 },    // 2. Happy New Year
                { rx: 0.26, ry: 0.42, rot: 5 },    // 3. Crazy Squad
                { rx: 0.74, ry: 0.46, rot: -5 },   // 4. Mr. Snowman
                { rx: 0.50, ry: 0.60, rot: 3 },    // 5. Roomie
                { rx: 0.28, ry: 0.75, rot: -7 },   // 6. Mariana Farewell
                { rx: 0.72, ry: 0.79, rot: 6 }     // 7. Trip to the Sea
            ];
            return mobileSlots[index % mobileSlots.length];
        } else {
            // Desktop 7-point balanced constellation layout
            const desktopSlots = [
                { rx: 0.16, ry: 0.35, rot: -7 },   // 1. First Meet
                { rx: 0.84, ry: 0.33, rot: 8 },    // 2. Happy New Year
                { rx: 0.20, ry: 0.59, rot: 5 },    // 3. Crazy Squad
                { rx: 0.80, ry: 0.57, rot: -6 },   // 4. Mr. Snowman
                { rx: 0.50, ry: 0.48, rot: 3 },    // 5. Roomie (Center floating card)
                { rx: 0.32, ry: 0.79, rot: -5 },   // 6. Mariana Farewell
                { rx: 0.68, ry: 0.78, rot: 6 }     // 7. Trip to the Sea
            ];
            return desktopSlots[index % desktopSlots.length];
        }
    }

    class UnderwaterCard {
        constructor(memoryData, index) {
            this.data = memoryData;
            this.index = index;
            this.element = document.createElement('div');
            this.element.className = 'floating-photo';

            // Target Anchor Position (where it settles in the water)
            const slot = getAnchorSlot(index);
            this.baseRot = slot.rot;
            this.anchorX = slot.rx * window.innerWidth;
            this.anchorY = slot.ry * window.innerHeight;

            // Start position: Dropping from water surface (above screen)
            this.x = this.anchorX + (Math.random() - 0.5) * 60;
            this.y = -180 - (index * 120); // Staggered drop timing
            this.currentRot = this.baseRot;

            // Physics / Buoyancy variables
            this.vy = 0;
            this.vx = 0;
            this.isSettled = false;
            this.isHovered = false;
            this.isDragging = false;

            // Bobbing oscillations
            this.bobAngleY = Math.random() * Math.PI * 2;
            this.bobAngleX = Math.random() * Math.PI * 2;
            this.bobSpeedY = 0.02 + Math.random() * 0.015;
            this.bobSpeedX = 0.015 + Math.random() * 0.01;
            this.bobAmpY = 14 + Math.random() * 8; // Gentle up & down float
            this.bobAmpX = 8 + Math.random() * 6;  // Gentle side drift

            // Drag variables
            this.dragStartX = 0;
            this.dragStartY = 0;
            this.initialCardX = 0;
            this.initialCardY = 0;
            this.hasDraggedMeaningfully = false;

            this.renderHTML();
            this.bindEvents();
            underwaterStage.appendChild(this.element);
            this.applyTransform();
        }

        renderHTML() {
            // 오직 사용자가 올린 실제 사진 1장만 전체적으로 꽉 채워 표시 (플레이스홀더 및 불필요한 텍스트 완전 제거)
            this.element.innerHTML = `
                <div class="polaroid-card">
                    <div class="photo-frame">
                        <img src="${this.data.coverImage}" alt="${this.data.title}" />
                    </div>
                    <div class="polaroid-title">${this.data.title}</div>
                </div>
            `;
        }

        bindEvents() {
            // Mouse Hover: 래퍼에 hovered 클래스 토글 (CSS가 제자리에서 부드럽게 확대)
            this.element.addEventListener('mouseenter', () => {
                this.isHovered = true;
                this.element.classList.add('hovered');
            });

            this.element.addEventListener('mouseleave', () => {
                this.isHovered = false;
                this.element.classList.remove('hovered');
            });

            // Dragging & Clicking Handling
            const onPointerDown = (e) => {
                this.isDragging = true;
                this.hasDraggedMeaningfully = false;
                this.element.classList.add('dragging');
                
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                this.dragStartX = clientX;
                this.dragStartY = clientY;
                this.initialCardX = this.x;
                this.initialCardY = this.y;

                window.addEventListener('mousemove', onPointerMove);
                window.addEventListener('mouseup', onPointerUp);
                window.addEventListener('touchmove', onPointerMove, { passive: false });
                window.addEventListener('touchend', onPointerUp);
            };

            const onPointerMove = (e) => {
                if (!this.isDragging) return;
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                const dx = clientX - this.dragStartX;
                const dy = clientY - this.dragStartY;

                if (Math.hypot(dx, dy) > 8) {
                    this.hasDraggedMeaningfully = true;
                }

                this.x = this.initialCardX + dx;
                this.y = this.initialCardY + dy;
                // Move anchor so it keeps bobbing at the new spot!
                this.anchorX = this.x;
                this.anchorY = this.y;
                this.applyTransform();
            };

            const onPointerUp = (e) => {
                if (!this.isDragging) return;
                this.isDragging = false;
                this.element.classList.remove('dragging');

                window.removeEventListener('mousemove', onPointerMove);
                window.removeEventListener('mouseup', onPointerUp);
                window.removeEventListener('touchmove', onPointerMove);
                window.removeEventListener('touchend', onPointerUp);

                // If not dragged significantly, it's a CLICK!
                if (!this.hasDraggedMeaningfully) {
                    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
                    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
                    createClickSparkles(clientX || (this.x + 80), clientY || (this.y + 100));
                    // 사진 클릭 시 라이트박스 슬라이더 열기 (화살표로 여러 장 넘김 가능!)
                    openLightboxGallery(this.data, 0);
                }
            };

            this.element.addEventListener('mousedown', onPointerDown);
            this.element.addEventListener('touchstart', onPointerDown, { passive: true });
        }

        update() {
            if (this.isDragging) return;

            if (!this.isSettled) {
                // Sinking down from water surface into its anchor position
                const dy = this.anchorY - this.y;
                this.vy = dy * 0.045; // Gentle spring easing
                this.y += this.vy;

                const dx = this.anchorX - this.x;
                this.vx = dx * 0.045;
                this.x += this.vx;

                if (Math.abs(dy) < 2 && Math.abs(dx) < 2) {
                    this.isSettled = true;
                    this.y = this.anchorY;
                    this.x = this.anchorX;
                }
            } else {
                // Settled in water: Buoyancy Bobbing (호버 중엔 제자리에 멈춤!)
                if (!this.isHovered) {
                    this.bobAngleY += this.bobSpeedY;
                    this.bobAngleX += this.bobSpeedX;

                    const offsetY = Math.sin(this.bobAngleY) * this.bobAmpY;
                    const offsetX = Math.cos(this.bobAngleX) * this.bobAmpX;
                    const offsetRot = Math.sin(this.bobAngleY * 0.8) * 4;

                    this.currentX = this.anchorX + offsetX;
                    this.currentY = this.anchorY + offsetY;
                    this.currentRot = this.baseRot + offsetRot;
                }
            }

            this.applyTransform();
        }

        applyTransform() {
            const posX = this.currentX || this.x;
            const posY = this.currentY || this.y;
            const rot = this.currentRot || this.baseRot;

            // 래퍼는 오직 좌표와 기본 각도만 담당! 제자리에서 고정된 채 유영
            this.element.style.transform = `translate3d(${posX - 80}px, ${posY - 107}px, 0) rotate(${rot}deg)`;
        }

        recalculateAnchors() {
            const slot = getAnchorSlot(this.index);
            this.anchorX = slot.rx * window.innerWidth;
            this.anchorY = slot.ry * window.innerHeight;
            this.baseRot = slot.rot;
            this.isSettled = false;
        }
    }

    // Initialize underwater cards
    MEMORIES.forEach((item, idx) => {
        const card = new UnderwaterCard(item, idx);
        floatingCards.push(card);
    });

    // Window Resize Responsive Positioning
    window.addEventListener('resize', () => {
        floatingCards.forEach(c => c.recalculateAnchors());
    });

    // Continuous Animation Loop for Buoyancy
    function animationLoop() {
        floatingCards.forEach(c => c.update());
        requestAnimationFrame(animationLoop);
    }
    animationLoop();

    // -------------------------------------------------------------
    // 6. Click Particle Effect (Sparkles & Bubble Bursts)
    // -------------------------------------------------------------
    const SPARKLE_CHARS = ['✦', '✧', '⋆', '🫧', '✨', '🤍', '🌸'];
    function createClickSparkles(x, y) {
        const count = 14;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'click-particle';
            p.textContent = SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)];
            
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 90 + 40;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            const rot = (Math.random() - 0.5) * 360;

            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.setProperty('--tx', `${tx}px`);
            p.style.setProperty('--ty', `${ty}px`);
            p.style.setProperty('--rot', `${rot}deg`);
            p.style.color = ['#ffe382', '#bcf3eb', '#ffffff', '#ffd0dc'][Math.floor(Math.random() * 4)];

            document.body.appendChild(p);
            setTimeout(() => {
                if (p.parentElement) p.parentElement.removeChild(p);
            }, 850);
        }
    }

    // -------------------------------------------------------------
    // 7. Modal 1: Memory Album (Multiple Photos Collection)
    // -------------------------------------------------------------
    function openMemoryModal(data) {
        modalTitle.textContent = data.title;
        modalDate.textContent = data.date || "Memory";
        modalDesc.textContent = data.description || "";
        modalGallery.innerHTML = '';

        const photos = data.photos && data.photos.length > 0 ? data.photos : [
            { src: data.coverImage || "", caption: "Cherished Moment 🤍" }
        ];

        photos.forEach((p, idx) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const randomTilt = (Math.random() - 0.5) * 6;
            item.style.transform = `rotate(${randomTilt}deg)`;

            item.innerHTML = `
                <div class="gallery-thumb-wrap">
                    <img src="${p.src}" alt="" />
                </div>
            `;

            item.addEventListener('click', () => {
                openLightbox(p.src, p.caption || data.title, idx + 1);
            });

            modalGallery.appendChild(item);
        });

        memoryModal.classList.add('active');
        memoryModal.setAttribute('aria-hidden', 'false');
    }

    function closeMemoryModal() {
        memoryModal.classList.remove('active');
        memoryModal.setAttribute('aria-hidden', 'true');
    }

    // -------------------------------------------------------------
    // 8. Modal 2: Birthday Letter
    // -------------------------------------------------------------
    function openLetterModal() {
        letterModal.classList.add('active');
        letterModal.setAttribute('aria-hidden', 'false');
        createClickSparkles(window.innerWidth - 120, 60);
    }

    function closeLetterModal() {
        letterModal.classList.remove('active');
        letterModal.setAttribute('aria-hidden', 'true');
    }

    if (letterOpenBtn) {
        letterOpenBtn.addEventListener('click', openLetterModal);
    }

    // -------------------------------------------------------------
    // 9. Lightbox Slider (화살표로 사진 넘기기 기능)
    // -------------------------------------------------------------
    let currentGalleryPhotos = [];
    let currentGalleryIndex = 0;

    function openLightboxGallery(memoryData, startIndex = 0) {
        currentGalleryPhotos = (memoryData.photos && memoryData.photos.length > 0)
            ? memoryData.photos
            : [{ src: memoryData.coverImage, caption: memoryData.title }];

        currentGalleryIndex = startIndex;
        updateLightboxView();

        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
    }

    function updateLightboxView() {
        if (!currentGalleryPhotos || currentGalleryPhotos.length === 0) return;
        const photo = currentGalleryPhotos[currentGalleryIndex];

        lightboxCaption.textContent = photo.caption || "";

        // 기존 재생 중인 영상이 있으면 정지
        const existingVideo = lightboxImgContainer.querySelector('video');
        if (existingVideo) existingVideo.pause();

        lightboxImgContainer.innerHTML = '';

        const isVideo = photo.src.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) || photo.type === 'video';
        if (isVideo) {
            const video = document.createElement('video');
            video.src = photo.src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            lightboxImgContainer.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.caption || '';
            lightboxImgContainer.appendChild(img);
        }

        // 사진 또는 영상이 2개 이상일 때만 좌우 화살표와 카운터(1/2) 표시
        if (currentGalleryPhotos.length > 1) {
            if (lightboxPrev) lightboxPrev.style.display = 'flex';
            if (lightboxNext) lightboxNext.style.display = 'flex';
            if (lightboxCounter) {
                lightboxCounter.style.display = 'block';
                lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryPhotos.length}`;
            }
        } else {
            if (lightboxPrev) lightboxPrev.style.display = 'none';
            if (lightboxNext) lightboxNext.style.display = 'none';
            if (lightboxCounter) lightboxCounter.style.display = 'none';
        }
    }

    function showPrevPhoto() {
        if (currentGalleryPhotos.length <= 1) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryPhotos.length) % currentGalleryPhotos.length;
        updateLightboxView();
    }

    function showNextPhoto() {
        if (currentGalleryPhotos.length <= 1) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryPhotos.length;
        updateLightboxView();
    }

    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);

    // 하위 호환 단일 openLightbox
    function openLightbox(src, caption, index) {
        openLightboxGallery({ coverImage: src, title: caption, photos: [{ src, caption }] }, 0);
    }

    function closeLightbox() {
        const video = lightboxImgContainer.querySelector('video');
        if (video) video.pause();
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
    }

    // Close buttons & backdrops
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeMemoryModal();
            closeLetterModal();
        });
    });

    document.querySelectorAll('.modal-backdrop').forEach(bd => {
        bd.addEventListener('click', () => {
            closeMemoryModal();
            closeLetterModal();
        });
    });

    document.querySelector('.lightbox-close-btn')?.addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightbox);

    // Keyboard navigation: ESC to close, Left/Right Arrow to slide photos
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeMemoryModal();
            closeLetterModal();
        } else if (e.key === 'ArrowLeft') {
            if (lightboxModal.classList.contains('active')) {
                showPrevPhoto();
            }
        } else if (e.key === 'ArrowRight') {
            if (lightboxModal.classList.contains('active')) {
                showNextPhoto();
            }
        }
    });

    // -------------------------------------------------------------
    // 10. Web Audio API Music Box (Happy Birthday Melody)
    // -------------------------------------------------------------
    let audioCtx = null;
    let isBgmPlaying = false;
    let bgmTimeoutId = null;

    const NOTES = {
        C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00,
        A4: 440.00, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25,
        F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
    };

    const HBD_SONG = [
        { note: NOTES.G4, duration: 0.35, delay: 0 },
        { note: NOTES.G4, duration: 0.35, delay: 0.4 },
        { note: NOTES.A4, duration: 0.7, delay: 0.8 },
        { note: NOTES.G4, duration: 0.7, delay: 1.6 },
        { note: NOTES.C5, duration: 0.7, delay: 2.4 },
        { note: NOTES.B4, duration: 1.2, delay: 3.2 },

        { note: NOTES.G4, duration: 0.35, delay: 4.6 },
        { note: NOTES.G4, duration: 0.35, delay: 5.0 },
        { note: NOTES.A4, duration: 0.7, delay: 5.4 },
        { note: NOTES.G4, duration: 0.7, delay: 6.2 },
        { note: NOTES.D5, duration: 0.7, delay: 7.0 },
        { note: NOTES.C5, duration: 1.2, delay: 7.8 },

        { note: NOTES.G4, duration: 0.35, delay: 9.2 },
        { note: NOTES.G4, duration: 0.35, delay: 9.6 },
        { note: NOTES.G5, duration: 0.7, delay: 10.0 },
        { note: NOTES.E5, duration: 0.7, delay: 10.8 },
        { note: NOTES.C5, duration: 0.7, delay: 11.6 },
        { note: NOTES.B4, duration: 0.7, delay: 12.4 },
        { note: NOTES.A4, duration: 1.1, delay: 13.2 },

        { note: NOTES.F5, duration: 0.35, delay: 14.6 },
        { note: NOTES.F5, duration: 0.35, delay: 15.0 },
        { note: NOTES.E5, duration: 0.7, delay: 15.4 },
        { note: NOTES.C5, duration: 0.7, delay: 16.2 },
        { note: NOTES.D5, duration: 0.7, delay: 17.0 },
        { note: NOTES.C5, duration: 1.8, delay: 17.8 }
    ];

    function playNote(freq, startTime, duration) {
        if (!audioCtx || !isBgmPlaying) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.9);
    }

    function playMusicLoop() {
        if (!isBgmPlaying || !audioCtx) return;
        const now = audioCtx.currentTime;
        const totalDuration = 20.5;

        HBD_SONG.forEach(item => {
            playNote(item.note, now + item.delay, item.duration);
        });

        bgmTimeoutId = setTimeout(() => {
            if (isBgmPlaying) playMusicLoop();
        }, totalDuration * 1000);
    }

    function toggleBGM() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        isBgmPlaying = !isBgmPlaying;
        if (isBgmPlaying) {
            bgmToggleBtn.classList.add('active');
            const lbl = bgmToggleBtn.querySelector('.btn-label');
            if (lbl) lbl.textContent = 'BGM Pause';
            playMusicLoop();
        } else {
            bgmToggleBtn.classList.remove('active');
            const lbl = bgmToggleBtn.querySelector('.btn-label');
            if (lbl) lbl.textContent = 'BGM Play';
            if (bgmTimeoutId) clearTimeout(bgmTimeoutId);
        }
    }

    if (bgmToggleBtn) {
        bgmToggleBtn.addEventListener('click', toggleBGM);
    }

    // AudioContext unlock on first user click
    window.addEventListener('click', function unlockAudio() {
        window.removeEventListener('click', unlockAudio);
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
    }, { once: true });

})();
