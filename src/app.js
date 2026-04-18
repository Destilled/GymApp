console.log("java loaded");

let allExercises = [];

document.addEventListener("DOMContentLoaded", function() {
  initalload(); }
);

window.showUebungErstellenUI = function () {
  const viewCreatebox = document.getElementById("view-createbox");
  const armeaddbox = document.getElementById("armeaddbox");

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

  loadExercise();
  showExercise();
};

window.save = function () {
  const input = document.getElementById("uebungName");
  const name = input.value;
  const category = document.body.dataset.category;

  if (name.trim() === "") return;

  allExercises.push({
    name: name,
    category: category
  });

  localStorage.setItem("uebungen", JSON.stringify(allExercises));

  input.value = "";

  showExercise();
}

window.showExercise = function() {
  const liste = document.getElementById("liste");
  const category = document.body.dataset.category;

  liste.innerHTML = "";

  allExercises
    .filter(u => u.category === category)
    .forEach(u => {
      const div = document.createElement("div");
      let counter = 0;
      div.classList.add("Taskbox");

      div.innerHTML = `
      <label class="Checkmark">
        <input type="checkbox">
        <span></span>
      </label>
      <span class="t1">${u.name}</span>
      <button onclick="addColumn()">Spalte hinzufügen</button>

        <button onclick="addRow()">Zeile hinzufügen</button>

        <table id="myTable" border="1">
          <thead>
            <tr id="headerRow">
              <th>Spalte 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td contenteditable="true"></td>
            </tr>
          </tbody>
        </table>
    `;
      counter++;
      print(counter);

      liste.appendChild(div);
    });
}

window.loadExercise = function() {
  const daten = localStorage.getItem("uebungen");

  if(daten) {
    allExercises = JSON.parse(daten);
  }
}

window.clearlist = function() {
  allExercises = [];
  localStorage.removeItem("uebungen");
  console.log("Alles gelöscht");
  showExercise();
};

window.initalload = function(){
  loadExercise();
  showExercise();
}

function addRow() {
  const table = document.getElementById("myTable");
  const headerCells = document.getElementById("headerRow").children;

  const tr = document.createElement("tr");

  for (let i = 0; i < headerCells.length; i++) {
    const td = document.createElement("td");
    td.contentEditable = "true";
    tr.appendChild(td);
  }

  table.appendChild(tr);
}
