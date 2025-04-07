
import React from "react";
import { Law } from "@/types/law-types";

// Updated data with practical law information
export const practicalLawsData: Law[] = [
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
