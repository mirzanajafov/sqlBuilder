class BaseQuery {
  constructor(table, sql) {
    this.table = table;
    this.sql = sql;
  }

  static isSentenceContainWord(word, sentence) {
    const pattern = new RegExp('(\\w*' + word + '\\w*)', 'gi');
    return sentence.match(pattern);
  }

  static joinKeywords(array) {
    return array.join(',');
  }

  where(conditions, separateBy = 'AND') {
    if (BaseQuery.isSentenceContainWord('WHERE', this.sql)) {
      this.sql += ` AND`;
    } else {
      this.sql += ` WHERE`;
    }

    const countConditions = Object.keys(conditions).length;
    let checkedCondition = 0;

    for (const condition in conditions) {
      this.sql += ` ${condition} = '${conditions[condition]}'`;
      checkedCondition++;
      if (checkedCondition !== countConditions) {
        this.sql += ` ${separateBy}`;
      }
    }
    return this;
  }

  whereIn(conditions) {
    if (BaseQuery.isSentenceContainWord('WHERE', this.sql)) {
      this.sql += ` AND`;
    } else {
      this.sql += ` WHERE`;
    }

    for (const condition in conditions) {
      this.sql += ` ${condition} in (${BaseQuery.joinKeywords(
        conditions[condition]
      )})`;
    }

    return this;
  }

  order(columns, orderType = 'ASC') {
    this.sql += ` ORDER BY ${BaseQuery.joinKeywords(columns)} ${orderType}`;
    return this;
  }

  limit(limit, offset = 0) {
    this.sql += ` LIMIT  ${offset}, ${limit}`;
    return this;
  }

  getSql() {
    return this.sql;
  }
}

module.exports = BaseQuery;
