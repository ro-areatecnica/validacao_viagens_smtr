const dateRangeStart = "2022-11-29";
const dateRangeEnd = "2022-11-29";

async function getGtfsFeeds() {
  const gtfsFeedsQuery = `
    SELECT DISTINCT 
      CONCAT("'", feed_start_date, "'") AS feed_start_date
    FROM 
      rj-smtr.planejamento.calendario
    WHERE 
      data BETWEEN DATE('${dateRangeStart}') 
        AND DATE('${dateRangeEnd}')
  `;

  const results = await dataform.execute(gtfsFeedsQuery);
  return results.map(row => row.feed_start_date);
}

let gtfs_feeds = [];

// Executar a função e armazenar o resultado
(async () => {
  gtfs_feeds = await getGtfsFeeds();
})();

module.exports = { gtfs_feeds };
