document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("crudForm");
    const tableBody = document.getElementById("tableBody");
  
    let records = [];
    let counter = 1;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
  
      if (name && email && phone) {
        const record = { id: counter++, name, email, phone };
        records.push(record);
        renderTable();
        form.reset();
      }
    });
  
    function renderTable() {
      tableBody.innerHTML = "";
      records.forEach((record) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${record.id}</td>
          <td>${record.name}</td>
          <td>${record.email}</td>
          <td>${record.phone}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editRecord(${record.id})">Düzenle</button>
            <button class="btn btn-danger btn-sm" onclick="deleteRecord(${record.id})">Sil</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    window.editRecord = function (id) {
      const record = records.find((rec) => rec.id === id);
      if (record) {
        document.getElementById("name").value = record.name;
        document.getElementById("email").value = record.email;
        document.getElementById("phone").value = record.phone;
        records = records.filter((rec) => rec.id !== id);
        renderTable();
      }
    };
  
    window.deleteRecord = function (id) {
      records = records.filter((rec) => rec.id !== id);
      renderTable();
    };
  });
  