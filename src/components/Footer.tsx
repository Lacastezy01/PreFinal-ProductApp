import React from 'react';
import { DeliveryBoxDude } from './CartoonIllustrations';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container footer-container">
        <div className="footer-mascot">
          <DeliveryBoxDude size={75} />
        </div>
        <div className="footer-details">
          <p className="footer-brand">POPSTOCK • PRODUCT MANAGEMENT PLAYGROUND</p>
          <p className="footer-sub">
            Built with React, TypeScript & Vite for CCDI Pre-Final Exam.
          </p>
          <p className="footer-credit">
            Crafted with <Heart size={14} className="inline-heart" /> by Zyrene Lacaste
          </p>
        </div>
      </div>
    </footer>
  );
};
