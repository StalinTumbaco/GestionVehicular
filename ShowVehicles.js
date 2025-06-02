// ShowVehicles.js

document.addEventListener("DOMContentLoaded", function () {
    mostrarVehiculos();
});

function mostrarVehiculos() {
    mostrarLista('vehicles', '.carInside', '.carOutside', 'car');
    mostrarLista('motorcycles', '.motoInside', '.motoOutside', 'moto');
}

function mostrarLista(key, insideSelector, outsideSelector, tipo) {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const dentro = document.querySelector(insideSelector);
    const fuera = document.querySelector(outsideSelector);

    dentro.innerHTML = `<h2 class="section-title">${tipo === 'car' ? 'Cars inside' : 'Motorcycle Inside'}</h2>`;
    fuera.innerHTML = `<h2 class="section-title">${tipo === 'car' ? 'Cars Outside' : 'Motorcycle Outside'}</h2>`;

    data.forEach((vehiculo, index) => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';

        // Nombre completo
        const fullName = `${vehiculo.name} ${vehiculo.lastname}`;

        if (vehiculo.inside) {
            // Mostrar name+lastname, placa, fecha de entrada
            card.innerHTML = `
                <p><strong>${fullName}</strong></p>
                <p><strong>Plates:</strong> ${vehiculo.plates}</p>
                <p><strong>Entry Date:</strong> ${new Date(vehiculo.entryDate).toLocaleString()}</p>
                <button class="btn-action" onclick="toggleEstado('${key}', ${index})">${vehiculo.inside ? 'Departure' : 'Entry'}</button>
                <button class="btn-delete" onclick="eliminarVehiculo('${key}', ${index})">Delete</button>
            `;
            dentro.appendChild(card);
        } else {
            // Mostrar name+lastname, placa, fecha de salida
            card.innerHTML = `
                <p><strong>${fullName}</strong></p>
                <p><strong>Plates:</strong> ${vehiculo.plates}</p>
                <p><strong>Departure Date:</strong> ${new Date(vehiculo.departureDate).toLocaleString()}</p>
                <button class="btn-action" onclick="toggleEstado('${key}', ${index})">${vehiculo.inside ? 'Departure' : 'Entry'}</button>
                <button class="btn-delete" onclick="eliminarVehiculo('${key}', ${index})">Delete</button>
            `;
            fuera.appendChild(card);
        }
    });
}

function toggleEstado(key, index) {
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const vehiculo = data[index];

    if (vehiculo.inside) {
        vehiculo.inside = false;
        vehiculo.departureDate = new Date().toISOString();
    } else {
        vehiculo.inside = true;
        vehiculo.entryDate = new Date().toISOString();
    }

    data[index] = vehiculo;
    localStorage.setItem(key, JSON.stringify(data));
    mostrarVehiculos();
}

function eliminarVehiculo(key, index) {
    if (confirm("Are you sure you want to delete this vehicle?")) {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        data.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(data));
        mostrarVehiculos();
    }
}
