// 🛕 ISKCON SRIMAD BHAGAVAD-GITA AS IT IS (श्रीमद्भगवद्गीता यथारूप - इस्कॉन श्रील प्रभुपाद)
export interface GitaShlokaVideo {
  id: string;
  title: string;
  chapter: number;
  verses?: number[];
  isFullChapter?: boolean;
}

export const GITA_FULL_CHAPTER_VIDEOS: Record<number, { id: string; title: string }> = {
  "1": {
    "id": "_9Gsy6c-UIA",
    "title": "श्रीमद भगवत गीता सार- अध्याय १ |Shrimad Bhagawad Geeta With Narration |Chapter 1|ISKCON Srila Prabhupada"
  },
  "2": {
    "id": "mBjAzqoKJoI",
    "title": "श्रीमद भगवत गीता सार- अध्याय 2 |Shrimad Bhagawad Geeta With Narration |Chapter 2| ISKCON Srila Prabhupada"
  },
  "3": {
    "id": "g4oEUP4Ztas",
    "title": "श्रीमद भगवत गीता सार- अध्याय 3 |Shrimad Bhagawad Geeta WithNarration |Chapter 3 | ISKCON Srila Prabhupada"
  },
  "4": {
    "id": "E-TECeu7nDw",
    "title": "श्रीमद भगवत गीता सार- अध्याय 4 |Shrimad Bhagawad Geeta With Narration |Chapter 4 |ISKCON Srila Prabhupada"
  },
  "5": {
    "id": "e9cJwVIpPVc",
    "title": "श्रीमद भगवत गीता सार- अध्याय 5 |Shrimad Bhagawad Geeta With Narration -Chapter 5 |ISKCON Srila Prabhupada"
  },
  "6": {
    "id": "MogyeLoe9gs",
    "title": "श्रीमद भगवत गीता सार-अध्याय 6 |Shrimad Bhagawad Geeta With Narration |Chapter 6 | ISKCON Srila Prabhupada"
  },
  "7": {
    "id": "MJlzBHbxDSk",
    "title": "श्रीमद भगवत गीता सार-अध्याय 7 |Shrimad Bhagawad Geeta With Narration |Chapter 7 | ISKCON Srila Prabhupada"
  },
  "8": {
    "id": "mm7QSrjoM5g",
    "title": "श्रीमद भगवत गीता सार- अध्याय 8 |Shrimad Bhagawad Geeta With Narration |Chapter 8 |ISKCON Srila Prabhupada"
  },
  "9": {
    "id": "eHj0JiiuRaQ",
    "title": "श्रीमद भगवत गीता सार-अध्याय 9 |Shrimad Bhagawad Geeta With Narration |Chapter 9 | ISKCON Srila Prabhupada"
  },
  "10": {
    "id": "a0FGJEZqdHY",
    "title": "श्रीमद भगवत गीता सार-अध्याय 10 |Shrimad Bhagawad Geeta With Narration |Chapter 10|ISKCON Srila Prabhupada"
  },
  "11": {
    "id": "4bABPNlueAY",
    "title": "श्रीमद भगवत गीता सार- अध्याय 11 |Shrimad Bhagawad Geeta With Narration |Chapter11|ISKCON Srila Prabhupada"
  },
  "12": {
    "id": "XqHvlUQ8BG8",
    "title": "श्रीमद भगवत गीता सार-अध्याय 12 |Shrimad Bhagawad Geeta With Narration |Chapter 12|ISKCON Srila Prabhupada"
  },
  "13": {
    "id": "b5h2STZX7Ro",
    "title": "श्रीमद भगवत गीता सार-अध्याय 13 |Shrimad Bhagawad Geeta With Narration |Chapter 13|ISKCON Srila Prabhupada"
  },
  "14": {
    "id": "ag54cHCfJGU",
    "title": "श्रीमद भगवत गीता सार-अध्याय 14 |Shrimad Bhagawad Geeta With Narration |Chapter 14|ISKCON Srila Prabhupada"
  },
  "15": {
    "id": "zsQVLsDvyL0",
    "title": "श्रीमद भगवत गीता सार-अध्याय 15 |Shrimad Bhagawad Geeta With Narration |Chapter 15|ISKCON Srila Prabhupada"
  },
  "16": {
    "id": "sosTze3oJMw",
    "title": "श्रीमद भगवत गीता सार-अध्याय 16 |Shrimad Bhagawad Geeta With Narration |Chapter 16|ISKCON Srila Prabhupada"
  },
  "17": {
    "id": "xU9M2F0iVno",
    "title": "श्रीमद भगवत गीता सार-अध्याय 17 |Shrimad Bhagawad Geeta With Narration |Chapter 17|ISKCON Srila Prabhupada"
  },
  "18": {
    "id": "1qhbkOfs280",
    "title": "श्रीमद भगवत गीता सार-अध्याय 18 |Shrimad Bhagawad Geeta With Narration |Chapter 18|ISKCON Srila Prabhupada"
  }
};

