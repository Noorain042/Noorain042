import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Droplets,
  AlertTriangle,
  Activity,
  Cpu,
  Globe,
  Sliders,
  Volume2,
  ShieldAlert,
  Search,
  Zap,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Layers,
  Settings,
  Radio,
  ArrowRight,
  ChevronRight,
  Wind,
  Thermometer,
  CloudRain,
  Languages,
  FileCode,
  Terminal,
  Info,
  X,
  Play,
  Pause,
  Server,
  Database,
  Brain,
  Sparkles
} from 'lucide-react';

// Languages and Translations
const TRANSLATIONS = {
  EN: {
    title: 'JALSATHI AI',
    tagline: 'Observe → Predict → Explain → Act',
    subtitle: 'Multi-Agent AI Water Intelligence Command Platform',
    heroDesc: 'JALSATHI AI observes real-time hydrologic conditions, predicts critical flood, drought, and pipeline leakage risks, explains root causes through explainable AI, and recommends targeted emergency actions.',
    exploreDashboard: 'Explore Command Center',
    tryAssistant: 'Launch AI Assistant',
    floodRisk: 'Flood Risk',
    droughtRisk: 'Drought Risk',
    leakageRisk: 'Pipeline Leakage',
    areasMonitored: 'Active Zones Monitored',
    askHeading: 'Ask JALSATHI Intelligence',
    askPlaceholder: 'Ask about flood forecast, drought severity, or pipeline leaks...',
    simTitle: 'Hackathon Demo Simulation Mode',
    simplifyBtn: 'Simplify Explanation',
    simplifiedView: 'Rural Community View',
    technicalView: 'Technical Diagnosis View',
  },
  HI: {
    title: 'जल साथी AI',
    tagline: 'निरीक्षण → पूर्वानुमान → व्याख्या → कार्यवाही',
    subtitle: 'मल्टी-एजेंट जल बुद्धिमत्ता कमांड प्लेटफॉर्म',
    heroDesc: 'जल साथी AI वास्तविक समय के जल स्तर की निगरानी करता है, बाढ़, सूखे और पाइपलाइन रिसाव के जोखिम का अनुमान लगाता है और समय पर कार्रवाई का सुझाव देता है।',
    exploreDashboard: 'कमांड सेंटर देखें',
    tryAssistant: 'AI सहायक शुरू करें',
    floodRisk: 'बाढ़ जोखिम',
    droughtRisk: 'सूखा जोखिम',
    leakageRisk: 'पाइपलाइन रिसाव',
    areasMonitored: 'सक्रिय क्षेत्र',
    askHeading: 'जल साथी से पूछें',
    askPlaceholder: 'बाढ़, सूखे या पाइपलाइन रिसाव के बारे में पूछें...',
    simTitle: 'सिमुलेशन मोड',
    simplifyBtn: 'सरल भाषा में समझें',
    simplifiedView: 'ग्रामीण / जनसाधारण दृश्य',
    technicalView: 'तकनीकी विश्लेषण दृश्य',
  },
  KN: {
    title: 'ಜಲಸಾಥಿ AI',
    tagline: 'ವೀಕ್ಷಿಸಿ → ಮುನ್ಸೂಚಿಸಿ → ವಿವರಿಸಿ → ಕಾರ್ಯನಿರ್ವಹಿಸಿ',
    subtitle: 'ಬಹು-ಏಜೆಂಟ್ ಜಲ ಬುದ್ಧಿವಂತಿಕೆ ಕಮಾಂಡ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್',
    heroDesc: 'ಜಲಸಾಥಿ AI ನೈಜ-ಸಮಯದ ನೀರು ಮತ್ತು ಹವಾಮಾನ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ, ಪ್ರವಾಹ, ಬಾರಗಾಲ ಮತ್ತು ಪೈಪ್‌ಲೈನ್ ಸೋರಿಕೆಯನ್ನು ಮುನ್ಸೂಚಿಸುತ್ತದೆ.',
    exploreDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ',
    tryAssistant: 'AI ಸಹಾಯಕ ಪ್ರಾರಂಭಿಸಿ',
    floodRisk: 'ಪ್ರವಾಹ ಅಪಾಯ',
    droughtRisk: 'ಬರಗಾಲ ಅಪಾಯ',
    leakageRisk: 'ಪೈಪ್‌ಲೈನ್ ಸೋರಿಕೆ',
    areasMonitored: 'ಸಕ್ರಿಯ ವಲಯಗಳು',
    askHeading: 'ಜಲಸಾಥಿ AI ಯನ್ನು ಕೇಳಿ',
    askPlaceholder: 'ಪ್ರವಾಹ, ಬರ ಅಥವಾ ಸೋರಿಕೆ ಕುರಿತು ಪ್ರಶ್ನಿಸಿ...',
    simTitle: 'ಸಿಮ್ಯುಲೇಶನ್ ಮೋಡ್',
    simplifyBtn: 'ಸರಳ ವಿವರಣೆ',
    simplifiedView: 'ಸಾಮಾನ್ಯ ಜನರಿಗೆ ವಿವರಣೆ',
    technicalView: 'ತಾಂತ್ರಿಕ ನೋಟ',
  },
  AS: {
    title: 'জল সাথী AI',
    tagline: 'পর্যবেক্ষণ → পূৰ্বানুমান → ব্যাখ্যা → ব্যৱস্থা',
    subtitle: 'বহু-এজেণ্ট জল বুদ্ধিমত্তা কমাণ্ড প্লেটফৰ্ম',
    heroDesc: 'জল সাথী AI-য়ে বানপানী, খৰাং আৰু পাইপলাইন লিক নিৰীক্ষণ কৰি সঠিক আৰু সময়োপযোগী পদক্ষেপ গ্ৰহণত সহায় কৰে।',
    exploreDashboard: 'কমাণ্ড চেণ্টাৰ চাওক',
    tryAssistant: 'AI সহায়ক আৰম্ভ কৰক',
    floodRisk: 'বানপানীৰ ঝুঁকি',
    droughtRisk: 'খৰাং ঝুঁকি',
    leakageRisk: 'পাইপলাইন লিক',
    areasMonitored: 'সক্ৰিয় অঞ্চল',
    askHeading: 'জল সাথীক সোধক',
    askPlaceholder: 'বানপানী, খৰাং বা লিক সম্পৰ্কে সোধক...',
    simTitle: 'চিমুলেচন ম’ড',
    simplifyBtn: 'সৰল ব্যাখ্যা',
    simplifiedView: 'ৰাইজৰ বাবে সৰল ৰূপ',
    technicalView: 'কাৰিকৰী বিশ্লেষণ',
  }
};

