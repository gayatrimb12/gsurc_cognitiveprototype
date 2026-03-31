import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Brain, Bell, Phone, MessageCircle, HeartPulse, Calendar, Activity, ShieldCheck, ChevronRight, Accessibility, Sparkles } from "lucide-react";

const sampleUsers = {
  mild: {
    name: "Evelyn Carter",
    age: 74,
    engagement: 72,
    communicationChange: -18,
    tasksCompleted: 5,
    remindersMissed: 1,
    navigationDifficulty: 12,
    suggestedMode: "Supportive",
    cognitiveNote:
      "Moderate engagement with slight decline in communication frequency. Recommend gentle prompts and memory reinforcement.",
  },
  moderate: {
    name: "Martha Lee",
    age: 81,
    engagement: 54,
    communicationChange: -34,
    tasksCompleted: 3,
    remindersMissed: 3,
    navigationDifficulty: 31,
    suggestedMode: "Adaptive",
    cognitiveNote:
      "Reduced activity and increased navigation hesitation suggest the interface should simplify choices and increase guidance.",
  },
  strong: {
    name: "Helen Brooks",
    age: 69,
    engagement: 84,
    communicationChange: 6,
    tasksCompleted: 7,
    remindersMissed: 0,
    navigationDifficulty: 7,
    suggestedMode: "Active",
    cognitiveNote:
      "Strong digital activity with consistent task completion. Recommend maintaining social and cognitive enrichment prompts.",
  },
};

function statusTone(score) {
  if (score >= 80) return "High";
  if (score >= 60) return "Moderate";
  return "Low";
}

function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="rounded-2xl bg-muted p-3">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScreenHeader({ title, subtitle }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
        Research Prototype
      </Badge>
    </div>
  );
}

