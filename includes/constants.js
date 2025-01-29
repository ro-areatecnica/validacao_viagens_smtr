const versao = `"76a9e78183fb16ff2864670f49522feaa2bf2e4b"`;
const buffer_tunel_metros = 50;
const limite_reducao_area_buffer = 0.5;
const comprimento_minimo_segmento_shape = 990;
const parametro_validacao = 0.9;
const qtd_dia = 1;
const data_inicial_gps_validacao_viagem = new Date("2025-01-28");
data_inicial_gps_validacao_viagem.setDate(data_inicial_gps_validacao_viagem.getDate() - qtd_dia);

const date_range_start = `'${data_inicial_gps_validacao_viagem.toISOString().split('T')[0]}T00:00:00'`;

const date_range_end = date_range_start.replace("T00:00:00", "T23:59:59");


function get_last_feed_start_date() {
  return `
    (
    SELECT 
      MAX(feed_start_date) AS max_date 
    FROM \`rj-smtr.gtfs.feed_info\`
    WHERE feed_start_date < DATE('${data_inicial_gps_validacao_viagem.toISOString().split('T')[0]}')
    )
  `;
}

const data_versao_gtfs = get_last_feed_start_date()

module.exports = { 
  versao,
  data_versao_gtfs, 
  buffer_tunel_metros, 
  limite_reducao_area_buffer, 
  comprimento_minimo_segmento_shape,
  date_range_start,
  date_range_end,
  data_inicial_gps_validacao_viagem,
  parametro_validacao
};
