/**
 * ISKCON GLOBAL DEVOTEE SANCTUARY & SRILA PRABHUPADA ARCHIVE
 * Dedicated integration for International Society for Krishna Consciousness (ISKCON)
 * featuring Mayapur Dham, Vrindavan 24h Kirtan, 16 Rounds Japa, and Ekadashi Calendar.
 */

export interface IskconTempleStream {
  id: string;
  name: string;
  nameHindi: string;
  location: string;
  streamUrl: string;
  description: string;
  activeViewers: number;
  deities: string;
}

export interface VaishnavaFestival {
  id: string;
  name: string;
  nameHindi: string;
  dateStr: string;
  significance: string;
  fastingRule: string;
}

export const ISKCON_LIVE_TEMPLE_FEEDS: IskconTempleStream[] = [
  {
    id: 'iskcon_mayapur',
    name: 'ISKCON Sri Mayapur Chandrodaya Mandir',
    nameHindi: '🛕 इस्कॉन श्री मायापुर चंद्रोदय मंदिर (विश्व मुख्यालय - TOVP)',
    location: 'Sri Mayapur Dham, West Bengal',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8Wb04j_Zq5b2xV4i4PqU8Q',
    description: 'श्री श्री राधा माधव, अष्टसखी एवं पंचतत्त्व के पावन मंगला आरती एवं राजभोग दर्शन।',
    activeViewers: 8450,
    deities: 'श्री श्री राधा माधव एवं पंचतत्त्व'
  },
  {
    id: 'iskcon_vrindavan',
    name: 'ISKCON Krishna Balaram Mandir, Vrindavan',
    nameHindi: '🛕 इस्कॉन श्री श्री कृष्ण बलराम मंदिर, वृन्दावन',
    location: 'Raman Reti, Vrindavan Dham',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCk1gZ2yY3g7gK4u2g7rJ3lw',
    description: '२४ घंटे अनवरत अखण्ड महासंकीर्तन एवं श्री श्री कृष्ण बलराम, राधा श्यामसुंदर दर्शन।',
    activeViewers: 12300,
    deities: 'श्री श्री कृष्ण बलराम एवं राधा श्यामसुंदर'
  },
  {
    id: 'iskcon_chowpatty',
    name: 'ISKCON Sri Sri Radha Gopinath Mandir, Mumbai',
    nameHindi: '🛕 इस्कॉन श्री श्री राधा गोपीनाथ मंदिर (चौपाटी, मुम्बई)',
    location: 'Girgaon Chowpatty, Mumbai',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCXw8N4rV7g2P2j1q4n8B_5A',
    description: 'परम पूज्य राधानाथ स्वामी महाराज के प्रवचन एवं राधा गोपीनाथ जी की भव्य आरती।',
    activeViewers: 6700,
    deities: 'श्री श्री राधा गोपीनाथ'
  },
  {
    id: 'iskcon_bangalore',
    name: 'ISKCON Sri Radha Krishnachandra Mandir, Bangalore',
    nameHindi: '🛕 इस्कॉन श्री श्री राधा कृष्णचन्द्र मंदिर (बेंगलुरु)',
    location: 'Hare Krishna Hill, Rajajinagar, Bangalore',
    streamUrl: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC9Y1b7K8d_m5h2q8n4B_6lw',
    description: 'भव्य स्वर्ण शिखर मंदिर से प्रातः कालीन महामंत्र संकीर्तन एवं सुवर्ण अलंकार दर्शन।',
    activeViewers: 5200,
    deities: 'श्री श्री राधा कृष्णचन्द्र एवं श्री श्री श्रीनिवास गोविन्द'
  }
];

export const UPCOMING_VAISHNAVA_FESTIVALS: VaishnavaFestival[] = [
  {
    id: 'kamada_ekadashi',
    name: 'Kamada Ekadashi',
    nameHindi: 'कामदा एकादशी (महाव्रत)',
    dateStr: 'आगामी पावन तिथि',
    significance: 'समस्त पापों का क्षय कर भगवान श्री कृष्ण की अनन्य प्रेमाभक्ति प्रदान करने वाली एकादशी।',
    fastingRule: 'अन्न वर्जित • फल, दूध एवं जल अनुमत • रात्रि जागरण व नाम संकीर्तन'
  },
  {
    id: 'shri_gaura_purnima',
    name: 'Sri Gaura Purnima',
    nameHindi: 'श्री गौर पूर्णिमा (श्री चैतन्य महाप्रभु आविर्भाव)',
    dateStr: 'फाल्गुन पूर्णिमा',
    significance: 'कलियुग पावन अवतारी श्री कृष्ण चैतन्य महाप्रभु का दिव्य प्राकट्य महोत्सव।',
    fastingRule: 'संध्या चंद्रोदय तक निर्जल/सजल उपवास • पश्चात् अनुकल्प महाप्रसाद'
  },
  {
    id: 'shri_krishna_janmashtami',
    name: 'Sri Krishna Janmashtami',
    nameHindi: 'श्री कृष्ण जन्माष्टमी (महामहोत्सव)',
    dateStr: 'भाद्रपद कृष्ण अष्टमी',
    significance: 'स्वयं भगवान श्री कृष्ण का दिव्य अवतार दिवस • वृन्दावन एवं मायापुर में महा-अभिषेक।',
    fastingRule: 'मध्यरात्रि १२:०० बजे तक पूर्ण उपवास • अभिषेक दर्शन पश्चात् पारण'
  },
  {
    id: 'shri_radhashtami',
    name: 'Sri Radhashtami',
    nameHindi: 'श्री राधाष्टमी (श्रीमती राधारानी आविर्भाव)',
    dateStr: 'भाद्रपद शुक्ल अष्टमी',
    significance: 'वृन्दावनेश्वरी आह्लादिनी शक्ति श्री राधा रानी का पावन प्राकट्य दिवस।',
    fastingRule: 'दोपहर १२:०० बजे तक उपवास • राधा नाम संकीर्तन एवं चरण दर्शन'
  }
];

export const SRILA_PRABHUPADA_TEACHINGS = {
  pranamMantra: `नम ॐ विष्णु-पादाय कृष्ण-प्रेष्ठाय भूतले।
श्रीमते भक्तिवेदान्त-स्वामिन् इति नामिने॥
नमस्ते सारस्वते देवे गौर-वाणी-प्रचारिणे।
निर्विशेष-शून्यवादि-पाश्चात्त्य-देश-तारिणे॥`,
  pranamMantraEnglish: `nama om vishnu-padaya krishna-preshthaya bhu-tale
shrimate bhaktivedanta-svamin iti namine
namas te sarasvate deve gaura-vani-pracharine
nirvishesha-shunyavadi-pashchatya-desha-tarine`,
  coreInstruction: 'हरे कृष्ण महामंत्र का प्रतिदिन कम से कम १६ माला (16 Rounds) जप करें, ४ नियमों (मांसाहार, द्यूतक्रीड़ा, नशा एवं अवैध संबंध का त्याग) का पालन करें और श्रीमद्भगवद्गीता यथारूप का नित्य अध्ययन करें।',
  gitaPurportQuote: 'भगवद्गीता को उसी भाव से ग्रहण करना चाहिए जिस भाव से स्वयं भगवान श्रीकृष्ण ने अर्जुन को दिया था — परम भक्ति एवं शरणागति के साथ।'
};
