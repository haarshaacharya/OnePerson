const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

const secretWebsite = document.getElementById("secretWebsite");
const container = document.querySelector(".container");

if (unlockBtn) {
    unlockBtn.addEventListener("click", checkPassword);
}

if (passwordInput) {
    passwordInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
}

async function checkPassword() {
    const enteredPassword = passwordInput.value;
    if (!enteredPassword) return;

    unlockBtn.textContent = "CHECKING...";

    try {
        const response = await fetch("/api/unlock", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: enteredPassword
            })
        });

        const data = await response.json();

        if (data.success) {
            unlockWebsite();
        } else {
            showRestrictedPopup();
            unlockBtn.textContent = "UNLOCK 🔓";
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
        unlockBtn.textContent = "UNLOCK 🔓";
    }

    passwordInput.value = "";
}

function showRestrictedPopup() {
    popup.classList.remove("hidden");
}

if (closePopup) {
    closePopup.addEventListener("click", function() {
        popup.classList.add("hidden");
        if (passwordInput) passwordInput.focus();
    });
}

function unlockWebsite() {
    const lockCard = document.querySelector(".lock-card");
    if (lockCard) {
        lockCard.classList.add("unlocking");
    }

    if (unlockBtn) {
        unlockBtn.textContent = "UNLOCKED ❤️";
        unlockBtn.style.background = "linear-gradient(135deg, #ff2a85, #ff758c)";
        unlockBtn.style.boxShadow = "0 0 35px rgba(255, 42, 133, 0.8)";
    }

    // 💖 Full Screen Heart Storm Burst
    triggerHeartFlood();

    // Smooth reveal of second page after screen fills with hearts
    setTimeout(() => {
        if (container) {
            container.style.display = "none";
        }
        if (secretWebsite) {
            secretWebsite.classList.remove("hidden");
            secretWebsite.classList.add("revealing");
        }
        // 🔄 Switch back to NORMAL OS cursor on second page
        disableRomanticCursor();
    }, 1700);
}


/* ============================================================
   💖 FULL SCREEN HEARTS FLOOD (PASSWORD UNLOCK)
   Fills the entire screen with floating, bursting 3D hearts
============================================================ */

function triggerHeartFlood() {
    const overlay = document.getElementById("heartStormOverlay");
    if (!overlay) return;

    overlay.innerHTML = "";
    overlay.classList.add("active");

    const heartSymbols = ["❤️", "💖", "💕", "💗", "💓", "🌸", "💘", "✨", "💞", "🌹"];
    const glowColors = [
        "rgba(255, 105, 180, 0.9)",
        "rgba(255, 20, 147, 0.9)",
        "rgba(255, 182, 193, 0.9)",
        "rgba(255, 77, 109, 0.9)",
        "rgba(244, 143, 177, 0.9)"
    ];

    const heartCount = 180;
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement("div");
        heart.className = "storm-heart";

        const isCenterBurst = i % 3 === 0;
        let startX, startY, txMid, tyMid, txEnd, tyEnd;

        if (isCenterBurst) {
            startX = width / 2 + (Math.random() - 0.5) * 120;
            startY = height / 2 + (Math.random() - 0.5) * 100;
            const angle = Math.random() * Math.PI * 2;
            const distMid = 140 + Math.random() * 260;
            const distEnd = 450 + Math.random() * 650;
            txMid = Math.cos(angle) * distMid;
            tyMid = Math.sin(angle) * distMid - 80;
            txEnd = Math.cos(angle) * distEnd;
            tyEnd = Math.sin(angle) * distEnd - 320;
        } else {
            startX = Math.random() * width;
            startY = height + Math.random() * 120;
            txMid = (Math.random() - 0.5) * 180;
            tyMid = -(height * 0.48 + Math.random() * 220);
            txEnd = (Math.random() - 0.5) * 380;
            tyEnd = -(height + 450 + Math.random() * 350);
        }

        const size = Math.floor(Math.random() * 38 + 18);
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        const glow = glowColors[Math.floor(Math.random() * glowColors.length)];
        const duration = (Math.random() * 1.4 + 2.0).toFixed(2);
        const delay = (Math.random() * 0.65).toFixed(2);

        heart.textContent = symbol;
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        heart.style.fontSize = `${size}px`;
        heart.style.setProperty("--duration", `${duration}s`);
        heart.style.setProperty("--glow-color", glow);
        heart.style.setProperty("--tx-mid", `${txMid}px`);
        heart.style.setProperty("--ty-mid", `${tyMid}px`);
        heart.style.setProperty("--tx-end", `${txEnd}px`);
        heart.style.setProperty("--ty-end", `${tyEnd}px`);
        heart.style.setProperty("--rot-start", `${Math.random() * 60 - 30}deg`);
        heart.style.setProperty("--rot-mid", `${Math.random() * 80 - 40}deg`);
        heart.style.setProperty("--rot-end", `${Math.random() * 120 - 60}deg`);
        heart.style.setProperty("--scale-peak", (Math.random() * 0.6 + 1.15).toFixed(2));
        heart.style.animationDelay = `${delay}s`;

        overlay.appendChild(heart);
    }
}


