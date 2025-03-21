
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import StatusBar from '@/components/community/StatusBar';
import BottomNav from '@/components/my-journey/BottomNav';
import { 
  User, Settings, Activity, Edit, Award, 
  Clock, BarChart2, Trophy, ChevronRight,
  Lock, Bell, Eye, Link, CreditCard, HelpCircle,
  LogOut, Info, Sun, Moon, UserCircle
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Profile Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Profile & Settings</h1>
        <Button variant="ghost" size="sm">
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Profile Card */}
      <Card className="mx-4 mb-5">
        <CardContent className="p-6 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-sm text-muted-foreground mb-1">@janedoe</p>
          <p className="text-xs text-muted-foreground mb-3">Member since January 2024</p>
          
          <div className="w-full mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Level 7</span>
              <span className="text-sm">2,450 / 3,000 XP</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>
          
          <p className="text-sm text-center">Wellness enthusiast committed to daily mindfulness and active living.</p>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <Card className="mx-4 mb-5">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">16</span>
              <span className="text-xs text-muted-foreground">Day Streak</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">1,280</span>
              <span className="text-xs text-muted-foreground">Total Points</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">82%</span>
              <span className="text-xs text-muted-foreground">Weekly Avg</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Navigation */}
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mx-4">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab Content */}
        <TabsContent value="profile" className="space-y-5">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">Jane Doe</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">jane.doe@example.com</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">January 15, 1990</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">Female</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Height & Weight</p>
                  <p className="font-medium">5'7" / 140 lbs</p>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full mt-3">Edit Personal Info</Button>
          </section>
          
          {/* Personality Test (previously Wellness Goals) */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Personality Test</h3>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Extroversion</h4>
                    <p className="text-xs text-muted-foreground">How you interact with others</p>
                  </div>
                  <Badge variant="outline">65%</Badge>
                </div>
                <Progress value={65} className="h-1.5" />
              </CardContent>
            </Card>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Openness</h4>
                    <p className="text-xs text-muted-foreground">Your curiosity and creativity</p>
                  </div>
                  <Badge variant="outline">78%</Badge>
                </div>
                <Progress value={78} className="h-1.5" />
              </CardContent>
            </Card>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Conscientiousness</h4>
                    <p className="text-xs text-muted-foreground">Your organization and reliability</p>
                  </div>
                  <Badge variant="outline">82%</Badge>
                </div>
                <Progress value={82} className="h-1.5" />
              </CardContent>
            </Card>
            <Button className="w-full">Take Full Personality Test</Button>
          </section>
          
          {/* Achievements & Badges */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Achievements</h3>
              <Button variant="link" className="h-auto p-0" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-xs font-medium">Early Bird</p>
                  <p className="text-[10px] text-muted-foreground">Mar 5</p>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
        
        {/* Activity Tab Content */}
        <TabsContent value="activity" className="space-y-5">
          {/* Recent Activity */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <Card>
                <CardContent className="p-3 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Morning Run</span>
                      <span className="text-xs text-muted-foreground">5.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Today, 6:30 AM</span>
                      <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">Cardio</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Meditation</span>
                      <span className="text-xs text-muted-foreground">15 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Today, 7:15 AM</span>
                      <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">Mindfulness</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-3 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Badge Earned</span>
                      <span className="text-xs text-muted-foreground">15 Points</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Yesterday, 8:30 PM</span>
                      <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">Achievement</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Activity Stats */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Activity Stats</h3>
            <Card>
              <CardContent className="p-4">
                <div className="h-40 w-full flex items-center justify-center mb-3">
                  <BarChart2 className="h-32 w-32 text-primary/50" />
                  <p className="text-xs text-muted-foreground absolute">Weekly Activity Chart</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Activity Types</p>
                    <p className="text-sm font-medium">Cardio: 45%</p>
                    <p className="text-sm font-medium">Strength: 30%</p>
                    <p className="text-sm font-medium">Mind: 25%</p>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Consistency</p>
                    <p className="text-sm font-medium">Daily: 85%</p>
                    <p className="text-sm font-medium">Weekly: 92%</p>
                    <p className="text-sm font-medium">Monthly: 78%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>
        
        {/* Settings Tab Content */}
        <TabsContent value="settings" className="space-y-5">
          {/* Account Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span>Change Password</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Email Preferences</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <span>Privacy Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Link className="h-5 w-5 text-muted-foreground" />
                    <span>Connected Accounts</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
                  <div className="flex items-center gap-3">
                    <UserCircle className="h-5 w-5 text-destructive" />
                    <span className="text-destructive">Delete Account</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* App Preferences */}
          <section>
            <h3 className="text-lg font-semibold mb-3">App Preferences</h3>
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
                  <div className="flex items-center gap-3">
                    <Sun className="h-5 w-5 text-muted-foreground" />
                    <span>Dark/Light Mode</span>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Sound Effects</span>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <span>Haptic Feedback</span>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
                  <div className="flex items-center gap-3">
                    <Link className="h-5 w-5 text-muted-foreground" />
                    <span>Offline Mode</span>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Notifications */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Notifications</h3>
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Activity Reminders</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                    <span>Goal Updates</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <span>Challenge Alerts</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Subscription Management */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Your Subscription</h3>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Premium Plan</span>
                  <Badge>Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Renews on Apr 15, 2024</p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Unlimited access to all wellness programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Personalized wellness recommendations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Advanced analytics and insights</span>
                  </li>
                </ul>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">Manage Subscription</Button>
                  <Button className="w-full" variant="link">View Billing History</Button>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Help & Support */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Help & Support</h3>
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <span>FAQs</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Contact Support</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
                  <div className="flex items-center gap-3">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <span>Terms & Privacy</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Log Out */}
          <Button className="w-full bg-destructive text-destructive-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            App Version 1.2.4
          </p>
        </TabsContent>
      </Tabs>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Profile;
