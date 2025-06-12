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

    init(): void {},

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
      if (field === "position") {
        this.triggerEvent("positionChange", detail);
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
