// src/snowfall.js

export function createSnowfallEffect(containerSelector, snowflakeSVGs) {
    const container = document.querySelector(containerSelector || 'body');
    let lastTimestamp = 0;
    const throttleTime = 100;

    function createSnowflake(event) {
        const now = Date.now();
        if (now - lastTimestamp < throttleTime) {
            return;
        }
        lastTimestamp = now;

        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        const randomSnowflakeIndex = Math.floor(Math.random() * snowflakeSVGs.length);
        const randomSize = Math.floor(Math.random() * 20) + 10;
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

        const offsetX = event.clientX;
        const offsetY = event.clientY;

        snowflake.style.width = `${randomSize}px`;
        snowflake.style.height = `${randomSize}px`;
        snowflake.style.color = randomColor;

        const img = new Image();
        img.src = snowflakeSVGs[randomSnowflakeIndex];
        img.width = randomSize;
        img.height = randomSize;

        img.onload = function () {
            snowflake.appendChild(img);

            snowflake.style.position = "fixed";
            snowflake.style.left = `${offsetX - randomSize / 2}px`;
            snowflake.style.top = `${offsetY - randomSize / 2}px`;

            container.appendChild(snowflake);

            const animation = snowflake.animate(
                [
                    { transform: `translate(0, 0)` },
                    { transform: `translate(0, ${window.innerHeight + randomSize}px)` }
                ],
                {
                    duration: Math.floor(Math.random() * 3000) + 1000,
                    easing: "linear"
                }
            );

            animation.onfinish = () => {
                snowflake.remove();
            };
        };
    }

    function adjustSnowflakePositions() {
        const snowflakes = document.querySelectorAll(".snowflake");
        snowflakes.forEach(snowflake => {
            const offsetY = parseFloat(snowflake.style.top.replace("px", ""));
            snowflake.style.top = `${offsetY + window.scrollY}px`;
        });
    }

    document.addEventListener("mousemove", function (event) {
        createSnowflake(event);
    });

    document.addEventListener("scroll", function () {
        adjustSnowflakePositions();
    });

    return {
        destroy: () => {
            document.removeEventListener("mousemove", createSnowflake);
            document.removeEventListener("scroll", adjustSnowflakePositions);
            const snowflakes = document.querySelectorAll(".snowflake");
            snowflakes.forEach(snowflake => snowflake.remove());
        }
    };
}
