let usuario = {};


function entrarNaSala() {

    let nomeUsuario = prompt("Qual seu lindo nome?");

    usuario = {
                name: nomeUsuario 
            }

    let promessaUsuario = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario);
    promessaUsuario.then(enviarRequsicaoDeMensagens);
    promessaUsuario.catch(trataErroLogin);

} entrarNaSala();


const usuarioPresente = setInterval(manterConexao, 5000);
const intervaloAtualizarMensagens = setInterval(enviarRequsicaoDeMensagens, 3000);


function trataErroLogin () {

    alert("Este nome já está em uso. Tente Novamente.");
    entrarNaSala();

}


function manterConexao () {

    const promessaEnviarStatus = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario);
    promessaEnviarStatus.catch(desconectado);

}


function desconectado () {

    alert("Você foi desconectado. Entre novamente.");
    entrarNaSala();

}


function enviarRequsicaoDeMensagens (response) {

    let promessaMensagens = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessaMensagens.then(carregarMensagens);

} 


function carregarMensagens(resposta) {

    imprimirMensagens(resposta.data);

}


function imprimirMensagens(todasMensagens) {

    const ulMensagem = document.querySelector(".historicoDeMensagens");
    ulMensagem.innerHTML = "";

    for (let i = 0; i < todasMensagens.length; i++){

        if( todasMensagens[i].type === 'status') {
            if (i === todasMensagens.length - 1) {
                ulMensagem.innerHTML += `<li class="mensagem mensagemStatus ultimaMensagem">
                                                <span class="horario">  (${todasMensagens[i].time})   </span> 
                                                <span> <strong>  ${todasMensagens[i].from}  </strong> </span> 
                                                <span> ${todasMensagens[i].text} </span> 
                                            </li>
                                            `;

            } else {
                ulMensagem.innerHTML += `<li class="mensagem mensagemStatus">
                                                <span class="horario">  (${todasMensagens[i].time})   </span> 
                                                <span> <strong>  ${todasMensagens[i].from}  </strong> </span> 
                                                <span> ${todasMensagens[i].text} </span> 
                                            </li>
                                            `;
            }                       
        } 
        
        if (todasMensagens[i].type === 'message') {
            if (i === todasMensagens.length - 1) {
                ulMensagem.innerHTML += `<li class="mensagem mensagemNormal ultimaMensagem">
                                                <span class="horario"> (${todasMensagens[i].time}) </span> 
                                                <span> <strong> ${todasMensagens[i].from} </strong> </span> 
                                                <span> para </span>
                                                <span> <strong>${todasMensagens[i].to} </strong> </span>
                                                <span> ${todasMensagens[i].text} </span>
                                            </li>
                                            `;
            } else {
                ulMensagem.innerHTML += `<li class="mensagem mensagemNormal ">
                                                <span class="horario"> (${todasMensagens[i].time}) </span> 
                                                <span> <strong> ${todasMensagens[i].from} </strong> </span> 
                                                <span> para </span>
                                                <span> <strong>${todasMensagens[i].to} </strong> </span>
                                                <span> ${todasMensagens[i].text} </span>
                                            </li>
                                            `;
            }
        } 
        
        if(todasMensagens[i].type === 'private_message') {
            if (i === todasMensagens.length - 1) {
                ulMensagem.innerHTML += `<li class="mensagem mensagemPrivada ultimaMensagem">
                                                <span class="horario"> (${todasMensagens[i].time}) </span> 
                                                <span> <strong> ${todasMensagens[i].from} </strong> </span> 
                                                <span> para </span>
                                                <span> <strong>${todasMensagens[i].to} </strong> </span>
                                                <span> ${todasMensagens[i].text} </span>
                                            </li>
                                            `;
            } else {
                ulMensagem.innerHTML += `<li class="mensagem mensagemPrivada">
                                                <span class="horario"> (${todasMensagens[i].time}) </span> 
                                                <span> <strong> ${todasMensagens[i].from} </strong> </span> 
                                                <span> para </span>
                                                <span> <strong>${todasMensagens[i].to} </strong> </span>
                                                <span> ${todasMensagens[i].text} </span>
                                            </li>
                                            `;
            }
        }
    }


const irParaUltimaMensagem = document.querySelector(".ultimaMensagem");
irParaUltimaMensagem.scrollIntoView();

}



                                    