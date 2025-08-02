// Textos da IA (exemplo)
const tituloIA = "A influência da tecnologia no comportamento humano";
const redacaoIA = `
A tecnologia, ao longo dos anos, transformou radicalmente o modo como os seres humanos se relacionam, trabalham e aprendem...

[continua a redação aqui]
`;

// Função para preencher campo e disparar evento
function preencherCampo(campo, texto) {
  campo.value = texto;
  campo.dispatchEvent(new Event('input', { bubbles: true }));
}

// Seleciona todos os textareas com a classe da redação
const textareas = document.querySelectorAll('textarea.MuiInputBase-inputMultiline');

// Define qual é o título (altura menor) e a redação (altura maior)
let campoTitulo = null;
let campoRedacao = null;

textareas.forEach((textarea) => {
  const altura = parseFloat(textarea.style.height);
  if (altura < 100 && !campoTitulo) {
    campoTitulo = textarea;
  } else if (altura >= 100 && !campoRedacao) {
    campoRedacao = textarea;
  }
});

// Preenche os campos, se encontrados
if (campoTitulo && campoRedacao) {
  preencherCampo(campoTitulo, tituloIA);
  preencherCampo(campoRedacao, redacaoIA);
} else {
  alert("Não foi possível localizar os campos corretamente.");
}