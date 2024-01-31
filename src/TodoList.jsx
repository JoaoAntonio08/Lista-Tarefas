import React, { useState, useEffect } from "react";
import "./Todolist.css";
import Icone from "./assets/Icon.png";

// config banco de dados
const firebaseConfig = {
  apiKey: "AIzaSyCgdT5F1cq-vHgChjd5IWC9j3AIBMPIQCE",
  authDomain: "projeto2-a9b48.firebaseapp.com",
  projectId: "projeto2-a9b48",
  storageBucket: "projeto2-a9b48.appspot.com",
  messagingSenderId: "559849711245",
  appId: "1:559849711245:web:136350ae6a1d34f5d2e4c4",
  measurementId: "G-CJ2VDFPFS0",
};

function TodoList() {
  const listaStorage = localStorage.getItem("Lista");

  const [lista, setLista] = useState(
    listaStorage ? JSON.parse(listaStorage) : []
  );
  const [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem) {
      return;
    }
    setLista([...lista, { text: novoItem, isComplite: false }]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }

  function clicou(index) {
    const listaAux = [...lista];
    listaAux[index].isComplite = !listaAux[index].isComplite;
    setLista(listaAux);
  }

  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }

  function delTudo() {
    setLista([]);
  }
  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          type="text"
          value={novoItem}
          onChange={(e) => {
            setNovoItem(e.target.value);
          }}
          placeholder="Adicone uma tarefa"
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>
      <div className="listaTarefas">
        <div style={{ textAlign: "center" }}>
          {lista.length < 1 ? (
            //verdadeiro
            <img className="icone-central" src={Icone} />
          ) : (
            //falso
            lista.map((item, index) => (
              <div
                key={index} //basicamente para o programa saber a diferença do item não concluido e do concluido
                className={item.isComplite ? "item completo" : "item"}
              >
                <span
                  onClick={() => {
                    clicou(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    deleta(index);
                  }}
                  className="del"
                >
                  Deletar
                </button>
              </div>
            ))
          )}
          {lista.length > 0 && (
            <button
              onClick={() => {
                delTudo();
              }}
              className="delAll"
            >
              Deletar Todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

// para verificar se é verdadeirou ou falso usa "? para verdadeiro e : para falso"
// caso só para verificar se é verdadeiro usa o &&
