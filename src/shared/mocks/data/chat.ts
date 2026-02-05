import type { ChatThread, ThreadContent } from '@shared/types/chat';

export const STATUS_OPTIONS = ['판매중', '예약중', '판매완료'] as const;

export const INITIAL_STATUS_BY_THREAD: Record<string, (typeof STATUS_OPTIONS)[number]> = {
  'thread-1': '판매중',
  'thread-2': '판매중',
  'thread-3': '예약중',
  'thread-4': '판매완료',
};

export const CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-1',
    name: '김애옹',
    avatar: '/profile.jpg',
    preview: '넵 구매 가능합니다!',
    dateLabel: '2026년 02월 10일',
    productThumbnail: '/iphone12.png',
  },
  {
    id: 'thread-2',
    name: '박사과',
    avatar: '/profile-sample.jpg',
    preview: '판매되었나요?',
    dateLabel: '2026년 02월 09일',
    productThumbnail: '/galaxys20.png',
    hasAlert: true,
  },
  {
    id: 'thread-3',
    name: '이댕댕',
    avatar: '/profile.jpg',
    preview: '앗 네고는 조금 어려울 것 같습니당... ㅜㅜ',
    dateLabel: '2026년 02월 08일',
    productThumbnail: '/iphone11.png',
  },
  {
    id: 'thread-4',
    name: '강딸기',
    avatar: '/profile-sample.jpg',
    preview: '네 더 보내드릴게요!',
    dateLabel: '2026년 02월 08일',
    productThumbnail: '/iphone12.png',
  },
];

export const THREAD_CONTENT: Record<string, ThreadContent> = {
  'thread-1': {
    product: {
      image: '/iphone12.png',
      title: '아이폰 17 256GB 실버',
      price: '1,450,000원',
      date: '2026.02.09',
    },
    timeline: [
      {
        type: 'message',
        id: 't1-msg-1',
        role: 'sender',
        message: '안녕하세요 ㅎㅎ 혹시 구매할 수 있나요??',
        meta: '읽음 · 오후 11:50',
        metaDateTime: '2026-02-10T23:50:00+09:00',
      },
      {
        type: 'message',
        id: 't1-msg-2',
        role: 'receiver',
        message: '넵 구매 가능합니다!',
        meta: '오후 01:30',
        metaDateTime: '2026-02-11T13:30:00+09:00',
      },
    ],
  },
  'thread-3': {
    product: {
      image: '/iphone11.png',
      title: '아이폰 14 MAX',
      price: '580,000원',
      date: '2026.02.07',
    },
    timeline: [
      {
        type: 'message',
        id: 't3-msg-1',
        role: 'sender',
        message: '안녕하세요!\n혹시 예약자 있나요?',
        meta: '읽음 · 오후 11:50',
        metaDateTime: '2026-02-08T23:50:00+09:00',
      },
      {
        type: 'date',
        id: 't3-date-1',
        label: '2026년 02월 08일 일요일',
      },
      {
        type: 'message',
        id: 't3-msg-2',
        role: 'receiver',
        message: '아직 없습니다!',
        meta: '오전 01:30',
        metaDateTime: '2026-02-09T01:30:00+09:00',
      },
      {
        type: 'message',
        id: 't3-msg-3',
        role: 'sender',
        message: '혹시 네고 가능할까요?',
        meta: '읽음 · 오후 02:50',
        metaDateTime: '2026-02-09T14:50:00+09:00',
      },
      {
        type: 'message',
        id: 't3-msg-4',
        role: 'receiver',
        message: '앗 네고는 조금 어려울 것 같습니당... ㅜㅜ',
        meta: '오후 04:30',
        metaDateTime: '2026-02-09T16:30:00+09:00',
      },
    ],
  },
  'thread-2': {
    product: {
      image: '/galaxys20.png',
      title: '갤럭시 S20 128GB',
      price: '420,000원',
      date: '2026.02.08',
    },
    timeline: [
      {
        type: 'message',
        id: 't2-msg-1',
        role: 'receiver',
        message: '판매되었나요?',
        meta: '오후 03:12',
        metaDateTime: '2026-02-09T15:12:00+09:00',
      },
    ],
  },
  'thread-4': {
    product: {
      image: '/iphone12.png',
      title: '아이폰 13 mini',
      price: '360,000원',
      date: '2026.02.06',
    },
    timeline: [
      {
        type: 'message',
        id: 't4-msg-1',
        role: 'sender',
        message: '안녕하세요, 사진 더 받을 수 있을까요?',
        meta: '읽음 · 오후 02:20',
        metaDateTime: '2026-02-08T14:20:00+09:00',
      },
      {
        type: 'message',
        id: 't4-msg-2',
        role: 'receiver',
        message: '네 더 보내드릴게요!',
        meta: '오후 02:28',
        metaDateTime: '2026-02-08T14:28:00+09:00',
      },
    ],
  },
};
