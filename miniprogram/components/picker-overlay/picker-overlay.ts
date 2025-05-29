Component({
  properties: {
    visible: Boolean,
    title: String,
    fieldKey: String,
    options: Array,
    currentValue: Object,
  },
  methods: {
    onConfirm(e: any) {
      const { label, value } = e.detail;
      this.triggerEvent("confirm", {
        field: this.properties.fieldKey,
        selected: { label, value },
      });
    },
    onColumnChange(e: any) {
      // 这里可以做联动或实时显示
      this.triggerEvent("columnchange", e.detail);
    },
    onCancel() {
      this.triggerEvent("cancel");
    },
  },
});
