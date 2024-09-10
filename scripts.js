document.addEventListener('DOMContentLoaded', function() {
    // Prohibit image dragging for all images
    document.querySelectorAll('img').forEach(img => {
        img.ondragstart = () => false;
    });

    // Event listener for the pack image click
    document.getElementById('packImage').addEventListener('click', function () {
        startReveal();
    });

    // Event listener for the "Tap to Open" text
    document.getElementById('tapText').addEventListener('click', function () {
        startReveal();
    });

    function startReveal() {
        let packImage = document.getElementById('packImage');
        let blurredPackImage = document.getElementById('blurredPackImage');
        let tapText = document.getElementById('tapText');

        // Faster fade out for pack image, blurred image, and text
        packImage.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        packImage.style.opacity = 0;
        blurredPackImage.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        blurredPackImage.style.opacity = 0;
        tapText.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        tapText.style.opacity = 0;

        setTimeout(() => {
            document.getElementById('scene1').classList.add('hidden');
            showScene('scene2');
        }, 300); // Adjust timeout to match the faster transition
    }

    // Function to show a scene with animations
    function showScene(sceneId) {
        const scene = document.getElementById(sceneId);

        // Check if the scene exists
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }

        console.log(`Showing ${sceneId}`); // Debug log

        // Delay in showing the next scene
        setTimeout(() => {
            scene.classList.remove('hidden');

            // Update elements inside the scene
            const bgGlow = scene.querySelector('.bgGlow');
            const card = scene.querySelector('.card');

            // Check if elements exist in the scene
            if (bgGlow) bgGlow.classList.remove('hidden');
            if (card) {
                card.classList.remove('hidden');
                card.style.transform = 'scale(1) rotateY(0)';
                card.style.opacity = 1;

                // Show card text on card reveal
                const cardText = scene.querySelector('.cardText');
                if (cardText) {
                    cardText.style.opacity = 1;
                    cardText.style.transform = 'translateY(0)';
                }

                // Enable click to proceed after card animation
                card.querySelector('img').addEventListener('click', function() {
                    const nextSceneId = 'scene' + (parseInt(sceneId.replace('scene', '')) + 1);
                    scene.classList.add('hidden');
                    showScene(nextSceneId);
                });
            }

            // Special handling for scene4: Show the rotating SVG
            if (sceneId === 'scene4') {
                const rotatingSVG = document.getElementById('rotatingSVG');
                if (rotatingSVG) {
                    console.log('Showing rotatingSVG'); // Debug log
                    rotatingSVG.classList.remove('hidden');
                    rotatingSVG.style.opacity = 1;
                } else {
                    console.error('rotatingSVG not found'); // Debug log
                }
            }
        }, 500); // Delay before showing the scene 
    }
});