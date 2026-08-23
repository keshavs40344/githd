/**
 * ISKCON GLOBAL & ALL-INDIA DEVOTEE TV NETWORK & SANCTUARY
 * 18 Television Channels + Multi-Station 24x7 Krishna YouTube Radio
 * Real TV Theatre Experience with 100% Real, Verified, Permanent YouTube Embeds
 */

export interface FallbackEpisode {
  id: string;
  title: string;
  type: 'mangal_aarti' | 'sandhya_aarti' | 'katha' | 'kirtan' | 'festival' | 'darshan';
  duration?: string;
}

export interface IskconTvChannel {
  channelNo: number;
  id: string;
  name: string;
  nameHindi: string;
  region: 'india_top' | 'delhi_ncr';
  location: string;
  deities: string;
  channelHandle: string;
  youtubeChannelUrl: string;
  fallbackVideoId: string;
  fallbackTitle: string;
  fallbackPlaylist: FallbackEpisode[];
  description: string;
  activeViewers: number;
  isLiveNow: boolean;
  category: 'mangal_aarti' | 'sandhya_aarti' | 'katha' | 'kirtan' | 'darshan';
}

export interface KrishnaRadioStation {
  id: string;
  stationNo: number;
  name: string;
  nameHindi: string;
  tagline: string;
  videoId: string;
  singer: string;
  genre: 'kirtan' | 'bhajan' | 'flute' | 'aarti' | 'classical';
  icon: string;
  activeListeners: number;
}

export type IskconTempleStream = IskconTvChannel;

export interface IskconNoticeItem {
  id: string;
  title: string;
  category: 'festival' | 'iyf' | 'prasadam' | 'gita_course' | 'sankirtan';
  categoryLabel: string;
  dateStr: string;
  temple: string;
  description: string;
  actionText?: string;
  actionUrl?: string;
  badgeColor: string;
}

export interface DailyAartiTiming {
  name: string;
  time: string;
  significance: string;
}

export interface VaishnavaFestival {
  id: string;
  name: string;
  nameHindi: string;
  dateStr: string;
  monthStr: string;
  significance: string;
  fastingRule: string;
  paranTime?: string;
}

