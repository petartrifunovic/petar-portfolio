'use client';

import React, { ReactNode, useId, useMemo, useRef, useState } from 'react';
import { TabProps } from './Tab';

type TabsProps = {
  children: ReactNode;
  defaultIndex?: number;
  className?: string;
};

const Tabs = ({ children, defaultIndex = 0, className = '' }: TabsProps) => {
  const tabs = useMemo(() => React.Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const groupId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTab = tabs[activeIndex] as
    | React.ReactElement<TabProps>
    | undefined;

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: tabs.length - 1,
    };

    const target = moves[event.key];

    if (target === undefined) return;

    event.preventDefault();

    const next = (target + tabs.length) % tabs.length;

    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        role='tablist'
        onKeyDown={onKeyDown}
        className='flex items-center border-b border-border'
      >
        {tabs.map((tab, index) => {
          const tabElement = tab as React.ReactElement<TabProps>;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type='button'
              role='tab'
              id={`${groupId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={isActive ? `${groupId}-panel` : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer relative px-4 pb-4 transition-colors duration-200 ${
                isActive ? 'text-title' : 'text-text hover:text-title'
              }`}
            >
              {tabElement.props.title}

              {isActive && (
                <span className='absolute left-0 bottom-0 h-0.5 w-full bg-primary' />
              )}
            </button>
          );
        })}
      </div>
      <div
        role='tabpanel'
        id={`${groupId}-panel`}
        aria-labelledby={`${groupId}-tab-${activeIndex}`}
        className='pt-6'
      >
        {activeTab?.props.children}
      </div>
    </div>
  );
};

export default Tabs;
