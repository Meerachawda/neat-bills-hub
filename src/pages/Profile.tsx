import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useBills } from "@/hooks/useBills";
import { useNavigate } from "react-router-dom";
import { User, Mail, Bell, Shield, Settings, CreditCard, Calendar, Target } from "lucide-react";

export default function Profile() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weekly: true
  });
  const { toast } = useToast();
  const { exportData } = useBills();
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    totalBills: 12,
    monthlyTotal: 485.50,
    billsPaid: 142,
    averageAmount: 87.25
  };

  const handleSave = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile changes have been saved successfully.",
    });
  };

  const handleChangePhoto = () => {
    toast({
      title: "Photo Upload",
      description: "Connect Supabase to enable photo uploads and storage.",
    });
  };

  const handleUpgradeToPro = () => {
    toast({
      title: "Upgrade to Pro",
      description: "Connect Supabase to enable payment processing with Stripe.",
    });
  };

  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Connect Supabase to enable messaging functionality.",
    });
  };

  const handleExportData = () => {
    exportData();
    toast({
      title: "Data Exported",
      description: "Your bills data has been downloaded as JSON.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Connect Supabase to enable authentication features.",
    });
  };

  const handleTwoFactorAuth = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "Connect Supabase to enable security features.",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Delete Account",
        description: "Connect Supabase to enable account management.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-hero bg-clip-text text-transparent animate-fade-in">
          Your Profile
        </h1>
        <p className="text-xl text-muted-foreground animate-slide-up">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="gradient-card shadow-medium border-0 animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 text-primary mr-2" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="gradient-primary text-white text-2xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{userData.name}</h3>
                  <p className="text-muted-foreground">Member since {userData.joinDate}</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleChangePhoto}>
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    defaultValue="John"
                    className="transition-smooth focus:shadow-glow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    defaultValue="Doe"
                    className="transition-smooth focus:shadow-glow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  defaultValue={userData.email}
                  className="transition-smooth focus:shadow-glow"
                />
              </div>

              <Button 
                onClick={handleSave}
                className="gradient-primary text-white shadow-medium hover:shadow-glow transition-smooth"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="gradient-card shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 text-primary mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be reminded about your bills.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Email Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Get email notifications 3 days before bills are due
                  </div>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive text message reminders on your phone
                  </div>
                </div>
                <Switch 
                  checked={notifications.sms}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, sms: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Browser notifications for urgent reminders
                  </div>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-medium">Weekly Summary</div>
                  <div className="text-sm text-muted-foreground">
                    Get a weekly overview of upcoming bills
                  </div>
                </div>
                <Switch 
                  checked={notifications.weekly}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, weekly: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="gradient-card shadow-medium border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 text-primary mr-2" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleChangePassword}>
                <Settings className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={handleTwoFactorAuth}>
                <Shield className="h-4 w-4 mr-2" />
                Two-Factor Authentication
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleDeleteAccount}>
                <User className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Account Stats */}
          <Card className="gradient-card shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 text-primary mr-2" />
                Your Stats
              </CardTitle>
              <CardDescription>
                Your bill management journey so far
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="text-2xl font-bold text-primary">{userData.totalBills}</div>
                <div className="text-sm text-muted-foreground">Active Bills</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-success/5 border border-success/10">
                <div className="text-2xl font-bold text-success">${userData.monthlyTotal}</div>
                <div className="text-sm text-muted-foreground">Monthly Total</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                <div className="text-2xl font-bold text-secondary">{userData.billsPaid}</div>
                <div className="text-sm text-muted-foreground">Bills Paid</div>
              </div>
            </CardContent>
          </Card>

          {/* Account Type */}
          <Card className="gradient-card shadow-medium border-0">
            <CardHeader>
              <CardTitle>Account Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className="gradient-primary text-white mb-2">Free Plan</Badge>
                <p className="text-sm text-muted-foreground">
                  You're on the free plan with access to all basic features.
                </p>
              </div>
              
              <Button className="w-full gradient-secondary text-white shadow-medium hover:shadow-glow transition-smooth" onClick={handleUpgradeToPro}>
                <CreditCard className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card shadow-medium border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleViewCalendar}>
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={handleContactSupport}>
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              
              <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                <Target className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}