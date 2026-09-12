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
        console.warn("API request failed or running offline, checking fallback password:", error);
        if (enteredPassword.trim().toLowerCase() === "sanu16") {
            unlockWebsite();
        } else {
            showRestrictedPopup();
            unlockBtn.textContent = "UNLOCK 🔓";
        }
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

        // 💖 Show Big Beating Heart "Welcome My Heart ❤️" for 2.6s, then auto-transition to Diary!
        setTimeout(() => {
            transitionToDiaryStage();
        }, 2600);
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
    document.body.classList.remove("romantic-cursor-ready");
    document.body.classList.add("normal-cursor-mode");
}

function initRomanticCursor() {
    const cursor = document.getElementById("romanticCursor");
    if (!cursor) return;
    document.body.classList.add("romantic-cursor-ready");

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
    initDiarySystem();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAllAnimations);
} else {
    startAllAnimations();
}


/* ============================================================
   📖 3D LOVE DIARY (BOOK) & SCRAPBOOK ENGINE
   Complete interactive system with 3D opening, page flipping,
   draggable & resizable items, text styling, autoplay reels,
   photo frame decorators, stickers, and background music.
============================================================ */

let diaryStageTimer = null;
let selectedDiaryItem = null;
let isDragging = false;
let isResizing = false;
let currentResizeHandle = null;
let dragStartX = 0;
let dragStartY = 0;
let itemStartLeft = 0;
let itemStartTop = 0;
let itemStartWidth = 0;
let itemStartHeight = 0;
let activePageElement = null;

// Audio System State
let isMusicPlaying = false;
let musicVolume = 0.7;
let audioCtx = null;
let synthGainNode = null;
let synthInterval = null;
let currentMusicType = "synth"; // 'synth' or 'audio'

// Diary Pages Data Structure
const DEFAULT_DIARY_DATA = {
    currentPagePair: 0,
    isReadMode: false,
    pages: [
        // Page 1
        {
            pageNumber: 1,
            items: [
                {
                    id: "item-1",
                    type: "text",
                    left: 8,
                    top: 10,
                    width: 84,
                    height: 18,
                    content: "To My One & Only Sanu ❤️",
                    font: "'Great Vibes', cursive",
                    size: 34,
                    color: "#781232",
                    glow: true,
                    zIndex: 2
                },
                {
                    id: "item-2",
                    type: "text",
                    left: 8,
                    top: 32,
                    width: 84,
                    height: 48,
                    content: "In a world with billions of people, my eyes will always search for you.\n\nEvery smile of yours brings peace to my soul, and every little moment spent with you becomes my favorite memory.\n\nThank you for being the most beautiful part of my life. Forever & Always. 💖",
                    font: "'Caveat', cursive",
                    size: 20,
                    color: "#2c1820",
                    glow: false,
                    zIndex: 2
                },
                {
                    id: "item-3",
                    type: "sticker",
                    left: 10,
                    top: 82,
                    width: 14,
                    height: 12,
                    content: "🌹",
                    zIndex: 3
                },
                {
                    id: "item-4",
                    type: "sticker",
                    left: 78,
                    top: 80,
                    width: 14,
                    height: 12,
                    content: "✨",
                    zIndex: 3
                }
            ]
        },
        // Page 2
        {
            pageNumber: 2,
            items: [
                {
                    id: "item-5",
                    type: "photo",
                    left: 14,
                    top: 10,
                    width: 72,
                    height: 52,
                    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ff758c'/><stop offset='100%' stop-color='%23ff2a85'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg)'/><circle cx='200' cy='120' r='60' fill='%23fff' opacity='0.25'/><path d='M200 170 C160 130 130 150 130 180 C130 210 200 240 200 240 C200 240 270 210 270 180 C270 150 240 130 200 170 Z' fill='%23ffffff' opacity='0.9'/><text x='50%' y='90%' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-size='16' font-weight='bold'>Our Magical Moments Together ❤️</text></svg>",
                    frame: "frame-polaroid",
                    caption: "My Favorite Smile in the Universe ✨",
                    zIndex: 4
                },
                {
                    id: "item-6",
                    type: "text",
                    left: 12,
                    top: 68,
                    width: 76,
                    height: 22,
                    content: "Tap any photo or text to resize, move, or style it! 🎬 Add reels, videos, music, and stickers anytime.",
                    font: "'Dancing Script', cursive",
                    size: 19,
                    color: "#8c4456",
                    glow: false,
                    zIndex: 2
                },
                {
                    id: "item-7",
                    type: "sticker",
                    left: 80,
                    top: 6,
                    width: 14,
                    height: 12,
                    content: "🎀",
                    zIndex: 5
                }
            ]
        }
    ]
};

let diaryState = null;

// Stickers List
const ROMANTIC_STICKERS = [
    "❤️", "💖", "💕", "💗", "💓", "💞", "💘", "💌", "🌹", "🌸",
    "✨", "💫", "⭐", "🌙", "💍", "🍫", "🧸", "🎀", "🕊️", "🥂",
    "🍓", "🥰", "😘", "😍", "🥺", "💋", "👑", "💐", "🦋", "🕯️",
    "🎶", "☕", "🌈", "🧁", "🎂", "🎉"
];


/* -------------------------------------------------------------
   TRANSITION TO 3D DIARY STAGE
------------------------------------------------------------- */

function scheduleDiaryStageTransition() {
    const openStoryBtn = document.getElementById("openStoryBtn");
    if (openStoryBtn) {
        openStoryBtn.onclick = () => {
            transitionToDiaryStage();
        };
    }
}

function transitionToDiaryStage() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const diaryStage = document.getElementById("diaryStage");
    const closedDiaryWrapper = document.getElementById("closedDiaryWrapper");
    const openDiaryWrapper = document.getElementById("openDiaryWrapper");

    if (welcomeScreen) {
        welcomeScreen.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        welcomeScreen.style.opacity = "0";
        welcomeScreen.style.transform = "scale(0.9)";
        setTimeout(() => {
            welcomeScreen.classList.add("hidden");
        }, 800);
    }

    if (diaryStage) {
        diaryStage.classList.remove("hidden");
        if (closedDiaryWrapper) closedDiaryWrapper.classList.remove("hidden");
        if (openDiaryWrapper) openDiaryWrapper.classList.add("hidden");
    }
}


/* ============================================================
   📦 INDEXEDDB STORAGE FOR LARGE MEDIA (VIDEOS & PHOTOS)
   Prevents localStorage 5MB QuotaExceededError and black screen!
============================================================ */

let diaryMediaDB = null;

function initDiaryMediaDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) {
            console.warn("IndexedDB not supported, falling back to in-memory URLs");
            return resolve(null);
        }
        const request = window.indexedDB.open("LoveDiaryMediaDB", 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("mediaBlobs")) {
                db.createObjectStore("mediaBlobs", { keyPath: "key" });
            }
        };
        request.onsuccess = (e) => {
            diaryMediaDB = e.target.result;
            resolve(diaryMediaDB);
        };
        request.onerror = (e) => {
            console.warn("Failed to open IndexedDB:", e);
            resolve(null);
        };
    });
}

