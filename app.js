import { listarEventosPorData, listarEventosOrganizados, listarProximoEvento } from "./OrganizeEvents.js";

function listarEventosDoDia() {
    const eventosDoDia = listarEventosPorData(new Date());

    const containerEventosDoDia = document.getElementById("listaEventosDoDia");
    if (eventosDoDia) {
        eventosDoDia.forEach(item => {
            const adicionarDIVEvento = document.createElement('div');
            adicionarDIVEvento.innerHTML = `
                    <div class="card">

                    <div class="card-content">

                        <span class="card-title">
                            ${item.nome}
                        </span>

                        <p>
                            <i class="material-icons tiny">
                                event
                            </i>

                            ${item.dataHoraFormatoBr}
                        </p>

                        <p>
                            <i class="material-icons tiny">
                                access_time
                            </i>

                            ${item.hora}
                        </p>

                    </div>

                </div>
                `;
            containerEventosDoDia.appendChild(adicionarDIVEvento);
        });
    } else {
        containerEventosDoDia.innerHTML = `
            <p>Nenhum evento hoje.</p>
        `;
    }
}

function listarTodosEventos() {
    const eventos = listarEventosOrganizados();

    const containerListEventos = document.getElementById("listaTodosEventos");

    if (eventos) {
        eventos.forEach(item => {
            const criarDivEventoDetail = document.createElement('div');
            criarDivEventoDetail.innerHTML = `
                <div class="card">

                    <div class="card-content">

                        <span class="card-title">
                            ${item.nome}
                        </span>

                        <p>
                            <i class="material-icons tiny">
                                event
                            </i>

                            ${item.dataHoraFormatoBr}
                        </p>

                        <p>
                            <i class="material-icons tiny">
                                access_time
                            </i>

                            ${item.hora}
                        </p>

                    </div>

                </div>
            `;
            containerListEventos.appendChild(criarDivEventoDetail);
        });


    } else {
        containerListEventos.innerHTML = `
            <p>Nenhum evento para exibir</p>
        `;
    }
}

function proximoEvento() {
    const proximoEvento = listarProximoEvento();
    const evento = proximoEvento[proximoEvento.length - 1];

    const getDivEventName = document.getElementById("proximoEventoNome");
    const getDivEventDate = document.getElementById("proximoEventoData");
    const getDivEventHour = document.getElementById("proximoEventoHora");


    getDivEventName.textContent = evento.nome;
    getDivEventDate.textContent = evento.dataHoraFormatoBr;
    getDivEventHour.textContent = evento.hora;



    console.log(evento);
}

proximoEvento();
listarEventosDoDia();
listarTodosEventos();