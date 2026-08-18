export type GunaType = 'Sattva' | 'Rajas' | 'Tamas';

export interface GunaPercentages {
  sattva: number;
  rajas: number;
  tamas: number;
}

export interface PsychologicalTelemetry {
  dominant_guna: GunaType;
  cognitive_distortion: string;
  mind_state_diagnosis: string;
  guna_percentages: GunaPercentages;
}

export interface ShlokaMeta {
  chapter: number;
  verse: number;
  chhanda_meter: string;
  sanskrit_devanagari: string;
  transliteration_iast: string;
}

export interface AudioSonicMetadata {
  recommended_raga_bgm: string;
  vocal_modulation_guidance: string;
  pronunciation_key: string;
}

export interface WordAnvaya {
  sanskrit_word: string;
  root_dhatu: string;
  grammar_case: string;
  meaning: string;
}

export interface CognitiveReframingCase {
  modern_dilemma: string;
  psychological_reframe: string;
}

export interface MindfulnessBreathworkSync {
  technique_name: string;
  guided_instruction: string;
}

export interface ShriKrishnaUvacha {
  divine_address: string;
  deep_counsel: string;
  immediate_24hr_dharma_action: string;
}

export interface SevenLayerMentorDiagnosis {
  psychological_telemetry: PsychologicalTelemetry;
  shloka_meta: ShlokaMeta;
  audio_sonic_metadata: AudioSonicMetadata;
  word_by_word_anvaya: WordAnvaya[];
  simple_translation: string;
  cognitive_reframing_case: CognitiveReframingCase;
  mindfulness_breathwork_sync: MindfulnessBreathworkSync;
  shri_krishna_uvacha: ShriKrishnaUvacha;
}

export type AIModelOption = 
  | 'llama-3.3-70b-versatile'
  | 'llama3-70b-8192'
  | 'llama-3.1-8b-instant'
  | 'mixtral-8x7b-32768'
  | 'gemma2-9b-it'
  | 'dharma-vedic-engine-v1';

export interface ChatMessage {
  id: string;
  sender: 'seeker' | 'krishna';
  text: string;
  timestamp: number;
  diagnosis?: SevenLayerMentorDiagnosis;
}

export interface MentorRequest {
  problem_description: string;
  model?: AIModelOption;
  custom_api_key?: string;
  elevenlabs_api_key?: string;
  conversation_history?: { role: 'user' | 'assistant'; content: string }[];
}

export type MentorDiagnosis = SevenLayerMentorDiagnosis;

export interface MentorResponse {
  success: boolean;
  diagnosis: SevenLayerMentorDiagnosis;
  model: string;
  execution_time_ms: number;
}


