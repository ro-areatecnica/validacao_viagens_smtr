const versao = '';
const buffer_tunel_metros = 50;
const limite_reducao_area_buffer = 0.5;
const comprimento_minimo_segmento_shape = 990;
const parametro_validacao = 0.9;
const data_inicial_gps_validacao_viagem = `"2024-07-17"`;
const date_range_start = `"2024-07-17T00:00:00"`;
const date_range_end = `"2024-07-17T00:59:59"`;

function get_last_feed_start_date() {
  return `
    (
    SELECT 
      MAX(feed_start_date) AS max_date 
    FROM \`rj-smtr.gtfs.feed_info\`
    WHERE feed_start_date < data_inicial_gps_validacao_viagem
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