/* ============================================================
   🌊 OCEAN WAVES & PINK TIDE ANIMATION
   Soft, rhythmic coastal waves like gentle sea tides
============================================================ */

function initOceanWaves() {
    const canvas = document.getElementById("oceanWaves");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let startTime = performance.now();

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);
    }

    window.addEventListener("resize", resize);
    resize();

    // Luminous sea foam / sparkle particles
    const sparkleCount = 40;
    const sparkles = [];
    for (let i = 0; i < sparkleCount; i++) {
        sparkles.push({
            x: Math.random() * (width || window.innerWidth || 800),
            y: (height || window.innerHeight || 600) * (0.65 + Math.random() * 0.35),
            size: Math.random() * 2 + 0.8,
            speedY: Math.random() * 0.35 + 0.15,
            speedX: (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.6 + 0.2,
            maxLife: Math.random() * 180 + 120,
            life: Math.random() * 120
        });
    }

    const waveLayers = [
        {
            baseHeightRatio: 0.64,
            amplitude: 28,
            frequency1: 0.0022,
            frequency2: 0.0048,
            speed1: 0.0006,
            speed2: 0.0009,
            tideAmp: 22,
            tideSpeed: 0.0005,
            topColor: "rgba(255, 145, 190, 0.06)",
            bottomColor: "rgba(220, 80, 140, 0.10)",
            crestColor: "rgba(255, 185, 215, 0.20)",
            crestLineWidth: 1
        },
        {
            baseHeightRatio: 0.72,
            amplitude: 34,
            frequency1: 0.0031,
            frequency2: 0.0062,
            speed1: 0.0009,
            speed2: 0.0013,
            tideAmp: 28,
            tideSpeed: 0.0007,
            topColor: "rgba(255, 160, 195, 0.10)",
            bottomColor: "rgba(240, 95, 160, 0.15)",
            crestColor: "rgba(255, 205, 225, 0.35)",
            crestLineWidth: 1.5
        },
        {
            baseHeightRatio: 0.80,
            amplitude: 40,
            frequency1: 0.0040,
            frequency2: 0.0075,
            speed1: 0.0013,
            speed2: 0.0017,
            tideAmp: 34,
            tideSpeed: 0.0008,
            topColor: "rgba(255, 175, 210, 0.16)",
            bottomColor: "rgba(255, 130, 180, 0.22)",
            crestColor: "rgba(255, 225, 240, 0.50)",
            crestLineWidth: 2
        },
        {
            baseHeightRatio: 0.88,
            amplitude: 36,
            frequency1: 0.0052,
            frequency2: 0.0095,
            speed1: 0.0017,
            speed2: 0.0022,
            tideAmp: 42,
            tideSpeed: 0.00095,
            topColor: "rgba(255, 200, 225, 0.22)",
            bottomColor: "rgba(255, 155, 195, 0.28)",
            crestColor: "rgba(255, 245, 252, 0.75)",
            crestGlow: "rgba(255, 190, 220, 0.6)",
            crestLineWidth: 2.5
        }
    ];

    function draw(now) {
        ctx.clearRect(0, 0, width, height);

        const elapsed = (now - startTime) / 4500;
        const rawProgress = Math.min(1, Math.max(0, elapsed));
        const introEase = rawProgress < 0.5
            ? 4 * rawProgress * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

        const time = now;

        for (let i = 0; i < waveLayers.length; i++) {
            const wave = waveLayers[i];
            const tideOffset = Math.sin(time * wave.tideSpeed + i * 1.2) * wave.tideAmp * introEase;
            const baseY = height * wave.baseHeightRatio + (1 - introEase) * (height * 0.25) + tideOffset;

            ctx.beginPath();
            ctx.moveTo(0, height);

            const step = Math.max(4, Math.floor(width / 160));
            const crestPoints = [];

            for (let x = 0; x <= width + step; x += step) {
                const sin1 = Math.sin(x * wave.frequency1 + time * wave.speed1);
                const sin2 = Math.cos(x * wave.frequency2 - time * wave.speed2);
                const sin3 = Math.sin((x + time * 0.2) * 0.001 + i);

                const y = baseY + (sin1 * wave.amplitude + sin2 * (wave.amplitude * 0.45) + sin3 * 8) * introEase;

                ctx.lineTo(x, y);
                crestPoints.push({ x, y });
            }

            ctx.lineTo(width, height);
            ctx.closePath();

            const waveGrad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, height);
            waveGrad.addColorStop(0, wave.topColor);
            waveGrad.addColorStop(1, wave.bottomColor);

            ctx.fillStyle = waveGrad;
            ctx.fill();

            if (wave.crestColor && introEase > 0.05) {
                ctx.save();
                ctx.beginPath();
                for (let p = 0; p < crestPoints.length; p++) {
                    const pt = crestPoints[p];
                    if (p === 0) ctx.moveTo(pt.x, pt.y);
                    else ctx.lineTo(pt.x, pt.y);
                }
                ctx.strokeStyle = wave.crestColor;
                ctx.lineWidth = wave.crestLineWidth;
                if (wave.crestGlow) {
                    ctx.shadowColor = wave.crestGlow;
                    ctx.shadowBlur = 12;
                }
                ctx.stroke();
                ctx.restore();
            }
        }

        if (introEase > 0.1) {
            ctx.save();
            for (let i = 0; i < sparkles.length; i++) {
                const s = sparkles[i];
                s.life += 1;
                s.y -= s.speedY;
                s.x += s.speedX;

                if (s.life >= s.maxLife || s.y < height * 0.45) {
                    s.life = 0;
                    s.x = Math.random() * width;
                    s.y = height * (0.75 + Math.random() * 0.23);
                    s.alpha = Math.random() * 0.5 + 0.2;
                }

                const progress = s.life / s.maxLife;
                const particleAlpha = Math.sin(progress * Math.PI) * s.alpha * introEase;

                ctx.fillStyle = `rgba(255, 235, 245, ${particleAlpha})`;
                ctx.shadowColor = "rgba(255, 182, 193, 0.8)";
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
}


/* ============================================================
   💖 HORIZONTAL HEART STREAM & BIG RIGHT HEART ANIMATION
   Flowing trail of hearts draws a Big Glowing Heart on the right
   Then the trail fades away & the Big Heart pulses rhythmically!
============================================================ */

function initHeartScene() {
    const canvas = document.getElementById("heartCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);
    }

    window.addEventListener("resize", resize);
    resize();

    // Helper: draw single heart
    function drawHeart(x, y, size, color, alpha, rotation = 0, glow = null) {
        ctx.save();
        ctx.translate(x, y);
        if (rotation) ctx.rotate(rotation);
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
        ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.15);
        ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
        ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        if (glow) {
            ctx.shadowColor = glow;
            ctx.shadowBlur = 15;
        }
        ctx.fill();
        ctx.restore();
    }

    // Parametric Math Heart Point
    function getHeartPoint(t, cx, cy, scale) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return {
            x: cx + x * scale,
            y: cy + y * scale
        };
    }

    // Sparkles emitted by the big heart
    const heartDust = [];
    for (let i = 0; i < 30; i++) {
        heartDust.push({
            angle: Math.random() * Math.PI * 2,
            dist: Math.random() * 40,
            speed: Math.random() * 0.4 + 0.2,
            size: Math.random() * 3 + 1.2,
            alpha: Math.random() * 0.7 + 0.3,
            life: Math.random() * 100,
            maxLife: Math.random() * 120 + 80
        });
    }

    const CYCLE_DURATION = 11000; // 11 seconds full loop
    let animStart = performance.now();

    function render(now) {
        ctx.clearRect(0, 0, width, height);

        const cycleTime = (now - animStart) % CYCLE_DURATION;

        // Positioning for the Big Heart on the right side
        const isSmallScreen = width < 768;
        const targetX = isSmallScreen ? width * 0.5 : width * 0.78;
        const targetY = isSmallScreen ? height * 0.30 : height * 0.44;
        const heartScale = Math.min(width, height) * (isSmallScreen ? 0.0095 : 0.013);

        /* -------------------------------------------------------------
           PHASE 1: LINE TRAIN (0ms -> 3200ms)
           Horizontal stream of hearts travels from left to right side
        ------------------------------------------------------------- */
        let lineProgress = 0;
        let lineAlpha = 1;

        if (cycleTime < 3200) {
            lineProgress = cycleTime / 3200;
            lineAlpha = Math.min(1, cycleTime / 400);
        } else if (cycleTime < 6800) {
            lineProgress = 1;
            // Line fades away between 5000ms and 6800ms
            if (cycleTime > 5000) {
                lineAlpha = 1 - (cycleTime - 5000) / 1800;
            } else {
                lineAlpha = 1;
            }
        } else {
            lineProgress = 1;
            lineAlpha = 0; // Line is completely gone ("vo heart vali line chali jati hai")
        }

        // Draw Horizontal Heart Stream Line
        if (lineAlpha > 0.01) {
            const currentHeadX = -50 + (targetX + 50) * lineProgress;
            ctx.save();
            ctx.beginPath();

            const startX = -20;
            const segments = 60;
            for (let s = 0; s <= segments; s++) {
                const px = startX + (currentHeadX - startX) * (s / segments);
                // Fluid wavy pulse along the line
                const waveSin = Math.sin(px * 0.018 - now * 0.003) * 10 * (1 - s / segments * 0.4);
                const py = targetY + waveSin;

                if (s === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }

            // Glowing neon pink gradient stroke
            const lineGrad = ctx.createLinearGradient(0, targetY, currentHeadX, targetY);
            lineGrad.addColorStop(0, "rgba(255, 182, 193, 0)");
            lineGrad.addColorStop(0.3, `rgba(255, 130, 185, ${0.4 * lineAlpha})`);
            lineGrad.addColorStop(0.8, `rgba(255, 80, 160, ${0.85 * lineAlpha})`);
            lineGrad.addColorStop(1, `rgba(255, 230, 245, ${lineAlpha})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = "rgba(255, 60, 140, 0.9)";
            ctx.shadowBlur = 16;
            ctx.stroke();
            ctx.restore();

            // Draw mini hearts trailing along the horizontal line
            const miniHeartCount = 14;
            for (let m = 0; m < miniHeartCount; m++) {
                const frac = ((now * 0.00045 + m / miniHeartCount) % 1) * lineProgress;
                const hx = startX + (currentHeadX - startX) * frac;
                const hy = targetY + Math.sin(hx * 0.018 - now * 0.003) * 10;
                const heartSize = 9 + (m % 3) * 3;
                const hAlpha = Math.sin(frac * Math.PI) * lineAlpha * 0.85;

                drawHeart(
                    hx,
                    hy - heartSize / 2,
                    heartSize,
                    m % 2 === 0 ? "#ff7bb5" : "#ffccd5",
                    hAlpha,
                    Math.sin(now * 0.003 + m) * 0.3,
                    "rgba(255, 60, 140, 0.8)"
                );
            }
        }

        /* -------------------------------------------------------------
           PHASE 2 & 3: BIG HEART DRAWING & HEARTBEAT PULSE
           Draws the big heart (3200ms -> 6000ms), then beats (6000ms -> 9800ms)
        ------------------------------------------------------------- */
        if (cycleTime >= 3200) {
            let heartProgress = 0;
            let heartAlpha = 1;

            if (cycleTime < 6000) {
                // Drawing perimeter
                heartProgress = (cycleTime - 3200) / 2800;
            } else if (cycleTime < 9600) {
                // Fully drawn, beating rhythmically
                heartProgress = 1;
            } else {
                // Soft dissolve / fade out at end of cycle
                heartProgress = 1;
                heartAlpha = 1 - (cycleTime - 9600) / 1400;
            }

            // Real Heartbeat (Lub-Dub pulse)
            let beatScale = 1;
            if (cycleTime >= 5800 && cycleTime < 9600) {
                const beatTime = (cycleTime - 5800) * 0.006;
                const primaryBeat = Math.pow(Math.sin(beatTime), 8) * 0.12;
                const secondaryBeat = Math.pow(Math.sin(beatTime + 0.4), 8) * 0.06;
                beatScale = 1 + (primaryBeat + secondaryBeat) * heartAlpha;
            }

            const currentScale = heartScale * beatScale;

            // Draw Inner Radiant Glow inside the Big Heart
            if (cycleTime > 4800 && heartAlpha > 0.05) {
                ctx.save();
                const glowGrad = ctx.createRadialGradient(
                    targetX,
                    targetY - 5 * currentScale,
                    5,
                    targetX,
                    targetY - 5 * currentScale,
                    22 * currentScale
                );
                glowGrad.addColorStop(0, `rgba(255, 80, 160, ${0.22 * heartAlpha})`);
                glowGrad.addColorStop(0.6, `rgba(255, 140, 195, ${0.08 * heartAlpha})`);
                glowGrad.addColorStop(1, "rgba(255, 105, 180, 0)");

                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(targetX, targetY - 5 * currentScale, 22 * currentScale, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Draw Big Heart Outline Curve
            ctx.save();
            ctx.beginPath();

            const steps = 120;
            const maxStep = Math.floor(steps * heartProgress);

            for (let i = 0; i <= maxStep; i++) {
                const t = (i / steps) * Math.PI * 2;
                const pt = getHeartPoint(t, targetX, targetY, currentScale);

                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            }

            // Glowing Heart Stroke
            ctx.strokeStyle = `rgba(255, 140, 195, ${heartAlpha * 0.95})`;
            ctx.lineWidth = 3.5;
            ctx.shadowColor = "rgba(255, 40, 130, 0.95)";
            ctx.shadowBlur = 22;
            ctx.stroke();

            // Second highlight stroke for rich glowing neon feel
            ctx.strokeStyle = `rgba(255, 235, 245, ${heartAlpha * 0.7})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();

            // Head sparkle / pen tip while drawing
            if (heartProgress < 0.99 && heartAlpha > 0.1) {
                const headT = heartProgress * Math.PI * 2;
                const headPt = getHeartPoint(headT, targetX, targetY, currentScale);
                drawHeart(headPt.x, headPt.y, 14, "#ffffff", 1, now * 0.005, "rgba(255, 105, 180, 1)");
            }

            // Emitting sparkling star-dust from Big Heart
            if (cycleTime >= 5500 && heartAlpha > 0.1) {
                ctx.save();
                for (let d = 0; d < heartDust.length; d++) {
                    const dust = heartDust[d];
                    dust.life += 1;
                    dust.dist += dust.speed;

                    if (dust.life >= dust.maxLife) {
                        dust.life = 0;
                        dust.angle = Math.random() * Math.PI * 2;
                        dust.dist = Math.random() * 20;
                    }

                    const t = dust.angle;
                    const basePt = getHeartPoint(t, targetX, targetY, currentScale);
                    const dx = basePt.x + Math.cos(dust.angle) * dust.dist;
                    const dy = basePt.y + Math.sin(dust.angle) * dust.dist - dust.life * 0.25;

                    const dustProgress = dust.life / dust.maxLife;
                    const dustAlpha = Math.sin(dustProgress * Math.PI) * dust.alpha * heartAlpha;

                    drawHeart(
                        dx,
                        dy,
                        dust.size * 3.5,
                        d % 2 === 0 ? "#ff9ec7" : "#fff",
                        dustAlpha,
                        dust.angle,
                        "rgba(255, 80, 160, 0.8)"
                    );
                }
                ctx.restore();
            }
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}


/* ============================================================
   🌌 TWINKLING NIGHT SKY & SHOOTING STARS (TOOTTE TAARE)
   Dynamic on/off twinkling stars & 2-3 shooting stars streaking
============================================================ */

function initNightSky() {
    const canvas = document.getElementById("skyCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let stars = [];
    const starCount = 130;

    function generateStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            // Concentrated in upper 65% of screen
            const y = Math.pow(Math.random(), 1.4) * height * 0.72;
            const size = Math.random() < 0.82 ? Math.random() * 1.3 + 0.6 : Math.random() * 1.5 + 1.4;

            const colorType = Math.random();
            let color = "#ffffff";
            if (colorType < 0.25) color = "#dbeafe";
            else if (colorType < 0.50) color = "#fce7f3";
            else if (colorType < 0.65) color = "#fef3c7";

            stars.push({
                x: Math.random() * width,
                y: y,
                size: size,
                color: color,
                speed: Math.random() * 0.0035 + 0.0018,
                phase: Math.random() * Math.PI * 2,
                exponent: Math.random() * 2 + 2.5, // Sharp ON/OFF blink
                sparkle: size > 1.8
            });
        }
    }

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.scale(dpr, dpr);
        generateStars();
    }

    window.addEventListener("resize", resize);
    resize();

    // 🌠 3 Shooting Stars Controllers (Tootte Taare)
    const shootingStars = [
        {
            active: false,
            nextSpawnTime: performance.now() + 1500,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            length: 0,
            speed: 0,
            angle: 0,
            life: 0,
            maxLife: 0,
            trailParticles: []
        },
        {
            active: false,
            nextSpawnTime: performance.now() + 4500,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            length: 0,
            speed: 0,
            angle: 0,
            life: 0,
            maxLife: 0,
            trailParticles: []
        },
        {
            active: false,
            nextSpawnTime: performance.now() + 7500,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            length: 0,
            speed: 0,
            angle: 0,
            life: 0,
            maxLife: 0,
            trailParticles: []
        }
    ];

    function spawnShootingStar(star, now) {
        star.active = true;
        star.startX = Math.random() * (width * 0.75) + width * 0.05;
        star.startY = Math.random() * (height * 0.28) + 10;
        star.x = star.startX;
        star.y = star.startY;
        // Direction: downwards diagonal
        star.angle = (Math.PI / 180) * (Math.random() * 25 + 25); // 25° to 50° angle
        star.speed = Math.random() * 7 + 14;
        star.length = Math.random() * 120 + 160;
        star.maxLife = Math.random() * 30 + 40;
        star.life = 0;
        star.trailParticles = [];
    }

    function renderSky(now) {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Twinkling Stars (On/Off Blink)
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            const raw = Math.sin(now * s.speed + s.phase);
            const brightness = Math.pow(Math.max(0, raw), s.exponent);

            if (brightness > 0.02) {
                ctx.save();
                ctx.fillStyle = s.color;
                ctx.globalAlpha = brightness * 0.95;
                ctx.shadowColor = s.color;
                ctx.shadowBlur = s.size > 1.2 ? 6 : 2;

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * (0.8 + brightness * 0.4), 0, Math.PI * 2);
                ctx.fill();

                // 4-point cross sparkle for brightest moments
                if (s.sparkle && brightness > 0.7) {
                    const spikeLen = s.size * 3.5 * brightness;
                    ctx.strokeStyle = s.color;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(s.x - spikeLen, s.y);
                    ctx.lineTo(s.x + spikeLen, s.y);
                    ctx.moveTo(s.x, s.y - spikeLen);
                    ctx.lineTo(s.x, s.y + spikeLen);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        // 2. Draw 2-3 Shooting Stars (Tootte Taare)
        for (let j = 0; j < shootingStars.length; j++) {
            const ss = shootingStars[j];

            if (!ss.active) {
                if (now >= ss.nextSpawnTime) {
                    spawnShootingStar(ss, now);
                }
            } else {
                ss.life += 1;
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;

                const progress = ss.life / ss.maxLife;
                const alpha = Math.sin(progress * Math.PI);

                if (Math.random() < 0.7) {
                    ss.trailParticles.push({
                        x: ss.x + (Math.random() - 0.5) * 4,
                        y: ss.y + (Math.random() - 0.5) * 4,
                        size: Math.random() * 1.8 + 0.6,
                        alpha: alpha * 0.8,
                        life: 0,
                        maxLife: Math.random() * 15 + 10
                    });
                }

                const tailX = ss.x - Math.cos(ss.angle) * ss.length * Math.min(1, progress * 2.5);
                const tailY = ss.y - Math.sin(ss.angle) * ss.length * Math.min(1, progress * 2.5);

                ctx.save();
                const streakGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
                streakGrad.addColorStop(0, "rgba(255, 180, 220, 0)");
                streakGrad.addColorStop(0.5, `rgba(255, 140, 195, ${alpha * 0.35})`);
                streakGrad.addColorStop(0.85, `rgba(255, 230, 245, ${alpha * 0.8})`);
                streakGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

                ctx.strokeStyle = streakGrad;
                ctx.lineWidth = 2.2;
                ctx.shadowColor = "rgba(255, 220, 240, 0.9)";
                ctx.shadowBlur = 12;

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(ss.x, ss.y);
                ctx.stroke();

                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, 2.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                for (let p = ss.trailParticles.length - 1; p >= 0; p--) {
                    const tp = ss.trailParticles[p];
                    tp.life += 1;
                    const pAlpha = (1 - tp.life / tp.maxLife) * tp.alpha;
                    if (tp.life >= tp.maxLife) {
                        ss.trailParticles.splice(p, 1);
                    } else {
                        ctx.save();
                        ctx.fillStyle = `rgba(255, 220, 240, ${pAlpha})`;
                        ctx.beginPath();
                        ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }

                if (ss.life >= ss.maxLife) {
                    ss.active = false;
                    ss.nextSpawnTime = now + Math.random() * 4500 + 3500;
                }
            }
        }

        requestAnimationFrame(renderSky);
    }

    requestAnimationFrame(renderSky);
}


/* ============================================================
   💖 ROMANTIC CUSTOM CURSOR & SPARKLING HEART TRAIL
   Glowing pink cursor, trailing mini hearts, and
   interactive heart ripples on clicks & hovers!
============================================================ */

let isRomanticCursorActive = true;

function disableRomanticCursor() {
    isRomanticCursorActive = false;
    const cursor = document.getElementById("romanticCursor");
    if (cursor) {
        cursor.style.display = "none";
        cursor.classList.remove("active");
    }
    document.body.classList.add("normal-cursor-mode");
}

function initRomanticCursor() {
    const cursor = document.getElementById("romanticCursor");
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let isVisible = false;
    let lastSparkleTime = 0;
    let lastX = 0;
    let lastY = 0;

    const trailHearts = ["💖", "💕", "✨", "🌸", "💗", "💓", "💘", "🌹"];

    // Spawn trailing heart / sparkle
    function spawnTrailHeart(x, y, isBurst = false, burstAngle = 0, burstDist = 0) {
        if (!isRomanticCursorActive) return;

        const sparkle = document.createElement("div");
        sparkle.className = "cursor-sparkle";

        const symbol = trailHearts[Math.floor(Math.random() * trailHearts.length)];
        sparkle.textContent = symbol;

        let dx, dy, life, startScale;
        if (isBurst) {
            dx = Math.cos(burstAngle) * burstDist;
            dy = Math.sin(burstAngle) * burstDist;
            life = (Math.random() * 0.4 + 0.6).toFixed(2);
            startScale = (Math.random() * 0.4 + 0.9).toFixed(2);
            sparkle.style.fontSize = `${Math.floor(Math.random() * 14 + 16)}px`;
        } else {
            dx = (Math.random() - 0.5) * 35;
            dy = -(Math.random() * 35 + 20);
            life = (Math.random() * 0.35 + 0.65).toFixed(2);
            startScale = (Math.random() * 0.35 + 0.75).toFixed(2);
            sparkle.style.fontSize = `${Math.floor(Math.random() * 10 + 13)}px`;
        }

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.setProperty("--dx", `${dx}px`);
        sparkle.style.setProperty("--dy", `${dy}px`);
        sparkle.style.setProperty("--life", `${life}s`);
        sparkle.style.setProperty("--start-scale", startScale);
        sparkle.style.setProperty("--rot-start", `${Math.random() * 40 - 20}deg`);
        sparkle.style.setProperty("--rot-end", `${Math.random() * 80 - 40}deg`);

        document.body.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, parseFloat(life) * 1000 + 100);
    }

    // Mouse move handler
    window.addEventListener("mousemove", (e) => {
        if (!isRomanticCursorActive) return;

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            cursor.classList.add("active");
        }

        // Move cursor dot immediately
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

        // Spawn trailing mini hearts on movement
        const now = performance.now();
        const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
        if (now - lastSparkleTime > 45 && dist > 8) {
            spawnTrailHeart(mouseX, mouseY);
            lastSparkleTime = now;
            lastX = mouseX;
            lastY = mouseY;
        }
    });

    // Mouse leave / enter window
    document.addEventListener("mouseleave", () => {
        if (!isRomanticCursorActive) return;
        isVisible = false;
        cursor.classList.remove("active");
    });

    document.addEventListener("mouseenter", () => {
        if (!isRomanticCursorActive) return;
        isVisible = true;
        cursor.classList.add("active");
    });

    // Mousedown & Click Burst Effect
    window.addEventListener("mousedown", (e) => {
        if (!isRomanticCursorActive) return;
        cursor.classList.add("clicking");

        // Mini explosion of 12 glowing hearts
        const burstCount = 12;
        for (let i = 0; i < burstCount; i++) {
            const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
            const dist = Math.random() * 50 + 40;
            spawnTrailHeart(e.clientX, e.clientY, true, angle, dist);
        }
    });

    window.addEventListener("mouseup", () => {
        if (!isRomanticCursorActive) return;
        cursor.classList.remove("clicking");
    });

    // Clickable element hover triggers
    function attachHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            "button, input, a, .lock-card, .lock-icon, .popup-card, .warning-icon, .heart"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                if (isRomanticCursorActive) cursor.classList.add("hovering");
            });

            el.addEventListener("mouseleave", () => {
                if (isRomanticCursorActive) cursor.classList.remove("hovering");
            });
        });
    }

    attachHoverEffects();

    // Re-attach hover effects whenever DOM changes
    const observer = new MutationObserver(attachHoverEffects);
    observer.observe(document.body, { childList: true, subtree: true });
}


/* ============================================================
   INIT ALL BACKGROUNDS & ANIMATIONS
============================================================ */

function startAllAnimations() {
    initNightSky();
    initOceanWaves();
    initHeartScene();
    initRomanticCursor();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAllAnimations);
} else {
    startAllAnimations();
}