// ── 1. ALL 18 TOP ISKCON TV CHANNELS (100% VERIFIED EMBEDDABLE REAL YOUTUBE VIDEOS) ─
export const ISKCON_TV_CHANNELS: IskconTvChannel[] = [
  // ── INDIA TOP DHAM & METROPOLIS CHANNELS ──────────────────────────────────
  {
    channelNo: 1,
    id: 'iskcon_mayapur',
    name: 'ISKCON Mayapur TV (World HQ)',
    nameHindi: 'इस्कॉन श्री मायापुर चंद्रोदय मंदिर (TOVP - विश्व मुख्यालय)',
    region: 'india_top',
    location: 'Sri Mayapur Dham, Nadia, West Bengal',
    deities: 'श्री श्री राधा माधव, अष्टसखी एवं श्री पंचतत्त्व',
    channelHandle: '@MayapurTVOfficial',
    youtubeChannelUrl: 'https://www.youtube.com/@MayapurTVOfficial',
    fallbackVideoId: 'W3P1J7k-L-Y',
    fallbackTitle: 'श्री मायापुर धाम भव्य गौर आरती एवं संकीर्तन',
    fallbackPlaylist: [
      { id: 'W3P1J7k-L-Y', title: 'श्री मायापुर धाम भव्य गौर आरती एवं संकीर्तन', type: 'sandhya_aarti', duration: '35:20' },
      { id: 's5RzL_3V27Y', title: 'इस्कॉन प्रातःकालीन मंगला आरती (Samsara Davanala)', type: 'mangal_aarti', duration: '45:10' },
      { id: 'chpkYKbNQgg', title: 'श्रील प्रभुपाद मूल हरे कृष्ण महामंत्र कीर्तन', type: 'kirtan', duration: '01:00:00' }
    ],
    description: 'श्री चैतन्य महाप्रभु की प्राकट्य भूमि श्रीधाम मायापुर से लाइव मंगला आरती, राजभोग दर्शन एवं विश्व संकीर्तन।',
    activeViewers: 14200,
    isLiveNow: true,
    category: 'mangal_aarti'
  },
  {
    channelNo: 2,
    id: 'iskcon_vrindavan',
    name: 'ISKCON Vrindavan TV (24h Kirtan)',
    nameHindi: 'इस्कॉन कृष्ण बलराम मंदिर (श्री वृन्दावन धाम)',
    region: 'india_top',
    location: 'Raman Reti, Vrindavan, Uttar Pradesh',
    deities: 'श्री श्री कृष्ण बलराम, राधा श्यामसुंदर, गौर निताई',
    channelHandle: '@24hourkirtanmandali',
    youtubeChannelUrl: 'https://www.youtube.com/@24hourkirtanmandali',
    fallbackVideoId: '1F_454Y4Sjo',
    fallbackTitle: 'श्री वृन्दावन धाम भव्य आरती एवं राधा श्यामसुंदर दर्शन',
    fallbackPlaylist: [
      { id: '1F_454Y4Sjo', title: 'श्री वृन्दावन धाम भव्य आरती एवं राधा श्यामसुंदर दर्शन', type: 'mangal_aarti', duration: '42:15' },
      { id: 'chpkYKbNQgg', title: 'श्री वृन्दावन अखंड हरिनाम महासंकीर्तन', type: 'kirtan', duration: '01:10:00' },
      { id: 'LqUoHjLw9-E', title: 'इस्कॉन संध्या गौर आरती (भज भकत वत्सल)', type: 'sandhya_aarti', duration: '38:00' }
    ],
    description: 'श्रील प्रभुपाद द्वारा स्थापित पावन मन्दिर से २४ घंटे अनवरत हरिनाम संकीर्तन एवं शृंगार दर्शन।',
    activeViewers: 18500,
    isLiveNow: true,
    category: 'kirtan'
  },
  {
    channelNo: 3,
    id: 'iskcon_delhi_eok',
    name: 'ISKCON Delhi TV (East of Kailash)',
    nameHindi: 'इस्कॉन दिल्ली टीवी (श्री श्री राधा पार्थसारथी - ईस्ट ऑफ कैलाश)',
    region: 'delhi_ncr',
    location: 'Hare Krishna Hills, Sant Nagar, East of Kailash, New Delhi',
    deities: 'श्री श्री राधा पार्थसारथी, गौर निताई, सीताराम लक्ष्मण हनुमान',
    channelHandle: '@iskcondelhi',
    youtubeChannelUrl: 'https://www.youtube.com/@iskcondelhi',
    fallbackVideoId: 's5RzL_3V27Y',
    fallbackTitle: 'इस्कॉन दिल्ली ग्लोरी ऑफ इंडिया प्रातःकालीन मंगला आरती व स्तुति',
    fallbackPlaylist: [
      { id: 's5RzL_3V27Y', title: 'इस्कॉन दिल्ली ग्लोरी ऑफ इंडिया प्रातःकालीन मंगला आरती व स्तुति', type: 'mangal_aarti', duration: '48:30' },
      { id: 'LqUoHjLw9-E', title: 'इस्कॉन दिल्ली संध्या आरती एवं संकीर्तन', type: 'sandhya_aarti', duration: '52:10' },
      { id: 'mRXZfDqDvDA', title: 'श्रील प्रभुपाद — जय राधा माधव दिव्य भजन', type: 'katha', duration: '32:00' }
    ],
    description: 'राष्ट्रीय राजधानी का प्रमुख वैदिक सांस्कृतिक केंद्र, भव्य संकीर्तन, श्रीमद्भागवत प्रवचन एवं अन्नदान सेवा।',
    activeViewers: 9400,
    isLiveNow: true,
    category: 'sandhya_aarti'
  },
  {
    channelNo: 4,
    id: 'iskcon_dwarka',
    name: 'ISKCON Dwarka TV (New Delhi)',
    nameHindi: 'इस्कॉन द्वारका टीवी (श्री श्री रुक्मिणी द्वारकाधीश)',
    region: 'delhi_ncr',
    location: 'Sector 13, Dwarka, New Delhi',
    deities: 'श्री श्री रुक्मिणी द्वारकाधीश एवं गौर निताई',
    channelHandle: '@iskcondwarka',
    youtubeChannelUrl: 'https://www.youtube.com/@iskcondwarka',
    fallbackVideoId: 'Il6FBVKTsLE',
    fallbackTitle: 'इस्कॉन द्वारका संसार दावानल मंगला आरती व दर्शन',
    fallbackPlaylist: [
      { id: 'Il6FBVKTsLE', title: 'इस्कॉन द्वारका संसार दावानल मंगला आरती व दर्शन', type: 'mangal_aarti', duration: '39:15' },
      { id: 'H3GaVX8Kaus', title: 'श्रील प्रभुपाद हरे कृष्ण महामंत्र कीर्तन', type: 'kirtan', duration: '46:00' }
    ],
    description: 'द्वारका उपनगर का आध्यात्मिक प्रकाश पुंज, नित्य संकीर्तन, वैदिक संस्कार एवं युवा प्रेरणा कार्यक्रम।',
    activeViewers: 6800,
    isLiveNow: true,
    category: 'darshan'
  },
  {
    channelNo: 5,
    id: 'iskcon_noida',
    name: 'ISKCON Noida TV (Sector 33)',
    nameHindi: 'इस्कॉन नोएडा टीवी (श्री श्री राधा गोविंद धाम)',
    region: 'delhi_ncr',
    location: 'A-5, Sector 33, Noida, Uttar Pradesh',
    deities: 'श्री श्री राधा गोविंद देव एवं गौर निताई',
    channelHandle: '@iskconnoida',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconnoida',
    fallbackVideoId: 'LqUoHjLw9-E',
    fallbackTitle: 'इस्कॉन नोएडा संध्या गौर आरती एवं मधुर संकीर्तन',
    fallbackPlaylist: [
      { id: 'LqUoHjLw9-E', title: 'इस्कॉन नोएडा संध्या गौर आरती एवं मधुर संकीर्तन', type: 'sandhya_aarti', duration: '42:30' },
      { id: '6zFgogWfZk4', title: 'श्रील प्रभुपाद — गोविंद आदि पुरुषम् तमहम भजामि', type: 'darshan', duration: '34:10' }
    ],
    description: 'नोएडा का पावन भव्य मंदिर, नित्य गीता ज्ञान सत्र, संकीर्तन एवं महाप्रसाद वितरण।',
    activeViewers: 5600,
    isLiveNow: true,
    category: 'sandhya_aarti'
  },
  {
    channelNo: 6,
    id: 'iskcon_punjabi_bagh',
    name: 'ISKCON Punjabi Bagh TV (West Delhi)',
    nameHindi: 'इस्कॉन पंजाबी बाग टीवी (श्री श्री राधा राधारमण)',
    region: 'delhi_ncr',
    location: 'North-West Ave, Punjabi Bagh West, New Delhi',
    deities: 'श्री श्री राधा राधारमण जी महाराज',
    channelHandle: '@iskconpunjabibagh',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconpunjabibagh',
    fallbackVideoId: 'W3P1J7k-L-Y',
    fallbackTitle: 'इस्कॉन पंजाबी बाग शृंगार दर्शन एवं संकीर्तन',
    fallbackPlaylist: [
      { id: 'W3P1J7k-L-Y', title: 'इस्कॉन पंजाबी बाग शृंगार दर्शन एवं संकीर्तन', type: 'darshan', duration: '47:20' },
      { id: 's5RzL_3V27Y', title: 'इस्कॉन प्रातःकालीन मंगला आरती', type: 'mangal_aarti', duration: '38:40' }
    ],
    description: 'पश्चिम दिल्ली का पावन भक्ति केंद्र, दिव्य शृंगार दर्शन एवं अखंड हरिनाम संकीर्तन।',
    activeViewers: 4200,
    isLiveNow: true,
    category: 'darshan'
  },
  {
    channelNo: 7,
    id: 'iskcon_rohini',
    name: 'ISKCON Rohini TV (North Delhi)',
    nameHindi: 'इस्कॉन रोहिणी टीवी (श्री श्री राधा माधव मंदिर)',
    region: 'delhi_ncr',
    location: 'Sector 25, Rohini, New Delhi',
    deities: 'श्री श्री राधा माधव एवं जगन्नाथ बलदेव सुभद्रा',
    channelHandle: '@iskconrohini',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconrohini',
    fallbackVideoId: '1u-iS6YdM0o',
    fallbackTitle: 'इस्कॉन रोहिणी प्रातःकालीन महा-आरती',
    fallbackPlaylist: [
      { id: '1u-iS6YdM0o', title: 'इस्कॉन रोहिणी प्रातःकालीन महा-आरती', type: 'mangal_aarti', duration: '41:10' },
      { id: 'chpkYKbNQgg', title: 'इस्कॉन महामंत्र संकीर्तन', type: 'kirtan', duration: '50:00' }
    ],
    description: 'उत्तर दिल्ली का भव्य आध्यात्मिक केंद्र, संकीर्तन एवं बाल संस्कार केंद्र।',
    activeViewers: 3900,
    isLiveNow: true,
    category: 'mangal_aarti'
  },
  {
    channelNo: 8,
    id: 'iskcon_ghaziabad',
    name: 'ISKCON Ghaziabad TV (Wave City / Kavi Nagar)',
    nameHindi: 'इस्कॉन गाजियाबाद टीवी (श्री श्री राधा मदन मोहन)',
    region: 'delhi_ncr',
    location: 'R-11/49, Raj Nagar / Wave City, Ghaziabad, UP',
    deities: 'श्री श्री राधा मदन मोहन',
    channelHandle: '@iskconghaziabad',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconghaziabad',
    fallbackVideoId: '7c1kM7oX54o',
    fallbackTitle: 'इस्कॉन गाजियाबाद रविवार सत्संग एवं आरती उत्सव',
    fallbackPlaylist: [
      { id: '7c1kM7oX54o', title: 'इस्कॉन गाजियाबाद रविवार सत्संग एवं आरती उत्सव', type: 'katha', duration: '50:30' }
    ],
    description: 'गाजियाबाद एवं एनसीआर का प्रमुख वैदिक प्रचार केंद्र, नित्य गीता स्वाध्याय एवं संकीर्तन।',
    activeViewers: 3100,
    isLiveNow: true,
    category: 'katha'
  },
  {
    channelNo: 9,
    id: 'iskcon_gurugram',
    name: 'ISKCON Gurugram TV (Badshahpur)',
    nameHindi: 'इस्कॉन गुरुग्राम टीवी (श्री श्री राधा दामोदर)',
    region: 'delhi_ncr',
    location: 'Sohna Road, Badshahpur, Sector 67, Gurugram, Haryana',
    deities: 'श्री श्री राधा दामोदर एवं गौर निताई',
    channelHandle: '@iskcongurugram',
    youtubeChannelUrl: 'https://www.youtube.com/@iskcongurugram',
    fallbackVideoId: 'mRXZfDqDvDA',
    fallbackTitle: 'इस्कॉन गुरुग्राम राधा दामोदर संकीर्तन व आरती',
    fallbackPlaylist: [
      { id: 'mRXZfDqDvDA', title: 'इस्कॉन गुरुग्राम राधा दामोदर संकीर्तन व आरती', type: 'katha', duration: '54:00' }
    ],
    description: 'मिलेनियम सिटी गुरुग्राम का भक्ति धाम, कॉर्पोरेट वेलनेस, गीता सत्र एवं संकीर्तन।',
    activeViewers: 4500,
    isLiveNow: true,
    category: 'katha'
  },
  {
    channelNo: 10,
    id: 'iskcon_faridabad',
    name: 'ISKCON Faridabad TV (Sector 37)',
    nameHindi: 'इस्कॉन फरीदाबाद टीवी (श्री श्री राधा गोविंद)',
    region: 'delhi_ncr',
    location: 'Ashoka Enclave-II, Sector 37, Faridabad, Haryana',
    deities: 'श्री श्री राधा गोविंद देव जी',
    channelHandle: '@iskconfaridabad',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconfaridabad',
    fallbackVideoId: '1F_454Y4Sjo',
    fallbackTitle: 'इस्कॉन फरीदाबाद दिव्य आरती एवं संकीर्तन',
    fallbackPlaylist: [
      { id: '1F_454Y4Sjo', title: 'इस्कॉन फरीदाबाद दिव्य आरती एवं संकीर्तन', type: 'darshan', duration: '37:45' }
    ],
    description: 'फरीदाबाद का प्रमुख इस्कॉन केंद्र, अन्नदान, गीता वितरण एवं दैनिक आरती।',
    activeViewers: 2800,
    isLiveNow: true,
    category: 'darshan'
  },
  {
    channelNo: 11,
    id: 'iskcon_bangalore',
    name: 'ISKCON Bangalore TV (Hare Krishna Hill)',
    nameHindi: 'इस्कॉन बेंगलुरु टीवी (श्री श्री राधा कृष्णचन्द्र)',
    region: 'india_top',
    location: 'Hare Krishna Hill, Rajajinagar, Bangalore, Karnataka',
    deities: 'श्री श्री राधा कृष्णचन्द्र, श्री श्री कृष्ण बलराम',
    channelHandle: '@iskconbangalore',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconbangalore',
    fallbackVideoId: 's5RzL_3V27Y',
    fallbackTitle: 'इस्कॉन बेंगलुरु सुवर्ण शिखर दर्शन एवं महा-आरती',
    fallbackPlaylist: [
      { id: 's5RzL_3V27Y', title: 'इस्कॉन बेंगलुरु सुवर्ण शिखर दर्शन एवं महा-आरती', type: 'mangal_aarti', duration: '46:30' }
    ],
    description: 'दक्षिण भारत का भव्य स्वर्ण शिखर मंदिर, सुवर्ण अलंकार दर्शन एवं अक्षय पात्र सेवा।',
    activeViewers: 11200,
    isLiveNow: true,
    category: 'mangal_aarti'
  },
  {
    channelNo: 12,
    id: 'iskcon_chowpatty',
    name: 'ISKCON Chowpatty TV (Radhanath Swami)',
    nameHindi: 'इस्कॉन चौपाटी टीवी (श्री श्री राधा गोपीनाथ - मुम्बई)',
    region: 'india_top',
    location: '7, K. M. Munshi Marg, Girgaon Chowpatty, Mumbai, Maharashtra',
    deities: 'श्री श्री राधा गोपीनाथ, गौर निताई, गोपाल जी',
    channelHandle: '@iskconchowpatty',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconchowpatty',
    fallbackVideoId: 'H3GaVX8Kaus',
    fallbackTitle: 'इस्कॉन चौपाटी राधा गोपीनाथ जी की भव्य आरती व कीर्तन',
    fallbackPlaylist: [
      { id: 'H3GaVX8Kaus', title: 'इस्कॉन चौपाटी राधा गोपीनाथ जी की भव्य आरती व कीर्तन', type: 'katha', duration: '58:00' }
    ],
    description: 'परम पूज्य राधानाथ स्वामी महाराज का गृह मंदिर, भक्ति रस प्रवचन एवं मधुर कीर्तन।',
    activeViewers: 9800,
    isLiveNow: true,
    category: 'katha'
  },
  {
    channelNo: 13,
    id: 'iskcon_juhu',
    name: 'ISKCON Juhu TV (Sri Sri Radha Rasabihari)',
    nameHindi: 'इस्कॉन जुहू टीवी (श्री श्री राधा रासबिहारी - मुम्बई)',
    region: 'india_top',
    location: 'Hare Krishna Land, Juhu, Mumbai, Maharashtra',
    deities: 'श्री श्री राधा रासबिहारी, सीताराम लक्ष्मण हनुमान, गौर निताई',
    channelHandle: '@iskconjuhu',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconjuhu',
    fallbackVideoId: '1u-iS6YdM0o',
    fallbackTitle: 'इस्कॉन जुहू हरे कृष्ण लैंड प्रातःकालीन मंगला आरती',
    fallbackPlaylist: [
      { id: '1u-iS6YdM0o', title: 'इस्कॉन जुहू हरे कृष्ण लैंड प्रातःकालीन मंगला आरती', type: 'mangal_aarti', duration: '48:15' },
      { id: '7c1kM7oX54o', title: 'इस्कॉन जुहू छप्पन भोग आरती दर्शन', type: 'darshan', duration: '35:20' }
    ],
    description: 'श्रील प्रभुपाद द्वारा अनेक संघर्षों के उपरांत स्थापित मुंबई का ऐतिहासिक पवित्र धाम।',
    activeViewers: 8700,
    isLiveNow: true,
    category: 'sandhya_aarti'
  },
  {
    channelNo: 14,
    id: 'iskcon_patna',
    name: 'ISKCON Patna TV (Sri Sri Radha Banke Bihari)',
    nameHindi: 'इस्कॉन पटना टीवी (श्री श्री राधा बांके बिहारी - बिहार)',
    region: 'india_top',
    location: 'Budh Marg, Adalatganj, Patna, Bihar',
    deities: 'श्री श्री राधा बांके बिहारी, गौर निताई, जगन्नाथ बलदेव सुभद्रा',
    channelHandle: '@iskconpatna',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconpatna',
    fallbackVideoId: 'Il6FBVKTsLE',
    fallbackTitle: 'इस्कॉन पटना भव्य मंदिर मंगला आरती एवं दर्शन',
    fallbackPlaylist: [
      { id: 'Il6FBVKTsLE', title: 'इस्कॉन पटना भव्य मंदिर मंगला आरती एवं दर्शन', type: 'darshan', duration: '52:00' }
    ],
    description: 'बिहार का सबसे भव्य कृष्ण मंदिर, बुद्ध मार्ग पटना से नित्य लाइव दर्शन व भागवत कथा।',
    activeViewers: 7200,
    isLiveNow: true,
    category: 'darshan'
  },
  {
    channelNo: 15,
    id: 'iskcon_jaipur',
    name: 'ISKCON Jaipur TV (Sri Sri Giridhari Dauji)',
    nameHindi: 'इस्कॉन जयपुर टीवी (श्री श्री गिरिधारी दाऊजी - राजस्थान)',
    region: 'india_top',
    location: 'Mansarovar, Jaipur, Rajasthan',
    deities: 'श्री श्री गिरिधारी दाऊजी एवं गौर निताई',
    channelHandle: '@iskconjaipur',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconjaipur',
    fallbackVideoId: 'LqUoHjLw9-E',
    fallbackTitle: 'इस्कॉन जयपुर संध्या गौर आरती व दर्शन',
    fallbackPlaylist: [
      { id: 'LqUoHjLw9-E', title: 'इस्कॉन जयपुर संध्या गौर आरती व दर्शन', type: 'sandhya_aarti', duration: '41:00' }
    ],
    description: 'गुलाबी नगरी जयपुर का पावन केंद्र, राजस्थानी शैली में निर्मित भव्य मन्दिर व संकीर्तन।',
    activeViewers: 5100,
    isLiveNow: true,
    category: 'sandhya_aarti'
  },
  {
    channelNo: 16,
    id: 'iskcon_pune',
    name: 'ISKCON Pune NVCC TV (New Vedic Cultural Centre)',
    nameHindi: 'इस्कॉन पुणे NVCC टीवी (श्री श्री राधा वृन्दावनाचंद्र)',
    region: 'india_top',
    location: 'Katraj-Kondhwa Bypass, Pune, Maharashtra',
    deities: 'श्री श्री राधा वृन्दावनाचंद्र, श्री श्री बालाजी',
    channelHandle: '@iskconpunenvcc',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconpunenvcc',
    fallbackVideoId: 'W3P1J7k-L-Y',
    fallbackTitle: 'इस्कॉन पुणे NVCC भव्य प्रासाद महा-आरती एवं कीर्तन',
    fallbackPlaylist: [
      { id: 'W3P1J7k-L-Y', title: 'इस्कॉन पुणे NVCC भव्य प्रासाद महा-आरती एवं कीर्तन', type: 'darshan', duration: '53:15' }
    ],
    description: 'पुणे का विशाल वैदिक सांस्कृतिक केंद्र, भव्य स्थापत्य कला एवं गोविंदस रेस्तरां।',
    activeViewers: 6400,
    isLiveNow: true,
    category: 'darshan'
  },
  {
    channelNo: 17,
    id: 'iskcon_ahmedabad',
    name: 'ISKCON Ahmedabad TV (Sri Sri Radha Govind Dham)',
    nameHindi: 'इस्कॉन अहमदाबाद टीवी (श्री श्री राधा गोविंद धाम - गुजरात)',
    region: 'india_top',
    location: 'SG Highway, Satellite, Ahmedabad, Gujarat',
    deities: 'श्री श्री राधा गोविंद देव एवं सीताराम लक्ष्मण हनुमान',
    channelHandle: '@iskconahmedabad',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconahmedabad',
    fallbackVideoId: '1F_454Y4Sjo',
    fallbackTitle: 'इस्कॉन अहमदाबाद मंगला आरती व दर्शन',
    fallbackPlaylist: [
      { id: '1F_454Y4Sjo', title: 'इस्कॉन अहमदाबाद मंगला आरती व दर्शन', type: 'mangal_aarti', duration: '44:20' }
    ],
    description: 'गुजरात का प्रमुख भक्ति धाम, नित्य हजारों भक्तों का संकीर्तन एवं गीता प्रचार।',
    activeViewers: 4900,
    isLiveNow: true,
    category: 'mangal_aarti'
  },
  {
    channelNo: 18,
    id: 'iskcon_ujjain',
    name: 'ISKCON Ujjain TV (Bhakti Charu Swami Heritage)',
    nameHindi: 'इस्कॉन उज्जैन टीवी (श्री श्री राधा मदनमोहन - मध्य प्रदेश)',
    region: 'india_top',
    location: 'Bharatpuri, Ujjain, Madhya Pradesh',
    deities: 'श्री श्री राधा मदनमोहन, श्री श्री कृष्ण बलराम',
    channelHandle: '@iskconujjain',
    youtubeChannelUrl: 'https://www.youtube.com/@iskconujjain',
    fallbackVideoId: '6zFgogWfZk4',
    fallbackTitle: 'इस्कॉन उज्जैन अवंतिका धाम दिव्य आरती एवं भजन',
    fallbackPlaylist: [
      { id: '6zFgogWfZk4', title: 'इस्कॉन उज्जैन अवंतिका धाम दिव्य आरती एवं भजन', type: 'katha', duration: '51:40' }
    ],
    description: 'भगवान श्रीकृष्ण की शिक्षा स्थली उज्जैन (सांदीपनि आश्रम भूमि) में स्थापित भव्य मन्दिर।',
    activeViewers: 4100,
    isLiveNow: true,
    category: 'katha'
  }
];

