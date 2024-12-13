const buffer_tunel_metros = 50;
const limite_reducao_area_buffer = 0.5;
const comprimento_minimo_segmento_shape = 990;

function get_last_feed_start_date() {
  return `
    (
    SELECT 
      MAX(feed_start_date) AS max_date 
    FROM \`rj-smtr.gtfs.feed_info\`
    )
  `;
}

const data_versao_gtfs = get_last_feed_start_date()

module.exports = { 
  data_versao_gtfs, 
  buffer_tunel_metros, 
  limite_reducao_area_buffer, 
  comprimento_minimo_segmento_shape
};
