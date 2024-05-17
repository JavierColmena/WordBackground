
window.onload = () => {

    const colorButton = document.getElementById('colorButton')
    const colorValue = localStorage.getItem('colorValue') ? localStorage.getItem('colorValue') : 'cyan'

    const CANVAS = document.getElementById('canvas');
    const preCanvas = document.getElementById('preCanvas');
    const ctx = CANVAS.getContext('2d');
    const WIDTH = CANVAS.width = document.documentElement.clientWidth;
    const HEIGHT = CANVAS.height = document.documentElement.clientHeight;

    // preCanvas.style.width = `${window.screen.width}px`;
    // preCanvas.style.height = `${window.screen.height}px`;

    const FPS = 60;
    const SPEED = .3;
    const maxTileSize = 30;
    let particles = [];
    let mousePos = { x: undefined, y: undefined };

    const randomParticles = localStorage.getItem('randomParticles') ? localStorage.getItem('randomParticles').split(',') : ['default']

    if (!localStorage.getItem('randomParticles')) {
        localStorage.setItem('randomParticles', randomParticles.toString())
    }
    const fontSize = '25px'
    const areaRange = 150

    function getTouchPos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (evt.touches[0].clientX - rect.left) * scaleX;
        const y = (evt.touches[0].clientY - rect.top) * scaleY;
        return { x: x, y: y };
    }
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (evt.clientX - rect.left) * scaleX;
        const y = (evt.clientY - rect.top) * scaleY;
        return { x: x, y: y };
    }

    CANVAS.addEventListener('touchmove', (evt) => {
        mousePos = getTouchPos(CANVAS, evt);
    });
    CANVAS.addEventListener('mousemove', (evt) => {
        mousePos = getMousePos(CANVAS, evt);
    });
    CANVAS.addEventListener('mouseleave', (evt) => {
        mousePos = { x: undefined, y: undefined };
    });
    class Particle {
        constructor(x, y, tileSize) {
            this.x = x;
            this.y = y;
            this.tileSize = tileSize;
            // this.color = `rgba(${randomNum(255)},${randomNum(255)},${randomNum(255)},${Math.random() * 1})`;
            // this.color = 'white'
            this.randomVelocity();
            this.ranNumParticle = Math.floor(Math.random() * randomParticles.length)
        }
        draw() {
            ctx.beginPath();
            // ctx.arc(this.x, this.y, this.tileSize, 0, 2 * Math.PI);
            ctx.shadowColor = colorValue
            ctx.shadowBlur = 50;
            ctx.font = `${fontSize} Arial`;
            ctx.fillText(randomParticles[this.ranNumParticle], this.x, this.y)
            ctx.fillStyle = colorValue;
            // ctx.fill();
        }

        update() {
            const dx = this.x - mousePos.x;
            const dy = this.y - mousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < areaRange) {
                const repulsionX = dx / distance;
                const repulsionY = dy / distance;

                this.x += (repulsionX * 5) * SPEED;
                this.y += (repulsionY * 5) * SPEED;
            } else {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > WIDTH) {
                    this.vx *= -1;
                }
                if (this.y < 0 || this.y > HEIGHT) {
                    this.vy *= -1;
                }
            }
        }


        randomVelocity() {
            this.vx = (Math.random() - 0.5) * SPEED;
            this.vy = (Math.random() - 0.5) * SPEED;
        }
    }

    function generateParticles(nParticles) {
        for (let i = 0; i < nParticles; i++) {
            let randomX = randomNum(WIDTH);
            let randomY = randomNum(HEIGHT);
            let randomSize = randomNum(maxTileSize - 10) + 10;

            let particle = new Particle(randomX, randomY, randomSize);
            particles.push(particle);
        }
    }

    function loop() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(loop);
    }

    function randomNum(num) {
        return Math.round(Math.random() * num);
    }

    generateParticles(100);
    loop();


    const openClose = document.getElementById('openClose');
    const menu = document.getElementById('menu');
    let isOpen = false;

    isOpen ? menu.classList.add('open') : menu.classList.add('hidden');
    isOpen ? openClose.innerHTML = 'Cerrar' : openClose.innerHTML = 'Abrir';


    openClose.onclick = () => {
        isOpen = !isOpen;

        if (isOpen) {
            menu.classList.add('open');
            menu.classList.remove('close');
            menu.classList.remove('hidden');
            openClose.innerHTML = 'Cerrar';
        } else {
            menu.classList.add('close');
            menu.classList.remove('open');
            openClose.innerHTML = 'Abrir';
        }
    };

};
