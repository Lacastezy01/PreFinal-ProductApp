import React from 'react';
import { Link } from 'react-router-dom';
import { RoboStock, OfflineCat, SunDude, CauldronCreature } from './CartoonIllustrations';
import { Sparkles, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Floating Cartoon Accents */}
        <div className="hero-floating hero-floating--robot" aria-hidden="true">
          <RoboStock size={140} />
        </div>
        <div className="hero-floating hero-floating--sun" aria-hidden="true">
          <SunDude size={85} />
        </div>

        {/* Main Al Murphy inspired typography blocks */}
        <div className="hero-content">
          <div className="hero-bubble-stack">
            <div className="hero-bubble hero-bubble--top">
              <span className="bubble-text">POP</span>
            </div>
            <div className="hero-bubble hero-bubble--bottom">
              <span className="bubble-text">STOCK</span>
            </div>
          </div>

          <p className="hero-subheading">
            Voted the most delightfully tactile product management playground in the known universe!
            Track stock, compute totals, and inspect goods with zero corporate boredom.
          </p>

          <div className="hero-actions">
            <a href="#catalog-section" className="btn btn--primary">
              <span>EXPLORE GOODS</span>
              <ArrowDown size={18} strokeWidth={3} />
            </a>
            <Link to="/add-product" className="btn btn--secondary">
              <span>ADD NEW ITEM</span>
              <Sparkles size={18} strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* Bottom Illustrated Row */}
        <div className="hero-creatures-row" aria-hidden="true">
          <CauldronCreature size={95} />
          <div className="hero-speech-bubble">
            <span>SURE, WHY NOT?</span>
          </div>
          <OfflineCat size={110} />
        </div>
      </div>
    </section>
  );
};
