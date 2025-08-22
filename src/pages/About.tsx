import React from 'react';
import { Bus, MapPin, Users, Target, Award, Heart, Globe, Shield, Clock, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-rural-sand/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              About
              <span className="text-rural-green block">GaonBus</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Connecting rural India through smart transportation solutions. We're on a mission to make rural travel accessible, reliable, and convenient for everyone.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rural-card shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf">
                  <Target className="h-5 w-5 text-white" />
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To bridge the digital divide in rural transportation by providing accessible, 
                reliable, and user-friendly bus route planning tools that empower rural communities 
                to travel with confidence and ease.
              </p>
            </CardContent>
          </Card>

          <Card className="rural-card shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rural-orange to-rural-earth">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A connected rural India where every village has access to reliable transportation 
                information, making travel planning seamless and empowering rural communities 
                to explore opportunities beyond their immediate surroundings.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Do */}
        <Card className="rural-card shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">What We Do</CardTitle>
            <p className="text-muted-foreground text-lg">
              GaonBus is a comprehensive rural transportation platform designed specifically for Indian villages and small towns.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rural-green/10 mx-auto">
                  <MapPin className="h-8 w-8 text-rural-green" />
                </div>
                <h3 className="text-xl font-semibold">Route Planning</h3>
                <p className="text-muted-foreground">
                  Find the best bus routes between any two locations in rural India with detailed step-by-step instructions.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rural-orange/10 mx-auto">
                  <Clock className="h-8 w-8 text-rural-orange" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Get live bus timings, route changes, and delays to plan your journey more effectively.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rural-sky/10 mx-auto">
                  <Download className="h-8 w-8 text-rural-sky" />
                </div>
                <h3 className="text-xl font-semibold">Offline Access</h3>
                <p className="text-muted-foreground">
                  Download routes for offline use, perfect for areas with limited internet connectivity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="rural-card shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3 p-4 bg-rural-green/5 rounded-xl border border-rural-green/20">
                <Bus className="h-6 w-6 text-rural-green mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Multi-language Support</h4>
                  <p className="text-sm text-muted-foreground">Available in English and Telugu with more languages coming soon.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-rural-orange/5 rounded-xl border border-rural-orange/20">
                <Shield className="h-6 w-6 text-rural-orange mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Voice Search</h4>
                  <p className="text-sm text-muted-foreground">Search for routes using voice commands for easier navigation.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-rural-sky/5 rounded-xl border border-rural-sky/20">
                <Users className="h-6 w-6 text-rural-sky mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Community Driven</h4>
                  <p className="text-sm text-muted-foreground">Routes and updates contributed by local communities and bus operators.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-rural-earth/5 rounded-xl border border-rural-earth/20">
                <Heart className="h-6 w-6 text-rural-earth mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Rural Focused</h4>
                  <p className="text-sm text-muted-foreground">Specifically designed for rural transportation needs and challenges.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-rural-sand/5 rounded-xl border border-rural-sand/20">
                <Award className="h-6 w-6 text-rural-sand mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Free Service</h4>
                  <p className="text-sm text-muted-foreground">Completely free to use with no hidden charges or subscriptions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-rural-leaf/5 rounded-xl border border-rural-leaf/20">
                <Globe className="h-6 w-6 text-rural-leaf mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Wide Coverage</h4>
                  <p className="text-sm text-muted-foreground">Covering major rural routes across Telangana and expanding nationwide.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="rural-card shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Our Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-rural-green">500+</div>
                <div className="text-muted-foreground font-medium">Villages Connected</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-rural-orange">1000+</div>
                <div className="text-muted-foreground font-medium">Bus Routes</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-rural-sky">50K+</div>
                <div className="text-muted-foreground font-medium">Users Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-rural-earth">24/7</div>
                <div className="text-muted-foreground font-medium">Support Available</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="rural-card shadow-strong">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Our Team</CardTitle>
            <p className="text-muted-foreground text-lg">
              A dedicated team of developers, designers, and rural development experts working together to make rural transportation accessible.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf mx-auto">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Development Team</h3>
                <p className="text-muted-foreground">
                  Experienced developers building robust and user-friendly applications.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rural-orange to-rural-earth mx-auto">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Rural Experts</h3>
                <p className="text-muted-foreground">
                  Local experts who understand rural transportation challenges and needs.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rural-sky to-rural-sky/80 mx-auto">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Community Partners</h3>
                <p className="text-muted-foreground">
                  Bus operators and community leaders helping us expand our network.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