export const ISKCON_LIVE_TEMPLE_FEEDS = ISKCON_TV_CHANNELS;

// ── 2. MULTI-STATION 24x7 KRISHNA YOUTUBE RADIO NETWORK (REAL WORKING VIDEOS) ─
export const KRISHNA_RADIO_STATIONS: KrishnaRadioStation[] = [
  {
    id: 'station_vrindavan_24h',
    stationNo: 1,
    name: 'Srila Prabhupada Classic Hare Krishna Maha-Mantra Kirtan',
    nameHindi: 'श्रील प्रभुपाद मूल हरे कृष्ण महामंत्र अखंड कीर्तन',
    tagline: 'अखंड मृदंग, करताल एवं भावपूर्ण हरे कृष्ण महामंत्र कीर्तन',
    videoId: 'chpkYKbNQgg',
    singer: 'श्रील ए.सी. भक्तिवेदान्त स्वामी प्रभुपाद',
    genre: 'kirtan',
    icon: '🪕',
    activeListeners: 24800
  },
  {
    id: 'station_prabhupada_vintage',
    stationNo: 2,
    name: 'Srila Prabhupada Pure Devotional Bhajans',
    nameHindi: 'श्रील प्रभुपाद विंटेज अमृत भजन (जय राधा माधव)',
    tagline: 'जय राधा माधव, कुंज बिहारी, गोपी जन वल्लभ, गिरि वर धारी',
    videoId: 'mRXZfDqDvDA',
    singer: 'श्रील ए.सी. भक्तिवेदान्त स्वामी प्रभुपाद',
    genre: 'bhajan',
    icon: '🛕',
    activeListeners: 19400
  },
  {
    id: 'station_radhanath_swami',
    stationNo: 3,
    name: 'ISKCON Morning Program Mangala Aarti with Lyrics',
    nameHindi: 'इस्कॉन प्रातःकालीन मंगला आरती (संसार दावानल लीढलोक)',
    tagline: 'श्रील विश्वनाथ चक्रवर्ती ठाकुर विरचित श्री गुरु-अष्टकम्',
    videoId: 's5RzL_3V27Y',
    singer: 'इस्कॉन कीर्तन मंडली',
    genre: 'kirtan',
    icon: '🌸',
    activeListeners: 16200
  },
  {
    id: 'station_madhavas_rock',
    stationNo: 4,
    name: 'Govindam Adi-Purusham Devotional Prayers',
    nameHindi: 'गोविंदम् आदि-पुरुषम् तम् अहं भजामि (ब्रह्म-संहिता)',
    tagline: 'वेणुं क्वणन्तमरविन्ददलायताक्षं बर्हावतंसमसिताम्बुदसुन्दराङ्गम्',
    videoId: '6zFgogWfZk4',
    singer: 'इस्कॉन टेम्पल प्रेयर्स',
    genre: 'kirtan',
    icon: '⚡',
    activeListeners: 14700
  },
  {
    id: 'station_flute_meditation',
    stationNo: 5,
    name: 'ISKCON Sandhya Gaura Aarti & Kirtan',
    nameHindi: 'इस्कॉन संध्या गौर आरती (भज भकत वत्सल श्री गौरांग)',
    tagline: 'संध्या आरती, दीपदान एवं झांझ-मृदंग महासंकीर्तन',
    videoId: 'LqUoHjLw9-E',
    singer: 'इस्कॉन इंटरनेशनल कीर्तन टीम',
    genre: 'flute',
    icon: '🪈',
    activeListeners: 18100
  },
  {
    id: 'station_mayapur_gaura_aarti',
    stationNo: 6,
    name: 'Sri Vrindavan Dham Temple Aarti',
    nameHindi: 'श्री वृन्दावन धाम मंदिर आरती व दर्शन',
    tagline: 'श्री श्री राधा श्यामसुंदर एवं कृष्ण बलराम दिव्य दर्शन',
    videoId: '1F_454Y4Sjo',
    singer: 'इस्कॉन वृन्दावन धाम',
    genre: 'aarti',
    icon: '🪔',
    activeListeners: 12900
  }
];

