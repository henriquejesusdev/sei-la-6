import { Client, ClientAPI } from "./classe.js";
import { renderClientList, showError, clearForm } from "./utils.js";

const API_URL =
  "https://crudcrud.com/api/f8ace67a3ea247b1ad022ca81259b962/cliente";
const clientAPI = new ClientAPI(API_URL);

const init = () => {
  const form = document.getElementById("clientForm");
  const clientList = document.getElementById("clientList");

  const fetchAndRenderClients = async () => {
    try {
      const clients = await clientAPI.fetchAll();
      renderClientList(clients, clientList, handleDelete);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      showError("Erro ao carregar clientes");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    try {
      Client.validate({ name, email });
      const client = new Client(name, email);
      await clientAPI.create(client);
      clearForm(form);
      fetchAndRenderClients();
    } catch (error) {
      showError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await clientAPI.delete(id);
      fetchAndRenderClients();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      showError("Erro ao excluir cliente");
    }
  };

  form.addEventListener("submit", handleSubmit);
  fetchAndRenderClients();
};

window.addEventListener("load", init);
