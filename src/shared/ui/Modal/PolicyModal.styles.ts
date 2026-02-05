export const policyModalStyles = {
    container: [
        'fixed',
        'inset-0', // 전체 화면
        'z-[9999]', // 최상단 노출 보장
        'w-full',
        'h-full',
        'flex',
        'items-center',
        'justify-center',
        'bg-[rgba(0,0,0,0.30)]', // 배경 딤처리
    ].join(' '),

    content: [
        'w-[600px]',
        'max-w-[90vw]',
        'max-h-[80vh]',
        'relative',
        'flex',
        'flex-col',
        'gap-5',
        'rounded-(--radius-l)',
        'bg-white',
        'px-8',
        'py-6',
        'shadow-xl',
    ].join(' '),

    header: ['flex', 'items-center', 'justify-between', 'pb-4', 'border-b', 'border-gray-100'].join(' '),

    title: ['typo-title-3', 'text-gray-900'].join(' '),

    closeButton: ['p-2', 'hover:bg-gray-100', 'rounded-full', 'transition-colors'].join(' '),

    body: [
        'flex-1',
        'overflow-y-auto',
        'typo-body-2',
        'text-gray-600',
        'scrollbar-thin',
        'scrollbar-thumb-gray-300',
        'scrollbar-track-transparent',
        'whitespace-pre-wrap',
    ].join(' '),
};
