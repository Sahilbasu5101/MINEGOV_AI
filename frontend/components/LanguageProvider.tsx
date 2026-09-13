'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'pa' | 'mr' | 'mai' | 'as' | 'or';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flagLabel: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flagLabel: 'हि' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flagLabel: 'ਪੰ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flagLabel: 'म' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', flagLabel: 'मै' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flagLabel: 'অ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flagLabel: 'ଓ' },
];

export interface TranslationStrings {
  // Brand & Top bar
  goi: string;
  ministryOfMines: string;
  portalSubtitle: string;
  satelliteActive: string;
  azadiTag: string;
  searchPlaceholder: string;
  accessPortal: string;
  
  // Navigation
  navHome: string;
  navAbout: string;
  navPlatform: string;
  navCompliance: string;
  navIntelligence: string;
  navResources: string;

  // Hero section
  taglineSafeMines: string;
  taglineMinerals: string;
  taglineIndia: string;
  headlineMain: string;
  headlineAccent: string;
  subDescription: string;
  ctaEnterMineGov: string;
  ctaEnterSubtext: string;
  ctaRegulatory: string;
  ctaRegulatorySubtext: string;
  authNotice: string;

  // Vision Card (upper right)
  visionQuote: string;
  visionPeople: string;
  visionPlanet: string;
  visionProductivity: string;
  visionProgress: string;

  // 6 Feature Pillars
  pillar1: string;
  pillar2: string;
  pillar3: string;
  pillar4: string;
  pillar5: string;
  pillar6: string;

  // Metrics & Gazette
  statLeasesNumber: string;
  statLeasesLabel: string;
  statMinesNumber: string;
  statMinesLabel: string;
  statSatelliteNumber: string;
  statSatelliteLabel: string;
  statComplianceNumber: string;
  statComplianceLabel: string;
  whatsNewTitle: string;
  viewAll: string;
  newsItem1: string;
  newsItem2: string;
  newsItem3: string;

  // 3D HUD Pin labels
  hudMonitoring: string;
  hudSaferOps: string;
  hudSustainable: string;
  hudDigitalTwinActive: string;

  // Footer
  footerCopyright: string;
  privacyPolicy: string;
  termsOfUse: string;
  accessibility: string;
  help: string;
  contactUs: string;
  nicNotice: string;
}

