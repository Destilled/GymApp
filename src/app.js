console.log("JS geladen");
window.showUebungErstellenUI = function () {
  const viewCreate = document.getElementById("view-create");
  const armeaddbox = document.getElementById("armeaddbox");

  armeaddbox.style.display = "none";

  viewCreate.innerHTML = `

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

    <div class="Createbox">

      <img src="../../Images/Plus.png" alt="Image not found"  class="image">
      <h3 class="t3">Übung Speichern</h3>


    </div>
  `;
}