function saveMediaBlob(key, blob) {
    return new Promise((resolve) => {
        if (!diaryMediaDB) {
            initDiaryMediaDB().then((db) => {
                if (!db) return resolve(false);
                performSave();
            });
        } else {
            performSave();
        }

        function performSave() {
            try {
                const tx = diaryMediaDB.transaction(["mediaBlobs"], "readwrite");
                const store = tx.objectStore("mediaBlobs");
                store.put({ key: key, blob: blob, timestamp: Date.now() });
                tx.oncomplete = () => resolve(true);
                tx.onerror = () => resolve(false);
            } catch (err) {
                console.warn("IndexedDB save error:", err);
                resolve(false);
            }
        }
    });
}

function getMediaBlob(key) {
    return new Promise((resolve) => {
        if (!diaryMediaDB) {
            initDiaryMediaDB().then((db) => {
                if (!db) return resolve(null);
                performGet();
            });
        } else {
            performGet();
        }

        function performGet() {
            try {
                const tx = diaryMediaDB.transaction(["mediaBlobs"], "readonly");
                const store = tx.objectStore("mediaBlobs");
                const req = store.get(key);
                req.onsuccess = () => {
                    if (req.result && req.result.blob) {
                        resolve(req.result.blob);
                    } else {
                        resolve(null);
                    }
                };
                req.onerror = () => resolve(null);
            } catch (err) {
                console.warn("IndexedDB get error:", err);
                resolve(null);
            }
        }
    });
}

/* Helper to parse YouTube Shorts / YouTube links or direct MP4 */
function parseVideoUrl(url) {
    if (!url) return { type: "direct", src: "" };
    const trimmed = String(url).trim();

    // YouTube Shorts or regular YouTube URL
    const ytRegex = /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = trimmed.match(ytRegex);
    if (match && match[1]) {
        const vidId = match[1];
        return {
            type: "youtube",
            videoId: vidId,
            embedUrl: `https://www.youtube-nocookie.com/embed/${vidId}?autoplay=1&mute=1&loop=1&playlist=${vidId}&controls=1&modestbranding=1&rel=0`
        };
    }

    return {
        type: "direct",
        src: trimmed
    };
}

/* 1-Click Romantic Preset Reels */
const ROMANTIC_PRESET_REELS = {
    sparkle: {
        title: "✨ Sparkler Sunset",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    hearts: {
        title: "💖 Floating Hearts",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4"
    },
    starlight: {
        title: "🌟 Romantic Starlight",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
    }
};

/* -------------------------------------------------------------
   INIT DIARY SYSTEM & LISTENERS
------------------------------------------------------------- */

async function initDiarySystem() {
    await initDiaryMediaDB();
    await loadDiaryData();
    setupStickerPicker();
    setupModals();
    setupDiaryListeners();
    setupAudioSystem();
}

async function loadDiaryData() {
    try {
        const saved = localStorage.getItem("love_diary_data");
        if (saved) {
            diaryState = JSON.parse(saved);
        } else {
            diaryState = JSON.parse(JSON.stringify(DEFAULT_DIARY_DATA));
        }
    } catch (e) {
        console.error("Failed to load diary from localStorage:", e);
        diaryState = JSON.parse(JSON.stringify(DEFAULT_DIARY_DATA));
    }
    if (!diaryState.pages || diaryState.pages.length === 0) {
        diaryState = JSON.parse(JSON.stringify(DEFAULT_DIARY_DATA));
    }
    if (typeof diaryState.currentPagePair !== "number") {
        diaryState.currentPagePair = 0;
    }

    // Restore any Blobs from IndexedDB for reels and photos
    for (const page of diaryState.pages) {
        for (const item of page.items) {
            if (item.mediaBlobKey) {
                try {
                    const blob = await getMediaBlob(item.mediaBlobKey);
                    if (blob) {
                        item.src = URL.createObjectURL(blob);
                    }
                } catch (err) {
                    console.warn("Failed to restore blob for item:", item.id, err);
                }
            }
        }
    }
}

function saveDiaryToStorage(showNotice = false) {
    try {
        const cleanState = JSON.parse(JSON.stringify(diaryState));
        // Strip out large ephemeral object URLs to keep localStorage clean
        cleanState.pages.forEach(page => {
            page.items.forEach(item => {
                if (item.type === "reel" && item.src && item.src.startsWith("blob:") && !item.mediaBlobKey) {
                    // Ephemeral URL without key
                }
            });
        });
        localStorage.setItem("love_diary_data", JSON.stringify(cleanState));
        if (showNotice) {
            showToastNotice("Saved to Memory Book! ❤️");
        }
    } catch (e) {
        console.error("Could not save diary to storage:", e);
        // Quota safety fallback: strip any long base64 strings so save always works
        try {
            const fallbackState = JSON.parse(JSON.stringify(diaryState));
            fallbackState.pages.forEach(page => {
                page.items.forEach(item => {
                    if (item.src && item.src.length > 5000 && !item.mediaBlobKey) {
                        item.src = "";
                    }
                });
            });
            localStorage.setItem("love_diary_data", JSON.stringify(fallbackState));
        } catch (innerErr) {
            console.error("Fallback storage save error:", innerErr);
        }
    }
}

function showToastNotice(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "85px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "linear-gradient(135deg, #ff2a85, #ff758c)";
    toast.style.color = "#fff";
    toast.style.padding = "10px 24px";
    toast.style.borderRadius = "30px";
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 8px 25px rgba(255, 42, 133, 0.6)";
    toast.style.zIndex = "999";
    toast.style.pointerEvents = "none";
    toast.style.animation = "fadeInOpenBook 0.3s ease";
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = "opacity 0.4s ease";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
    }, 2000);
}


/* -------------------------------------------------------------
   BOOK OPENING & CLOSING (3D ANIMATIONS)
------------------------------------------------------------- */

function openDiaryBook() {
    const closedBook = document.getElementById("closedDiary3D");
    const closedWrapper = document.getElementById("closedDiaryWrapper");
    const openWrapper = document.getElementById("openDiaryWrapper");

    if (closedBook) {
        closedBook.classList.add("is-opening");
    }

    // Play Romantic Background Music immediately on user click
    playRomanticMusic();

    setTimeout(() => {
        if (closedWrapper) closedWrapper.classList.add("hidden");
        if (openWrapper) {
            openWrapper.classList.remove("hidden");
            if (closedBook) closedBook.classList.remove("is-opening");
            renderCurrentPages();
        }
    }, 900);
}

function closeDiaryBook() {
    const closedWrapper = document.getElementById("closedDiaryWrapper");
    const openWrapper = document.getElementById("openDiaryWrapper");

    if (openWrapper) openWrapper.classList.add("hidden");
    if (closedWrapper) {
        closedWrapper.classList.remove("hidden");
        const closedBook = document.getElementById("closedDiary3D");
        if (closedBook) {
            closedBook.classList.remove("is-opening");
        }
    }
    pauseActivePageVideos();
}


/* -------------------------------------------------------------
   PAGE RENDERING & NAVIGATION
------------------------------------------------------------- */

