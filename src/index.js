
const btnShowDisponiveis = document.getElementById('disponiveis');
const btnShow = document.getElementById('agendadas');
const btnAgendar = document.getElementById('agendar');

btnAgendar.addEventListener('click', function(){
    
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
        let styleSelect = ` style=" width: 400px; height: 30px; border-radius: 5px; border-color: #cacaca; margin-bottom: 15px; " `;
        let styleButton = ` style=" width: 100px; height: 30px; border-radius: 5px; border: none; cursor: pointer; background-color: #011d1d; color: #fff; "`;

        html += `<h3 style="color: #121212 ">Cadastro de consulta</h3> <br><br>`;
        html += `<form action="" method="post">`;
        
        html += `<div>`;
        html += `<label>Especialidade, médico e data/hora </label> <br><br>`;
        html += `<select ${styleSelect} id="selectDados">`;
        html += `<option value="">Selecione</option>`;
        for (let index = 0; index < array.length; index++) {
            let element = array[index];
            if(element.disponivel){
                html += `<option value="${element.especialidade}#${element.medico}#${element.data}#${element.id}">${element.especialidade} - ${element.medico} - ${element.data}</option>`;
            }
        }
        html += `</select>`;
        html += `</div>`;
        
        // html += `<div>`;
        // html += `<label>Médico </label> <br>`;
        // html += `<select ${styleSelect}>`;
        // html += `<option>Selecione o médico</option>`;
        // for (let index = 0; index < array.length; index++) {
        //     let element = array[index];
        //     if(element.disponivel){
        //         html += `<option value="${element.medico}">${element.medico}</option>`;
        //     }
        // }
        // html += `</select>`;
        // html += `</div>`;

        // html += `<div>`;
        // html += `<label>Data e hora </label> <br>`;
        // html += `<select ${styleSelect}>`;
        // html += `<option>Selecione a data e a hora disponível</option>`;
        // for (let index = 0; index < array.length; index++) {
        //     let element = array[index];
        //     if(element.disponivel){
        //         html += `<option value="${element.data}">${element.data}</option>`;
        //     }
        // }
        // html += `</select>`;
        // html += `</div>`;
        
        html += `<div>`;
        html += `<button type="button" ${styleButton} id="salvar"> Salvar </button>`;
        html += `</div>`;
        
        html += `</form>`;

        document.querySelector('#consultas').innerHTML = html;

        const btnSalvar = document.querySelectorAll('#salvar');
        btnSalvar.forEach(salvar => {
            salvar.addEventListener('click', function() {
                const selectElement = document.getElementById('selectDados');
                const selectedOption = selectElement.options[selectElement.selectedIndex];
                const value = selectedOption.value;
                const text = selectedOption.text;

                // console.log('Valor selecionado:', value);

                const partes = value.split("#");

                const especialidade = partes[0];
                const medico = partes[1];
                const data_hora = partes[2];
                const id_consulta = partes[3];
                
                let array = JSON.parse(sessionStorage.getItem("dados_consulta")) || []; 
                array.push({id_consulta, medico, especialidade, data_hora});
                sessionStorage.setItem("dados_consulta", JSON.stringify(array));

                alert('Sucesso! Você acaba de marcar sua consulta. Vá no menu "Agendamentos" e verifique.');

            });
        });

    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
});

// Mostra consultas diponiveis
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
                const paciente = "Victor Santos";

                let array = JSON.parse(sessionStorage.getItem("dados_consulta")) || []; 
                array.push({id_consulta, medico, especialidade, data_hora, paciente});
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

//Mostra consultas agendadas
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
        let html = "";

        if (dados) {
            let array = JSON.parse(dados);
        
        
            array.forEach(consulta => {

                html += `
                    <div style=" font-weight: bold; color: #6b0c19; text-decoration: none; ">
                        <p>Paciente: Victor Santos</p>
                        <p>Especialidade: ${consulta.especialidade}</p>
                        <p>Médico: ${consulta.medico}</p>
                        <p>Data e Hora: ${consulta.data_hora}</p>
                    </div>
                    <br>
                `;
            });
            document.getElementById('consultas').innerHTML = html;
            
        } else {
            html += " Não há nada agendado. ";
            document.getElementById('consultas').innerHTML = html;
        }

    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
});
