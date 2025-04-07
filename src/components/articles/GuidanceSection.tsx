
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const GuidanceSection = () => {
  return (
    <section className="py-12 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Legal Guidance?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This information is provided for educational purposes only. For specific legal advice, please consult a qualified legal professional.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Free Legal Aid</CardTitle>
              <CardDescription>Government sponsored legal services for eligible citizens</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The Legal Services Authorities Act ensures free legal services to the weaker sections of society.</p>
              <Button variant="outline" className="w-full">
                Learn More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Legal Awareness Camps</CardTitle>
              <CardDescription>Find upcoming legal awareness events in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Regular legal awareness camps are organized by District Legal Services Authorities.</p>
              <Button variant="outline" className="w-full">
                Find Events
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Online Legal Consultation</CardTitle>
              <CardDescription>Connect with lawyers for initial guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Several platforms offer free initial consultation with experienced lawyers.</p>
              <Button variant="outline" className="w-full">
                Connect Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