function renderCurrentPages() {
    const leftPageContent = document.getElementById("leftPageContent");
    const rightPageContent = document.getElementById("rightPageContent");
    const leftPageNumber = document.getElementById("leftPageNumber");
    const rightPageNumber = document.getElementById("rightPageNumber");
    const pageIndicator = document.getElementById("pageIndicator");

    if (!leftPageContent || !rightPageContent) return;

    // Deselect any active item
    deselectAllItems();

    const pairIndex = diaryState.currentPagePair;
    const leftPageIndex = pairIndex * 2;
    const rightPageIndex = pairIndex * 2 + 1;

    // Ensure pages exist
    while (diaryState.pages.length <= rightPageIndex) {
        diaryState.pages.push({
            pageNumber: diaryState.pages.length + 1,
            items: []
        });
    }

    const leftPageData = diaryState.pages[leftPageIndex];
    const rightPageData = diaryState.pages[rightPageIndex];

    leftPageNumber.textContent = leftPageIndex + 1;
    rightPageNumber.textContent = rightPageIndex + 1;
    pageIndicator.textContent = `Pages ${leftPageIndex + 1} - ${rightPageIndex + 1} of ${diaryState.pages.length}`;

    // Clear contents
    leftPageContent.innerHTML = "";
    rightPageContent.innerHTML = "";

    // Render left items
    leftPageData.items.forEach(item => {
        const el = createDiaryItemElement(item, "left", leftPageIndex);
        leftPageContent.appendChild(el);
    });

    // Render right items
    rightPageData.items.forEach(item => {
        const el = createDiaryItemElement(item, "right", rightPageIndex);
        rightPageContent.appendChild(el);
    });

    // Autoplay any active reels on current spread
    setTimeout(playActivePageVideos, 200);
}

/* -------------------------------------------------------------
   📖 REALISTIC 3D PHYSICAL BOOK PAGE-TURN ENGINE
   Page lifts up from edge, arches upright across center spine,
   and folds over with dynamic shadow and tactile paper rustle!
------------------------------------------------------------- */

let isPageFlipping = false;

function playPaperTurnSound() {
    try {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const duration = 0.38;
        const bufferSize = Math.floor(audioCtx.sampleRate * duration);
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            const progress = i / bufferSize;
            // Envelope with soft start and natural decay
            const env = Math.sin(progress * Math.PI) * Math.exp(-progress * 2.2);
            output[i] = (Math.random() * 2 - 1) * env;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(950, now);
        filter.frequency.exponentialRampToValueAtTime(1600, now + 0.16);
        filter.frequency.exponentialRampToValueAtTime(550, now + duration);
        filter.Q.setValueAtTime(2.2, now);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(Math.min(0.28, musicVolume * 0.35 + 0.08), now + 0.07);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        whiteNoise.start(now);
    } catch (e) {
        // Fallback silently if audio context unavailable
    }
}

function renderSinglePage(pageElement, pageData, side, pageIndex) {
    if (!pageElement || !pageData) return;
    const contentArea = pageElement.querySelector(".page-content-area");
    const pageNumTag = pageElement.querySelector(".page-number-tag");

    if (pageNumTag) pageNumTag.textContent = pageIndex + 1;
    if (contentArea) {
        contentArea.innerHTML = "";
        pageData.items.forEach(item => {
            const el = createDiaryItemElement(item, side, pageIndex);
            contentArea.appendChild(el);
        });
    }
}

function renderPagePreviewInto(container, pageData, side, pageIndex) {
    if (!container || !pageData) return;
    container.innerHTML = `
        <div class="page-paper-texture"></div>
        <div class="page-spine-shadow ${side === 'right' ? 'right' : ''}"></div>
        <div class="page-content-area" style="position:relative; width:100%; height:calc(100% - 28px); overflow:hidden;"></div>
        <div class="page-footer" style="height:28px; display:flex; align-items:center; justify-content:center;">
            <span class="page-number-tag" style="font-family:'Playfair Display', serif; font-size:13px; color:#8c7355;">${pageIndex + 1}</span>
        </div>
    `;
    const contentArea = container.querySelector(".page-content-area");
    if (contentArea) {
        pageData.items.forEach(item => {
            const el = createDiaryItemElement(item, side, pageIndex);
            contentArea.appendChild(el);
        });
    }
}

function flipPage(direction) {
    if (isPageFlipping) return;

    const totalPairs = Math.ceil(diaryState.pages.length / 2);
    const targetPair = diaryState.currentPagePair + direction;

    if (targetPair < 0 || targetPair >= totalPairs) {
        return; // boundary reached
    }

    isPageFlipping = true;
    pauseActivePageVideos();
    deselectAllItems();

    // 🎧 Tactile Physical Paper Rustle Audio Effect
    playPaperTurnSound();

    const spread = document.getElementById("bookSpread");
    const leftPageEl = document.getElementById("leftPage");
    const rightPageEl = document.getElementById("rightPage");

    if (!spread || !leftPageEl || !rightPageEl) {
        diaryState.currentPagePair = targetPair;
        renderCurrentPages();
        saveDiaryToStorage();
        isPageFlipping = false;
        return;
    }

    const isForward = direction > 0;

    // Ensure target pages exist in diaryState
    const targetLeftIdx = targetPair * 2;
    const targetRightIdx = targetPair * 2 + 1;
    while (diaryState.pages.length <= targetRightIdx) {
        diaryState.pages.push({
            pageNumber: diaryState.pages.length + 1,
            items: []
        });
    }

    // 1. Build 3D Turning Page Leaf
    const leaf = document.createElement("div");
    leaf.className = `turning-page-leaf ${isForward ? "flip-forward" : "flip-backward"}`;

    // Front Face (Clones the current page that is being lifted up)
    const frontFace = document.createElement("div");
    frontFace.className = "leaf-face leaf-face-front";
    const frontWrap = document.createElement("div");
    frontWrap.className = "leaf-content-wrap";
    const sourcePageEl = isForward ? rightPageEl : leftPageEl;
    frontWrap.innerHTML = sourcePageEl.innerHTML;
    frontFace.appendChild(frontWrap);

    const frontShine = document.createElement("div");
    frontShine.className = "leaf-lighting-overlay";
    frontFace.appendChild(frontShine);
    leaf.appendChild(frontFace);

    // Back Face (The reverse side of the turned sheet, showing upcoming destination page)
    const backFace = document.createElement("div");
    backFace.className = "leaf-face leaf-face-back";
    const backWrap = document.createElement("div");
    backWrap.className = "leaf-content-wrap";

    const backPageData = isForward
        ? diaryState.pages[targetLeftIdx]
        : diaryState.pages[targetRightIdx];

    if (backPageData) {
        renderPagePreviewInto(
            backWrap,
            backPageData,
            isForward ? "left" : "right",
            isForward ? targetLeftIdx : targetRightIdx
        );
    }
    backFace.appendChild(backWrap);

    const backShine = document.createElement("div");
    backShine.className = "leaf-lighting-overlay";
    backFace.appendChild(backShine);
    leaf.appendChild(backFace);

    // 2. Dynamic Cast Shadow on the Receiving Page
    const castShadow = document.createElement("div");
    castShadow.className = `page-turn-shadow-receiving ${isForward ? "flip-forward-shadow" : "flip-backward-shadow"}`;

    spread.appendChild(castShadow);
    spread.appendChild(leaf);

    // Subtle 3D Book Spine Flex
    spread.style.transition = "transform 0.78s cubic-bezier(0.35, 0.05, 0.25, 1)";
    spread.style.transform = isForward ? "scale(0.99) rotateY(-1.5deg)" : "scale(0.99) rotateY(1.5deg)";

    // 3. Midpoint Reveal: As the sheet lifts up, reveal the new page underneath
    setTimeout(() => {
        if (isForward) {
            renderSinglePage(rightPageEl, diaryState.pages[targetRightIdx], "right", targetRightIdx);
        } else {
            renderSinglePage(leftPageEl, diaryState.pages[targetLeftIdx], "left", targetLeftIdx);
        }
    }, 340);

    // 4. Animation Completion (780ms)
    setTimeout(() => {
        diaryState.currentPagePair = targetPair;
        renderCurrentPages();
        spread.style.transform = "scale(1) rotateY(0deg)";

        leaf.remove();
        castShadow.remove();

        saveDiaryToStorage();
        isPageFlipping = false;

        // Autoplay reels on the new spread
        setTimeout(playActivePageVideos, 200);
    }, 780);
}

