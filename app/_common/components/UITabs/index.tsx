"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type UITabType = {
  id: string;
  name: string;
  content?: JSX.Element;
  icon?: IconName;
  iconComp?: JSX.Element;
};

type IconName = keyof typeof Icons;

export default function UITabs({
  vertical = false,
  tabs,
  onClick,
  defaultValue,
  isKeyDisable = false,
}: {
  isKeyDisable?: boolean;
  vertical?: boolean;
  tabs: UITabType[];
  // eslint-disable-next-line no-unused-vars
  onClick: (value: string) => void;
  defaultValue: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const getTabPosition = (tabId: string) => {
    const tab = tabRefs.current[tabId];
    const container = containerRef.current;
    if (tab && container) {
      const rect = tab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return vertical
        ? {
            top: rect.top - containerRect.top,
            height: rect.height,
          }
        : {
            left: rect.left - containerRect.left,
            width: rect.width,
          };
    }
    return vertical
      ? {
          top: 0,
          height: 0,
        }
      : {
          left: 0,
          width: 0,
        };
  };

  const handleTabClick = (tabId: string) => {
    onClick(tabId);
    setActiveTab(tabId);
  };

  const handleTabHover = (tabId: string) => {
    setHoveredTab(tabId);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredTab(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isKeyDisable)
        if (
          event.key === (vertical ? "ArrowDown" : "ArrowRight") ||
          event.key === (vertical ? "ArrowUp" : "ArrowLeft")
        ) {
          const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
          let newIndex = currentIndex;
          if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) {
            newIndex = (currentIndex + 1) % tabs.length;
          } else {
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          }
          onClick(tabs[newIndex].id);
          setActiveTab(tabs[newIndex].id);
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, vertical]);

  useEffect(() => {
    setActiveTab(defaultValue || tabs[0].id);
  }, [defaultValue]);

  const isContentPreset = !!tabs.filter((tab) => tab.content)?.length;
  return (
    <div className={`w-full ${vertical ? "flex" : ""}`}>
      <div
        className={`w-full ${vertical ? "border-none" : "border-b"} border-gray-200 ${
          vertical ? "pr-2" : "pb-2"
        }`}
      >
        <div
          ref={containerRef}
          className={`relative ${vertical ? "flex flex-col" : "flex"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {isHovering && hoveredTab && (
              <motion.div
                key="hoverIndicator"
                className="pointer-events-none absolute rounded-md bg-gray-200"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.5,
                  ...getTabPosition(hoveredTab),
                }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  zIndex: 10,
                  ...(vertical ? { left: 0, right: 0 } : { top: 0, bottom: 0 }),
                }}
              />
            )}
          </AnimatePresence>
          {tabs.map((tab) => {
            const Icon = (
              tab?.icon ? Icons[tab?.icon] : <></>
            ) as React.ElementType;
            return (
              <button
                key={tab.id}
                // leftIcon={tab?.icon ? <Icon /> : null}
                ref={(el) => {
                  tabRefs.current[tab.id] = el; // Correctly store the reference without returning anything
                }}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={() => handleTabHover(tab.id)}
                className={`relative z-20 px-4 py-2 text-sm font-medium outline-none transition-colors ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                } ${vertical ? "flex items-center gap-3 text-left" : ""}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                <span>
                  {tab.iconComp
                    ? tab.iconComp
                    : tab.icon && Icon && <Icon size={16} />}
                </span>
                <span>{tab.name}</span>
              </button>
            );
          })}
          <motion.div
            key="activeIndicator"
            className={`absolute bg-primary ${
              vertical ? "-left-2 w-0.5" : "-bottom-2 h-0.5"
            }`}
            initial={false}
            animate={getTabPosition(activeTab)}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={vertical ? { width: "2px" } : { height: "2px" }}
          />
        </div>
      </div>
      {isContentPreset && (
        <div className={`${vertical ? "ml-4 flex-1" : "mt-4"}`}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${activeTab === tab.id ? "block" : "hidden"}`}
              role="tabpanel"
              aria-labelledby={tab.id}
            >
              {tab.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
