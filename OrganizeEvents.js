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

        // ========== Data timestamp - segundos e milissegundos ========== 
        const timestamp = Number(item.data);
        if (!Number.isNaN(timestamp)) {
            const tamanhoSringTimestamp = String(Math.trunc(timestamp)).length;
            if (tamanhoSringTimestamp === 13) {
                item.dataHora = new Date(timestamp);
                item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");
            } else if (tamanhoSringTimestamp === 10) {
                item.dataHora = new Date(timestamp * 1000);
                item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");
            }
            return;
        }

        // ========== Data short format (/ / /): 12/12/12 ========== 
        else if (typeof item.data === "string" && item.data.includes("/")) {
            const [dia, mes, ano] = item.data.split("/");
            const [horas, minutos] = item.hora.split(':');

            const newDate = `${ano}-${mes}-${dia} ${horas}:${minutos}` ;
            item.dataHora = new Date(newDate);
            item.dataHoraFormatoBr = item.dataHora.toLocaleString("pt-BR");

            return;
        }

        else {
            item.dataHora = new Date(item.data);
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
            item.dataHora.getFullYear() === input_date.getFullYear() &&
            item.dataHora.getMonth() === input_date.getMonth() &&
            item.dataHora.getDate() === input_date.getDate()
        )
    })

    console.log("EVENTOS POR DIA: ", listaFiltrada);
    return listaFiltrada;
}

export function listarProximoEvento() {
    const lista = listarEventosOrganizados();

    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours() * 60 + dataAtual.getMinutes();

    const listaFiltrada = lista.filter(item => {
        const [horas, minutos] = item.hora.split(":").map(Number);
        const horaEvento = horas * 60 + minutos;

        return (
            item.dataHora.getFullYear() > dataAtual.getFullYear() ||

            item.dataHora.getFullYear() === dataAtual.getFullYear()
            &&
            item.dataHora.getMonth() > dataAtual.getMonth() ||
            
            item.dataHora.getFullYear() === dataAtual.getFullYear()
            &&
            item.dataHora.getMonth() === dataAtual.getMonth()
            && 
            (
                item.dataHora.getDate() > dataAtual.getDate() ||

                item.dataHora.getDate() === dataAtual.getDate() &&
                horaEvento > horaAtual 
            )
        );
    })

    console.log("PROXIMOS EVENTOS: ", listaFiltrada);
    return listaFiltrada;
}


adicionarCampoDataHora();
//listarProximoEvento();
//listarEventosPorData(new Date("aaaa"));
//listarEventosPorData(new Date("2026-08-16"));