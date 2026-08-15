import { eventos } from "./eventsData.js";

function showEvents() {
    eventos.map(item => {
        console.log(item);
    })
}

function adicionarCampoDataHora() {
    eventos.forEach(item => {
        item.dataHora = null;
        item.dataHoraFormatoBr = null;
    });

    const json = JSON.stringify(eventos);
    //console.log(json);
    return json;
}

function formatarDataHora() {
    eventos.forEach(item => {
        const [horas, minutos] = item.hora.split(':').map(Number);;
        const minutoFormatado = String(minutos).padStart(2, "0");
        const horaFormatada = String(horas).padStart(2, "0");

        // ========== Data timestamp - segundos e milissegundos ========== 
        const timestamp = Number(item.data);
        if (!Number.isNaN(timestamp)) {
            const tamanhoSringTimestamp = String(Math.trunc(timestamp)).length;
            if (tamanhoSringTimestamp === 13) {
                item.dataHora = new Date(timestamp);
                item.dataHora.setHours(horaFormatada, minutoFormatado);
                item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");
            } else if (tamanhoSringTimestamp === 10) {
                item.dataHora = new Date(timestamp * 1000);
                item.dataHora.setHours(horaFormatada, minutoFormatado);
                item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");
            }
            return;
        }

        // ========== Data short format (/ / /): 12/12/12 ========== 
        else if (typeof item.data === "string" && item.data.includes("/")) {
            const [dia, mes, ano] = item.data.split("/");
            
            item.dataHora =  new Date(`${ano}-${mes}-${dia}T${horaFormatada}:${minutoFormatado}`) ;
            item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");

            return;
        }

        else {
            item.dataHora = new Date(`${item.data}T${horaFormatada}:${minutoFormatado}`);
            item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");
        }
    });

    //console.log(eventos);
    return eventos;
}

export function listarEventosOrganizados() {
    const lista = formatarDataHora();

    const listaOrdenada = lista.sort((a, b) => {
        return b.dataHora - a.dataHora;
    });

    //console.log(listaOrdenada);
    return listaOrdenada;
}

export function listarEventosPorData(input_date) {
    const lista = listarEventosOrganizados();

    const data = new Date(input_date);

    const isValidDate = !isNaN(data.getTime());

    if (!isValidDate) {
        console.log("Data inválida: ", input_date);
        return [];
    }

    const listaFiltrada = lista.filter(item => {
        return (
            item.dataHora.getFullYear() === data.getFullYear() &&
            item.dataHora.getMonth() === data.getMonth() &&
            item.dataHora.getDate() === data.getDate()
        )
    })

    console.log("EVENTOS POR DIA: ", listaFiltrada);
    return listaFiltrada;
}

export function listarProximoEvento() {
    const lista = listarEventosOrganizados();
   
    const listaFiltrada = lista.filter(item => {
        return (
             item.dataHora > new Date()
        );
    });


    const ordenaListaCresc = 
        listaFiltrada.sort((a, b) => {
            return a.dataHora - b.dataHora;
        });


    console.log("PROXIMOS EVENTOS: ", ordenaListaCresc[0]);
    return ordenaListaCresc[0] ?? null;
}


// =============================================
const lista = formatarDataHora();

lista.forEach(item => {
    console.log(
        item.id, 
        "=>",
        item.nome,
        "=>",
        item.dataHora,
        "=>",
        item.dataHoraFormatoBr
    );
});


adicionarCampoDataHora();
//formatarDataHora();
listarProximoEvento();
//listarEventosPorData(new Date("aaaa"));
//listarEventosPorData(new Date("2026-08-16"));