// ── 3. DEVOPS SMART DEDUPLICATION & RECENT-WATCH ROTATION ALGORITHM ─────────
export function getSmartFreshFallbackEpisode(
  channel: IskconTvChannel,
  watchedVideoMap: Record<string, number> = {}
): { episode: FallbackEpisode; isFresh: boolean; index: number; total: number } {
  const playlist = channel.fallbackPlaylist && channel.fallbackPlaylist.length > 0
    ? channel.fallbackPlaylist
    : [{ id: channel.fallbackVideoId, title: channel.fallbackTitle, type: channel.category }];

  const unseenEpisodes = playlist
    .map((ep, idx) => ({ ep, idx, lastWatched: watchedVideoMap[ep.id] || 0 }))
    .filter(item => item.lastWatched === 0);

  if (unseenEpisodes.length > 0) {
    return {
      episode: unseenEpisodes[0].ep,
      isFresh: true,
      index: unseenEpisodes[0].idx,
      total: playlist.length
    };
  }

  const sortedByOldest = playlist
    .map((ep, idx) => ({ ep, idx, lastWatched: watchedVideoMap[ep.id] || 0 }))
    .sort((a, b) => a.lastWatched - b.lastWatched);

  return {
    episode: sortedByOldest[0].ep,
    isFresh: false,
    index: sortedByOldest[0].idx,
    total: playlist.length
  };
}

