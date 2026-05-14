document.addEventListener('DOMContentLoaded', () => {
    // Sticky Header Functionality
    const header = document.querySelector("header");
    const firstSection = document.querySelector("main > section:first-of-type");

    let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // after first fold
  if (currentScroll > firstSection.offsetHeight) {

    // Add padding to prevent page jumping when header becomes fixed
    if (!header.classList.contains("is-sticky")) {
      document.body.style.paddingTop = header.offsetHeight + 'px';
      header.classList.add("is-sticky");
    }

    // scrolling UP -> hide navbar
    if (currentScroll < lastScroll) {
      header.style.transform = "translateY(-100%)";
    }

    // scrolling DOWN -> show navbar
    else {
      header.style.transform = "translateY(0)";
    }

  } else {
    // top area (normal state)
    if (header.classList.contains("is-sticky")) {
      document.body.style.paddingTop = '0px';
      header.classList.remove("is-sticky");
    }
    header.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});
    // Hero Carousel and Zoom functionality
    const mainHeroImage = document.getElementById('mainHeroImage');
    const heroThumbnails = document.querySelectorAll('#heroThumbnails .thumb');
    const heroPrevBtn = document.getElementById('heroPrev');
    const heroNextBtn = document.getElementById('heroNext');
    const zoomLens = document.getElementById('zoomLens');
    const zoomResult = document.getElementById('zoomResult');
    const mainImageWrapper = document.querySelector('.main-image-wrapper');

    if (mainHeroImage && heroThumbnails.length > 0) {
        let currentHeroIndex = 0;

        // Carousel Navigation
        function updateHeroImage(index) {
            currentHeroIndex = index;
            mainHeroImage.src = heroThumbnails[index].src;

            heroThumbnails.forEach(t => t.classList.remove('active'));
            heroThumbnails[index].classList.add('active');
        }

        heroThumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => updateHeroImage(index));
        });

        if (heroPrevBtn) {
            heroPrevBtn.addEventListener('click', () => {
                let newIndex = currentHeroIndex - 1;
                if (newIndex < 0) newIndex = heroThumbnails.length - 1;
                updateHeroImage(newIndex);
            });
        }

        if (heroNextBtn) {
            heroNextBtn.addEventListener('click', () => {
                let newIndex = currentHeroIndex + 1;
                if (newIndex >= heroThumbnails.length) newIndex = 0;
                updateHeroImage(newIndex);
            });
        }

        // Zoom functionality
        const isMobile = window.matchMedia("(max-width: 800px)").matches;

        if (!isMobile && zoomLens && zoomResult) {
            mainImageWrapper.addEventListener('mouseenter', () => {
                zoomLens.style.display = 'flex';
                zoomResult.style.display = 'block';
                zoomResult.style.backgroundImage = `url('${mainHeroImage.src}')`;
                const cx = zoomResult.offsetWidth / zoomLens.offsetWidth;
                const cy = zoomResult.offsetHeight / zoomLens.offsetHeight;
                zoomResult.style.backgroundSize = `${mainImageWrapper.offsetWidth * cx}px ${mainImageWrapper.offsetHeight * cy}px`;
            });

            mainImageWrapper.addEventListener('mouseleave', () => {
                zoomLens.style.display = 'none';
                zoomResult.style.display = 'none';
            });

            mainImageWrapper.addEventListener('mousemove', moveLens);

            function moveLens(e) {
                const pos = getCursorPos(e);
                let x = pos.x - (zoomLens.offsetWidth / 2);
                let y = pos.y - (zoomLens.offsetHeight / 2);

                if (x > mainImageWrapper.offsetWidth - zoomLens.offsetWidth) { x = mainImageWrapper.offsetWidth - zoomLens.offsetWidth; }
                if (x < 0) { x = 0; }
                if (y > mainImageWrapper.offsetHeight - zoomLens.offsetHeight) { y = mainImageWrapper.offsetHeight - zoomLens.offsetHeight; }
                if (y < 0) { y = 0; }

                zoomLens.style.left = x + 'px';
                zoomLens.style.top = y + 'px';

                const cx = zoomResult.offsetWidth / zoomLens.offsetWidth;
                const cy = zoomResult.offsetHeight / zoomLens.offsetHeight;

                zoomResult.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
            }

            function getCursorPos(e) {
                const a = mainImageWrapper.getBoundingClientRect();
                let x = e.pageX - a.left - window.pageXOffset;
                let y = e.pageY - a.top - window.pageYOffset;
                return { x: x, y: y };
            }
        }
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items first
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherIcon) {
                    otherIcon.textContent = '▼';
                }
            });

            // If the clicked item was not active, open it
            if (!isActive) {
                item.classList.add('active');
                if (icon) {
                    icon.textContent = '▲';
                }
            }
        });
    });

    // Process Carousel functionality
    const processTabs = document.querySelectorAll('.process-tab');
    const processTitle = document.getElementById('process-title');
    const processDesc = document.getElementById('process-desc');
    const processImg = document.getElementById('process-img');
    const processFeaturesList = document.getElementById('process-features-list');
    const prevBtn = document.getElementById('process-prev');
    const nextBtn = document.getElementById('process-next');

    const processData = [
        {
            title: "High-Grade Raw Material Selection",
            desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
            features: ["PE100 grade material", "Optimal molecular weight distribution"],
            image: "./assets/img.png"
        },
        {
            title: "Advanced Extrusion Process",
            desc: "State of the art extruders carefully melt and shape the raw material ensuring consistent output.",
            features: ["Temperature controlled", "High efficiency output"],
            image: "./assets/Frame 2147223897.png"
        },
        {
            title: "Precision Cooling",
            desc: "Rapid but controlled cooling solidifies the pipe geometry without inducing stress.",
            features: ["Water bath cooling", "Stress-free solidification"],
            image: "./assets/Frame 2147223897.png"
        },
        {
            title: "Accurate Sizing",
            desc: "Calibrators maintain the exact outer diameter and roundness of the pipe.",
            features: ["Vacuum calibration", "Continuous monitoring"],
            image: "./assets/Frame 2147223897.png"
        },
        {
            title: "Rigorous Quality Control",
            desc: "In-line testing verifies wall thickness, diameter, and surface finish.",
            features: ["Ultrasonic thickness testing", "Visual inspection"],
            image: "./assets/Frame 2147223897.png"
        },
        {
            title: "Automated Marking",
            desc: "Each pipe is laser-marked with specifications, date, and batch number.",
            features: ["Permanent laser marking", "Full traceability"],
            image: "./assets/Frame 2147223897.png"
        },
        {
            title: "Clean Cutting",
            desc: "Planetary saws cut the pipes to desired lengths cleanly and efficiently.",
            features: ["Dust-free cutting", "Exact length control"],
            image: "./assets/img.png"
        },
        {
            title: "Secure Packaging",
            desc: "Pipes are coiled or bundled securely for safe transport and storage.",
            features: ["UV protected packaging", "Easy handling design"],
            image: "./assets/img.png"
        }
    ];
    let currentProcessIndex = 0;

    function updateProcessCard(index) {
        currentProcessIndex = index;

        // Update tabs
        processTabs.forEach((tab, i) => {
            if (i === index) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update content
        const data = processData[index];
        if (!data) return;

        processTitle.textContent = data.title;
        processDesc.textContent = data.desc;
        processImg.src = data.image;

        // Update features
        processFeaturesList.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.className = 'process-feature';
            li.innerHTML = `<span class="feature-dot">✔</span> ${feature}`;
            processFeaturesList.appendChild(li);
        });
    }

    if (processTabs.length > 0) {
        processTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                updateProcessCard(index);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentProcessIndex - 1;
                if (newIndex < 0) newIndex = processData.length - 1;
                updateProcessCard(newIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentProcessIndex + 1;
                if (newIndex >= processData.length) newIndex = 0;
                updateProcessCard(newIndex);
            });
        }
    }

    // Industries Slider (Versatile Applications) functionality
    const industriesSlider = document.querySelector('.industries-slider');
    const indPrevBtn = document.querySelector('.industries-controls .prev-btn');
    const indNextBtn = document.querySelector('.industries-controls .next-btn');

    if (industriesSlider && indPrevBtn && indNextBtn) {
        // Scroll horizontally by roughly one card width (e.g. 300px)
        const scrollAmount = 320;

        indPrevBtn.addEventListener('click', () => {
            industriesSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        indNextBtn.addEventListener('click', () => {
            industriesSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Modal functionality
    const modal = document.getElementById('globalModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');

    const quoteBtn = document.querySelector('.hero-buttons .btn-primary');
    const downloadBtn = document.querySelector('.technical-specification .btn-outline-secondary');

    function openModal(title, submitText) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalSubmitBtn) modalSubmitBtn.textContent = submitText;
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (quoteBtn) {
        quoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Request a call back', 'Submit Form');
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Let us email the entire catelogue to you', 'Download Technical Sheet');
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
