console.log("java loaded");

let allExercises = [];

document.addEventListener("DOMContentLoaded", function() {
  initalload(); }
);

window.showExercise = function() {
  const liste = document.getElementById("liste");
  const category = document.body.dataset.category;
  let counter = 0;
  liste.innerHTML = "";

  allExercises
    .filter(u => u.category === category)
    .forEach(u => {
      const div = document.createElement("div");
      counter++;

      div.classList.add("Taskbox");

      div.innerHTML = `

      <label class="Checkmark">
        <input type="checkbox">
        <span></span>
      </label>

      <img
      src="${u.image || "/src/Images/NoImage.png"}"
      alt="Image not found"
      class="image"
      onclick="document.getElementById('ImageInput${counter}').click()">

      <input
      type="file"
      id="ImageInput${counter}"
      accept="image/*"
      style="display: none;"
      onchange="loadImage(event, '${u.id}')" >

      <span class="t1">${u.name}</span>

        <button onclick="addRow('${u.id}', ${counter})">
        Zeile hinzufügen</button>

        <div style="display: flex; align-items: flex-start;">
          <table id="Table${counter}" border="1">
            <thead>
              <tr id="headerRow${counter}">
                <th>Repeat</th>
                <th>Weight</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
            ${u.rows.map((row, rowIndex) =>`
              <tr>
                <td>${row.repeat}</td>

                <td
                contenteditable="true"
                oninput="saveCell( '${u.id}', ${rowIndex}, 'weight', this)">
                  ${row.weight}</td>

                <td contenteditable="true"
                oninput="saveCell( '${u.id}', ${rowIndex}, 'amount', this)">
                  ${row.amount}</td>
              </tr>
              `).join("")}
            </tbody>
          </table>

          <button onclick="deleteRow('${u.id}', ${counter})">
            Zeile Löschen
          </button>
        </div>

        <button onclick="deleteExercise('${u.id}')">
        Übung Löschen
        </button>
    `;

      liste.appendChild(div);
    });
}

window.clearlist = function() {
  allExercises = [];
  localStorage.removeItem("uebungen");
  console.log("list cleared");
  showExercise();
};

window.save = function () {
  const input = document.getElementById("uebungName");
  const name = input.value;
  const category = document.body.dataset.category;

  if (name.trim() === "") return;

  allExercises.push({
    id: crypto.randomUUID(),
    name: name,
    category: category,
    image: "",
    rows: [
      {
        repeat: 1,
        weight: "",
        amount: ""
      }
    ]
  });

  localStorage.setItem("uebungen", JSON.stringify(allExercises));

  input.value = "";
  showExercise();
}

window.loadExercise = function() {
  const daten = localStorage.getItem("uebungen");

  if(daten) {
    allExercises = JSON.parse(daten);
  }
}

window.initalload = function(){
  loadExercise();
  showExercise();
}

window.showUebungErstellenUI = function () {
  const viewCreatebox = document.getElementById("view-createbox");
  const armeaddbox = document.getElementById("armeaddbox");

  const daten = localStorage.getItem("uebungen");

  viewCreatebox.style.display = "block";
  armeaddbox.style.display = "none";

  if(daten) {
    allExercises =JSON.parse(daten);
  }

  armeaddbox.style.display = "none";

  viewCreatebox.innerHTML = `

    <div class="Createbox">
    <h2 class="t2">Übung Hinzufügen</h2>
    <button onclick="closeUebungErstellenUI()">Schließen</button>
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


window.addRow = function(id, counter) {
  const table = document.getElementById(`Table${counter}`);
  const tbody = table.querySelector("tbody");

  const tr = document.createElement("tr");

  const td = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");

  const counterrepeat = tbody.querySelectorAll("tr").length +1;

  td2.contentEditable = "true";
  td3.contentEditable = "true";

  td.textContent = counterrepeat;

  const rowIndex = counterrepeat -1;

  td2.setAttribute(
    "oninput",
    `saveCell( '${id}', ${rowIndex}, 'weight', this)`
  );

  td3.setAttribute(
    "oninput",
    `saveCell( '${id}', ${rowIndex}, 'amount', this)`
  );

  tr.appendChild(td);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tbody.appendChild(tr);


  const exercise = allExercises.find(
    u => u.id === id
  );

  exercise.rows.push({
    repeat: counterrepeat,
    weight: "",
    amount: ""
  });

  localStorage.setItem("uebungen",JSON.stringify(allExercises));
};


window.deleteRow = function(id, counter){
    const table = document.getElementById(`Table${counter}`);
    const tbody = table.querySelector("tbody");

    if (tbody.querySelectorAll("tr").length <= 1) {
      return;
    }

    tbody.removeChild(tbody.lastElementChild);

    const exercise = allExercises.find(
      u => u.id === id
    );

    exercise.rows.pop();

    localStorage.setItem(
      "uebungen",
      JSON.stringify(allExercises)
    );
};



window.saveCell = function(id,rowIndex,property,cell) {

  const exercise = allExercises.find(
    u => u.id === id
  );

  exercise.rows[rowIndex][property] = cell.textContent;

  localStorage.setItem("uebungen", JSON.stringify(allExercises));
}


window.closeUebungErstellenUI = function() {
  const viewCreatebox = document.getElementById("view-createbox");
  const armeaddbox = document.getElementById("armeaddbox");

  viewCreatebox.style.display = "none";
  armeaddbox.style.display = "block";
};


window.loadImage = function(event, id) {
  const file = event.target.files[0];
  if (!file) return;

  const image = event.target.previousElementSibling;
  image.src = URL.createObjectURL(file);

  const exercise = allExercises.find(
    u => u.id === id
  );

  const reader = new FileReader();

  reader.onload = function() {
    exercise.image = reader.result;

    localStorage.setItem(
      "uebungen",
      JSON.stringify(allExercises)
    );
  };

  reader.readAsDataURL(file);
};


window.deleteExercise = function(id) {

  allExercises = allExercises.filter(
    u => u.id !== id
  )

  localStorage.setItem(
    "uebungen",
    JSON.stringify(allExercises)
  );

  showExercise();
}