export const GITA_VERSE_VIDEOS: Record<string, { id: string; title: string; verses?: number[] }> = {
  "1_1": {
    "id": "tnpjCJnr_Z4",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 1| Bhagawad Geeta Saar -Chapter 1| Verse 1 | ISKCON Srila Prabhupada",
    "verses": [
      1
    ]
  },
  "1_2": {
    "id": "9nhsSmDp6Ho",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 2| Bhagawad Geeta Saar -Chapter 1| Verse 2 | ISKCON Srila Prabhupada",
    "verses": [
      2
    ]
  },
  "1_4": {
    "id": "YXdI1TQiA98",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 4,5,6| Bhagawad Geeta Saar -Chapter 1| Verse 4,5,6 |ISKCON Srila Prabhupada",
    "verses": [
      4,
      5,
      6
    ]
  },
  "1_5": {
    "id": "YXdI1TQiA98",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 4,5,6| Bhagawad Geeta Saar -Chapter 1| Verse 4,5,6 |ISKCON Srila Prabhupada",
    "verses": [
      4,
      5,
      6
    ]
  },
  "1_6": {
    "id": "YXdI1TQiA98",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 4,5,6| Bhagawad Geeta Saar -Chapter 1| Verse 4,5,6 |ISKCON Srila Prabhupada",
    "verses": [
      4,
      5,
      6
    ]
  },
  "1_3": {
    "id": "wkIvW86TwYE",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 3| Bhagawad Geeta Saar -Chapter 1| Verse 3 |ISKCON Srila Prabhupada",
    "verses": [
      3
    ]
  },
  "1_24": {
    "id": "b21M5L7aIns",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 24 25 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 24 25| ISKCON",
    "verses": [
      24,
      25
    ]
  },
  "1_25": {
    "id": "b21M5L7aIns",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 24 25 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 24 25| ISKCON",
    "verses": [
      24,
      25
    ]
  },
  "2_56": {
    "id": "Jq2D6kO_JqE",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 56 with lyrics| Bhagwad Geeta Saar Chap 2-Verse 56| ISKCON Srila Prabhupada",
    "verses": [
      56
    ]
  },
  "8_25": {
    "id": "j9ZGb8rJ13c",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 25 with lyrics| Bhagawad Geeta Saar Chap 8-Verse 25 | ISKCON Srila Prabhupada",
    "verses": [
      25
    ]
  },
  "8_23": {
    "id": "G4T00cYjcQk",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 23 with lyrics| Bhagawad Geeta Saar Chap 8-Verse 23 | ISKCON Srila Prabhupada",
    "verses": [
      23
    ]
  },
  "8_26": {
    "id": "igGJ2Jyy0z8",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 26 with lyrics| Bhagawad Geeta Saar Chap 8-Verse 26 | ISKCON Srila Prabhupada",
    "verses": [
      26
    ]
  },
  "1_7": {
    "id": "B5xoI-TJd0A",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 7| Bhagawad Geeta Saar -Chapter 1| Verse 7 | ISKCON Srila Prabhupada",
    "verses": [
      7
    ]
  },
  "2_47": {
    "id": "ypxjmZ__OFw",
    "title": "भगवद गीता सार अध्याय 2-श्लोक 47 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 47| ISKCON Srila Prabhupada",
    "verses": [
      47
    ]
  },
  "2_19": {
    "id": "P7GsL4uWXxg",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 19 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 19| ISKCON Srila Prabhupada",
    "verses": [
      19
    ]
  },
  "2_7": {
    "id": "shMBbwBYj44",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 7 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 7 | ISKCON Srila Prabhupada",
    "verses": [
      7
    ]
  },
  "2_23": {
    "id": "xFIfynMFtFg",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 23 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 23| ISKCON Srila Prabhupada",
    "verses": [
      23
    ]
  },
  "1_10": {
    "id": "77f3w0wBPo8",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 10 | Bhagawad Geeta Saar -Chapter 1| Verse 10 | ISKCON Srila Prabhupada",
    "verses": [
      10
    ]
  },
  "1_20": {
    "id": "M7_pcpqdO-k",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 20, 21 with lyrics| Bhagwad Geeta Saar Chap 1| ISKCON Srila Prabhupada",
    "verses": [
      20,
      21
    ]
  },
  "1_21": {
    "id": "M7_pcpqdO-k",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 20, 21 with lyrics| Bhagwad Geeta Saar Chap 1| ISKCON Srila Prabhupada",
    "verses": [
      20,
      21
    ]
  },
  "1_11": {
    "id": "sM2A9pLePqc",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 11 | Bhagawad Geeta Saar -Chapter 1| Verse 11 | ISKCON Srila Prabhupada",
    "verses": [
      11
    ]
  },
  "1_23": {
    "id": "KCgA_Xx960s",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 23 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 23| ISKCON Srila Prabhupada",
    "verses": [
      23
    ]
  },
  "1_8": {
    "id": "gHdQcYLHp7E",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 8 | Bhagawad Geeta Saar -Chapter 1| Verse 8 | ISKCON Srila Prabhupada",
    "verses": [
      8
    ]
  },
  "5_8": {
    "id": "FvDw-CE2lcI",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 8,9 with lyrics| Bhagwad Geeta Chap 5- Verse 8,9| ISKCON Srila Prabhupada",
    "verses": [
      8,
      9
    ]
  },
  "5_9": {
    "id": "FvDw-CE2lcI",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 8,9 with lyrics| Bhagwad Geeta Chap 5- Verse 8,9| ISKCON Srila Prabhupada",
    "verses": [
      8,
      9
    ]
  },
  "2_62": {
    "id": "l2MU7wveU9c",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 62 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 62| ISKCON Srila Prabhupada",
    "verses": [
      62
    ]
  },
  "2_18": {
    "id": "AccoHVPVv8U",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 18 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 18| ISKCON Srila Prabhupada",
    "verses": [
      18
    ]
  },
  "1_9": {
    "id": "E5V0wpc027o",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 9 | Bhagawad Geeta Saar -Chapter 1| Verse 9 | ISKCON Srila Prabhupada",
    "verses": [
      9
    ]
  },
  "1_19": {
    "id": "Eutd8avdBgk",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 19 with lyrics| Bhagwad Geeta Saar Chap 1 |Verse 19| ISKCON Srila Prabhupada",
    "verses": [
      19
    ]
  },
  "1_29": {
    "id": "ACdZ8Md9OTY",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 29 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 29 |ISKCON Srila Prabhupada",
    "verses": [
      29
    ]
  },
  "5_3": {
    "id": "Z-oBT2LIIBc",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 3 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 42| ISKCON Srila Prabhupada",
    "verses": [
      3
    ]
  },
  "2_63": {
    "id": "sNGWMw_Q0II",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 63 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 63| ISKCON Srila Prabhupada",
    "verses": [
      63
    ]
  },
  "1_46": {
    "id": "sfexQ2NR-OM",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 46 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 46| ISKCON Srila Prabhupada",
    "verses": [
      46
    ]
  },
  "1_17": {
    "id": "bKHx-3rZjWM",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 17,18 Lyrics| Bhagawad Geeta Saar Chap 1 |Verse 16| ISKCON Srila Prabhupada",
    "verses": [
      17,
      18
    ]
  },
  "1_18": {
    "id": "bKHx-3rZjWM",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 17,18 Lyrics| Bhagawad Geeta Saar Chap 1 |Verse 16| ISKCON Srila Prabhupada",
    "verses": [
      17,
      18
    ]
  },
  "1_26": {
    "id": "cMoXNHh0d8k",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 26 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 26 |ISKCON Srila Prabhupada",
    "verses": [
      26
    ]
  },
  "1_22": {
    "id": "hlRilNZ-aYE",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 22 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 22| ISKCON Srila Prabhupada",
    "verses": [
      22
    ]
  },
  "1_12": {
    "id": "Ogcw1mn-NKQ",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 12 | Bhagawad Geeta Saar -Chapter 1| Verse 12 | ISKCON Srila Prabhupada",
    "verses": [
      12
    ]
  },
  "2_1": {
    "id": "Q3WJ5w2ZP0E",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 1with lyrics| Bhagwad Geeta Saar Chap 2- Verse 1 | ISKCON Srila Prabhupada",
    "verses": [
      1
    ]
  },
  "5_2": {
    "id": "8sKV6RfMNZU",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 2 with lyrics| Bhagwad Geeta Saar Chap 5- Verse 2| ISKCON Srila Prabhupada",
    "verses": [
      2
    ]
  },
  "1_40": {
    "id": "4f5kygsQXcc",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 40 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 40| ISKCON Srila Prabhupada",
    "verses": [
      40
    ]
  },
  "3_21": {
    "id": "Eygk_Sc0MkU",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 21 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 21| ISKCON Srila Prabhupada",
    "verses": [
      21
    ]
  },
  "1_33": {
    "id": "en9bFilpueo",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 33 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 33| ISKCON Srila Prabhupada",
    "verses": [
      33
    ]
  },
  "1_45": {
    "id": "Z3Y4we33eSE",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 45 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 45| ISKCON Srila Prabhupada",
    "verses": [
      45
    ]
  },
  "4_7": {
    "id": "DOnAu7qT7w8",
    "title": "भगवद गीता सार अध्याय 4- श्लोक 7 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 7| ISKCON Srila Prabhupada",
    "verses": [
      7
    ]
  },
  "5_5": {
    "id": "lUqCcV9I9m8",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 5 with lyrics| Bhagwad Geeta Saar Chap 5- Verse 5| ISKCON Srila Prabhupada",
    "verses": [
      5
    ]
  },
  "2_38": {
    "id": "s2bbePyJ2_g",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 38 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 38| ISKCON Srila Prabhupada",
    "verses": [
      38
    ]
  },
  "2_48": {
    "id": "htc6pnNWmYw",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 48 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 48| ISKCON Srila Prabhupada",
    "verses": [
      48
    ]
  },
  "2_28": {
    "id": "2zqWdsNtb9k",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 28 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 28| ISKCON Srila Prabhupada",
    "verses": [
      28
    ]
  },
  "1_14": {
    "id": "DZRt6lWb2EQ",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 14 | Bhagawad Geeta Saar -Chapter 1| Verse 14 | ISKCON Srila Prabhupada",
    "verses": [
      14
    ]
  },
  "8_11": {
    "id": "fo4vmnrB1TI",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 11 with lyrics| Bhagawad Geeta Saar Chap 8- Verse 11| ISKCON Srila Prabhupada",
    "verses": [
      11
    ]
  },
  "2_27": {
    "id": "inMp8LNm0uI",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 27 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 27| ISKCON Srila Prabhupada",
    "verses": [
      27
    ]
  },
  "1_44": {
    "id": "VZT7VGwoDHo",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 44 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 44| ISKCON Srila Prabhupada",
    "verses": [
      44
    ]
  },
  "4_13": {
    "id": "QDmpYtXRXAE",
    "title": "भगवद गीता सार अध्याय 4- श्लोक 13 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 13| ISKCON Srila Prabhupada",
    "verses": [
      13
    ]
  },
  "1_15": {
    "id": "9zlc-MEuI0g",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 15 | Bhagawad Geeta Saar -Chapter 1| Verse 15 | ISKCON Srila Prabhupada",
    "verses": [
      15
    ]
  },
  "8_16": {
    "id": "iEBu-dJ2yRg",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 16 with lyrics| Bhagawad Geeta Saar Chap 8- Verse 16| ISKCON Srila Prabhupada",
    "verses": [
      16
    ]
  },
  "7_15": {
    "id": "rZKDP-7gSbI",
    "title": "भगवद गीता सार अध्याय 7 श्लोक 15 with lyrics| Bhagawad Geeta Saar Chap 7- Verse 15| ISKCON Srila Prabhupada",
    "verses": [
      15
    ]
  },
  "4_8": {
    "id": "dl-7R9TXvDI",
    "title": "भगवद गीता सार अध्याय 4- श्लोक 8 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 8| ISKCON Srila Prabhupada",
    "verses": [
      8
    ]
  },
  "2_24": {
    "id": "EnMxHFzYFs8",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 24 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 24| ISKCON Srila Prabhupada",
    "verses": [
      24
    ]
  },
  "1_13": {
    "id": "3t0oyCk8YPQ",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 13 | Bhagawad Geeta Saar -Chapter 1| Verse 13 | ISKCON Srila Prabhupada",
    "verses": [
      13
    ]
  },
  "2_2": {
    "id": "Ud8TnZBp8Fg",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 2 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 2 | ISKCON Srila Prabhupada",
    "verses": [
      2
    ]
  },
  "2_70": {
    "id": "Rxb5qXA3qI8",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 70 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 70| ISKCON Srila Prabhupada",
    "verses": [
      70
    ]
  },
  "3_19": {
    "id": "spgBIpCUJtg",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 19 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 19| ISKCON Srila Prabhupada",
    "verses": [
      19
    ]
  },
  "3_1": {
    "id": "EgWkbzSzqsQ",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 1 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 1| ISKCON Srila Prabhupada",
    "verses": [
      1
    ]
  },
  "2_13": {
    "id": "dJOd_cFABps",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 13 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 13| ISKCON Srila Prabhupada",
    "verses": [
      13
    ]
  },
  "1_47": {
    "id": "1IXXFNFFxyE",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 47 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 47| ISKCON Srila Prabhupada",
    "verses": [
      47
    ]
  },
  "1_30": {
    "id": "X-JUoPp4xjM",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 30 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 30| ISKCON Srila Prabhupada",
    "verses": [
      30
    ]
  },
  "2_57": {
    "id": "Jvl4xaGcsO0",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 57 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 57| ISKCON Srila Prabhupada",
    "verses": [
      57
    ]
  },
  "5_11": {
    "id": "wO9O3bltHFc",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 11 with lyrics| Bhagwad Geeta Saar Chap 5- Verse 11| ISKCON Srila Prabhupada",
    "verses": [
      11
    ]
  },
  "1_34": {
    "id": "7Yx-pMghW4c",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 34 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 34| ISKCON Srila Prabhupada",
    "verses": [
      34
    ]
  },
  "1_28": {
    "id": "7RXpwXxI46s",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 28 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 28| ISKCON Srila Prabhupada",
    "verses": [
      28
    ]
  },
  "2_41": {
    "id": "WxnZjtdoP3k",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 41 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 41| ISKCON Srila Prabhupada",
    "verses": [
      41
    ]
  },
  "2_69": {
    "id": "6dJlbUS0Z74",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 69 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 69| ISKCON Srila Prabhupada",
    "verses": [
      69
    ]
  },
  "1_36": {
    "id": "eVop80kD7Lc",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 36 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 36| ISKCON Srila Prabhupada",
    "verses": [
      36
    ]
  },
  "3_14": {
    "id": "O9vi8jOlahU",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 14 & 15 with lyrics| Bhagwad Geeta Saar Chap 3| ISKCON Srila Prabhupada",
    "verses": [
      14
    ]
  },
  "1_41": {
    "id": "-oEZPtR0ayI",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 41 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 41| ISKCON Srila Prabhupada",
    "verses": [
      41
    ]
  },
  "1_16": {
    "id": "bFxCoboSZWY",
    "title": "भगवद गीता सार अध्याय 1| Bhagawad Geeta Saar Lyrics -Chapter 1 | Verse 16 | ISKCON Srila Prabhupada",
    "verses": [
      16
    ]
  },
  "1_37": {
    "id": "vnUyJ6GOHwk",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 37 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 37| ISKCON Srila Prabhupada",
    "verses": [
      37
    ]
  },
  "1_35": {
    "id": "hc-33OrJmtI",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 35 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 35| ISKCON Srila Prabhupada",
    "verses": [
      35
    ]
  },
  "2_39": {
    "id": "wbqdWP9XlI8",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 39 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 39| ISKCON Srila Prabhupada",
    "verses": [
      39
    ]
  },
  "2_37": {
    "id": "ZYnScDdtOaw",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 37 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 37| ISKCON Srila Prabhupada",
    "verses": [
      37
    ]
  },
  "3_37": {
    "id": "WyJ-lyH3fXE",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 37 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 37| ISKCON Srila Prabhupada",
    "verses": [
      37
    ]
  },
  "1_27": {
    "id": "rTh7zOg_iuQ",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 27 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 27 |ISKCON Srila Prabhupada",
    "verses": [
      27
    ]
  },
  "2_55": {
    "id": "juCRT87f9Vc",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 55 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 55| ISKCON Srila Prabhupada",
    "verses": [
      55
    ]
  },
  "3_8": {
    "id": "gnXsDyBWylQ",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 8 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 8| ISKCON Srila Prabhupada",
    "verses": [
      8
    ]
  },
  "2_67": {
    "id": "IhuAsUYS1x0",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 67 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 67| ISKCON Srila Prabhupada",
    "verses": [
      67
    ]
  }
};

