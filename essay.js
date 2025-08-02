const tituloIA = "O impacto da inteligência artificial na sociedade moderna";
const redacaoIA = `
A inteligência artificial (IA) tem transformado diversos setores da sociedade contemporânea, como saúde, educação e segurança...

[continuação da redação gerada por IA]
`;

function preencherCampo(campo, texto) {
  campo.value = texto;
  campo.dispatchEvent(new Event('input', { bubbles: true }));
}

const textareas = document.querySelectorAll('textarea.MuiInputBase-inputMultiline');

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

if (campoTitulo && campoRedacao) {
  preencherCampo(campoTitulo, tituloIA);
  preencherCampo(campoRedacao, redacaoIA);
  alert("✅ Redação colada com sucesso!");
  console.log("Preenchido com sucesso.");
} else {
  alert("❌ Não foi possível localizar os campos.");
  console.error("Erro: Campos não encontrados.");
}