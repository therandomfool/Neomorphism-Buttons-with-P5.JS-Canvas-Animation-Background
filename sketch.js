const particles = [];
let cnt = 0;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-100')
    const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 100);
    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background('rgba(248,248,255, 0.6)');
    
    particles.forEach((particle, idx) => {
        particle.update();
        particle.draw();
        particle.checkParticles(particles.slice(idx));
    });
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.size = 5;
    }

    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    draw() {
        noStroke();
        fill('rgba(25, 25, 2, 0.045)');
        circle(this.pos.x, this.pos.y, this.size * 2);
    }

    edges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }

        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }

    }

    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            if (d < 120) {
                const alpha = map(d, 0, 120, 0, 0.25)
                stroke(`rgba(163, 250, 250, ${alpha})`);
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        });
    }
}