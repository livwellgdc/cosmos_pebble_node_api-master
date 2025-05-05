// import httpStatus from 'http-status';
// import ApiError from '../utils/ApiError';
import { Pebble, WatchInfo, WatchFaces, ForceUpdate, Problems, Banner, Product, StaticContent, WatchFacesCategory, ProductBrand } from '../models';
// import { GET } from '../helpers/fetch';
// import config from '../config/config';
import { filterData } from '../helpers/helper';
import { sequelize } from '../config/db';

const axios = require('axios');
// const sanitizeHtml = require('sanitize-html');

let categoryMap = {};

const getList = async (query, body) => {
  const data = await Pebble.getList(query);

  if (!data) {
    return null;
  }

  const finalData = { items: data.rows, meta: { total: data.count } };
  return finalData;
};

const sanitizeFeedResponse = (data) => {
  let { records, media, categories } = data;
  let sanitizedData = [];
  for (const record of records) {
    let image = filterData(record.media_ids.verticle_pic_id, media)?.media_path;

    let horizontalImage =
      filterData(record.media_ids.large_pic_id, media)?.media_path ||
      filterData(record.media_ids.thumbnail_id, media)?.media_path;

    const categoryId = filterData(record.category_id, categories)?.name;

    sanitizedData.push({
      content_id: record.content_id,
      summary: record.summary,
      headline: record.headline1,
      updated_at_display: record.date_data.publish_date_display,
      url: `https://www.mensxp.com${record.flags.is_ampstory ? '/ampstory/' : ''}${record.guid
        }?utm_source=pebbleappfeed&utm_medium=app&noheader=1`,
      image: image ? `https://img.mensxp.com/media${image}` : '',
      horizontalImage: horizontalImage ? `https://img.mensxp.com/media${horizontalImage}` : '',
      category_id: categoryId,
    });
  }

  return sanitizedData;
};

const fetchCategoryIds = async (category) => {
  const categories = category?.split(',');

  const fetchCategoryData = async () => {
    const url = 'https://frontend-api-navik.mensxp.com/v1/api/category/list_all';
    try {
      const response = await axios.get(url);
      const records = response.data.data.records;

      records.forEach((record) => {
        if (!record.name || !record.id) return;

        categoryMap[record.name.toLowerCase().replace(/ /g, '_')] = record.id;
        if (record.child) {
          record.child.forEach((child) => {
            categoryMap[child.name.toLowerCase().replace(/ /g, '_')] = child.id;
          });
        }
      });
    } catch (error) {
      console.error('Error fetching data');
    }
  };

  if (!Object.keys(categoryMap).length) {
    await fetchCategoryData();
  }

  const categoryIds = categories
    ?.map((cat) => categoryMap[cat.toLowerCase().replace(/ /g, '_')])
    .filter((id) => id)
    .join(',');

  if (!categoryIds) return '101,104,49,368,15';
  return categoryIds;
};

const getFeed = async (query, body) => {
  let { page, is_ampstory, nocache, is_video, category } = query;

  if (!page) {
    page = 1;
  }
  const content_type_id = is_video ? 51 : 1;
  const category_ids = await fetchCategoryIds(category);

  try {
    let url = `https://frontend-api-navik.mensxp.com/v1/api/content/latest?locale_id=1&content_type_id=${content_type_id}&category_ids=${category_ids}&page=${page}`;

    if (is_ampstory) {
      url += '&is_ampstory=1';
    }
    if (nocache) {
      url += '&nocache=1';
    }

    const response = await axios.get(url);

    let data = response.data.data;
    if (data.length == 0) {
      return null;
    }

    let sanitizedData = {};
    sanitizedData.records = sanitizeFeedResponse(data);
    sanitizedData.paginate = data.paginate;
    return sanitizedData;
  } catch (error) {
    throw new Error(`Error fetching data`);
  }
};

const getWatchInfo = async (query, body) => {
  const data = await WatchInfo.getWatchInfo(query);

  if (!data) {
    return null;
  }
  const finalData = { records: data, meta: { total: data.length } };
  return data;
};

const getWatchFaces = async (query, body) => {
  const data = await WatchFaces.filterWatchFaces(query);

  if (!data) {
    return null;
  }

  const finalData = { records: data, meta: { total: data.length } };
  return finalData;
};

const getForceUpdate = async (query, body) => {
  const data = await ForceUpdate.getUpdate(query);

  if (!data) {
    return null;
  }

  const finalData = { records: data, meta: { total: data.length } };
  return finalData;
};

const reportProblem = async (query, body, userAgent) => {
  const data = await Problems.report(query, body, userAgent);

  if (!data) {
    return null;
  }

  const finalData = { records: data };
  return finalData;
};