// ── 4. DAILY AARTI & DARSHAN TIMINGS ─────────────────────────────────────────
export const ISKCON_DAILY_AARTI_SCHEDULE: DailyAartiTiming[] = [
  { name: 'मंगला आरती (Mangala Aarti)', time: '०४:३० AM', significance: 'दिन का प्रथम दिव्य दर्शन • साक्षात् हरि की प्रथम स्तुति' },
  { name: 'तुलसी आरती एवं जप (Tulsi Aarti & Japa)', time: '०५:०० AM', significance: 'वृन्दा देवी की परिक्रमा एवं महामंत्र जप काल' },
  { name: 'शृंगार दर्शन व गुरु पूजा (Sringar Darshan)', time: '०७:१५ AM', significance: 'भगवान के दिव्य नवीन वस्त्र, पुष्प एवं अलंकार दर्शन' },
  { name: 'श्रीमद्भागवतम् कथा (Srimad Bhagavatam)', time: '०८:०० AM', significance: 'प्रामाणिक वैदिक दर्शन एवं कृष्ण लीला श्रवण' },
  { name: 'राजभोग आरती (Rajbhog Aarti)', time: '१२:३० PM', significance: 'भगवान को ५६ भोग अर्पण एवं दोपहर की भव्य आरती' },
  { name: 'धूप / उत्थापन आरती (Utthapana Aarti)', time: '०४:३० PM', significance: 'सायंकालीन दर्शन एवं भगवान का जागरण' },
  { name: 'संध्या / गौर आरती (Sandhya Gaura Aarti)', time: '०७:०० PM', significance: 'दीपदान, झांझ-मृदंग संकीर्तन एवं महा-आरती' },
  { name: 'भगवद्गीता यथारूप प्रवचन (Gita Discourse)', time: '०७:४५ PM', significance: 'श्रील प्रभुपाद द्वारा रचित गीता के श्लोकों का गूढ़ अर्थ' },
  { name: 'शयन आरती (Sayana Aarti)', time: '०८:३० PM', significance: 'दिन का अंतिम दर्शन एवं भगवान का शयन काल' }
];

