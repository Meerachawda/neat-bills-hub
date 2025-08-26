import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          Have questions about managing your bills? Need help getting started? 
          We're here to help you take control of your financial life.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-6 animate-slide-up">
          <Card className="gradient-card shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 text-primary mr-2" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Reach out to us through any of these channels. We're always happy to help!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">Get in touch via email</p>
                  <a 
                    href="mailto:meerachawda49255@gmail.com" 
                    className="text-primary hover:text-primary-glow transition-smooth font-medium"
                  >
                    meerachawda49255@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">We're based in</p>
                  <p className="text-foreground font-medium">
                    Chhattisgarh, India
                  </p>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-lg gradient-success flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Response Time</h3>
                  <p className="text-muted-foreground">We typically respond within</p>
                  <p className="text-success font-medium">24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="gradient-card shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Is my financial data secure?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! We use industry-standard encryption to protect your data. 
                  Your financial information is never shared with third parties.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">How do email reminders work?</h4>
                <p className="text-sm text-muted-foreground">
                  Our system automatically sends friendly email reminders 3 days before your bills are due, 
                  helping you stay on top of your payments.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Can I categorize my bills?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! You can organize your bills by categories like Utilities, Streaming, 
                  Insurance, and more for better financial organization.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="gradient-card shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              Have a specific question or need personalized help? Send us a message and we'll get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name"
                    className="transition-smooth focus:shadow-glow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name"
                    className="transition-smooth focus:shadow-glow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="transition-smooth focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="What's this about?"
                  className="transition-smooth focus:shadow-glow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..."
                  className="min-h-32 transition-smooth focus:shadow-glow"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Support Section */}
      <Card className="gradient-card shadow-medium border-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <CardContent className="text-center py-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
              We're Here to Help You Succeed
            </h2>
            <p className="text-muted-foreground">
              Our mission is to help busy adults take control of their financial life. 
              Whether you need technical support, have questions about features, or want advice on organizing your bills, 
              we're committed to helping you achieve financial peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => window.location.href = 'mailto:meerachawda49255@gmail.com'}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Us Directly
              </Button>
              <Button 
                className="gradient-secondary text-white shadow-medium hover:shadow-glow transition-smooth"
              >
                View Help Center
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}