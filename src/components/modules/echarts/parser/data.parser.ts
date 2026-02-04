import { head } from "lodash";
import moment from "moment";

export const flatModel = ({ data = [] }) => {
  const keys = Object.keys(head(data) || {})
  const the_key = keys.filter((x: any) => x !== 'value')
  const remodel = {
    features: data,
    fields: [
      { name: head(the_key) || "key", alias: head(the_key) || "key", field: head(the_key) || "key", type: "string" },
      { name: "value", alias: "value", field: "value", type: "number" }
    ]
  }

  return remodel
}

export const flatModelDate = ({ data = [], interval = '' }) => {
  const remodel = {
    features: data?.map((f: any) => {
      return {
        key: convertionDate(f?.key, interval),
        value: f?.value,
      }
    }),
    fields: [
      { name: 'key', alias: 'key', field: 'key', type: 'string' },
      { name: 'value', alias: 'value', field: 'value', type: 'number' },
    ],
    original: data,
  }
  return remodel
}
export function convertionDate(data: any, interval: any) {
  const date = new Date(data)
  switch (interval) {
    case 'hour':
      return date.toLocaleString('id', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric', year: 'numeric' })
      break
    case 'year':
      return (
        date.toLocaleString('id', { day: '2-digit' }) +
        ' ' +
        date.toLocaleString('id', { month: 'short' }) +
        ' ' +
        date.toLocaleString('id', { year: 'numeric' })
      )
      break
    default:
      return date.toLocaleString('id', { day: 'numeric', month: 'numeric', year: 'numeric' })
      break
  }
}

export const flatModelTimeMoment = ({ data = [] }) => {
  const remodel = {
    features: data?.map((f: any) => {
      return {
        key: moment(f?.key).format("DD MMM YYYY - HH:mm:ss"),
        value: f?.value,
      }
    }),
    fields: [
      { name: 'key', alias: 'key', field: 'key', type: 'string' },
      { name: 'value', alias: 'value', field: 'value', type: 'number' },
    ],
    original: data,
  }
  return remodel
}


export const flatModelDateMoment = ({ data = [], interval = '' }) => {
  const remodel = {
    features: data?.map((f: any) => {
      return {
        key: moment(f?.key).format(interval == 'year' ? 'YYYY' : interval == 'month' ? 'MMM YYYY' : interval == 'hour' ? "HH:mm:ss" : "DD MMM YYYY"),
        value: f?.value,
      }
    }),
    fields: [
      { name: 'key', alias: 'key', field: 'key', type: 'string' },
      { name: 'value', alias: 'value', field: 'value', type: 'number' },
    ],
    original: data,
  }
  return remodel
}



export const flatModelYearMoment = ({ data = [] }) => {
  const remodel = {
    features: data?.map((f: any) => {
      return {
        key: moment(f?.key).format('YYYY'),
        value: f?.value,
      }
    }),
    fields: [
      { name: 'key', alias: 'key', field: 'key', type: 'string' },
      { name: 'value', alias: 'value', field: 'value', type: 'number' },
    ],
    original: data,
  }
  return remodel
}

export const stackedSingleModel = ({ data = [] }: any) => {
  const datas = dataJoin(data)
  const keys = Array.from(new Set(datas.flatMap((item: any) => Object.keys(item))));

  const remodel = {
    features: datas,
    fields: keys?.map((xField: any) => {
      return {
        name: xField,
        alias: xField,
        field: xField,
        type: 'number',
      }
    }),
  }

  return remodel

}

function dataJoin(datas: any) {
  const tmpData = datas.flatMap((data: any) => ({ key: data.key, field: data, value: data.value }))
  return mappinpDataJoin(tmpData);
}

function mappinpDataJoin(datas: any) {
  const result = datas.reduce((acc: any, item: any) => {
    const field = item?.field

    if (!acc[field]) {
      acc[field] = {
        field: field,
      }
    }

    acc[field][item?.key] = (acc[field][item?.key] || 0) + item?.value

    return acc
  }, {})
  return Object.values(result)
}

export const stackedNestedModel = ({ data = [] }: any) => {
  const datas = dataJoinNestedModel(data)
  const keys = Array.from(new Set(datas.flatMap((item: any) => Object.keys(item))));

  const remodel = {
    features: datas,
    fields: keys?.map((xField: any) => {
      return {
        name: xField,
        alias: xField,
        field: xField,
        type: 'number',
      }
    }),
  }

  return remodel

}

function dataJoinNestedModel(datas: any) {
  const tmpData = datas.flatMap((data: any) => data?.data?.map((entry: any) => ({ key: entry?.key, field: data?.key, value: entry.value })))
  return mappinpDataJoin(tmpData);
}

export const stackedModelDateMoment = ({ data = [], interval = '' }: any) => {
  const datas = dataJoinDate(data, interval);
  const keys = Array.from(
    new Set(datas?.flatMap((item: any) => Object.keys(item)))
  );

  const remodel = {
    features: datas,
    fields: keys?.map((xField: any) => {
      return {
        name: xField,
        alias: xField,
        field: xField,
        type: xField == 'created_at' ? 'string' : 'number',
      };
    }),
  };

  return remodel;
};

function dataJoinDate(datas: any, interval: any) {
  const tmpData = datas.flatMap((data: any) => data?.data?.map((entry: any) => ({ created_at: data.key, key: entry.key, value: entry.value })))
  return mappinpDataJoinDate(tmpData, interval);
}


function mappinpDataJoinDate(datas: any, interval: any) {
  const result = datas.reduce((acc: any, item: any) => {
    const createdAt = item?.created_at;

    if (!acc[createdAt]) {
      acc[createdAt] = {
        created_at: moment(createdAt).format(interval == 'year' ? 'YYYY' : interval == 'month' ? 'MMM YYYY' : interval == 'hour' ? "HH:mm:ss" : "DD MMM YYYY"),
      };
    }

    acc[createdAt][item?.key] = (acc[createdAt][item?.key] || 0) + item?.value;

    return acc;
  }, {});
  return Object.values(result);
}