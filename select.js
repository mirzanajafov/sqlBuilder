const BaseQuery = require('./baseQuery');

class Select extends BaseQuery {
  constructor(table) {
    super(table, 'SELECT ');
  }

  all() {
    this.sql += `* from ${this.table}`;
    return this;
  }

  byColumns(columns) {
    this.sql += `${Select.joinKeywords(columns)} from ${this.table}`;
    return this;
  }

  distinct() {
    this.sql += `DISTINCT `;
    return this;
  }

  count(columns = []) {
    this.sql += `COUNT (`;
    if (columns.length > 0) {
      this.sql += `${Select.joinKeywords(columns)}) from ${this.table}`;
      return this;
    }
    this.sql += `*) from ${this.table}`;
    return this;
  }
}

const select = new Select('Test');

// select.all();
console.log(
  select
    .byColumns(['name', 'surname'])
    .where({ name: 'John' })
    .limit(10)
    .getSql()
);

// new Select('Test1').all().where();
