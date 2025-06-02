document.addEventListener('DOMContentLoaded', function () {
    const navIcons = document.querySelectorAll('.nav-icon');
    const mainContent = document.querySelector('.main-content');
    let activeSection = "carSection"; // Inicialización de la sección activa

    // Función para cargar dinámicamente contenido de una sección
    function loadSection(sectionId) {
        fetch(`sections/${sectionId}.html`)
            .then(res => res.text())
            .then(html => {
                // Extraer solo el contenido dentro de <body>
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const bodyContent = doc.querySelector('body').innerHTML;

                // Insertar el contenido en el contenedor principal
                mainContent.innerHTML = bodyContent;

                // Reprocesar scripts dinámicamente
                const scripts = doc.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.src = script.src;
                    newScript.type = script.type;
                    document.body.appendChild(newScript);
                });
            })
            .catch(err => console.error(err));
    }

    // Asignar eventos a los íconos de navegación
    navIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            // Cambiar visualmente el ícono activo
            navIcons.forEach(i => i.classList.remove('active-icon'));
            this.classList.add('active-icon');

            // ACTUALIZACIÓN: Actualizar la sección activa
            activeSection = this.getAttribute('data-section');

            // Cargar la sección correspondiente
            loadSection(activeSection);
        });
    });

    // Cargar la sección activa al cargar la página
    const activeIcon = document.querySelector('.nav-icon.active-icon');
    if (activeIcon) {
        const section = activeIcon.getAttribute('data-section');
        activeSection = section; // ACTUALIZACIÓN: Asegurar sincronización inicial
        loadSection(section);
    }

    // Manejo del botón para redirigir al formulario
    document.querySelector(".add-button").addEventListener("click", function () {
        if (activeSection === "carSection") {
            window.location.href = "sections/carForm.html"; // Redirige al formulario de carros
        } else if (activeSection === "motoSection") {
            window.location.href = "sections/motoForm.html"; // Redirige al formulario de motos
        } else {
            alert("No hay una sección activa.");
        }
    });
});
