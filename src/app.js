function showUebungErstellenUI() {
  const viewCreate = document.getElementById("view-create");
  viewCreate.innerHTML = `
    <div class="create-box">

      <h2 class="t2">Übung erstellen</h2>

      <input
        id="uebungName"
        type="text"
        placeholder="Name der Übung"
        class="input"
      >

      <button onclick="speichernUebung()" class="btn">
        Speichern
      </button>

    </div>
  `;
}
