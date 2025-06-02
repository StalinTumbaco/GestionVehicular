document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("Formadmin");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    if (user === "admin" && password === "superadmin") {
      window.location.href = "IngresoVehicular.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
});
