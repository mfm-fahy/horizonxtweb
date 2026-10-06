export interface EvaluationCriterion {
  name: string;
  weight: string;
}

export interface ProblemStatement {
  id: string;
  code: string;
  title: string;
  category:
    | 'Mobility & EV'
    | 'Industry 4.0'
    | 'AI & Healthcare'
    | 'Robotics & Hardware'
    | 'CleanTech & Sustainability'
    | 'Architecture & Design';
  tagline: string;
  problem: string;
  challenge: string;
  challenge36h: string[];
  evaluationCriteria: EvaluationCriterion[];
  horizonPhilosophy: string;
  keyTesting: string[];
}

export const fontCategories = [
  'All Tracks',
  'Mobility & EV',
  'Industry 4.0',
  'AI & Healthcare',
  'Robotics & Hardware',
  'CleanTech & Sustainability',
  'Architecture & Design',
] as const;

export const problemStatements: ProblemStatement[] = [
  {
    id: 'ps1',
    code: 'PS1',
    title: 'Reimagining Thermal Comfort for Auto Rickshaws',
    category: 'Mobility & EV',
    tagline: 'Affordable, energy-efficient and renewable-assisted thermal comfort system for auto-rickshaw drivers and passengers.',
    problem: 'Auto-rickshaw drivers spend several hours a day working in hot and humid conditions, while passengers are exposed to high cabin temperatures during urban travel. Conventional air-conditioning can be impractical for auto-rickshaws because of its cost, energy consumption, additional weight, maintenance requirements and the open nature of the vehicle cabin. With the growing adoption of electric and low-emission mobility, there is a need for a fundamentally different approach to providing thermal comfort without consuming large amounts of energy.',
    challenge: 'How might we design an affordable, energy-efficient and renewable-energy-assisted thermal-comfort system for an auto-rickshaw that keeps the driver and passengers comfortable while consuming minimal additional energy and requiring minimal modification to the vehicle? Teams do not have to build a conventional air-conditioning system. They are encouraged to explore active, passive or hybrid approaches to achieve thermal comfort.',
    challenge36h: [
      'Measurable cooling or thermal-comfort improvement',
      'Low energy consumption during operation',
      'Meaningful utilisation of renewable energy (Solar PV, solar thermal, etc.)',
      'Practical energy storage/management where required',
      'Compact and lightweight vehicle integration',
      'A realistic retrofit approach for an existing auto-rickshaw',
      'Estimated manufacturing cost for a mass-market version'
    ],
    evaluationCriteria: [
      { name: 'Thermal Comfort Improvement', weight: '25%' },
      { name: 'Energy Efficiency', weight: '20%' },
      { name: 'Renewable Energy Integration', weight: '10%' },
      { name: 'Prototype Functionality & Reliability', weight: '15%' },
      { name: 'Affordability & Manufacturing Feasibility', weight: '10%' },
      { name: 'Vehicle Integration & Practicality', weight: '10%' },
      { name: 'Innovation & Scalability', weight: '10%' }
    ],
    horizonPhilosophy: "Don't cool the vehicle. Rethink how you cool the people.",
    keyTesting: [
      'Baseline condition vs. Prototype operating condition (Air temp, Humidity, Surface temp, Driver/Passenger zones)',
      'Energy consumed (Wh) relative to Thermal comfort improvement achieved',
      'Quantified renewable energy contribution',
      'Vehicle integration metrics (Size, Weight, Installation complexity, Power reqs)',
      'Indicative Bill of Materials (BOM) and estimated production cost'
    ]
  },
  {
    id: 'ps2',
    code: 'PS2',
    title: 'Rethinking Garment Cleaning',
    category: 'CleanTech & Sustainability',
    tagline: 'Waterless and eco-friendly garment cleaning solution eliminating heavy water dependence and chemical pollution.',
    problem: 'Conventional garment washing consumes significant quantities of water for cleaning and rinsing. As water scarcity and environmental concerns increase, simply improving washing-machine efficiency may not be sufficient. There is a need to fundamentally rethink how garments can be cleaned effectively using little or no water, without replacing water consumption with another environmental problem.',
    challenge: 'How might we design an affordable, energy-efficient garment-cleaning solution that uses little or no water, avoids harmful chemical cleaning agents, does not damage fabrics, and produces minimal environmental impact? Teams do not have to build a conventional washing machine. They are encouraged to explore completely new active, passive or hybrid approaches to garment cleaning.',
    challenge36h: [
      'Significant reduction or elimination of water consumption',
      'Effective removal of representative stains/contaminants',
      'No dependence on harmful chemical cleaning agents',
      'Minimal environmental waste, toxic residues, or pollution',
      'Minimal fabric damage, colour change, or fibre deterioration',
      'Reasonable energy consumption per kg of fabric',
      'Practical cleaning-cycle time for everyday use',
      'Potential for affordable scale-up to household or commercial use'
    ],
    evaluationCriteria: [
      { name: 'Water Reduction', weight: '25%' },
      { name: 'Cleaning Performance', weight: '25%' },
      { name: 'Environmental Safety', weight: '15%' },
      { name: 'Fabric Integrity', weight: '10%' },
      { name: 'Energy Efficiency', weight: '10%' },
      { name: 'Prototype Functionality & Practicality', weight: '10%' },
      { name: 'Cost & Scalability', weight: '5%' }
    ],
    horizonPhilosophy: "Don't make the washing machine use less water. Rethink why washing needs so much water / chemicals in the first place.",
    keyTesting: [
      'Water Consumption: Litres of water consumed / kg of fabric cleaned',
      'Cleaning Performance: Before vs. after visual comparison and image analysis',
      'Environmental Safety: Full disclosure and audit of consumables and emissions',
      'Fabric Integrity: Assessment for color change, shrinkage, and surface damage',
      'Energy & Cycle Time: Energy consumed (Wh/kg) & total cycle duration'
    ]
  },
  {
    id: 'ps3',
    code: 'PS3',
    title: 'Rethinking Fast Charging for Electric Buses',
    category: 'Mobility & EV',
    tagline: '100% EV bus battery charging in 15 minutes prioritizing thermal management, safety, and battery longevity.',
    problem: 'Electric buses require large battery packs and therefore face a significant challenge in reducing charging downtime. Conventional fast charging can require very high charging power and may increase battery temperature, accelerate degradation and reduce battery service life if not carefully managed. For public transport, where buses operate for long hours with limited downtime, there is a need for a fundamentally different approach to ultra-fast charging that prioritises battery safety and longevity.',
    challenge: 'How might we enable an electric bus battery to reach 100% charge in approximately 15 minutes while prioritising battery safety and minimising the impact of fast charging on battery life? The objective is not simply to deliver maximum charging power. Teams must rethink the charging architecture, energy delivery, thermal management, battery management or energy-storage approach to achieve rapid charging without compromising battery health and safety.',
    challenge36h: [
      'A pathway to achieving 100% charge in approximately 15 minutes',
      'Safe and controlled energy delivery architecture',
      'Effective thermal management system (liquid, PCM, direct cell cooling)',
      'Protection against over-current, over-voltage and excessive temperature',
      'Strategy to minimise degradation (lithium plating, thermal stress)',
      'Real-time monitoring of cell parameters and battery metrics',
      'Practical scalability to electric-bus battery systems and Digital Twin modeling'
    ],
    evaluationCriteria: [
      { name: 'Battery Safety', weight: '25%' },
      { name: 'Battery Life / Degradation Management', weight: '20%' },
      { name: 'Charging Speed', weight: '20%' },
      { name: 'Thermal Management', weight: '10%' },
      { name: 'Prototype Functionality & Validation', weight: '10%' },
      { name: 'Charging Efficiency', weight: '5%' },
      { name: 'Scalability to Electric Buses', weight: '5%' },
      { name: 'Innovation & Commercial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just charge the battery faster. Rethink how a battery should be charged.",
    keyTesting: [
      'Charging Speed: 0% to 100% on approved scaled platform in ~15 minutes',
      'Battery Safety: Real-time monitoring of cell/pack voltage, current, and thermal rise',
      'Degradation Strategy: Mitigation of lithium plating, cell imbalance, and stress',
      'Digital Twin Evaluation: Integration of physical battery data, SOC/SOH, and degradation models',
      'Bus Scale-Up Calculation: Scaling methodology, infrastructure power, and charging station footprint'
    ]
  },
  {
    id: 'ps4',
    code: 'PS4',
    title: 'Intelligent RF Power Combining for High-Volume RF Systems',
    category: 'Robotics & Hardware',
    tagline: 'Robust RF power combining (300 MHz–2.0 GHz, 50W+) with automated design and optimization software.',
    problem: 'RF systems operating across 300 MHz–2.0 GHz often require multiple power-amplifier stages to be combined to achieve higher output power. Combining multiple RF power stages—particularly at 50 W and above per stage—can introduce significant engineering challenges, including power loss, impedance mismatch, thermal stress, and component variations. Solutions that perform well in a laboratory prototype may become difficult to reproduce consistently when manufactured in large production volumes.',
    challenge: 'How might we develop a robust and cost-effective RF power-combining solution for combining multiple 50 W+ RF stages across the 300 MHz–2.0 GHz frequency range, together with a software tool that can rapidly generate, optimise and validate practical designs suitable for high-volume manufacturing?',
    challenge36h: [
      'Working RF power combiner prototype handling 50W+ stages',
      'Selection and justification of operating sub-band in 300 MHz – 2.0 GHz',
      'Low insertion loss, good impedance matching, and high isolation',
      'Software tool that generates combiner topology, component values, and performance',
      'Manufacturing-oriented design considering tolerances, cost, and thermal dissipation',
      'Demonstration of at least two automated design generation cases using the tool'
    ],
    evaluationCriteria: [
      { name: 'RF Performance & Combining Efficiency', weight: '20%' },
      { name: 'Prototype Functionality & Validation', weight: '15%' },
      { name: 'Design Software Tool', weight: '20%' },
      { name: 'Repeatability & Robustness', weight: '15%' },
      { name: 'Power Handling & Thermal Performance', weight: '10%' },
      { name: 'Manufacturability & Cost', weight: '10%' },
      { name: 'Existing-Technology Benchmarking', weight: '5%' },
      { name: 'Innovation & Scalability', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just build an RF combiner. Build a system that can design the next hundred RF combiners.",
    keyTesting: [
      'RF Performance: Insertion loss, Return loss, VSWR, Isolation, Frequency response',
      'Combining Efficiency: Ratio of total RF power available vs delivered combined output',
      'Thermal & Power Handling: Temperature rise, distribution, and safe limits during operation',
      'Software vs. Measured Performance: Quantified accuracy of simulation vs physical prototype',
      'Repeatability & Manufacturing: BOM, production cost, and high-volume assembly repeatability'
    ]
  },
  {
    id: 'ps5',
    code: 'PS5',
    title: 'Holistic Well-Being Through Multidisciplinary Engineering',
    category: 'AI & Healthcare',
    tagline: 'Integrated personal health record, wearable data fusion, AI report parsing, and biohack recommendations.',
    problem: 'People generate health information throughout their lives—from hospital records and lab reports to wearable data, sleep, and nutrition. However, this information is fragmented across hospitals, devices, and personal records. At the same time, physical health, mental well-being, and preventive care are closely interconnected but addressed separately.',
    challenge: 'How might we engineer a holistic personal well-being platform that securely brings together a user\'s health records, test reports, lifestyle and wearable data, enables access to healthcare professionals, and creates personalised evidence-informed well-being interventions—while protecting privacy and avoiding inappropriate medical diagnosis or treatment?',
    challenge36h: [
      'Secure upload and timeline organization of medical records and reports',
      'Data integration from at least two sources (health reports + wearables/lifestyle)',
      'AI-assisted report extraction translating jargon into simple explanations',
      'Simulated doctor tele-consultation workflow and record sharing',
      'Generation of evidence-informed personalized lifestyle biohacks',
      'Strict privacy, security, user consent, and clear medical vs. wellness boundary'
    ],
    evaluationCriteria: [
      { name: 'Personal Health Data Handling', weight: '15%' },
      { name: 'Personalised Well-Being', weight: '15%' },
      { name: 'Privacy, Security & Responsible AI', weight: '15%' },
      { name: 'Physical & Mental Well-Being Integration', weight: '10%' },
      { name: 'AI/Health Information Interpretation', weight: '10%' },
      { name: 'Data Integration', weight: '10%' },
      { name: 'Tele-Consultation Workflow', weight: '10%' },
      { name: 'Prototype Functionality', weight: '5%' },
      { name: 'Scalability & Commercial Potential', weight: '10%' }
    ],
    horizonPhilosophy: "Don't build another health app. Build a personal well-being ecosystem that puts the individual at the centre.",
    keyTesting: [
      'Health Data Handling: Structuring reports while preserving original documents',
      'Data Integration: Fusion of lab reports + wearable/environmental streams',
      'AI Interpretation: Simplifying complex terminology without diagnostic hallucination',
      'Personalization Audit: Distinct custom interventions generated for different user profiles',
      'Privacy Architecture: User consent controls, encryption, and data access minimization'
    ]
  },
  {
    id: 'ps6',
    code: 'PS6',
    title: 'Universal Connected Vehicle',
    category: 'Mobility & EV',
    tagline: 'Plug-and-play retrofit system enabling V2V and V2X collective intelligence beyond line of sight.',
    problem: 'Most vehicles operate as independent systems with limited awareness beyond line-of-sight sensors. A vehicle approaching a blind curve does not know that another vehicle has stopped 500m ahead. Potholes, accidents, flooding, and emergency vehicles are often detected too late for comfortable reaction times.',
    challenge: 'How can we give existing vehicles the ability to communicate, understand and respond to information beyond what their own sensors can see? Design and prototype a retrofit system enabling vehicles to SENSE → UNDERSTAND → COMMUNICATE → RECEIVE → PREDICT → ALERT.',
    challenge36h: [
      'Retrofit plug-and-play architecture for existing vehicles',
      'Hazard/event detection (sudden braking, pothole, ambulance, obstacle)',
      'V2V or V2X communication pipeline (Cellular, Wi-Fi Direct, LoRa, Mesh)',
      'Edge intelligence to filter relevance and detect malicious/duplicate messages',
      'Driver alert interface with clear actionable early warnings'
    ],
    evaluationCriteria: [
      { name: 'Retrofit & Plug-and-Play Capability', weight: '20%' },
      { name: 'Connectivity & Communication Architecture', weight: '20%' },
      { name: 'Edge Intelligence & Relevance Filtering', weight: '15%' },
      { name: 'Safety & Early Warning Utility', weight: '15%' },
      { name: 'Latency & Reliability under Imperfect Networks', weight: '15%' },
      { name: 'Scalability & Commercialization Strategy', weight: '15%' }
    ],
    horizonPhilosophy: 'Can you make an ordinary vehicle behave like a connected vehicle — without replacing the vehicle?',
    keyTesting: [
      'Demonstration of connected vs. unconnected vehicle reaction times',
      'Inter-entity communication latency and packet delivery under obstruction',
      'Multi-vehicle consensus and trust score calculation for reported hazards',
      'Offline/mesh fallback testing when cloud internet is unavailable',
      'Ease of installation on arbitrary target vehicle models'
    ]
  },
  {
    id: 'ps7',
    code: 'PS7',
    title: 'Machine That Predicts Its Own Failure',
    category: 'Industry 4.0',
    tagline: 'Physical-AI system detecting early multi-sensor machine degradation long before threshold alarms.',
    problem: 'Industrial rotating machinery (motors, pumps, fans, compressors) failure causes severe production downtime. Standard monitoring relies on fixed threshold alarms (vibration > limit), which trigger after physical degradation is already far advanced.',
    challenge: 'Can you build a machine that knows it is getting sick before it knows it is going to fail? Develop a Physical-AI system that continuously ingests multi-sensor data (vibration, current, temperature, RPM) and progresses through SENSE → UNDERSTAND → DETECT → DIAGNOSE → PREDICT → RECOMMEND.',
    challenge36h: [
      'Multi-sensor continuous ingestion (Vibration, Current, Temp, RPM)',
      'Baseline normal operating behavior modeling across different loads',
      'Early degradation detection before fixed threshold alarms trigger',
      'Probable cause identification (bearing, misalignment, cavitation, looseness)',
      'Dynamic Machine Health Index generation',
      'Remaining health/failure risk prediction and actionable maintenance recommendation'
    ],
    evaluationCriteria: [
      { name: 'Anomaly Detection & Early Warning', weight: '25%' },
      { name: 'Machine Health Index Accuracy', weight: '20%' },
      { name: 'Fault Diagnosis & Multi-Sensor Reasoning', weight: '20%' },
      { name: 'Explainability & Reasoning Transparency', weight: '15%' },
      { name: 'Maintenance Recommendation Quality', weight: '10%' },
      { name: 'Edge Processing & Prototype Functionality', weight: '10%' }
    ],
    horizonPhilosophy: 'Can you build a machine that predicts its own failure — before a conventional alarm knows there is a problem?',
    keyTesting: [
      'Controlled physical/simulated fault injection (bearing wear, imbalance)',
      'Comparison of Physical-AI warning timestamp vs. threshold alarm timestamp',
      'Multi-sensor signature correlation verification',
      'Health index trajectory tracking during progressive fault degradation',
      'Explainable root-cause output verification for maintenance engineers'
    ]
  },
  {
    id: 'ps8',
    code: 'PS8',
    title: 'Self-Healing Industrial Data Pipeline',
    category: 'Industry 4.0',
    tagline: 'Intelligent data pipeline detecting, diagnosing, reconstructing industrial telemetry with audit trails.',
    problem: 'Real-world industrial data contains missing values, frozen sensors, communication gaps, spikes, drift, and corrupted signals. Traditional cleaning systems use blunt rules that modify data without transparency or confidence awareness, risking dangerous decisions.',
    challenge: 'How might we build an intelligent industrial data pipeline that automatically detects anomalies and data-quality problems, reconstructs or corrects data where technically possible, and maintains a transparent record of what was measured, estimated, corrected or left unresolved?',
    challenge36h: [
      'Automatic detection of at least 3 data quality issues (spikes, drift, freeze, missing)',
      'Classification and diagnosis of sensor fault types',
      'Data reconstruction using interpolation, sensor correlation, or ML models',
      'Confidence score (0-100%) assigned to every modified telemetry value',
      'Strict preservation of "Measured vs. Estimated vs. Corrected vs. Unresolved" status',
      'Machine-readable audit trail explaining every pipeline transformation'
    ],
    evaluationCriteria: [
      { name: 'Data-Quality Detection Accuracy', weight: '20%' },
      { name: 'Reconstruction Accuracy (vs. Ground Truth)', weight: '20%' },
      { name: 'Confidence Calibration & Score Reliability', weight: '15%' },
      { name: 'Traceability & Machine-Readable Audit Trail', weight: '15%' },
      { name: 'Industrial Robustness under Multi-Sensor Failures', weight: '10%' },
      { name: 'Processing Performance & Throughput', weight: '5%' },
      { name: 'Explainability', weight: '5%' },
      { name: 'Scalability & Commercial Potential', weight: '10%' }
    ],
    horizonPhilosophy: "Don't just clean industrial data. Make the data explain what happened to it.",
    keyTesting: [
      'Blind injection benchmark test with unannounced synthetic sensor failures',
      'Ground-truth reconstruction error evaluation (MAE/RMSE)',
      'Confidence calibration test (low error on high confidence points)',
      'Audit trail drill-down inspection for individual reconstructed data points',
      'System ability to output "Unresolved" when insufficient evidence exists'
    ]
  },
  {
    id: 'ps9',
    code: 'PS9',
    title: 'Universal OT Data Connector',
    category: 'Industry 4.0',
    tagline: 'Plug-and-play OT data layer with auto protocol discovery, tag mapping, validation, and dashboards.',
    problem: 'Factories operate PLCs, machines, and sensors from different vendors across protocols like MQTT, OPC-UA, Modbus TCP, and REST. Integrating a new machine requires weeks of manual tag mapping, unit conversions, and DB configuration.',
    challenge: 'How might we build a universal OT data connector where a user can define or connect a machine and its communication protocol, and the system automatically discovers available data, maps machine tags to a standard data model, validates the data and makes it immediately available for time-series analytics and visualisation?',
    challenge36h: [
      'Support for at least TWO industrial protocols (e.g. MQTT, OPC-UA, Modbus TCP)',
      'Automatic tag and metadata discovery from connected machine sources',
      'Automatic tag mapping into standardized internal asset parameters',
      'Real-time data validation (range, timestamp, type, communication check)',
      'Time-series storage integration with quality flags',
      'Automatic dashboard generation for discovered tags',
      'Fast onboarding demonstration when connecting a brand-new machine'
    ],
    evaluationCriteria: [
      { name: 'Protocol Connectivity', weight: '15%' },
      { name: 'Automatic Tag/Metadata Discovery', weight: '15%' },
      { name: 'Tag Mapping & Normalisation', weight: '15%' },
      { name: 'End-to-End Pipeline Functionality', weight: '15%' },
      { name: 'Data Validation & Quality Flagging', weight: '10%' },
      { name: 'Plug-and-Play Onboarding Speed', weight: '10%' },
      { name: 'Scalability & Architecture', weight: '5%' },
      { name: 'Reliability & Reconnection Recovery', weight: '5%' },
      { name: 'Innovation & Commercial Potential', weight: '10%' }
    ],
    horizonPhilosophy: 'Don\'t build another industrial gateway. Build the "plug-and-play layer" between machines and industrial intelligence.',
    keyTesting: [
      'Simulated PLC connect-to-dashboard workflow speed',
      'Automatic semantic inference of tags (e.g. Motor_Temp -> Temperature)',
      'Invalid data injection handling and tag validation resilience',
      'Machine disconnect and auto-reconnection state preservation',
      'Zero-code setup verification for secondary machine onboarding'
    ]
  },
  {
    id: 'ps10',
    code: 'PS10',
    title: 'Digital Product Passport for Manufacturing',
    category: 'Industry 4.0',
    tagline: 'Tamper-evident manufacturing genealogy linking raw materials to finished products for instant recall tracing.',
    problem: 'Manufacturing data is scattered across ERP, MES, SCADA, quality logs, and logistics systems. When a component or raw material defect is discovered post-shipment, finding affected products takes weeks of tedious manual records matching.',
    challenge: 'How might we create a Digital Product Passport that maintains a trustworthy, tamper-evident and searchable digital identity for a component throughout its manufacturing lifecycle—from raw material to finished product and shipment—and can identify every potentially affected product within seconds when a defect or process deviation is discovered?',
    challenge36h: [
      'Unique digital identity assignment (QR, RFID, NFC, Serial)',
      'Genealogy mapping: Material Batch -> Component -> Assembly -> Product -> Shipment',
      'Event-based record capture (machined, inspected, reworked, assembled, shipped)',
      'Forward & backward traceability (Material to Product and Product to Material)',
      'Sub-second impact analysis query when a defect scenario is introduced',
      'Tamper-evident record integrity and chronological audit history'
    ],
    evaluationCriteria: [
      { name: 'Traceability Accuracy', weight: '20%' },
      { name: 'Impact Analysis Query Speed', weight: '15%' },
      { name: 'Manufacturing Genealogy Modeling', weight: '15%' },
      { name: 'Digital Passport Completeness', weight: '10%' },
      { name: 'Data Integrity & Auditability', weight: '10%' },
      { name: 'Real-Time Event Update Capability', weight: '10%' },
      { name: 'Scalability & Query Performance', weight: '10%' },
      { name: 'Usability & Commercial Potential', weight: '10%' }
    ],
    horizonPhilosophy: "Don't just track the product. Build its complete digital genealogy.",
    keyTesting: [
      'Live recall simulation: Identify all products affected by defective Batch X',
      'Query latency benchmark (Target: seconds, not hours)',
      'Verification of true positive affected items vs. missed items',
      'Full bidirectional drill-down (Product P-10482 -> Material Batch MB-0921)',
      'Rework and inspection history inclusion in passport timeline'
    ]
  },
  {
    id: 'ps11',
    code: 'PS11',
    title: 'Factory Copilot: "Ask Your Factory"',
    category: 'Industry 4.0',
    tagline: 'Evidence-grounded engineering Copilot reasoning over heterogeneous factory data and manuals.',
    problem: 'Engineers spend hours cross-referencing sensor streams, SCADA alarms, maintenance logs, quality rejections, and PDFs to figure out why production dropped or a machine broke down.',
    challenge: 'Develop a Factory Copilot that allows a production or maintenance engineer to interact with the factory using natural language. The system should understand the question, identify relevant factory data sources, correlate information across them, reason over evidence, and provide an answer traceable to actual factory records.',
    challenge36h: [
      'Natural language query parsing into structured data retrieval tasks',
      'Multi-source retrieval across sensor streams, alarms, maintenance logs, and SOPs',
      'Cross-source correlation (connecting vibration spikes to alarm events & maintenance)',
      'Evidence-grounded answers with explicit clickable citations and time ranges',
      'Handling uncertainty with explicit "Insufficient Evidence" declarations when data is missing'
    ],
    evaluationCriteria: [
      { name: 'Evidence-Grounded Accuracy', weight: '25%' },
      { name: 'Cross-Source Correlation & Reasoning', weight: '20%' },
      { name: 'Evidence Traceability & Explainability', weight: '15%' },
      { name: 'Natural-Language Interaction Quality', weight: '10%' },
      { name: 'Industrial Data Understanding', weight: '10%' },
      { name: 'Handling Uncertainty / Avoiding Hallucination', weight: '10%' },
      { name: 'Prototype Usability & Response Speed', weight: '5%' },
      { name: 'Scalability & Commercial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't build a chatbot that talks about the factory. Build an engineering copilot that can prove what happened inside the factory.",
    keyTesting: [
      'Unseen engineering problem query benchmark evaluation',
      'Evidence citation verification (drill-down to exact raw timestamps & log IDs)',
      'Hallucination prevention check on queries with incomplete factory telemetry',
      'Multi-step reasoning validation (Root cause synthesis from 3+ sources)',
      'SOP & Manual recommendation matching for identified breakdown events'
    ]
  },
  {
    id: 'ps12',
    code: 'PS12',
    title: 'The Factory Has Gone Blind',
    category: 'Industry 4.0',
    tagline: 'Virtual sensor estimation using correlated signals with dynamic uncertainty and trust alarms.',
    problem: 'When a critical factory physical sensor (temperature, pressure, flow) fails, operators must run blind or stop production, even though surrounding correlated process signals still contain rich state information.',
    challenge: 'Develop a Virtual Sensor that can estimate the value of a failed physical sensor using available information from the factory. The system should continuously generate Estimated Value + Uncertainty/Confidence + Trust Alarm, knowing when process conditions render predictions unreliable.',
    challenge36h: [
      'Automatic sensor failure detection (missing data, freeze, out-of-range)',
      'Virtual sensor estimation using correlated physical signals',
      'Dynamic uncertainty and prediction confidence calculation',
      'Continuous monitoring of virtual sensor trust status (Trustworthy / Warning / Do Not Trust)',
      'Trust alarm generation when process moves outside validated operating envelope',
      'Ground-truth error metric validation (MAE / RMSE metrics)'
    ],
    evaluationCriteria: [
      { name: 'Prediction Accuracy (MAE/RMSE)', weight: '20%' },
      { name: 'Uncertainty / Confidence Quality', weight: '20%' },
      { name: 'Detection of Unreliable Predictions', weight: '15%' },
      { name: 'Robustness to Operating Condition Changes', weight: '15%' },
      { name: 'Sensor-Failure Detection & Switching', weight: '10%' },
      { name: 'Response / Real-Time Performance', weight: '5%' },
      { name: 'Explainability & Engineering Interpretation', weight: '5%' },
      { name: 'Prototype Quality & Usability', weight: '5%' },
      { name: 'Scalability / Industrial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just predict the missing number. Know when you can trust the prediction.",
    keyTesting: [
      'Hidden sensor ground-truth accuracy test under normal operation',
      'Unannounced physical sensor disconnect switching speed',
      'Process disturbance test: Verify trust alarm fires when model becomes invalid',
      'Confidence calibration evaluation (uncertainty bound vs. actual error)',
      'Multi-variable regression / ML estimation explainability'
    ]
  },
  {
    id: 'ps13',
    code: 'PS13',
    title: 'Self-Tuning Industrial Motor',
    category: 'Industry 4.0',
    tagline: 'Adaptive closed-loop motor controller auto-retuning parameters under load and plant changes.',
    problem: 'Fixed PID controllers for industrial motors degrade when load, friction, inertia, or operating points change, causing settling delay, overshoot, oscillation, and wasted energy.',
    challenge: 'Develop a Self-Tuning Industrial Motor Controller capable of detecting when control performance has deteriorated and automatically determining improved controller parameters. The system should continuously observe reference, motor response, error, and control effort to Detect → Diagnose → Retune → Validate → Apply parameters safely.',
    challenge36h: [
      'Closed-loop motor control setup (Reference -> Controller -> Motor -> Sensor)',
      'Continuous monitoring of performance metrics (settling time, overshoot, steady-state error)',
      'Detection of true performance deterioration vs. temporary disturbances',
      'Automatic retuning algorithm generating new control parameters (PID / adaptive)',
      'Closed-loop validation proving performance recovery after retuning',
      'Safety limits and stability protection preventing runaway parameter changes'
    ],
    evaluationCriteria: [
      { name: 'Overall Control Performance', weight: '20%' },
      { name: 'Adaptation to Changing Operating Conditions', weight: '20%' },
      { name: 'Stability & Robustness Guarantee', weight: '15%' },
      { name: 'Disturbance Rejection Capability', weight: '10%' },
      { name: 'Detection of Performance Deterioration', weight: '10%' },
      { name: 'Auto-Tuning & Parameter Optimization', weight: '10%' },
      { name: 'Real-Time Implementation', weight: '5%' },
      { name: 'Engineering Explainability', weight: '5%' },
      { name: 'Innovation & Industrial Scalability', weight: '5%' }
    ],
    horizonPhilosophy: "Don't tune the controller once. Build a controller that understands when it needs to tune itself.",
    keyTesting: [
      'Step-response verification: Baseline vs. post-load change vs. post-retune',
      'Disturbance rejection test (Short transient vs. persistent plant load change)',
      'Over-shoot and settling time measurement comparison',
      'Actuator control effort efficiency audit (no excessive chatter/wear)',
      'Safety limiter boundary test under extreme inertia variations'
    ]
  },
  {
    id: 'ps14',
    code: 'PS14',
    title: 'Production + Energy Challenge',
    category: 'CleanTech & Sustainability',
    tagline: 'Intelligent factory schedule & machine optimizer reducing energy cost without reducing target output.',
    problem: 'Factories waste energy during idle times, unoptimized sequencing, simultaneous peak loads, and standby states. Shutting down machines to save power drops output, which is unacceptable.',
    challenge: 'Develop an Intelligent Factory Energy Optimization System that determines how production should be scheduled and machines operated to reduce energy consumption and energy cost while achieving the required production target.',
    challenge36h: [
      'Factory operational model satisfying production target constraints',
      'Baseline energy, peak demand, and cost calculation for current schedule',
      'Optimization engine for machine sequencing, idle reduction, and peak staggering',
      'Incorporation of electricity tariff pricing and peak-demand penalty rules',
      'Before vs. After quantitative proof: Output >= Target, Energy & Cost reduced',
      'Dynamic re-optimization under shift disruptions or machine breakdown scenarios'
    ],
    evaluationCriteria: [
      { name: 'Production Target Achievement (Hard Constraint)', weight: '20%' },
      { name: 'Energy Consumption Reduction', weight: '20%' },
      { name: 'Energy-Cost Optimization (Tariff Aware)', weight: '15%' },
      { name: 'Peak-Demand Reduction', weight: '10%' },
      { name: 'Optimization Quality & Algorithm Rigor', weight: '15%' },
      { name: 'Operational Feasibility & Constraints', weight: '10%' },
      { name: 'Real-Time / Scenario Responsiveness', weight: '5%' },
      { name: 'Prototype Usability & Explainability', weight: '5%' }
    ],
    horizonPhilosophy: "Don't monitor energy consumption. Make the factory choose how to consume energy intelligently.",
    keyTesting: [
      'Optimization run on standard test dataset meeting 100% production target',
      'Peak demand (kW) staggering verification during expensive tariff windows',
      'Idle power shutdown optimization vs. machine restart energy trade-off',
      'Scenario stress testing: Sudden electricity tariff shift or machine outage',
      'Clear operational breakdown schedule generated for production managers'
    ]
  },
  {
    id: 'ps15',
    code: 'PS15',
    title: 'Intelligent Autonomous Material Movement & Delivery System',
    category: 'Robotics & Hardware',
    tagline: 'Dynamic autonomous mobile robot (AMR) prioritizing tasks, avoiding obstacles, and managing battery.',
    problem: 'Material handling in factories, warehouses, and hospitals relies on manual carts or rigid fixed-path AGVs that stall when obstacles, layout changes, or high-priority requests occur.',
    challenge: 'Develop an Intelligent Autonomous Material Movement & Delivery System capable of receiving transport requests and autonomously completing them in a dynamic environment (Receive Task → Prioritize → Plan → Navigate → Avoid → Deliver → Confirm → Reassign).',
    challenge36h: [
      'Autonomous navigation between defined facility pickup and delivery nodes',
      'Intelligent task prioritization based on item urgency, deadline, and position',
      'Dynamic path planning and obstacle avoidance (people, blocked hallways)',
      'Pickup and delivery verification (QR, RFID, vision, or digital confirmation)',
      'Battery-aware decision making (balancing charge cycles with urgent deliveries)',
      'Real-time fleet telemetry dashboard showing position, status, and tasks'
    ],
    evaluationCriteria: [
      { name: 'Autonomous Navigation & Task Completion', weight: '20%' },
      { name: 'Dynamic Obstacle Handling & Safety', weight: '15%' },
      { name: 'Intelligent Task Allocation & Prioritization', weight: '15%' },
      { name: 'Dynamic Path Planning / Replanning', weight: '10%' },
      { name: 'Pickup & Delivery Accuracy', weight: '10%' },
      { name: 'Battery / Energy Management Intelligence', weight: '10%' },
      { name: 'Real-Time Monitoring & UI', weight: '5%' },
      { name: 'System Integration / API Capability', weight: '5%' },
      { name: 'Scalability & Startup Potential', weight: '10%' }
    ],
    horizonPhilosophy: "Don't build a robot that follows routes. Build an autonomous logistics system that understands what needs to move, where it needs to go, and how to get it there safely.",
    keyTesting: [
      'Multi-task priority queue resolution test',
      'Live dynamic obstacle insertion during navigation execution',
      'Blocked route detour re-planning speed',
      'Low-battery threshold intervention vs. high-priority delivery decision',
      'End-to-end task confirmation logging and API dispatch integration'
    ]
  },
  {
    id: 'ps16',
    code: 'PS16',
    title: 'AI-Based Predictive Vehicle Health & Failure Warning System',
    category: 'Mobility & EV',
    tagline: 'Continuous vehicle telematics & BMS analysis predicting component degradation before failure.',
    problem: 'Fixed vehicle service intervals ignore driving behavior, load, temperature, and usage intensity. Sensors and ECUs log data, but drivers are only warned after a component fails.',
    challenge: 'Develop an AI-Based Vehicle Health & Failure Warning System that continuously analyses vehicle data (powertrain, battery BMS, dynamics, vibrations) to assess component health, predict failure risks, and provide actionable maintenance recommendations.',
    challenge36h: [
      'Multi-parameter telematic data ingestion (motor, BMS, current, speed, temp)',
      'Contextual baseline understanding of normal vehicle operating signatures',
      'Early anomaly detection under comparable load/speed conditions',
      'Component-level health estimation (Battery, Motor, Cooling system)',
      'Failure risk prediction horizon with risk levels (Normal, Monitor, Inspect, Urgent)',
      'Actionable maintenance recommendations with supporting sensor evidence'
    ],
    evaluationCriteria: [
      { name: 'Early Failure/Degradation Detection', weight: '20%' },
      { name: 'Prediction Accuracy & Horizon', weight: '15%' },
      { name: 'Component-Level Diagnosis', weight: '15%' },
      { name: 'False-Alarm Control & Context Awareness', weight: '10%' },
      { name: 'Health Estimation Quality', weight: '10%' },
      { name: 'Severity & Urgency Assessment', weight: '10%' },
      { name: 'Evidence / Explainability', weight: '5%' },
      { name: 'Maintenance Recommendation Quality', weight: '5%' },
      { name: 'Real-Time Dashboard & Fleet Scalability', weight: '10%' }
    ],
    horizonPhilosophy: "Don't wait for the vehicle to fail. Teach it to recognize how it is gradually becoming unhealthy.",
    keyTesting: [
      'Pre-failure degradation detection timestamp on historical vehicle logs',
      'False positive rejection under high acceleration / heavy load spikes',
      'Component health score curve tracking over simulated driving cycles',
      'Actionable inspection guidance output verification',
      'Multi-sensor evidence validation for flagged cooling/battery anomalies'
    ]
  },
  {
    id: 'ps17',
    code: 'PS17',
    title: 'AI-Based Early Disease Screening & Risk Assessment System',
    category: 'AI & Healthcare',
    tagline: 'Interpretable AI screening system identifying high-risk clinical cases for early doctor evaluation.',
    problem: 'Healthcare systems face long specialist queues, high screening costs, and geographic barriers. Patients present concerning early signs that go unflagged until diseases progress.',
    challenge: 'Develop an AI-assisted early disease screening and risk assessment system for one clearly defined disease or health condition (e.g., diabetic retinopathy, skin lesions, TB, cardiac risk). Collect → Analyse → Assess Risk → Explain → Escalate for Clinical Evaluation.',
    challenge36h: [
      'Single focused medical condition definition with validated dataset',
      'Multimodal or domain-specific AI model for risk assessment',
      'Calibrated risk score and explicit screening recommendation (Low vs. Escalate)',
      'Explainability integration (visual saliency maps, contributing clinical factors)',
      'Clinician decision-support interface displaying evidence and confidence',
      'Uncertainty handling declaring "Insufficient Data" for low-quality inputs'
    ],
    evaluationCriteria: [
      { name: 'Screening Performance & Clinical Utility', weight: '20%' },
      { name: 'Sensitivity & False-Negative Handling', weight: '15%' },
      { name: 'Specificity / False-Positive Control', weight: '10%' },
      { name: 'Risk Calibration & Uncertainty Output', weight: '10%' },
      { name: 'Explainability & Interpretability', weight: '15%' },
      { name: 'Data Quality Handling & Robustness', weight: '10%' },
      { name: 'Healthcare Professional Workflow Design', weight: '10%' },
      { name: 'Privacy, Security & Responsible AI', weight: '5%' },
      { name: 'Prototype Quality & Scalability', weight: '5%' }
    ],
    horizonPhilosophy: "Don't build an AI that diagnoses people. Build an AI that helps healthcare professionals find who needs attention sooner.",
    keyTesting: [
      'Held-out unseen patient test case screening evaluation',
      'Sensitivity / recall maximization verification on positive cases',
      'Explainability audit: Saliency map & feature importance review by judges',
      'Low quality / corrupted image rejection ("Insufficient info" response)',
      'Clinical disclaimer and privacy compliance verification'
    ]
  },
  {
    id: 'ps18',
    code: 'PS18',
    title: 'AI-Based Food Freshness & Spoilage Detection System',
    category: 'CleanTech & Sustainability',
    tagline: 'Sensor fusion & vision AI monitoring storage history to predict food spoilage before waste.',
    problem: 'Food waste occurs across supply chains because static expiry dates ignore actual storage conditions (temperature fluctuations, humidity, gas release, microbial activity).',
    challenge: 'Develop an AI-based Food Freshness & Spoilage Detection System for one clearly defined food category. Combine computer vision, environmental sensors, and storage history to estimate current freshness and predict remaining quality duration.',
    challenge36h: [
      'Focus on one food product category (fruits, dairy, meat, seafood, packaging)',
      'Sensor fusion combining at least two inputs (Vision, Temp/Humidity, Gas)',
      'Continuous monitoring and logging of environmental storage history',
      'Freshness status score generation (Fresh, Quality Declining, Spoilage Risk)',
      'Early deterioration alert before visual rotting occurs',
      'Dashboard displaying spoilage risk trends and actionable storage advice'
    ],
    evaluationCriteria: [
      { name: 'Freshness / Spoilage Detection Accuracy', weight: '20%' },
      { name: 'Early Deterioration Detection Capability', weight: '20%' },
      { name: 'Remaining Quality / Time Estimation', weight: '15%' },
      { name: 'Sensor Fusion & Multi-Signal Intelligence', weight: '10%' },
      { name: 'Storage-Condition History Tracking', weight: '10%' },
      { name: 'False-Alarm Control & Reliability', weight: '10%' },
      { name: 'Prototype Quality & Real-Time Operation', weight: '5%' },
      { name: 'Scalability / Food-Tech Commercial Potential', weight: '10%' }
    ],
    horizonPhilosophy: "Don't just read the expiry date. Understand the food's actual journey and predict what happens next.",
    keyTesting: [
      'Sample A (Recommended Storage) vs Sample B (Temperature Excursion) test',
      'Pre-spoilage precursor signal detection (gas/temp rise before visual rot)',
      'Remaining shelf-life prediction time window accuracy',
      'Sensor outage handling (Graceful degradation of confidence score)',
      'Alert trigger verification during cold-chain failure simulation'
    ]
  },
  {
    id: 'ps19',
    code: 'PS19',
    title: 'AI-Based Automated Product Defect Detection System',
    category: 'Industry 4.0',
    tagline: 'Computer vision pipeline classifying and locating manufacturing defects under line variations.',
    problem: 'Manual quality inspection is slow, subjective, and inconsistent. Automated vision systems often fail when product orientation, lighting, scale, or surface appearance vary on real factory lines.',
    challenge: 'How might we develop an AI-based automated visual inspection system capable of detecting, locating and classifying defects in a selected manufactured product under realistic production variations (Product → Image Acquisition → CV Analysis → Defect Detection → Location → Quality Decision → Quality Record)?',
    challenge36h: [
      'Product focus with defined good standards vs. 3+ defect categories',
      'Working image acquisition setup (camera or realistic dataset stream)',
      'Defect location output (bounding boxes, segmentation masks, or heatmaps)',
      'Robustness demonstration against 3+ variations (lighting, angle, position)',
      'Real-time processing latency suitable for high-speed inspection lines',
      'Quality record logging (Pass/Fail/Review, timestamp, defect evidence)'
    ],
    evaluationCriteria: [
      { name: 'Defect Detection Performance', weight: '20%' },
      { name: 'Robustness to Manufacturing Variation', weight: '15%' },
      { name: 'False Positive / False Negative Control', weight: '15%' },
      { name: 'Defect Classification & Localisation Accuracy', weight: '10%' },
      { name: 'Real-Time Inspection Speed', weight: '10%' },
      { name: 'Prototype Integration & Image Pipeline', weight: '10%' },
      { name: 'Explainability & Inspection Evidence', weight: '5%' },
      { name: 'Quality Data & Traceability', weight: '5%' },
      { name: 'Scalability & Industrial Deployment Potential', weight: '10%' }
    ],
    horizonPhilosophy: "Don't just teach AI what a defect looks like. Teach it what a good product looks like — and recognise when something doesn't belong.",
    keyTesting: [
      'Detection accuracy on unseen test product samples',
      'Robustness test under shifted lighting conditions and rotated angles',
      'False positive rate evaluation on normal cosmetic variations',
      'Inspection latency measurement per frame (ms/item)',
      'Quality audit dashboard record logging verification'
    ]
  },
  {
    id: 'ps20',
    code: 'PS20',
    title: 'AI-Based Machine Health and Failure Prediction System',
    category: 'Industry 4.0',
    tagline: 'Industrial equipment health telemetry predicting component degradation and RUL.',
    problem: 'Unexpected equipment failure causes unplanned downtime and high repair costs. Sensors record vibration, current, and temp, but lack predictive translation into early actionable warnings.',
    challenge: 'How might we develop an AI-powered machine health and failure prediction system that continuously observes machine behaviour, identifies abnormal patterns and predicts developing equipment problems early enough for maintenance action?',
    challenge36h: [
      'Focus on one industrial machine (motor, pump, compressor, fan, CNC)',
      'Multi-stream telemetry ingestion (Vibration, Temp, Current, Acoustic)',
      'Normal baseline learning under varying speed and load conditions',
      'Early anomaly detection before final component breakdown',
      'Component-level fault diagnosis and Remaining Useful Life (RUL) estimation',
      'Actionable maintenance alerts with severity tiers (Normal, Monitor, Inspect, Urgent)'
    ],
    evaluationCriteria: [
      { name: 'Early Failure / Degradation Detection', weight: '20%' },
      { name: 'Failure Prediction Performance', weight: '15%' },
      { name: 'Fault / Component Identification', weight: '15%' },
      { name: 'Machine Health Assessment Quality', weight: '10%' },
      { name: 'False Alarm & Reliability Performance', weight: '10%' },
      { name: 'Robustness to Operating Condition Changes', weight: '10%' },
      { name: 'Explainability & Evidence', weight: '5%' },
      { name: 'Maintenance Recommendation Quality', weight: '5%' },
      { name: 'Prototype Functionality & Dashboard', weight: '5%' },
      { name: 'Scalability & Industrial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't wait for the machine to fail. Teach it to recognise how it is gradually becoming unhealthy.",
    keyTesting: [
      'Detection time lead-time ahead of catastrophic failure',
      'Component attribution accuracy (e.g., Bearing vs. Misalignment)',
      'False alarm rejection under operational load switching',
      'Machine Health Index trend curve validation over time',
      'Maintenance recommendation clarity and evidence presentation'
    ]
  },
  {
    id: 'ps21',
    code: 'PS21',
    title: 'AI-Based Intelligent Traffic Flow Management System',
    category: 'Mobility & EV',
    tagline: 'Dynamic adaptive traffic signal control predicting congestion and prioritizing emergency vehicles.',
    problem: 'Fixed traffic light timers cause long queues, fuel waste, and emergency delays because signal plans do not adapt to real-time vehicle density or unpredictable road events.',
    challenge: 'How might we develop an AI-based intelligent traffic-flow management system that understands real-time traffic conditions and dynamically recommends or controls traffic-management actions (Data → Perception → Congestion Detection → Prediction → Adaptive Control)?',
    challenge36h: [
      'Traffic environment simulation or hardware vision feed of junction',
      'Real-time traffic estimation (vehicle count, density, queue length, speed)',
      'Automated congestion detection and near-term flow prediction',
      'Adaptive signal green-time allocation outperforming fixed-timer baselines',
      'Emergency vehicle priority corridor handling with minimal gridlock disruption',
      'Live traffic control dashboard displaying throughput metrics and signal states'
    ],
    evaluationCriteria: [
      { name: 'Adaptive Traffic Optimisation Performance', weight: '20%' },
      { name: 'Traffic Detection & Estimation Accuracy', weight: '15%' },
      { name: 'Congestion Detection & Near-Term Prediction', weight: '15%' },
      { name: 'Reduction in Waiting Time / Queue Length', weight: '15%' },
      { name: 'Emergency Vehicle Prioritisation Handling', weight: '10%' },
      { name: 'Robustness to Surging Traffic Demand', weight: '10%' },
      { name: 'City-Level Scalability Potential', weight: '10%' },
      { name: 'Real-Time Dashboard UI', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just detect traffic. Teach the traffic system to understand, predict and respond to how the city is moving.",
    keyTesting: [
      'Fixed-timer baseline vs AI adaptive signal benchmark comparison',
      'Queue clearance time and average vehicle delay reduction metrics',
      'Emergency ambulance approach priority override and recovery time',
      'Near-term queue prediction accuracy before congestion buildup',
      'Simulated multi-vehicle density surge stress test'
    ]
  },
  {
    id: 'ps22',
    code: 'PS22',
    title: 'AI Learning and Skill Development Platform',
    category: 'AI & Healthcare',
    tagline: 'Adaptive personalized learning engine identifying skill gaps and tailoring explanations and pace.',
    problem: 'Traditional one-size-fits-all education delivers identical content, pace, and difficulty to all students, failing to identify personal knowledge gaps or adapt to individual learning styles.',
    challenge: 'How might we develop an AI-powered personalised learning platform that continuously assesses a learner and dynamically adapts the learning journey based on their knowledge, performance, pace and goals (Assess → Gap → Teach → Practice → Assess → Adapt)?',
    challenge36h: [
      'Focus domain definition (Math, Coding, Engineering, Language)',
      'Initial knowledge diagnostic assessment establishing student baseline',
      'Granular skill-gap identification across sub-topics',
      'Dynamic learning path adaptation (varying content, difficulty, explanation style)',
      'Adaptive practice problem generator reacting to correct/incorrect responses',
      'Teacher/mentor dashboard providing actionable student intervention insights'
    ],
    evaluationCriteria: [
      { name: 'Knowledge & Skill-Gap Identification', weight: '20%' },
      { name: 'Quality of Personalisation & Content Adaptability', weight: '20%' },
      { name: 'Adaptive Learning & Assessment Engine', weight: '15%' },
      { name: 'Learning Progress Measurement', weight: '10%' },
      { name: 'AI Tutor Experience', weight: '10%' },
      { name: 'Teacher / Mentor Insights Dashboard', weight: '10%' },
      { name: 'Scalability & Commercial Potential', weight: '10%' },
      { name: 'Prototype Functionality & Usability', weight: '5%' }
    ],
    horizonPhilosophy: "Don't build another AI tutor. Build a learning system that understands the learner and continuously adapts the path to mastery.",
    keyTesting: [
      'Two distinct student persona paths test (Beginner vs Advanced learner)',
      'Skill-gap detection accuracy on deliberate misconcept test answers',
      'Difficulty scaling responsiveness (Question difficulty adjusts to performance)',
      'Teacher dashboard analytics & intervention alert verification',
      'Re-assessment milestone validation showing progress after learning module'
    ]
  },
  {
    id: 'ps23',
    code: 'PS23',
    title: 'AI-Based Industrial Energy Waste Identification System',
    category: 'CleanTech & Sustainability',
    tagline: 'Energy intelligence correlating power consumption with production telemetry to pinpoint waste.',
    problem: 'Energy meters show total power consumption but fail to explain whether energy use is justified by actual production output, masking idle waste, unoptimized standby, and process inefficiencies.',
    challenge: 'How might we develop an AI-based industrial energy intelligence system that can identify abnormal and unnecessary energy consumption by understanding the relationship between energy use and actual production activity?',
    challenge36h: [
      'Industrial facility/machine energy data ingestion coupled with production logs',
      'Establishment of contextual normal energy baseline (Expected kWh per unit)',
      'Detection of 3+ energy waste patterns (idle running, standby loss, process drift)',
      'Energy intensity metric calculation (kWh per product unit / batch)',
      'Root-cause identification linking energy spikes to specific operational states',
      'Actionable energy-saving recommendations with estimated financial impact'
    ],
    evaluationCriteria: [
      { name: 'Energy Waste Detection Performance', weight: '20%' },
      { name: 'Energy-Per-Production Analysis (kWh/unit)', weight: '15%' },
      { name: 'Anomaly Detection & Baseline Accuracy', weight: '15%' },
      { name: 'Root-Cause Identification Quality', weight: '15%' },
      { name: 'Quality of Energy-Saving Recommendations', weight: '10%' },
      { name: 'Robustness to Operating Variation', weight: '10%' },
      { name: 'Real-Time Analytics & Dashboard', weight: '5%' },
      { name: 'Prototype Functionality', weight: '5%' },
      { name: 'Scalability & Commercial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just measure energy. Teach the factory to understand where its energy is being wasted and what it can do about it.",
    keyTesting: [
      'Detection of hidden idle machine energy waste during zero-output window',
      'kWh per unit baseline accuracy across different product batch types',
      'Root cause drill-down verification (Idle state vs breakdown vs parameter drift)',
      'Financial savings estimate validation against baseline operational log',
      'Recommendation accuracy audit for factory facility engineers'
    ]
  },
  {
    id: 'ps24',
    code: 'PS24',
    title: 'Intelligent Waste Identification and Automated Sorting System',
    category: 'CleanTech & Sustainability',
    tagline: 'Multi-sensor perception & automated mechanism sorting mixed waste into recovery streams.',
    problem: 'Mixed waste streams render recyclable materials unrecoverable and increase processing costs. Manual sorting is hazardous and labor-intensive, while visual-only AI struggles with visually similar materials.',
    challenge: 'How might we develop an intelligent waste-identification and automated sorting system capable of recognising different waste materials and directing them into appropriate categories with high accuracy (Waste Input → Material Detection → Classification → Decision → Physical Sorting → Verification)?',
    challenge36h: [
      'Target waste stream definition (MSW, plastic, e-waste, organic, packaging)',
      'Multi-sensor or vision AI perception detecting individual items in mixed stream',
      'Classification of 3+ distinct material recovery categories',
      'Physical automated sorting mechanism (robotic, pneumatic, servo gates, diverter)',
      'Handling uncertain objects with explicit "Unknown / Manual Review" sorting',
      'Waste composition analytics dashboard logging recyclability fractions'
    ],
    evaluationCriteria: [
      { name: 'Waste Identification & Classification Accuracy', weight: '20%' },
      { name: 'Physical Automated Sorting Accuracy', weight: '20%' },
      { name: 'Automated Sorting Mechanism Functionality', weight: '15%' },
      { name: 'Robustness to Mixed/Variable Waste Streams', weight: '10%' },
      { name: 'Sensor Fusion & Detection Reliability', weight: '10%' },
      { name: 'Throughput & Real-Time Performance', weight: '10%' },
      { name: 'Waste Analytics & Traceability Dashboard', weight: '5%' },
      { name: 'Prototype Safety & Construction', weight: '5%' },
      { name: 'Scalability & Commercial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just identify waste. Build a system that understands what each discarded material is worth—and puts it in the right place.",
    keyTesting: [
      'Mixed waste stream sorting accuracy benchmark test',
      'Physical mechanism diverter timing & item placement success rate',
      'Uncertain item rejection test ("Unknown" routed to manual bin)',
      'Throughput measurement (Items per minute processed)',
      'Composition dashboard tracking (Recyclable vs Organic vs Residual weight)'
    ]
  },
  {
    id: 'ps25',
    code: 'PS25',
    title: 'Alternative Building Materials for Sustainable Construction',
    category: 'CleanTech & Sustainability',
    tagline: 'Performance-tested sustainable construction materials formulated from recycled or waste streams.',
    problem: 'Construction consumes immense virgin resources (sand, cement, aggregates) while industrial, agricultural, and demolition waste accumulates. Alternative eco-materials often lack structural proof or economic viability.',
    challenge: 'How might we develop an alternative building material or construction-material system using innovative, locally available, recycled, waste or renewable resources that can reduce dependence on conventional construction materials without compromising required performance?',
    challenge36h: [
      'Clear construction target application (blocks, pavers, wall panels, insulation)',
      'Physical prototype sample formulated from waste/recycled/renewable inputs',
      'Material formulation breakdown and raw material source documentation',
      'Physical performance testing (compressive strength, flexural, absorption, density)',
      'Baseline comparison against conventional standard materials (e.g. Concrete/Clay)',
      'Sustainability & embodied carbon quantitative reduction analysis',
      'Manufacturing cost model (Cost per unit / m2) & scale-up strategy'
    ],
    evaluationCriteria: [
      { name: 'Material Performance & Structural Integrity', weight: '20%' },
      { name: 'Sustainability & Environmental Footprint Impact', weight: '20%' },
      { name: 'Conventional Material Baseline Comparison', weight: '15%' },
      { name: 'Manufacturing Feasibility & Repeatability', weight: '15%' },
      { name: 'Cost & Commercial Affordability', weight: '10%' },
      { name: 'Innovation & Material Science Rigor', weight: '10%' },
      { name: 'Prototype Quality & Physical Sample', weight: '5%' },
      { name: 'Scalability & Industrial Potential', weight: '5%' }
    ],
    horizonPhilosophy: "Don't just replace conventional materials. Rethink what the building materials of tomorrow can be.",
    keyTesting: [
      'Lab compressive/flexural strength test benchmark vs reference standard',
      'Water absorption & moisture degradation test',
      'Waste material mass ratio verification (% recycled content)',
      'Embodied carbon reduction estimate validation',
      'Unit cost comparison against standard market brick/paver'
    ]
  },
  {
    id: 'ps26',
    code: 'PS26',
    title: 'Designing the Home of Bold Ideas',
    category: 'Architecture & Design',
    tagline: 'Architectural concept transforming the R Shivakumar Foundation Incubation & Acceleration Centre.',
    problem: 'Innovation hubs often feel like conventional corporate offices or classrooms with static cubicles that hinder serendipitous collaboration, prototyping, and multi-disciplinary interaction.',
    challenge: 'How might we design a physical space that makes people want to come in, stay longer, meet unexpected people, exchange ideas and build something bold? Reimagine the building drawings of the proposed R Shivakumar Foundation Incubation & Acceleration Centre at SRM University.',
    challenge36h: [
      'Complete architectural and spatial layout concept for the Incubation Centre',
      'Spatial design honoring 5 core principles: Open, Flexible, Collaborative, Experimental, Bold',
      'Integration of key innovation zones (open hubs, maker spaces, pitch area, founder rooms)',
      'Circulation and serendipitous collision mapping per square metre',
      'Visual spatial representations (drawings, render concepts, 3D spatial flow)',
      'Implementation strategy and modular adaptivity plan'
    ],
    evaluationCriteria: [
      { name: 'Architectural Vision & Spatial Concept', weight: '25%' },
      { name: 'Alignment with 5 Design Principles', weight: '20%' },
      { name: 'Ecosystem Functionality & Flow', weight: '20%' },
      { name: 'Flexibility & Scalability of Spaces', weight: '15%' },
      { name: 'Visual Representation & Presentation Quality', weight: '10%' },
      { name: 'Practical Feasibility & Implementation', weight: '10%' }
    ],
    horizonPhilosophy: "Don't design an office. Design a physical manifestation of innovation where bold ideas come to life.",
    keyTesting: [
      'Evaluation of spatial flow and collaboration density per square metre',
      'Zoning balance: Focus work vs collaborative open spaces vs maker zones',
      'Adaptability assessment for team scaling from 2 to 20 seats',
      'Architectural render and floorplan concept review by expert panel',
      'Sustainability, lighting, and interior environmental quality integration'
    ]
  }
];
