const API_URL = 'https://script.google.com/macros/s/AKfycbxqu2DMLwKCMUEVuX15Wo0C0SPGohsLRLbYP4SPKuJ5Zwjed4-RkdbZx0MRE1V1XtxKOQ/exec';

document.addEventListener('DOMContentLoaded', () => {
  fetchData();

  document.getElementById('crud-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const method = id ? 'PUT' : 'POST';
    const data = { id, name, email };

    fetch(API_URL, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      document.getElementById('crud-form').reset();
      fetchData();
    });
  });
});

function fetchData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#data-table tbody');
      tbody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.name}</td>
          <td>${row.email}</td>
          <td>
            <button class="edit" onclick="editData('${row.id}', '${row.name}', '${row.email}')">Edit</button>
            <button class="delete" onclick="deleteData('${row.id}')">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function editData(id, name, email) {
  document.getElementById('id').value = id;
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
}

function deleteData(id) {
  fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(() => {
    fetchData();
  });
}
