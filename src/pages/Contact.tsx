import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Bus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-rural-sand/20 to-secondary/10">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Get in
              <span className="text-rural-green block">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Have questions about rural bus routes? Need help planning your journey? We're here to help you connect with rural India.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="rural-card shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rural-green to-rural-leaf">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-rural-green/5 rounded-xl border border-rural-green/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-green">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone Support</h3>
                    <p className="text-muted-foreground">+91 1800-GAONBUS</p>
                    <p className="text-sm text-rural-green">24/7 Available</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-rural-orange/5 rounded-xl border border-rural-orange/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-orange">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Support</h3>
                    <p className="text-muted-foreground">support@gaonbus.com</p>
                    <p className="text-sm text-rural-orange">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-rural-sky/5 rounded-xl border border-rural-sky/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-sky">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Address</h3>
                    <p className="text-muted-foreground">Village Connect Hub</p>
                    <p className="text-sm text-rural-sky">Hyderabad, Telangana, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-rural-earth/5 rounded-xl border border-rural-earth/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rural-earth">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Sunday</p>
                    <p className="text-sm text-rural-earth">6:00 AM - 10:00 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="rural-card shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rural-green/10">
                    <Bus className="h-4 w-4 text-rural-green" />
                  </div>
                  Quick Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="rural-button-primary w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button className="rural-button-secondary w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  For urgent route queries, call our hotline for immediate assistance
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="rural-card shadow-strong">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rural-orange to-rural-earth">
                  <Send className="h-5 w-5 text-white" />
                </div>
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="rural-input"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="rural-input"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rural-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject *</label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger className="rural-input">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="route-query">Route Query</SelectItem>
                      <SelectItem value="technical-support">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                      <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message *</label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="rural-input min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="rural-button-primary w-full py-3">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
