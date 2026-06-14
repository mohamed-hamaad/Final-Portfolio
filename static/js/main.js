document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ANIMATIONS: Smooth Scroll Reveal Effect
    const revealElements = document.querySelectorAll('.reveal-element');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.98)';
        el.style.transition = 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
        revealObserver.observe(el);
    });

    

    const sections = document.querySelectorAll('section[id]'); 
    const navLinks = document.querySelectorAll('.nav-link');

    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                const activeSectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    
                    if (link.getAttribute('data-section') === activeSectionId) {
                        
                        link.classList.add('text-teal-500', 'dark:text-teal-400', 'after:scale-x-100');
                        link.classList.remove('text-slate-600', 'dark:text-slate-400');
                    } else {
                        
                        link.classList.remove('text-teal-500', 'dark:text-teal-400', 'after:scale-x-100');
                        link.classList.add('text-slate-600', 'dark:text-slate-400');
                    }
                });
            }
        });
    }, {
        rootMargin: "-30% 0px -60% 0px" 
    });

    
    sections.forEach(section => sectionObserver.observe(section));


    // 2. VIDEO MODAL: Dynamic Production Demos
    const videoButtons = document.querySelectorAll('.video-btn');
    const videoModal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (videoModal && modalIframe) {
        videoButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const videoUrl = button.getAttribute('data-video-target');
                
                if (videoUrl && videoUrl !== '#') {
                    modalIframe.setAttribute('src', videoUrl);
                    videoModal.classList.remove('hidden');
                    videoModal.classList.add('flex');
                    setTimeout(() => {
                        videoModal.classList.remove('opacity-0');
                        videoModal.classList.add('opacity-100');
                    }, 10);
                }
            });
        });

        const closeModal = () => {
            videoModal.classList.add('opacity-0');
            videoModal.classList.remove('opacity-100');
            setTimeout(() => {
                videoModal.classList.add('hidden');
                videoModal.classList.remove('flex');
                modalIframe.setAttribute('src', ''); 
            }, 300);
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeModal();
        });
    }

    
    // 3. GLOWING CURSOR EFFECT 
    const glowCursor = document.getElementById('glow-cursor');

    if (glowCursor) {
        window.addEventListener('mousemove', (e) => {
            glowCursor.style.opacity = '1'; 
            glowCursor.style.setProperty('--x', `${e.clientX}px`);
            glowCursor.style.setProperty('--y', `${e.clientY}px`);
        });

        document.addEventListener('mouseleave', () => {
            glowCursor.style.opacity = '0';
        });
    }
    

    // 4. INTERACTIVE API SANDBOX LOGIC
    const runStatusBtn = document.getElementById('run-status-check');
    const apiOutputPre = document.getElementById('api-output');
    const apiLoader = document.getElementById('api-loader');

    if (runStatusBtn && apiOutputPre && apiLoader) {
        runStatusBtn.addEventListener('click', () => {
            
            apiLoader.classList.remove('hidden');
            apiOutputPre.classList.remove('text-teal-400');
            apiOutputPre.classList.add('text-slate-500');
            runStatusBtn.disabled = true; 

            fetch('/api/system-status/')
                
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network payload transmission failed.');
                    }
                    return response.json(); 
                })
                
                .then(data => {
                    apiOutputPre.textContent = JSON.stringify(data, null, 2); 
                    apiOutputPre.classList.remove('text-slate-500');
                    apiOutputPre.classList.add('text-teal-400');
                })
                
                .catch(error => {
                    apiOutputPre.textContent = JSON.stringify({
                        "status": "Error",
                        "payload": error.message,
                        "transmission_failed": true
                    }, null, 2);
                    apiOutputPre.classList.add('text-rose-400');
                })
                
                .finally(() => {
                    apiLoader.classList.add('hidden');
                    runStatusBtn.disabled = false;
                });
        });
    }
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('contact-submit-btn');
    const feedbackBox = document.getElementById('contact-form-feedback');

    if (contactForm && submitBtn && feedbackBox) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            submitBtn.disabled = true;
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <div class="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin mr-2"></div>
                <span>sending your message...</span>
            `;
            
            
            const formData = new FormData(contactForm);
            
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    feedbackBox.classList.remove('hidden', 'border-rose-500/20', 'text-rose-400', 'bg-rose-500/5');
                    feedbackBox.classList.add('border-green-300/20', 'text-green-400', 'bg-green-700');
                    feedbackBox.textContent = `[ SUCCESS: ${data.message} ]`;

                    contactForm.reset();
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                
                feedbackBox.classList.remove('hidden', 'border-amber-500/20', 'text-amber-400', 'bg-amber-500/5');
                feedbackBox.classList.add('border-rose-500/20', 'text-rose-400', 'bg-rose-500/5');
                feedbackBox.textContent = `[ ERROR: ${error.message || 'Transmission failed.'} ]`;
            })
            .finally(() => {
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }
});