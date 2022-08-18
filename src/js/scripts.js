/*
Olá, vou informar para você que esta lendo o código sobre o que o código
esta realizando.
*/

const apiUrl = "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300"

function myPromise() {
    return fetch(apiUrl)
        .then((data) => data.json())
        .catch((error) => console.log(`Erro 1: ${error}`))
}


async function myRequsicao() {
    try {
        const dataRequisicao = await myPromise();

        // console.log(dataRequisicao);

        let display1 = document.getElementById('display-1');
        let display2 = document.getElementById('display-2');
        let display3 = document.getElementById('display-3');
        let numeroRequisicao = dataRequisicao.value;

        // console.log(typeof (numeroRequisicao))
        // console.log(numeroRequisicao);
        numeroRequisicao ? numeroRequisicao : statusErro(502);
        /*
        Aqui em preencheZero, Loop para reconhecer o que o usuário digitou e retornar 
        uma string para ser usada posteriormente para formar os números em 7 segmentos.
        */
        function preencheZero(string, length) {
            for (let i = 0, l = length - string.length; i < l; i++) {
                string = '0' + string;
            }
            return string;
        };
        /*
        Aqui, não ter a possibilidade de enviar números negativos e limitar o input 
        de até 3 dígitos.
        */
        palpite.oninput = function () {
            this.value = Math.abs(this.value);

            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3);
            }
        };

        // Para evitar que o usuário envie entrada com um campo vazio.
        await document.body.querySelector('#palpite').addEventListener('input', function () {

            var habilitaBotao = document.getElementById('enviar');

            habilitaBotao.disabled = this.value.length >= 1 ? false : true;

        });

        /*
        No evento ao clicar o botão "enviar", nesse evento se encontra a função 
        "preencheZero()" recebendo o input do usuário para o preenchimento do 
        segmentos da linha 59 a 73, desbloqueando dos restantes dos displays, 
        caso seja introduzido mais de 1 digito, e a estrutura de seleção para 
        verificar o número que o usuário enviou está correto ou se é maior ou menor.
        */

        // Original input do usuário

        document.getElementById('enviar').addEventListener("click", function (evento) {
            evento.preventDefault();

            const palpite = document.querySelector('#palpite');

            const valor = preencheZero(palpite.value);

            let formaNumero = 'conteudo-principal-display display-num-';

            display1.className = formaNumero + valor[0];
            display2.className = formaNumero + valor[1];
            display3.className = formaNumero + valor[2];

            // Mostra ou ocultar segmento

            if (valor.length == 1) {
                document.getElementById('display-2').style.display = 'none';
                document.getElementById('display-3').style.display = 'none';
            } else if (valor.length == 2) {
                document.getElementById('display-2').style.display = 'block';
                document.getElementById('display-3').style.display = 'none';
            } else {
                document.getElementById('display-2').style.display = 'block';
                document.getElementById('display-3').style.display = 'block';
            };

            // Resultado do palpite
            if (numeroRequisicao > valor) {
                document.getElementById('resultado').style.visibility = 'visible';
                resultado.innerHTML = 'É maior';
            } else if (numeroRequisicao < valor) {
                document.getElementById('resultado').style.visibility = 'visible';
                resultado.innerText = 'É menor';
            } else {
                resultado.innerHTML = '<span style="color:#32BF00">Você acertou!!!!</span>';
                alteraCor('Verde');
                desabilitaInput();
            };

        });

        /*
        //Teste para o Botão Enter fisico

        document.addEventListener("keypress", function (evento) {

            if (evento.key === "Enter") {
                evento.preventDefault();
                enviar.click();

                const palpite = document.querySelector('#palpite');

                const valor = preencheZero(palpite.value);

                let formaNumero = 'conteudo-principal-display display-num-';

                display1.className = formaNumero + valor[0];
                display2.className = formaNumero + valor[1];
                display3.className = formaNumero + valor[2];

                // Mostra ou ocultar segmento

                if (valor.length == 1) {
                    document.getElementById('display-2').style.display = 'none';
                    document.getElementById('display-3').style.display = 'none';
                } else if (valor.length == 2) {
                    document.getElementById('display-2').style.display = 'block';
                    document.getElementById('display-3').style.display = 'none';
                } else {
                    document.getElementById('display-2').style.display = 'block';
                    document.getElementById('display-3').style.display = 'block';
                };

                // Resultado do palpite
                if (numeroRequisicao > valor) {
                    document.getElementById('resultado').style.visibility = 'visible';
                    resultado.innerHTML = 'É maior';
                } else if (numeroRequisicao < valor) {
                    document.getElementById('resultado').style.visibility = 'visible';
                    resultado.innerText = 'É menor';
                } else {
                    resultado.innerHTML = '<span style="color:#32BF00">Você acertou!!!!</span>';
                    alteraCor('Verde');
                    desabilitaInput();
                };
            }

        });
        */

        /* 
        Função caso ocorra o erro de solicitação. será verificado em localStorge o 
        número da variável statusCode, se o valor for "502" a função que será atribuída
        aos LEDs no formato 502, liberando o display para visualização e forçando o 
        usuário a reinicializar através do votão "nova partida".
        */

        function statusErro(statusValue) {
            console.log(`Entrou na função 'statusErro': ${statusValue}`);
            if (statusValue) {

                resultado.innerHTML = '<span style="color:#CC3300">ERRO</span>';
                alteraCor('Vermelho');

                let valor = '502';
                let baseClass = 'conteudo-principal-display display-num-';

                display1.className = baseClass + valor[0];
                display2.className = baseClass + valor[1];
                display3.className = baseClass + valor[2];

                document.getElementById('display-2').style.display = 'block';
                document.getElementById('display-3').style.display = 'block';

                desabilitaInput();
            }
        };
        /*
        Esta função de "desabilitaInput" (desabilitar a entrada), foi usada conforme 
        solicitado no documento, quando o erro de solicitação ocorrer ou o usuário 
        acertar. A função irá habilitar o resultado e o botão para "nova partida" 
        do jogo, bloqueando a entrada do usuário e mudando a cor para que o usuário 
        veja que não tem mais acesso à entrada.
        */
        function desabilitaInput() {

            document.getElementById('nova-partida').style.visibility = 'visible';
            document.getElementById('resultado').style.visibility = 'visible';

            palpite.disabled = true;
            enviar.disabled = true;

            enviar.style.cssText =
                'background-color: #DDDDDD;' +
                'border: 1px solid #DDDDDD;';
            palpite.style.cssText =
                'background-color: #F5F5F5;' +
                'border: 1px solid #DDDDDD;';

            // Reiniciar
            document.getElementById('nova-partida').addEventListener('click', function () {
                location.reload();
            });
        };

        /*
        A função alteraCor substituirá o CSS das cores da borda caso o usuário 
        ganhe(cor verde) ou a requisição falhe(cor vermelho). Mudança de cor 
        passa por uma estrutura repetição para substituir a cor em cada display.
        */
        function alteraCor(alterar) {

            if (alterar === 'Verde') {
                for (var i = 1; i <= 3; i++) {
                    document.getElementById('display-' + i).getElementsByClassName('segmento-a')[0].style.borderTop = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-d')[0].style.borderBottom = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-g')[0].style.borderBottom = '11px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-reflexo')[0].style.borderTop = '11px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-b')[0].style.borderRight = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-c')[0].style.borderRight = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-e')[0].style.borderLeft = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-f')[0].style.borderLeft = '15px solid #32BF00';
                }
            } else if (alterar === 'Vermelho') {
                for (var i = 1; i <= 3; i++) {
                    document.getElementById('display-' + i).getElementsByClassName('segmento-a')[0].style.borderTop = '15px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-d')[0].style.borderBottom = '15px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-g')[0].style.borderBottom = '11px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-reflexo')[0].style.borderTop = '11px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-b')[0].style.borderRight = '15px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-c')[0].style.borderRight = '15px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-e')[0].style.borderLeft = '15px solid #CC3300';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-f')[0].style.borderLeft = '15px solid #CC3300';
                }
            }
        };
        //se acontece um erro
    } catch (error) {
        console.log(`Erro 2: ${error}`);
    }
}

myRequsicao();