// IMPORTAÇÃO DO FIREBASE APP
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

// CONFIGURAÇÃO DO SEU PROJETO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDd4xSPwrAsAbNJV7VGL_uHWf5t8AklcVs",
    authDomain: "e-commerce01-f7980.firebaseapp.com",
    projectId: "e-commerce01-f7980",
    storageBucket: "e-commerce01-f7980.firebasestorage.app",
    messagingSenderId: "143449669663",
    appId: "1:143449669663:web:e6d6064317e09d89ce552a"
};

// INICIALIZAÇÃO DO FIREBASE
const app = initializeApp(firebaseConfig);

// IMPORTAÇÃO DO FIREBASE DATABASE
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const db = getDatabase();

// CAMPOS DE ENTRADAS DOS VALORES DO CADASTRO DE PRODUTOS
let codigo = document.getElementById('codigo');
let produto = document.getElementById('produto');
let categoria = document.getElementById('categoria');
let quantidade = document.getElementById('quantidade');
let valor = document.getElementById('valor');

// CAMPOS DE PESQUISA E ATUALIZAÇÃO DOS PRODUTOS
let idProduto = document.getElementById('idProduto');

// RESULTADOS DAS PESQUISAS
let dadoProduto = document.getElementById('dadoProduto');
let dadoCategoria = document.getElementById('dadoCategoria');
let dadoQuantidade = document.getElementById('dadoQuantidade');
let dadoValor = document.getElementById('dadoValor');

// BOTÕES DOS CAMPOS DE PESQUISA
let cadastrarProduto = document.getElementById('cadastrarProduto');
let buscarProduto = document.getElementById('buscarProduto');
let atualizarProduto = document.getElementById('atualizarProduto');
let deletarProduto = document.getElementById('deletarProduto');

// FUNÇÃO PARA ADICIONAR PRODUTO
function AddProduto() {
    set(ref(db, 'Produto/' + codigo.value), {
        codigo: codigo.value,
        produto: produto.value,
        categoria: categoria.value,
        quantidade: quantidade.value,
        valor: valor.value
    }).then(() => {
        codigo.value = '';
        produto.value = '';
        categoria.value = '';
        quantidade.value = '';
        valor.value = '';
        alert("Produto Cadastrado!");
    }).catch((error) => {
        console.log(error);
        alert('Produto Não Cadastrado!');
    });
}

// FUNÇÃO PARA PESQUISAR PRODUTO
function PesquisarProduto() {
    const dbRef = ref(db);
    get(child(dbRef, 'Produto/' + idProduto.value)).then((snapshot) => {
        if (snapshot.exists()) {
            dadoProduto.value = snapshot.val().produto;
            dadoCategoria.value = snapshot.val().categoria;
            dadoQuantidade.value = snapshot.val().quantidade;
            dadoValor.value = 'R$ ' + parseFloat(snapshot.val().valor).toFixed(2);
            alert('Produto Localizado!');
        } else {
            alert("O produto não existe");
        }
    }).then(() => {
        alert('Leitura Realizada!');
    }).catch((e) => {
        alert('Algo deu errado!');
        console.log(e);
    });
}

// FUNÇÃO PARA ATUALIZAR PRODUTO
function AtualizarProdutos() {
    update(ref(db, 'Produto/' + idProduto.value), {
        produto: dadoProduto.value,
        categoria: dadoCategoria.value,
        quantidade: dadoQuantidade.value,
        valor: dadoValor.value
    }).then(() => {
        alert('Produto Atualizado!');
    }).catch((e) => {
        alert('Algo deu errado!');
        console.log(e);
    });
}

// FUNÇÃO PARA DELETAR PRODUTO
function DeletarProdutos() {
    remove(ref(db, 'Produto/' + idProduto.value)).then(() => {
        idProduto.value = '';
        dadoProduto.value = '';
        dadoCategoria.value = '';
        dadoQuantidade.value = '';
        dadoValor.value = '';
        alert('Produto Deletado!');
    });
}

// EVENTOS DOS BOTÕES
cadastrarProduto.addEventListener('click', AddProduto);
buscarProduto.addEventListener('click', PesquisarProduto);
atualizarProduto.addEventListener('click', AtualizarProdutos);
deletarProduto.addEventListener('click', DeletarProdutos);