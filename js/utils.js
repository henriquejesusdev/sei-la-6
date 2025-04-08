export const renderClientList = (clients, container, onDelete) => {
  container.innerHTML = clients
    .map(
      (client) => `
          <li data-id="${client._id}">
            ${client.name} - ${client.email}
            <button class="delete-btn">Excluir</button>
          </li>`
    )
    .join("");

  container
    .querySelectorAll(".delete-btn")
    .forEach((btn, index) =>
      btn.addEventListener("click", () => onDelete(clients[index]._id))
    );
};

export const showError = (message) => {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 3000);
};

export const clearForm = (form) => form.reset();