export const ALL_CATEGORIZED_GITA_VIDEOS: GitaShlokaVideo[] = [
  {
    "id": "1qhbkOfs280",
    "title": "श्रीमद भगवत गीता सार-अध्याय 18 |Shrimad Bhagawad Geeta With Narration |Chapter 18|ISKCON Srila Prabhupada",
    "chapter": 18,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "_9Gsy6c-UIA",
    "title": "श्रीमद भगवत गीता सार- अध्याय १ |Shrimad Bhagawad Geeta With Narration |Chapter 1|ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "mBjAzqoKJoI",
    "title": "श्रीमद भगवत गीता सार- अध्याय 2 |Shrimad Bhagawad Geeta With Narration |Chapter 2| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "g4oEUP4Ztas",
    "title": "श्रीमद भगवत गीता सार- अध्याय 3 |Shrimad Bhagawad Geeta WithNarration |Chapter 3 | ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "MogyeLoe9gs",
    "title": "श्रीमद भगवत गीता सार-अध्याय 6 |Shrimad Bhagawad Geeta With Narration |Chapter 6 | ISKCON Srila Prabhupada",
    "chapter": 6,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "E-TECeu7nDw",
    "title": "श्रीमद भगवत गीता सार- अध्याय 4 |Shrimad Bhagawad Geeta With Narration |Chapter 4 |ISKCON Srila Prabhupada",
    "chapter": 4,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "e9cJwVIpPVc",
    "title": "श्रीमद भगवत गीता सार- अध्याय 5 |Shrimad Bhagawad Geeta With Narration -Chapter 5 |ISKCON Srila Prabhupada",
    "chapter": 5,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "4bABPNlueAY",
    "title": "श्रीमद भगवत गीता सार- अध्याय 11 |Shrimad Bhagawad Geeta With Narration |Chapter11|ISKCON Srila Prabhupada",
    "chapter": 11,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "MJlzBHbxDSk",
    "title": "श्रीमद भगवत गीता सार-अध्याय 7 |Shrimad Bhagawad Geeta With Narration |Chapter 7 | ISKCON Srila Prabhupada",
    "chapter": 7,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "zsQVLsDvyL0",
    "title": "श्रीमद भगवत गीता सार-अध्याय 15 |Shrimad Bhagawad Geeta With Narration |Chapter 15|ISKCON Srila Prabhupada",
    "chapter": 15,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "a0FGJEZqdHY",
    "title": "श्रीमद भगवत गीता सार-अध्याय 10 |Shrimad Bhagawad Geeta With Narration |Chapter 10|ISKCON Srila Prabhupada",
    "chapter": 10,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "eHj0JiiuRaQ",
    "title": "श्रीमद भगवत गीता सार-अध्याय 9 |Shrimad Bhagawad Geeta With Narration |Chapter 9 | ISKCON Srila Prabhupada",
    "chapter": 9,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "mm7QSrjoM5g",
    "title": "श्रीमद भगवत गीता सार- अध्याय 8 |Shrimad Bhagawad Geeta With Narration |Chapter 8 |ISKCON Srila Prabhupada",
    "chapter": 8,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "XqHvlUQ8BG8",
    "title": "श्रीमद भगवत गीता सार-अध्याय 12 |Shrimad Bhagawad Geeta With Narration |Chapter 12|ISKCON Srila Prabhupada",
    "chapter": 12,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "xU9M2F0iVno",
    "title": "श्रीमद भगवत गीता सार-अध्याय 17 |Shrimad Bhagawad Geeta With Narration |Chapter 17|ISKCON Srila Prabhupada",
    "chapter": 17,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "b5h2STZX7Ro",
    "title": "श्रीमद भगवत गीता सार-अध्याय 13 |Shrimad Bhagawad Geeta With Narration |Chapter 13|ISKCON Srila Prabhupada",
    "chapter": 13,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "sosTze3oJMw",
    "title": "श्रीमद भगवत गीता सार-अध्याय 16 |Shrimad Bhagawad Geeta With Narration |Chapter 16|ISKCON Srila Prabhupada",
    "chapter": 16,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "ag54cHCfJGU",
    "title": "श्रीमद भगवत गीता सार-अध्याय 14 |Shrimad Bhagawad Geeta With Narration |Chapter 14|ISKCON Srila Prabhupada",
    "chapter": 14,
    "verses": [],
    "isFullChapter": true
  },
  {
    "id": "tnpjCJnr_Z4",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 1| Bhagawad Geeta Saar -Chapter 1| Verse 1 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      1
    ],
    "isFullChapter": false
  },
  {
    "id": "9nhsSmDp6Ho",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 2| Bhagawad Geeta Saar -Chapter 1| Verse 2 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      2
    ],
    "isFullChapter": false
  },
  {
    "id": "YXdI1TQiA98",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 4,5,6| Bhagawad Geeta Saar -Chapter 1| Verse 4,5,6 |ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      4,
      5,
      6
    ],
    "isFullChapter": false
  },
  {
    "id": "wkIvW86TwYE",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 3| Bhagawad Geeta Saar -Chapter 1| Verse 3 |ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      3
    ],
    "isFullChapter": false
  },
  {
    "id": "b21M5L7aIns",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 24 25 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 24 25| ISKCON",
    "chapter": 1,
    "verses": [
      24,
      25
    ],
    "isFullChapter": false
  },
  {
    "id": "Jq2D6kO_JqE",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 56 with lyrics| Bhagwad Geeta Saar Chap 2-Verse 56| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      56
    ],
    "isFullChapter": false
  },
  {
    "id": "j9ZGb8rJ13c",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 25 with lyrics| Bhagawad Geeta Saar Chap 8-Verse 25 | ISKCON Srila Prabhupada",
    "chapter": 8,
    "verses": [
      25
    ],
    "isFullChapter": false
  },
  {
    "id": "G4T00cYjcQk",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 23 with lyrics| Bhagawad Geeta Saar Chap 8-Verse 23 | ISKCON Srila Prabhupada",
    "chapter": 8,
    "verses": [
      23
    ],
    "isFullChapter": false
  },
  {
    "id": "igGJ2Jyy0z8",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 26 with lyrics| Bhagawad Geeta Saar Chap 8-Verse 26 | ISKCON Srila Prabhupada",
    "chapter": 8,
    "verses": [
      26
    ],
    "isFullChapter": false
  },
  {
    "id": "B5xoI-TJd0A",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 7| Bhagawad Geeta Saar -Chapter 1| Verse 7 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      7
    ],
    "isFullChapter": false
  },
  {
    "id": "ypxjmZ__OFw",
    "title": "भगवद गीता सार अध्याय 2-श्लोक 47 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 47| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      47
    ],
    "isFullChapter": false
  },
  {
    "id": "P7GsL4uWXxg",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 19 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 19| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      19
    ],
    "isFullChapter": false
  },
  {
    "id": "shMBbwBYj44",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 7 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 7 | ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      7
    ],
    "isFullChapter": false
  },
  {
    "id": "xFIfynMFtFg",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 23 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 23| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      23
    ],
    "isFullChapter": false
  },
  {
    "id": "77f3w0wBPo8",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 10 | Bhagawad Geeta Saar -Chapter 1| Verse 10 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      10
    ],
    "isFullChapter": false
  },
  {
    "id": "M7_pcpqdO-k",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 20, 21 with lyrics| Bhagwad Geeta Saar Chap 1| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      20,
      21
    ],
    "isFullChapter": false
  },
  {
    "id": "sM2A9pLePqc",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 11 | Bhagawad Geeta Saar -Chapter 1| Verse 11 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      11
    ],
    "isFullChapter": false
  },
  {
    "id": "KCgA_Xx960s",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 23 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 23| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      23
    ],
    "isFullChapter": false
  },
  {
    "id": "gHdQcYLHp7E",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 8 | Bhagawad Geeta Saar -Chapter 1| Verse 8 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      8
    ],
    "isFullChapter": false
  },
  {
    "id": "FvDw-CE2lcI",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 8,9 with lyrics| Bhagwad Geeta Chap 5- Verse 8,9| ISKCON Srila Prabhupada",
    "chapter": 5,
    "verses": [
      8,
      9
    ],
    "isFullChapter": false
  },
  {
    "id": "l2MU7wveU9c",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 62 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 62| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      62
    ],
    "isFullChapter": false
  },
  {
    "id": "AccoHVPVv8U",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 18 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 18| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      18
    ],
    "isFullChapter": false
  },
  {
    "id": "E5V0wpc027o",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 9 | Bhagawad Geeta Saar -Chapter 1| Verse 9 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      9
    ],
    "isFullChapter": false
  },
  {
    "id": "Eutd8avdBgk",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 19 with lyrics| Bhagwad Geeta Saar Chap 1 |Verse 19| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      19
    ],
    "isFullChapter": false
  },
  {
    "id": "ACdZ8Md9OTY",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 29 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 29 |ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      29
    ],
    "isFullChapter": false
  },
  {
    "id": "Z-oBT2LIIBc",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 3 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 42| ISKCON Srila Prabhupada",
    "chapter": 5,
    "verses": [
      3
    ],
    "isFullChapter": false
  },
  {
    "id": "sNGWMw_Q0II",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 63 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 63| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      63
    ],
    "isFullChapter": false
  },
  {
    "id": "sfexQ2NR-OM",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 46 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 46| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      46
    ],
    "isFullChapter": false
  },
  {
    "id": "bKHx-3rZjWM",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 17,18 Lyrics| Bhagawad Geeta Saar Chap 1 |Verse 16| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      17,
      18
    ],
    "isFullChapter": false
  },
  {
    "id": "cMoXNHh0d8k",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 26 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 26 |ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      26
    ],
    "isFullChapter": false
  },
  {
    "id": "hlRilNZ-aYE",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 22 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 22| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      22
    ],
    "isFullChapter": false
  },
  {
    "id": "Ogcw1mn-NKQ",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 12 | Bhagawad Geeta Saar -Chapter 1| Verse 12 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      12
    ],
    "isFullChapter": false
  },
  {
    "id": "Q3WJ5w2ZP0E",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 1with lyrics| Bhagwad Geeta Saar Chap 2- Verse 1 | ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      1
    ],
    "isFullChapter": false
  },
  {
    "id": "8sKV6RfMNZU",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 2 with lyrics| Bhagwad Geeta Saar Chap 5- Verse 2| ISKCON Srila Prabhupada",
    "chapter": 5,
    "verses": [
      2
    ],
    "isFullChapter": false
  },
  {
    "id": "4f5kygsQXcc",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 40 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 40| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      40
    ],
    "isFullChapter": false
  },
  {
    "id": "Eygk_Sc0MkU",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 21 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 21| ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [
      21
    ],
    "isFullChapter": false
  },
  {
    "id": "en9bFilpueo",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 33 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 33| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      33
    ],
    "isFullChapter": false
  },
  {
    "id": "Z3Y4we33eSE",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 45 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 45| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      45
    ],
    "isFullChapter": false
  },
  {
    "id": "DOnAu7qT7w8",
    "title": "भगवद गीता सार अध्याय 4- श्लोक 7 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 7| ISKCON Srila Prabhupada",
    "chapter": 4,
    "verses": [
      7
    ],
    "isFullChapter": false
  },
  {
    "id": "lUqCcV9I9m8",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 5 with lyrics| Bhagwad Geeta Saar Chap 5- Verse 5| ISKCON Srila Prabhupada",
    "chapter": 5,
    "verses": [
      5
    ],
    "isFullChapter": false
  },
  {
    "id": "s2bbePyJ2_g",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 38 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 38| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      38
    ],
    "isFullChapter": false
  },
  {
    "id": "htc6pnNWmYw",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 48 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 48| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      48
    ],
    "isFullChapter": false
  },
  {
    "id": "2zqWdsNtb9k",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 28 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 28| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      28
    ],
    "isFullChapter": false
  },
  {
    "id": "DZRt6lWb2EQ",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 14 | Bhagawad Geeta Saar -Chapter 1| Verse 14 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      14
    ],
    "isFullChapter": false
  },
  {
    "id": "fo4vmnrB1TI",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 11 with lyrics| Bhagawad Geeta Saar Chap 8- Verse 11| ISKCON Srila Prabhupada",
    "chapter": 8,
    "verses": [
      11
    ],
    "isFullChapter": false
  },
  {
    "id": "inMp8LNm0uI",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 27 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 27| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      27
    ],
    "isFullChapter": false
  },
  {
    "id": "VZT7VGwoDHo",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 44 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 44| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      44
    ],
    "isFullChapter": false
  },
  {
    "id": "QDmpYtXRXAE",
    "title": "भगवद गीता सार अध्याय 4- श्लोक 13 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 13| ISKCON Srila Prabhupada",
    "chapter": 4,
    "verses": [
      13
    ],
    "isFullChapter": false
  },
  {
    "id": "9zlc-MEuI0g",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 15 | Bhagawad Geeta Saar -Chapter 1| Verse 15 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      15
    ],
    "isFullChapter": false
  },
  {
    "id": "iEBu-dJ2yRg",
    "title": "भगवद गीता सार अध्याय 8 श्लोक 16 with lyrics| Bhagawad Geeta Saar Chap 8- Verse 16| ISKCON Srila Prabhupada",
    "chapter": 8,
    "verses": [
      16
    ],
    "isFullChapter": false
  },
  {
    "id": "rZKDP-7gSbI",
    "title": "भगवद गीता सार अध्याय 7 श्लोक 15 with lyrics| Bhagawad Geeta Saar Chap 7- Verse 15| ISKCON Srila Prabhupada",
    "chapter": 7,
    "verses": [
      15
    ],
    "isFullChapter": false
  },
  {
    "id": "dl-7R9TXvDI",
    "title": "भगवद गीता सार अध्याय 4- श्लोक 8 with lyrics| Bhagwad Geeta Saar Chap 4- Verse 8| ISKCON Srila Prabhupada",
    "chapter": 4,
    "verses": [
      8
    ],
    "isFullChapter": false
  },
  {
    "id": "EnMxHFzYFs8",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 24 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 24| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      24
    ],
    "isFullChapter": false
  },
  {
    "id": "3t0oyCk8YPQ",
    "title": "भगवद गीता सार अध्याय 1 - श्लोक 13 | Bhagawad Geeta Saar -Chapter 1| Verse 13 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      13
    ],
    "isFullChapter": false
  },
  {
    "id": "Ud8TnZBp8Fg",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 2 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 2 | ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      2
    ],
    "isFullChapter": false
  },
  {
    "id": "Rxb5qXA3qI8",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 70 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 70| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      70
    ],
    "isFullChapter": false
  },
  {
    "id": "spgBIpCUJtg",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 19 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 19| ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [
      19
    ],
    "isFullChapter": false
  },
  {
    "id": "EgWkbzSzqsQ",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 1 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 1| ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [
      1
    ],
    "isFullChapter": false
  },
  {
    "id": "dJOd_cFABps",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 13 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 13| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      13
    ],
    "isFullChapter": false
  },
  {
    "id": "1IXXFNFFxyE",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 47 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 47| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      47
    ],
    "isFullChapter": false
  },
  {
    "id": "X-JUoPp4xjM",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 30 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 30| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      30
    ],
    "isFullChapter": false
  },
  {
    "id": "Jvl4xaGcsO0",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 57 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 57| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      57
    ],
    "isFullChapter": false
  },
  {
    "id": "wO9O3bltHFc",
    "title": "भगवद गीता सार अध्याय 5- श्लोक 11 with lyrics| Bhagwad Geeta Saar Chap 5- Verse 11| ISKCON Srila Prabhupada",
    "chapter": 5,
    "verses": [
      11
    ],
    "isFullChapter": false
  },
  {
    "id": "7Yx-pMghW4c",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 34 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 34| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      34
    ],
    "isFullChapter": false
  },
  {
    "id": "7RXpwXxI46s",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 28 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 28| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      28
    ],
    "isFullChapter": false
  },
  {
    "id": "WxnZjtdoP3k",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 41 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 41| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      41
    ],
    "isFullChapter": false
  },
  {
    "id": "6dJlbUS0Z74",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 69 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 69| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      69
    ],
    "isFullChapter": false
  },
  {
    "id": "eVop80kD7Lc",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 36 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 36| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      36
    ],
    "isFullChapter": false
  },
  {
    "id": "O9vi8jOlahU",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 14 & 15 with lyrics| Bhagwad Geeta Saar Chap 3| ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [
      14
    ],
    "isFullChapter": false
  },
  {
    "id": "-oEZPtR0ayI",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 41 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 41| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      41
    ],
    "isFullChapter": false
  },
  {
    "id": "bFxCoboSZWY",
    "title": "भगवद गीता सार अध्याय 1| Bhagawad Geeta Saar Lyrics -Chapter 1 | Verse 16 | ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      16
    ],
    "isFullChapter": false
  },
  {
    "id": "vnUyJ6GOHwk",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 37 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 37| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      37
    ],
    "isFullChapter": false
  },
  {
    "id": "hc-33OrJmtI",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 35 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 35| ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      35
    ],
    "isFullChapter": false
  },
  {
    "id": "wbqdWP9XlI8",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 39 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 39| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      39
    ],
    "isFullChapter": false
  },
  {
    "id": "ZYnScDdtOaw",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 37 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 37| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      37
    ],
    "isFullChapter": false
  },
  {
    "id": "WyJ-lyH3fXE",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 37 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 37| ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [
      37
    ],
    "isFullChapter": false
  },
  {
    "id": "rTh7zOg_iuQ",
    "title": "भगवद गीता सार अध्याय 1- श्लोक 27 with lyrics| Bhagwad Geeta Saar Chap 1- Verse 27 |ISKCON Srila Prabhupada",
    "chapter": 1,
    "verses": [
      27
    ],
    "isFullChapter": false
  },
  {
    "id": "juCRT87f9Vc",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 55 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 55| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      55
    ],
    "isFullChapter": false
  },
  {
    "id": "gnXsDyBWylQ",
    "title": "भगवद गीता सार अध्याय 3- श्लोक 8 with lyrics| Bhagwad Geeta Saar Chap 3- Verse 8| ISKCON Srila Prabhupada",
    "chapter": 3,
    "verses": [
      8
    ],
    "isFullChapter": false
  },
  {
    "id": "IhuAsUYS1x0",
    "title": "भगवद गीता सार अध्याय 2- श्लोक 67 with lyrics| Bhagwad Geeta Saar Chap 2- Verse 67| ISKCON Srila Prabhupada",
    "chapter": 2,
    "verses": [
      67
    ],
    "isFullChapter": false
  }
];

/**
 * Resolves the most accurate video for a given chapter and verse.
 * Priority: Exact Verse Video -> Multi-Verse Group Video -> Chapter Saar Video -> Fallback Chapter Stream.
 */
export function getGitaVideoForVerse(chapter: number, verse: number): {
  videoId: string;
  title: string;
  type: 'exact_verse' | 'chapter_saar' | 'general';
} {
  const key = `${chapter}_${verse}`;
  if (GITA_VERSE_VIDEOS[key]) {
    return {
      videoId: GITA_VERSE_VIDEOS[key].id,
      title: GITA_VERSE_VIDEOS[key].title,
      type: 'exact_verse'
    };
  }

  if (GITA_FULL_CHAPTER_VIDEOS[chapter]) {
    return {
      videoId: GITA_FULL_CHAPTER_VIDEOS[chapter].id,
      title: GITA_FULL_CHAPTER_VIDEOS[chapter].title,
      type: 'chapter_saar'
    };
  }

  // Fallback to chapter 1 video
  return {
    videoId: '_9Gsy6c-UIA',
    title: `भगवद गीता अध्याय ${chapter} सार`,
    type: 'general'
  };
}
