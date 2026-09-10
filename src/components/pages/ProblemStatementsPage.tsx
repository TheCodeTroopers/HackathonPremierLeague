import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PageRoute } from '../../types';
import { HPL_IMAGES } from '../../assets/images';
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Lightbulb, 
  Target, 
  X, 
  User, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Download, 
  Copy, 
  Shield, 
  HeartPulse, 
  Bus, 
  Trash2, 
  Layers, 
  Users, 
  BookOpen,
  Columns,
  LayoutGrid
} from 'lucide-react';

interface ProblemStatementsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export interface TargetUserRole {
  role: string;
  description: string;
}

export interface KeyModuleDetail {
  title: string;
  description: string;
}

export interface FeatureMatrixItem {
  feature: string;
  requirement: string;
}

export interface Round2ProblemStatement {
  id: string;
  psCode: string;
  title: string;
  subtitle: string;
  oneLineChallenge: string;
  summary: string;
  sponsorName: string;
  sponsorLogo: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
  tagBg: string;
  tagText: string;
  focusAreas: string[];
  background: string;
  problemStatement: string;
  objective: string[];
  targetUsers: TargetUserRole[];
  workflowDescription: string;
  workflowSteps: string[];
  keyModules: KeyModuleDetail[];
  scopeForInnovation: string[];
  outOfScope?: string[];
  keyDesignPrinciple: string;
  deliverables: string[];
  featureMatrix: FeatureMatrixItem[];
}

