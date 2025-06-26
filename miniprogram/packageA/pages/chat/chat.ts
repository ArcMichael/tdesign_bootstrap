import { messages } from './chat.config';

export interface Message {
  id: string;
  text: string;
  timestamp: string; // ISO string or timestamp string
  isMe: boolean;
  avatar: string;
}

Page({
  data: {
    messages,
    scrollTo: '',
  },

  async onShow() {
    const processed = this.processMessages(messages);
    this.setData({ messages: processed });
  },

  async onSendMessage() {
    const newId = `msg-${Date.now()}`;
    this.setData({
      messages: [...this.data.messages],
      scrollTo: newId,
    });
  },

  formatTimestamp(raw: string): string {
    const date = new Date(raw);
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    const h = `${date.getHours()}`.padStart(2, '0');
    const min = `${date.getMinutes()}`.padStart(2, '0');
    return `${y}年${m}月${d}日 ${h}:${min}`;
  },

  processMessages(messages: Message[]): (Message & {
    showTimestamp: boolean;
    timestampFormatted: string;
  })[] {
    return messages.map((msg, index, arr) => {
      const prev = arr[index - 1];
      const showTimestamp =
        !prev ||
        new Date(msg.timestamp).getTime() - new Date(prev.timestamp).getTime() > 5 * 60 * 1000;
      return {
        ...msg,
        showTimestamp,
        timestampFormatted: this.formatTimestamp(msg.timestamp),
      };
    });
  },

  // 假设 messages 为数组，包含 timestamp 字段
  async shouldDisplayTime(currentMsg: Message, previousMsg?: Message): Promise<boolean> {
    if (!previousMsg) return true;

    const curTime = new Date(currentMsg.timestamp).getTime();
    const prevTime = new Date(previousMsg.timestamp).getTime();

    const diffMinutes = Math.floor((curTime - prevTime) / 1000 / 60);

    return diffMinutes > 5; // 超过 5 分钟就显示
  },
});
