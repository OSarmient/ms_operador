module.exports = (d) => {
    var [dia, mes, anio, hora, minutos, segundos] = [d.getDate(), d.getMonth(), d.getFullYear(), d.getHours(), d.getMinutes(), d.getSeconds()];
    var dia = dia < 10 ? "0" + dia : dia;
    var mes = mes < 10 ? "0" + mes : mes;
    var hora = hora < 10 ? "0" + hora : hora;
    var minutos = minutos < 10 ? "0" + minutos : minutos;
    var segundos = segundos < 10 ? "0" + segundos : segundos;
    var text = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    
    return text;
}