import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// CONFIGURAÇÃO
const firebaseConfig = {
  apiKey: "AIzaSyDd4xSPwrAsAbNJV7VGL_uHWf5t8AklcVs",
  authDomain: "e-commerce01-f7980.firebaseapp.com",
  projectId: "e-commerce01-f7980",
  storageBucket: "e-commerce01-f7980.firebasestorage.app",
  messagingSenderId: "143449669663",
  appId: "1:143449669663:web:e6d6064317e09d89ce552a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// CAMPOS DE CADASTRO
const cpf = document.getElementById('cpf');
const cliente = document.getElementById('cliente');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const cadastrarCliente = document.getElementById('cadastrarCliente');

// CAMPOS DE BUSCA/ATUALIZAÇÃO
const cpfBusca = document.getElementById('cpfBusca');
const nomeCliente = document.getElementById('nomeCliente');
const emailCliente = document.getElementById('emailCliente');
const telefoneCliente = document.getElementById('telefoneCliente');
const buscarCliente = document.getElementById('buscarCliente');
const atualizarCliente = document.getElementById('atualizarCliente');
const deletarCliente = document.getElementById('deletarCliente');

// FUNÇÃO: CADASTRAR
function CadastrarCliente() {
  set(ref(db, 'Cliente/' + cpf.value), {
    cpf: cpf.value,
    nome: cliente.value,
    email: email.value,
    telefone: telefone.value
  }).then(() => {
    alert("Cliente cadastrado!");
    cpf.value = '';
    cliente.value = '';
    email.value = '';
    telefone.value = '';
  }).catch((e) => {
    alert("Erro ao cadastrar!");
    console.error(e);
  });
}

// FUNÇÃO: BUSCAR
function BuscarCliente() {
  const dbRef = ref(db);
  get(child(dbRef, 'Cliente/' + cpfBusca.value)).then((snapshot) => {
    if (snapshot.exists()) {
      nomeCliente.value = snapshot.val().nome;
      emailCliente.value = snapshot.val().email;
      telefoneCliente.value = snapshot.val().telefone;
      alert("Cliente encontrado!");
    } else {
      alert("Cliente não encontrado.");
    }
  }).catch((e) => {
    alert("Erro na busca!");
    console.error(e);
  });
}

// FUNÇÃO: ATUALIZAR
function AtualizarCliente() {
  update(ref(db, 'Cliente/' + cpfBusca.value), {
    nome: nomeCliente.value,
    email: emailCliente.value,
    telefone: telefoneCliente.value
  }).then(() => {
    alert("Cliente atualizado!");
  }).catch((e) => {
    alert("Erro ao atualizar!");
    console.error(e);
  });
}

// FUNÇÃO: DELETAR
function DeletarCliente() {
  remove(ref(db, 'Cliente/' + cpfBusca.value)).then(() => {
    cpfBusca.value = '';
    nomeCliente.value = '';
    emailCliente.value = '';
    telefoneCliente.value = '';
    alert("Cliente deletado!");
  }).catch((e) => {
    alert("Erro ao deletar!");
    console.error(e);
  });
}

// EVENTOS
cadastrarCliente.addEventListener('click', CadastrarCliente);
buscarCliente.addEventListener('click', BuscarCliente);
atualizarCliente.addEventListener('click', AtualizarCliente);
deletarCliente.addEventListener('click', DeletarCliente);