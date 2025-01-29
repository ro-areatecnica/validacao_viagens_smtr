const data_atual = new Date();

data_atual.setDate(data_atual.getDate() - 2);

const data_inicial = data_atual.toISOString().split('T')[0];

const data_inicial_gps_validacao_viagem = `'${data_inicial}'`;

module.exports = { data_inicial_gps_validacao_viagem };


