// seeds the prices into the prices table of the database
const path = require("path");
const db = require(path.join(__dirname, "database.js"));

function seed() {
  db.exec(`
  drop table prices;
  CREATE TABLE prices (
  id integer primary key autoincrement, 
  stock_id integer, 
  day integer, 
  price real 
  );
`);

  const insert = db.prepare(`INSERT INTO prices (stock_id, day, price) VALUES (?, ?, ?)`);
  const list = db.prepare(`SELECT id FROM stocks`).all();

  // batch insert of randomized prices
  try {
    db.transaction(() => {
      for (stock_id of list) {
        let price = 1000 * Math.random();
        for (let i = 0; i < 365; i++) {
          // provides a normal distribution with Box-Muller transform
          price_change = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
          // transform to something appropriate for the current price
          price_change = price_change * price / 30;
          price += price_change
          insert.run(stock_id.id, i + 1, price);
        }
      }
    })();
  } catch (error) {
    console.error("Batch insert failed: ", error);
  }
  return db.prepare("select stock_id, day, price from prices").all();
}

module.exports = seed;
