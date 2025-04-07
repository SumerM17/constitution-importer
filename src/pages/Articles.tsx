
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SearchIcon, Filter, Phone, Car, ShieldAlert, Child, Heart, CircleHelp, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Updated categories focused on everyday laws
const lawCategories = [
  { id: "traffic", name: "Traffic & Road Safety Laws", icon: <Car className="h-5 w-5" /> },
  { id: "women", name: "Women's Safety & Rights", icon: <Heart className="h-5 w-5" /> },
  { id: "children", name: "Children's Rights & Protection", icon: <Child className="h-5 w-5" /> },
  { id: "accident", name: "Accident & Compensation", icon: <ShieldAlert className="h-5 w-5" /> },
  { id: "helpline", name: "Important Helplines", icon: <Phone className="h-5 w-5" /> },
  { id: "general", name: "General Knowledge", icon: <CircleHelp className="h-5 w-5" /> },
];

// Updated data with practical law information
const practicalLawsData = [
  // Traffic & Road Safety Laws
  {
    id: "traffic-1",
    title: "Traffic Signal Violations",
    category: "traffic",
    summary: "Jumping a red light is punishable with a fine of ₹1,000-5,000, depending on the vehicle type.",
    content: "According to the Motor Vehicles Act, disregarding traffic signals can result in a fine of ₹1,000 for first-time offenders and up to ₹5,000 for repeat offenders. For commercial vehicles, the fines are higher. Additionally, your driving license can be suspended for up to 3 months in serious cases.",
    penalty: "₹1,000-5,000 fine, possible license suspension"
  },
  {
    id: "traffic-2",
    title: "Driving Without License",
    category: "traffic",
    summary: "Driving without a valid license can lead to imprisonment up to 3 months or a fine of ₹5,000 or both.",
    content: "As per the Motor Vehicles Act, driving without a valid license is a serious offense. First-time offenders may face a fine of ₹5,000, while repeat offenders may face imprisonment up to 3 months along with the fine. If a minor is caught driving, the registered owner of the vehicle will be held responsible and face more severe penalties.",
    penalty: "₹5,000 fine, possible imprisonment"
  },
  
  // Women's Safety & Rights
  {
    id: "women-1",
    title: "Sexual Harassment at Workplace",
    category: "women",
    summary: "The Sexual Harassment of Women at Workplace Act provides protection against workplace harassment.",
    content: "The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 mandates that every organization with 10 or more employees must have an Internal Complaints Committee (ICC). Harassment includes unwelcome physical contact, demand for sexual favors, showing pornography, or any other unwelcome physical, verbal or non-verbal conduct of sexual nature. Complaints can be filed within 3 months of the incident.",
    helpline: "Women's Helpline: 1091"
  },
  {
    id: "women-2",
    title: "Domestic Violence Protection",
    category: "women",
    summary: "The Protection of Women from Domestic Violence Act provides civil remedies like protection orders.",
    content: "The Protection of Women from Domestic Violence Act, 2005 covers physical, sexual, verbal, emotional, and economic abuse. It provides for protection orders, residence orders, monetary relief, and custody orders. A complaint can be filed with the Protection Officer, Service Provider, or directly with a Magistrate. Women can get emergency assistance by calling the women's helpline.",
    helpline: "Women's Helpline: 1091, Domestic Violence Helpline: 181"
  },
  
  // Children's Rights & Protection
  {
    id: "children-1",
    title: "Protection Against Child Labor",
    category: "children",
    summary: "Employment of children below 14 years is prohibited in any occupation.",
    content: "The Child Labour (Prohibition and Regulation) Act prohibits employment of children below 14 years in any occupation. Children between 14-18 years are protected under the law against employment in hazardous occupations. Violation can lead to imprisonment from 6 months up to 2 years and a fine of ₹20,000 to ₹50,000.",
    helpline: "Childline: 1098"
  },
  {
    id: "children-2",
    title: "Right to Education",
    category: "children",
    summary: "Every child between 6-14 years has the right to free and compulsory education.",
    content: "Under the Right of Children to Free and Compulsory Education Act (RTE), 2009, every child between the age of 6 to 14 years has the right to free and compulsory education. Schools must reserve 25% seats for economically weaker sections. No child can be held back, expelled, or required to pass a board examination until the completion of elementary education.",
    helpline: "National Education Helpline: 1800 11 8004"
  },
  
  // Accident & Compensation
  {
    id: "accident-1",
    title: "Road Accident Compensation",
    category: "accident",
    summary: "Victims of road accidents are entitled to compensation under the Motor Vehicles Act.",
    content: "Under the Motor Vehicles Act, victims of road accidents or their legal heirs can claim compensation through Motor Accident Claims Tribunals. Compensation is calculated based on factors like age, income, and future prospects of the victim. Claims must be filed within 6 months of the accident, though courts may accept delays with valid reasons.",
    helpline: "Road Accident Emergency: 108"
  },
  {
    id: "accident-2",
    title: "Workplace Accident Compensation",
    category: "accident",
    summary: "Employees injured at work are entitled to compensation under the Employees' Compensation Act.",
    content: "The Employees' Compensation Act provides for compensation to employees who suffer injury or occupational diseases arising out of and in the course of employment. The employer is liable to pay compensation if personal injury is caused to an employee by accident arising out of and in the course of employment. The amount depends on the extent of injury and the employee's monthly wages.",
    helpline: "Labour Helpline: 1800 11 2014"
  },
  
  // Important Helplines
  {
    id: "helpline-1",
    title: "Emergency Helplines",
    category: "helpline",
    summary: "Essential emergency numbers every citizen should know.",
    content: "These are the essential emergency numbers every Indian citizen should know and have readily available.",
    contactList: [
      { name: "Police Emergency", number: "100" },
      { name: "Ambulance", number: "108" },
      { name: "Women's Helpline", number: "1091" },
      { name: "Child Helpline", number: "1098" },
      { name: "Senior Citizen Helpline", number: "14567" },
      { name: "National Emergency Number", number: "112" },
      { name: "Fire Emergency", number: "101" },
      { name: "Domestic Violence Helpline", number: "181" }
    ]
  },
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  
  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const filteredLaws = practicalLawsData.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (law.summary && law.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (law.content && law.content.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(law.category);
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="py-12 md:py-20 px-4 bg-legal-black text-legal-white">
          <div className="container mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Laws for Everyday Life
            </motion.h1>
            <motion.p 
              className="max-w-3xl mx-auto text-lg opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Simple explanations of important laws that affect your daily life
            </motion.p>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className="py-8 px-4 bg-secondary">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for laws by keyword..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Collapsible className="w-full md:w-auto">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Category
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 bg-card rounded-md shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {lawCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={category.id} 
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <label 
                          htmlFor={category.id} 
                          className="text-sm font-medium cursor-pointer flex items-center"
                        >
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>
        
        {/* Laws List */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="mb-4">
                <p className="text-muted-foreground">
                  Showing {filteredLaws.length} of {practicalLawsData.length} laws
                </p>
              </div>
              
              <div className="space-y-6">
                {filteredLaws.length > 0 ? (
                  filteredLaws.map((law) => (
                    <motion.div 
                      key={law.id}
                      className="border border-border rounded-md overflow-hidden hover-lift"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div 
                        className="p-4 bg-muted flex justify-between items-center cursor-pointer"
                        onClick={() => setExpandedArticle(expandedArticle === law.id ? null : law.id)}
                      >
                        <div className="flex items-center gap-3">
                          {law.category === "traffic" ? <Car className="h-5 w-5 text-accent" /> :
                           law.category === "women" ? <Heart className="h-5 w-5 text-accent" /> :
                           law.category === "children" ? <Child className="h-5 w-5 text-accent" /> :
                           law.category === "accident" ? <ShieldAlert className="h-5 w-5 text-accent" /> :
                           law.category === "helpline" ? <Phone className="h-5 w-5 text-accent" /> :
                           <CircleHelp className="h-5 w-5 text-accent" />}
                          <div>
                            <h3 className="font-medium">{law.title}</h3>
                            <p className="text-sm text-muted-foreground">{law.summary}</p>
                          </div>
                        </div>
                      </div>
                      
                      {expandedArticle === law.id && (
                        <div className="p-4 legal-text">
                          <p className="mb-4">{law.content}</p>
                          
                          {/* Special rendering for helplines */}
                          {law.category === "helpline" && law.contactList && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Emergency Contacts:</h4>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Number</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {law.contactList.map((contact, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{contact.name}</TableCell>
                                      <TableCell className="font-bold">{contact.number}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                          
                          {/* Show penalty information if available */}
                          {law.penalty && (
                            <div className="mt-4 p-3 bg-pink-50 border border-pink-200 rounded-md">
                              <p className="text-pink-800"><strong>Penalty:</strong> {law.penalty}</p>
                            </div>
                          )}
                          
                          {/* Show helpline information if available */}
                          {law.helpline && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                              <p className="text-blue-800"><strong>Helpline:</strong> {law.helpline}</p>
                            </div>
                          )}
                          
                          <div className="mt-4 pt-4 border-t border-border flex justify-end gap-2">
                            <Button variant="outline" size="sm">Share</Button>
                            <Button size="sm">Read more</Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No laws found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategories([]);
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Guidance Section */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
