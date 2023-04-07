        //elementos
        var viniciar
        var vjogador
        var vcpu
        var vbola
        var vPainelJog
        var vPainelCpu

        //controle de animação/requestAnimationFrame
        var game, frames

        //posições
        var posBolaX, posBolaY
        var posJogadorY, posJogadorX
        var posCpuX, posCpuY

        //direção de acordo com tecla
        var dirJy //só o eixo Y pois as barras só andarão pra cima e pra baixo

        //posições iniciais
        var jogadorinicioX = 0, jogadorinicioY = 180, cpuInicioY = 180, bolaInicioX= 475, bolaInicioY = 240 

        //tamanhos
        var campoX = 0, campoY= 0, campoWidth = 960, campoHeight = 500
        var barraWidth = 20, barraHeight = 140, bolaWidth = 20, bolaHeight = 20

        //Direção
        var bolaX, bolaY//variavel de direção da bola
        var cpuY = 0//só vão no eixoY(pra cima e pra baixo)
        
        //velocidade
        var velBola, velCpu, velJogador

        //controle
        var pontosJog = 0
        var pontosCpu = 0
        var tecla
        jogo = false

        function controlaCpu(){
            if(jogo){
                if((posBolaX > (campoWidth/2))&&(bolaX > 0)){
                    //movimentar cpu
                    if(((posBolaY+(bolaHeight/2))>((posCpuY+(barraHeight/2)))+velCpu)){
                        //mover para baixo
                        if((posCpuY+barraHeight) <= campoHeight){
                            posCpuY+=velCpu
                        }
                    }else if((posBolaY+(bolaHeight/2)) < (posCpuY+(barraHeight/2))-velCpu){
                        //mover para cima
                        if(posCpuY >= 0){
                            posCpuY-=velCpu
                        }
                    }
            }else{
                //posicionar cpu
                if((posCpuY+(barraHeight/2)) < (campoHeight/2)){
                    posCpuY+=velCpu
                
                }else if((posCpuY+(barraHeight/2)) > (campoHeight/2)){
                    posCpuY-=velCpu
                    }
                }
                vcpu.style.top=posCpuY+"px"
            }
        }   
        function controlaJogador(){
            if(jogo){
                posJogadorY+=velJogador*dirJy//posiçãoJogador = posiçãoJogador + velocidade*direção
                if(((posJogadorY+barraHeight) >= campoHeight)||((posJogadorY)<= 0)){//limite da barra dentro do campo
                    posJogadorY+=(velJogador*dirJy)*(-1)//inversão - se chegar no limite do campo, a barra rebate e vai no sentido oposto
                }
                vjogador.style.top=posJogadorY+"px"
            }
        }

        function controlaBola(){
            //movimentação da bola
            posBolaX+=velBola*bolaX
            posBolaY+=velBola*bolaY

            //colisão com jogador
            if((posBolaX <= posJogadorX+barraWidth)&&((posBolaY+bolaHeight >= posJogadorY)&&(posBolaY <=posJogadorY+barraHeight))){
                bolaY=(((posBolaY+(bolaHeight/2))-(posJogadorY+(barraHeight/2)))/16)
                bolaX*=-1
            }
            //colisão com cpu
            if((posBolaX >= posCpuX-barraWidth)&&(((posBolaX+bolaHeight) >= posCpuY)&&(posBolaY <=posCpuY+barraHeight))){
                bolaY=(((posBolaY+(bolaHeight/2))-(posCpuY+(barraHeight/2)))/16)
                bolaX*=-1
            }

            //limites superior e inferior
            if((posBolaY >= 480)||(posBolaY <= 0)){
                bolaY*=-1
            }

            //limites esquerdo e direito
            if(posBolaX >= (campoWidth - bolaWidth)){
                velBola  = 0
                posBolaX = bolaInicioX
                posBolaY= bolaInicioY
                posJogadorY = jogadorinicioY
                posCpuY = cpuInicioY

                pontosJog++
                vPainelJog.value = pontosJog
                jogo  =  false
                vjogador.style.top = posJogadorY+"px"
                vcpu.style.top = posCpuY+"px"

            }else if(posBolaX <= 0){
                velBola  = 0
                posBolaX = bolaInicioX
                posBolaY= bolaInicioY
                posJogadorY = jogadorinicioY
                posCpuY = cpuInicioY

                pontosCpu++
                vPainelCpu.value = pontosCpu
                jogo  =  false
                vjogador.style.top = posJogadorY+"px"
                vcpu.style.top = posCpuY+"px"
            }
            



            vbola.style.top = posBolaY+"px"
            vbola.style.left = posBolaX+"px"
        }

        function teclaDown(){
            tecla = event.keyCode
            if(tecla==38){//seta pra cima
                dirJy = -1 //eixo Y pra cima
            }else if(tecla == 40){
                dirJy = +1 //eixo Y pra baixo
            }
            
        }
        function teclaUp(){
            tecla = event.keyCode
            if(tecla==38){//seta pra cima
                dirJy = 0 //para de se movimentar
            }else if(tecla == 40){
                dirJy = 0 //para de se movimentar
            }
        }

        function game(){//todos os comandos do jogo
            if(jogo){
                controlaJogador()
                controlaBola()
                controlaCpu()
            }
            frames = requestAnimationFrame(game)
        }

        function iniciaJogo(){//inicia o joguinho
            if(!jogo){
                cancelAnimationFrame(frames)
                jogo = true
                dirJy = 0
                bolaY = 0
                velBola = velCpu = velJogador = 8
                if((Math.random()*10) < 5){//pegando um numero aleatorio entre 0 e 10
                    bolaX=-1//se o numero for menor que 5, a bola vai pra esquerda
                }else{
                    bolaX=+1//se o numero for maior que 5, a bola vai pra direita
                }
                posBolaX=bolaInicioX
                posBolaY=bolaInicioY
                posJogadorY = jogadorinicioY
                posJogadorX = 10
                posCpuY=cpuInicioY
                posCpuX = 930
                game()//chamando os comando do jogo
            }
        }

        function inicializa(){//função que vai inicializar as variaveis com a pagina
            viniciar = document.getElementById("btIniciar")
            viniciar.addEventListener("click", iniciaJogo)//ao clicar no botao, a função "inicia jogo sera chamada"
            vjogador = document.getElementById("jogador")
            vcpu = document.getElementById("cpu")
            vbola = document.getElementById("bola")
            vPainelJog = document.getElementById("txtPontosJog")
            vPainelCpu = document.getElementById("txtPontosCpu")
            document.addEventListener("keydown", teclaDown)
            document.addEventListener("keyup", teclaUp)
        }
        
        window.addEventListener("load", inicializa)//quando a pagina iniciar, a função sera chamada