// Location Telemetry Database
const LOCATIONS_DATA = [
  {
    id: 'assam',
    name: 'Assam (Brahmaputra Basin)',
    type: 'flood',
    riskLevel: 'HIGH',
    probability: 82,
    waterLevel: '+3.4m Above Danger Mark',
    rainfall: '148 mm/24h',
    affected: 23876,
    lat: 26.2006,
    lng: 92.9376,
    xRatio: 0.78,
    yRatio: 0.38,
    summary: 'Severe river swell detected along Brahmaputra basin following torrential catchment precipitation.',
    technicalExplanation: 'Data Agent recorded a cumulative 148mm catchment precipitation within 24 hours. Hydrological models project threshold breach at Guwahati gauge within 12-18 hours.',
    simplifiedExplanation: 'It has rained very heavily upstream. Rivers are overflowing quickly. Moving to higher ground immediately is strongly advised.',
    actions: [
      'Issue immediate evacuation notice to low-lying communities in Kaziranga & Barpeta.',
      'Deploy State Disaster Response Forces (SDRF) to flood shelter zones.',
      'Broadcast automated SMS alerts in Assamese & Bengali to 45,000+ local SIM cards.',
      'Pre-position potable water purification units and medical emergency supplies.'
    ],
    timeline: [
      { time: 'NOW', risk: 'HIGH', status: '82% Probability' },
      { time: '+6 Hours', risk: 'CRITICAL', status: 'Peak Surge Expected' },
      { time: '+12 Hours', risk: 'HIGH', status: 'Sustained Crest' },
      { time: '+24 Hours', risk: 'MEDIUM', status: 'Gradual Recede' }
    ]
  },
  {
    id: 'mandya',
    name: 'Mandya, Karnataka',
    type: 'drought',
    riskLevel: 'MEDIUM',
    probability: 64,
    soilMoisture: '32%',
    rainfallDeficit: '-48%',
    affected: 18400,
    lat: 12.5218,
    lng: 76.8951,
    xRatio: 0.42,
    yRatio: 0.72,
    summary: 'Critical soil moisture depletion and agricultural drought conditions in Cauvery irrigation district.',
    technicalExplanation: 'Multispectral satellite indices (NDVI/NDWI) indicate a 48% precipitation shortfall relative to the 10-year mean. Ground moisture probes register critical 32% volumetric soil moisture.',
    simplifiedExplanation: 'Rainfall has been very low this season, making the soil dry. Farmers should save irrigation water and use drip watering.',
    actions: [
      'Activate micro-irrigation subsidies and advisory for sugarcane and paddy crops.',
      'Restrict non-essential urban water diversions from Krishnarajasagara (KRS) reservoir.',
      'Deploy emergency water tankers to 14 rural habitations experiencing severe well depletion.',
      'Issue crop insurance filing notifications to local farmer collectives.'
    ],
    timeline: [
      { time: 'NOW', risk: 'MEDIUM', status: '32% Soil Moisture' },
      { time: '+6 Hours', risk: 'MEDIUM', status: 'Elevated Heat Strain' },
      { time: '+12 Hours', risk: 'HIGH', status: 'Reservoir Inflow Decline' },
      { time: '+24 Hours', risk: 'HIGH', status: 'Critical Evaporative Loss' }
    ]
  },
  {
    id: 'indore',
    name: 'Indore / Mhow',
    type: 'leakage',
    riskLevel: 'HIGH',
    probability: 87,
    pressureDrop: '14.2 PSI',
    flowVariance: '+38% Loss',
    affected: 9200,
    lat: 22.7196,
    lng: 75.8577,
    xRatio: 0.44,
    yRatio: 0.52,
    summary: 'Underground trunk pipeline rupture detected near Mhow feeder junction.',
    technicalExplanation: 'Acoustic sensor telemetry and pressure transducer variance revealed an abrupt 14.2 PSI drop across Sector 4 feeder pipeline alongside anomalous mass balance flow divergence.',
    simplifiedExplanation: 'An underground water pipe has cracked. A large amount of clean drinking water is being wasted under the street.',
    actions: [
      'Trigger automated isolation valve #IV-09 to stop active flooding in Sector 4 underground conduit.',
      'Dispatch municipal hydro-repair vehicle unit #4 with pipe patch assembly.',
      'Reroute emergency municipal supply through bypass line B-2.',
      'Alert local public works command regarding road foundation wash-out risk.'
    ],
    timeline: [
      { time: 'NOW', risk: 'HIGH', status: '87% Anomaly Confirmed' },
      { time: '+6 Hours', risk: 'MEDIUM', status: 'Valve Isolation Pending' },
      { time: '+12 Hours', risk: 'LOW', status: 'Pipe Structural Patching' },
      { time: '+24 Hours', risk: 'NORMAL', status: 'Pressure Restoration' }
    ]
  },
  {
    id: 'nashik',
    name: 'Nashik Industrial Zone',
    type: 'leakage',
    riskLevel: 'MEDIUM',
    probability: 58,
    pressureDrop: '6.8 PSI',
    flowVariance: '+18% Loss',
    affected: 5100,
    lat: 19.9975,
    lng: 73.7898,
    xRatio: 0.38,
    yRatio: 0.58,
    summary: 'Subtle municipal supply pipe breach identified in industrial distribution main.',
    technicalExplanation: 'Transient pressure wave analysis detected micro-fracture acoustic pulses along a 200m underground cast-iron section. Estimated loss: ~1,200 L/hr.',
    simplifiedExplanation: 'There is a small leak in the water pipe under the industrial park. Repairing it soon will prevent a bigger breakdown.',
    actions: [
      'Schedule targeted acoustic correlator inspection for Sector B industrial corridor.',
      'Reduce feeder pressure by 12% during off-peak hours (11 PM - 4 AM) to curtail loss.',
      'Notify local factory management of scheduled maintenance window.'
    ],
    timeline: [
      { time: 'NOW', risk: 'MEDIUM', status: '58% Micro-Leak' },
      { time: '+6 Hours', risk: 'MEDIUM', status: 'Acoustic Mapping' },
      { time: '+12 Hours', risk: 'LOW', status: 'Pressure Throttled' },
      { time: '+24 Hours', risk: 'NORMAL', status: 'Maintenance Completed' }
    ]
  }
];

