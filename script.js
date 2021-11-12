let userName = prompt("Qual seu lindo nome?")


let promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promessa.then(carregarMensagens);

let ultimoElemento = [];

function carregarMensagens(resposta) {
    console.log(resposta.data);
    
    imprimirMensagens(resposta.data);
}

function imprimirMensagens(todasMensagens) {
    for (let i = 0; i < todasMensagens.length; i++){

        if( todasMensagens[i].type === 'status') {
            const ulMensagemStatus = document.querySelector(".historicoDeMensagens");
            ulMensagemStatus.innerHTML += `<li class="mensagem mensagemStatus">
                                            <span class="horario">  (${todasMensagens[i].time})   </span> 
                                            <span> <strong>  ${todasMensagens[i].from}  </strong> </span> 
                                            <span> ${todasMensagens[i].text} </span> 
                                            </li>
                                            `
        }
        
        if (todasMensagens[i].type === 'message') {
            const ulMensagemNormal = document.querySelector(".historicoDeMensagens");
            ulMensagemNormal.innerHTML += `<li class="mensagem mensagemNormal">
                                            <span class="horario"> (${todasMensagens[i].time}) </span> 
                                            <span> <strong> ${todasMensagens[i].from} </strong> </span> 
                                            <span> para </span>
                                            <span> <strong>${todasMensagens[i].to} </strong> </span>
                                            <span> ${todasMensagens[i].text} </span>
                                            </li>
                                            `
        }
        
        if(todasMensagens[i].type === 'private_message') {
            const ulMensagemPrivada = document.querySelector(".historicoDeMensagens");
            ulMensagemPrivada.innerHTML += `<li class="mensagem mensagemPrivada">
                                                <span class="horario"> (${todasMensagens[i].time}) </span> 
                                                <span> <strong> ${todasMensagens[i].from} </strong> </span> 
                                                <span> para </span>
                                                <span> <strong>${todasMensagens[i].to} </strong> </span>
                                                <span> ${todasMensagens[i].text} </span>
                                                </li>
                                                `        
            }  
    }
    
}


                                    