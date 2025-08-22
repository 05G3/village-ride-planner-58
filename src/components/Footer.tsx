import React from 'react';
import { Bus, Phone, Mail, MapPin, Clock, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-rural-earth to-rural-sand text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Bus className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">GaonBus</h3>
                <p className="text-sm text-white/80">Connecting Rural India</p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering rural communities with reliable bus transportation. 
              Plan your journey with ease and travel safely across villages.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 p-0 h-auto justify-start">
                  Find Routes
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 p-0 h-auto justify-start">
                  Bus Schedules
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 p-0 h-auto justify-start">
                  Offline Maps
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 p-0 h-auto justify-start">
                  SMS Queries
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rural-orange" />
                <span className="text-white/80">+91 1800-GAONBUS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rural-orange" />
                <span className="text-white/80">support@gaonbus.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rural-orange" />
                <span className="text-white/80">Village Connect Hub, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-rural-orange" />
                <span className="text-white/80">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Why Choose Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-rural-green" />
                <span className="text-white/80 text-sm">Safe & Reliable</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rural-green" />
                <span className="text-white/80 text-sm">Offline Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-rural-green" />
                <span className="text-white/80 text-sm">Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-rural-green" />
                <span className="text-white/80 text-sm">Community Focused</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>&copy; {currentYear} GaonBus. All rights reserved.</span>
              <span>•</span>
              <span>Made with ❤️ for Rural India</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 p-2 h-auto">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 p-2 h-auto">
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
