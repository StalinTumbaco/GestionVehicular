document.getElementById("carForm").addEventListener("submit", function (e) {
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
  const plateRegex = /^[A-Z]{3}-\d{4}$/;

  if (!idRegex.test(id)) {
    alert("ID must be exactly 10 digits.");
    return;
  }

  if (!plateRegex.test(plates)) {
    alert("License plate must be in the format AAA-1234.");
    return;
  }

   let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
  
  // Validar que la placa no exista ya
  const placaExistente = vehicles.some(car => car.plates === plates);
  if (placaExistente) {
    alert("This license plate is already registered.");
    return;
  }

  // Obtener fecha y hora actual en formato ISO
  const now = new Date();
  const entryDate = now.toISOString();

  const carData = {
    name,
    lastname,
    id,
    plates,
    entryDate,
    isInside: true
  };

  // Guardar en localStorage
  vehicles.push(carData);
  localStorage.setItem("vehicles", JSON.stringify(vehicles));

  alert("Vehicle data saved successfully!");
  document.getElementById("carForm").reset();

  window.location.href = "../listVehicules.html";
});

// Convertir automáticamente a mayúsculas las placas al escribir
document.getElementById("licenseplates").addEventListener("input", function () {
  this.value = this.value.toUpperCase();
});

