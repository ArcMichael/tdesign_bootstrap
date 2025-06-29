Component({
  options: {
    multipleSlots: true,
    styleIsolation: 'apply-shared',
  },
  properties: {
    visible: { type: Boolean, value: false },
    icon: { type: String, value: '' },
    title: { type: String, value: '' },
    subtitle: { type: String, value: '' },
    freeCount: { type: Number, value: 0 },
    buttonText: { type: String, value: '知道了' },
  },
  methods: {
    onClose() {
      this.triggerEvent('close');
    },
    onConfirm() {
      this.triggerEvent('confirm');
    },
  },
});