// Python Agent Backend Metadata Configuration
const AGENTS_METADATA = [
  {
    id: 'planner',
    name: 'Planner Agent',
    file: 'agents/planner_agent.py',
    icon: Brain,
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
    textColor: 'text-cyan-400',
    description: 'Deconstructs natural language query, identifies target geo-coords, risk categories, and orchestrates data retrieval directives.'
  },
  {
    id: 'data',
    name: 'Data Agent',
    file: 'agents/data_agent.py',
    icon: Database,
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-400',
    description: 'Aggregates real-time satellite imagery, acoustic pipe telemetry, gauge heights, and meteorological sensor APIs.'
  },
  {
    id: 'prediction',
    name: 'Prediction Agent',
    file: 'agents/prediction_agent.py',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-400',
    textColor: 'text-purple-400',
    description: 'Executes hydrological neural net models, calculates risk probability percentages, and detects acoustic anomalies.'
  },
  {
    id: 'action',
    name: 'Action Agent',
    file: 'agents/action_agent.py',
    icon: Zap,
    color: 'from-amber-500 to-emerald-500',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-400',
    description: 'Formulates prioritized emergency responses, community evacuation routes, valve control commands, and automated SMS alerts.'
  }
];

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'landing', 'dashboard', 'map', 'query', 'agents', 'alerts', 'simulation'
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS_DATA[0]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [waterMode, setWaterMode] = useState('flood'); // 'flood', 'drought', 'leakage'

  // Backend Integration State
  const [apiUrl, setApiUrl] = useState('http://localhost:8000/api/analyze');
  const [useLiveBackend, setUseLiveBackend] = useState(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);

  // AI Query & Execution state
  const [queryInput, setQueryInput] = useState('');
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);
  const [executionStep, setExecutionStep] = useState(0); // 0: Idle, 1: Planner, 2: Data, 3: Prediction, 4: Action, 5: Done
  const [executionLogs, setExecutionLogs] = useState([]);
  const [activeQueryResult, setActiveQueryResult] = useState(null);
  const [isSimplifiedText, setIsSimplifiedText] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Alert Filters
  const [alertFilter, setAlertFilter] = useState('all');

  // Interactive Simulation Sliders
  const [simValues, setSimValues] = useState({
    rainfall: 140, // mm/h
    riverLevel: 3.5, // meters above danger
    soilDeficit: 45, // percentage
    pipePressureDrop: 12.5, // PSI
  });

  const t = TRANSLATIONS[selectedLanguage];

  // Calculated simulation risk dynamically
  const simCalculatedRisk = useMemo(() => {
    if (waterMode === 'flood') {
      const calc = Math.min(99, Math.round((simValues.rainfall / 180) * 50 + (simValues.riverLevel / 5) * 50));
      return {
        prob: calc,
        level: calc > 75 ? 'CRITICAL' : calc > 45 ? 'HIGH' : 'MEDIUM',
        note: `Rainfall ${simValues.rainfall}mm/h with river crest at +${simValues.riverLevel.toFixed(1)}m.`
      };
    } else if (waterMode === 'drought') {
      const calc = Math.min(99, Math.round(simValues.soilDeficit * 1.6));
      return {
        prob: calc,
        level: calc > 70 ? 'CRITICAL' : calc > 40 ? 'MEDIUM' : 'LOW',
        note: `Precipitation deficit at -${simValues.soilDeficit}% below historical baseline.`
      };
    } else {
      const calc = Math.min(99, Math.round((simValues.pipePressureDrop / 20) * 100));
      return {
        prob: calc,
        level: calc > 70 ? 'HIGH' : calc > 35 ? 'MEDIUM' : 'LOW',
        note: `Feeder telemetry recording continuous ${simValues.pipePressureDrop.toFixed(1)} PSI drop.`
      };
    }
  }, [waterMode, simValues]);

  // Handle Query Submission (Connects to backend / simulated fallback)