function addNewPagePair() {
    const p1 = diaryState.pages.length + 1;
    const p2 = diaryState.pages.length + 2;
    diaryState.pages.push({ pageNumber: p1, items: [] });
    diaryState.pages.push({ pageNumber: p2, items: [] });

    // Flip to new page pair
    diaryState.currentPagePair = Math.floor((p1 - 1) / 2);
    renderCurrentPages();
    saveDiaryToStorage(true);
    showToastNotice(`New blank pages (${p1} & ${p2}) added! ✨`);
}

function deleteCurrentPagePair() {
    if (diaryState.pages.length <= 2) {
        alert("A diary needs at least 2 pages! ❤️");
        return;
    }
    if (!confirm("Are you sure you want to delete this 2-page spread?")) return;

    const pairIndex = diaryState.currentPagePair;
    diaryState.pages.splice(pairIndex * 2, 2);

    // Re-number pages
    diaryState.pages.forEach((p, idx) => p.pageNumber = idx + 1);

    if (diaryState.currentPagePair >= Math.ceil(diaryState.pages.length / 2)) {
        diaryState.currentPagePair = Math.max(0, Math.ceil(diaryState.pages.length / 2) - 1);
    }

    renderCurrentPages();
    saveDiaryToStorage(true);
}

function toggleReadingMode() {
    const wrapper = document.getElementById("openDiaryWrapper");
    const toggleBtn = document.getElementById("modeToggleBtn");
    diaryState.isReadMode = !diaryState.isReadMode;

    if (diaryState.isReadMode) {
        wrapper.classList.add("read-mode");
        toggleBtn.textContent = "📖 Read Mode";
        toggleBtn.classList.remove("active");
        deselectAllItems();
    } else {
        wrapper.classList.remove("read-mode");
        toggleBtn.textContent = "✨ Decorate Mode";
        toggleBtn.classList.add("active");
    }
    saveDiaryToStorage();
}


/* -------------------------------------------------------------
   DRAGGABLE & RESIZABLE SCRAPBOOK ITEMS
------------------------------------------------------------- */

