import crypto from 'crypto';
import fileSystem from 'fs';
import slugify from 'slugify';
import path from 'path';
import https from 'https';
import config from '../config/config';

/**
 * Return common media and file path
 * @param mediaType
 * @param clientId
 * @param fileName
 * @author Toquir Alam <toquir.alam@timesinternet.in>
 */
const getMediaPath = (mediaType, options = {}) => {
  let { isTrailingFilePath = 0, fileName = '', isDownload = 0 } = options;
  let mediaPath = '';
  let currYear = new Date().getFullYear();
  let currMonth = new Date().toLocaleString('default', { month: 'short' });
  let file_path = '';
  switch (mediaType) {
    case 'client':
      file_path = '/' + mediaType + '/' + currYear + '/' + currMonth.toLowerCase() + '/';
      mediaPath = config.uploadMediaPath + file_path;
      break;
    default:
      file_path = '/' + mediaType + '/' + currYear + '/' + currMonth + '/';
      mediaPath = config.uploadMediaPath + file_path;
      break;
  }
  return isDownload ? mediaPath + fileName : isTrailingFilePath ? file_path : mediaPath;
};

/**
 * common uploader
 * @param path
 * @param doc
 * @param docName
 * @author Toquir Alam <toquir.alam@timesinternet.in>
 */
const commonUpload = (path, doc, docName) => {
  if (!fileSystem.existsSync(path)) {
    fileSystem.mkdirSync(path);
  }
  return new Promise((resolve, reject) => {
    fileSystem.writeFile(path + docName, doc, (error) => {
      if (error) {
        reject(false);
      }
      resolve(true);
    });
  });
};

/**
 * @author Vipul Garg <vipul.garg@timesinternet.in>
 * @returns polyfill for promise any
 */
const PromiseAny = (promises) => {
  return Promise.all(
    [...promises].map((promise) => {
      return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve));
    })
  ).then(
    (errors) => {
      return Promise.reject(errors);
    },
    (value) => {
      return Promise.resolve(value);
    }
  );
};

/**
 * @author Vipul Garg <vipul.garg@timesinternet.in>
 * @returns polyfill for promise all settled
 */
const AllSettled = (promises) => {
  return Promise.all(
    promises.map(function (promise) {
      return promise
        .then(function (value) {
          return { state: 'fulfilled', val: value };
        })
        .catch(function (reason) {
          return { state: 'rejected', reason: reason };
        });
    })
  );
};

/**
 * @author Vipul Garg <vipul.garg@timesinternet.in>
 * @returns get difference between model before and after update
 */
const getModalDiff = (model) => {
  let obj = {};
  if (model._changed.size != 0) {
    let updatedObj = model.dataValues;
    let oldObj = model._previousDataValues;
    model._changed.forEach(function (value) {
      obj[value] = { old: oldObj[value], curr: updatedObj[value] };
    });
  }
  return obj;
};

const unixDate = (date) => {
  if (!date) {
    date = Date.now();
  }

  var date = new Date(date);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
};

/**
 * Return file name
 * @param mediaType
 * @author Ashish Anand <ashish.anand@timesinternet.in>
 */
const fileName = (mediaQueryParam, file) => {
  let ext = path.extname(file.originalname);
  let basename = path.parse(file.originalname).name;
  let clean_file = slugify(basename, { lower: true });
  let mediaType = mediaQueryParam.mediaType;
  switch (mediaType) {
    case 'client':
      clean_file = clean_file + '_' + crypto.createHash('md5').update(Date.now().toString()).digest('hex') + ext;
      break;
    default:
      clean_file = clean_file + '_' + crypto.createHash('md5').update(Date.now().toString()).digest('hex') + ext;
      break;
  }
  return clean_file;
};

const RoundTwoDecimal = (amt) => Math.round(amt * 100) / 100;

const RoundThreeDecimal = (amt) => Math.round(amt * 1000) / 1000;

const CalcRoundOffAmt = (netAmt) => {
  if (Math.ceil(netAmt) == netAmt) {
    return 0;
  } else if (Math.ceil(netAmt) - netAmt > 0.5) {
    return RoundTwoDecimal(Math.floor(netAmt) - netAmt);
  } else {
    return RoundTwoDecimal(Math.ceil(netAmt) - netAmt);
  }
};

/**
 * Pad string with  pass value
 * @param {*} num
 * @param {*} places
 * @returns
 */
const PadString = (num, places, pad = '0') => String(num).padStart(places, pad);

const GetFiscalDateRange = () => {
  var today = new Date();
  let start_date, end_date;
  if (today.getMonth() + 1 <= 3) {
    start_date = new Date();
    start_date.setDate(1);
    start_date.setMonth(3);
    start_date.setFullYear(today.getFullYear() - 1);
    start_date.setSeconds(0);
    start_date.setMilliseconds(0);

    end_date = new Date();
    end_date.setDate(31);
    end_date.setMonth(2);
    end_date.setFullYear(today.getFullYear());
    end_date.setSeconds(59);
    end_date.setMilliseconds(999);
  } else {
    start_date = new Date();
    start_date.setDate(1);
    start_date.setMonth(3);
    start_date.setFullYear(today.getFullYear());
    start_date.setSeconds(0);
    start_date.setMilliseconds(0);

    end_date = new Date();
    end_date.setDate(31);
    end_date.setMonth(2);
    end_date.setFullYear(today.getFullYear() + 1);
    end_date.setSeconds(59);
    end_date.setMilliseconds(999);
  }
  return { start_date, end_date };
};

const DownloadFileHttps = async (url, dest) => {
  let dirpath = path.dirname(dest);
  await fileSystem.promises.mkdir(dirpath, { recursive: true });
  return new Promise((resolve, reject) => {
    var file = fileSystem.createWriteStream(dest, {});
    var request = https
      .get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            resolve(dest);
          });
        });
      })
      .on('error', function (err) {
        console.error('- file download err ', err);
        fileSystem.unlink(dest, () => {
          reject(err.message);
        });
      });
  });
};

const filterData = (value, arr) => {
  if (arr) {
    if (Array.isArray(value)) {
      const lists = [];
      for (let i = 0; i < value.length; i += 1) {
        const filter = arr.filter((list) => value[i] === list.id);
        lists.push(filter[0]);
      }
      return lists;
    }
    // eslint-disable-next-line
    const filter = arr.filter((list) => {
      return list && list.id && parseInt(value, 10) === list.id;
    });
    return filter[0];
  }
  return [];
};

module.exports = {
  getMediaPath,
  commonUpload,
  unixDate,
  PromiseAny,
  AllSettled,
  getModalDiff,
  fileName,
  RoundTwoDecimal,
  RoundThreeDecimal,
  PadString,
  CalcRoundOffAmt,
  GetFiscalDateRange,
  DownloadFileHttps,
  filterData,
};
