import { motion } from 'framer-motion';

interface NavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavTabs = ({ activeTab, onTabChange }: NavTabsProps) => {
  const tabs = [
    { id: 'current', label: 'Current' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="underline"
              className="underline"
              initial={false}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default NavTabs;