function createDiaryItemElement(item, side, pageIndex) {
    const el = document.createElement("div");
    el.className = "diary-item";
    el.id = item.id;
    el.dataset.pageIndex = pageIndex;
    el.dataset.side = side;

    el.style.left = `${item.left}%`;
    el.style.top = `${item.top}%`;
    el.style.width = `${item.width}%`;
    el.style.height = `${item.height}%`;
    el.style.zIndex = item.zIndex || 2;

    // Inner Content based on type
    if (item.type === "text") {
        const textDiv = document.createElement("div");
        textDiv.className = "item-text-content";
        textDiv.contentEditable = !diaryState.isReadMode;
        textDiv.innerText = item.content;
        textDiv.style.fontFamily = item.font || "'Caveat', cursive";
        textDiv.style.fontSize = `${item.size || 22}px`;
        textDiv.style.color = item.color || "#2c1820";
        if (item.glow) {
            textDiv.style.textShadow = `0 0 12px ${item.color || "#ff4081"}`;
        }
        textDiv.addEventListener("input", () => {
            item.content = textDiv.innerText;
            saveDiaryToStorage();
        });
        el.appendChild(textDiv);
    } else if (item.type === "photo") {
        const photoWrap = document.createElement("div");
        photoWrap.className = `item-photo-wrapper ${item.frame || "frame-none"}`;

        const imgWrap = document.createElement("div");
        imgWrap.className = "item-photo-img-wrap";

        const img = document.createElement("img");
        img.className = "item-photo-img";
        img.src = item.src;
        img.alt = "Memory Photo";
        imgWrap.appendChild(img);
        photoWrap.appendChild(imgWrap);

        if (item.caption) {
            const cap = document.createElement("div");
            cap.className = "photo-caption-text";
            cap.contentEditable = !diaryState.isReadMode;
            cap.innerText = item.caption;
            cap.addEventListener("input", () => {
                item.caption = cap.innerText;
                saveDiaryToStorage();
            });
            photoWrap.appendChild(cap);
        }
        el.appendChild(photoWrap);
    } else if (item.type === "reel") {
        const phoneWrap = document.createElement("div");
        phoneWrap.className = "item-reel-wrapper";

        // Top Dynamic Island Camera Notch
        const island = document.createElement("div");
        island.className = "phone-dynamic-island";
        const cam = document.createElement("div");
        cam.className = "phone-camera-lens";
        const sensor = document.createElement("div");
        sensor.className = "phone-sensor-dot";
        island.appendChild(cam);
        island.appendChild(sensor);
        phoneWrap.appendChild(island);

        // Reel Badge
        const badge = document.createElement("div");
        badge.className = "reel-badge";
        badge.textContent = "🎬 REEL";
        phoneWrap.appendChild(badge);

        // Check video type (YouTube Shorts / Embed or Direct Video)
        const parsed = parseVideoUrl(item.src);

        if (parsed.type === "youtube") {
            const iframe = document.createElement("iframe");
            iframe.className = "item-reel-iframe";
            iframe.src = parsed.embedUrl;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            phoneWrap.appendChild(iframe);
        } else {
            const video = document.createElement("video");
            video.className = "item-reel-video";
            video.src = item.src;
            video.playsInline = true;
            video.muted = item.muted !== false;
            video.loop = item.loop !== false;
            video.autoplay = item.autoplay !== false;

            // Error fallback: If video URL fails or offline, show romantic poster instead of empty black box
            video.onerror = () => {
                console.warn("Video failed to load, applying romantic fallback:", item.src);
                video.poster = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><defs><linearGradient id='bg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23360b1e'/><stop offset='100%' stop-color='%2312030b'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg)'/><text x='50%' y='46%' text-anchor='middle' font-size='48'>💖</text><text x='50%' y='54%' text-anchor='middle' fill='%23ff80ab' font-family='sans-serif' font-size='16' font-weight='600'>Forever With You ❤️</text></svg>";
            };

            // Dedicated 1-Tap Sound Toggle Button (🔊 / 🔇)
            const soundBtn = document.createElement("button");
            soundBtn.className = "reel-sound-btn";
            soundBtn.title = video.muted ? "Unmute Sound 🔊" : "Mute Sound 🔇";
            soundBtn.textContent = video.muted ? "🔇" : "🔊";
            soundBtn.onclick = (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                item.muted = video.muted;
                soundBtn.textContent = video.muted ? "🔇" : "🔊";
                soundBtn.title = video.muted ? "Unmute Sound 🔊" : "Mute Sound 🔇";
                if (!video.muted && video.paused) {
                    video.play().catch(err => console.log("Play on unmute gesture:", err));
                }
            };
            phoneWrap.appendChild(soundBtn);

            // Tap video to play/pause
            video.addEventListener("click", (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });

            phoneWrap.appendChild(video);
        }

        // Bottom Home Indicator Bar
        const homeBar = document.createElement("div");
        homeBar.className = "phone-home-indicator";
        phoneWrap.appendChild(homeBar);

        el.appendChild(phoneWrap);
    } else if (item.type === "sticker") {
        const stickerDiv = document.createElement("div");
        stickerDiv.className = "item-sticker-content";
        stickerDiv.textContent = item.content;
        el.appendChild(stickerDiv);
    }

    // Quick Action Bar (Floating above selected item)
    const quickBar = document.createElement("div");
    quickBar.className = "item-quick-bar";

    const delBtn = document.createElement("button");
    delBtn.className = "quick-btn danger";
    delBtn.title = "Delete Item";
    delBtn.textContent = "🗑️";
    delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteDiaryItem(item.id, pageIndex);
    };
    quickBar.appendChild(delBtn);

    const fwdBtn = document.createElement("button");
    fwdBtn.className = "quick-btn";
    fwdBtn.title = "Bring Forward";
    fwdBtn.textContent = "🔼";
    fwdBtn.onclick = (e) => {
        e.stopPropagation();
        item.zIndex = (item.zIndex || 2) + 1;
        el.style.zIndex = item.zIndex;
        saveDiaryToStorage();
    };
    quickBar.appendChild(fwdBtn);

    const bwdBtn = document.createElement("button");
    bwdBtn.className = "quick-btn";
    bwdBtn.title = "Send Backward";
    bwdBtn.textContent = "🔽";
    bwdBtn.onclick = (e) => {
        e.stopPropagation();
        item.zIndex = Math.max(1, (item.zIndex || 2) - 1);
        el.style.zIndex = item.zIndex;
        saveDiaryToStorage();
    };
    quickBar.appendChild(bwdBtn);

    if (item.type === "photo") {
        const frameBtn = document.createElement("button");
        frameBtn.className = "quick-btn";
        frameBtn.title = "Change Photo Border";
        frameBtn.textContent = "🎨";
        frameBtn.onclick = (e) => {
            e.stopPropagation();
            openModal("frameDecoratorModal");
        };
        quickBar.appendChild(frameBtn);
    }

    el.appendChild(quickBar);

    // 8 Resize Handles
    const handles = ["nw", "ne", "sw", "se", "n", "s", "w", "e"];
    handles.forEach(h => {
        const handle = document.createElement("div");
        handle.className = `resize-handle handle-${h}`;
        handle.dataset.handle = h;
        el.appendChild(handle);
    });

    // Item Selection and Dragging Listener
    el.addEventListener("pointerdown", (e) => {
        if (diaryState.isReadMode) return;

        // If clicked on quick-btn or contenteditable text directly
        if (e.target.closest(".item-quick-bar")) return;

        selectItem(el);

        const handle = e.target.closest(".resize-handle");
        const pageContainer = el.parentElement;

        if (handle) {
            // Resize Action
            e.stopPropagation();
            isResizing = true;
            currentResizeHandle = handle.dataset.handle;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            const rect = el.getBoundingClientRect();
            const parentRect = pageContainer.getBoundingClientRect();

            itemStartLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;
            itemStartTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
            itemStartWidth = (rect.width / parentRect.width) * 100;
            itemStartHeight = (rect.height / parentRect.height) * 100;
            activePageElement = pageContainer;
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
        } else {
            // Drag Action
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            const rect = el.getBoundingClientRect();
            const parentRect = pageContainer.getBoundingClientRect();

            itemStartLeft = ((rect.left - parentRect.left) / parentRect.width) * 100;
            itemStartTop = ((rect.top - parentRect.top) / parentRect.height) * 100;
            activePageElement = pageContainer;
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
        }
    });

    return el;
}

function handlePointerMove(e) {
    if (!selectedDiaryItem || !activePageElement) return;

    const parentRect = activePageElement.getBoundingClientRect();
    const deltaXPercent = ((e.clientX - dragStartX) / parentRect.width) * 100;
    const deltaYPercent = ((e.clientY - dragStartY) / parentRect.height) * 100;

    const pageIndex = parseInt(selectedDiaryItem.dataset.pageIndex, 10);
    const itemData = diaryState.pages[pageIndex]?.items.find(i => i.id === selectedDiaryItem.id);
    if (!itemData) return;

    if (isDragging) {
        let newLeft = Math.max(0, Math.min(92, itemStartLeft + deltaXPercent));
        let newTop = Math.max(0, Math.min(92, itemStartTop + deltaYPercent));

        selectedDiaryItem.style.left = `${newLeft}%`;
        selectedDiaryItem.style.top = `${newTop}%`;
        itemData.left = Math.round(newLeft * 10) / 10;
        itemData.top = Math.round(newTop * 10) / 10;
    } else if (isResizing) {
        const handle = currentResizeHandle;
        let newW = itemStartWidth;
        let newH = itemStartHeight;
        let newL = itemStartLeft;
        let newT = itemStartTop;

        if (handle.includes("e")) newW = Math.max(8, itemStartWidth + deltaXPercent);
        if (handle.includes("s")) newH = Math.max(6, itemStartHeight + deltaYPercent);
        if (handle.includes("w")) {
            newW = Math.max(8, itemStartWidth - deltaXPercent);
            newL = itemStartLeft + deltaXPercent;
        }
        if (handle.includes("n")) {
            newH = Math.max(6, itemStartHeight - deltaYPercent);
            newT = itemStartTop + deltaYPercent;
        }

        selectedDiaryItem.style.width = `${newW}%`;
        selectedDiaryItem.style.height = `${newH}%`;
        selectedDiaryItem.style.left = `${newL}%`;
        selectedDiaryItem.style.top = `${newT}%`;

        itemData.width = Math.round(newW * 10) / 10;
        itemData.height = Math.round(newH * 10) / 10;
        itemData.left = Math.round(newL * 10) / 10;
        itemData.top = Math.round(newT * 10) / 10;
    }
}

function handlePointerUp() {
    isDragging = false;
    isResizing = false;
    currentResizeHandle = null;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    saveDiaryToStorage();
}

function selectItem(el) {
    deselectAllItems();
    selectedDiaryItem = el;
    el.classList.add("is-selected");
}

function deselectAllItems() {
    if (selectedDiaryItem) {
        selectedDiaryItem.classList.remove("is-selected");
        selectedDiaryItem = null;
    }
    document.querySelectorAll(".diary-item.is-selected").forEach(el => el.classList.remove("is-selected"));
}

