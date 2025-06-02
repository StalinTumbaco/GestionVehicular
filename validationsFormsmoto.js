document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("motoForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const id = document.getElementById("ID").value.trim();
    let plates = document.getElementById("licenseplates").value.trim().toUpperCase();

    // Validación de campos vacíos
    if (!name || !lastname) {
        alert("Name and Last name are required.");
        return;
    }

    // Validaciones
    const idRegex = /^\d{10}$/;
    const plateRegex = /^[A-Z]{2}-\d{3}[A-Z]$/;

    if (!idRegex.test(id)) {
      alert("ID must be exactly 10 digits.");
      return;
    }

    if (!plateRegex.test(plates)) {
      alert("License plate must be in the format AB-123C.");
      return;
    }

    const motos = JSON.parse(localStorage.getItem("motorcycles")) || [];

    // Validar que la placa no exista ya
    const placaExistente = motos.some(moto => moto.plates === plates);
    if (placaExistente) {
      alert("This license plate is already registered.");
      return;
    }

    // Obtener la fecha y hora actual
    const now = new Date();
    const entryDate = now.toISOString();

    const motoData = {
      name,
      lastname,
      id,
      plates,
      entryDate,
      isInside: true
    };

    // Guardar en localStorage (clave separada)
    motos.push(motoData);
    localStorage.setItem("motorcycles", JSON.stringify(motos));

    alert("Motorcycle data saved successfully!");
    form.reset();

    window.location.href = "../listVehicules.html";
  });

  // Convertir placas a mayúsculas mientras escribe
  document.getElementById("licenseplates").addEventListener("input", function () {
    this.value = this.value.toUpperCase();
  });
});
