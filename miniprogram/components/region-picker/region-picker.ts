import { fetchArea } from "../../utils/api";

interface AreaNode {
  id: number;
  name: string;
  children: AreaNode[];
}
interface FetchAreaResponse {
  code: number;
  data: AreaNode[];
}

interface PickerChangeDetail {
  value: string[]; // ['110000','110100','110101']
  text: string[]; // '北京市 北京市 东城区'
}

// 你原来的 flat 结构
interface AreaListRaw {
  provinces: Record<string, string>;
  cities: Record<string, string>;
  counties: Record<string, string>;
}

let _areaList: AreaListRaw = {
  provinces: {},
  cities: {},
  counties: {},
};

const areaList: {
  provinces: Record<string, string>;
  cities: Record<string, string>;
  counties: Record<string, string>;
} = {
  provinces: {
    110000: "北京市",
    440000: "广东省",
  },
  cities: {
    110100: "北京市",
    440100: "广州市",
    440200: "韶关市",
    440300: "深圳市",
    440400: "珠海市",
    440500: "汕头市",
    440600: "佛山市",
  },
  counties: {
    110101: "东城区",
    110102: "西城区",
    110105: "朝阳区",
    110106: "丰台区",
    110107: "石景山区",
    110108: "海淀区",
    110109: "门头沟区",
    110111: "房山区",
    110112: "通州区",
    110113: "顺义区",
    110114: "昌平区",
    110115: "大兴区",
    110116: "怀柔区",
    110117: "平谷区",
    110118: "密云区",
    110119: "延庆区",
    440103: "荔湾区",
    440104: "越秀区",
    440105: "海珠区",
    440106: "天河区",
    440111: "白云区",
    440112: "黄埔区",
    440113: "番禺区",
    440114: "花都区",
    440115: "南沙区",
    440117: "从化区",
    440118: "增城区",
    440203: "武江区",
    440204: "浈江区",
    440205: "曲江区",
    440222: "始兴县",
    440224: "仁化县",
    440229: "翁源县",
    440232: "乳源瑶族自治县",
    440233: "新丰县",
    440281: "乐昌市",
    440282: "南雄市",
    440303: "罗湖区",
    440304: "福田区",
    440305: "南山区",
    440306: "宝安区",
    440307: "龙岗区",
    440308: "盐田区",
    440309: "龙华区",
    440310: "坪山区",
    440311: "光明区",
    440402: "香洲区",
    440403: "斗门区",
    440404: "金湾区",
    440507: "龙湖区",
    440511: "金平区",
    440512: "濠江区",
    440513: "潮阳区",
    440514: "潮南区",
    440515: "澄海区",
    440523: "南澳县",
    440604: "禅城区",
    440605: "南海区",
    440606: "顺德区",
    440607: "三水区",
    440608: "高明区",
  },
};

const getOptions = (
  obj: Record<string, string>,
  filter?: (opt: Option) => boolean
): Option[] => {
  const res: Option[] = Object.keys(obj).map((key) => ({
    value: key,
    label: obj[key],
  }));
  return filter ? res.filter(filter) : res;
};

const match = (
  v1: string | number,
  v2: string | number,
  size: number
): boolean => {
  return v1.toString().slice(0, size) === v2.toString().slice(0, size);
};

