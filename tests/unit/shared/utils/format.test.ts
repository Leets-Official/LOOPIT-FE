import { formatChatTime, formatDate, formatDateLabel, formatPrice, formatRelativeTime } from '@shared/utils/format';

describe('formatPrice', () => {
  it('숫자를 한국 원화 형식으로 변환', () => {
    expect(formatPrice(1000)).toBe('1,000원');
    expect(formatPrice(1234567)).toBe('1,234,567원');
  });

  it('0원 처리', () => {
    expect(formatPrice(0)).toBe('0원');
  });

  it('큰 숫자 처리', () => {
    expect(formatPrice(100000000)).toBe('100,000,000원');
  });
});

describe('formatDate', () => {
  it('ISO 날짜를 YYYY.MM.DD 형식으로 변환', () => {
    expect(formatDate('2024-01-15T10:30:00')).toBe('2024.01.15');
    expect(formatDate('2024-12-31T23:59:59')).toBe('2024.12.31');
  });

  it('잘못된 날짜는 원본 반환', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
  });

  it('월/일 한 자리수 패딩 처리', () => {
    expect(formatDate('2024-01-05')).toBe('2024.01.05');
    expect(formatDate('2024-09-01')).toBe('2024.09.01');
  });
});

describe('formatDateLabel', () => {
  it('ISO 날짜를 YYYY년 MM월 DD일 형식으로 변환', () => {
    expect(formatDateLabel('2024-01-15T10:30:00')).toBe('2024년 01월 15일');
  });

  it('null이면 빈 문자열 반환', () => {
    expect(formatDateLabel(null)).toBe('');
  });

  it('잘못된 날짜는 원본 반환', () => {
    expect(formatDateLabel('invalid-date')).toBe('invalid-date');
  });
});

describe('formatChatTime', () => {
  it('오전 시간 표시', () => {
    const result = formatChatTime('2024-01-15T09:30:00', false, false);
    expect(result).toBe('오전 09:30');
  });

  it('오후 시간 표시', () => {
    const result = formatChatTime('2024-01-15T14:30:00', false, false);
    expect(result).toBe('오후 02:30');
  });

  it('정오(12시) 표시', () => {
    const result = formatChatTime('2024-01-15T12:00:00', false, false);
    expect(result).toBe('오후 12:00');
  });

  it('자정(0시) 표시', () => {
    const result = formatChatTime('2024-01-15T00:30:00', false, false);
    expect(result).toBe('오전 12:30');
  });

  it('발신자이고 읽음 상태면 "읽음" 표시', () => {
    const result = formatChatTime('2024-01-15T14:30:00', true, true);
    expect(result).toBe('읽음 · 오후 02:30');
  });

  it('발신자가 아니면 읽음 상태여도 "읽음" 미표시', () => {
    const result = formatChatTime('2024-01-15T14:30:00', true, false);
    expect(result).toBe('오후 02:30');
  });

  it('발신자이지만 안 읽음이면 "읽음" 미표시', () => {
    const result = formatChatTime('2024-01-15T14:30:00', false, true);
    expect(result).toBe('오후 02:30');
  });
});

describe('formatRelativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('1분 미만이면 "1분 전" 반환', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);

    expect(formatRelativeTime('2024-01-15T12:00:00')).toBe('1분 전');
    expect(formatRelativeTime('2024-01-15T11:59:30')).toBe('1분 전');
  });

  it('분 단위 표시', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);

    expect(formatRelativeTime('2024-01-15T11:55:00')).toBe('5분 전');
    expect(formatRelativeTime('2024-01-15T11:30:00')).toBe('30분 전');
  });

  it('시간 단위 표시', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);

    expect(formatRelativeTime('2024-01-15T10:00:00')).toBe('2시간 전');
    expect(formatRelativeTime('2024-01-15T00:00:00')).toBe('12시간 전');
  });

  it('일 단위 표시', () => {
    const now = new Date('2024-01-15T12:00:00');
    vi.setSystemTime(now);

    expect(formatRelativeTime('2024-01-14T12:00:00')).toBe('1일 전');
    expect(formatRelativeTime('2024-01-10T12:00:00')).toBe('5일 전');
  });

  it('잘못된 날짜는 빈 문자열 반환', () => {
    expect(formatRelativeTime('invalid-date')).toBe('');
  });
});
