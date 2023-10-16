// VARIÁVEIS => Um espaço da memória do computador que guardamos algo (um numero, uma letra, um texto, uma imagem)
// FUNÇÃO => Um trecho de código que só é executado quando é chamado

let chave = "cebcd482eda57fa9a6714c1c2ba91885"


function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
}

async function buscarCidade(cidade, data) {
    let dados = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`)
        .then(resposta => resposta.json());

    // Encontre o índice da previsão para a data selecionada
    const previsaoData = dados.list.find(item => item.dt_txt.includes(data));

    if (previsaoData) {
        document.querySelector('.cidade').innerHTML = 'Tempo em ' + cidade;
        document.querySelector('.temp').innerHTML = Math.floor(previsaoData.main.temp) + '°C';
        document.querySelector('.descricao').innerHTML = previsaoData.weather[0].description;
        document.querySelector('.umidade').innerHTML = 'Umidade: ' + previsaoData.main.humidity + '%';
        document.querySelector('.icone').src = 'https://openweathermap.org/img/wn/' + previsaoData.weather[0].icon + '.png';
    } else {
        alert('Não há previsão disponível para a data selecionada.');
    }
}


async function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value;
    let dataSelecionada = document.querySelector("#input-data").value;
  
    // Verificar se a data selecionada está dentro do limite de 7 dias a partir da data atual
    let dataAtual = new Date();
    let dataLimite = new Date();
    dataLimite.setDate(dataAtual.getDate() + 7);
  
    if (new Date(dataSelecionada) > dataLimite) {
      alert("Data selecionada está muito no futuro. Máximo de 7 dias a partir de hoje.");
      return;
    }
  
    // Continuar com a busca de previsão se a data estiver dentro do limite
    let dados = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&appid=" +
        chave +
        "&lang=pt_br" +
        "&units=metric"
    )
      .then((resposta) => resposta.json());
  
    colocarNaTela(dados);
  }

function preencherDataAtual() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // +1 porque os meses são base 0
    const dia = dataAtual.getDate().toString().padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;
    document.getElementById('input-data').value = dataFormatada;
}
