import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LANGUAGE_STORAGE_KEY = "minegov-language";

export const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "as", name: "অসমীয়া" },
  { code: "bn", name: "বাংলা" },
  { code: "brx", name: "बड़ो" },
  { code: "doi", name: "डोगरी" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "hi", name: "हिंदी" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ks", name: "कॉशुर / کٲشُر" },
  { code: "kok", name: "कोंकणी" },
  { code: "mai", name: "मैथिली" },
  { code: "ml", name: "മലയാളം" },
  { code: "mni", name: "মৈতৈলোন" },
  { code: "mr", name: "मराठी" },
  { code: "ne", name: "नेपाली" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "sa", name: "संस्कृतम्" },
  { code: "sat", name: "संताली" },
  { code: "sd", name: "सिन्धी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "ur", name: "اُردُو" },
];

const supportedLanguageCodes = new Set(
  supportedLanguages.map(({ code }) => code),
);

const translations = {
  en: {
    home: "Home",
    about: "About",
    platform: "Platform",
    compliance: "Compliance",
    intelligence: "Intelligence",
    resources: "Resources",
    search: "Search...",
    gatewayLogin: "Gateway Login",
    enterMineGov: "Enter MineGov AI",
    cilUsers: "For CIL & Mine Operational Users",
    regulatoryOfficials: "For Government & Regulatory Officials",
    authorisedOnly:
      "Authorised access only. All activities are logged and monitored.",
    capabilityMonitoring: "Real-time Monitoring",
    capabilitySafety: "Safer Operations",
    capabilitySustainability: "Sustainable Growth",
    english: "English",
    hindi: "Hindi",
    language: "Language",
    safeMines: "SAFE MINES",
    responsibleMinerals: "RESPONSIBLE MINERALS",
    strongerIndia: "A STRONGER INDIA",
    intelligentMining: "Intelligent Mining",
    saferTomorrow: "for a Safer Tomorrow",
    heroDescription:
      "MineGov AI is a unified digital platform for monitoring, analysing and managing mining operations with real-time data, AI-driven insights and geospatial intelligence.",
    explorePlatform: "Explore Platform",
    regulatoryAccess: "Regulatory Access",
    latestUpdates: "Latest Updates",
    viewAll: "View all",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    accessibility: "Accessibility",
    help: "Help",
    contactUs: "Contact Us",
  },
  hi: {
    home: "होम",
    about: "परिचय",
    platform: "प्लेटफ़ॉर्म",
    compliance: "अनुपालन",
    intelligence: "इंटेलिजेंस",
    resources: "संसाधन",
    search: "खोजें...",
    gatewayLogin: "गेटवे लॉगिन",
    enterMineGov: "MineGov AI में प्रवेश करें",
    cilUsers: "CIL और खदान संचालन उपयोगकर्ताओं के लिए",
    regulatoryOfficials: "सरकारी और नियामक अधिकारियों के लिए",
    authorisedOnly:
      "केवल अधिकृत प्रवेश। सभी गतिविधियां दर्ज और निगरानी में हैं।",
    capabilityMonitoring: "वास्तविक समय निगरानी",
    capabilitySafety: "सुरक्षित संचालन",
    capabilitySustainability: "सतत विकास",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    language: "भाषा",
    safeMines: "सुरक्षित खदानें",
    responsibleMinerals: "जिम्मेदार खनिज",
    strongerIndia: "एक सशक्त भारत",
    intelligentMining: "बुद्धिमान खनन",
    saferTomorrow: "सुरक्षित कल के लिए",
    heroDescription:
      "MineGov AI वास्तविक समय डेटा, AI आधारित जानकारी और भू-स्थानिक इंटेलिजेंस के साथ खनन कार्यों की निगरानी, विश्लेषण और प्रबंधन के लिए एक एकीकृत डिजिटल प्लेटफ़ॉर्म है।",
    explorePlatform: "प्लेटफ़ॉर्म देखें",
    regulatoryAccess: "नियामक प्रवेश",
    latestUpdates: "नवीनतम अपडेट",
    viewAll: "सभी देखें",
    privacyPolicy: "गोपनीयता नीति",
    termsOfUse: "उपयोग की शर्तें",
    accessibility: "सुगम्यता",
    help: "सहायता",
    contactUs: "संपर्क करें",
  },
};

const additionalTranslations = {
  as: {
    home: "গৃহ",
    about: "পৰিচয়",
    platform: "প্লেটফৰ্ম",
    compliance: "অনুপালন",
    intelligence: "বুদ্ধিমত্তা",
    resources: "সম্পদ",
    search: "সন্ধান...",
    gatewayLogin: "গেটৱে লগইন",
    language: "ভাষা",
  },
  bn: {
    home: "হোম",
    about: "পরিচিতি",
    platform: "প্ল্যাটফর্ম",
    compliance: "অনুপালন",
    intelligence: "বুদ্ধিমত্তা",
    resources: "সম্পদ",
    search: "অনুসন্ধান...",
    gatewayLogin: "গেটওয়ে লগইন",
    language: "ভাষা",
  },
  brx: {
    home: "हाम",
    about: "सोमोन्दों",
    platform: "प्लेटफर्म",
    compliance: "अनुपालन",
    intelligence: "बुद्धिमत्ता",
    resources: "संसाधन",
    search: "नायनाय...",
    gatewayLogin: "गेटवे लगइन",
    language: "राव",
  },
  doi: {
    home: "घर",
    about: "परिचय",
    platform: "प्लेटफार्म",
    compliance: "अनुपालन",
    intelligence: "बुद्धिमत्ता",
    resources: "संसाधन",
    search: "तुपना...",
    gatewayLogin: "गेटवे लॉगिन",
    language: "भाशा",
  },
  gu: {
    home: "હોમ",
    about: "પરિચય",
    platform: "પ્લેટફોર્મ",
    compliance: "અનુપાલન",
    intelligence: "બુદ્ધિ",
    resources: "સંસાધનો",
    search: "શોધો...",
    gatewayLogin: "ગેટવે લૉગિન",
    language: "ભાષા",
  },
  kn: {
    home: "ಮುಖಪುಟ",
    about: "ಪರಿಚಯ",
    platform: "ವೇದಿಕೆ",
    compliance: "ಅನುಸರಣೆ",
    intelligence: "ಬುದ್ಧಿಮತ್ತೆ",
    resources: "ಸಂಪನ್ಮೂಲಗಳು",
    search: "ಹುಡುಕಿ...",
    gatewayLogin: "ಗೇಟ್‌ವೇ ಲಾಗಿನ್",
    language: "ಭಾಷೆ",
  },
  ks: {
    home: "گَر",
    about: "تَعارُف",
    platform: "پلیٹ فارم",
    compliance: "پَیرَوی",
    intelligence: "ذہانت",
    resources: "وسیلہ",
    search: "ژھانڈ...",
    gatewayLogin: "گیٹ وے لاگ اِن",
    language: "زَبان",
  },
  kok: {
    home: "मुखेल पान",
    about: "म्हायती",
    platform: "प्लॅटफॉर्म",
    compliance: "अनुपालन",
    intelligence: "बुद्धीमत्ता",
    resources: "साधनां",
    search: "सोदात...",
    gatewayLogin: "गेटवे लॉगिन",
    language: "भास",
  },
  mai: {
    home: "घर",
    about: "परिचय",
    platform: "प्लेटफार्म",
    compliance: "अनुपालन",
    intelligence: "बुद्धिमत्ता",
    resources: "संसाधन",
    search: "खोजू...",
    gatewayLogin: "गेटवे लॉगिन",
    language: "भाषा",
  },
  ml: {
    home: "ഹോം",
    about: "പരിചയം",
    platform: "പ്ലാറ്റ്ഫോം",
    compliance: "അനുസരണം",
    intelligence: "ബുദ്ധി",
    resources: "വിഭവങ്ങൾ",
    search: "തിരയുക...",
    gatewayLogin: "ഗേറ്റ്‌വേ ലോഗിൻ",
    language: "ഭാഷ",
  },
  mni: {
    home: "ꯍꯣꯝ",
    about: "ꯑꯃꯥꯗꯤ",
    platform: "ꯄ꯭ꯂꯥꯠꯐꯣꯔꯝ",
    compliance: "ꯑꯅꯨꯄꯥꯂꯟ",
    intelligence: "ꯁꯤꯡꯗꯥꯏ",
    resources: "ꯐꯪꯐꯝ",
    search: "ꯊꯤꯕ...",
    gatewayLogin: "ꯒꯦꯠꯋꯦ ꯂꯣꯒꯏꯟ",
    language: "ꯂꯣꯟ",
  },
  mr: {
    home: "मुख्यपृष्ठ",
    about: "परिचय",
    platform: "प्लॅटफॉर्म",
    compliance: "अनुपालन",
    intelligence: "बुद्धिमत्ता",
    resources: "संसाधने",
    search: "शोधा...",
    gatewayLogin: "गेटवे लॉगिन",
    language: "भाषा",
  },
  ne: {
    home: "गृहपृष्ठ",
    about: "परिचय",
    platform: "प्लेटफर्म",
    compliance: "अनुपालन",
    intelligence: "बुद्धिमत्ता",
    resources: "स्रोतहरू",
    search: "खोज्नुहोस्...",
    gatewayLogin: "गेटवे लगइन",
    language: "भाषा",
  },
  or: {
    home: "ମୂଳପୃଷ୍ଠା",
    about: "ପରିଚୟ",
    platform: "ପ୍ଲାଟଫର୍ମ",
    compliance: "ଅନୁପାଳନ",
    intelligence: "ବୁଦ୍ଧିମତ୍ତା",
    resources: "ସମ୍ବଳ",
    search: "ଖୋଜନ୍ତୁ...",
    gatewayLogin: "ଗେଟୱେ ଲଗଇନ୍",
    language: "ଭାଷା",
  },
  pa: {
    home: "ਮੁੱਖ ਪੰਨਾ",
    about: "ਜਾਣ-ਪਛਾਣ",
    platform: "ਪਲੇਟਫਾਰਮ",
    compliance: "ਪਾਲਣਾ",
    intelligence: "ਬੁੱਧੀਮਤਾ",
    resources: "ਸਰੋਤ",
    search: "ਖੋਜੋ...",
    gatewayLogin: "ਗੇਟਵੇ ਲੌਗਇਨ",
    language: "ਭਾਸ਼ਾ",
  },
  sa: {
    home: "मुखपृष्ठम्",
    about: "परिचयः",
    platform: "मञ्चः",
    compliance: "अनुपालनम्",
    intelligence: "बुद्धिमत्ता",
    resources: "साधनानि",
    search: "अन्विष्यताम्...",
    gatewayLogin: "द्वारप्रवेशः",
    language: "भाषा",
  },
  sat: {
    home: "ओल",
    about: "पोरिचोय",
    platform: "प्लेटफॉर्म",
    compliance: "मानोतो",
    intelligence: "बुदाम",
    resources: "सामान",
    search: "साबाद...",
    gatewayLogin: "गेटवे लॉगिन",
    language: "पारसी",
  },
  sd: {
    home: "گهر",
    about: "تعارف",
    platform: "پليٽفارم",
    compliance: "پيروي",
    intelligence: "ذهانت",
    resources: "وسيلا",
    search: "ڳوليو...",
    gatewayLogin: "گيٽ وي لاگ ان",
    language: "ٻولي",
  },
  ta: {
    home: "முகப்பு",
    about: "அறிமுகம்",
    platform: "தளம்",
    compliance: "இணக்கம்",
    intelligence: "நுண்ணறிவு",
    resources: "வளங்கள்",
    search: "தேடுக...",
    gatewayLogin: "நுழைவாயில் உள்நுழைவு",
    language: "மொழி",
  },
  te: {
    home: "హోమ్",
    about: "పరిచయం",
    platform: "వేదిక",
    compliance: "అనుసరణ",
    intelligence: "మేధస్సు",
    resources: "వనరులు",
    search: "వెతకండి...",
    gatewayLogin: "గేట్‌వే లాగిన్",
    language: "భాష",
  },
  ur: {
    home: "گھر",
    about: "تعارف",
    platform: "پلیٹ فارم",
    compliance: "تعمیل",
    intelligence: "ذہانت",
    resources: "وسائل",
    search: "تلاش کریں...",
    gatewayLogin: "گیٹ وے لاگ اِن",
    language: "زبان",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguageCodes.has(savedLanguage) ? savedLanguage : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const activeTranslations = {
    ...translations.en,
    ...(translations[language] || {}),
    ...(additionalTranslations[language] || {}),
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      supportedLanguages,
      t: (key) => activeTranslations[key] || translations.en[key] || key,
    }),
    [activeTranslations, language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
