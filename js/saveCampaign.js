const saveCampaign = async (event) => {
  event.preventDefault();

  const campaignName = document.querySelector("#campaign-name").value;
  const campaignDescription = document.querySelector("#description-text").value;
  const campaignStartDate = document.querySelector("#start-date").value;
  const campaignEndDate = document.querySelector("#end-date").value;
  const campaignBudget = Number(document.querySelector("#budget").value);
  const campaignTargetAudience = document.querySelector("#target-audience").value;
 console.log(document.querySelector("#target-audience"))
  const campaign = {
    name: campaignName,
    description: campaignDescription,
    startDate: campaignStartDate,
    endDate: campaignEndDate,
    budget: campaignBudget,
    targetAudience: campaignTargetAudience,
  };

  try {
    const response = await fetch("http://localhost:3000/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...campaign }),
    });
    const data = await response.json();

    if (response.status === 201) {
      document.querySelector("#modal-close").click();
      await getCampaigns()
    }
  } catch (error) {
    console.log(error);
  }
};
