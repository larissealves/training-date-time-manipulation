import { listarEventosPorData, listarEventosOrganizados } from "./OrganizeEvents.js";

function listarEventosDoDia() {
    const eventosDoDia = listarEventosPorData(new Date());
    
    const containerEventosDoDia = document.getElementById("listaEventosDoDia");
    if (eventosDoDia) {
        eventosDoDia.forEach(item => {
            const adicionarDIVEvento = document.createElement('div');
            adicionarDIVEvento.innerHTML = `
                    <h2>${item.nome}</h2>
                    <p>${item.dataHoraFormatoBr}</p>
                    <p>${item.hora}</p>
                `;
            containerEventosDoDia.appendChild(adicionarDIVEvento);
        });
    } else {
         container.innerHTML = `
            <p>Nenhum evento hoje.</p>
        `;
    }
}

listarEventosDoDia(); 