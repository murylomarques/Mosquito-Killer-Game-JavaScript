var largura =  0;
var altura = 0;
var vida = 1;
var posicaox = 0;
var posicaoy = 0;
var nivel = window.location.search
nivel = nivel.replace('?', '')
var criamosquito = setInterval(function(){mostraMosquito()},tempoNivel())
document.body.style.cursor = 'url(../imagens/mata_mosca.png)'


/***************************** Game Audios  *****************************/
const esmagando = new Audio('../audio/Efeito esmagando.mp3')
/***************************************************************************/
/***************************  Background Image *****************************/
document.body.style.background = 'url(../imagens/bg.jpg) no-repeat left top  '
document.body.style.backgroundSize = 'cover'
/***************************************************************************/
function tempoNivel() {
    
    switch (nivel) {
        case 'normal':
            return 1500;
        case 'dificil':
            return 1000;
        break;
        case 'hard':
            return 500;
            
    }
}
/****************  Grab User's Screen Size *******************************/
    function ajustatamanho(){
        largura = window.innerWidth
        altura = window.innerHeight
    }
    document.body.onresize = () => ajustatamanho();
    ajustatamanho()
/******************************************************************************* */

/***************** Configuring the Random Appearance of the Mosquito  *****************/
    
    function aparicaoaleatoriaMosquito(){
        posicaox =  Math.floor(Math.random() * largura);
        posicaoy =  Math.floor(Math.random() * altura);

        if(posicaoy <= 50){
            posicaoy+= 90
        // console.log('adicionei 90 posicaoy')

        }else if(altura <= (posicaoy+100)){
            posicaoy-= 90
            //console.log('tirei 90 posicaoy')
            
        }
        if(posicaox <= 50){
            posicaox+= 90
        }else if(largura <= (posicaox+90)){
            posicaox-= 100
        }
    }
    
/************************************************************************** */

/***************** Mosquito size settings ranging from 30px to 100px  *****************/
    function tamanhoMosquito() {
        var classe = 0;
        while (classe < 30){
            classe = Math.floor(Math.random() * 100)
        }
        return classe + 'px'
    }
/***********************************************************************************/
/*********************** Game Time Setting  ***************************/
    function tempoRestante(){
        x =  setInterval(function(){hora()},1000)
        
        function hora(){
            if((50 -x) == 0){
                clearInterval(x)
                clearInterval(criamosquito)
                window.location.href = '../html/vitoria.HTML'
            }else{
                document.getElementById('tempo').innerText =`Tempo restante: ${50 - x}`
            }
        }
    }
/***********************************************************************************/
/************************** Function that sends to Game Over ***************************S */
function enviarParaGameOver(){
    window.location.href = '../html/GameOver.html'
}
/******************************************************************************************* */
    function mostraMosquito(){
        tempoRestante()
        /* Checks for other mosquitoes/ removes life */
            if(document.getElementById('misquitos')){
                document.getElementById('misquitos').remove()
            
                if(vida > 3){
                    enviarParaGameOver()
                }else{  
                    document.getElementById('v' + vida).src = '../imagens/coracao_vazio.png'
                }
                vida++            
            }
        /*********************************************************************************** */    
        /********************** Define the mosquito side ***********************************/
            function ladoDomosquito(){
                var classe = Math.floor(Math.random()* 2)
                switch(classe) {
                    case 1:
                        
                        return mosquito.style.transform = 'scaleX(1)'
                    case 0: 
                        return mosquito.style.transform = 'scaleX(-1)'
                }
            }
        /**************************************************************************************** */

        /*************************** Show mosquitoes on screen  ******************************/  
        var mosquito = document.createElement('img');
        mosquito.src = '../imagens/mosca.png'
        mosquito.style.width = tamanhoMosquito();
        mosquito.style.position = 'absolute'
        document.body.appendChild(mosquito)
        ajustatamanho()
        ladoDomosquito()
        aparicaoaleatoriaMosquito()
        mosquito.style.width = tamanhoMosquito();
        mosquito.style.left = posicaox + 'px'
        mosquito.style.top = posicaoy + 'px'
        mosquito.id = 'misquitos'
        mosquito.onclick = function(){ 
            this.remove()  
            esmagando.play();
        }
        /**************************************************************************************** */
    }

/********************************************************************/