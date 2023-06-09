function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.userId}</td>
            <td>${item.title}</td>
            <td>${item.body}</td>
          `;
          tableBody.appendChild(row);
        });
  
        const filterInput = document.querySelector('#filter-input');
        filterInput.addEventListener('input', event => {
          const searchTerm = event.target.value.toLowerCase();
          const filteredData = data.filter(item => item.title.toLowerCase().includes(searchTerm));
          updateTable(filteredData);
        });
  
        const tableHeaders = document.querySelectorAll('#data-table th');
        let sortedBy = null;
        let sortOrder = 1;
        tableHeaders.forEach(header => {
          header.addEventListener('click', () => {
            const column = header.textContent.toLowerCase();
            if (sortedBy === column) {
              sortOrder *= -1;
            } else {
              sortedBy = column;
              sortOrder = 1;
            }
            const sortedData = data.slice().sort((a, b) => {
              const valueA = a[column];
              const valueB = b[column];
              return sortOrder * valueA.localeCompare(valueB);
            });
            updateTable(sortedData);

            tableHeaders.forEach(header => {
                header.classList.remove('active', 'descending');
            });

            header.classList.add('active');
            
            if (sortOrder === -1) {
                header.classList.add('descending');
            }
          });
        });
  
        function updateTable(newData) {
          tableBody.innerHTML = '';
          newData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item.userId}</td>
              <td>${item.title}</td>
              <td>${item.body}</td>
            `;
            tableBody.appendChild(row);
          });
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  