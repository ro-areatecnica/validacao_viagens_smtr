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

module.exports = { data_versao_gtfs };
