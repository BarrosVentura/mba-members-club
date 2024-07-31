const username = document.querySelector("[data-username]");
const userRegistered = document.querySelector("[data-user-registered]");
const userId = document.querySelector("[data-user-id]");
const userHistory = document.querySelector("[data-history-list]");
const userHistoryTotal = document.querySelector("[data-history-total]");
const userStatus = document.querySelector("[data-status-remaining]");
const userStatusProgress = document.querySelector("[data-status-progress]");
const userStatusTotal = document.querySelector("[data-status-total]");
const userFidelityMarks = document.querySelector("[data-fidelity-marks]");

export function updateDom(user) {
  username.innerText = user.name;
  userRegistered.innerText = `Cliente desde ${user.clientSince}`;
  userId.innerText = `ID: ${user.id}`;
  userHistory.innerHTML = user.appointmentHistory
    .map(
      (app) => `
    <li class="history-item">
      <div class="history-item__dates">
        <p class="history-item__date">${app.date}</p>
        <p class="history-item__time">${app.time}</p>
      </div>
      <div class="history-item__check">
        <img src="./assets/checkmark-small.svg" alt="" />
      </div>
    </li>
    `
    )
    .join("");
  userHistoryTotal.innerText = `${user.appointmentHistory.length} cortes`;

  const fidelity = Array(user.loyaltyCard.cutsNeeded)
    .fill("marked", 0, user.loyaltyCard.totalCuts)
    .fill("not", user.loyaltyCard.totalCuts, user.loyaltyCard.cutsNeeded);

  userFidelityMarks.innerHTML = fidelity
    .map((item, index) => {
      if (index == fidelity.length - 1 && item != "marked") {
        return `<div><img src="./assets/gift-base.svg" alt="" /></div>`;
      }

      if (item == "marked") {
        return `<div><img src="./assets/checkmark-big.svg" alt="" /></div>`;
      }
      console.log("cai aqui");

      return `<div></div>`;
    })
    .join("");

  userStatus.innerText = user.loyaltyCard.cutsRemaining;
  userStatusProgress.style = `--completed: ${user.loyaltyCard.totalCuts}0%`;
  userStatusTotal.innerText = `${user.loyaltyCard.totalCuts} de ${user.loyaltyCard.cutsNeeded}`;
}
