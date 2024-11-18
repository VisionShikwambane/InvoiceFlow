import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Download, FileText, Briefcase, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceGenerator } from '@/components/landing/InvoiceGenerator';

const features = [
  {
    title: 'Client Management',
    description: 'Organize and manage all your client information in one place.',
    icon: Briefcase,
  },
  {
    title: 'Invoice Tracking',
    description: 'Track payments and send automatic reminders.',
    icon: FileText,
  },
  {
    title: 'Secure Data',
    description: 'Your data is encrypted and securely stored.',
    icon: Shield,
  },
  {
    title: 'Fast Performance',
    description: "Works offline and syncs when you're back online.",
    icon: Zap,
  },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for freelancers just starting out',
    features: [
      'Up to 3 clients',
      'Basic invoice templates',
      'Manual payment tracking',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'Best for growing freelance businesses',
    features: [
      'Unlimited clients',
      'Custom invoice templates',
      'Automatic payment tracking',
      'Priority support',
      'Client portal',
      'Team collaboration',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$29',
    period: '/month',
    description: 'For large teams and businesses',
    features: [
      'Everything in Pro',
      'Custom branding',
      'API access',
      'Advanced analytics',
      'Dedicated account manager',
      'Custom integrations',
    ],
  },
];

export function Landing() {
  const [showGenerator, setShowGenerator] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-background pt-16 md:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tight md:text-6xl"
            >
              Manage Your Freelance Business{' '}
              <span className="text-primary">With Ease</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              The all-in-one platform for freelancers to manage clients, create
              professional invoices, and track payments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Button size="lg" onClick={handleGetStarted}>
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowGenerator(true)}
              >
                Try Invoice Generator
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need to run your freelance business
              </h2>
              <p className="mt-4 text-muted-foreground">
                Streamline your workflow with our comprehensive set of tools.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-muted-foreground">
                Choose the plan that best fits your needs.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={plan.popular ? 'border-primary' : undefined}
                >
                  <CardHeader>
                    <CardTitle className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{plan.name}</span>
                      {plan.popular && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          Popular
                        </span>
                      )}
                    </CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} onClick={handleGetStarted}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Invoice Generator Dialog */}
      <InvoiceGenerator open={showGenerator} onOpenChange={setShowGenerator} />
    </div>
  );
}