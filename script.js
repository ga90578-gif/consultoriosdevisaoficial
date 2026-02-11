function openTab(evt, tabName, contentClass) {
    var i, tabcontent, tablinks;

    // Hide all elements with the specific content class
    tabcontent = document.getElementsByClassName(contentClass);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Get all buttons in the same container as the clicked button
    // This allows us to deactivate only the buttons in the current tab group
    var buttonContainer = evt.currentTarget.parentNode;
    tablinks = buttonContainer.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content
    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.classList.add("active");
    }

    // Activate the clicked button
    evt.currentTarget.classList.add("active");
}



document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('show');
            }
        });
    }
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-links a');
    const navLinksContainer = document.querySelector('.nav-links');
    const mainContent = document.getElementById('main-content');
    const nosotrosView = document.getElementById('nosotros-view');
    const preciosView = document.getElementById('precios-view');
    const preguntasView = document.getElementById('preguntas-view');
    const subirInformesView = document.getElementById('subir-informes-view');


    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {

            // Close mobile menu on click (Reliable way)
            const menu = document.querySelector('.nav-links');
            if (menu) menu.classList.remove('show');

            const targetId = this.getAttribute('href');

            // Set active class on menu items
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');


            // --- NOSOTROS VIEW ---
            if (targetId === '#nosotros') {
                e.preventDefault();
                if (mainContent) mainContent.style.display = 'none';
                if (preciosView) preciosView.style.display = 'none';
                if (preguntasView) preguntasView.style.display = 'none';
                if (subirInformesView) subirInformesView.style.display = 'none';


                if (nosotrosView) {
                    nosotrosView.style.display = 'block';
                    window.scrollTo(0, 0); // Reset scroll to top
                    nosotrosView.style.animation = 'none';
                    nosotrosView.offsetHeight;
                    nosotrosView.style.animation = 'fadeInBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            }
            // --- PRECIOS VIEW ---
            else if (targetId === '#precios') {
                e.preventDefault();
                if (mainContent) mainContent.style.display = 'none';
                if (nosotrosView) nosotrosView.style.display = 'none';
                if (preguntasView) preguntasView.style.display = 'none';
                if (subirInformesView) subirInformesView.style.display = 'none';

                if (preciosView) {
                    preciosView.style.display = 'block';
                    window.scrollTo(0, 0); // Reset scroll to top
                    preciosView.style.animation = 'none';
                    preciosView.offsetHeight;
                    preciosView.style.animation = 'fadeInBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            }
            // --- PREGUNTAS VIEW ---
            else if (targetId === '#preguntas') {
                e.preventDefault();
                if (mainContent) mainContent.style.display = 'none';
                if (nosotrosView) nosotrosView.style.display = 'none';
                if (preciosView) preciosView.style.display = 'none';
                if (subirInformesView) subirInformesView.style.display = 'none';

                if (preguntasView) {
                    preguntasView.style.display = 'block';
                    window.scrollTo(0, 0);
                    preguntasView.style.animation = 'none';
                    preguntasView.offsetHeight;
                    preguntasView.style.animation = 'fadeInBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            }
            // --- SUBIR INFORMES VIEW ---
            else if (targetId === '#subir-informes') {
                e.preventDefault();
                if (mainContent) mainContent.style.display = 'none';
                if (nosotrosView) nosotrosView.style.display = 'none';
                if (preciosView) preciosView.style.display = 'none';
                if (preguntasView) preguntasView.style.display = 'none';

                if (subirInformesView) {
                    subirInformesView.style.display = 'block';
                    window.scrollTo(0, 0);
                    subirInformesView.style.animation = 'none';
                    subirInformesView.offsetHeight;
                    subirInformesView.style.animation = 'fadeInBlur 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            }
            // --- MAIN CONTENT ---
            else {
                if (targetId.startsWith('#') && targetId !== '#') {
                    if (mainContent) mainContent.style.display = 'block';
                    if (nosotrosView) nosotrosView.style.display = 'none';
                    if (preciosView) preciosView.style.display = 'none';
                    if (preguntasView) preguntasView.style.display = 'none';
                    if (subirInformesView) subirInformesView.style.display = 'none';
                }
            }
        });
    });



    // File Upload Display Logic
    const fileInput = document.getElementById('fileUpload');
    const fileNameDisplay = document.getElementById('fileNameDisplay');

    if (fileInput) {
        fileInput.addEventListener('change', function (e) {
            if (this.files && this.files.length > 0) {
                // Check size first
                if (this.files[0].size > 5 * 1024 * 1024) {
                    alert("El archivo es demasiado grande. El límite es 5MB.");
                    this.value = ""; // Clear
                    fileNameDisplay.textContent = "";
                    return;
                }

                // Create display with remove button
                fileNameDisplay.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; background: #eef2f7; padding: 5px 10px; border-radius: 4px; border: 1px solid #d1d9e6;">
                        <span style="color: #333; font-weight: 500;">${this.files[0].name}</span>
                        <i class="fas fa-times-circle" id="removeFileBtn" style="color: #dc3545; cursor: pointer; font-size: 1.1rem;" title="Eliminar archivo"></i>
                    </div>
                `;

                // Add event listener to the remove button
                document.getElementById('removeFileBtn').addEventListener('click', function () {
                    fileInput.value = ""; // Clear input
                    fileNameDisplay.innerHTML = ""; // Clear display
                });

            } else {
                fileNameDisplay.textContent = '';
            }
        });
    }

    // Toast Notification Logic
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">
                <h4>${type === 'success' ? 'Éxito' : 'Error'}</h4>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 4000);
    }

    // Helper: Reset validation state
    function clearValidation(form) {
        const inputs = form.querySelectorAll('.form-group input, .form-group select');
        const msgs = form.querySelectorAll('.error-msg');

        inputs.forEach(input => input.classList.remove('error'));
        msgs.forEach(msg => msg.textContent = '');
    }

    // Helper: Show error on specific input
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const inputEl = formGroup.querySelector('input, select');
        const msgEl = formGroup.querySelector('.error-msg');

        inputEl.classList.add('error');
        if (msgEl) msgEl.textContent = message;
    }

    // Form Submission Logic
    const uploadForm = document.getElementById('upload-form');

    // Dynamic Redirect URL for Formsubmit
    const nextRedirectInput = document.getElementById('next-redirect');
    if (nextRedirectInput) {
        // Redirect back to the same page with ?sent=true
        nextRedirectInput.value = window.location.href.split('?')[0] + '?sent=true';
    }

    // Check for success flag in URL (Legacy check, kept just in case)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sent') === 'true') {
        showToast('¡Informe y archivo enviados con éxito!', 'success');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', function (e) {

            // Clear previous errors
            clearValidation(this);

            let isValid = true;

            // 1. Validate Text/Select Inputs
            const inputs = this.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    showError(input, 'Este campo es obligatorio.');
                    isValid = false;
                }
            });

            // 2. Validate Phone
            const phoneInput = document.getElementById('phoneNumber');
            if (phoneInput && phoneInput.value.trim()) {
                if (phoneInput.value.replace(/\D/g, '').length < 10) {
                    showError(phoneInput, 'Número de teléfono inválido.');
                    isValid = false;
                }
            }

            // 3. Validate Email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && emailInput.value.trim()) {
                if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailInput, 'Por favor, introduce un correo electrónico válido.');
                    isValid = false;
                }
            }

            // 4. Validate File
            const fileInput = document.getElementById('fileUpload');
            if (fileInput.files.length === 0) {
                showToast('Por favor seleccione un archivo.', 'error');
                isValid = false;
            } else if (fileInput.files[0].size > 5 * 1024 * 1024) {
                showToast('El archivo es demasiado grande (Máx 5MB).', 'error');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault(); // Stop submission only if invalid
                showToast('Por favor complete todos los campos requeridos.', 'error');
                return;
            }

            // If valid, allow the form to submit naturally to Formsubmit
            // We just update the button state
            const submitBtn = this.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            // No e.preventDefault() here!
        });
    }

    // --- INSTAGRAM FEED LOGIC ---
    const instaFeedContainer = document.getElementById('insta-feed-container');

    // Initial Mock Data (3 posts)
    // REEMPLAZAR CON TUS DATOS REALES
    let instaPosts = [
        {
            id: 1,
            caption: "✨ ¡Tu trámite de visa ahora es más fácil! ✨ Escríbenos por WhatsApp.",
            date: "Septiembre 2, 2025",
            imageUrl: "insta-1.png", // Imagen corregida
            postUrl: "https://www.instagram.com/p/DOGpaOiDUsv/"
        },
        {
            id: 2,
            caption: "Información importante sobre tu cita consular.",
            date: "Reciente",
            imageUrl: "insta-2.png", // Imagen corregida
            postUrl: "https://www.instagram.com/p/DHTMU9AxPnV/"
        },
        {
            id: 3,
            caption: "Horarios y servicios disponibles para ti.",
            date: "Reciente",
            imageUrl: "insta-3.png?v=2", // Imagen actualizada
            postUrl: "https://www.instagram.com/p/DQCpOnijanC/"
        }
    ];

    function renderInstaFeed() {
        if (!instaFeedContainer) return;

        instaFeedContainer.innerHTML = ''; // Clear current feed

        instaPosts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = 'insta-item';

            postEl.innerHTML = `
                <div class="insta-img">
                    <img src="${post.imageUrl}" alt="Instagram Post" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://placehold.co/600x600?text=Imagen+No+Encontrada'">
                    <i class="fab fa-instagram" style="position:absolute; top:10px; right:10px; color:white; font-size:1.5rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);"></i>
                    <i class="fas fa-play" style="position:absolute; font-size:3rem; color:rgba(255,255,255,0.8); pointer-events:none;"></i>
                </div>
                <div class="insta-caption">
                    <p>${post.caption}</p>
                    <small style="display:block; margin-top:5px; opacity:0.7">${post.date}</small>
                </div>
            `;
            postEl.onclick = () => window.open(post.postUrl, '_blank');
            instaFeedContainer.appendChild(postEl);
        });
    }

    // FIFO Queue Logic: Remove oldest, add new
    function addNewInstaPost(newPostData) {
        if (instaPosts.length >= 3) {
            instaPosts.shift();
        }
        instaPosts.push(newPostData);
        renderInstaFeed();
    }
    renderInstaFeed();

    // Floating WhatsApp Button Logic
    // ensuring it's always there
    const floatWhatsapp = document.querySelector('.whatsapp-float');
    if (floatWhatsapp) {
        floatWhatsapp.classList.add('visible');
    }
});

