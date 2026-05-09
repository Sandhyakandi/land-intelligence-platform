import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🔥 Load saved language
const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        map: "Map",
        submit: "Submit Land",
      
        price: "Price",
        area: "Area",
        location: "Location",
        date: "Date",
        status: "Status",
 
      "submitLandTitle": "Submit Land Details",
  "submitLandDesc": "Submit property pricing information for moderation and map visualization",
historicalTrends: "Historical Trends & Analytics",

    dashboard: "Land Pricing Intelligence Dashboard",

    averagePrice: "Average Price",

    lowestZone: "Lowest Zone",

    growthPercent: "Growth %",

    priceGrowthTrends: "Price Growth Trends",

    areaVsPrice: "Area vs Price",

    districtHistorical: "District-wise Historical Trends",

    approvedLandHistory: "Approved Land History",

    district: "District",

    year: "Year",
  "location": "Location",
  "price": "Price",
  "area": "Area (sqyd)",
  "landType": "Land Type",
  "currency": "Currency",
  "submissionDate": "Submission Date",
  "latitude": "Latitude",
  "longitude": "Longitude",
   reviewMsg:
      "Your submission will be reviewed by admin before appearing on map",

    heatmapGuide: "Heatmap Guide",

    lowPrice: "🟢 Green → Low Price",

    mediumPrice: "🟡 Yellow → Medium Price",

    expensivePrice: "🔴 Red → Very Expensive Price",

    normalPrice: "🔵 Blue → Normal Price",
landSubmitted: "Land submitted successfully",
approvedSuccess: "Approved successfully",
rejectedSuccess: "Rejected successfully",
  "residential": "Residential",
  "commercial": "Commercial",
  "agriculture": "Agriculture",

  "submittedNote": "Submitted lands go to moderator approval",
  "approvedNote": "Approved lands appear on map markers",
highestZone: "Highest Zone",
  "submitButton": "Submit Land",

  "map": "Map",
  priceRange: "Price Range",

areaRange: "Area Range",

districtKeyword: "District / Location Keyword",

  allTypes: "All Types",
  "history": "History",
  "moderation": "Moderation",
  "markers": "Markers",
  "heatmap": "Heatmap",
  approve: "Approve",
reject: "Reject",

currency: "Currency",

currencies: {
  INR: "INR",
  USD: "USD"
},

languages: {
  EN: "English",
  TE: "Telugu",
  HI: "Hindi"
},

sizes: {
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large"
},
flag: "Flag",
actions: "Actions",

landTypes: {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  AGRICULTURE: "Agriculture"
},

