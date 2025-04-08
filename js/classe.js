export class Client {
  constructor(name, email, id = null) {
    this.name = name;
    this.email = email;
    this._id = id;
  }

  static validate({ name, email }) {
    if (!name || name.trim() === "") throw new Error("Nome é obrigatório");
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      throw new Error("Email inválido");
    return true;
  }
}

export class ClientAPI {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async create(client) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: client.name, email: client.email }),
    });
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    return response.json();
  }

  async fetchAll() {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    return response.json();
  }

  async delete(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`Erro ${response.status}`);
  }
}
