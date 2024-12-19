const moment = require('moment');

// Utilzar datas dinamicas do XCom do Airflow
const data_inicial_gps_validacao_viagem = moment().subtract(2, 'days').startOf('day').format("'YYYY-MM-DD'");

const date_range_start = moment(data_inicial_gps_validacao_viagem).format();

const date_range_end = moment(date_range_start).add(1, 'hour').format();

module.exports = {
    data_inicial_gps_validacao_viagem,
    date_range_start,
    date_range_end,
};