function deleteDiaryItem(itemId, pageIndex) {
    const page = diaryState.pages[pageIndex];
    if (page) {
        page.items = page.items.filter(i => i.id !== itemId);
        renderCurrentPages();
        saveDiaryToStorage();
    }
}

function playActivePageVideos() {
    const videos = document.querySelectorAll(".open-book-scene video");
    videos.forEach(v => {
        v.play().catch(e => {
            // Autoplay permitted if muted
            v.muted = true;
            v.play().catch(err => console.log("Video autoplay pending user gesture:", err));
        });
    });
}

function pauseActivePageVideos() {
    const videos = document.querySelectorAll(".open-book-scene video");
    videos.forEach(v => v.pause());
}


/* -------------------------------------------------------------
   MODALS SETUP & ITEM CREATION
------------------------------------------------------------- */

function openModal(modalId) {
    deselectAllItems();
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("hidden");
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");
}

function setupModals() {
    // Modal Close Buttons
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".diary-modal").classList.add("hidden");
        });
    });

    // Close when clicking modal backdrop
    document.querySelectorAll(".diary-modal").forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.add("hidden");
        });
    });

    // 1. Text Modal Submit
    const textSizeSlider = document.getElementById("modalTextSize");
    const textSizeVal = document.getElementById("modalTextSizeVal");
    if (textSizeSlider && textSizeVal) {
        textSizeSlider.oninput = () => textSizeVal.textContent = `${textSizeSlider.value}px`;
    }

    const addTextSubmit = document.getElementById("modalAddTextSubmit");
    if (addTextSubmit) {
        addTextSubmit.addEventListener("click", () => {
            const text = document.getElementById("modalTextInput").value.trim();
            if (!text) {
                alert("Please enter a love note or message! ❤️");
                return;
            }
            const font = document.getElementById("modalTextFont").value;
            const size = parseInt(document.getElementById("modalTextSize").value, 10);
            const color = document.getElementById("modalTextColor").value;
            const glow = document.getElementById("modalTextGlow").checked;
            const targetSide = document.getElementById("modalTextPageTarget").value;

            const targetPageIndex = targetSide === "left"
                ? diaryState.currentPagePair * 2
                : diaryState.currentPagePair * 2 + 1;

            const newItem = {
                id: `item-${Date.now()}`,
                type: "text",
                left: 15,
                top: 25,
                width: 70,
                height: 25,
                content: text,
                font: font,
                size: size,
                color: color,
                glow: glow,
                zIndex: 3
            };

            diaryState.pages[targetPageIndex].items.push(newItem);
            renderCurrentPages();
            saveDiaryToStorage(true);
            closeModal("textModal");
            document.getElementById("modalTextInput").value = "";
        });
    }

    // 2. Photo Modal File / URL Upload & Frame Selection
    const photoFile = document.getElementById("modalPhotoFile");
    const photoUrl = document.getElementById("modalPhotoUrl");
    const photoPreview = document.getElementById("modalPhotoPreview");
    const photoPlaceholder = document.getElementById("photoPlaceholderText");

    let currentPhotoSrc = "";

    if (photoFile) {
        photoFile.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (re) => {
                    currentPhotoSrc = re.target.result;
                    photoPreview.src = currentPhotoSrc;
                    photoPreview.classList.remove("hidden");
                    if (photoPlaceholder) photoPlaceholder.classList.add("hidden");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (photoUrl) {
        photoUrl.addEventListener("input", () => {
            const val = photoUrl.value.trim();
            if (val) {
                currentPhotoSrc = val;
                photoPreview.src = currentPhotoSrc;
                photoPreview.classList.remove("hidden");
                if (photoPlaceholder) photoPlaceholder.classList.add("hidden");
            }
        });
    }

    // Frame Radio options selection & Live Preview
    document.querySelectorAll(".border-option-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".border-option-item").forEach(i => i.classList.remove("selected"));
            item.classList.add("selected");
            const radio = item.querySelector("input[type='radio']");
            if (radio) radio.checked = true;

            const previewFrame = document.getElementById("modalPhotoPreviewFrame");
            if (previewFrame) {
                const frameChoice = item.dataset.frame || "frame-none";
                previewFrame.className = `modal-photo-preview-frame ${frameChoice}`;
            }
        });
    });

    const addPhotoSubmit = document.getElementById("modalAddPhotoSubmit");
    if (addPhotoSubmit) {
        addPhotoSubmit.addEventListener("click", () => {
            if (!currentPhotoSrc) {
                alert("Please select a photo file or enter an image link! 📸");
                return;
            }
            const selectedRadio = document.querySelector("input[name='frameChoice']:checked");
            const frame = selectedRadio ? selectedRadio.value : "frame-none";
            const caption = document.getElementById("modalPhotoCaption").value.trim();
            const targetSide = document.getElementById("modalPhotoPageTarget").value;

            const targetPageIndex = targetSide === "left"
                ? diaryState.currentPagePair * 2
                : diaryState.currentPagePair * 2 + 1;

            const pageItems = diaryState.pages[targetPageIndex].items;
            const offset = (pageItems.length * 5) % 25;

            const newItem = {
                id: `item-${Date.now()}`,
                type: "photo",
                left: 18 + offset,
                top: 16 + offset,
                width: 64,
                height: 54,
                src: currentPhotoSrc,
                frame: frame,
                caption: caption,
                zIndex: 10 + pageItems.length
            };

            diaryState.pages[targetPageIndex].items.push(newItem);
            renderCurrentPages();
            saveDiaryToStorage(true);
            closeModal("photoModal");
            showToastNotice("Photo added to page! 🖼️");

            // Reset modal
            currentPhotoSrc = "";
            photoPreview.src = "";
            photoPreview.classList.add("hidden");
            if (photoPlaceholder) photoPlaceholder.classList.remove("hidden");
            document.getElementById("modalPhotoCaption").value = "";
            photoUrl.value = "";

            const previewFrame = document.getElementById("modalPhotoPreviewFrame");
            if (previewFrame) previewFrame.className = "modal-photo-preview-frame frame-none";
            document.querySelectorAll(".border-option-item").forEach((b, idx) => {
                if (idx === 0) {
                    b.classList.add("selected");
                    const r = b.querySelector("input[type='radio']");
                    if (r) r.checked = true;
                } else {
                    b.classList.remove("selected");
                }
            });
        });
    }

    // 3. Reel / Video Modal (Mobile Smartphone Size & Presets)
    const reelFile = document.getElementById("modalReelFile");
    const reelUrl = document.getElementById("modalReelUrl");
    const reelPreview = document.getElementById("modalReelPreview");
    const reelIframePreview = document.getElementById("modalReelIframePreview");
    const reelPlaceholder = document.getElementById("reelPlaceholderText");

    let currentReelSrc = ROMANTIC_PRESET_REELS.sparkle.src; // Default to romantic sample preset
    let currentReelBlobKey = null;

    function updateModalReelPreview(src) {
        if (!src) {
            if (reelPreview) reelPreview.classList.add("hidden");
            if (reelIframePreview) reelIframePreview.classList.add("hidden");
            if (reelPlaceholder) reelPlaceholder.classList.remove("hidden");
            return;
        }

        const parsed = parseVideoUrl(src);
        if (reelPlaceholder) reelPlaceholder.classList.add("hidden");

        if (parsed.type === "youtube") {
            if (reelPreview) {
                reelPreview.pause();
                reelPreview.classList.add("hidden");
            }
            if (reelIframePreview) {
                reelIframePreview.src = parsed.embedUrl;
                reelIframePreview.classList.remove("hidden");
            }
        } else {
            if (reelIframePreview) {
                reelIframePreview.src = "";
                reelIframePreview.classList.add("hidden");
            }
            if (reelPreview) {
                reelPreview.src = parsed.src;
                reelPreview.classList.remove("hidden");
                reelPreview.play().catch(() => {});
            }
        }
    }

    // Set initial preset preview
    updateModalReelPreview(currentReelSrc);

    // Preset Buttons
    document.querySelectorAll(".preset-reel-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".preset-reel-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const presetKey = btn.dataset.preset;
            if (ROMANTIC_PRESET_REELS[presetKey]) {
                currentReelSrc = ROMANTIC_PRESET_REELS[presetKey].src;
                currentReelBlobKey = null;
                if (reelUrl) reelUrl.value = "";
                updateModalReelPreview(currentReelSrc);
            }
        });
    });

    if (reelFile) {
        reelFile.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (file) {
                // Save to IndexedDB to eliminate 5MB localStorage crash
                const blobKey = `reel_blob_${Date.now()}`;
                await saveMediaBlob(blobKey, file);
                currentReelBlobKey = blobKey;
                currentReelSrc = URL.createObjectURL(file);

                document.querySelectorAll(".preset-reel-btn").forEach(b => b.classList.remove("active"));
                if (reelUrl) reelUrl.value = "";
                updateModalReelPreview(currentReelSrc);
                showToastNotice("Reel video loaded! 📱");
            }
        });
    }

    if (reelUrl) {
        reelUrl.addEventListener("input", () => {
            const val = reelUrl.value.trim();
            if (val) {
                currentReelSrc = val;
                currentReelBlobKey = null;
                document.querySelectorAll(".preset-reel-btn").forEach(b => b.classList.remove("active"));
                updateModalReelPreview(currentReelSrc);
            }
        });
    }

    const addReelSubmit = document.getElementById("modalAddReelSubmit");
    if (addReelSubmit) {
        addReelSubmit.addEventListener("click", () => {
            if (!currentReelSrc) {
                currentReelSrc = ROMANTIC_PRESET_REELS.sparkle.src;
            }
            const autoplay = document.getElementById("modalReelAutoplay").checked;
            const loop = document.getElementById("modalReelLoop").checked;
            const targetSide = document.getElementById("modalReelPageTarget").value;

            const targetPageIndex = targetSide === "left"
                ? diaryState.currentPagePair * 2
                : diaryState.currentPagePair * 2 + 1;

            // 📱 Authentically Sized Vertical Mobile Smartphone Reel (9:16 Aspect Ratio)
            const newItem = {
                id: `item-${Date.now()}`,
                type: "reel",
                left: 28,
                top: 9,
                width: 44,
                height: 82,
                src: currentReelSrc,
                mediaBlobKey: currentReelBlobKey || null,
                autoplay: autoplay,
                loop: loop,
                muted: true,
                zIndex: 4
            };

            diaryState.pages[targetPageIndex].items.push(newItem);
            renderCurrentPages();
            saveDiaryToStorage(true);
            closeModal("reelModal");
            showToastNotice("Mobile Reel added to page! 🎬");

            // Reset modal state
            currentReelSrc = ROMANTIC_PRESET_REELS.sparkle.src;
            currentReelBlobKey = null;
            if (reelUrl) reelUrl.value = "";
            document.querySelectorAll(".preset-reel-btn").forEach((b, idx) => {
                if (idx === 0) b.classList.add("active");
                else b.classList.remove("active");
            });
            updateModalReelPreview(currentReelSrc);
        });
    }

    // 4. Quick Frame Decorator Preset Buttons
    document.querySelectorAll(".frame-preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const newFrame = btn.dataset.frame;
            if (selectedDiaryItem) {
                const pageIndex = parseInt(selectedDiaryItem.dataset.pageIndex, 10);
                const item = diaryState.pages[pageIndex]?.items.find(i => i.id === selectedDiaryItem.id);
                if (item && item.type === "photo") {
                    item.frame = newFrame;
                    const photoWrap = selectedDiaryItem.querySelector(".item-photo-wrapper");
                    if (photoWrap) {
                        photoWrap.className = `item-photo-wrapper ${newFrame}`;
                    }
                    saveDiaryToStorage(true);
                    closeModal("frameDecoratorModal");
                }
            } else {
                alert("Please select a photo on the page first, then choose a border! 📸");
            }
        });
    });
}