const getBanners = async (query, body) => {
  const data = await Banner.getBanners(query);

  if (!data) {
    return null;
  }

  const finalData = { banners: data };
  return finalData;
}

const getProducts = async (query) => {

  const data = await Product.getProducts(query);

  if (!data) {
    return null;
  }

  const finalData = {
    heading: 'Top Pick',
    products: data
  };
  return finalData;
}

const transformProductList = (data, map) => {
  const brandMap = new Map();
  map.forEach(brand => {
    brandMap.set(brand.brandName, { ...brand, heading: brand.brandName, records: [] });
  });
  data.forEach(product => {
    const brand = brandMap.get(product.brandName);
    if (brand) {
      brand.records.push(product);
    }
  });
  return Array.from(brandMap.values()).filter(brand => brand.records.length > 0);

}

const transformProductsCategoryWise = (data, brand) => {
  const map = new Map();
  data.forEach((p) => {
    if (!map.has(p.categoryName)) {
      map.set(p.categoryName, { ...brand, heading: p.categoryName, records: [] });
    }
    map.get(p.categoryName).records.push(p);
  })
  return Array.from(map.values());
}

const getProductList = async (query, res) => {
  const { brandName } = query;
  try {
    let brands;
    let data;
    if (!brandName) {
      brands = await ProductBrand.findAll(
        {
          order: [['rank', 'DESC']],
          attributes: ['brandName', 'brandLogo', 'colorCode', 'isViewMore'],
          raw: true
        }
      );
      data = await Product.findAll(
        {
          where: { isHighlight: 1 },
          order: [
            [sequelize.literal(`FIELD(brandName, ${brands.map(brand => `'${brand.brandName}'`).join(', ')})`), 'DESC'],
            ['rank', 'DESC'],
          ],
          raw: true,
          attributes: { exclude: ['created_at', 'updated_at'] },
        }
      );
    }
    else {
      brands = await ProductBrand.findAll(
        {
          where: { brandName: brandName },
          attributes: ['brandName', 'brandLogo', 'colorCode', 'isViewMore'],
          raw: true
        }
      );

      data = await Product.findAll(
        {
          where: { isHighlight: 1, brandName: brands[0].brandName },
          order: [
            ['categoryName'],
            ['rank', 'DESC']
          ],
          raw: true,
          attributes: { exclude: ['created_at', 'updated_at'] },
        }
      );

      return { products: transformProductsCategoryWise(data, brands[0]) }
    }

    if (!data) {
      return null;
    }

    return { products: transformProductList(data, brands) };
  } catch (error) {
    console.error('Error fetching watch faces:', error);
    // res.status(500).json({ code: 500, message: "Internal server error" });
  }
}

const getStaticContent = async (query) => {
  const data = await StaticContent.getStaticContent(query)
  if (!data) {
    return null;
  }

  const finalData = { content: data };
  return finalData;
}

function transformData(data) {
  const categoriesMap = {};
  let start = 0;
  let currentCat = null;

  const initializeCat = (cat) => {
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = {
        categoryName: cat,
        records: [],
      };
    }
    currentCat = cat;
  };

  for (let end = 0; end < data.length; end++) {
    const category = data[end].dataValues.category;

    if (currentCat !== category) {
      if (currentCat !== null) {
        categoriesMap[currentCat].records = data.slice(start, end);
      }
      initializeCat(category);
      start = end;
    }
  }

  // Add the last batch of records to the last category
  if (currentCat) {
    categoriesMap[currentCat].records = data.slice(start);
  }

  // Convert categoriesMap to an array
  return { categories: Object.values(categoriesMap) };
}

const getPrioritizeWatchFaces = async (query) => {
  const { sdkType, resolution, chipset } = query;

  const where = { sdkType, resolution }; 
  
  if (chipset) where.chipset = chipset;

  try {
    // getting category
    const categories = await WatchFacesCategory.findAll({
      where: { sdkType },
      order: ['rank'],
      attributes: ['category']
    });

    const cat = categories.map((c) => c.category);
    // getting all the watchfaces with ranking 
    const watchFaces = await WatchFaces.findAll({
      where,
      order: [
        [sequelize.literal(`FIELD(category, ${cat.map(cat => `'${cat}'`).join(', ')})`), 'DESC'],
        'category',
        sequelize.literal('CASE WHEN WatchFaces.rank IS NULL THEN 1 ELSE 0 END'),
        ['rank', 'DESC']
      ],
    })

    return transformData(watchFaces);
  } catch (error) {
    console.error('Error fetching watch faces:', error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
}

module.exports = {
  getList,
  getFeed,
  getWatchInfo,
  getWatchFaces,
  getForceUpdate,
  reportProblem,
  getBanners,
  getProducts,
  getProductList,
  getStaticContent,
  getPrioritizeWatchFaces
};
