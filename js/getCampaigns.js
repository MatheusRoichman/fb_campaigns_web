const { DateTime } = luxon;

const statusLabels = {
  RUNNING: "Em execução",
  PAUSED: "Pausada",
  ENDED: "Finalizada",
};

const statusColors = {
  RUNNING: "text-success",
  PAUSED: "text-warning",
  ENDED: "text-danger",
};

const moneyMask = (value) => {
  if (!value) return 0;
  value = Number(value);
  let number;
  if (value % 1 !== 0)
    number = parseFloat(value.toFixed(2)).toFixed(2).toString();
  else number = value + '.00';

  number = number.replace(/\D/g, '');
  number = number.replace(/(\d{1})(\d{23})$/, '$1.$2');
  number = number.replace(/(\d{1})(\d{17})$/, '$1.$2');
  number = number.replace(/(\d{1})(\d{14})$/, '$1.$2');
  number = number.replace(/(\d{1})(\d{11})$/, '$1.$2');
  number = number.replace(/(\d{1})(\d{8})$/, '$1.$2');
  number = number.replace(/(\d{1})(\d{5})$/, '$1.$2');
  number = number.replace(/(\d{1})(\d{1,2})$/, '$1,$2');
  number = number
    .replace(/^(0*\.)*0+,/, '0,')
    .replace(/^(0+\.?)*([1-9],)/, '$2');

  return number;
};

const buildCard = (campaign) => {
  return `
    <li class="card col-12 p-3">
      <div class="d-flex justify-content-between">
        <h4 class="card-title">${campaign.name}</h4>
        <span class="text-secondary">
          ${DateTime.fromISO(
            campaign.startDate
          ).toLocaleString()} - ${DateTime.fromISO(
            campaign.endDate
          ).toLocaleString()}
        </span>
      </div>
      <div class="d-flex justify-content-between">
        <p class="card-text">${campaign.description}</p>
        <span class="fw-bold ${statusColors[campaign.status]}">
          ${statusLabels[campaign.status]}
        </span>
      </div>
      <p class="card-text">Orçamento: <span class="fw-bold">R$ ${moneyMask(campaign.budget)}</span></p>
      <p class="card-text">Público-alvo: <span class="fw-bold">${campaign.targetAudience.name}</span></p>
    </li>
  `;
};

const getCampaigns = async () => {
  try {
    const response = await fetch("http://localhost:3000/campaigns", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  await getCampaigns().then((data) => {
    const campaignsList = document.querySelector("#campaigns-list");

    data.campaigns.forEach((campaign) => {
      campaignsList.innerHTML += buildCard(campaign);
    });
  });
};