function setupStickerPicker() {
    const grid = document.getElementById("stickersGrid");
    if (!grid) return;

    grid.innerHTML = "";
    ROMANTIC_STICKERS.forEach(sticker => {
        const btn = document.createElement("button");
        btn.className = "sticker-pick-btn";
        btn.textContent = sticker;
        btn.onclick = () => {
            const targetSide = document.getElementById("modalStickerPageTarget")?.value || "left";
            const targetPageIndex = targetSide === "left"
                ? diaryState.currentPagePair * 2
                : diaryState.currentPagePair * 2 + 1;

            const newItem = {
                id: `item-${Date.now()}`,
                type: "sticker",
                left: 20 + Math.random() * 50,
                top: 20 + Math.random() * 50,
                width: 14,
                height: 12,
                content: sticker,
                zIndex: 5
            };

            diaryState.pages[targetPageIndex].items.push(newItem);
            renderCurrentPages();
            saveDiaryToStorage(true);
            closeModal("stickerModal");
        };
        grid.appendChild(btn);
    });
}


/* -------------------------------------------------------------
   DIARY STAGE CONTROLS & LISTENERS
------------------------------------------------------------- */

function setupDiaryListeners() {
    // Closed Book click
    const closedBook = document.getElementById("closedDiary3D");
    if (closedBook) {
        closedBook.addEventListener("click", openDiaryBook);
    }

    // Close Book button
    const closeBookBtn = document.getElementById("closeBookBtn");
    if (closeBookBtn) {
        closeBookBtn.addEventListener("click", closeDiaryBook);
    }

    // Page navigation
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    const addPageBtn = document.getElementById("addPageBtn");
    const modeToggleBtn = document.getElementById("modeToggleBtn");

    if (prevBtn) prevBtn.addEventListener("click", () => flipPage(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => flipPage(1));
    if (addPageBtn) addPageBtn.addEventListener("click", addNewPagePair);
    if (modeToggleBtn) modeToggleBtn.addEventListener("click", toggleReadingMode);

    const pageIndicator = document.getElementById("pageIndicator");
    if (pageIndicator) {
        pageIndicator.style.cursor = "pointer";
        pageIndicator.title = "Click to jump to any page number";
        pageIndicator.addEventListener("click", () => {
            const maxPages = diaryState.pages.length;
            const target = prompt(`Go to page number (1 to ${maxPages}):`, (diaryState.currentPagePair * 2 + 1));
            if (target) {
                const pNum = parseInt(target, 10);
                if (!isNaN(pNum) && pNum >= 1 && pNum <= maxPages) {
                    diaryState.currentPagePair = Math.floor((pNum - 1) / 2);
                    renderCurrentPages();
                    saveDiaryToStorage();
                }
            }
        });
    }

    // Toolbar buttons
    document.getElementById("toolAddTextBtn")?.addEventListener("click", () => openModal("textModal"));
    document.getElementById("toolAddPhotoBtn")?.addEventListener("click", () => openModal("photoModal"));
    document.getElementById("toolAddReelBtn")?.addEventListener("click", () => openModal("reelModal"));
    document.getElementById("toolAddStickerBtn")?.addEventListener("click", () => openModal("stickerModal"));
    document.getElementById("toolFrameDecorBtn")?.addEventListener("click", () => openModal("frameDecoratorModal"));
    document.getElementById("toolAddPageBtn")?.addEventListener("click", addNewPagePair);
    document.getElementById("toolSaveBtn")?.addEventListener("click", () => saveDiaryToStorage(true));
    document.getElementById("toolDeletePageBtn")?.addEventListener("click", deleteCurrentPagePair);

    // Music buttons
    document.getElementById("musicToggleBtn")?.addEventListener("click", toggleMusic);
    document.getElementById("openMusicModalBtn")?.addEventListener("click", () => openModal("musicModal"));

    const volSlider = document.getElementById("musicVolume");
    if (volSlider) {
        volSlider.addEventListener("input", (e) => {
            setMusicVolume(parseFloat(e.target.value));
        });
    }

    // Keyboard navigation (Arrow keys)
    window.addEventListener("keydown", (e) => {
        if (e.target.matches("input, textarea, [contenteditable='true']")) return;
        if (e.key === "ArrowLeft") flipPage(-1);
        if (e.key === "ArrowRight") flipPage(1);
    });

    // Deselect item when clicking background page canvas
    document.addEventListener("pointerdown", (e) => {
        if (!e.target.closest(".diary-item") && !e.target.closest(".decorate-toolbar") && !e.target.closest(".diary-modal")) {
            deselectAllItems();
        }
    });
}


/* -------------------------------------------------------------
   🎵 ROMANTIC AUDIO & BACKGROUND MUSIC SYNTHESIZER
------------------------------------------------------------- */

function setupAudioSystem() {
    const audioEl = document.getElementById("bgMusicAudio");
    if (audioEl) {
        audioEl.volume = musicVolume;
    }

    // Custom music file input
    const customMusicFile = document.getElementById("customMusicFile");
    if (customMusicFile) {
        customMusicFile.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                playCustomAudioSrc(url);
                closeModal("musicModal");
                showToastNotice("Custom Love Song Loaded! 🎵");
            }
        });
    }

    // Custom music URL
    const applyUrlBtn = document.getElementById("applyMusicUrlBtn");
    const customMusicUrl = document.getElementById("customMusicUrl");
    if (applyUrlBtn && customMusicUrl) {
        applyUrlBtn.addEventListener("click", () => {
            const url = customMusicUrl.value.trim();
            if (url) {
                playCustomAudioSrc(url);
                closeModal("musicModal");
                showToastNotice("Custom Song URL Applied! 🎵");
            }
        });
    }

    // Music Preset Buttons
    document.querySelectorAll(".music-preset-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".music-preset-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            startRomanticSynthChords();
            closeModal("musicModal");
            showToastNotice("Romantic Melody Active 🎹");
        });
    });
}

