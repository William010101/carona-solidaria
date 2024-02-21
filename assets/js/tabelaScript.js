const fetchTeste = () => {
    const path = 'http://localhost:3003/getAtributes';
    
    const criate = (e) => {
        return document.createElement(e);
    }

    function populaTabela(table, data) {
        // Cria a primeira linha da tabela com os nomes dos campos, excluindo "motorista"
        const headerRow = criate('tr');
        Object.keys(data[0] || {}).forEach(key => {
            if (key !== 'motorista') {
                const th = criate('th');
                th.textContent = key;
                headerRow.appendChild(th);
            }
        });
        table.appendChild(headerRow);

        // Preenche o restante da tabela com os dados, excluindo "motorista"
        for (let i = 0; i < data.length; i++) {
            const row = criate('tr');
            Object.keys(data[i]).forEach(key => {
                if (key !== 'motorista') {
                    const td = criate('td');
                    td.textContent = data[i][key];
                    row.appendChild(td);
                }
            });
            table.appendChild(row);
        }
    }

    fetch(path)
        .then(response => response.json())
        .then(data => {
            const motoristasContainer = document.getElementById('motoristasTable');
            const passageirosContainer = document.getElementById('passageirosTable');

            const motoristas = data.motorista.filter(motorista => {
                return data.passageiro.some(passageiro => passageiro.cidade === motorista.cidade);
            });

            const passageiros = data.passageiro.filter(passageiro => {
                return data.motorista.some(motorista => motorista.cidade === passageiro.cidade);
            });

            populaTabela(motoristasContainer, motoristas);
            populaTabela(passageirosContainer, passageiros);
        });
}

fetchTeste();