const translations: Record<LanguageCode, TranslationStrings> = {
  en: {
    goi: 'GOVERNMENT OF INDIA',
    ministryOfMines: 'MINISTRY OF MINES',
    portalSubtitle: 'National Mining Intelligence & Surveillance',
    satelliteActive: 'GSI & IBM SATELLITE NETWORK ACTIVE',
    azadiTag: 'Azadi Ka Amrit Mahotsav',
    searchPlaceholder: 'Search national mining database...',
    accessPortal: 'Access Portal',

    navHome: 'Home',
    navAbout: 'About',
    navPlatform: 'Platform',
    navCompliance: 'Compliance',
    navIntelligence: 'Intelligence',
    navResources: 'Resources',

    taglineSafeMines: 'SAFE MINES',
    taglineMinerals: 'RESPONSIBLE MINERALS',
    taglineIndia: 'A STRONGER INDIA',
    headlineMain: 'Intelligent Mining',
    headlineAccent: 'for a Safer Tomorrow',
    subDescription:
      'MineGov AI is a unified digital platform for monitoring, analysing and managing mining operations with real-time data, AI-driven insights and geospatial intelligence.',
    ctaEnterMineGov: 'Enter MineGov AI',
    ctaEnterSubtext: 'For CIL & Mine Operational Users',
    ctaRegulatory: 'Regulatory Access',
    ctaRegulatorySubtext: 'For Government & Regulatory Officials',
    authNotice: 'Authorised access only. All activities are logged and monitored.',

    visionQuote: 'Leveraging data and technology for transparent, compliant and sustainable mining.',
    visionPeople: 'PEOPLE',
    visionPlanet: 'PLANET',
    visionProductivity: 'PRODUCTIVITY',
    visionProgress: 'PROGRESS',

    pillar1: 'Real-time Monitoring',
    pillar2: 'Regulatory Compliance',
    pillar3: 'Environmental Sustainability',
    pillar4: 'Data-driven Governance',
    pillar5: 'Operational Efficiency',
    pillar6: 'Geospatial Intelligence',

    statLeasesNumber: '1,420',
    statLeasesLabel: 'Active Leases Monitored',
    statMinesNumber: '280+',
    statMinesLabel: 'Mines Integrated',
    statSatelliteNumber: '24x7',
    statSatelliteLabel: 'Satellite & IoT Surveillance',
    statComplianceNumber: '100%',
    statComplianceLabel: 'Towards Sustainable & Compliant Mining',
    whatsNewTitle: "What's New",
    viewAll: 'View All',
    newsItem1: 'Updated guidelines for mine safety compliance and slope telemetry',
    newsItem2: 'New AI-based anomaly detection module deployed for major coal reserves',
    newsItem3: 'Environmental monitoring dashboard enhanced with GIS multi-spectral mapping',

    hudMonitoring: 'Real-time Monitoring',
    hudSaferOps: 'Safer Operations',
    hudSustainable: 'Sustainable Growth',
    hudDigitalTwinActive: 'GSI 3D DIGITAL TWIN ACTIVE',

    footerCopyright: 'Ministry of Mines, Government of India',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    accessibility: 'Accessibility',
    help: 'Help',
    contactUs: 'Contact Us',
    nicNotice: 'Designed & Developed by NIC in collaboration with IBM & GSI | Sovereign Security Enclave',
  },

  hi: {
    goi: 'भारत सरकार',
    ministryOfMines: 'खान मंत्रालय',
    portalSubtitle: 'राष्ट्रीय खनन आसूचना एवं निगरानी प्रणाली',
    satelliteActive: 'जीएसआई और आईबीएम उपग्रह नेटवर्क सक्रिय',
    azadiTag: 'आज़ादी का अमृत महोत्सव',
    searchPlaceholder: 'राष्ट्रीय खनन डेटाबेस खोजें...',
    accessPortal: 'प्रवेश पोर्टल',

    navHome: 'मुख्य पृष्ठ',
    navAbout: 'परिचय',
    navPlatform: 'प्लेटफ़ॉर्म',
    navCompliance: 'अनुपालन',
    navIntelligence: 'आसूचना',
    navResources: 'संसाधन',

    taglineSafeMines: 'सुरक्षित खदानें',
    taglineMinerals: 'जिम्मेदार खनिज',
    taglineIndia: 'सशक्त भारत',
    headlineMain: 'बुद्धिमान खनन',
    headlineAccent: 'सुरक्षित कल के निर्माण हेतु',
    subDescription:
      'माइनगॉव एआई वास्तविक समय के डेटा, एआई-संचालित अंतर्दृष्टि और भू-स्थानिक खुफिया के साथ खनन कार्यों की निगरानी, विश्लेषण और प्रबंधन के लिए एकीकृत डिजिटल मंच है।',
    ctaEnterMineGov: 'माइनगॉव एआई में प्रवेश करें',
    ctaEnterSubtext: 'सीआईएल और खदान परिचालन उपयोगकर्ताओं के लिए',
    ctaRegulatory: 'नियामक अभिगम',
    ctaRegulatorySubtext: 'सरकारी व नियामक अधिकारियों के लिए',
    authNotice: 'केवल अधिकृत उपयोगकर्ताओं के लिए। सभी गतिविधियाँ दर्ज और मूल्यांकित की जाती हैं।',

    visionQuote: 'पारदर्शी, अनुपालनयुक्त और सतत खनन के लिए डेटा और कृत्रिम बुद्धिमत्ता का उपयोग।',
    visionPeople: 'जनता',
    visionPlanet: 'पर्यावरण',
    visionProductivity: 'उत्पादकता',
    visionProgress: 'प्रगति',

    pillar1: 'रीयल-टाइम निगरानी',
    pillar2: 'नियामक अनुपालन',
    pillar3: 'पर्यावरणीय स्थिरता',
    pillar4: 'डेटा-आधारित शासन',
    pillar5: 'परिचालन दक्षता',
    pillar6: 'भू-स्थानिक बुद्धिमत्ता',

    statLeasesNumber: '१,४२०',
    statLeasesLabel: 'सक्रिय पट्टे निगरानी अधीन',
    statMinesNumber: '२८०+',
    statMinesLabel: 'खदानें एकीकृत',
    statSatelliteNumber: '२४x७',
    statSatelliteLabel: 'उपग्रह और आईओटी निगरानी',
    statComplianceNumber: '१००%',
    statComplianceLabel: 'सतत एवं अनुपालन खनन की ओर',
    whatsNewTitle: 'नवीनतम सूचनाएं',
    viewAll: 'सभी देखें',
    newsItem1: 'खदान सुरक्षा अनुपालन और ढलान टेलीमेट्री हेतु अद्यतन दिशानिर्देश जारी',
    newsItem2: 'प्रमुख कोयला भंडारों के लिए नया एआई-आधारित विसंगति पहचान मॉड्यूल तैनात',
    newsItem3: 'जीआईएस मल्टी-स्पेक्ट्रल मैपिंग के साथ पर्यावरण निगरानी डैशबोर्ड उन्नत किया गया',

    hudMonitoring: 'रीयल-टाइम निगरानी',
    hudSaferOps: 'सुरक्षित संचालन',
    hudSustainable: 'सतत विकास',
    hudDigitalTwinActive: 'जीएसआई 3डी डिजिटल ट्विन सक्रिय',

    footerCopyright: 'खान मंत्रालय, भारत सरकार',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfUse: 'उपयोग की शर्तें',
    accessibility: 'सुगम्यता',
    help: 'सहायता',
    contactUs: 'संपर्क करें',
    nicNotice: 'एनआईसी द्वारा आईबीएम एवं जीएसआई के सहयोग से विकसित | संप्रभु सुरक्षा तंत्र',
  },

  pa: {
    goi: 'ਭਾਰਤ ਸਰਕਾਰ',
    ministryOfMines: 'ਖਾਣ ਮੰਤਰਾਲਾ',
    portalSubtitle: 'ਰਾਸ਼ਟਰੀ ਖਣਨ ਖੁਫੀਆ ਅਤੇ ਨਿਗਰਾਨੀ ਪ੍ਰਣਾਲੀ',
    satelliteActive: 'ਜੀਐਸਆਈ ਅਤੇ ਆਈਬੀਐਮ ਸੈਟੇਲਾਈਟ ਨੈੱਟਵਰਕ ਸਰਗਰਮ',
    azadiTag: 'ਆਜ਼ਾਦੀ ਕਾ ਅੰਮ੍ਰਿਤ ਮਹੋਤਸਵ',
    searchPlaceholder: 'ਰਾਸ਼ਟਰੀ ਖਣਨ ਡੇਟਾਬੇਸ ਖੋਜੋ...',
    accessPortal: 'ਪੋਰਟਲ ਵਿੱਚ ਜਾਓ',

    navHome: 'ਮੁੱਖ ਪੰਨਾ',
    navAbout: 'ਬਾਰੇ',
    navPlatform: 'ਪਲੇਟਫਾਰਮ',
    navCompliance: 'ਪਾਲਣਾ',
    navIntelligence: 'ਖੁਫੀਆ ਜਾਣਕਾਰੀ',
    navResources: 'ਸਰੋਤ',

    taglineSafeMines: 'ਸੁਰੱਖਿਅਤ ਖਾਣਾਂ',
    taglineMinerals: 'ਜ਼ਿੰਮੇਵਾਰ ਖਣਿਜ',
    taglineIndia: 'ਇੱਕ ਮਜ਼ਬੂਤ ​​ਭਾਰਤ',
    headlineMain: 'ਬੁੱਧੀਮਾਨ ਖਣਨ',
    headlineAccent: 'ਇੱਕ ਸੁਰੱਖਿਅਤ ਭਵਿੱਖ ਲਈ',
    subDescription:
      'ਮਾਈਨਗਵ ਏਆਈ ਰੀਅਲ-ਟਾਈਮ ਡੇਟਾ, ਏਆਈ-ਸੰਚਾਲਿਤ ਸੂਝ ਅਤੇ ਭੂ-ਸਥਾਨਿਕ ਖੁਫੀਆ ਜਾਣਕਾਰੀ ਨਾਲ ਖਣਨ ਕਾਰਜਾਂ ਦੀ ਨਿਗਰਾਨੀ, ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਪ੍ਰਬੰਧਨ ਲਈ ਇੱਕ ਏਕੀਕ੍ਰਿਤ ਡਿਜੀਟਲ ਪਲੇਟਫਾਰਮ ਹੈ।',
    ctaEnterMineGov: 'ਮਾਈਨਗਵ ਏਆਈ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ',
    ctaEnterSubtext: 'ਸੀਆਈਐਲ ਅਤੇ ਖਾਣ ਸੰਚਾਲਨ ਉਪਭੋਗਤਾਵਾਂ ਲਈ',
    ctaRegulatory: 'ਰੈਗੂਲੇਟਰੀ ਪਹੁੰਚ',
    ctaRegulatorySubtext: 'ਸਰਕਾਰੀ ਅਤੇ ਰੈਗੂਲੇਟਰੀ ਅਧਿਕਾਰੀਆਂ ਲਈ',
    authNotice: 'ਸਿਰਫ ਅਧਿਕਾਰਤ ਪਹੁੰਚ। ਸਾਰੀਆਂ ਗਤੀਵਿਧੀਆਂ ਲੌਗ ਅਤੇ ਨਿਗਰਾਨੀ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।',

    visionQuote: 'ਪਾਰਦਰਸ਼ੀ, ਨਿਯਮ-ਪਾਲਣ ਅਤੇ ਟਿਕਾਊ ਖਣਨ ਲਈ ਡੇਟਾ ਅਤੇ ਤਕਨਾਲੋਜੀ ਦਾ ਲਾਭ ਉਠਾਉਣਾ।',
    visionPeople: 'ਲੋਕ',
    visionPlanet: 'ਧਰਤੀ',
    visionProductivity: 'ਉਤਪਾਦਕਤਾ',
    visionProgress: 'ਤਰੱਕੀ',

    pillar1: 'ਰੀਅਲ-ਟਾਈਮ ਨਿਗਰਾਨੀ',
    pillar2: 'ਰੈਗੂਲੇਟਰੀ ਪਾਲਣਾ',
    pillar3: 'ਵਾਤਾਵਰਣ ਸਥਿਰਤਾ',
    pillar4: 'ਡੇਟਾ-ਸੰਚਾਲਿਤ ਸ਼ਾਸਨ',
    pillar5: 'ਕਾਰਜਸ਼ੀਲ ਕੁਸ਼ਲਤਾ',
    pillar6: 'ਭੂ-ਸਥਾਨਿਕ ਖੁਫੀਆ',

    statLeasesNumber: '੧,੪੨੦',
    statLeasesLabel: 'ਸਰਗਰਮ ਪੱਟੇ ਨਿਗਰਾਨੀ ਅਧੀਨ',
    statMinesNumber: '੨੮੦+',
    statMinesLabel: 'ਖਾਣਾਂ ਏਕੀਕ੍ਰਿਤ',
    statSatelliteNumber: '੨੪x੭',
    statSatelliteLabel: 'ਸੈਟੇਲਾਈਟ ਅਤੇ ਆਈਓਟੀ ਨਿਗਰਾਨੀ',
    statComplianceNumber: '੧੦੦%',
    statComplianceLabel: 'ਟਿਕਾਊ ਅਤੇ ਨਿਯਮਤ ਖਣਨ ਵੱਲ',
    whatsNewTitle: 'ਤਾਜ਼ਾ ਜਾਣਕਾਰੀ',
    viewAll: 'ਸਾਰੇ ਵੇਖੋ',
    newsItem1: 'ਖਾਣ ਸੁਰੱਖਿਆ ਪਾਲਣਾ ਅਤੇ ਢਲਾਣ ਟੈਲੀਮੈਟਰੀ ਲਈ ਅੱਪਡੇਟ ਕੀਤੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼',
    newsItem2: 'ਕੋਲੇ ਦੇ ਵੱਡੇ ਭੰਡਾਰਾਂ ਲਈ ਨਵਾਂ ਏਆਈ-ਅਧਾਰਿਤ ਵਿਗਾੜ ਖੋਜ ਮੋਡੀਊਲ ਤੈਨਾਤ',
    newsItem3: 'ਜੀਆਈਐਸ ਮਲਟੀ-ਸਪੈਕਟ੍ਰਲ ਮੈਪਿੰਗ ਨਾਲ ਵਾਤਾਵਰਣ ਨਿਗਰਾਨੀ ਡੈਸ਼ਬੋਰਡ ਵਧਾਇਆ ਗਿਆ',

    hudMonitoring: 'ਰੀਅਲ-ਟਾਈਮ ਨਿਗਰਾਨੀ',
    hudSaferOps: 'ਸੁਰੱਖਿਅਤ ਕਾਰਵਾਈਆਂ',
    hudSustainable: 'ਟਿਕਾਊ ਵਿਕਾਸ',
    hudDigitalTwinActive: 'ਜੀਐਸਆਈ 3ਡੀ ਡਿਜੀਟਲ ਟਵਿਨ ਸਰਗਰਮ',

    footerCopyright: 'ਖਾਣ ਮੰਤਰਾਲਾ, ਭਾਰਤ ਸਰਕਾਰ',
    privacyPolicy: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ',
    termsOfUse: 'ਵਰਤੋਂ ਦੀਆਂ ਸ਼ਰਤਾਂ',
    accessibility: 'ਪਹੁੰਚਯੋਗਤਾ',
    help: 'ਮਦਦ',
    contactUs: 'ਸੰਪਰਕ ਕਰੋ',
    nicNotice: 'ਐਨਆਈਸੀ ਦੁਆਰਾ ਆਈਬੀਐਮ ਅਤੇ ਜੀਐਸਆਈ ਦੇ ਸਹਿਯੋਗ ਨਾਲ ਵਿਕਸਤ | ਪ੍ਰਭੂਸੱਤਾ ਸੁਰੱਖਿਆ ਐਨਕਲੇਵ',
  },

  mr: {
    goi: 'भारत सरकार',
    ministryOfMines: 'खाण मंत्रालय',
    portalSubtitle: 'राष्ट्रीय खाणकाम बुद्धिमत्ता आणि पाळत प्रणाली',
    satelliteActive: 'जीएसआय व आयबीएम उपग्रह नेटवर्क सक्रिय',
    azadiTag: 'स्वातंत्र्याचा अमृत महोत्सव',
    searchPlaceholder: 'राष्ट्रीय खाणकाम डेटाबेस शोधा...',
    accessPortal: 'प्रवेश पोर्टल',

    navHome: 'मुख्यपृष्ठ',
    navAbout: 'माहिती',
    navPlatform: 'प्लॅटफॉर्म',
    navCompliance: 'अनुपालन',
    navIntelligence: 'गुप्तवार्ता',
    navResources: 'संसाधने',

    taglineSafeMines: 'सुरक्षित खाणी',
    taglineMinerals: 'जबाबदार खनिजे',
    taglineIndia: 'सशक्त भारत',
    headlineMain: 'प्रगत बुद्धिमत्ता खाणकाम',
    headlineAccent: 'सुरक्षित भविष्याच्या उभारणीसाठी',
    subDescription:
      'माइनगव्ह एआय हे रिअल-टाइम डेटा, एआय-चालित विश्लेषण आणि भौगोलिक बुद्धिमत्तेसह खाणकामाच्या कामकाजाचे निरीक्षण, विश्लेषण आणि व्यवस्थापन करण्यासाठी एकात्मिक डिजिटल व्यासपीठ आहे.',
    ctaEnterMineGov: 'माइनगव्ह एआय मध्ये प्रवेश करा',
    ctaEnterSubtext: 'सीआयएल आणि खाण परिचालन वापरकर्त्यांसाठी',
    ctaRegulatory: 'नियामक प्रवेश',
    ctaRegulatorySubtext: 'सरकारी आणि नियामक अधिकाऱ्यांसाठी',
    authNotice: 'केवळ अधिकृत प्रवेश. सर्व क्रियाकलाप नोंदवले आणि तपासले जातात.',

    visionQuote: 'पारदर्शक, सुसंगत आणि शाश्वत खाणकामासाठी डेटा आणि तंत्रज्ञानाचा प्रभावी वापर.',
    visionPeople: 'नागरिक',
    visionPlanet: 'पर्यावरण',
    visionProductivity: 'उत्पादकता',
    visionProgress: 'प्रगती',

    pillar1: 'रिअल-टाइम देखरेख',
    pillar2: 'नियामक अनुपालन',
    pillar3: 'पर्यावरणीय शाश्वतता',
    pillar4: 'डेटा-चालित प्रशासन',
    pillar5: 'कार्यक्षम कार्यप्रणाली',
    pillar6: 'भू-स्थानिक बुद्धिमत्ता',

    statLeasesNumber: '१,४२०',
    statLeasesLabel: 'सक्रिय लीज देखरेखीखाली',
    statMinesNumber: '२८०+',
    statMinesLabel: 'खाणी एकत्रित',
    statSatelliteNumber: '२४x७',
    statSatelliteLabel: 'उपग्रह आणि आयओटी पाळत',
    statComplianceNumber: '१००%',
    statComplianceLabel: 'शाश्वत आणि नियमबद्ध खाणकामाकडे',
    whatsNewTitle: 'नवीन काय आहे',
    viewAll: 'सर्व पहा',
    newsItem1: 'खाण सुरक्षा अनुपालन आणि स्लोप टेलिमेट्रीसाठी अद्ययावत मार्गदर्शक तत्त्वे',
    newsItem2: 'प्रमुख कोळसा साठ्यांसाठी नवीन एआय-आधारित विसंगती शोध मॉड्यूल तैनात',
    newsItem3: 'जीआयएस मल्टी-स्पेक्ट्रल मॅपिंगसह पर्यावरण देखरेख डॅशबोर्ड वर्धित',

    hudMonitoring: 'रिअल-टाइम देखरेख',
    hudSaferOps: 'सुरक्षित ऑपरेशन्स',
    hudSustainable: 'शाश्वत वाढ',
    hudDigitalTwinActive: 'जीएसआय 3डी डिजिटल ट्विन सक्रिय',

    footerCopyright: 'खाण मंत्रालय, भारत सरकार',
    privacyPolicy: 'गोपनीयता धोरण',
    termsOfUse: 'वापराच्या अटी',
    accessibility: 'सुलभता',
    help: 'मदत',
    contactUs: 'संपर्क साधा',
    nicNotice: 'एनआयसी द्वारे आयबीएम व जीएसआय यांच्या सहकार्याने विकसित | सार्वभौम सुरक्षा एन्क्लेव्ह',
  },

  mai: {
    goi: 'भारत सरकार',
    ministryOfMines: 'खान मंत्रालय',
    portalSubtitle: 'राष्ट्रीय खनन आसूचना आ निगरानी प्रणाली',
    satelliteActive: 'जीएसआई आ आईबीएम उपग्रह नेटवर्क सक्रिय',
    azadiTag: 'आज़ादीक अमृत महोत्सव',
    searchPlaceholder: 'राष्ट्रीय खनन डेटाबेस खोजू...',
    accessPortal: 'प्रवेश पोर्टल',

    navHome: 'मुख्य पृष्ठ',
    navAbout: 'परिचय',
    navPlatform: 'मंच',
    navCompliance: 'अनुपालन',
    navIntelligence: 'आसूचना',
    navResources: 'संसाधन',

    taglineSafeMines: 'सुरक्षित खदान',
    taglineMinerals: 'उत्तरदायी खनिज',
    taglineIndia: 'एक सशक्त भारत',
    headlineMain: 'बुद्धिमत्तापूर्ण खनन',
    headlineAccent: 'सुरक्षित काल्हि निर्माण लेल',
    subDescription:
      'माइनगॉव एआई वास्तविक समयक डेटा, एआई-संचालित अंतर्दृष्टि आ भू-स्थानिक खुफियाक संग खनन कार्यक निगरानी, विश्लेषण आ प्रबंधनक लेल एकीकृत डिजिटल मंच अछि।',
    ctaEnterMineGov: 'माइनगॉव एआई मे प्रवेश करू',
    ctaEnterSubtext: 'सीआईएल आ खदान परिचालन उपयोगकर्ता लेल',
    ctaRegulatory: 'नियामक अभिगम',
    ctaRegulatorySubtext: 'सरकारी आ नियामक अधिकारीक लेल',
    authNotice: 'केबल अधिकृत प्रवेश। सब गतिविधि दर्ज आ मॉनिटर कएल जाइत अछि।',

    visionQuote: 'पारदर्शी, अनुपालनयुक्त आ सतत खनन लेल डेटा आ प्रविधिक उपयोग।',
    visionPeople: 'जनता',
    visionPlanet: 'धरा',
    visionProductivity: 'उत्पादकता',
    visionProgress: 'प्रगति',

    pillar1: 'रीयल-टाइम निगरानी',
    pillar2: 'नियामक अनुपालन',
    pillar3: 'पर्यावरणीय स्थिरता',
    pillar4: 'डेटा-आधारित शासन',
    pillar5: 'परिचालन क्षमता',
    pillar6: 'भू-स्थानिक बुद्धिमत्ता',

    statLeasesNumber: '१,४२०',
    statLeasesLabel: 'सक्रिय पट्टा निगरानी अधीन',
    statMinesNumber: '२८०+',
    statMinesLabel: 'खदान एकीकृत',
    statSatelliteNumber: '२४x७',
    statSatelliteLabel: 'उपग्रह आ आईओटी निगरानी',
    statComplianceNumber: '१००%',
    statComplianceLabel: 'सतत आ अनुपालन खनन दिस',
    whatsNewTitle: 'नवीनतम सूचना',
    viewAll: 'सब देखू',
    newsItem1: 'खदान सुरक्षा अनुपालन आ ढलान टेलीमेट्री लेल संशोधित निर्देश जारी',
    newsItem2: 'प्रमुख कोयला भंडार लेल नव एआई विसंगति जांच मॉड्यूल तैनात',
    newsItem3: 'जीआईएस मल्टी-स्पेक्ट्रल मैपिंग संग पर्यावरण निगरानी डैशबोर्ड उन्नत',

    hudMonitoring: 'रीयल-टाइम निगरानी',
    hudSaferOps: 'सुरक्षित संचालन',
    hudSustainable: 'सतत विकास',
    hudDigitalTwinActive: 'जीएसआई 3डी डिजिटल ट्विन सक्रिय',

    footerCopyright: 'खान मंत्रालय, भारत सरकार',
    privacyPolicy: 'गोपनीयता नीति',
    termsOfUse: 'उपयोगक शर्त',
    accessibility: 'सुगम्यता',
    help: 'सहायता',
    contactUs: 'संपर्क करू',
    nicNotice: 'एनआईसी द्वारा आईबीएम आ जीएसआई क सहयोग सं विकसित | संप्रभु सुरक्षा तंत्र',
  },

  as: {
    goi: 'ভাৰত চৰকাৰ',
    ministryOfMines: 'খনন মন্ত্ৰ্যালয়',
    portalSubtitle: 'ৰাষ্ট্ৰীয় খনন চোৰাংচোৱা আৰু নিৰীক্ষণ প্ৰণালী',
    satelliteActive: 'জিএছআই আৰু আইবিএম উপগ্ৰহ নেটৱৰ্ক সক্ৰিয়',
    azadiTag: 'আজাদী কা অমৃত মহোৎসৱ',
    searchPlaceholder: 'ৰাষ্ট্ৰীয় খনন ডাটাবেছত সন্ধান কৰক...',
    accessPortal: 'প্ৰৱেশ প’ৰ্টেল',

    navHome: 'বেটুপাত',
    navAbout: 'পৰিচিতি',
    navPlatform: 'প্লেটফৰ্ম',
    navCompliance: 'অনুপালন',
    navIntelligence: 'চোৰাংচোৱা',
    navResources: 'সম্পদসমূহ',

    taglineSafeMines: 'সুৰক্ষিত খনি',
    taglineMinerals: 'দায়িত্বশীল খনিজ',
    taglineIndia: 'এক শক্তিশালী ভাৰত',
    headlineMain: 'বুদ্ধিমত্তাভিত্তিক খনন',
    headlineAccent: 'এক সুৰক্ষিত কাইলৈৰ বাবে',
    subDescription:
      'মাইনগভ এআই হৈছে বাস্তৱ-সময়ৰ তথ্য, এআই-চালিত অন্তৰ্দৃষ্টি আৰু ভূ-স্থানিক চোৰাংচোৱাৰ সৈতে খনন কাৰ্যকলাপ নিৰীক্ষণ, বিশ্লেষণ আৰু পৰিচালনা কৰাৰ এক সংহত ডিজিটেল মঞ্চ।',
    ctaEnterMineGov: 'মাইনগভ এআইত প্ৰৱেশ কৰক',
    ctaEnterSubtext: 'চিআইএল আৰু খনি অপাৰেচনেল ব্যৱহাৰকাৰীসকলৰ বাবে',
    ctaRegulatory: 'নিয়ামক প্ৰৱেশাধিকাৰ',
    ctaRegulatorySubtext: 'চৰকাৰী আৰু নিয়ামক বিষয়াসকলৰ বাবে',
    authNotice: 'কেৱল কৰ্তৃত্বপ্ৰাপ্ত প্ৰৱেশ। সকলো কাৰ্যকলাপ নথিভুক্ত আৰু নিৰীক্ষণ কৰা হয়।',

    visionQuote: 'স্বচ্ছ, নিয়মনিষ্ঠ আৰু বহনক্ষম খননৰ বাবে তথ্য আৰু প্ৰযুক্তিৰ ব্যৱহাৰ।',
    visionPeople: 'জনতা',
    visionPlanet: 'পৃথিৱী',
    visionProductivity: 'উৎপাদনশীলতা',
    visionProgress: 'প্ৰগতি',

    pillar1: 'ৰিয়েল-টাইম নিৰীক্ষণ',
    pillar2: 'নিয়ামক অনুপালন',
    pillar3: 'পাৰিবেশিক বহনক্ষমতা',
    pillar4: 'তথ্য-চালিত প্ৰশাসন',
    pillar5: 'কাৰ্যকৰী দক্ষতা',
    pillar6: 'ভূ-স্থানিক বুদ্ধিমত্তা',

    statLeasesNumber: '১,৪২০',
    statLeasesLabel: 'সক্ৰিয় লীজ নিৰীক্ষণৰ অধীনত',
    statMinesNumber: '২৮০+',
    statMinesLabel: 'খনি একত্ৰিত',
    statSatelliteNumber: '২৪x৭',
    statSatelliteLabel: 'উপগ্ৰহ আৰু আইঅ’টি নিৰীক্ষণ',
    statComplianceNumber: '১০০%',
    statComplianceLabel: 'বহনক্ষম আৰু নিয়মনিষ্ঠ খননৰ দিশত',
    whatsNewTitle: 'নতুন জাননী',
    viewAll: 'সকলো চাওক',
    newsItem1: 'খনি সুৰক্ষা অনুপালন আৰু স্লোপ টেলিমেট্ৰিৰ বাবে নতুন নিৰ্দেশনাৱলী',
    newsItem2: 'প্ৰধান কয়লা ভাণ্ডাৰৰ বাবে নতুন এআই-ভিত্তিক অস্বাভাৱিকতা চিনাক্তকৰণ মডিউল মোতায়েন',
    newsItem3: 'জিআইএছ বহু-বৰ্ণালী মেপিঙৰ সৈতে পৰিৱেশ নিৰীক্ষণ ডেচব’ৰ্ড উন্নত কৰা হৈছে',

    hudMonitoring: 'ৰিয়েল-টাইম নিৰীক্ষণ',
    hudSaferOps: 'সুৰক্ষিত পৰিচালনা',
    hudSustainable: 'বহনক্ষম বিকাশ',
    hudDigitalTwinActive: 'জিএছআই ৩ডি ডিজিটেল টুইন সক্ৰিয়',

    footerCopyright: 'খনন মন্ত্ৰ্যালয়, ভাৰত চৰকাৰ',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfUse: 'ব্যৱহাৰৰ চৰ্ত',
    accessibility: 'প্ৰৱেশযোগ্যতা',
    help: 'সহায়',
    contactUs: 'যোগাযোগ কৰক',
    nicNotice: 'এনআইচি দ্বাৰা আইবিএম আৰু জিএছআইৰ সহযোগত বিকশিত | সাৰ্বভৌম সুৰক্ষা মণ্ডল',
  },

  or: {
    goi: 'ଭାରତ ସରକାର',
    ministryOfMines: 'ଖଣି ମନ୍ତ୍ରଣାଳୟ',
    portalSubtitle: 'ଜାତୀୟ ଖଣି ଗୁଇନ୍ଦା ଏବଂ ନିରୀକ୍ଷଣ ପ୍ରଣାଳୀ',
    satelliteActive: 'ଜିଏସଆଇ ଏବଂ ଆଇବିଏମ ଉପଗ୍ରହ ନେଟୱାର୍କ ସକ୍ରିୟ',
    azadiTag: 'ଆଜାଦୀ କା ଅମୃତ ମହୋତ୍ସବ',
    searchPlaceholder: 'ଜାତୀୟ ଖଣି ଡାଟାବେସ୍ ସନ୍ଧାନ କରନ୍ତୁ...',
    accessPortal: 'ପ୍ରବେଶ ପୋର୍ଟାଲ',

    navHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    navAbout: 'ବିଷୟରେ',
    navPlatform: 'ପ୍ଲାଟଫର୍ମ',
    navCompliance: 'ଅନୁପାଳନ',
    navIntelligence: 'ଗୁଇନ୍ଦା',
    navResources: 'ସମ୍ବଳ',

    taglineSafeMines: 'ସୁରକ୍ଷିତ ଖଣି',
    taglineMinerals: 'ଦାୟିତ୍ୱବାନ ଖଣିଜ',
    taglineIndia: 'ଏକ ସଶକ୍ତ ଭାରତ',
    headlineMain: 'ବୁଦ୍ଧିମାନ ଖଣି କାର୍ଯ୍ୟ',
    headlineAccent: 'ଏକ ସୁରକ୍ଷିତ ଆଗାମୀ କାଲି ପାଇଁ',
    subDescription:
      'ମାଇନଗଭ ଏଆଇ ହେଉଛି ରିଅଲ-ଟାଇମ୍ ତଥ୍ୟ, ଏଆଇ-ଚାଳିତ ଅନ୍ତର୍ଦୃଷ୍ଟି ଏବଂ ଭୂ-ସ୍ଥାନିକ ଗୁଇନ୍ଦା ସହିତ ଖଣି କାର୍ଯ୍ୟର ନିରୀକ୍ଷଣ, ବିଶ୍ଳେଷଣ ଏବଂ ପରିଚାଳନା ପାଇଁ ଏକ ଏକୀକୃତ ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ।',
    ctaEnterMineGov: 'ମାଇନଗଭ ଏଆଇ ପ୍ରବେଶ କରନ୍ତୁ',
    ctaEnterSubtext: 'ସିଆଇଏଲ୍ ଏବଂ ଖଣି ପରିଚାଳନା ବ୍ୟବହାରକାରୀଙ୍କ ପାଇଁ',
    ctaRegulatory: 'ନିୟାମକ ପ୍ରବେଶ',
    ctaRegulatorySubtext: 'ସରକାରୀ ଏବଂ ନିୟାମକ ଅଧିକାରୀଙ୍କ ପାଇଁ',
    authNotice: 'କେବଳ ପ୍ରାଧିକୃତ ପ୍ରବେଶ। ସମସ୍ତ କାର୍ଯ୍ୟକଳାପ ଲଗ୍ ଏବଂ ନିରୀକ୍ଷଣ କରାଯାଇଛି।',

    visionQuote: 'ସ୍ୱଚ୍ଛ, ଅନୁପାଳିତ ଏବଂ ନିରନ୍ତର ଖଣି ପାଇଁ ତଥ୍ୟ ଏବଂ ପ୍ରଯୁକ୍ତିବିଦ୍ୟାର ସଦୁପଯୋଗ।',
    visionPeople: 'ଜନସାଧାରଣ',
    visionPlanet: 'ପରିବେଶ',
    visionProductivity: 'ଉତ୍ପାଦକତା',
    visionProgress: 'ପ୍ରଗତି',

    pillar1: 'ରିଅଲ୍-ଟାଇମ୍ ନିରୀକ୍ଷଣ',
    pillar2: 'ନିୟାମକ ଅନୁପାଳନ',
    pillar3: 'ପରିବେଶ ସ୍ଥିରତା',
    pillar4: 'ତଥ୍ୟ-ଚାଳିତ ଶାସନ',
    pillar5: 'ପରିଚାଳନା ଦକ୍ଷତା',
    pillar6: 'ଭୂ-ସ୍ଥାନିକ ବୁଦ୍ଧିମତ୍ତା',

    statLeasesNumber: '୧,୪୨୦',
    statLeasesLabel: 'ସକ୍ରିୟ ଲିଜ୍ ନିରୀକ୍ଷଣ ଅଧୀନ',
    statMinesNumber: '୨୮୦+',
    statMinesLabel: 'ଖଣି ଏକତ୍ରୀକରଣ',
    statSatelliteNumber: '୨୪x୭',
    statSatelliteLabel: 'ଉପଗ୍ରହ ଏବଂ ଆଇଓଟି ନିରୀକ୍ଷଣ',
    statComplianceNumber: '୧୦୦%',
    statComplianceLabel: 'ନିରନ୍ତର ଏବଂ ନିୟମାନୁଯାୟୀ ଖଣି ଦିଗରେ',
    whatsNewTitle: 'ନୂତନ ବିଜ୍ଞପ୍ତି',
    viewAll: 'ସମସ୍ତ ଦେଖନ୍ତୁ',
    newsItem1: 'ଖଣି ସୁରକ୍ଷା ଅନୁପାଳନ ଏବଂ ସ୍ଲୋପ୍ ଟେଲିମେଟ୍ରି ପାଇଁ ଅଦ୍ୟତିତ ନିର୍ଦ୍ଦେଶାବଳୀ ଜାରି',
    newsItem2: 'ପ୍ରମୁଖ କୋଇଲା ଭଣ୍ଡାର ପାଇଁ ନୂତନ ଏଆଇ-ଆଧାରିତ ଅସ୍ୱାଭାବିକତା ଚିହ୍ନଟ ମଡ୍ୟୁଲ୍ ପ୍ରସ୍ତୁତ',
    newsItem3: 'ଜିଆଇଏସ୍ ମଲ୍ଟି-ସ୍ପେକ୍ଟ୍ରାଲ୍ ମ୍ୟାପିଂ ସହିତ ପରିବେଶ ନିରୀକ୍ଷଣ ଡ୍ୟାସବୋର୍ଡ ଉନ୍ନତ',

    hudMonitoring: 'ରିଅଲ୍-ଟାଇମ୍ ନିରୀକ୍ଷଣ',
    hudSaferOps: 'ସୁରକ୍ଷିତ ପରିଚାଳନା',
    hudSustainable: 'ସ୍ଥାୟୀ ଅଭିବୃଦ୍ଧି',
    hudDigitalTwinActive: 'ଜିଏସଆଇ ୩ଡି ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍ ସକ୍ରିୟ',

    footerCopyright: 'ଖଣି ମନ୍ତ୍ରଣାଳୟ, ଭାରତ ସରକାର',
    privacyPolicy: 'ଗୋପନୀୟତା ନୀତି',
    termsOfUse: 'ବ୍ୟବହାର ସର୍ତ୍ତାବଳୀ',
    accessibility: 'ସୁଗମତା',
    help: 'ସହାୟତା',
    contactUs: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
    nicNotice: 'ଏନଆଇସି ଦ୍ୱାରା ଆଇବିଏମ ଏବଂ ଜିଏସଆଇ ସହଯୋଗରେ ବିକଶିତ | ସାର୍ବଭୌମ ସୁରକ୍ଷା ମଣ୍ଡଳ',
  },
};

export type FontSize = 'sm' | 'base' | 'lg';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationStrings;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  currentLangInfo: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [fontSize, setFontSizeState] = useState<FontSize>('base');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('minegov_lang') as LanguageCode;
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
      const savedFont = localStorage.getItem('minegov_fontsize') as FontSize;
      if (savedFont && ['sm', 'base', 'lg'].includes(savedFont)) {
        setFontSizeState(savedFont);
      }
    } catch {
      // Ignore localStorage read errors in restricted contexts
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('minegov_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore
    }
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    try {
      localStorage.setItem('minegov_fontsize', size);
      document.documentElement.setAttribute('data-font-size', size);
    } catch {
      // Ignore
    }
  };

  const currentLangInfo =
    SUPPORTED_LANGUAGES.find((item) => item.code === language) || SUPPORTED_LANGUAGES[0];

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        fontSize,
        setFontSize,
        currentLangInfo,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
