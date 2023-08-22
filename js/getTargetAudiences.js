const getTargetAudiences = async () => {
  try {
    const response = await fetch("http://localhost:3000/target_audiences", {
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

document.querySelector("#modal-toggle").addEventListener("click", async () => {
  getTargetAudiences().then((data) => {
    const select = document.querySelector("#target-audience");

    data.targetAudiences.forEach((targetAudience) => {
      select.innerHTML += `
        <option value="${targetAudience._id}">${targetAudience.name}</option>
      `;
    });
  });
});
