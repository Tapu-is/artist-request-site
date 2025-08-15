document.addEventListener('DOMContentLoaded', function() {
    // Initialize all conveyor belts
    const initConveyorBelt = (container) => {
        const rows = container.querySelectorAll('.tile-row');
        const tileWidth = 300;
        const gap = 20;
        
        rows.forEach(row => {
            // Calculate tiles needed
            const viewportWidth = container === document ? window.innerWidth : container.clientWidth;
            const tilesPerScreen = Math.ceil(viewportWidth / (tileWidth + gap));
            const totalTiles = tilesPerScreen * 2;
            
            // Clear and create tiles
            row.innerHTML = '';
            for (let i = 0; i < totalTiles; i++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                // Add subtle variation
                if (i % 4 === 0) {
                    tile.style.backgroundImage = `
                        linear-gradient(135deg, var(--tile-bg), var(--tile-accent)),
                        radial-gradient(circle at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)
                    `;
                }
                
                row.appendChild(tile);
            }
        });
    };

    // Initialize background and gallery conveyors
    initConveyorBelt(document);
    initConveyorBelt(document.querySelector('.gallery-container'));

    // Handle window resize
    window.addEventListener('resize', function() {
        initConveyorBelt(document);
        initConveyorBelt(document.querySelector('.gallery-container'));
    });

    // Add hover effects to tiles
    document.querySelectorAll('.tile').forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            tile.style.transform = 'scale(1.03)';
        });
        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
        });
    });
});