const handleExecuteQuery = async (userQuery?: string) => {
  const q = userQuery || queryInput;
  if (!q.trim()) return;

  setQueryInput(q);
  setIsExecutingQuery(true);
  setExecutionStep(1);
  setExecutionLogs([`[00:00] User Query Received: "${q}"`]);
  setActiveQueryResult(null);

  // Dynamic pattern matching for mock engine (fallback)
  let matchedLoc = LOCATIONS_DATA[0]; // Assam default
  const lowerQ = q.toLowerCase();
  if (lowerQ.includes('mandya') || lowerQ.includes('drought') || lowerQ.includes('scarcity') || lowerQ.includes('farmer')) {
    matchedLoc = LOCATIONS_DATA[1];
  } else if (lowerQ.includes('indore') || lowerQ.includes('mhow') || lowerQ.includes('leak') || lowerQ.includes('pipe')) {
    matchedLoc = LOCATIONS_DATA[2];
  } else if (lowerQ.includes('nashik')) {
    matchedLoc = LOCATIONS_DATA[3];
  }

  // ========== LIVE BACKEND ==========
  if (useLiveBackend) {
    try {
      setExecutionLogs(prev => [...prev, `[00:01] Connecting to Python Orchestrator at ${apiUrl}`]);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          location: selectedLocation?.name || matchedLoc.name || "Assam",
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend HTTP error ${response.status}`);
      }

      const data = await response.json();

      setExecutionStep(5);
      setExecutionLogs(prev => [
        ...prev,
        ...(data.agent_log || []).map((log: string) => `→ ${log}`),
        `[SUCCESS] Real response received from orchestrator.py`,
      ]);

      setActiveQueryResult({
        location: data.location || matchedLoc.name,
        type: data.issue_type || matchedLoc.type,
        riskLevel: data.risk_level || matchedLoc.riskLevel,
        probability: data.risk_score || matchedLoc.probability,
        technicalExplanation: data.reason || matchedLoc.technicalExplanation,
        simplifiedExplanation: data.action || matchedLoc.simplifiedExplanation,
        actions: data.actions || (data.action ? [data.action] : matchedLoc.actions),
        summary: data.reason || matchedLoc.summary,
        agentLog: data.agent_log || [],
        rawJson: data,
      });

      setIsExecutingQuery(false);
      return;
    } catch (err: any) {
      setExecutionLogs(prev => [
        ...prev,
        `[ERROR] Live Backend Failed: ${err.message}. Falling back to Python Agent Simulator.`,
      ]);
    }
  }

  // ========== SIMULATION FALLBACK ==========
  setTimeout(() => {
    setExecutionStep(2);
    setExecutionLogs(prev => [
      ...prev,
      '🧠 [Planner Agent] Query decoded.',
      `   ├─ Target Geo-Entity: ${matchedLoc.name}`,
      `   └─ Hazard Focus: ${matchedLoc.type.toUpperCase()}`,
    ]);
  }, 1000);

  setTimeout(() => {
    setExecutionStep(3);
    setExecutionLogs(prev => [
      ...prev,
      '📡 [Data Agent] Ingesting real-time telemetry sensor stream...',
      `   ├─ Satellite Radar: Passed (${matchedLoc.type === 'flood' ? 'Heavy Precipitation' : 'Normal Radar'})`,
      `   └─ Pressure Sensors: ${matchedLoc.pressureDrop || matchedLoc.waterLevel || 'Operational'}`,
    ]);
  }, 2200);

  setTimeout(() => {
    setExecutionStep(4);
    setExecutionLogs(prev => [
      ...prev,
      '🔮 [Prediction Agent] Executing Hydrological Machine Learning Model...',
      `   └─ Risk Probability Index Calculated: ${matchedLoc.probability}% (${matchedLoc.riskLevel})`,
    ]);
  }, 3400);

  setTimeout(() => {
    setExecutionStep(5);
    setExecutionLogs(prev => [
      ...prev,
      '⚡ [Action Agent] Synthesizing emergency mitigation strategy...',
      '   └─ Dispatching advisories to local dashboard subscribers.',
    ]);

    setActiveQueryResult({
      location: matchedLoc.name,
      type: matchedLoc.type,
      riskLevel: matchedLoc.riskLevel,
      probability: matchedLoc.probability,
      technicalExplanation: matchedLoc.technicalExplanation,
      simplifiedExplanation: matchedLoc.simplifiedExplanation,
      actions: matchedLoc.actions,
      summary: matchedLoc.summary,
    });
    setIsExecutingQuery(false);
  }, 4600);
};
  // Text-To-Speech Synthesizer
  const handleToggleSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Background Neon Grid Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 z-0"></div>
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-0"></div>

      {}
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('landing')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">u
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Droplets className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>J
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">