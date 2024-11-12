document.addEventListener('DOMContentLoaded', () => {
    // Espera até que o conteúdo do DOM seja carregado antes de executar o código.

    const bird = document.querySelector('.bird')
    // Seleciona o elemento com a classe 'bird' e o armazena na constante 'bird'.

    const gameDisplay = document.querySelector('.game-container')
    // Seleciona o elemento com a classe 'game-container' e o armazena na constante 'gameDisplay'.

    const ground = document.querySelector('.ground-moving')
    // Seleciona o elemento com a classe 'ground-moving' e o armazena na constante 'ground'.

    let birdLeft = 220
    // Define a posição inicial do pássaro à esquerda como 220 pixels.

    let birdBottom = 100
    // Define a posição inicial do pássaro na parte inferior como 100 pixels.

    let gravity = 3
    // Define a gravidade que fará o pássaro cair.

    let isGameOver = false
    // Define uma variável para verificar se o jogo acabou.

    let gap = 470
    // Define o espaço entre os obstáculos.

    function startGame() {
        birdBottom -= gravity
        // Reduz a posição inferior do pássaro pela gravidade, fazendo-o cair.

        bird.style.bottom = birdBottom + 'px'
        // Atualiza a posição inferior do pássaro no estilo CSS.

        bird.style.left = birdLeft + 'px'
        // Atualiza a posição à esquerda do pássaro no estilo CSS.
    }

    let gameTimerId = setInterval(startGame, 20)
    // Chama a função startGame a cada 20 milissegundos para criar o efeito de queda contínua.

    function control(e) {
        if (e.keyCode === 32) {
            jump()
            // Se a tecla pressionada for a barra de espaço (código 32), chama a função jump.
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        // Se a posição inferior do pássaro for menor que 500, aumenta em 50 pixels para simular um salto.

        bird.style.bottom = birdBottom + 'px'
        // Atualiza a posição inferior do pássaro no estilo CSS.

        console.log(birdBottom)
        // Exibe a posição inferior do pássaro no console para depuração.
    }

    document.addEventListener('keyup', control)
    // Adiciona um ouvinte de evento para detectar quando uma tecla é liberada e chama a função control.

    function generateObstacle() {
        let obstacleLeft = 500
        // Define a posição inicial do obstáculo à esquerda como 500 pixels.

        let randomHeight = Math.random() * 60
        // Gera uma altura aleatória para o obstáculo.

        let obstacleBottom = randomHeight
        // Define a posição inferior do obstáculo com a altura aleatória.

        const obstacle = document.createElement('div')
        // Cria um novo elemento 'div' para o obstáculo.

        const topObstacle = document.createElement('div')
        // Cria um novo elemento 'div' para o obstáculo superior.

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            // Adiciona a classe 'obstacle' ao obstáculo se o jogo não acabou.

            topObstacle.classList.add('topObstacle')
            // Adiciona a classe 'topObstacle' ao obstáculo superior se o jogo não acabou.
        }

        gameDisplay.appendChild(obstacle)
        // Adiciona o obstáculo ao contêiner do jogo.

        gameDisplay.appendChild(topObstacle)
        // Adiciona o obstáculo superior ao contêiner do jogo.

        obstacle.style.left = obstacleLeft + 'px'
        // Define a posição à esquerda do obstáculo no estilo CSS.

        topObstacle.style.left = obstacleLeft + 'px'
        // Define a posição à esquerda do obstáculo superior no estilo CSS.

        obstacle.style.bottom = obstacleBottom + 'px'
        // Define a posição inferior do obstáculo no estilo CSS.

        topObstacle.style.bottom = obstacleBottom + gap + 'px'
        // Define a posição inferior do obstáculo superior no estilo CSS, considerando o espaço.

        function moveObstacle() {
            obstacleLeft -= 2
            // Move o obstáculo 2 pixels para a esquerda.

            obstacle.style.left = obstacleLeft + 'px'
            // Atualiza a posição à esquerda do obstáculo no estilo CSS.

            topObstacle.style.left = obstacleLeft + 'px'
            // Atualiza a posição à esquerda do obstáculo superior no estilo CSS.

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                // Para o movimento do obstáculo quando ele sai da tela.

                gameDisplay.removeChild(obstacle)
                // Remove o obstáculo do contêiner do jogo.

                gameDisplay.removeChild(topObstacle)
                // Remove o obstáculo superior do contêiner do jogo.
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0
            ) {
                gameOver()
                // Verifica se o pássaro colidiu com o obstáculo ou caiu no chão e chama a função gameOver.

                clearInterval(timerId)
                // Para o movimento do obstáculo.
            }
        }

        let timerId = setInterval(moveObstacle, 20)
        // Chama a função moveObstacle a cada 20 milissegundos para mover o obstáculo.

        if (!isGameOver) setTimeout(generateObstacle, 3000)
        // Gera um novo obstáculo a cada 3 segundos se o jogo não acabou.
    }

    generateObstacle()
    // Chama a função generateObstacle para criar o primeiro obstáculo.

    function gameOver() {
        clearInterval(gameTimerId)
        // Para o movimento do pássaro.

        console.log('game over')
        // Exibe 'game over' no console para depuração.

        isGameOver = true
        // Define a variável isGameOver como verdadeira para indicar que o jogo acabou.

        document.removeEventListener('keyup', control)
        // Remove o ouvinte de evento para parar de detectar teclas.

        ground.classList.add('ground')
        // Adiciona a classe 'ground' ao elemento ground.

        ground.classList.remove('ground-moving')
        // Remove a classe 'ground-moving' do elemento ground para parar o movimento do chão.
    }
})
// Fecha o ouvinte de evento DOMContentLoaded.
