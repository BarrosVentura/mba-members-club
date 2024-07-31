import { updateDom } from "./updateDom.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-search]");
  const input = form.querySelector("input");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/clients?id=${input.value}`
      );
      const data = await response.json();

      if (data.length == 0) {
        alert("usuário não existe");
        input.value = "";
      }

      const userContent = data[0];

      if (userContent.cutsRemaining == 0) {
        alert("Parabéns! Seu próximo corte é gratuito!");
      }

      updateDom(userContent);
    } catch (e) {
      console.log("Erro na busca por ID", e);
    }
  });
});
