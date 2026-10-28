import React from 'react';
import {
  DeliveryBoxDude,
  CartoonHotdog,
  CartoonGlasses,
  CartoonTrain,
  OfflineCat
} from './CartoonIllustrations';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container footer-container">
        {/* Playful mini icons strip inspired by bottom of Al Murphy */}
        <div className="footer-strip" aria-hidden="true">
          <div className="footer-mini-item">
            <OfflineCat size={55} />
            <span className="mini-item-caption">POP LOGISTICS</span>
          </div>
          <div className="footer-mini-item">
            <CartoonHotdog size={65} />
            <span className="mini-item-caption">SNACK VAULT</span>
          </div>
          <div className="footer-mini-item">
            <CartoonGlasses size={60} />
            <span className="mini-item-caption">HIGH CLARITY</span>
          </div>
          <div className="footer-mini-item">
            <CartoonTrain size={70} />
            <span className="mini-item-caption">EXPRESS DISPATCH</span>
          </div>
        </div>

        <div className="footer-mascot">
          <DeliveryBoxDude size={70} />
        </div>

        <div className="footer-details">
          <p className="footer-brand">POPSTOCK • PRODUCT MANAGEMENT PLAYGROUND</p>
          <p className="footer-sub">
            Built with React, TypeScript & Vite following PRE Final Exam specifications.
          </p>
          <p className="footer-credit">
            Crafted with <Heart size={14} className="inline-heart" /> by Zyrene Lacaste • CCDI Sorsogon
          </p>
        </div>
      </div>
    </footer>
  );
};