flags: {
  NORMAL: "Normal",
  OVERPRICED: "Overpriced",
  UNDERVALUED: "Undervalued",
  HIGH: "Overpriced",
  LOW: "Undervalued"
},
  "landPricingIntelligence": "Land Pricing Intelligence",
  "landPricing":"Land Pricing"
      }
    },



    te: {
      translation: {
        map: "మ్యాప్",
        submit: "భూమి నమోదు",
     allTypes: "అన్ని రకాలూ",
        price: "ధర",
        area: "ప్రాంతం",
        highestZone: "అత్యధిక ధర ప్రాంతం",
        priceRange: "ధర పరిధి",
 historicalTrends: "చారిత్రక ధోరణులు & విశ్లేషణలు",

    dashboard: "భూమి ధరల ఇంటెలిజెన్స్ డ్యాష్‌బోర్డ్",

    averagePrice: "సగటు ధర",

    lowestZone: "అత్యల్ప ధర ప్రాంతం",

    growthPercent: "వృద్ధి %",

    priceGrowthTrends: "ధరల వృద్ధి ధోరణులు",

    areaVsPrice: "విస్తీర్ణం vs ధర",

    districtHistorical: "జిల్లా వారీ చారిత్రక ధోరణులు",

    approvedLandHistory: "ఆమోదించబడిన భూముల చరిత్ర",

    district: "జిల్లా",

    year: "సంవత్సరం",
areaRange: "విస్తీర్ణ పరిధి",

districtKeyword: "జిల్లా / స్థల పేరు",

        location: "స్థానం",
        date: "తేదీ",
        status: "స్థితి",
        "landPricing":"భూమి ధరల",
       "Land Pricing Intelligence":"భూమి ధరల విశ్లేషణ",
     approve: "ఆమోదించు",
reject: "తిరస్కరించు",

currency: "కరెన్సీ",
reviewMsg:
      "మీ సమర్పణ మ్యాప్‌లో కనిపించే ముందు అడ్మిన్ ద్వారా సమీక్షించబడుతుంది",

    heatmapGuide: "హీట్‌మ్యాప్ మార్గదర్శిని",

    lowPrice: "🟢 ఆకుపచ్చ → తక్కువ ధర",

    mediumPrice: "🟡 పసుపు → మధ్యస్థ ధర",

    expensivePrice: "🔴 ఎరుపు → చాలా ఎక్కువ ధర",

    normalPrice: "🔵 నీలం → సాధారణ ధర",

currencies: {
  INR: "రూ",
  USD: "డాలర్"
},

languages: {
  EN: "ఆంగ్లం",
  TE: "తెలుగు",
  HI: "హిందీ"
},

sizes: {
  SMALL: "చిన్న ",
  MEDIUM: "మధ్యస్థ ",
  LARGE: "పెద్ద "
},

      "submitLandTitle": "భూమి వివరాలు నమోదు చేయండి",
  "submitLandDesc": "మోడరేషన్ మరియు మ్యాప్ విజువలైజేషన్ కోసం భూమి ధర వివరాలను సమర్పించండి",
flag: "స్థితి",
actions: "చర్యలు",

landTypes: {
  RESIDENTIAL: "నివాస",
  COMMERCIAL: "వాణిజ్య",
  AGRICULTURE: "వ్యవసాయ"
},

flags: {
  NORMAL: "సాధారణ",
  OVERPRICED: "అధిక ధర",
  UNDERVALUED: "తక్కువ ధర",
   HIGH: "అధిక ధర",
  LOW: "తక్కువ ధర"
},
  "location": "స్థానం",
  "price": "ధర",
  "area": "విస్తీర్ణం (చదరపు గజాలు)",
  "landType": "భూమి రకం",
  "currency": "కరెన్సీ",
  "submissionDate": "సమర్పణ తేదీ",
  "latitude": "అక్షాంశం",
  "longitude": "రేఖాంశం",
landSubmitted: "భూమి విజయవంతంగా సమర్పించబడింది",
approvedSuccess: "విజయవంతంగా ఆమోదించబడింది",
rejectedSuccess: "విజయవంతంగా తిరస్కరించబడింది",
  "residential": "నివాస",
  "commercial": "వాణిజ్య",
  "agriculture": "వ్యవసాయ",

  "submittedNote": "సమర్పించిన భూములు మోడరేటర్ ఆమోదానికి వెళ్తాయి",
  "approvedNote": "ఆమోదించిన భూములు మ్యాప్‌లో కనిపిస్తాయి",

  "submitButton": "భూమి సమర్పించండి",

  "map": "మ్యాప్",
  "history": "చరిత్ర",
  "moderation": "మోడరేషన్",
  "markers": "మార్కర్లు",
  "heatmap": "హీట్‌మ్యాప్",

  "landPricingIntelligence": "భూమి ధరల విశ్లేషణ"
      }
    },
    hi: {
      translation: {
        map: "मानचित्र",
        submit: "जमा करें",
      "submitLandTitle": "भूमि विवरण जमा करें",
  "submitLandDesc": "मॉडरेशन और मैप विज़ुअलाइज़ेशन के लिए भूमि मूल्य जानकारी जमा करें",
priceRange: "मूल्य सीमा",

areaRange: "क्षेत्र सीमा",
 historicalTrends: "ऐतिहासिक रुझान और विश्लेषण",

    dashboard: "भूमि मूल्य इंटेलिजेंस डैशबोर्ड",

    averagePrice: "औसत मूल्य",

    lowestZone: "सबसे कम मूल्य क्षेत्र",

    growthPercent: "वृद्धि %",
     highestZone: "सबसे अधिक मूल्य क्षेत्र",

    priceGrowthTrends: "मूल्य वृद्धि रुझान",

    areaVsPrice: "क्षेत्रफल बनाम मूल्य",

    districtHistorical: "जिला-वार ऐतिहासिक रुझान",

    approvedLandHistory: "स्वीकृत भूमि इतिहास",

    district: "जिला",

    year: "वर्ष",
districtKeyword: "जिला / स्थान नाम",

searchDistrict: "जिला या स्थान खोजें",
 reviewMsg:
      "आपकी सबमिशन मैप पर दिखने से पहले एडमिन द्वारा समीक्षा की जाएगी",

    heatmapGuide: "हीटमैप गाइड",

    lowPrice: "🟢 हरा → कम कीमत",

    mediumPrice: "🟡 पीला → मध्यम कीमत",

    expensivePrice: "🔴 लाल → बहुत महंगी कीमत",

    normalPrice: "🔵 नीला → सामान्य कीमत",
  "location": "स्थान",
  landSubmitted: "भूमि सफलतापूर्वक जमा की गई",
approvedSuccess: "सफलतापूर्वक स्वीकृत",
rejectedSuccess: "सफलतापूर्वक अस्वीकृत",
  "price": "कीमत",
  allTypes: "सभी प्रकार",
  "area": "क्षेत्रफल (वर्ग गज)",
  "landType": "भूमि प्रकार",
  "currency": "मुद्रा",
  "submissionDate": "जमा करने की तारीख",
  "latitude": "अक्षांश",
  "longitude": "देशांतर",
  approve: "स्वीकृत करें",
reject: "अस्वीकार करें",

currency: "मुद्रा",

currencies: {
  INR: "रुपया",
  USD: "डॉलर"
},

languages: {
  EN: "अंग्रेज़ी",
  TE: "तेलुगु",
  HI: "हिंदी"
},

sizes: {
  SMALL: "छोटा",
  MEDIUM: "मध्यम",
  LARGE: "बड़ा"
},

flag: "स्थिति",
actions: "कार्रवाई",

landTypes: {
  RESIDENTIAL: "आवासीय",
  COMMERCIAL: "व्यावसायिक",
  AGRICULTURE: "कृषि"
},

flags: {
  NORMAL: "सामान्य",
  OVERPRICED: "अधिक मूल्य",
  UNDERVALUED: "कम मूल्य",
    HIGH: "अधिक मूल्य",
  LOW: "कम मूल्य"
},
  "residential": "आवासीय",
  "commercial": "वाणिज्यिक",
  "agriculture": "कृषि",

  "submittedNote": "जमा की गई भूमि मॉडरेटर अनुमोदन के लिए जाएगी",
  "approvedNote": "स्वीकृत भूमि मैप मार्कर में दिखाई देगी",

  "submitButton": "भूमि जमा करें",

  "map": "मानचित्र",
  "history": "इतिहास",
  "moderation": "मॉडरेशन",
  "markers": "मार्कर",
  "heatmap": "हीटमैप",

  "landPricingIntelligence": "भूमि मूल्य विश्लेषण",
        price: "कीमत",
        area: "क्षेत्र",
        location: "स्थान",
        date: "तारीख",
        status: "स्थिति",
      "Land Pricing Intelligence":"भूमि मूल्य विश्लेषण",
      
      }
    }
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }


});

export default i18n;


export const translateDynamicText = async (
  text,
  language = "EN"
) => {
  if (!text) return "";

  const langMap = {
    EN: "en",
    TE: "te",
    HI: "hi",
  };

  const targetLang = langMap[language] || "en";
  if (targetLang === "en") {
    return text;
  }

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
        text
      )}`
    );

    const data = await response.json();

    return data[0][0][0];
  } catch (error) {
    console.error("Translation Error:", error);

    return text;
  }
};