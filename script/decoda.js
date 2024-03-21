function inicializar() {
    let resultado = document.querySelector('.resultado');
    let textoInicial = document.querySelector('textarea');
    let btn_criptografar = document.querySelector('.btn_criptografar');
    let btn_descriptografar = document.querySelector('.btn_descriptografar');
    let btn_copiar = document.querySelector('.btnCopiar');
    
    // resultado.style.display = 'none';
    textoInicial.value = '';
    textoInicial.focus();
    btn_criptografar.disabled = true;
    btn_descriptografar.disabled = true;

    textoInicial.addEventListener("input", function (event) {
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var textoAtual = this.value;
        var textoSemAcentos = removerAcentos(textoAtual);
        var textoConvertido = textoSemAcentos.toLowerCase();
        this.value = removerCaracteresEspeciais(textoConvertido);
        this.value = removerNumeros(this.value);
        this.setSelectionRange(start, end);

        // Oculta o resultado sempre que houver modificação no textarea
        // resultado.style.display = 'none'; 

        if (textoAtual.trim().length > 0) {
            btn_criptografar.disabled = false;
            btn_descriptografar.disabled = false;
        } else {
            btn_criptografar.disabled = true;
            btn_descriptografar.disabled = true;
        }
    });


    textoInicial.addEventListener("keypress", function(event) {
        const charCode = event.charCode;
    
        // Verifica se o código do caractere digitado está na faixa de códigos de números
        if (charCode >= 48 && charCode <= 57) {
            event.preventDefault();
        }
    });

    btn_criptografar.addEventListener("click", function (event) {
        // document.querySelector('.resultado__titulo').innerHTML = "Texto Criptografado";
        mostrarResultado(criptografar(textoInicial.value));
    });

    btn_descriptografar.addEventListener("click", function (event) {
        // document.querySelector('.resultado__titulo').innerHTML = "Texto Descriptografado";
        mostrarResultado(descriptografar(textoInicial.value));
    });

    btn_copiar.addEventListener("click", function (event) {
        copiarTexto();
    });

}


function mostrarResultado(texto) {
    // let resultado = document.querySelector('.resultado');
    let textoCriptografado = document.querySelector('.resultado__textoCriptografado');
    let btnCopiar = document.querySelector('.btnCopiar');

    textoCriptografado.innerHTML = texto;
    // resultado.style.display = 'block';

    btnCopiar.addEventListener("mouseover", function() {
        const textoCopiar = textoCriptografado.textContent;
        const maxCaracteres = 12;
        if (textoCopiar.length <= maxCaracteres) {
            this.textContent = textoCopiar;
            return;
        }
        const primeirosCaracteres = textoCopiar.substring(0, maxCaracteres);
        this.textContent = primeirosCaracteres + '...';
    });

    btnCopiar.addEventListener("mouseout", function() {
        this.textContent = "Copiar";
    });

    btnCopiar.addEventListener("click", function() {
        copiarTexto();
    });

}

function copiarTexto(texto) {
    let textoCriptografado = document.querySelector('.resultado__textoCriptografado');
    navigator.clipboard.writeText(textoCriptografado.innerHTML)
        .then(() => {
            console.log('Texto copiado com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao copiar texto:', err);
        });
}

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function removerNumeros(texto) {
    return texto.replace(/[0-9]/g, '');
}

function removerCaracteresEspeciais(texto) {
    return texto.replace(/[^\w\s,.!?-]/g, '');
}

function criptografar(texto) {
    return texto.replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

function descriptografar(texto) {
    return texto.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

inicializar();
