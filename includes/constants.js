let data_versao_manual = new Date("2024-12-09").toISOString().split('T')[0]; // -- reprocessamento setar a data aqui
let data_versao_gtfs = new Date().toISOString().split('T')[0]; // -- fixada última data disponível

if (data_versao_manual != "") {
  data_versao_gtfs = `"${data_versao_manual}"`;
}

function get_last_feed_start_date(ctx) {
  if (ctx.incremental()) {
    return `
      SELECT MAX(feed_start_date) FROM ${ref("gtfs", "feed_info")} WHERE feed_start_date < '${data_versao_gtfs}'`;
  } else {
    return `${data_versao_gtfs}`; 
  }
}

module.exports = { data_versao_gtfs, get_last_feed_start_date };


