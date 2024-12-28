const data_atual = new Date("2024-11-31");

data_atual.setDate(data_atual.getDate() - 1);

const data_inicial = data_atual.toISOString().split('T')[0];

const data_inicial_gps_validacao_viagem = `'${data_inicial}'`;

module.exports = { data_inicial_gps_validacao_viagem };


