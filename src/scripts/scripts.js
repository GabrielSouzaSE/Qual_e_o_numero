const apiUrl = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300';

function myPromise() {
    return fetch(apiUrl)
        .then((data) => data.json())
        .catch((err) => console.log(`ERROR 01: ${err}`));
}

async function myRequisition() {
    try {
        const RequisitionData = await myPromise();

        RequisitionData.value ? RequisitionData.value : statusErro(RequisitionData.value);

        console.log(RequisitionData.value);

        function fillZero(string, length) {
            for (let i = 0, l = length - string.length; i < l; i++) {
                string = '0' + string;
            }
            return string;
        };

        divination.oninput = function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            this.value.length > 3 ? this.value = this.value.slice(0, 3) : console.log(this.value);

            // this.value = Math.abs(this.value);

            // if (this.value.length > 3) {
            //     this.value = this.value.slice(0, 3);
            // }
        };

        document.body.querySelector('#divination').addEventListener('input', function () {
            let enableButton = document.getElementById('enviar');

            enableButton.disabled = this.value.length >= 1 ? false : true;

        });

        //         <input id="myInput" value="Some text..">
        // <button id="myBtn" onclick="javascript:alert('Hello World!')">Button</button>

        // var input = document.getElementById("myInput");
        document.body.querySelector('#divination').addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("enviar").click();
            }
        });

        document.getElementById('enviar').addEventListener("click", function (evento) {
            evento.preventDefault();

            const divination = document.querySelector('#divination');

            const valor = fillZero(divination.value);

            let formaNumero = 'conteudo-principal-display display-num-';

            document.getElementById('display-1').className = formaNumero + valor[0];
            document.getElementById('display-2').className = formaNumero + valor[1];
            document.getElementById('display-3').className = formaNumero + valor[2];

            if (valor.length == 1) {
                document.getElementById('display-2').style.display = 'none';
                document.getElementById('display-3').style.display = 'none';
            } else if (valor.length == 2) {
                document.getElementById('display-2').style.display = 'block';
                document.getElementById('display-3').style.display = 'none';
            } else {
                document.getElementById('display-2').style.display = 'block';
                document.getElementById('display-3').style.display = 'block';
            }

            if (RequisitionData.value > valor) {
                document.getElementById('resultado').style.visibility = 'visible';
                resultado.innerHTML = 'É maior';
            } else if (RequisitionData.value < valor) {
                document.getElementById('resultado').style.visibility = 'visible';
                resultado.innerText = 'É menor';
            } else {
                resultado.innerHTML = '<span style="color:#32BF00">Você acertou!!!!</span>';
                changeColor('Green');
                disableInput();
            }
        });

        function statusErro(statusValue) {
            if (statusValue === undefined) {

                console.log(typeof (statusValue))

                resultado.innerHTML = '<span style="color:#CC3300">ERRO</span>';

                changeColor('Red');

                const valor = '502';
                let baseClass = 'conteudo-principal-display display-num-';

                document.getElementById('display-1').className = baseClass + valor[0];
                document.getElementById('display-2').className = baseClass + valor[1];
                document.getElementById('display-3').className = baseClass + valor[2];

                document.getElementById('display-2').style.display = 'block';
                document.getElementById('display-3').style.display = 'block';

                disableInput();
            }
        }

        function disableInput() {
            document.getElementById('nova-partida').style.visibility = 'visible';
            document.getElementById('resultado').style.visibility = 'visible';

            divination.disabled = true;
            enviar.disabled = true;

            enviar.style.cssText =
                'background-color: #DDDDDD;' +
                'border: 1px solid #DDDDDD;';
            divination.style.cssText =
                'background-color: #F5F5F5;' +
                'border: 1px solid #DDDDDD;';

            document.getElementById('nova-partida').addEventListener('click', function () {
                location.reload();
            });
        }

        function changeColor(change) {
            if (change === 'Green') {
                for (let i = 1; i <= 3; i++) {
                    document.getElementById('display-' + i).getElementsByClassName('segmento-a')[0].style.borderTop = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-d')[0].style.borderBottom = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-g')[0].style.borderBottom = '11px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-reflexo')[0].style.borderTop = '11px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-b')[0].style.borderRight = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-c')[0].style.borderRight = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-e')[0].style.borderLeft = '15px solid #32BF00';
                    document.getElementById('display-' + i).getElementsByClassName('segmento-f')[0].style.borderLeft = '15px solid #32BF00';
                }
            } else if (change === 'Red') {
                for (let i = 1; i <= 3; i++) {
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
        }

    } catch (err) {
        console.log(`ERROR 02: ${err}`)
    }
}

myRequisition();