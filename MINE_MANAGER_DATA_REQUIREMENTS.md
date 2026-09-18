# ⛏️ MINEGOV_AI — Mine Manager Dashboard Data Requirements Specification
> **Focus Mine / Colliery:** Moonidih Project / Gaslitand Colliery  
> **Subsidiary & Area:** Bharat Coking Coal Limited (BCCL), Katras / Western Jharia Area, Dhanbad, Jharkhand  
> **Document Purpose:** Complete tab-by-tab data schema for the field operations team to extract and provide real mining metrics.

---

## 📋 Executive Overview for the Data Team
The **Mine Operations Dashboard** (`#demo_mine_manager`) gives the statutory Mine Manager real-time oversight of coal extraction, safety telemetry (gaseous & strata), DGMS compliance, mobile equipment (HEMM), and shift muster roll.

To make the system fully authentic to **Jharia Coalfield (Dhanbad)**, we have organized the required data into **6 Tabs**:
1. [Header & Context Roster](#1-header--context-roster)
2. [Tab 1: Dashboard (Main Command Center)](#2-tab-1-dashboard-main-view)
3. [Tab 2: Live Monitoring (Sensors, Assets & CCTVs)](#3-tab-2-live-monitoring)
4. [Tab 3: Mine Map (GIS Hotspots, Pits & Zones)](#4-tab-3-mine-map)
5. [Tab 4: Reports (Statutory DGMS & CIL Returns)](#5-tab-4-reports)
6. [Tab 5: Alerts & Statutory Thresholds](#6-tab-5-alerts--rules)
7. [Tab 6: Settings & Operational Config](#7-tab-6-settings)

---

## 1. Header & Context Roster

| Field Name | Description | Data Type | Example Real Value (Jharia) |
| :--- | :--- | :--- | :--- |
| `mineName` | Statutory Name of Mine/Colliery | String | `Moonidih Deep Seam Project (BCCL)` |
| `mineCode` | DGMS / Coal India Mine ID | String | `BCCL-WJ-MND-01` |
| `subsidiary` | Operating Subsidiary | String | `Bharat Coking Coal Limited (BCCL)` |
| `area` | Regional Administrative Area | String | `Western Jharia / Katras Area IV` |
| `currentShift` | Ongoing 8-hour mining shift | Enum (`Shift-1`, `Shift-2`, `Shift-3`) | `Day Shift (06:00 - 14:00)` |
| `managerName` | Certified First Class Mine Manager | String | `Er. Rahul Kumar, FCC-0842` |
| `managerInitials` | Avatar Initials | String (2-3 chars) | `RK` |
| `telemetryStatus` | SCADA Connection state | Enum (`LIVE`, `OFFLINE`, `DEGRADED`) | `LIVE` |

---

## 2. Tab 1: Dashboard (Main View)

### A. 4 Key Performance Indicator (KPI) Cards
| Card | Field | Description | Target / Units | Real Jharia Example |
| :--- | :--- | :--- | :--- | :--- |
| **Safety** | `activeAlerts` | Unresolved safety & gas warnings | Count | `2` |
| | `delta` | Change compared to previous shift | Signed integer | `+1` (Alerts increased) |
| **Environment** | `exceedances` | CPCB/OCEMS parameters above limit | Count | `3` (e.g. PM10, Noise, pH) |
| | `delta` | Trend vs previous shift | Signed integer | `-2` (Dousing active) |
| **Production** | `todayOutputTons` | Net coal extracted today | Metric Tons (MT) | `8,450 Tons` |
| | `delta` | Variance vs daily target | Percentage | `+6%` |
| **Labour** | `workersOnSite` | Biometric check-in attendance | Count | `182 Workers On-Site` |
| | `absentWorkers` | Unreported rostered miners | Count | `8 Absent` |

---

### B. In-Pit / Underground Faces Table (`pits`)
Provide details for **4 to 5 active extraction working faces / pits**:

| Field | Description | Units / Format | Jharia Underground / OC Example |
| :--- | :--- | :--- | :--- |
| `name` | Name of Pit / Seam Face | String | `Shaft-1 Seam XVI (Longwall)` |
| `status` | Operational Health | `normal` \| `warning` \| `critical` \| `offline` | `warning` |
| `depth` | Working Depth from Surface | Meters (m) | `320m` |
| `dailyOutput` | Daily extraction volume | Tons/day | `3,100 T/day` |
| `hemm` | Equipment deployed | String | `1 Shearer, 2 AFCs, 8 Dumpers` |
| `ch4Level` | Methane concentration | Volume % (Dangerous $>0.75\%$) | `0.45%` |
| `coLevel` | Carbon Monoxide level | PPM (Mine fire heating $>15\,\text{ppm}$) | `14 ppm` |
| `pumpsStatus` | Sub-surface mine dewatering | String | `Operational (4,200 GPM)` |
| `safetyRating` | Composite Face Safety Index | Percentage | `88%` |

---

### C. Production & Safety Historical Trend (`trendData`)
Daily numbers for **7-Day, 14-Day, and 30-Day** charts:
- **Dates:** Array of timestamps (e.g. `["12 Sep", "13 Sep", "14 Sep", "15 Sep", "16 Sep", "17 Sep", "18 Sep"]`)
- **Production Array (Tons):** e.g. `[7200, 7800, 8100, 7900, 8300, 8250, 8450]`
- **Safety Alerts Count:** e.g. `[3, 5, 2, 4, 3, 2, 2]`

---

### D. AI Predictive Risk Score Engine
| Field | Description | Format | Jharia Example |
| :--- | :--- | :--- | :--- |
| `riskScore` | Real-time AI Hazard Index | Integer (0 to 100) | `58 / 100` |
| `riskBand` | Risk Category | `Low` (0-35), `Medium` (36-70), `High` (71-100) | `Medium` |
| `mlConfidence` | Confidence score of ML Model | Percentage | `94.2%` |
| `topFactors` | 4 Leading Precursor Risk Factors | Array of Strings | 1. `High PM10 dust at Crusher Siding 3`<br>2. `Haul truck speeding on Haul Road B`<br>3. `Methane pocket in Return Airway 4`<br>4. `Subsurface temperature spike (Kusunda fire fringe)` |

---

### E. Real-Time In-Pit Alerts Queue
| Alert ID | Severity | Title | Section / Pit Location | Time |
| :--- | :--- | :--- | :--- | :--- |
| `ALT-101` | `critical` | High $CO$ Level Detected | East Pit — Sensor E-12 | `10:24 AM` |
| `ALT-102` | `high` | Haul Truck HT-07 Overspeed ($48\,\text{km/h}$) | Main South Haul Ramp | `09:50 AM` |
| `ALT-103` | `critical` | Worker in Restricted Blasting Zone | Blast Bench #4 | `09:15 AM` |
| `ALT-104` | `high` | Ambient Dust Limit Exceeded ($PM_{10}: 182\,\mu g/m^3$) | Primary Crusher Unit | `08:40 AM` |
| `ALT-105` | `info` | Water Sump Discharge pH Testing Due | Central Sump 02 | `07:30 AM` |

---

### F. High Authority Orders & DGMS Directives
Directives issued by **DGMS Inspector, BCCL CMD, or CIL Chairman**:
| Date | Originating Authority | Directive Description |
| :--- | :--- | :--- |
| `18 Sep 2026` | DGMS Central Zone | *"Mandatory flameproof testing on electrical switchgear in Seam XVI"* |
| `16 Sep 2026` | Director Technical (BCCL) | *"Increase mist-cannon water spraying frequency on Haul Road C"* |
| `14 Sep 2026` | Area GM (Katras) | *"Conduct mock emergency evacuation drill at West Shaft exit"* |

---

## 3. Tab 2: Live Monitoring

### A. Mobile Heavy Earth Moving Machinery (HEMM) Assets
For each heavy machine in the pit, provide:
| Asset ID | Equipment Type | Machine Model | Status | Pit Location | Operator Name | Speed | Fuel / Battery |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `HT-07` | `Trucks` | CAT 777E Dumper | `Moving` | East Pit Bench 3 | Suresh Prasad | `38 km/h` | `78%` |
| `EX-12` | `Excavators` | Komatsu PC2000 | `Running` | West Pit Face | Vikram Roy | `0 km/h` | `64%` |
| `CM-01` | `ContinuousMiner`| Joy 12CM27 | `Running` | Seam XVI Face | Amit Sharma | `1 km/h` | `Electric` |
| `LD-05` | `Loaders` | BEML WA470 | `Maintenance`| Central Workshop | Unassigned | `0 km/h` | `40%` |
| `WT-02` | `WaterTrucks` | 28,000L Mist Truck | `Moving` | Crusher Siding | Ramesh K. | `24 km/h` | `85%` |

---

### B. Live Telemetry Environmental Sensors (SCADA Feed)
| Metric | Sensor Tag | Real Units | Safe Threshold | High Danger Limit | Current Jharia Value |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Methane ($CH_4$)** | `GAS-CH4-01` | Volume % | $< 0.75\%$ | $> 1.25\%$ (CMR 153 Stop Work) | `0.42%` |
| **Carbon Monoxide ($CO$)**| `GAS-CO-03` | PPM | $< 10\,\text{ppm}$ | $> 25\,\text{ppm}$ (Spontaneous Heating)| `12 ppm` |
| **Air Quality ($PM_{10}$)**| `ENV-PM10-02`| $\mu g/m^3$ | $< 100\,\mu g/m^3$ | $> 150\,\mu g/m^3$ (CPCB Exceedance)| `142 µg/m³` |
| **Strata Temperature** | `TMP-STR-01` | $^\circ\text{C}$ | $< 35^\circ\text{C}$ | $> 45^\circ\text{C}$ (Subsurface Fire Fringe)| `36.8 °C` |
| **Airflow Velocity** | `AIR-VEL-04` | $m/s$ | $> 1.5\,m/s$ | $< 0.5\,m/s$ (Ventilation Stagnation)| `1.8 m/s` |
| **Noise Level** | `NOI-01` | $\text{dB(A)}$ | $< 85\,\text{dB}$ | $> 90\,\text{dB}$ (Hearing Protection Zone)| `76 dB` |

---

### C. Live Video Surveillance Cameras (CCTV)
| Camera ID | Camera Name | Placement Location | Status |
| :--- | :--- | :--- | :--- |
| `CAM-01` | Main Incline Entrance | Shaft-1 Winding Headframe | `Active` |
| `CAM-02` | Haul Road Junction | Haul Road & Feeder Breaker Intersection | `Active` |
| `CAM-03` | Primary Coal Crusher | Crusher Hopper Hopper Feeding Chute | `Active` |
| `CAM-04` | Explosives Magazine | Underground Explosive Distribution Post | `Active` |

---

## 4. Tab 3: Mine Map

To render the interactive Leaflet GIS view for the mine:
1. **Mine Boundary Polygon Coordinates:**
   - Latitude/Longitude polygon bounding the lease area (e.g. 4 corner coordinates in Dhanbad).
2. **Internal Landmark Coordinates:**
   - Headframe / Shaft-1: `[23.7428, 86.3456]`
   - Primary Coal Handling Plant (CHP): `[23.7460, 86.3490]`
   - Explosives Magazine (Statutory safe distance): `[23.7390, 86.3410]`
   - Water Treatment Sump: `[23.7410, 86.3510]`
3. **Safety Risk Zones (Geo-Fencing Circles):**
   - Blasting Exclusion Zone: Center coordinate + Radius (e.g., `500m`).
   - Old Abandoned Working Fire Fringe: Polygon coordinates marked in Amber/Red.
4. **Mine Schematic Blueprint (`hazardMapUrl`):**
   - High-resolution SVG/PNG of the ventilation plan (stored on Cloudinary).

---

## 5. Tab 4: Reports

Provide a list of recent statutory and operational reports generated for the mine:
| Report ID | Category | Statutory Title | Date | Status | Author |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `RPT-2026-001` | `Safety` | DGMS Monthly Methane & Ventilation Survey (CMR 153) | `18 Sep 2026` | `Completed` | Er. Rahul Kumar |
| `RPT-2026-002` | `Environment` | CPCB Continuous Ambient Air Quality Log (CAAQMS) | `16 Sep 2026` | `Completed` | Environmental Officer |
| `RPT-2026-003` | `Production` | Daily Seam Extraction & Wagon Despatch to SAIL Bokaro | `15 Sep 2026` | `Completed` | Shift In-Charge |
| `RPT-2026-004` | `Labour` | Form B Statutory Employment & Biometric Gate Reconciliation | `12 Sep 2026` | `Completed` | Welfare Officer |
| `RPT-2026-005` | `Safety` | Strata Control Advisory on Bench 14 Slope Stability | `08 Sep 2026` | `Pending` | Safety Officer |

---

## 6. Tab 5: Alerts & Statutory Rules

Provide the statutory alert threshold parameters configured for the mine:
| Alert ID | Category | Severity | Parameter Checked | Trigger Condition | Statutory Action Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `RULE-CH4` | `Safety` | `Critical` | Methane in General Body | $> 1.0\%$ (Alarm) / $> 1.25\%$ (Cut Power) | Cut electrical power, evacuate face immediately |
| `RULE-CO` | `Safety` | `High` | Carbon Monoxide ($CO$) | $> 25\,\text{ppm}$ for $> 15\text{ mins}$ | Seal fringe, inject liquid nitrogen / foam |
| `RULE-PM10` | `Environment` | `High` | Particulate Matter ($PM_{10}$) | $> 150\,\mu g/m^3$ 24-hr avg | Turn on high-pressure water mist cannons |
| `RULE-ROOF` | `Safety` | `Critical` | Tell-Tale Roof Sag Sensor | $> 5\,\text{mm/day}$ convergence | Immediate additional roof bolting / withdrawal |
| `RULE-GATE` | `Labour` | `High` | Biometric Gate Entry | PME status `UNFIT` or `Overdue` | Automatic turnstile lockout, deny entry |

---

## 7. Tab 6: Settings (Operational Configuration)

| Setting Field | Description | Current Value (Jharia Configuration) |
| :--- | :--- | :--- |
| `Colliery Statutory Name` | Full registered colliery name | `Moonidih Project (BCCL), Western Jharia Area` |
| `DGMS Certification` | Statutory Mine Classification | `Class-1 Underground Gassy Coal Mine (Degree III)` |
| `Lease Hold Area` | Total mining concession area | `1,280 Hectares` |
| `Primary Coal Seam` | Target Geological Coal Seam | `Seam XVI (Prime Coking Coal, Avg Thickness: 4.8m)` |
| `Shift Schedule` | Working shift timings | `Shift 1: 06:00-14:00 \| Shift 2: 14:00-22:00 \| Shift 3: 22:00-06:00` |
| `Dhanbad Rescue Station` | Nearest DGMS Mines Rescue Brigade | `BCCL Mines Rescue Station, Dhansar, Dhanbad` |
| `Central Hospital Contact` | Referral hospital for emergency trauma | `Central Hospital BCCL, Jagjivan Nagar, Dhanbad` |
| `Emergency Siren Frequency` | Automated alarm trigger on $CH_4$ breach | `Automated Horn + Biometric Gate Lockout Enabled` |

---

## 📥 How to Send Data Back:
Aapki team chahe toh:
1. Is file ke tables me apne real figures bhar kar de sakti hai.
2. Ya fir simple Excel / JSON format me provide kar sakti hai.
Hum ise turant **Neon Database seed script** aur **Frontend Dashboard Data** me load kar denge!