export const ROUND2_PROBLEM_STATEMENTS: Round2ProblemStatement[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // PS 01: AyurEssence (SDM College of Ayurveda, Udupi)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ps-01',
    psCode: 'PS 01',
    title: 'AyurEssence',
    subtitle: 'An Intelligent Ayurvedic Prakriti Assessment Platform',
    oneLineChallenge: 'Design and develop a digital Ayurvedic assessment platform that enables doctors and students to systematically assess an individual\'s Vata, Pitta, and Kapha constitution through structured questionnaires and practitioner observations, and generate a clear, evidence-referenced Prakriti assessment report.',
    summary: 'Design and develop a digital Ayurvedic assessment platform that enables doctors and students to systematically assess an individual\'s Vata, Pitta, and Kapha constitution through structured questionnaires and practitioner observations, generating an evidence-referenced Prakriti report.',
    sponsorName: 'SDM College of Ayurveda, Udupi',
    sponsorLogo: HPL_IMAGES.sdmLogo,
    themeColor: '#7C3AED',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800 border-purple-300',
    iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
    iconColor: 'text-purple-700',
    tagBg: 'bg-purple-50',
    tagText: 'text-purple-800 border-purple-200',
    focusAreas: [
      'Prakriti Assessment',
      'Dosha Calculation (V/P/K)',
      'Clinical Assessment Reports',
      'Doctor & Student Workflows'
    ],
    background: `Ayurveda classifies an individual's physiological constitution, or Prakriti, primarily in terms of the three Doshas: Vata, Pitta, and Kapha.

Determining an individual's Prakriti traditionally involves observing physical, physiological, behavioral, and other characteristics. In a clinical or educational setting, doctors and students may need to collect and evaluate a considerable amount of information before arriving at an assessment.

The objective of this challenge is to develop a working digital Ayurvedic assessment platform that can assist doctors and students in systematically collecting observations and questionnaire responses and generating a structured assessment of an individual's Vata, Pitta, and Kapha composition.

The system is intended specifically for an Ayurvedic context and is not intended to diagnose diseases or replace the clinical judgment of an Ayurvedic practitioner.`,
    problemStatement: `Develop a working prototype of an Ayurvedic Prakriti assessment platform that enables doctors and students to digitally assess an individual's Prakriti through a structured questionnaire and practitioner observations.

The platform should collect relevant information from the patient, process the responses according to an Ayurvedic Prakriti assessment methodology, and generate a clear report indicating the individual's Vata, Pitta, and Kapha proportions and/or dominant constitution.

The platform should provide a basic standardized questionnaire, while also allowing flexibility for institutions or practitioners to introduce their own questionnaires in the future.

Doctors should additionally have the ability to record free-form practitioner observations that may not be captured through predefined questions.

The challenge is intentionally open-ended: participants should implement the core assessment workflow while being encouraged to develop innovative approaches for questionnaire design, assessment methodology, visualization, reporting, usability, and other supporting functionality.`,
    objective: [
      'Structured – through a standardized questionnaire.',
      'Efficient – reducing repetitive manual assessment work.',
      'Flexible – allowing additional/custom questionnaires and practitioner observations.',
      'Transparent – making the basis of the assessment understandable.',
      'Useful for practitioners and students – without replacing professional judgment.',
      'Scalable – allowing the platform to evolve with additional assessment methodologies.'
    ],
    targetUsers: [
      {
        role: 'Patient',
        description: 'The patient provides basic personal information and participates in the assessment conducted by the doctor or student. The patient may create/provide a basic profile, provide required information, answer questions when the practitioner conducts the assessment, and view a simplified assessment result if enabled.'
      },
      {
        role: 'Doctor',
        description: 'The doctor is the primary professional user. The doctor should be able to register/login, create or select a patient profile, conduct the questionnaire, enter responses, add free-form observations, review Vata/Pitta/Kapha results, view detailed reports, and review previous assessments where history is supported.'
      },
      {
        role: 'Student',
        description: 'Students can use the system for learning, practice, and supervised assessment workflows. Students may have functionality similar to doctors for conducting assessments, while the system can distinguish student-generated assessments from practitioner assessments. The exact authorization model is open for innovation.'
      }
    ],
    workflowDescription: 'Patient Registration → Assessment → Questionnaire → Practitioner Observation → Prakriti Calculation → Result → Report',
    workflowSteps: [
      'Patient Profile: Practitioner opens or creates patient profile.',
      'Start Assessment: Initiates a new Prakriti evaluation session.',
      'Administer Questionnaire: Conducts standardized questionnaire covering physical, behavioral, and physiological traits.',
      'Practitioner Observations: Records clinical observations and notes.',
      'Prakriti Calculation: Computes Vata, Pitta, and Kapha percentage distribution and dominant Dosha.',
      'Generate Report: Generates comprehensive clinical report with citations and methodology references.'
    ],
    keyModules: [
      {
        title: '6. Questionnaire System & Custom Questionnaire Capability',
        description: 'A baseline questionnaire covering physical characteristics, body structure, skin/hair characteristics, appetite and digestion, sleep patterns, activity patterns, behavioral characteristics, and physiological tendencies. The system should ideally allow institutions or practitioners to import, create, modify, and configure questionnaires.'
      },
      {
        title: '7. Practitioner Observations',
        description: 'Free-form observation field for additional clinical insights not captured through predefined questions (e.g., "Patient appears to have a lean body structure, tends to speak quickly, and reports irregular appetite"). Optional intelligent NLP processing.'
      },
      {
        title: '8. Prakriti Calculation Engine',
        description: 'Calculates Vata, Pitta, and Kapha proportions (e.g., Vata: 45%, Pitta: 35%, Kapha: 20%; Dominant Prakriti: Vata). Teams must document and reference established Ayurvedic methodologies rather than treating scoring as an arbitrary formula.'
      },
      {
        title: '9 & 10. Assessment Report & Visibility',
        description: 'Generates structured report with Patient Demographics, Assessment Context, Prakriti Breakdown, and Observations. Detailed report is accessible to the doctor; patients can receive a simplified constitutional summary without disease claims.'
      },
      {
        title: '11 & 12. Patient History & Methodology References',
        description: 'Supports historical assessment comparison, constitutional stability over time, and documentation of Ayurvedic references distinguishing traditional constitution evaluation from modern disease diagnosis.'
      }
    ],
    scopeForInnovation: [
      'AI & Intelligent Assessment: AI-assisted questionnaire interaction, NLP for practitioner observations, intelligent question selection, adaptive questionnaires.',
      'Data & Analytics: Patient assessment history, constitutional trend visualization, comparison across time, statistical distribution.',
      'Questionnaire Management: Custom questionnaire builder, import/export, version management, configurable scoring rules.',
      'User Experience: Regional-language support (Kannada/Hindi/etc.), tablet-friendly clinical interface, voice-assisted data entry.',
      'Visualization: Dynamic Dosha radar/bar charts, constitutional profiles, and interactive summaries.'
    ],
    outOfScope: [
      'Diagnosis of diseases',
      'Prescription of medicines',
      'Replacing Ayurvedic practitioners',
      'Modern medical diagnosis',
      'Automated treatment decisions',
      'Making medical claims based solely on the generated Prakriti result'
    ],
    keyDesignPrinciple: 'The goal is not to replace an Ayurvedic practitioner, but to build a digital assistant that makes Prakriti assessment more structured, efficient, transparent, and accessible. The practitioner remains at the center of the assessment process.',
    deliverables: [
      '1. Working prototype demonstrating end-to-end flow with sample data',
      '2. Patient management/profile module',
      '3. Baseline Prakriti questionnaire',
      '4. Vata/Pitta/Kapha calculation engine',
      '5. Practitioner observation module',
      '6. Structured assessment report generator',
      '7. Doctor and student workflows',
      '8. Basic role-based access control',
      '9. Documentation of Ayurvedic assessment methodology',
      '10. References used for questionnaire and scoring',
      '11. End-to-end demonstration',
      '12. Brief technical documentation'
    ],
    featureMatrix: [
      { feature: 'Patient profile', requirement: 'Mandatory' },
      { feature: 'Doctor/student assessment workflow', requirement: 'Mandatory' },
      { feature: 'Baseline questionnaire', requirement: 'Mandatory' },
      { feature: 'Vata/Pitta/Kapha calculation', requirement: 'Mandatory' },
      { feature: 'Prakriti result', requirement: 'Mandatory' },
      { feature: 'Practitioner observations', requirement: 'Mandatory' },
      { feature: 'Assessment report', requirement: 'Mandatory' },
      { feature: 'Working prototype', requirement: 'Mandatory' },
      { feature: 'Ayurvedic-only context', requirement: 'Mandatory' },
      { feature: 'Disease diagnosis', requirement: 'Out of scope' },
      { feature: 'Custom questionnaire import', requirement: 'Encouraged / Innovation' },
      { feature: 'Questionnaire builder', requirement: 'Optional' },
      { feature: 'Patient history', requirement: 'Recommended' },
      { feature: 'AI features', requirement: 'Optional' },
      { feature: 'Regional languages', requirement: 'Encouraged' },
      { feature: 'Advanced analytics', requirement: 'Optional' },
      { feature: 'Voice-based assessment', requirement: 'Optional' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PS 02: SMARTBUS (SMVITM Bantakal Transport Dept)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ps-02',
    psCode: 'PS 02',
    title: 'SMARTBUS',
    subtitle: 'Intelligent College Bus Tracking & Notification System',
    oneLineChallenge: '“How can we transform a driver\'s smartphone into an intelligent GPS device that helps colleges, students, and parents know where the bus is, when it will arrive, and when it is close to their boarding point?”',
    summary: 'Develop a scalable college bus tracking and notification system using the driver’s smartphone as the GPS tracking device, featuring automated boarding point geofencing, "Bus is Nearby" alerts, and real-time visibility for students, parents, and administrators.',
    sponsorName: 'SMVITM Bantakal Transport Dept',
    sponsorLogo: HPL_IMAGES.smvitmLogo,
    themeColor: '#059669',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800 border-emerald-300',
    iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconColor: 'text-emerald-700',
    tagBg: 'bg-emerald-50',
    tagText: 'text-emerald-800 border-emerald-200',
    focusAreas: [
      'Smartphone GPS Tracking',
      'Geofencing & Nearby Alerts',
      'ETA Prediction Engine',
      'College Admin Dashboard'
    ],
    background: `College students and parents often face uncertainty regarding the location and arrival time of college buses, especially during peak hours, traffic congestion, route delays, or changes in the regular schedule. Students may have to wait for long periods at boarding points, while parents have limited visibility into whether the student has boarded the bus or whether the bus is approaching.

Currently, many colleges rely on manual communication through phone calls, WhatsApp messages, or announcements. These approaches can be inefficient and difficult to manage when multiple buses and boarding points are involved.

The challenge is to develop a Smart College Bus GPS Tracking and Notification System that provides real-time visibility of college buses using the driver's smartphone as the GPS tracking device, eliminating the need for dedicated GPS hardware.`,
    problemStatement: `Develop a working prototype of a scalable, reliable, and user-friendly college bus tracking and notification system that enables students, parents, and college administrators to monitor college buses in real time.

The system should use the driver's smartphone as the GPS tracking device and transmit the bus's location to a central system while the bus is operating.

Beyond simply displaying the bus on a map, the system should intelligently determine when a bus is approaching a predefined boarding point and provide relevant notifications to students and parents.

The system should also provide an administrative interface through which college authorities can manage buses, routes, boarding points, drivers, and active trips.`,
    objective: [
      'Visible – users can see the real-time location of buses.',
      'Predictable – users can estimate when a bus will reach their boarding point.',
      'Convenient – students and parents receive notifications automatically.',
      'Efficient – colleges can monitor multiple buses and routes from one dashboard.',
      'Cost-effective – existing smartphones can be used instead of dedicated GPS hardware.',
      'Scalable – the system should support multiple buses, routes, and boarding points.'
    ],
    targetUsers: [
      {
        role: '4.1 Students',
        description: 'Students should be able to: Select their assigned bus, select their boarding point, view the live location of their bus, view the bus route and movement status, receive “Bus Nearby” notifications, and view the approximate ETA of the bus.'
      },
      {
        role: '4.2 Parents',
        description: 'Parents should be able to: View the assigned/selected bus, view current location, know when approaching boarding point, receive relevant notifications, and view approximate ETA, reducing the need to continuously contact the college or driver.'
      },
      {
        role: '4.3 College Administration',
        description: 'Administrators should be able to: View all active buses, monitor routes, track buses in real time, view bus/driver status, manage routes, manage boarding points, monitor delays, and monitor unexpected route deviations.'
      }
    ],
    workflowDescription: 'Driver Mobile App → GPS/Location Server → Bus Tracking Engine → Student/Parent Interface → Notification System → College Admin Dashboard',
    workflowSteps: [
      'Bus Departure: Driver launches app and activates active trip.',
      'GPS Tracking: Driver smartphone streams GPS coordinates continuously.',
      'Real-Time Updates: Central tracking engine broadcasts coordinates to map.',
      'Boarding Point Detection: Geofencing detects bus proximity to boarding points.',
      'ETA Calculation: Computes ETA using speed, route, and distance.',
      'Bus Nearby Notification: Automatically alerts students/parents at 1km, 500m, 200m.',
      'Bus Arrival: Confirms arrival at boarding point and college campus.'
    ],
    keyModules: [
      {
        title: '6. Driver\'s Mobile as GPS Device',
        description: 'Driver smartphone acts as primary GPS tracker, eliminating hardware costs. Associates coordinates with bus, route, and active trip. Handles network dropouts, GPS inaccuracies, low-data, and battery optimization.'
      },
      {
        title: '7. Real-Time Bus Tracking on Maps',
        description: 'Live interactive map showing bus location, travel path, speed, and status. Capable of displaying multiple active fleet vehicles simultaneously.'
      },
      {
        title: '8. Boarding Point Geofencing',
        description: 'Maintains predefined boarding points with configurable radius (e.g. 500m geofence). Triggers automated alerts as soon as the vehicle crosses boundaries.'
      },
      {
        title: '9. “Bus is Nearby” Automated Notifications',
        description: 'Sends instant alerts: e.g., "College Bus KA-XX-XXXX is approximately 500 metres from your boarding point." Triggers at configurable milestones (1km, 500m, 200m).'
      },
      {
        title: '10. Estimated Time of Arrival (ETA) Engine',
        description: 'Calculates arrival time using current speed, route distance, and optional historical trip patterns or traffic awareness.'
      },
      {
        title: '11 & 12. Student/Parent UI & College Admin Dashboard',
        description: 'Clean user interface for students and parents to track their bus and receive alerts. Centralized command dashboard for transport authorities to manage routes, drivers, stops, and monitor delays.'
      }
    ],
    scopeForInnovation: [
      'GPS & Tracking: Real-time high accuracy, offline GPS buffering, low-data mode, background battery management.',
      'Intelligent Notifications: Smart push notifications, parent/student personalization, priority alert channels.',
      'ETA & Prediction: AI/ML-based ETA prediction, traffic-aware travel time, historical trip delay analysis.',
      'Route Intelligence: Route deviation detection, abnormal stop alarms, historical route analytics.',
      'Driver & Safety: Driver authentication, trip activation workflow, emergency/SOS panic button.'
    ],
    keyDesignPrinciple: 'The goal is not simply to put a bus on a map. The goal is to transform raw GPS data into useful, timely information for students, parents, and college administrators to answer: Where is the bus? When will it arrive? Is it close enough for me to leave?',
    deliverables: [
      '1. Working prototype',
      '2. Driver mobile/GPS tracking interface',
      '3. Real-time bus tracking system',
      '4. Boarding point and geofencing module',
      '5. Bus-nearby notification mechanism',
      '6. ETA estimation engine',
      '7. Student/parent interface',
      '8. College administration dashboard',
      '9. Bus, route, and trip management',
      '10. Technical documentation',
      '11. System architecture',
      '12. End-to-end demonstration of a complete bus journey'
    ],
    featureMatrix: [
      { feature: 'Working prototype', requirement: 'Mandatory' },
      { feature: 'Driver smartphone as GPS device', requirement: 'Mandatory' },
      { feature: 'Real-time bus tracking', requirement: 'Mandatory' },
      { feature: 'Bus/route/trip identification', requirement: 'Mandatory' },
      { feature: 'Boarding point management', requirement: 'Mandatory' },
      { feature: 'Boarding point geofencing', requirement: 'Mandatory' },
      { feature: '“Bus Nearby” notification', requirement: 'Mandatory' },
      { feature: 'Student/parent interface', requirement: 'Mandatory' },
      { feature: 'ETA estimation', requirement: 'Mandatory' },
      { feature: 'College admin dashboard', requirement: 'Mandatory' },
      { feature: 'Multiple-bus support', requirement: 'Expected' },
      { feature: 'AI/ML-based ETA', requirement: 'Optional / Innovation' },
      { feature: 'Traffic-aware prediction', requirement: 'Optional' },
      { feature: 'Route deviation detection', requirement: 'Optional / Innovation' },
      { feature: 'Historical analytics', requirement: 'Optional' },
      { feature: 'Offline GPS buffering', requirement: 'Optional' },
      { feature: 'Driver authentication', requirement: 'Optional / Innovation' },
      { feature: 'Emergency/SOS', requirement: 'Optional' },
      { feature: 'Advanced AI features', requirement: 'Optional' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PS 03: Sahayak (Shirva Police Station)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ps-03',
    psCode: 'PS 03',
    title: 'Sahayak',
    subtitle: 'A Community Assistance Platform for Senior Citizens',
    oneLineChallenge: 'Design and build a trusted, voice-first community assistance platform that connects senior citizens in and around Shirva with police-verified volunteers for timely support with everyday needs and urgent situations, while intelligently escalating genuine emergencies to existing emergency services.',
    summary: 'Design and build a trusted, voice-first community assistance platform that connects senior citizens in and around Shirva with police-verified volunteers for timely support with everyday needs and urgent situations, while intelligently escalating genuine emergencies to existing emergency services.',
    sponsorName: 'Shirva Police Station',
    sponsorLogo: HPL_IMAGES.shirvaLogo,
    themeColor: '#2563EB',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800 border-blue-300',
    iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
    iconColor: 'text-blue-700',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-800 border-blue-200',
    focusAreas: [
      'Voice-First Access',
      'Volunteer Management',
      'Emergency Escalation (112)',
      'Shirva Police Verification'
    ],
    background: `Senior citizens living in and around Shirva may face difficulties in accessing essential services, particularly when they live alone or do not have someone immediately available to assist them.

A simple requirement—such as getting medicines, arranging transportation, purchasing essential items, or getting assistance with an urgent situation—can become challenging for an elderly person due to age, mobility limitations, lack of transportation, or difficulty using digital applications.

While emergency services such as 112 already exist, there is a gap between emergency response and day-to-day assistance.

The proposed solution aims to create a community-driven assistance system that connects senior citizens who need help with verified volunteers from local organizations, clubs, and corporations willing to provide assistance.`,
    problemStatement: `Develop a working prototype of an accessible and reliable community assistance platform that enables senior citizens in and around Shirva to request assistance through a simple and familiar communication mechanism, primarily voice calls.

The system should capture the senior citizen’s requirement, understand the nature and urgency of the request, and connect the request with an appropriate verified volunteer who can provide the required assistance.

The platform should support both emergency-related situations, while recognizing that critical emergencies should continue to be handled through the existing 112 emergency response system, and non-emergency or routine assistance such as purchasing medicines, arranging an auto-rickshaw, obtaining essential items, accompanying someone to a location, or other reasonable day-to-day support.`,
    objective: [
      'Simple & Accessible – requesting help is natural and familiar for elderly residents.',
      'Fast & Reliable – urgent requests are dispatched without delay.',
      'Safe & Trusted – volunteers are verified and approved by Shirva Police Station.',
      'Emergency Aware – genuine crises are instantly escalated to 112.',
      'Scalable – supports growing volunteer groups across Shirva and surrounding villages.'
    ],
    targetUsers: [
      {
        role: 'Primary Users — Senior Citizens',
        description: 'People, particularly those around 60 years and above, who require assistance with emergency or routine needs and may struggle with digital touch interfaces.'
      },
      {
        role: 'Assistance Providers — Verified Volunteers',
        description: 'Members of Lions Clubs, Leo Clubs, local community organizations, NGOs, corporate volunteering programs, and other recognized organizations or individuals willing to volunteer.'
      },
      {
        role: 'Administrator — Shirva Police',
        description: 'Responsible for reviewing volunteer registrations, verifying volunteers, approving or rejecting applications, managing the trusted volunteer network, and handling requests requiring police/emergency intervention.'
      }
    ],
    workflowDescription: 'Senior Citizen → Voice Call → Request Understanding → Request Classification → Appropriate Action → Volunteer / Police → Assistance',
    workflowSteps: [
      'Voice Call: Senior citizen dials designated assistance line.',
      'Request Understanding: Voice agent / IVR / speech recognition processes request spoken in natural language (Kannada/English/Tulu).',
      'Urgency Classification: Distinguishes routine tasks from critical emergencies.',
      'Emergency Handling: Critical life/safety emergencies escalated to 112 immediately.',
      'Volunteer Matching: Routine requests dispatched to nearest verified volunteer.',
      'Acceptance & Fulfillment: Volunteer accepts task and delivers assistance.',
      'Completion & Audit: Request logged and marked complete with police oversight.'
    ],
    keyModules: [
      {
        title: '6. Emergency Handling & 112 Escalation',
        description: 'The platform does not attempt to replace 112. Serious medical emergencies, fire, accidents, or threats are automatically identified and escalated immediately to 112 / police authority.'
      },
      {
        title: '7. Volunteer Registration & Shirva Police Verification',
        description: 'Workflow: Registration → Police Background Review → Verification → Official Approval → Activation. Ensures safety and trust for vulnerable senior citizens.'
      },
      {
        title: '8 & 9. Request Management & Intelligent Volunteer Assignment',
        description: 'Maintains structured request records (ID, Senior Citizen, Location, Requirement, Priority, Status). Matches by proximity, availability, skills, and workload.'
      },
      {
        title: '10. Primary Requirement: Voice-Based Access',
        description: 'Voice calling is the primary interaction channel (AI voice agents, IVR, STT/TTS). WhatsApp, mobile apps, and web interfaces serve only as auxiliary channels.'
      }
    ],
    scopeForInnovation: [
      'AI & Voice: Voice agent with regional-language support (Kannada/Tulu), natural language understanding, and automated urgency detection.',
      'Intelligent Matching: Geo-proximity dispatch, volunteer skill mapping, priority-based queuing.',
      'Safety & Trust: Police administrative portal, volunteer reputation scoring, SOS panic alerts, audit logs.',
      'Operations: Real-time operations console for Shirva Police and community club coordinators.'
    ],
    keyDesignPrinciple: 'The solution should not make technology a barrier for the people it is intended to help. Design a system that is simple enough for a senior citizen to use, reliable enough for emergency-adjacent situations, and scalable enough to support a growing volunteer network.',
    deliverables: [
      '1. Working prototype demonstrating core user journey',
      '2. Volunteer registration and police verification module',
      '3. Senior citizen assistance request flow with voice calling as primary channel',
      '4. Request management system (creation, tracking, assignment, completion)',
      '5. Volunteer interface for receiving and responding to requests',
      '6. Emergency identification and escalation flow (112)',
      '7. Brief technical documentation covering architecture and security',
      '8. Demonstration/presentation showing a realistic end-to-end scenario'
    ],
    featureMatrix: [
      { feature: 'Assistance for senior citizens', requirement: 'Mandatory' },
      { feature: 'Routine + urgent assistance', requirement: 'Mandatory' },
      { feature: 'Voice call as primary access', requirement: 'Mandatory' },
      { feature: 'Working prototype', requirement: 'Mandatory' },
      { feature: 'Volunteer self-registration', requirement: 'Mandatory' },
      { feature: 'Police verification of volunteers', requirement: 'Mandatory' },
      { feature: 'Request management', requirement: 'Mandatory' },
      { feature: 'Emergency identification/escalation', requirement: 'Mandatory' },
      { feature: 'Specific AI technology', requirement: 'Open' },
      { feature: 'Specific voice technology', requirement: 'Open' },
      { feature: 'Volunteer matching algorithm', requirement: 'Open' },
      { feature: 'WhatsApp/app/web', requirement: 'Optional' },
      { feature: 'Regional-language support', requirement: 'Encouraged' },
      { feature: 'AI agent', requirement: 'Optional / Innovation area' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // PS 04: SWMS (IAHV / Art of Living)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ps-04',
    psCode: 'PS 04',
    title: 'SWMS',
    subtitle: 'Smart Waste Management Simulator',
    oneLineChallenge: '“How can we build a conversational solid waste management simulator that understands the demographic, geographical, infrastructural, environmental, economic, and cultural characteristics of a human habitation and generates an optimized, resilient 20-year waste collection, treatment, and disposal plan?”',
    summary: 'Develop a simulation-based decision-support platform that models solid waste generation, collection, treatment, and disposal for human habitations over a 20-year timeline across 7 parameter categories, featuring conversational querying and disaster resilience analysis.',
    sponsorName: 'IAHV (Art of Living)',
    sponsorLogo: HPL_IMAGES.iahvLogo,
    themeColor: '#EA580C',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-800 border-orange-300',
    iconBg: 'bg-orange-50 text-orange-700 border-orange-200',
    iconColor: 'text-orange-700',
    tagBg: 'bg-orange-50',
    tagText: 'text-orange-800 border-orange-200',
    focusAreas: [
      '20-Year Waste Simulation',
      '7-Parameter Modeling',
      'Disaster & Extreme Conditions',
      'Conversational AI Interface'
    ],
    background: `Solid waste management is a complex and highly localized problem. The quantity, composition, collection requirements, treatment options, and disposal needs of solid waste can vary significantly depending on the characteristics of a human habitation.

Factors such as demography, community infrastructure, industrial activities, natural resources, terrain, economic conditions, and cultural and contextual characteristics can directly or indirectly influence the generation, collection, treatment, and disposal of solid waste.

Traditional waste-management planning often depends on static assessments and manually prepared plans. Such approaches may not adequately account for long-term demographic changes, infrastructure development, extreme conditions, unexpected events, or natural calamities.

There is therefore a need for a simulation-based decision-support platform that can model these factors and help planners understand how different waste-management strategies may perform over time.`,
    problemStatement: `Develop a Solid Waste Management Simulator for human habitations such as villages, wards, towns, and cities.

The simulator should consider the characteristics and conditions of the selected human habitat, including:
• Demography
• Community infrastructure
• Industrial activities
• Natural resources
• Terrain
• Economic conditions
• Cultural and contextual significance

Using these parameters, the system should simulate and generate an optimized garbage collection, treatment, and disposal plan for a 20-year timeline.

The platform should allow users to explore different scenarios, understand the impact of changing parameters, and evaluate how the waste-management system may respond to normal, extreme, and unexpected conditions.

The simulator should ultimately provide the results through a conversational interface, allowing users to interact with the simulation and ask questions about the generated scenarios, plans, costs, and outcomes.`,
    objective: [
      'Model solid-waste characteristics of a selected human habitation.',
      'Integrate geographical, demographic, infrastructural, environmental, economic, and cultural data.',
      'Simulate waste generation and management over a 20-year period.',
      'Optimize garbage collection, treatment, and disposal strategies.',
      'Forecast future waste-management scenarios.',
      'Evaluate the impact of extreme conditions (monsoons, floods).',
      'Simulate unexpected events and natural calamities.',
      'Perform sensitivity analysis on important parameters.',
      'Generate visual, graphical, and budgetary outputs.',
      'Provide a conversational natural-language interface for interacting with the simulator.'
    ],
    targetUsers: [
      {
        role: 'Municipal Corporations & Local Government',
        description: 'Evaluate long-term waste handling capacities, calculate capital expenditure, and optimize vehicle fleets.'
      },
      {
        role: 'Urban & Rural Planners',
        description: 'Design waste collection routes, treatment plant sites, and landfill capacity forecasts for master development plans.'
      },
      {
        role: 'Environmental Authorities & Policy Makers',
        description: 'Simulate ecological impacts, carbon footprints, and disaster resilience under abnormal weather and flooding.'
      },
      {
        role: 'Researchers & Academic Institutions',
        description: 'Analyze solid waste dynamics, test parametric hypotheses, and assess circular economy interventions.'
      }
    ],
    workflowDescription: 'Habitation Data → Data Validation & Integration → Simulation Engine → Scenario Forecasting → Optimization → Visualization & Reports → Conversational Interface',
    workflowSteps: [
      '1. Parameter Input: Ingests habitation data across 7 parameter categories.',
      '2. Validation & Mapping: GIS overlay on roads, settlements, water bodies, and terrain.',
      '3. 20-Year Simulation Engine: Models waste generation, treatment options, and landfill volumes.',
      '4. Scenario & Calamity Testing: Injects flood, landslide, or population surge conditions.',
      '5. Budgeting & Optimization: Computes multi-year capital and operational expenditures.',
      '6. Conversational Querying: Planners query the system using natural language.'
    ],
    keyModules: [
      {
        title: '6. Seven Parameter Categories Modeled',
        description: '1. Demography (population, density, growth, floating pop) • 2. Community Infrastructure (roads, alleys, residential/industrial zones, schools) • 3. Industrial Activities (organized/unorganized, specific waste types) • 4. Natural Resources (rainfall, water bodies, forests) • 5. Terrain (slope, soil, wind, water) • 6. Economic Conditions (income, purchasing parity) • 7. Cultural Significance (food habits, local practices).'
      },
      {
        title: '8. Drop 1 – Backend: Geographical Maps & Data Integration',
        description: 'Detailed GIS maps representing roads, habitation, industries, and terrain. Ingestion, validation, and normalization of datasets across all 7 categories.'
      },
      {
        title: '9. Drop 2 – Computation & Scalability: 20-Year Forecasting & Calamity Modeling',
        description: 'Simulates collection, treatment, and disposal over 20 years. Models abnormal conditions such as monsoon floods, road blockages, and infrastructure disruption. Scalable from Village → Ward → Town → City.'
      },
      {
        title: '10 & 11. Drop 3 – Frontend, Sensitivity Testing & Conversational AI',
        description: 'Interactive parameter sliders (e.g. population +20%), budgeting graphs, and a conversational interface answering queries: "What will be estimated waste after 10 years?", "Which strategy is most cost-effective during floods?"'
      }
    ],
    scopeForInnovation: [
      'Simulation & Optimization: Multi-objective optimization, route planning algorithms, dynamic resource allocation.',
      'AI/ML: Waste generation machine learning models, demand prediction, route efficiency forecasting.',
      'GIS & Spatial Analysis: Optimal treatment plant siting, spatial accessibility analysis.',
      'Disaster Resilience: Extreme rainfall scenarios, flood emergency rerouting, crisis waste containment.',
      'Conversational AI: Natural-language simulator control, automated scenario explanations, instant executive reports.'
    ],
    keyDesignPrinciple: 'The goal is not simply to simulate how much waste a habitation generates. The goal is to build a decision-support system that can understand the characteristics of a human habitat, forecast future waste-management requirements, evaluate different scenarios, and recommend an optimized and resilient waste-management plan.\nData → Simulation → Forecast → Optimization → Decision → Explanation',
    deliverables: [
      '1. Working prototype',
      '2. Geographical/map representation',
      '3. Parameter-data input system (7 categories)',
      '4. Data validation and integration module',
      '5. Waste-management simulation engine',
      '6. 20-year forecasting capability',
      '7. Collection, treatment, and disposal planning',
      '8. Extreme-condition simulation',
      '9. Unexpected-event/natural-calamity simulation',
      '10. Sensitivity-testing capability',
      '11. Visualization and graphical reporting',
      '12. Budgeting/reporting module',
      '13. Conversational interface',
      '14. Integration between chatbot and simulator',
      '15. System architecture/documentation',
      '16. End-to-end demonstration'
    ],
    featureMatrix: [
      { feature: 'Human-habitation data input', requirement: 'Mandatory' },
      { feature: 'Geographical/map representation', requirement: 'Mandatory' },
      { feature: 'Seven parameter categories', requirement: 'Mandatory' },
      { feature: 'Data validation/integration', requirement: 'Mandatory' },
      { feature: 'Waste-management simulation', requirement: 'Mandatory' },
      { feature: '20-year forecasting', requirement: 'Mandatory' },
      { feature: 'Collection, treatment & disposal planning', requirement: 'Mandatory' },
      { feature: 'Extreme-condition scenarios', requirement: 'Mandatory' },
      { feature: 'Unexpected event/natural calamity scenarios', requirement: 'Mandatory' },
      { feature: 'Sensitivity testing', requirement: 'Mandatory' },
      { feature: 'Visual reports/graphics', requirement: 'Mandatory' },
      { feature: 'Budgeting output', requirement: 'Mandatory' },
      { feature: 'Conversational interface', requirement: 'Mandatory' },
      { feature: 'Full chatbot–simulator integration', requirement: 'Mandatory' },
      { feature: 'AI/ML forecasting', requirement: 'Optional / Innovation' },
      { feature: 'Advanced optimization', requirement: 'Optional / Innovation' },
      { feature: 'GIS-based advanced analysis', requirement: 'Optional' },
      { feature: 'Advanced disaster modelling', requirement: 'Optional' },
      { feature: 'Voice-based interaction', requirement: 'Optional' },
      { feature: 'Advanced analytics', requirement: 'Optional' }
    ]
  }
];

/**
 * Generates an unabridged, clean plain-text brief of the selected problem statement.
 */
function generatePsBriefText(ps: Round2ProblemStatement): string {
  const divider = '═'.repeat(76);
  const subDivider = '─'.repeat(76);

  let text = '';
  text += `${divider}\n`;
  text += `HACKATHON PREMIER LEAGUE 2026 — ROUND 2 OFFICIAL SPECIFICATION\n`;
  text += `${ps.psCode}: ${ps.title.toUpperCase()}\n`;
  text += `${ps.subtitle}\n`;
  text += `Presented by: ${ps.sponsorName}\n`;
  text += `${divider}\n\n`;

  text += `ONE-LINE CHALLENGE:\n${ps.oneLineChallenge}\n\n`;
  text += `${subDivider}\n1. BACKGROUND\n${subDivider}\n${ps.background}\n\n`;
  text += `${subDivider}\n2. PROBLEM STATEMENT\n${subDivider}\n${ps.problemStatement}\n\n`;

  text += `${subDivider}\n3. OBJECTIVES\n${subDivider}\n`;
  ps.objective.forEach((obj) => {
    text += `• ${obj}\n`;
  });
  text += '\n';

  text += `${subDivider}\n4. TARGET USERS\n${subDivider}\n`;
  ps.targetUsers.forEach(u => {
    text += `[${u.role}]\n${u.description}\n\n`;
  });

  text += `${subDivider}\n5. CORE WORKFLOW\n${subDivider}\n`;
  text += `Overview: ${ps.workflowDescription}\n\n`;
  ps.workflowSteps.forEach(step => {
    text += `• ${step}\n`;
  });
  text += '\n';

  text += `${subDivider}\n6. DETAILED SPECIFICATIONS & MODULES\n${subDivider}\n`;
  ps.keyModules.forEach(mod => {
    text += `${mod.title}\n${mod.description}\n\n`;
  });

  text += `${subDivider}\n7. SCOPE FOR INNOVATION\n${subDivider}\n`;
  ps.scopeForInnovation.forEach(item => {
    text += `• ${item}\n`;
  });
  text += '\n';

  if (ps.outOfScope && ps.outOfScope.length > 0) {
    text += `${subDivider}\n8. OUT OF SCOPE\n${subDivider}\n`;
    ps.outOfScope.forEach(item => {
      text += `• ${item}\n`;
    });
    text += '\n';
  }

  text += `${subDivider}\nKEY DESIGN PRINCIPLE\n${subDivider}\n`;
  text += `${ps.keyDesignPrinciple}\n\n`;

  text += `${subDivider}\nEXPECTED DELIVERABLES\n${subDivider}\n`;
  ps.deliverables.forEach(del => {
    text += `${del}\n`;
  });
  text += '\n';

  text += `${subDivider}\nMANDATORY VS INNOVATION REQUIREMENTS MATRIX\n${subDivider}\n`;
  text += `${'Feature / Component'.padEnd(45)} | Requirement\n`;
  text += `${'-'.repeat(45)} | ${'-'.repeat(25)}\n`;
  ps.featureMatrix.forEach(row => {
    text += `${row.feature.padEnd(45)} | ${row.requirement}\n`;
  });
  text += `\n${divider}\n`;
  text += `END OF SPECIFICATION: ${ps.psCode} - ${ps.title}\n`;
  text += `Hackathon Premier League (HPL 2026)\n`;
  text += `${divider}\n`;

  return text;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates an unabridged, professionally formatted Microsoft Word document (HTML/XML format)
 * that opens natively in MS Word, LibreOffice, WPS Office, and Google Docs with rich styles,
 * tables, headers, and color themes.
 */
function generatePsWordHtml(ps: Round2ProblemStatement): string {
  const primaryColor = ps.themeColor || '#1E1B4B';
  const sponsorName = escapeHtml(ps.sponsorName);
  const psTitle = escapeHtml(ps.title);
  const psSubtitle = escapeHtml(ps.subtitle);
  const psCode = escapeHtml(ps.psCode);
  const oneLineChallenge = escapeHtml(ps.oneLineChallenge);

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
      xmlns:w='urn:schemas-microsoft-com:office:word'
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${psCode} - ${psTitle}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 8.27in 11.69in; /* A4 */
      margin: 1.0in 1.0in 1.0in 1.0in;
      mso-header-margin: 0.5in;
      mso-footer-margin: 0.5in;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #1E1B4B;
      background-color: #FFFFFF;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 2.5pt solid ${primaryColor};
      padding-bottom: 12pt;
      margin-bottom: 18pt;
    }
    .title-hpl {
      font-size: 13pt;
      font-weight: bold;
      color: #EA580C;
      text-transform: uppercase;
      letter-spacing: 1.5pt;
      margin: 0;
    }
    .org-subtitle {
      font-size: 9.5pt;
      color: #4B5563;
      margin-top: 2pt;
      margin-bottom: 8pt;
    }
    .doc-title {
      font-size: 24pt;
      font-weight: bold;
      color: #1E1B4B;
      margin-top: 6pt;
      margin-bottom: 2pt;
    }
    .doc-subtitle {
      font-size: 13pt;
      color: #4B5563;
      font-style: italic;
      margin-top: 0;
      margin-bottom: 10pt;
    }
    .meta-box {
      background-color: #F8FAFC;
      border: 1pt solid #CBD5E1;
      padding: 8pt 12pt;
      border-radius: 4pt;
      margin-bottom: 16pt;
    }
    .meta-item {
      font-size: 10pt;
      color: #334155;
    }
    .meta-item strong {
      color: #0F172A;
    }
    h2 {
      font-size: 13.5pt;
      color: ${primaryColor};
      font-weight: bold;
      border-bottom: 1.5pt solid ${primaryColor};
      padding-bottom: 4pt;
      margin-top: 18pt;
      margin-bottom: 8pt;
      text-transform: uppercase;
    }
    h3 {
      font-size: 11pt;
      color: #1E1B4B;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 4pt;
    }
    p {
      margin-top: 0;
      margin-bottom: 8pt;
      text-align: justify;
    }
    .callout {
      background-color: #FEF3C7;
      border-left: 4pt solid #F59E0B;
      padding: 10pt 14pt;
      margin: 12pt 0;
      font-weight: bold;
      color: #78350F;
    }
    .user-card {
      background-color: #F8FAFC;
      border-left: 3.5pt solid ${primaryColor};
      padding: 8pt 12pt;
      margin-bottom: 8pt;
    }
    .module-card {
      background-color: #FFFFFF;
      border: 1pt solid #E2E8F0;
      border-left: 3.5pt solid ${primaryColor};
      padding: 8pt 12pt;
      margin-bottom: 10pt;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10pt;
      margin-bottom: 16pt;
    }
    table.data-table th {
      background-color: #1E1B4B;
      color: #FFFFFF;
      text-align: left;
      padding: 8pt 10pt;
      font-size: 10pt;
      font-weight: bold;
      border: 1pt solid #1E1B4B;
    }
    table.data-table td {
      padding: 7pt 10pt;
      border: 1pt solid #CBD5E1;
      font-size: 9.5pt;
      vertical-align: top;
    }
    table.data-table tr:nth-child(even) {
      background-color: #F8FAFC;
    }
    .pill {
      display: inline-block;
      padding: 2pt 8pt;
      font-size: 8.5pt;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 3pt;
    }
    .pill-mandatory {
      background-color: #D1FAE5;
      color: #065F46;
      border: 1pt solid #A7F3D0;
    }
    .pill-scope {
      background-color: #EDE9FE;
      color: #5B21B6;
      border: 1pt solid #DDD6FE;
    }
    .pill-out {
      background-color: #FFE4E6;
      color: #9F1239;
      border: 1pt solid #FECDD3;
    }
    ul, ol {
      margin-top: 0;
      margin-bottom: 10pt;
      padding-left: 22pt;
    }
    li {
      margin-bottom: 4pt;
    }
    .footer-note {
      margin-top: 30pt;
      padding-top: 10pt;
      border-top: 1pt solid #CBD5E1;
      font-size: 9pt;
      color: #64748B;
      text-align: center;
    }
  </style>
</head>
<body>
<div class="Section1">
  <!-- Top Banner / Header -->
  <table class="header-table">
    <tr>
      <td style="border:none; padding:0;">
        <p class="title-hpl">HACKATHON PREMIER LEAGUE (HPL 2026)</p>
        <p class="org-subtitle">Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM), Bantakal • In Association with Code Troopers</p>
        <div class="doc-title">${psCode}: ${psTitle}</div>
        <div class="doc-subtitle">${psSubtitle}</div>
      </td>
    </tr>
  </table>

  <!-- Metadata Summary -->
  <div class="meta-box">
    <table style="width:100%; border:none;">
      <tr>
        <td style="border:none; width:50%; padding:2pt 0;" class="meta-item">
          <strong>Official Sponsor:</strong> ${sponsorName}
        </td>
        <td style="border:none; width:50%; padding:2pt 0;" class="meta-item">
          <strong>Stage:</strong> Round 2 Championship Arena
        </td>
      </tr>
      <tr>
        <td style="border:none; width:50%; padding:2pt 0;" class="meta-item">
          <strong>Focus Areas:</strong> ${escapeHtml(ps.focusAreas.join(', '))}
        </td>
        <td style="border:none; width:50%; padding:2pt 0;" class="meta-item">
          <strong>Evaluation Weight:</strong> 100 Points Total
        </td>
      </tr>
    </table>
  </div>

  <!-- One-Line Challenge -->
  <div class="callout">
    CHALLENGE OVERVIEW:<br>
    <span style="font-weight:normal; font-style:italic;">“${oneLineChallenge}”</span>
  </div>

  <!-- 1. Background -->
  <h2>1. Background & Problem Context</h2>
  <div>
    ${ps.background.split('\n\n').map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('')}
  </div>

  <!-- 2. Problem Statement -->
  <h2>2. Problem Statement</h2>
  <div>
    ${ps.problemStatement.split('\n\n').map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`).join('')}
  </div>

  <!-- 3. Primary Objectives -->
  <h2>3. Primary Objectives</h2>
  <ul>
    ${ps.objective.map(obj => `<li>${escapeHtml(obj)}</li>`).join('')}
  </ul>

  <!-- 4. Target Users -->
  <h2>4. Target Users & Stakeholder Roles</h2>
  ${ps.targetUsers.map(u => `
    <div class="user-card">
      <div style="font-weight:bold; font-size:10.5pt; color:#1E1B4B; margin-bottom:2pt;">${escapeHtml(u.role)}</div>
      <div style="font-size:10pt; color:#334155;">${escapeHtml(u.description)}</div>
    </div>
  `).join('')}

  <!-- 5. Core Workflow -->
  <h2>5. Core System & User Journey Workflow</h2>
  <p><strong>Workflow Overview:</strong> ${escapeHtml(ps.workflowDescription)}</p>
  <ol>
    ${ps.workflowSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
  </ol>

  <!-- 6. Detailed Technical Specifications & Modules -->
  <h2>6. Detailed Technical Specifications & Modules</h2>
  ${ps.keyModules.map(mod => `
    <div class="module-card">
      <div style="font-weight:bold; font-size:11pt; color:#1E1B4B; margin-bottom:3pt;">${escapeHtml(mod.title)}</div>
      <div style="font-size:10pt; color:#334155;">${escapeHtml(mod.description).replace(/\n/g, '<br>')}</div>
    </div>
  `).join('')}

  <!-- 7. Scope for Innovation -->
  <h2>7. Scope for Innovation & Value Additions</h2>
  <ul>
    ${ps.scopeForInnovation.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
  </ul>

  <!-- 8. Out of Scope (if present) -->
  ${ps.outOfScope && ps.outOfScope.length > 0 ? `
    <h2>8. Out of Scope (Round 2 Exclusions)</h2>
    <ul>
      ${ps.outOfScope.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
  ` : ''}

  <!-- 9. Key Design Principle -->
  <h2>9. Key Design Principle</h2>
  <div style="background-color:#EFF6FF; border-left:4pt solid #2563EB; padding:8pt 12pt; margin:8pt 0; font-size:10.5pt;">
    <strong>Design Anchor:</strong> ${escapeHtml(ps.keyDesignPrinciple)}
  </div>

  <!-- 10. Expected Deliverables -->
  <h2>10. Expected Deliverables & Evaluation Submission</h2>
  <ul>
    ${ps.deliverables.map(del => `<li>${escapeHtml(del)}</li>`).join('')}
  </ul>

  <!-- 11. Mandatory vs Innovation Feature Matrix -->
  <h2>11. Mandatory vs. Innovation Feature Matrix</h2>
  <table class="data-table">
    <thead>
      <tr>
        <th style="width:65%;">Feature / Component Description</th>
        <th style="width:35%;">Classification / Requirement</th>
      </tr>
    </thead>
    <tbody>
      ${ps.featureMatrix.map(row => {
        const isMandatory = row.requirement.toLowerCase().includes('mandatory');
        const isOut = row.requirement.toLowerCase().includes('out of scope');
        const pillClass = isMandatory ? 'pill-mandatory' : isOut ? 'pill-out' : 'pill-scope';
        return `
          <tr>
            <td><strong>${escapeHtml(row.feature)}</strong></td>
            <td><span class="pill ${pillClass}">${escapeHtml(row.requirement)}</span></td>
          </tr>
        `;
      }).join('')}
    </tbody>
  </table>

  <!-- Official Footer -->
  <div class="footer-note">
    <p><strong>Hackathon Premier League (HPL 2026)</strong> • Official Stakeholder Problem Brief</p>
    <p>Organized by SMVITM Bantakal in association with Code Troopers • All technical specifications verified with ${sponsorName}.</p>
  </div>
</div>
</body>
</html>`;
}

/**
 * Loads the docx library dynamically from CDN (same pattern used for PptxGenJS in PresentationPage).
 * Returns the global docx object.
 */
async function loadDocxLibrary(): Promise<any> {
  if ((window as any).docx) {
    return (window as any).docx;
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js';
    script.onload = () => {
      if ((window as any).docx) {
        resolve((window as any).docx);
      } else {
        reject(new Error('docx library loaded but window.docx not found'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load docx library from CDN'));
    document.head.appendChild(script);
  });
}

/**
 * Downloads the unabridged problem statement specification as an authentic Microsoft Word document (.docx).
 * Uses docx (Office Open XML) to generate a genuine .docx file that opens in MS Word with zero format warnings.
 */
async function downloadPsWordDoc(ps: Round2ProblemStatement) {
  const cleanPsCode = ps.psCode.replace(/\s+/g, '_');
  const cleanTitle = ps.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `HPL_2026_${cleanPsCode}_${cleanTitle}_Brief.docx`;

  try {
    const docxLib = await loadDocxLibrary();
    const { 
      Document, 
      Packer, 
      Paragraph, 
      TextRun, 
      HeadingLevel, 
      Table, 
      TableRow, 
      TableCell, 
      WidthType, 
      AlignmentType, 
      BorderStyle, 
      ShadingType 
    } = docxLib;

    const NAVY = '1E1B4B';
    const AMBER = 'B45309';
    const PURPLE = '7C3AED';
    const GRAY_BORDER = 'CBD5E1';
    const LIGHT_BG = 'F8FAFC';

    // Helper functions for Word elements
    const createHeading1 = (text: string) => 
      new Paragraph({
        text,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 320, after: 140 },
      });

    const createHeading2 = (text: string) =>
      new Paragraph({
        text,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 100 },
      });

    const createParagraph = (text: string, options: any = {}) =>
      new Paragraph({
        children: [
          new TextRun({
            text,
            size: 22, // 11pt
            font: 'Calibri',
            color: '1E293B',
            ...options,
          })
        ],
        spacing: { before: 80, after: 120, line: 276 },
      });

    const createBulletPoint = (text: string, boldPrefix = '') =>
      new Paragraph({
        bullet: { level: 0 },
        children: [
          ...(boldPrefix ? [new TextRun({ text: boldPrefix, bold: true, size: 22, font: 'Calibri', color: NAVY })] : []),
          new TextRun({ text, size: 22, font: 'Calibri', color: '1E293B' })
        ],
        spacing: { before: 60, after: 60, line: 260 },
      });

    // Content paragraphs
    const children: any[] = [];

    // Title Block
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: 'HACKATHON PREMIER LEAGUE (HPL 2026)',
            bold: true,
            size: 28, // 14pt
            color: NAVY,
            font: 'Calibri',
          })
        ],
        spacing: { before: 0, after: 60 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: 'Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM), Bantakal\nIn Association with Code Troopers • Official Problem Statement Brief',
            size: 20,
            color: '64748B',
            font: 'Calibri',
            italics: true,
          })
        ],
        spacing: { before: 0, after: 240 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `${ps.psCode}: ${ps.title}`,
            bold: true,
            size: 36, // 18pt
            color: PURPLE,
            font: 'Calibri',
          })
        ],
        spacing: { before: 100, after: 80 },
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: ps.subtitle,
            bold: true,
            size: 24, // 12pt
            color: AMBER,
            font: 'Calibri',
          })
        ],
        spacing: { before: 0, after: 200 },
      })
    );

    // Meta Table
    const metaBorder = {
      top: { style: BorderStyle.SINGLE, size: 1, color: GRAY_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: GRAY_BORDER },
      left: { style: BorderStyle.SINGLE, size: 1, color: GRAY_BORDER },
      right: { style: BorderStyle.SINGLE, size: 1, color: GRAY_BORDER },
    };

    const metaTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: metaBorder,
              shading: { fill: 'EEF2FF', type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Official Problem Sponsor: ', bold: true, size: 20, font: 'Calibri', color: NAVY }),
                    new TextRun({ text: ps.sponsorName, size: 20, font: 'Calibri', color: '1E293B' }),
                  ],
                  spacing: { before: 60, after: 60 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Round: ', bold: true, size: 20, font: 'Calibri', color: NAVY }),
                    new TextRun({ text: 'Round 2 - Live Competitive Prototyping', size: 20, font: 'Calibri', color: '1E293B' }),
                  ],
                  spacing: { before: 0, after: 60 },
                }),
              ],
            }),
            new TableCell({
              borders: metaBorder,
              shading: { fill: 'EEF2FF', type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Target Track: ', bold: true, size: 20, font: 'Calibri', color: NAVY }),
                    new TextRun({ text: `${ps.psCode} Track Challenge`, size: 20, font: 'Calibri', color: '1E293B' }),
                  ],
                  spacing: { before: 60, after: 60 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Deliverable Status: ', bold: true, size: 20, font: 'Calibri', color: NAVY }),
                    new TextRun({ text: 'Unabridged Full Specification', bold: true, size: 20, font: 'Calibri', color: '059669' }),
                  ],
                  spacing: { before: 0, after: 60 },
                }),
              ],
            }),
          ],
        }),
      ],
    });
    children.push(metaTable);
    children.push(new Paragraph({ text: '', spacing: { before: 120, after: 120 } }));

    // Challenge Callout Box
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: 'CHALLENGE STATEMENT', bold: true, size: 22, color: NAVY, font: 'Calibri' })
        ],
        spacing: { before: 160, after: 60 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `“${ps.oneLineChallenge}”`, italics: true, bold: true, size: 22, color: '334155', font: 'Calibri' })
        ],
        spacing: { before: 0, after: 180 },
      })
    );

    // 1. Background
    children.push(createHeading1('1. Background'));
    ps.background.split('\n\n').forEach(p => {
      if (p.trim()) children.push(createParagraph(p.trim()));
    });

    // 2. Problem Statement
    children.push(createHeading1('2. Problem Statement'));
    ps.problemStatement.split('\n\n').forEach(p => {
      if (p.trim()) children.push(createParagraph(p.trim()));
    });

    // 3. Objectives
    children.push(createHeading1('3. Primary Objectives & Characteristics'));
    ps.objective.forEach(obj => {
      children.push(createBulletPoint(obj));
    });

    // 4. Target Users & Roles
    children.push(createHeading1('4. Target Users & Roles'));
    const userTableRows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            borders: metaBorder,
            shading: { fill: NAVY, type: ShadingType.CLEAR },
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Role / User Group', bold: true, size: 20, font: 'Calibri', color: 'FFFFFF' })],
                spacing: { before: 60, after: 60 },
              })
            ]
          }),
          new TableCell({
            borders: metaBorder,
            shading: { fill: NAVY, type: ShadingType.CLEAR },
            width: { size: 75, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Description & System Permissions', bold: true, size: 20, font: 'Calibri', color: 'FFFFFF' })],
                spacing: { before: 60, after: 60 },
              })
            ]
          })
        ]
      }),
      ...ps.targetUsers.map((u, idx) => 
        new TableRow({
          children: [
            new TableCell({
              borders: metaBorder,
              shading: { fill: idx % 2 === 0 ? 'FFFFFF' : LIGHT_BG, type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: u.role, bold: true, size: 20, font: 'Calibri', color: NAVY })],
                  spacing: { before: 60, after: 60 },
                })
              ]
            }),
            new TableCell({
              borders: metaBorder,
              shading: { fill: idx % 2 === 0 ? 'FFFFFF' : LIGHT_BG, type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: u.description, size: 20, font: 'Calibri', color: '1E293B' })],
                  spacing: { before: 60, after: 60 },
                })
              ]
            })
          ]
        })
      )
    ];
    children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: userTableRows }));
    children.push(new Paragraph({ text: '', spacing: { before: 120, after: 120 } }));

    // 5. Workflow
    children.push(createHeading1('5. Core System Workflow'));
    children.push(createParagraph(ps.workflowDescription, { bold: true, color: NAVY }));
    ps.workflowSteps.forEach((step, idx) => {
      children.push(createBulletPoint(step, `Step ${idx + 1}: `));
    });

    // 6. Architectural Modules
    children.push(createHeading1('6. Key Architectural Modules & Functional Scope'));
    ps.keyModules.forEach(mod => {
      children.push(createHeading2(mod.title));
      children.push(createParagraph(mod.description));
    });

    // 7. Scope for Innovation
    children.push(createHeading1('7. Scope for Innovation (Bonus Points)'));
    ps.scopeForInnovation.forEach(item => {
      children.push(createBulletPoint(item));
    });

    // 8. Out of Scope (if available)
    if (ps.outOfScope && ps.outOfScope.length > 0) {
      children.push(createHeading1('8. Explicitly Out of Scope'));
      ps.outOfScope.forEach(item => {
        children.push(createBulletPoint(item));
      });
    }

    // 9. Key Design Principle
    const designSectionNum = (ps.outOfScope && ps.outOfScope.length > 0) ? '9' : '8';
    children.push(createHeading1(`${designSectionNum}. Key Design & Architecture Principle`));
    children.push(createParagraph(ps.keyDesignPrinciple));

    // 10. Deliverables Checklist
    const delivSectionNum = (ps.outOfScope && ps.outOfScope.length > 0) ? '10' : '9';
    children.push(createHeading1(`${delivSectionNum}. Evaluation Deliverables Checklist`));
    ps.deliverables.forEach(d => {
      children.push(createBulletPoint(d));
    });

    // 11. Feature Matrix Table
    const matrixSectionNum = (ps.outOfScope && ps.outOfScope.length > 0) ? '11' : '10';
    children.push(createHeading1(`${matrixSectionNum}. Mandatory vs. Innovation Feature Matrix`));
    const matrixRows = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            borders: metaBorder,
            shading: { fill: NAVY, type: ShadingType.CLEAR },
            width: { size: 65, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Feature / Component Description', bold: true, size: 20, font: 'Calibri', color: 'FFFFFF' })],
                spacing: { before: 60, after: 60 },
              })
            ]
          }),
          new TableCell({
            borders: metaBorder,
            shading: { fill: NAVY, type: ShadingType.CLEAR },
            width: { size: 35, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Classification / Requirement', bold: true, size: 20, font: 'Calibri', color: 'FFFFFF' })],
                spacing: { before: 60, after: 60 },
              })
            ]
          })
        ]
      }),
      ...ps.featureMatrix.map((m, idx) => {
        const isMandatory = m.requirement.toLowerCase().includes('mandatory');
        const isOutOfScope = m.requirement.toLowerCase().includes('out of scope');
        const statusColor = isMandatory ? '065F46' : isOutOfScope ? '9F1239' : '5B21B6';
        return new TableRow({
          children: [
            new TableCell({
              borders: metaBorder,
              shading: { fill: idx % 2 === 0 ? 'FFFFFF' : LIGHT_BG, type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: m.feature, size: 20, font: 'Calibri', color: '1E293B' })],
                  spacing: { before: 60, after: 60 },
                })
              ]
            }),
            new TableCell({
              borders: metaBorder,
              shading: { fill: idx % 2 === 0 ? 'FFFFFF' : LIGHT_BG, type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  children: [new TextRun({ text: m.requirement, bold: true, size: 19, font: 'Calibri', color: statusColor })],
                  spacing: { before: 60, after: 60 },
                })
              ]
            })
          ]
        });
      })
    ];
    children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: matrixRows }));

    // Footer note
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `Hackathon Premier League (HPL 2026) • Organizers: SMVITM & Code Troopers\nAll specifications verified with ${ps.sponsorName}.`,
            size: 18,
            color: '64748B',
            font: 'Calibri',
            italics: true,
          })
        ],
        spacing: { before: 360, after: 100 },
      })
    );

    // Construct Document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
                bottom: 1440,
                left: 1440,
                right: 1440,
              },
            },
          },
          children,
        },
      ],
    });

    // Pack into authentic .docx Blob
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to generate authentic .docx file with docx library, falling back to clean document export:', error);
    // Graceful fallback: Clean download
    const htmlContent = generatePsWordHtml(ps);
    const blob = new Blob(['\ufeff' + htmlContent], {
      type: 'application/vnd.ms-word;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Triggers direct browser download of the problem statement specification (defaults to Word document).
 */
function downloadPsBrief(ps: Round2ProblemStatement) {
  downloadPsWordDoc(ps);
}

export const ProblemStatementsPage: React.FC<ProblemStatementsPageProps> = ({ onNavigate }) => {
  const [selectedPs, setSelectedPs] = useState<Round2ProblemStatement | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'workflow' | 'specs' | 'matrix'>('overview');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [viewLayout, setViewLayout] = useState<'spacious' | 'compact'>('spacious');

  const handleSelectAndRegister = (ps: Round2ProblemStatement) => {
    try {
      localStorage.setItem('hpl_selected_ps', `${ps.psCode}: ${ps.title}`);
    } catch (e) {
      // ignore
    }
    onNavigate('register');
  };

  const handleCopyText = (ps: Round2ProblemStatement) => {
    try {
      const text = generatePsBriefText(ps);
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2200);
    } catch (e) {
      console.error(e);
    }
  };

  const getPsIcon = (code: string) => {
    switch (code) {
      case 'PS 01':
        return <HeartPulse className="w-8 h-8 text-purple-700" />;
      case 'PS 02':
        return <Bus className="w-8 h-8 text-emerald-700" />;
      case 'PS 03':
        return <Shield className="w-8 h-8 text-blue-700" />;
      case 'PS 04':
        return <Trash2 className="w-8 h-8 text-orange-700" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#1E1B4B]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1E1B4B] pb-24 selection:bg-amber-300 selection:text-[#1E1B4B]">
      
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP STAGE NAVBAR                                                   */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <header className="w-full bg-[#1E1B4B] text-white border-b-2 border-amber-400/40 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Brand Shield & Navigation Tab */}
          <div className="flex items-center gap-4 sm:gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            >
              {/* Golden Shield */}
              <div className="w-8 h-8 relative flex-shrink-0">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full transform group-hover:scale-105 transition-transform">
                  <polygon points="50,6 90,24 90,74 50,94 10,74 10,24" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
                  <path d="M 30 38 L 40 54 L 50 34 L 60 54 L 70 38 L 68 62 H 32 Z" fill="#1E1B4B" stroke="#1E1B4B" strokeWidth="1.5" />
                  <rect x="36" y="64" width="28" height="5" rx="1.5" fill="#1E1B4B" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black text-sm tracking-tight text-white leading-none">
                  HACKATHON
                </span>
                <span className="font-mono text-[9px] font-bold text-amber-300 tracking-wider uppercase leading-tight mt-0.5">
                  PREMIER LEAGUE
                </span>
              </div>
            </button>

            <div className="hidden sm:block h-6 w-[1px] bg-white/20" />

            {/* Active Tab */}
            <div className="relative py-1 hidden sm:block">
              <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-amber-300">
                PROBLEM STATEMENTS
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('shortlisted')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-[#1E1B4B] hover:bg-amber-100 text-[#1E1B4B] font-display font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all transform hover:scale-105 cursor-pointer shadow-xs"
              title="View 40 Shortlisted Squads"
            >
              <span>🎉 SHORTLIST</span>
            </button>

            <button
              onClick={() => onNavigate('presentation')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#1E1B4B] font-display font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_2px_10px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 cursor-pointer"
              title="Launch official presentation deck"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL PPT</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-amber-400 text-white/90 hover:text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Arena Home</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="hidden md:flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-display font-bold text-white">
              <div className="w-5 h-5 rounded-full bg-amber-400 text-[#1E1B4B] flex items-center justify-center font-black text-[10px]">
                <User className="w-3 h-3" />
              </div>
              <span>Round 2 Arena</span>
            </div>
          </div>

        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 2. HERO HEADER                                                        */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        <div className="relative bg-[#FFFDF7] rounded-3xl border-2 border-[#1E1B4B]/20 p-6 sm:p-8 md:p-10 shadow-sm overflow-hidden">
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#1E1B4B_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-4 text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-display font-black text-xs uppercase tracking-wider">
                <span>ROUND 2 LIVE</span>
                <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#1E1B4B] italic leading-[1.08]">
                Round 2 Problem Statements
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#1E1B4B]/85 font-medium leading-relaxed max-w-2xl">
                Here are the 4 official problem statements for Round 2, backed by institutional and civic partners. 
                Explore the basic overview on each card, open the popup window for the complete verbatim specification, 
                or download the full brief document directly.
              </p>

              {/* Badges / Highlights */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-mono text-xs font-bold">
                  <span>🏛️ 4 Official Problem Sponsors</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs font-bold">
                  <span>📥 Complete Unabridged Briefs</span>
                </div>
              </div>

            </div>

            {/* Right Column: Illustration & Callout */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border-2 border-[#1E1B4B]/20 shadow-xl bg-amber-50/40">
                <img
                  src={(HPL_IMAGES as any).round2CurtainTrophy || (HPL_IMAGES as any).heroBanner}
                  alt="HPL Round 2 Challenges"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                />
                
                <div className="absolute top-3 right-3 sm:right-5 bg-white/95 border-2 border-[#1E1B4B] rounded-2xl px-3 py-2 shadow-[3px_3px_0px_#1E1B4B] transform rotate-2 max-w-[200px]">
                  <p className="font-display font-black text-[11px] sm:text-xs text-[#1E1B4B] leading-tight uppercase">
                    Select 1 Challenge For Your Squad!
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 3. STAGE PROGRESS TRACKER                                             */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          
          {/* Step 1: Round 1 Completed */}
          <div className="relative z-10 flex items-center justify-center sm:justify-start gap-3 bg-[#FFFDF7] border-2 border-[#1E1B4B] px-4 sm:px-5 py-2.5 rounded-2xl shadow-[3px_3px_0px_#1E1B4B]">
            <div className="w-8 h-8 rounded-full bg-[#1E1B4B] text-amber-300 flex items-center justify-center font-display font-black text-sm flex-shrink-0">
              1
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs sm:text-sm uppercase text-[#1E1B4B]">
                Round 1 Completed
              </span>
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
            </div>
          </div>

          {/* Connecting Golden Twisted Rope Across the Middle */}
          <div className="hidden sm:flex flex-1 mx-3 sm:mx-6 relative items-center justify-center">
            <div 
              className="w-full h-3 rounded-full border border-[#78350F]/40 shadow-inner"
              style={{
                background: 'repeating-linear-gradient(45deg, #FDE68A 0px, #F59E0B 8px, #B45309 14px, #78350F 20px)'
              }}
            />
            <div className="absolute w-8 h-8 rounded-full bg-[#F59E0B] border-2 border-[#78350F] shadow-md flex items-center justify-center text-xs">
              ⚡
            </div>
          </div>

          {/* Step 2: Round 2 Problem Statements */}
          <div className="relative z-10 flex items-center justify-center sm:justify-start gap-3 bg-amber-400 border-2 border-[#1E1B4B] px-4 sm:px-5 py-2.5 rounded-2xl shadow-[3px_3px_0px_#1E1B4B]">
            <div className="w-8 h-8 rounded-full bg-[#1E1B4B] text-amber-300 flex items-center justify-center font-display font-black text-sm flex-shrink-0">
              2
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs sm:text-sm uppercase text-[#1E1B4B]">
                Round 2 Problem Statements
              </span>
              <ChevronRight className="w-4 h-4 text-[#1E1B4B]" />
            </div>
          </div>

        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 4. SECTION NOTICE & INTRO                                             */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-purple-50/80 border-2 border-purple-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-purple-200 text-[#582A9C] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Lightbulb className="w-6 h-6 text-[#582A9C]" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm uppercase text-[#1E1B4B]">
                Instructions for Participating Squads
              </h4>
              <p className="text-xs sm:text-sm text-[#1E1B4B]/85 font-medium leading-relaxed mt-0.5">
                Review each challenge below. Click <strong className="text-purple-900 font-black">“View Full Specs”</strong> to inspect complete details, workflows, and evaluation rubrics without omission, or click <strong className="text-blue-800 font-black">“Word Brief (.docx)”</strong> to download an official formatted Microsoft Word brief for your squad.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-900 bg-white px-3.5 py-2 rounded-xl border border-purple-200 self-start md:self-auto shadow-2xs">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>4 Challenges Live</span>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 5. 4 PROBLEM STATEMENT CARDS GRID (Responsive for All Devices)        */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] uppercase tracking-tight flex items-center gap-2.5">
              <span>Round 2 Challenges</span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Official Release
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Select 1 challenge for your squad. All specifications are verified with respective sponsors.
            </p>
          </div>

          {/* Layout View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-white border-2 border-[#1E1B4B] rounded-2xl shadow-[2px_2px_0px_#1E1B4B]">
            <button
              onClick={() => setViewLayout('spacious')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewLayout === 'spacious'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1E1B4B] hover:bg-slate-100'
              }`}
              title="Spacious 2-column view with full details and key highlights"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Spacious View</span>
            </button>
            <button
              onClick={() => setViewLayout('compact')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewLayout === 'compact'
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#1E1B4B] hover:bg-slate-100'
              }`}
              title="Compact 4-column overview grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Compact Grid</span>
            </button>
          </div>
        </div>

        {/* Dynamic Responsive Grid */}
        <div className={`grid gap-6 items-stretch ${
          viewLayout === 'spacious' 
            ? 'grid-cols-1 lg:grid-cols-2 lg:gap-8' 
            : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
        }`}>
          {ROUND2_PROBLEM_STATEMENTS.map((ps) => {
            return (
              <div
                key={ps.id}
                onClick={() => {
                  setSelectedPs(ps);
                  setActiveModalTab('overview');
                }}
                className={`group rounded-3xl border-2 border-[#1E1B4B]/20 hover:border-[#1E1B4B] bg-[#FFFDF7] shadow-sm hover:shadow-[6px_6px_0px_#1E1B4B] transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative overflow-hidden ${
                  viewLayout === 'spacious' ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
                }`}
                style={{
                  background: 'linear-gradient(to bottom, #FFFFFF 0%, #FFFDF7 100%)'
                }}
              >
                {/* Track Accent Line on Top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5" 
                  style={{ backgroundColor: ps.themeColor }}
                />

                {/* Top Details */}
                <div className="space-y-4">
                  
                  {/* Row 1: PS Code badge & Category */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider border ${ps.badgeBg} ${ps.badgeText} shadow-2xs`}>
                        {ps.psCode}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">
                        ROUND 2 TRACK
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] sm:text-[11px] font-mono font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                      <span>LIVE ROUND 2</span>
                    </span>
                  </div>

                  {/* Row 2: Sponsor Emblem & Title Details */}
                  <div className="flex items-start gap-4 pt-1">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2 border-[#1E1B4B] flex items-center justify-center shadow-[2.5px_2.5px_0px_#1E1B4B] relative overflow-hidden bg-white flex-shrink-0 p-1.5">
                      {ps.sponsorLogo ? (
                        <img
                          src={ps.sponsorLogo}
                          alt={ps.sponsorName}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        getPsIcon(ps.psCode)
                      )}
                    </div>

                    <div className="space-y-1 text-left flex-1 min-w-0">
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1E1B4B] italic leading-tight group-hover:text-amber-600 transition-colors">
                        {ps.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans font-semibold text-slate-600 leading-snug">
                        {ps.subtitle}
                      </p>
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xl bg-slate-100 border border-slate-300 text-[#1E1B4B] text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider">
                          <span>🏛️ Presented by</span>
                          <strong className="text-slate-900">{ps.sponsorName}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Challenge Summary */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200/90 text-left">
                    <p className={`text-xs sm:text-sm text-[#1E1B4B]/90 font-medium leading-relaxed ${
                      viewLayout === 'compact' ? 'line-clamp-4' : ''
                    }`}>
                      {ps.summary}
                    </p>
                  </div>

                  {/* Row 4: Key Modules Preview (Available in Spacious Mode) */}
                  {viewLayout === 'spacious' && (
                    <div className="space-y-2 text-left pt-1">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-600" />
                        <span>Core Deliverable Modules</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ps.keyModules.slice(0, 2).map((mod, mIdx) => (
                          <div key={mIdx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-2xs space-y-0.5">
                            <div className="font-display font-bold text-[#1E1B4B] text-[11px] uppercase tracking-wide">
                              {mod.title}
                            </div>
                            <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                              {mod.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Row 5: Key Focus Tags */}
                  <div className="text-left space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      <Target className="w-3.5 h-3.5 text-slate-600" />
                      <span>Key Focus Areas</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {ps.focusAreas.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[10px] sm:text-[11px] font-sans font-bold px-2.5 py-1 rounded-lg border ${ps.tagBg} ${ps.tagText}`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Action Row */}
                <div className="pt-5 mt-5 border-t-2 border-[#1E1B4B]/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPsWordDoc(ps);
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-blue-600/30 hover:border-blue-700 bg-blue-50/80 hover:bg-blue-100 text-xs font-mono font-bold text-blue-900 transition-all cursor-pointer shadow-2xs"
                    title="Download complete unabridged brief as an authentic Microsoft Word document (.docx)"
                  >
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>Word Brief (.docx)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPs(ps);
                      setActiveModalTab('overview');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E1B4B] text-white hover:bg-amber-500 hover:text-[#1E1B4B] font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-[2.5px_2.5px_0px_#1E1B4B] hover:shadow-[3.5px_3.5px_0px_#1E1B4B] transition-all cursor-pointer"
                  >
                    <span>View Full Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 6. COMPREHENSIVE VERBATIM SPECIFICATION MODAL (Popup Window)          */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {selectedPs && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#1E1B4B]/80 backdrop-blur-xs">
          
          <div className="relative w-full max-w-4xl bg-[#FFFDF7] rounded-3xl border-3 border-[#1E1B4B] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 border-b-2 border-[#1E1B4B]/15 bg-gradient-to-r from-amber-50/70 via-white to-purple-50/40 flex items-start justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl border-2 border-[#1E1B4B] bg-white flex items-center justify-center flex-shrink-0 shadow-sm p-1">
                  {selectedPs.sponsorLogo ? (
                    <img 
                      src={selectedPs.sponsorLogo} 
                      alt={selectedPs.sponsorName} 
                      className="w-10 h-10 object-contain" 
                    />
                  ) : (
                    getPsIcon(selectedPs.psCode)
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase border ${selectedPs.badgeBg} ${selectedPs.badgeText}`}>
                      {selectedPs.psCode}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase font-bold">
                      HPL 2026 ROUND 2 SPECIFICATION
                    </span>
                  </div>

                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#1E1B4B] leading-tight">
                    {selectedPs.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {selectedPs.subtitle}
                  </p>
                  
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                      🏛️ Presented by {selectedPs.sponsorName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons on Top Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => downloadPsWordDoc(selectedPs)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-300 hover:border-blue-700 bg-blue-50 text-xs font-mono font-bold text-blue-900 transition-colors cursor-pointer shadow-2xs"
                  title="Download full specification document as a formatted Microsoft Word document (.doc)"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  <span>Word Doc (.doc)</span>
                </button>

                <button
                  onClick={() => handleCopyText(selectedPs)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-[#1E1B4B] bg-white text-xs font-mono font-bold text-slate-700 hover:text-[#1E1B4B] transition-colors cursor-pointer"
                  title="Copy full text to clipboard"
                >
                  {copySuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedPs(null)}
                  className="w-9 h-9 rounded-full border-2 border-slate-300 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tab Bar for Navigation */}
            <div className="flex items-center px-4 sm:px-6 border-b border-slate-200 bg-[#FAF6EE] overflow-x-auto">
              <button
                onClick={() => setActiveModalTab('overview')}
                className={`py-3 px-4 font-display font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeModalTab === 'overview'
                    ? 'border-[#1E1B4B] text-[#1E1B4B]'
                    : 'border-transparent text-slate-500 hover:text-[#1E1B4B]'
                }`}
              >
                1. Overview & Context
              </button>
              <button
                onClick={() => setActiveModalTab('workflow')}
                className={`py-3 px-4 font-display font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeModalTab === 'workflow'
                    ? 'border-[#1E1B4B] text-[#1E1B4B]'
                    : 'border-transparent text-slate-500 hover:text-[#1E1B4B]'
                }`}
              >
                2. Users & Workflow
              </button>
              <button
                onClick={() => setActiveModalTab('specs')}
                className={`py-3 px-4 font-display font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeModalTab === 'specs'
                    ? 'border-[#1E1B4B] text-[#1E1B4B]'
                    : 'border-transparent text-slate-500 hover:text-[#1E1B4B]'
                }`}
              >
                3. Technical Modules & Scope
              </button>
              <button
                onClick={() => setActiveModalTab('matrix')}
                className={`py-3 px-4 font-display font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeModalTab === 'matrix'
                    ? 'border-[#1E1B4B] text-[#1E1B4B]'
                    : 'border-transparent text-slate-500 hover:text-[#1E1B4B]'
                }`}
              >
                4. Deliverables & Matrix
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-left text-xs sm:text-sm text-[#1E1B4B]/90 leading-relaxed bg-[#FFFDF7]">
              
              {/* TAB 1: OVERVIEW & CONTEXT */}
              {activeModalTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in-50 duration-150">
                  {/* One Line Challenge Callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-900 pb-1">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>One-Line Challenge</span>
                    </div>
                    <p className="font-display font-bold text-sm sm:text-base text-[#1E1B4B] italic">
                      {selectedPs.oneLineChallenge}
                    </p>
                  </div>

                  {/* 1. Background */}
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>1. Background</span>
                    </h3>
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs whitespace-pre-line leading-relaxed">
                      {selectedPs.background}
                    </div>
                  </div>

                  {/* 2. Problem Statement */}
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <Target className="w-4 h-4 text-rose-600" />
                      <span>2. Problem Statement</span>
                    </h3>
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs whitespace-pre-line leading-relaxed">
                      {selectedPs.problemStatement}
                    </div>
                  </div>

                  {/* 3. Objectives */}
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>3. Primary Objectives</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedPs.objective.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-xs">
                          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5 stroke-[3]" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: USERS & WORKFLOW */}
              {activeModalTab === 'workflow' && (
                <div className="space-y-6 animate-in fade-in-50 duration-150">
                  {/* Target Users */}
                  <div className="space-y-3">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>4. Target Users & Roles</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedPs.targetUsers.map((u, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                          <h4 className="font-display font-black text-xs sm:text-sm text-[#1E1B4B] uppercase tracking-wide flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                            <span>{u.role}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-4">
                            {u.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core System Workflow */}
                  <div className="space-y-3">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-600" />
                      <span>5. Core System / User Journey Workflow</span>
                    </h3>
                    
                    <div className="p-3.5 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs font-bold shadow-inner overflow-x-auto">
                      {selectedPs.workflowDescription}
                    </div>

                    <div className="space-y-2 pt-1">
                      {selectedPs.workflowSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-mono font-black text-xs flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-slate-800">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TECHNICAL MODULES & SCOPE */}
              {activeModalTab === 'specs' && (
                <div className="space-y-6 animate-in fade-in-50 duration-150">
                  {/* Detailed Modules */}
                  <div className="space-y-3">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      <span>Core Technical Modules & Architecture</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedPs.keyModules.map((mod, i) => (
                        <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
                          <h4 className="font-display font-black text-xs sm:text-sm text-[#1E1B4B] uppercase tracking-wide">
                            {mod.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {mod.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scope for Innovation */}
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Scope for Innovation</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedPs.scopeForInnovation.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs sm:text-sm">
                          <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Out of Scope (if specified) */}
                  {selectedPs.outOfScope && selectedPs.outOfScope.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-display font-black text-sm uppercase tracking-wider text-rose-700 flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-600" />
                        <span>Out of Scope (Explicit Boundaries)</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedPs.outOfScope.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-xs text-rose-900 font-medium">
                            <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Design Principle */}
                  <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
                    <h4 className="font-display font-black text-xs uppercase tracking-wider text-indigo-900">
                      Key Design Principle
                    </h4>
                    <p className="text-xs sm:text-sm text-indigo-950 whitespace-pre-line leading-relaxed">
                      {selectedPs.keyDesignPrinciple}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: DELIVERABLES & MATRIX */}
              {activeModalTab === 'matrix' && (
                <div className="space-y-6 animate-in fade-in-50 duration-150">
                  {/* Expected Deliverables */}
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Official Expected Deliverables</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedPs.deliverables.map((del, i) => (
                        <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 shadow-2xs">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[3]" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory vs Innovation Matrix Table */}
                  <div className="space-y-2 pt-2">
                    <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#1E1B4B] flex items-center gap-2">
                      <Scale className="w-4 h-4 text-purple-600" />
                      <span>Mandatory vs Innovation Requirements Matrix</span>
                    </h3>
                    
                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200">
                            <th className="p-3 font-display font-black uppercase text-slate-700">Feature / Component</th>
                            <th className="p-3 font-display font-black uppercase text-slate-700">Requirement Classification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedPs.featureMatrix.map((row, i) => {
                            const isMandatory = row.requirement.toLowerCase().includes('mandatory');
                            const isOutOfScope = row.requirement.toLowerCase().includes('out of scope');
                            return (
                              <tr key={i} className="hover:bg-slate-50/60">
                                <td className="p-3 font-medium text-slate-800">{row.feature}</td>
                                <td className="p-3">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                                    isMandatory 
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                                      : isOutOfScope
                                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                                      : 'bg-purple-50 text-purple-800 border-purple-300'
                                  }`}>
                                    {row.requirement}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom CTA Bar */}
            <div className="p-4 sm:p-5 border-t-2 border-[#1E1B4B]/15 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadPsWordDoc(selectedPs)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-600/30 hover:border-blue-700 bg-blue-50/90 hover:bg-blue-100 font-mono font-bold text-xs text-blue-900 transition-all cursor-pointer shadow-2xs"
                  title="Download complete specification brief as an authentic Microsoft Word document (.docx)"
                >
                  <FileText className="w-4 h-4 text-blue-700" />
                  <span>Download Word Brief (.docx)</span>
                </button>
                <button
                  onClick={() => setSelectedPs(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-display font-bold text-xs uppercase text-slate-700 hover:bg-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <button
                onClick={() => handleSelectAndRegister(selectedPs)}
                className="px-5 py-2.5 rounded-xl bg-[#1E1B4B] hover:bg-amber-500 hover:text-[#1E1B4B] text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Select {selectedPs.psCode} for Registration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