function playCustomAudioSrc(src) {
    stopRomanticSynth();
    const audioEl = document.getElementById("bgMusicAudio");
    if (audioEl) {
        audioEl.src = src;
        audioEl.volume = musicVolume;
        audioEl.play().then(() => {
            isMusicPlaying = true;
            currentMusicType = "audio";
            updateMusicDiscState();
        }).catch(err => console.log("Audio playback waiting for gesture:", err));
    }
}

function playRomanticMusic() {
    if (currentMusicType === "audio") {
        const audioEl = document.getElementById("bgMusicAudio");
        if (audioEl && audioEl.src) {
            audioEl.play().catch(() => startRomanticSynthChords());
            isMusicPlaying = true;
            updateMusicDiscState();
            return;
        }
    }
    // Default to dreamy romantic chords synthesizer
    startRomanticSynthChords();
}

function toggleMusic() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playRomanticMusic();
    }
}

function pauseMusic() {
    isMusicPlaying = false;
    stopRomanticSynth();
    const audioEl = document.getElementById("bgMusicAudio");
    if (audioEl) audioEl.pause();
    updateMusicDiscState();
}

function setMusicVolume(val) {
    musicVolume = val;
    if (synthGainNode) {
        synthGainNode.gain.value = val * 0.18;
    }
    const audioEl = document.getElementById("bgMusicAudio");
    if (audioEl) audioEl.volume = val;
}

function updateMusicDiscState() {
    const discBtn = document.getElementById("musicToggleBtn");
    if (discBtn) {
        if (isMusicPlaying) {
            discBtn.classList.add("spinning");
        } else {
            discBtn.classList.remove("spinning");
        }
    }
}

// Built-in Pure Romantic Piano/Harp Chord Synthesizer (Zero External File Dependencies)
function startRomanticSynthChords() {
    try {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        if (!synthGainNode) {
            synthGainNode = audioCtx.createGain();
            synthGainNode.gain.value = musicVolume * 0.18;
            synthGainNode.connect(audioCtx.destination);
        }

        stopRomanticSynth();
        isMusicPlaying = true;
        currentMusicType = "synth";
        updateMusicDiscState();

        // Romantic Chord Frequencies (Cmaj7 -> Am7 -> Fmaj7 -> Gsus4)
        const chordProgressions = [
            [261.63, 329.63, 392.00, 493.88], // C, E, G, B
            [220.00, 261.63, 329.63, 392.00], // A, C, E, G
            [174.61, 261.63, 329.63, 349.23], // F, C, E, F
            [196.00, 261.63, 293.66, 392.00]  // G, C, D, G
        ];

        let chordIdx = 0;
        let noteIdx = 0;

        function playNextNote() {
            if (!isMusicPlaying || !audioCtx) return;

            const currentChord = chordProgressions[chordIdx];
            const freq = currentChord[noteIdx];

            const osc = audioCtx.createOscillator();
            const noteGain = audioCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            // Soft romantic envelope
            noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
            noteGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.12);
            noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.6);

            osc.connect(noteGain);
            noteGain.connect(synthGainNode);

            osc.start(audioCtx.currentTime);
            osc.stop(audioCtx.currentTime + 1.8);

            noteIdx++;
            if (noteIdx >= currentChord.length) {
                noteIdx = 0;
                chordIdx = (chordIdx + 1) % chordProgressions.length;
            }
        }

        // Arpeggiate notes smoothly every 420ms
        playNextNote();
        synthInterval = setInterval(playNextNote, 420);

    } catch (e) {
        console.error("Web Audio Synth initialization error:", e);
    }
}

function stopRomanticSynth() {
    if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
    }
}

