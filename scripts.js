document.addEventListener('DOMContentLoaded', function() {
    // Prohibit image dragging for all images
    document.querySelectorAll('img').forEach(img => {
        img.ondragstart = () => false;
    });

    // Event listener for the pack image click
    document.getElementById('packImage').addEventListener('click', function () {
        startReveal();
    });

    // Event listener for the "Tap to Reveal" button
    document.getElementById('revealButton').addEventListener('click', function () {
        startReveal();
    });

    function startReveal() {
        let packImage = document.getElementById('packImage');
        let revealButton = document.getElementById('revealButton');

        // Fade out pack image and button
        packImage.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        packImage.style.opacity = 0;
        revealButton.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        revealButton.style.opacity = 0;

        setTimeout(() => {
            document.getElementById('scene1').classList.add('hidden');
            showScene('scene2');
        }, 200);
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
            const cardText = scene.querySelector('.cardText');

            // Check if elements exist in the scene
            if (bgGlow) bgGlow.classList.remove('hidden');
            if (card) {
                card.classList.remove('hidden');
                card.style.transform = 'scale(1) rotateY(0)';
                card.style.opacity = 1;
            }

            if (cardText) {
                setTimeout(() => {
                    cardText.classList.remove('hidden');
                    cardText.style.opacity = 1;
                    cardText.style.transform = 'translateY(0)';

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

                    // Enable click to proceed only after card text is shown
                    if (card) {
                        card.querySelector('img').addEventListener('click', function() {
                            const nextSceneId = 'scene' + (parseInt(sceneId.replace('scene', '')) + 1);
                            scene.classList.add('hidden');
                            showScene(nextSceneId);
                        });
                    }
                }, 500); // Delay for card text animation completion
            }
        }, 500); // Delay before showing the scene 
    }
});