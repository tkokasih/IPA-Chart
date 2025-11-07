export type ConsonantPlace =
  | 'bilabial'
  | 'labiodental'
  | 'dental'
  | 'alveolar'
  | 'postalveolar'
  | 'retroflex'
  | 'palatal'
  | 'velar'
  | 'uvular'
  | 'pharyngeal'
  | 'glottal'
  | 'labial-velar';

export type ConsonantManner =
  | 'plosive'
  | 'nasal'
  | 'trill'
  | 'tap_flap'
  | 'fricative'
  | 'lateral_fricative'
  | 'approximant'
  | 'lateral_approximant'
  | 'affricate';

export type ConsonantVoicing = 'voiceless' | 'voiced' | 'aspirated' | 'ejective';

export type VowelHeight =
  | 'close'
  | 'near-close'
  | 'close-mid'
  | 'mid'
  | 'open-mid'
  | 'near-open'
  | 'open';

export type VowelBackness = 'front' | 'near-front' | 'central' | 'near-back' | 'back';

export type VowelRounding = 'unrounded' | 'rounded';

export interface PhonemeBase {
  ipa: string;
  graphemes?: string[];
  contexts?: string[];
  notes?: string;
}

export interface ConsonantPhoneme extends PhonemeBase {
  place: ConsonantPlace;
  manner: ConsonantManner;
  voicing?: ConsonantVoicing;
}

export interface VowelPhoneme extends PhonemeBase {
  height: VowelHeight;
  backness: VowelBackness;
  rounding: VowelRounding;
}

export type Phoneme = ConsonantPhoneme | VowelPhoneme;

export interface LanguageRuleRealization {
  ipa: string;
  environment: string;
}

export interface LanguageRule {
  name: string;
  type: 'allophone' | 'distribution' | 'phonotactic';
  phoneme: string;
  realizations: LanguageRuleRealization[];
}

export interface Language {
  id: string;
  name: string;
  variety: string;
  script: string;
  phonemes: Phoneme[];
  rules?: LanguageRule[];
  notes?: string;
}

export const consonantPlaces: ConsonantPlace[] = [
  'bilabial',
  'labiodental',
  'dental',
  'alveolar',
  'postalveolar',
  'retroflex',
  'palatal',
  'velar',
  'uvular',
  'pharyngeal',
  'glottal',
  'labial-velar'
];

export const consonantManners: ConsonantManner[] = [
  'plosive',
  'nasal',
  'trill',
  'tap_flap',
  'fricative',
  'lateral_fricative',
  'approximant',
  'lateral_approximant',
  'affricate'
];

export const vowelHeights: VowelHeight[] = [
  'close',
  'near-close',
  'close-mid',
  'mid',
  'open-mid',
  'near-open',
  'open'
];

export const vowelBacknesses: VowelBackness[] = [
  'front',
  'near-front',
  'central',
  'near-back',
  'back'
];

export const consonantPlaceLabels: Record<ConsonantPlace, string> = {
  bilabial: 'Bilabial',
  labiodental: 'Labiodental',
  dental: 'Dental',
  alveolar: 'Alveolar',
  postalveolar: 'Postalveolar',
  retroflex: 'Retroflex',
  palatal: 'Palatal',
  velar: 'Velar',
  uvular: 'Uvular',
  pharyngeal: 'Pharyngeal',
  glottal: 'Glottal',
  'labial-velar': 'Labial-velar'
};

export const consonantMannerLabels: Record<ConsonantManner, string> = {
  plosive: 'Plosive',
  nasal: 'Nasal',
  trill: 'Trill',
  tap_flap: 'Tap/Flap',
  fricative: 'Fricative',
  lateral_fricative: 'Lateral fricative',
  approximant: 'Approximant',
  lateral_approximant: 'Lateral approximant',
  affricate: 'Affricate'
};

export const vowelHeightLabels: Record<VowelHeight, string> = {
  close: 'Close',
  'near-close': 'Near-close',
  'close-mid': 'Close-mid',
  mid: 'Mid',
  'open-mid': 'Open-mid',
  'near-open': 'Near-open',
  open: 'Open'
};

export const vowelBacknessLabels: Record<VowelBackness, string> = {
  front: 'Front',
  'near-front': 'Near-front',
  central: 'Central',
  'near-back': 'Near-back',
  back: 'Back'
};

export type ConsonantReference = Partial<
  Record<ConsonantManner, Partial<Record<ConsonantPlace, string[]>>>
>;

export type VowelPlaceholder = {
  unrounded?: string;
  rounded?: string;
};

export type VowelReference = Partial<
  Record<VowelHeight, Partial<Record<VowelBackness, VowelPlaceholder>>>
