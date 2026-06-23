'use client';

import React, { ReactNode, useMemo, useState } from 'react';
import { TabProps } from './Tab';

type TabsProps = {
  children: ReactNode;
  defaultIndex?: number;
  className?: string;
};

const Tabs = ({ children, defaultIndex = 0, className = '' }: TabsProps) => {
  const tabs = useMemo(() => React.Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const activeTab = tabs[activeIndex] as
    | React.ReactElement<TabProps>
    | undefined;

  return (
    <div className={className}>
      <div className='flex items-center border-b border-border'>
        {tabs.map((tab, index) => {
          const tabElement = tab as React.ReactElement<TabProps>;
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type='button'
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

      <div className='pt-6'>{activeTab?.props.children}</div>
    </div>
  );
};

export default Tabs;
