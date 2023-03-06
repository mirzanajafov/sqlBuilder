const BaseQuery = require('./baseQuery');

class Insert extends BaseQuery {
  constructor(table) {
    super(table);
  }
}

const test = new Insert('insert');

console.log(test);