>;

export const consonantReference: ConsonantReference = {
  plosive: {
    bilabial: ['p', 'b'],
    labiodental: ['p̪', 'b̪'],
    dental: ['t̪', 'd̪'],
    alveolar: ['t', 'd'],
    postalveolar: ['t̠', 'd̠'],
    retroflex: ['ʈ', 'ɖ'],
    palatal: ['c', 'ɟ'],
    velar: ['k', 'ɡ'],
    uvular: ['q', 'ɢ'],
    pharyngeal: [],
    glottal: ['ʔ'],
    'labial-velar': ['k͡p', 'ɡ͡b']
  },
  nasal: {
    bilabial: ['m'],
    labiodental: ['ɱ'],
    dental: ['n̪'],
    alveolar: ['n'],
    postalveolar: ['n̠'],
    retroflex: ['ɳ'],
    palatal: ['ɲ'],
    velar: ['ŋ'],
    uvular: ['ɴ'],
    glottal: ['ŋ̈'],
    'labial-velar': ['ŋ͡m']
  },
  trill: {
    bilabial: ['ʙ'],
    alveolar: ['r'],
    uvular: ['ʀ']
  },
  tap_flap: {
    bilabial: ['ⱱ'],
    alveolar: ['ɾ'],
    retroflex: ['ɽ'],
    uvular: ['ɢ̆']
  },
  fricative: {
    bilabial: ['ɸ', 'β'],
    labiodental: ['f', 'v'],
    dental: ['θ', 'ð'],
    alveolar: ['s', 'z'],
    postalveolar: ['ʃ', 'ʒ'],
    retroflex: ['ʂ', 'ʐ'],
    palatal: ['ç', 'ʝ'],
    velar: ['x', 'ɣ'],
    uvular: ['χ', 'ʁ'],
    pharyngeal: ['ħ', 'ʕ'],
    glottal: ['h', 'ɦ'],
    'labial-velar': ['ʍ', 'w̥']
  },
  lateral_fricative: {
    alveolar: ['ɬ', 'ɮ'],
    velar: ['ʟ̝'],
    uvular: ['ʟ̝˔']
  },
  approximant: {
    bilabial: ['β̞'],
    labiodental: ['ʋ'],
    alveolar: ['ɹ'],
    retroflex: ['ɻ'],
    palatal: ['j'],
    velar: ['ɰ'],
    'labial-velar': ['w']
  },
  lateral_approximant: {
    alveolar: ['l'],
    retroflex: ['ɭ'],
    palatal: ['ʎ'],
    velar: ['ʟ']
  },
  affricate: {
    labiodental: ['t͡f', 'd͡v'],
    dental: ['t̪͡θ', 'd̪͡ð'],
    alveolar: ['t͡s', 'd͡z'],
    postalveolar: ['t͡ʃ', 'd͡ʒ'],
    retroflex: ['ʈ͡ʂ', 'ɖ͡ʐ'],
    palatal: ['c͡ç', 'ɟ͡ʝ'],
    velar: ['k͡x', 'ɡ͡ɣ'],
    uvular: ['q͡χ', 'ɢ͡ʁ'],
    'labial-velar': ['k͡pʷ']
  }
};

export const vowelReference: VowelReference = {
  close: {
    front: { unrounded: 'i', rounded: 'y' },
    'near-front': { unrounded: 'ɪ', rounded: 'ʏ' },
    central: { unrounded: 'ɨ', rounded: 'ʉ' },
    'near-back': { rounded: 'ʊ' },
    back: { unrounded: 'ɯ', rounded: 'u' }
  },
  'near-close': {
    front: { unrounded: 'ɪ', rounded: 'ʏ' },
    central: { unrounded: 'ɪ̈' },
    'near-back': { rounded: 'ʊ̟' }
  },
  'close-mid': {
    front: { unrounded: 'e', rounded: 'ø' },
    central: { unrounded: 'ɘ', rounded: 'ɵ' },
    back: { unrounded: 'ɤ', rounded: 'o' }
  },
  mid: {
    central: { unrounded: 'ə', rounded: 'ɚ' }
  },
  'open-mid': {
    front: { unrounded: 'ɛ', rounded: 'œ' },
    central: { unrounded: 'ɜ', rounded: 'ɞ' },
    back: { unrounded: 'ʌ', rounded: 'ɔ' }
  },
  'near-open': {
    front: { unrounded: 'æ' },
    central: { unrounded: 'ɐ' }
  },
  open: {
    front: { unrounded: 'a', rounded: 'ɶ' },
    central: { unrounded: 'ä', rounded: 'ɒ̈' },
    back: { unrounded: 'ɑ', rounded: 'ɒ' }
  }
};

