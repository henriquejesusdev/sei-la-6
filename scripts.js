const API_URL =
  "https://crudcrud.com/api/52889c7da4254acaa23613122aff83fa/clientes";

// Função para cadastrar cliente
async function createClient(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const client = {
    name: name,
    email: email,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    document.getElementById("clientForm").reset();
    fetchClients();
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    alert("Erro ao cadastrar cliente. Veja o console para detalhes.");
  }
}

// Função para listar clientes
async function fetchClients() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const clients = await response.json();

    const clientList = document.getElementById("clientList");
    clientList.innerHTML = "";

    clients.forEach((client) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${client.name} - ${client.email}
                <button onclick="deleteClient('${client._id}')">Excluir</button>
            `;
      clientList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
  }
}

// Função para excluir cliente
async function deleteClient(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    fetchClients();
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
}

// Event Listeners
document.getElementById("clientForm").addEventListener("submit", createClient);

// Carregar clientes ao iniciar
window.onload = fetchClients;