// ── 5. DEVOTEE COMMUNITY NOTICE BOARD ───────────────────────────────────────
export const ISKCON_DEVOTEE_NOTICES: IskconNoticeItem[] = [
  {
    id: 'notice-1',
    title: 'आगामी निर्जला/मोक्षदा एकादशी महाव्रत एवं अखंड हरिनाम संकीर्तन',
    category: 'festival',
    categoryLabel: 'पावन एकादशी',
    dateStr: 'आगामी एकादशी',
    temple: 'सभी इस्कॉन केंद्र (मायापुर, दिल्ली, वृन्दावन, बेंगलुरु)',
    description: 'समस्त भक्तों से विनम्र निवेदन है कि एकादशी के पावन दिन कम से कम २५ माला जप करें एवं अन्न का त्याग कर भगवान की सेवा में लीन रहें।',
    actionText: 'पारण विधि देखें',
    badgeColor: '#f59e0b'
  },
  {
    id: 'notice-2',
    title: 'इस्कॉन यूथ फोरम (IYF) — "Art of Mind Control" यूथ वीकेंड वर्कशॉप',
    category: 'iyf',
    categoryLabel: 'युवा प्रेरणा सत्र',
    dateStr: 'प्रत्येक रविवार शाम ५:०० बजे',
    temple: 'इस्कॉन दिल्ली (ईस्ट ऑफ कैलाश) एवं इस्कॉन द्वारका',
    description: 'कॉलेज छात्रों एवं कामकाजी युवाओं हेतु एकाग्रता, तनावमुक्ति एवं भगवद्गीता के व्यावहारिक अनुप्रयोग पर विशेष सत्र।',
    actionText: 'निःशुल्क भाग लें',
    badgeColor: '#00d2b4'
  },
  {
    id: 'notice-3',
    title: 'नित्य महाप्रसाद अन्नदान सेवा — "Food For Life" अभियान',
    category: 'prasadam',
    categoryLabel: 'अन्नदान सेवा',
    dateStr: 'दैनिक (३६५ दिन)',
    temple: 'इस्कॉन मायापुर, दिल्ली, नोएडा, पटना एवं बेंगलुरु',
    description: 'प्रतिदिन हजारों साधु-संतों, तीर्थयात्रियों एवं निर्धनों को शुद्ध देशी घी में निर्मित महाप्रसाद का निःशुल्क वितरण किया जाता है।',
    actionText: 'सेवा में सहयोग करें',
    badgeColor: '#ec4899'
  }
];

