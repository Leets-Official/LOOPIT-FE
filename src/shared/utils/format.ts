export const formatPrice = (price: number): string => {
  return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
};

export const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const formatDateLabel = (value: string | null): string => {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};

export const formatChatTime = (sendTime: string, isRead: boolean, isSender: boolean): string => {
  const date = new Date(sendTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? '오후' : '오전';
  const hourLabel = `${hours % 12 === 0 ? 12 : hours % 12}`.padStart(2, '0');
  const minuteLabel = `${minutes}`.padStart(2, '0');
  const timeStr = `${meridiem} ${hourLabel}:${minuteLabel}`;
  return isSender && isRead ? `읽음 · ${timeStr}` : timeStr;
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 60) {
    return `${Math.max(diffMinutes, 1)}분 전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
};
