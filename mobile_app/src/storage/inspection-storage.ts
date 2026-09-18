import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReportStatus } from '../offline/sync-types';

export type ChecklistCategory =
  | 'Safety'
  | 'Operations'
  | 'Infrastructure'
  | 'Mechanical'
  | 'Ventilation'
  | 'Emergency';

export type ChecklistItemStatus = 'PENDING' | 'PASS' | 'ISSUE' | 'NA';

export interface ChecklistItem {
  id: string;
  number: string;
  title: string;
  description: string;
  category: ChecklistCategory;
  status: ChecklistItemStatus;
  updatedAt?: string;
}

export interface InspectionDraft {
  id: string;
  date: string;
  dateSubtitle: string;
  shift: string;
  mineSite: string;
  mineLocationDetails: string;
  workingLocation: string;
  status: ReportStatus;
  items: ChecklistItem[];
  updatedAt: string;
}

const STORAGE_KEY = 'minegov.inspection.sirdar.daily';

export const INITIAL_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'chk-01',
    number: '01',
    title: 'Personal Protective Equipment (PPE)',
    description:
      'Verify all workers are wearing required PPE (helmet, safety shoes, reflective jacket, gloves, etc.).',
    category: 'Safety',
    status: 'PASS',
  },
  {
    id: 'chk-02',
    number: '02',
    title: 'Workplace / Bench Condition',
    description:
      'Check stability of benches, presence of loose material, and overall workplace safety.',
    category: 'Operations',
    status: 'PASS',
  },
  {
    id: 'chk-03',
    number: '03',
    title: 'Haul Road Condition',
    description:
      'Inspect road condition, visibility, drainage and any obstructions.',
    category: 'Infrastructure',
    status: 'PASS',
  },
  {
    id: 'chk-04',
    number: '04',
    title: 'Machinery & Equipment',
    description:
      'Ensure all operating machinery is in safe condition and no visible leakages.',
    category: 'Mechanical',
    status: 'PASS',
  },
  {
    id: 'chk-05',
    number: '05',
    title: 'Ventilation & Dust Suppression',
    description:
      'Check water sprinkling on haul roads and ventilation air flow in working areas.',
    category: 'Ventilation',
    status: 'PASS',
  },
  {
    id: 'chk-06',
    number: '06',
    title: 'Fire Extinguishers & Fire Stations',
    description:
      'Verify fire extinguishers are serviced, pressurized and readily accessible at stations.',
    category: 'Emergency',
    status: 'PASS',
  },
  {
    id: 'chk-07',
    number: '07',
    title: 'Highwall & Side Wall Cracks',
    description:
      'Inspect highwalls for tension cracks, overhangs, or slope displacement risks.',
    category: 'Safety',
    status: 'ISSUE',
  },
  {
    id: 'chk-08',
    number: '08',
    title: 'Conveyor Belt Guard & Emergency Pull Cord',
    description:
      'Inspect rotating conveyor parts for guards and test emergency stop pull cords.',
    category: 'Mechanical',
    status: 'ISSUE',
  },
  {
    id: 'chk-09',
    number: '09',
    title: 'Lighting & Visibility at Working Faces',
    description:
      'Ensure adequate floodlighting towers and high-lux illumination at active excavation faces.',
    category: 'Operations',
    status: 'PENDING',
  },
  {
    id: 'chk-10',
    number: '10',
    title: 'Gas Monitoring & Noxious Fumes',
    description:
      'Check methanometer/multigas detectors for CO, CH4 and O2 levels within statutory safety limits.',
    category: 'Safety',
    status: 'PENDING',
  },
  {
    id: 'chk-11',
    number: '11',
    title: 'Water Accumulation & Pumping System',
    description:
      'Inspect pit sump water level, drainage channels, and operational standby pumps.',
    category: 'Infrastructure',
    status: 'PENDING',
  },
  {
    id: 'chk-12',
    number: '12',
    title: 'First Aid Station & Stretcher Availability',
    description:
      'Check availability of statutory first-aid kits, blankets, splints and stretcher near face.',
    category: 'Emergency',
    status: 'PENDING',
  },
  {
    id: 'chk-13',
    number: '13',
    title: 'Electrical Cables & Earthing Protection',
    description:
      'Verify trailing cables are suspended safely and earth leakage circuit breakers (ELCB) functional.',
    category: 'Mechanical',
    status: 'PENDING',
  },
  {
    id: 'chk-14',
    number: '14',
    title: 'Dump Site & Berm Height Verification',
    description:
      'Verify safety berms along dump edges are at least axle height of the largest dumper.',
    category: 'Operations',
    status: 'PENDING',
  },
  {
    id: 'chk-15',
    number: '15',
    title: 'Blasting Danger Zone Clearance & Signage',
    description:
      'Ensure danger zone perimeter is clearly marked and shelters are operational.',
    category: 'Safety',
    status: 'PENDING',
  },
  {
    id: 'chk-16',
    number: '16',
    title: 'Drinking Water & Sanitation Facilities',
    description:
      'Verify clean drinking water stations and sanitary arrangements near active shift workers.',
    category: 'Infrastructure',
    status: 'PENDING',
  },
  {
    id: 'chk-17',
    number: '17',
    title: 'Telecommunication & Field Wireless Link',
    description:
      'Test two-way radio channels and emergency link with mine control room.',
    category: 'Operations',
    status: 'PENDING',
  },
  {
    id: 'chk-18',
    number: '18',
    title: 'Emergency Siren & Evacuation Signboards',
    description:
      'Verify emergency siren audible radius and unobstructed escape routes.',
    category: 'Emergency',
    status: 'PENDING',
  },
  {
    id: 'chk-19',
    number: '19',
    title: 'Explosives Transport & Handling Safety',
    description:
      'Check explosive van escort, earthing chains, and authorized shotfirer permits.',
    category: 'Safety',
    status: 'PENDING',
  },
  {
    id: 'chk-20',
    number: '20',
    title: 'HEMM Horns, Lights & Audio-Visual Alarms',
    description:
      'Test shovel, loader, and dumper audio-visual alarms (AVAs) and rearview mirrors.',
    category: 'Mechanical',
    status: 'PENDING',
  },
  {
    id: 'chk-21',
    number: '21',
    title: 'Substation & Transformer Fencing',
    description:
      'Verify high voltage perimeter fences are locked with danger warning boards.',
    category: 'Infrastructure',
    status: 'PENDING',
  },
  {
    id: 'chk-22',
    number: '22',
    title: 'Dust Extractor on Drill Rigs',
    description:
      'Inspect wet drilling system and bag filters to suppress respirable coal dust.',
    category: 'Ventilation',
    status: 'PENDING',
  },
  {
    id: 'chk-23',
    number: '23',
    title: 'Statutory Register & Shift Handover Log',
    description:
      'Ensure previous shift observations are reviewed and logbook is countersigned.',
    category: 'Operations',
    status: 'PENDING',
  },
  {
    id: 'chk-24',
    number: '24',
    title: 'Worker Fatigue & Fitness Assessment',
    description:
      'Conduct pre-shift briefing and check for worker alertness and physical fitness.',
    category: 'Safety',
    status: 'PENDING',
  },
];

export const DEFAULT_INSPECTION_DRAFT: InspectionDraft = {
  id: 'insp-sirdar-current',
  date: '11 Sep 2026',
  dateSubtitle: '(Today)',
  shift: 'Shift A (06:00 - 14:00)',
  mineSite: 'Kusunda Coal Mine',
  mineLocationDetails: '(Bokaro, Jharkhand)',
  workingLocation: 'Working Face - 1',
  status: 'DRAFT',
  items: INITIAL_CHECKLIST_ITEMS,
  updatedAt: new Date().toISOString(),
};

export const inspectionStorage = {
  async loadDraft(): Promise<InspectionDraft> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as InspectionDraft;
      }
    } catch {
      // fallback to initial default draft if error reading storage
    }
    return DEFAULT_INSPECTION_DRAFT;
  },

  async saveDraft(draft: InspectionDraft): Promise<void> {
    const updatedDraft = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDraft));
  },

  async resetToDefault(): Promise<InspectionDraft> {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return DEFAULT_INSPECTION_DRAFT;
  },
};
