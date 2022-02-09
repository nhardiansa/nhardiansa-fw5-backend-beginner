const {
  APP_URL
} = process.env;

exports.returningError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message
  });
};

exports.returningSuccess = (res, status, message, data, pageInfo = null) => {
  if (pageInfo) {
    return res.status(status).json({
      success: true,
      message: message,
      pageInfo,
      results: data
    });
  }

  return res.status(status).json({
    success: true,
    message: message,
    results: data
  });
};

exports.pageInfoCreator = (totalDataCount, url, values) => {
  const {
    page,
    limit
  } = values;

  const keys = [];
  let next = url;
  let prev = url;

  for (const key in values) {
    keys.push(key);
  }

  keys.forEach((el, idx) => {
    if (values[el]) {
      if (el === 'page') {
        next += el + '=' + (values[el] + 1) + '&';
        prev += el + '=' + (values[el] - 1) + '&';
      } else if (idx < (keys.length - 1)) {
        next += el + '=' + values[el] + '&';
        prev += el + '=' + values[el] + '&';
      } else {
        next += el + '=' + values[el];
        prev += el + '=' + values[el];
      }
    }
  });

  const totalData = totalDataCount;

  const totalPages = Math.ceil(totalData / limit) || 1;

  return ({
    totalPages,
    currentPage: page,
    nextPage: page < totalPages ? next : null,
    prevPage: page > 1 ? prev : null,
    lastPages: totalPages
  });
};

exports.validatorResult = (status, message) => {
  return {
    status,
    message
  };
};

exports.dataMapping = (data) => {
  data.map(el => {
    if (el.image !== null) {
      el.image = `${APP_URL}/${el.image}`;
    } else {
      el.image = null;
    }
    return el;
  });

  return data;
};
