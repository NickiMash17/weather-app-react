import React from 'react';
import { Nav } from 'react-bootstrap';

interface NavTabsProps {
  activeTab: string;
  onSelect: (tab: string) => void;
}

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onSelect }) => {
  return (
    <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => onSelect(k || 'current')} className="mb-4">
      <Nav.Item>
        <Nav.Link eventKey="current">Current</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="forecast">Forecast</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="details">Details</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="settings">Settings</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavTabs;