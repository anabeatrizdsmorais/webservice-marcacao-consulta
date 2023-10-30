
const btnShowDisponiveis = document.getElementById('disponiveis');
const btnShow = document.getElementById('agendadas');

btnShowDisponiveis.addEventListener('click', function(){
    
    fetch('./json/data.json'/* , {method: 'GET'} */)
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        return response.json();
    })
    .then(data => {
        const array = data.consultas;
        let html = ``;

        for (let index = 0; index < array.length; index++) {
            let element = array[index];

            if(element.disponivel) {
                html += `
                    <a 
                        href="javascript:;" 
                        id="link" 
                        data-especialidade="${element.especialidade}"
                        data-medico="${element.medico}"
                        data-data_hora="${element.data}"
                        data-id_consulta="${element.id}"
                        style=" font-weight: bold; color: #0c6b4e; text-decoration: none; "
                    >
                        
                        <p> Especialidade: ${element.especialidade} </p>
                        <p> Médico: ${element.medico} </p>
                        <p> Data e hora: ${element.data} </p>
                    </a>
                    <br>
                `;

            }

        }
        document.getElementById('consultas').innerHTML = html;

        const links = document.querySelectorAll('#link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                const id_consulta = this.getAttribute('data-id_consulta');
                const medico = this.getAttribute('data-medico');
                const especialidade = this.getAttribute('data-especialidade');
                const data_hora = this.getAttribute('data-data_hora');

                let array = JSON.parse(sessionStorage.getItem("dados_consulta")) || []; 
                array.push({id_consulta, medico, especialidade, data_hora});
                sessionStorage.setItem("dados_consulta", JSON.stringify(array));

                const index = array.findIndex(element => element.id === id_consulta);
                if (index === -1) {
                    array.splice(index, 1);
                    this.remove();
                    alert('Sucesso! Você acaba de marcar sua consulta. Vá no menu "Agendamentos" e verifique.')
                }
            });
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
});


btnShow.addEventListener('click', function(){
    
    fetch('./json/data.json'/* , {method: 'GET'} */)
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        const array = data.consultas;
       
        let dados = sessionStorage.getItem("dados_consulta");

        if (dados) {
            let array = JSON.parse(dados);
        
            let html = "";
        
            array.forEach(consulta => {

                html += `
                    <div style=" font-weight: bold; color: #6b0c19; text-decoration: none; ">
                        <p>Especialidade: ${consulta.especialidade}</p>
                        <p>Médico: ${consulta.medico}</p>
                        <p>Data e Hora: ${consulta.data_hora}</p>
                    </div>
                    <br>
                `;
            });
            document.getElementById('consultas').innerHTML = html;
        
        }

    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
});
