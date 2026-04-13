console.log("java loaded");

let allExercises = [];


window.showUebungErstellenUI = function () {
  const viewCreatebox = document.getElementById("view-createbox");
  const armeaddbox = document.getElementById("armeaddbox");
  const category = document.body.dataset.category;

  const daten = localStorage.getItem("uebungen");

  if(daten) {
    allExercises =JSON.parse(daten);
  }

  armeaddbox.style.display = "none";

  viewCreatebox.innerHTML = `

    <div class="Createbox">
    <h2 class="t2">Übung Hinzufügen</h2>
    </div>

    <div class="Createbox">
    <hr class="Createline">
     </div>

   <div class="Createbox">
     <input
        id="uebungName"
        type="text"
        placeholder="Name der Übung"
        class="Uebunginput"
      >
     </div>

    <div class="Createbox" onclick="save()">
      <h3 class="t3">Übung Speichern</h3>
    </div>
  `;

  window.save = function () {
    const input = document.getElementById("uebungName");
    const name = input.value;

    if (name.trim() === "") return;

    allExercises.push({
      name: name,
      category: category
    });

    localStorage.setItem("uebungen", JSON.stringify(allExercises));

    input.value = "";

    showExercise();
  }

  function loadExercise() {
  const daten = localStorage.getItem("uebungen");

   if(daten) {
     allExercises = JSON.parse(daten);
   }
  }
  function showExercise() {
    const liste = document.getElementById("liste");

    liste.innerHTML = "";

    allExercises
      .filter(u => u.category === category)
      .forEach(u => {
      const div = document.createElement("div");
      div.classList.add("Selectbox");

      div.innerHTML = `
      <label class="Checkmark">
        <input type="checkbox">
        <span></span>
      </label>
      <span class="t1">${u.name}</span>
    `;

      liste.appendChild(div);
    });
  }
  loadExercise();
};