Component({
  data: {
    areaText: "" as string,
    areaValue: [] as string[],
    provinces: [] as Option[],
    cities: [] as Option[],
    counties: [] as Option[],
  },

  lifetimes: {
    async ready() {
      await this.initHometownAndLocationOptions();
      this.init();
    },
  },

  methods: {
    async initHometownAndLocationOptions(): Promise<void> {
      try {
        const response = (await fetchArea()) as FetchAreaResponse;
        if (response.code !== 0 || !Array.isArray(response.data)) {
          throw new Error("接口 data 格式不对");
        }

        const provinces: Record<string, string> = {};
        const cities: Record<string, string> = {};
        const counties: Record<string, string> = {};

        response.data.forEach((prov) => {
          const p = prov.id.toString();
          provinces[p] = prov.name;

          prov.children.forEach((cty) => {
            const c = cty.id.toString();
            cities[c] = cty.name;

            cty.children.forEach((cnty) => {
              const d = cnty.id.toString();
              counties[d] = cnty.name;
            });
          });
        });

        _areaList = { provinces, cities, counties };

        // this._areaList = { provinces, cities, counties };

        // const provinceOptions = getOptions(provinces);

        // this.setData({ provinces: provinceOptions });
        // console.log("orig", JSON.stringify(areaList.cities));
        // console.log("api", JSON.stringify(cities));

        const provinceOptions = Object.entries(provinces).map(
          ([value, label]) => ({ value, label })
        );
        const cityOptions = Object.entries(cities).map(([value, label]) => ({
          value,
          label,
        }));
        const countyOptions = Object.entries(counties).map(
          ([value, label]) => ({
            value,
            label,
          })
        );

        this.setData({
          provinces: provinceOptions,
          cities: cityOptions,
          counties: countyOptions,
        });
      } catch (err) {
        console.error("获取地区数据失败:", err);
      }
    },

    init(): void {
      const { provinces } = this.data;
      const { cities, counties } = this.getCities(provinces[0].value);

      this.setData({ cities, counties });
    },

    /**
     * 列联动：根据滚动的列和索引，重新筛选下一列数据
     */
    onColumnChange(
      e: WechatMiniprogram.CustomEvent<{ column: number; index: number }>
    ) {
      const { column, index } = e.detail;
      const { provinces, cities } = this.data;

      if (column === 0) {
        // 滚动省列
        const pCode = provinces[index].value;
        const filteredCities = Object.entries(_areaList.cities)
          .filter(([code]) => code.startsWith(pCode.slice(0, 2)))
          .map(([value, label]) => ({ value, label }));
        const firstCityCode = filteredCities[0]?.value;
        const filteredCounties = firstCityCode
          ? Object.entries(_areaList.counties)
              .filter(([code]) => code.startsWith(firstCityCode.slice(0, 4)))
              .map(([value, label]) => ({ value, label }))
          : [];
        this.setData({ cities: filteredCities, counties: filteredCounties });
      }
      if (column === 1) {
        // 滚动市列
        const cCode = cities[index].value;
        const filteredCounties = Object.entries(_areaList.counties)
          .filter(([code]) => code.startsWith(cCode.slice(0, 4)))
          .map(([value, label]) => ({ value, label }));
        this.setData({ counties: filteredCounties });
      }
    },

    getCities(provinceValue: string): { cities: Option[]; counties: Option[] } {
      const cities = getOptions(areaList.cities, (city) =>
        match(city.value, provinceValue, 2)
      );
      const counties = this.getCounties(cities[0].value);

      return { cities, counties };
    },

    getCounties(cityValue: string): Option[] {
      return getOptions(areaList.counties, (county) =>
        match(county.value, cityValue, 4)
      );
    },

    onPickerChange(e: WechatMiniprogram.PickerChange): void {
      const codes: string[] = e.detail.value as string[]; // 直接拿到 code 数组
      const { provinces, cities, counties, field } = this.data;

      const labels = codes.map((code, idx) => {
        const list = [provinces, cities, counties][idx];
        const found = list.find((opt) => opt.value === code);
        return found ? found.label : "";
      });

      this.setData({
        areaVisible: false,
      });

      const detail: PickerChangeDetail = {
        value: codes,
        text: labels,
      };

      if (field === "hometown") {
        this.triggerEvent("hometownChange", detail);
      }
      if (field === "location") {
        this.triggerEvent("locationChange", detail);
      }
    },

    onPickerCancel(e: WechatMiniprogram.PickerCancel): void {
      console.log("picker cancel", e.detail);
      this.setData({
        areaVisible: false,
      });

      if (this.data.areaValue.length) return;
      this.init();
    },

    onAreaPicker(field: string) {
      // location or hometown
      this.setData({ areaVisible: true, field });
    },
  },
});