export default function CognitiveAwareAdaptiveInterface() {
  const [profile, setProfile] = useState("mild");
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(true);

  const user = useMemo(() => sampleUsers[profile], [profile]);
  const tone = statusTone(user.engagement);

  const appClasses = highContrast
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-slate-50 text-slate-900";

  const textScale = largeText ? "text-base" : "text-sm";

  return (
    <div className={`${appClasses} ${textScale}`}>
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="rounded-3xl border-0 shadow-md">
            <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <p className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    Cognitive-Aware Adaptive Interface
                  </p>
                </div>
                <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
                  A deployable prototype for supporting cognitive aging through adaptive digital interaction.
                </h1>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
                  This prototype demonstrates how interaction patterns such as communication frequency, reminder completion, and navigation difficulty can guide interface adaptation for older adults.
                </p>
              </div>
              <Card className="min-w-[250px] rounded-3xl border shadow-sm">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">Demo profile</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant={profile === "mild" ? "default" : "outline"} onClick={() => setProfile("mild")}>Age 74</Button>
                    <Button variant={profile === "moderate" ? "default" : "outline"} onClick={() => setProfile("moderate")}>Age 81</Button>
                    <Button variant={profile === "strong" ? "default" : "outline"} onClick={() => setProfile("strong")}>Age 69</Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Adaptive mode</span>
                      <Switch checked={adaptiveMode} onCheckedChange={setAdaptiveMode} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>High contrast</span>
                      <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Large text</span>
                      <Switch checked={largeText} onCheckedChange={setLargeText} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="h-5 w-5" /> Live cognitive summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{user.name}, age {user.age}</span>
                <Badge className="rounded-full">{tone} engagement</Badge>
              </div>
              <Progress value={user.engagement} className="h-3" />
              <p className="mt-3 text-sm">
                <span className="font-semibold">Engagement score:</span> {user.engagement}%
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{user.cognitiveNote}</p>
              <div className="mt-5 rounded-2xl bg-muted p-4 text-sm">
                <p className="font-medium">System recommendation</p>
                <p className="mt-1">Activate <span className="font-semibold">{user.suggestedMode}</span> interface mode with guided prompts, reduced navigation depth, and stronger memory support.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 rounded-2xl">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="adaptive">Adaptive UI</TabsTrigger>
            <TabsTrigger value="memory">Memory Support</TabsTrigger>
            <TabsTrigger value="social">Social + Boost</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <ScreenHeader
              title="Home Dashboard"
              subtitle="A high-level overview of digital behavior and cognitive engagement."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <StatCard title="Cognitive Engagement" value={`${user.engagement}%`} subtitle="Estimated from recent digital interaction patterns" icon={Brain} />
              <StatCard title="Communication Change" value={`${user.communicationChange}%`} subtitle="Compared with previous week" icon={MessageCircle} />
              <StatCard title="Tasks Completed" value={`${user.tasksCompleted}`} subtitle="Medication, calendar, and routine tasks" icon={Calendar} />
              <StatCard title="Reminders Missed" value={`${user.remindersMissed}`} subtitle="Missed prompts trigger adaptive reinforcement" icon={Bell} />
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Daily summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Today’s pattern</p>
                    <p className="mt-1 text-muted-foreground">The system identified lower-than-usual messaging activity and slight hesitation during task navigation. Engagement remains strongest in reminders and routine completion.</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border p-4">
                      <p className="font-medium">Predicted risk area</p>
                      <p className="mt-1 text-muted-foreground">Memory strain during routine recall</p>
                    </div>
                    <div className="rounded-2xl border p-4">
                      <p className="font-medium">Best support strategy</p>
                      <p className="mt-1 text-muted-foreground">Repeated cues with low-friction prompts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Interface status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                    <span>Adaptive mode</span>
                    <Badge>{adaptiveMode ? "Enabled" : "Disabled"}</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                    <span>High contrast</span>
                    <Badge variant="secondary">{highContrast ? "On" : "Off"}</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
                    <span>Large text mode</span>
                    <Badge variant="secondary">{largeText ? "On" : "Off"}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6">
            <ScreenHeader
              title="Interaction Monitoring"
              subtitle="Behavioral signals used to estimate cognitive engagement over time."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="rounded-2xl shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Behavioral indicators</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Communication Frequency</p>
                    <p className="mt-2 text-muted-foreground">Tracks calls, texts, and replies as indicators of social engagement and routine participation.</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Navigation Difficulty</p>
                    <p className="mt-2 text-muted-foreground">Measures repeated taps, abandoned paths, and hesitation between screens.</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Task Completion</p>
                    <p className="mt-2 text-muted-foreground">Assesses whether reminders and routine actions are completed on time.</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Engagement Stability</p>
                    <p className="mt-2 text-muted-foreground">Looks for sudden declines that may signal stress, confusion, or reduced cognitive participation.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Current risk signal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Navigation difficulty</p>
                    <p className="mt-1 text-2xl font-semibold">{user.navigationDifficulty}%</p>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Intervention threshold</p>
                    <p className="mt-1 text-muted-foreground">If multiple risk signals rise together, the system activates more guided support.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="adaptive" className="mt-6">
            <ScreenHeader
              title="Adaptive Interface"
              subtitle="The UI changes when the system detects increased cognitive effort or reduced engagement."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Standard view</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-3 gap-3">
                    {['Messages','Calendar','Health','Banking','Maps','Photos'].map((item) => (
                      <div key={item} className="rounded-xl border p-4 text-center">{item}</div>
                    ))}
                  </div>
                  <p className="text-muted-foreground">A typical interface with multiple choices, smaller targets, and higher navigation load.</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Adaptive view</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="space-y-3">
                    <Button className="w-full justify-between rounded-2xl py-6 text-base">
                      Call Family <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" className="w-full justify-between rounded-2xl py-6 text-base">
                      Today’s Reminders <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between rounded-2xl py-6 text-base">
                      Health Check-In <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Adaptation logic</p>
                    <p className="mt-1 text-muted-foreground">The interface reduces decision load, enlarges buttons, prioritizes the most relevant tasks, and increases guidance when needed.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="memory" className="mt-6">
            <ScreenHeader
              title="Memory Support"
              subtitle="Reminder scaffolding is intensified only when patterns suggest reduced recall or incomplete routines."
            />
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Smart reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5" />
                      <div>
                        <p className="font-medium">8:00 AM Medication Reminder</p>
                        <p className="text-muted-foreground">Status: {user.remindersMissed > 0 ? 'Missed once — escalation active' : 'Completed on time'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="font-medium">2:00 PM Doctor Appointment</p>
                        <p className="text-muted-foreground">Adaptive cue adds travel time and simplified directions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Why it matters</p>
                    <p className="mt-1 text-muted-foreground">Instead of generic reminders, the system increases support only when behavior suggests rising cognitive load.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Memory reinforcement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Prompt</p>
                    <p className="mt-1">Can you recall what you completed this morning?</p>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Supportive cue</p>
                    <p className="mt-1">You took medication at 8:15 AM and called your daughter at 9:10 AM.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <ScreenHeader
              title="Social Connection + Cognitive Boost"
              subtitle="The system responds to reduced communication by supporting both connection and mental engagement."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Connection prompt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-2xl bg-muted p-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5" />
                      <div>
                        <p className="font-medium">You have not contacted anyone today.</p>
                        <p className="text-muted-foreground">Would you like to call your daughter or send a quick message?</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button className="rounded-2xl py-6">Call Family</Button>
                    <Button variant="secondary" className="rounded-2xl py-6">Send Message</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Cognitive boost</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Recall exercise</p>
                    <p className="mt-1 text-muted-foreground">Name three people you spoke with this week.</p>
                  </div>
                  <div className="rounded-2xl border p-4">
                    <p className="font-medium">Routine reflection</p>
                    <p className="mt-1 text-muted-foreground">What was the first task you completed this morning?</p>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="font-medium">Goal</p>
                    <p className="mt-1 text-muted-foreground">Preserve engagement instead of simply reducing cognitive effort.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Card className="rounded-2xl shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5" /> Prototype rationale
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This concept prototype was created for a research poster on cognitive aging. It frames digital interaction as a behavioral signal that can inform adaptive system design. Rather than replacing thought entirely, the interface supports memory, social connection, and routine participation while still preserving meaningful cognitive engagement.
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Accessibility className="h-5 w-5" /> Design principles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Large touch targets</p>
              <p>• Reduced navigation depth</p>
              <p>• Supportive rather than intrusive prompts</p>
              <p>• Cognitive scaffolding over full automation</p>
              <p>• Accessibility-first interface design</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
