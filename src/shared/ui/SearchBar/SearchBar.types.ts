import type { ComponentPropsWithoutRef } from 'react';

type ControlledProps = {
  value: string;
  defaultValue?: never;
};

type UncontrolledProps = {
  value?: never;
  defaultValue?: string;
};

export type SearchBarState = 'default' | 'filled';

export type SearchBarProps = Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'defaultValue'> &
  (ControlledProps | UncontrolledProps) & {
    /**
     * true면 입력값 유무로 default/filled 자동 전환
     * (요구사항: default로 보이다가 입력하면 filled)
     */
    autoFilled?: boolean;

    /**
     * 강제로 상태 고정하고 싶을 때만 사용 (기본은 auto)
     */
    state?: SearchBarState;

    /**
     * wrapper에 추가 클래스 주고 싶을 때
     */
    className?: string;
  };