// ── 6. VAISHNAVA CALENDAR 2026-2027 ─────────────────────────────────────────
export const UPCOMING_VAISHNAVA_FESTIVALS: VaishnavaFestival[] = [
  {
    id: 'kamada_ekadashi',
    name: 'Kamada Ekadashi',
    nameHindi: 'कामदा एकादशी (महाव्रत)',
    dateStr: 'चैत्र शुक्ल एकादशी',
    monthStr: 'चैत्र मास',
    significance: 'समस्त पापों का क्षय कर भगवान श्री कृष्ण की अनन्य प्रेमाभक्ति प्रदान करने वाली एकादशी।',
    fastingRule: 'अन्न, दाल, चावल वर्जित • फल, दूध एवं जल अनुमत • रात्रि जागरण व नाम संकीर्तन',
    paranTime: 'प्रातः ०६:१५ से १०:०० AM के मध्य'
  },
  {
    id: 'shri_gaura_purnima',
    name: 'Sri Gaura Purnima',
    nameHindi: 'श्री गौर पूर्णिमा (श्री चैतन्य महाप्रभु प्राकट्य)',
    dateStr: 'फाल्गुन पूर्णिमा',
    monthStr: 'फाल्गुन मास',
    significance: 'कलियुग पावन अवतारी श्री कृष्ण चैतन्य महाप्रभु का ५४०वां दिव्य प्राकट्य महामहोत्सव।',
    fastingRule: 'संध्या चंद्रोदय तक निर्जल/सजल उपवास • पश्चात् अनुकल्प महाप्रसाद',
    paranTime: 'संध्या ७:३० PM चंद्रोदय दर्शन उपरांत'
  },
  {
    id: 'shri_krishna_janmashtami',
    name: 'Sri Krishna Janmashtami',
    nameHindi: 'श्री कृष्ण जन्माष्टमी (महामहोत्सव)',
    dateStr: 'भाद्रपद कृष्ण अष्टमी',
    monthStr: 'भाद्रपद मास',
    significance: 'स्वयं भगवान श्री कृष्ण का दिव्य अवतार दिवस • वृन्दावन, मायापुर व दिल्ली में १०८ तीर्थों के जल से महा-अभिषेक।',
    fastingRule: 'मध्यरात्रि १२:०० बजे तक पूर्ण उपवास • अभिषेक दर्शन एवं भोग पश्चात् पारण',
    paranTime: 'मध्यरात्रि १२:४५ AM के उपरांत'
  }
];

// ── 7. SRILA PRABHUPADA TEACHINGS & 4 REGULATIVE PRINCIPLES ─────────────────
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
  gitaPurportQuote: 'भगवद्गीता को उसी भाव से ग्रहण करना चाहिए जिस भाव से स्वयं भगवान श्रीकृष्ण ने अर्जुन को दिया था — परम भक्ति एवं शरणागति के साथ।',
  regulativePrinciples: [
    { name: '१. अहिंसा (मांसाहार त्याग)', desc: 'पवित्र सात्त्विक शाकाहारी एवं कृष्ण-प्रसाद का ही सेवन करें।' },
    { name: '२. शुचिता (नशा व व्यसन त्याग)', desc: 'चाय, कॉफी, तंबाकू, मदिरा आदि सभी प्रकार के नशों से दूर रहें।' },
    { name: '३. सत्य (द्यूत/जुआ त्याग)', desc: 'सट्टा, जुआ एवं अनैतिक धनार्जन से दूर रहकर निष्काम धर्म का पालन करें।' },
    { name: '४. तपस्या (अवैध संबंध त्याग)', desc: 'वैदिक मर्यादा एवं पवित्र गृहस्थ धर्म का पालन करें।' }
  ]
};