export const languages: Language[] = [
  {
    id: 'ind',
    name: 'Indonesian',
    variety: 'Standard',
    script: 'Latin',
    notes: 'Borrowed /f v z ʃ/ occur mainly in loans.',
    phonemes: [
      { ipa: 'p', place: 'bilabial', manner: 'plosive', voicing: 'voiceless', graphemes: ['p'] },
      { ipa: 'b', place: 'bilabial', manner: 'plosive', voicing: 'voiced', graphemes: ['b'] },
      { ipa: 't', place: 'alveolar', manner: 'plosive', voicing: 'voiceless', graphemes: ['t'] },
      { ipa: 'd', place: 'alveolar', manner: 'plosive', voicing: 'voiced', graphemes: ['d'] },
      { ipa: 'k', place: 'velar', manner: 'plosive', voicing: 'voiceless', graphemes: ['k'] },
      { ipa: 'ɡ', place: 'velar', manner: 'plosive', voicing: 'voiced', graphemes: ['g'] },
      {
        ipa: 'ʔ',
        place: 'glottal',
        manner: 'plosive',
        voicing: 'voiceless',
        contexts: ['syllable-final']
      },
      {
        ipa: 't͡ʃ',
        place: 'postalveolar',
        manner: 'affricate',
        voicing: 'voiceless',
        graphemes: ['c']
      },
      {
        ipa: 'd͡ʒ',
        place: 'postalveolar',
        manner: 'affricate',
        voicing: 'voiced',
        graphemes: ['j']
      },
      { ipa: 'm', place: 'bilabial', manner: 'nasal', voicing: 'voiced', graphemes: ['m'] },
      { ipa: 'n', place: 'alveolar', manner: 'nasal', voicing: 'voiced', graphemes: ['n'] },
      { ipa: 'ɲ', place: 'palatal', manner: 'nasal', voicing: 'voiced', graphemes: ['ny'] },
      { ipa: 'ŋ', place: 'velar', manner: 'nasal', voicing: 'voiced', graphemes: ['ng'] },
      { ipa: 's', place: 'alveolar', manner: 'fricative', voicing: 'voiceless', graphemes: ['s'] },
      { ipa: 'h', place: 'glottal', manner: 'fricative', voicing: 'voiceless', graphemes: ['h'] },
      { ipa: 'r', place: 'alveolar', manner: 'trill', voicing: 'voiced', graphemes: ['r'] },
      {
        ipa: 'l',
        place: 'alveolar',
        manner: 'lateral_approximant',
        voicing: 'voiced',
        graphemes: ['l']
      },
      {
        ipa: 'w',
        place: 'labial-velar',
        manner: 'approximant',
        voicing: 'voiced',
        graphemes: ['w']
      },
      { ipa: 'j', place: 'palatal', manner: 'approximant', voicing: 'voiced', graphemes: ['y'] },
      {
        ipa: 'f',
        place: 'labiodental',
        manner: 'fricative',
        voicing: 'voiceless',
        contexts: ['loans']
      },
      {
        ipa: 'v',
        place: 'labiodental',
        manner: 'fricative',
        voicing: 'voiced',
        contexts: ['loans']
      },
      { ipa: 'z', place: 'alveolar', manner: 'fricative', voicing: 'voiced', contexts: ['loans'] },
      {
        ipa: 'ʃ',
        place: 'postalveolar',
        manner: 'fricative',
        voicing: 'voiceless',
        contexts: ['loans']
      },
      { ipa: 'i', height: 'close', backness: 'front', rounding: 'unrounded', graphemes: ['i'] },
      { ipa: 'e', height: 'close-mid', backness: 'front', rounding: 'unrounded', graphemes: ['e'] },
      { ipa: 'ə', height: 'mid', backness: 'central', rounding: 'unrounded', graphemes: ['e'] },
      { ipa: 'a', height: 'open', backness: 'front', rounding: 'unrounded', graphemes: ['a'] },
      { ipa: 'o', height: 'close-mid', backness: 'back', rounding: 'rounded', graphemes: ['o'] },
      { ipa: 'u', height: 'close', backness: 'back', rounding: 'rounded', graphemes: ['u'] }
    ],
    rules: [
      {
        name: 'e-ambiguity',
        type: 'allophone',
        phoneme: 'e',
        realizations: [
          { ipa: 'e', environment: 'stressed syllables' },
          { ipa: 'ə', environment: 'unstressed syllables' }
        ]
      }
    ]
  },
  {
    id: 'kor',
    name: 'Korean',
    variety: 'Seoul',
    script: 'Hangul',
    phonemes: [
      {
        ipa: 'p',
        place: 'bilabial',
        manner: 'plosive',
        voicing: 'voiceless',
        graphemes: ['ㅂ'],
        contexts: ['syllable-initial']
      },
      {
        ipa: 'pʰ',
        place: 'bilabial',
        manner: 'plosive',
        voicing: 'aspirated',
        graphemes: ['ㅍ'],
        contexts: ['syllable-initial']
      },
      {
        ipa: 'p̚',
        place: 'bilabial',
        manner: 'plosive',
        voicing: 'voiceless',
        graphemes: ['ㅂ'],
        contexts: ['syllable-final'],
        notes: 'Unreleased final stop'
      },
      {
        ipa: 't',
        place: 'alveolar',
        manner: 'plosive',
        voicing: 'voiceless',
        graphemes: ['ㄷ'],
        contexts: ['syllable-initial']
      },
      {
        ipa: 'tʰ',
        place: 'alveolar',
        manner: 'plosive',
        voicing: 'aspirated',
        graphemes: ['ㅌ'],
        contexts: ['syllable-initial']
      },
      {
        ipa: 't̚',
        place: 'alveolar',
        manner: 'plosive',
        voicing: 'voiceless',
        graphemes: ['ㅅ'],
        contexts: ['syllable-final'],
        notes: 'Stops neutralize in coda position'
      },
      {
        ipa: 'k',
        place: 'velar',
        manner: 'plosive',
        voicing: 'voiceless',
        graphemes: ['ㄱ'],
        contexts: ['syllable-initial']
      },
      {
        ipa: 'kʰ',
        place: 'velar',
        manner: 'plosive',
        voicing: 'aspirated',
        graphemes: ['ㅋ'],
        contexts: ['syllable-initial']
      },
      {
        ipa: 'k̚',
        place: 'velar',
        manner: 'plosive',
        voicing: 'voiceless',
        graphemes: ['ㄱ'],
        contexts: ['syllable-final']
      },
      { ipa: 's', place: 'alveolar', manner: 'fricative', voicing: 'voiceless', graphemes: ['ㅅ'] },
      {
        ipa: 'ɕ',
        place: 'postalveolar',
        manner: 'fricative',
        voicing: 'voiceless',
        graphemes: ['ㅅ'],
        contexts: ['before /i/ or /j/']
      },
      { ipa: 'm', place: 'bilabial', manner: 'nasal', voicing: 'voiced', graphemes: ['ㅁ'] },
      { ipa: 'n', place: 'alveolar', manner: 'nasal', voicing: 'voiced', graphemes: ['ㄴ'] },
      {
        ipa: 'ŋ',
        place: 'velar',
        manner: 'nasal',
        voicing: 'voiced',
        graphemes: ['ㅇ'],
        contexts: ['syllable-final']
      },
      {
        ipa: 'ɾ',
        place: 'alveolar',
        manner: 'tap_flap',
        voicing: 'voiced',
        graphemes: ['ㄹ'],
        contexts: ['intervocalic']
      },
      {
        ipa: 'l',
        place: 'alveolar',
        manner: 'lateral_approximant',
        voicing: 'voiced',
        graphemes: ['ㄹ'],
        contexts: ['syllable-final']
      },
      { ipa: 'h', place: 'glottal', manner: 'fricative', voicing: 'voiceless', graphemes: ['ㅎ'] },
      {
        ipa: 'j',
        place: 'palatal',
        manner: 'approximant',
        voicing: 'voiced',
        graphemes: ['ㅣ'],
        contexts: ['as glide']
      },
      {
        ipa: 'w',
        place: 'labial-velar',
        manner: 'approximant',
        voicing: 'voiced',
        graphemes: ['ㅗ'],
        contexts: ['as glide']
      },
      { ipa: 'i', height: 'close', backness: 'front', rounding: 'unrounded', graphemes: ['ㅣ'] },
      {
        ipa: 'e',
        height: 'close-mid',
        backness: 'front',
        rounding: 'unrounded',
        graphemes: ['ㅔ']
      },
      { ipa: 'ɛ', height: 'open-mid', backness: 'front', rounding: 'unrounded', graphemes: ['ㅐ'] },
      { ipa: 'a', height: 'open', backness: 'front', rounding: 'unrounded', graphemes: ['ㅏ'] },
      { ipa: 'ʌ', height: 'open-mid', backness: 'back', rounding: 'unrounded', graphemes: ['ㅓ'] },
      { ipa: 'o', height: 'close-mid', backness: 'back', rounding: 'rounded', graphemes: ['ㅗ'] },
      { ipa: 'u', height: 'close', backness: 'back', rounding: 'rounded', graphemes: ['ㅜ'] },
      { ipa: 'ɯ', height: 'close', backness: 'back', rounding: 'unrounded', graphemes: ['ㅡ'] }
    ],
    rules: [
      {
        name: 'aspiration',
        type: 'allophone',
        phoneme: 'p',
        realizations: [
          { ipa: 'pʰ', environment: 'word-initial stressed' },
          { ipa: 'p̚', environment: 'syllable-final' }
        ]
      }
    ]
  },
  {
    id: 'arb',
    name: 'Arabic',
    variety: 'MSA',
    script: 'Arabic',
    notes: 'Short vowels typically unwritten.',
    phonemes: [
      { ipa: 'b', place: 'bilabial', manner: 'plosive', voicing: 'voiced', graphemes: ['ب'] },
      { ipa: 't', place: 'dental', manner: 'plosive', voicing: 'voiceless', graphemes: ['ت'] },
      { ipa: 'd', place: 'dental', manner: 'plosive', voicing: 'voiced', graphemes: ['د'] },
      { ipa: 'k', place: 'velar', manner: 'plosive', voicing: 'voiceless', graphemes: ['ك'] },
      { ipa: 'q', place: 'uvular', manner: 'plosive', voicing: 'voiceless', graphemes: ['ق'] },
      { ipa: 'ʔ', place: 'glottal', manner: 'plosive', voicing: 'voiceless', graphemes: ['ء'] },
      {
        ipa: 'f',
        place: 'labiodental',
        manner: 'fricative',
        voicing: 'voiceless',
        graphemes: ['ف']
      },
      { ipa: 's', place: 'alveolar', manner: 'fricative', voicing: 'voiceless', graphemes: ['س'] },
      { ipa: 'z', place: 'alveolar', manner: 'fricative', voicing: 'voiced', graphemes: ['ز'] },
      {
        ipa: 'ʃ',
        place: 'postalveolar',
        manner: 'fricative',
        voicing: 'voiceless',
        graphemes: ['ش']
      },
      { ipa: 'χ', place: 'uvular', manner: 'fricative', voicing: 'voiceless', graphemes: ['خ'] },
      {
        ipa: 'ħ',
        place: 'pharyngeal',
        manner: 'fricative',
        voicing: 'voiceless',
        graphemes: ['ح']
      },
      { ipa: 'ʕ', place: 'pharyngeal', manner: 'fricative', voicing: 'voiced', graphemes: ['ع'] },
      { ipa: 'h', place: 'glottal', manner: 'fricative', voicing: 'voiceless', graphemes: ['ه'] },
      { ipa: 'm', place: 'bilabial', manner: 'nasal', voicing: 'voiced', graphemes: ['م'] },
      { ipa: 'n', place: 'alveolar', manner: 'nasal', voicing: 'voiced', graphemes: ['ن'] },
      {
        ipa: 'l',
        place: 'alveolar',
        manner: 'lateral_approximant',
        voicing: 'voiced',
        graphemes: ['ل']
      },
      { ipa: 'r', place: 'alveolar', manner: 'trill', voicing: 'voiced', graphemes: ['ر'] },
      {
        ipa: 'w',
        place: 'labial-velar',
        manner: 'approximant',
        voicing: 'voiced',
        graphemes: ['و']
      },
      { ipa: 'j', place: 'palatal', manner: 'approximant', voicing: 'voiced', graphemes: ['ي'] },
      {
        ipa: 'i',
        height: 'close',
        backness: 'front',
        rounding: 'unrounded',
        graphemes: ['ِ', 'ي']
      },
      { ipa: 'iː', height: 'close', backness: 'front', rounding: 'unrounded', graphemes: ['ي'] },
      { ipa: 'u', height: 'close', backness: 'back', rounding: 'rounded', graphemes: ['ُ', 'و'] },
      { ipa: 'uː', height: 'close', backness: 'back', rounding: 'rounded', graphemes: ['و'] },
      { ipa: 'a', height: 'open', backness: 'front', rounding: 'unrounded', graphemes: ['َ'] },
      { ipa: 'aː', height: 'open', backness: 'front', rounding: 'unrounded', graphemes: ['ا'] }
    ]
  }
];

export const isConsonant = (phoneme: Phoneme): phoneme is ConsonantPhoneme =>
  'place' in phoneme && 'manner' in phoneme;

export const isVowel = (phoneme: Phoneme): phoneme is VowelPhoneme =>
  'height' in phoneme && 'backness' in phoneme && 'rounding' in phoneme;
