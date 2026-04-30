document.addEventListener("DOMContentLoaded", () => {
    const totalMaterias = 37;
    const progressText = document.getElementById('progress-text');
    const columnsIds = ['cursar', 'regular', 'rendida'];
    let stats = { count: 0, percentage: 0 };

    // --- 1. PERSISTENCIA DE DATOS (LocalStorage) ---
    function saveState() {
        const state = {};
        columnsIds.forEach(id => {
            const column = document.getElementById(id);
            // Guardamos el HTML interno de la columna para mantener orden y clases
            state[id] = column.innerHTML;
        });
        localStorage.setItem('miPlanEstudio_v1', JSON.stringify(state));
    }

    function loadState() {
        const saved = localStorage.getItem('miPlanEstudio_v1');
        if (saved) {
            const state = JSON.parse(saved);
            columnsIds.forEach(id => {
                if (state[id]) {
                    document.getElementById(id).innerHTML = state[id];
                }
            });
        }
    }

    // --- 2. ACTUALIZACIÓN DE PROGRESO ANIMADO ---
    function updateProgress(isInitial = false) {
        const rendidaCol = document.getElementById('rendida');
        const newCount = rendidaCol.children.length;
        const newPercentage = Math.floor((newCount / totalMaterias) * 100);

        anime({
            targets: stats,
            count: newCount,
            percentage: newPercentage,
            round: 1,
            easing: 'easeOutExpo',
            duration: isInitial ? 0 : 1000,
            update: () => {
                progressText.innerText = `${stats.count}/${totalMaterias} (${stats.percentage}%)`;
                if (stats.percentage === 100) {
                    progressText.classList.add('goal-reached');
                } else {
                    progressText.classList.remove('goal-reached');
                }
            }
        });
    }

    // --- 3. LÓGICA DE FUEGOS ARTIFICIALES ---
    function lanzarFuegos() {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            
            confetti({ 
                ...defaults, 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            });
            confetti({ 
                ...defaults, 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            });
        }, 250);
    }

    // --- 4. INICIALIZACIÓN ---
    
    // Cargar lo guardado antes de que Sortable tome el control
    loadState();

    // Animación de entrada para todas las cards
    anime({
        targets: '.card',
        scale: [0.5, 1],
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(20),
        easing: 'easeOutElastic(1, .8)'
    });

    columnsIds.forEach(id => {
        new Sortable(document.getElementById(id), {
            group: 'plan',
            animation: 150,
            delay: 100,
            delayOnTouchOnly: true,
            
            // Micro-interacción: Inclinación al empezar a arrastrar
            onStart: (evt) => {
                anime({
                    targets: evt.item,
                    rotate: 4, // Se inclina un poco a la derecha
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            },

            onEnd: (evt) => {
                // Quitar inclinación al soltar
                anime({
                    targets: evt.item,
                    rotate: 0,
                    duration: 200,
                    easing: 'easeOutQuad'
                });

                // Si se movió a una columna distinta o cambió de posición
                updateProgress();
                saveState();

                // Feedback si entró en la columna Rendida
                if (evt.to.id === 'rendida' && evt.from.id !== 'rendida') {
                    anime({
                        targets: evt.item,
                        scale: [1, 1.2, 1],
                        duration: 400,
                        easing: 'easeInOutQuad'
                    });
                    lanzarFuegos();
                }
            }
        });
    });

    // Actualizar porcentaje inicial basado en la carga del LocalStorage
    updateProgress(true);
});