// قاعدة بيانات كبار القراء المعتمدين (روابط موثوقة من Islamic Network CDN + EveryAyah + MP3Quran)
const ALL_RECITERS = [
  {
    id: "afs",
    name: "الشيخ مشاري راشد العفاسي",
    style: "مرتل • حفص عن عاصم",
    country: "الكويت",
    edition: "ar.alafasy",
    ayahFolder: "Alafasy_128kbps",
    server: "https://server8.mp3quran.net/afs/",
    bio: "تلاوة عصرية ونقاء صوتي فائق، يناسب الاستماع اليومي ومتابعة الآيات بسهولة."
  },
  {
    id: "basit",
    name: "الشيخ عبد الباسط عبد الصمد (مجود)",
    style: "المصحف المجود",
    country: "مصر",
    edition: "ar.abdulsamad",
    ayahFolder: "Abdul_Basit_Mujawwad_128kbps",
    server: "https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/",
    bio: "الحنجرة الذهبية، وأحد أشهر قراء العالم الإسلامي بتلاوات مجودة خاشعة تأسر القلوب."
  },
  {
    id: "basit_murattal",
    name: "الشيخ عبد الباسط عبد الصمد (مرتل)",
    style: "مرتل • حفص عن عاصم",
    country: "مصر",
    edition: "ar.abdulbasitmurattal",
    ayahFolder: "Abdul_Basit_Murattal_192kbps",
    server: "https://server7.mp3quran.net/basit/",
    bio: "التلاوة المرتلة الهادئة للشيخ عبد الباسط بصوت عذب ومخارج حروف متقنة."
  },
  {
    id: "husr",
    name: "الشيخ محمود خليل الحصري",
    style: "المصحف المرتل",
    country: "مصر",
    edition: "ar.husary",
    ayahFolder: "Husary_128kbps",
    server: "https://server13.mp3quran.net/husr/",
    bio: "شيخ عموم المقارئ المصرية، تلاوة منضبطة بأعلى درجات التجويد مثالية للتعلم."
  },
  {
    id: "minsh",
    name: "الشيخ محمد صديق المنشاوي (مرتل)",
    style: "مرتل • تلاوة خاشعة",
    country: "مصر",
    edition: "ar.minshawi",
    ayahFolder: "Minshawy_Murattal_128kbps",
    server: "https://server10.mp3quran.net/minsh/",
    bio: "الصوت الباكي الخاشع، يفيض بالروحانية والسكينة في إيصال معاني القرآن."
  },
  {
    id: "minsh_mojawwad",
    name: "الشيخ محمد صديق المنشاوي (مجود)",
    style: "المصحف المجود",
    country: "مصر",
    edition: "ar.minshawimujawwad",
    ayahFolder: "Minshawy_Mujawwad_192kbps",
    server: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/",
    bio: "تلاوة مجودة نادرة ومؤثرة تجمع بين قوة الأداء وعمق الخشوع."
  },
  {
    id: "ghamdi",
    name: "الشيخ سعد الغامدي",
    style: "مرتل • تلاوة ميسرة",
    country: "السعودية",
    edition: "ar.saoodshuraym",
    ayahFolder: "Ghamadi_40kbps",
    server: "https://server7.mp3quran.net/s_gmd/",
    bio: "قراءة متقنة وواضحة جداً ومناسبة للمراجعة السريعة والاستماع اليومي."
  },
  {
    id: "maher",
    name: "الشيخ ماهر المعيقلي",
    style: "مرتل • إمام الحرم المكي",
    country: "السعودية",
    edition: "ar.mahermuaiqly",
    ayahFolder: "MaherAlMuaiqly128kbps",
    server: "https://server12.mp3quran.net/maher/",
    bio: "إمام وخطيب المسجد الحرام، يتميز بصوت عذب وتلاوة مؤثرة تبعث الطمأنينة."
  },
  {
    id: "sudais",
    name: "الشيخ عبد الرحمن السديس",
    style: "مرتل • إمام الحرم المكي",
    country: "السعودية",
    edition: "ar.abdurrahmaansudais",
    ayahFolder: "Abdurrahmaan_As-Sudais_192kbps",
    server: "https://server11.mp3quran.net/sds/",
    bio: "الرئيس العام لشؤون المسجد الحرام والمسجد النبوي، بصوته الحرمي المميز."
  },
  {
    id: "shuraim",
    name: "الشيخ سعود الشريم",
    style: "مرتل • تلاوة حجازية",
    country: "السعودية",
    edition: "ar.saoodshuraym",
    ayahFolder: "Saood_ash-Shuraym_128kbps",
    server: "https://server7.mp3quran.net/shur/",
    bio: "تلاوة رصينة ومؤثرة بأسلوب الحرم المكي العريق."
  },
  {
    id: "dosari",
    name: "الشيخ ياسر الدوسري",
    style: "مرتل • إمام الحرم المكي",
    country: "السعودية",
    edition: "ar.yasseraldossari",
    ayahFolder: "Yasser_Ad-Dussary_128kbps",
    server: "https://server11.mp3quran.net/yasser/",
    bio: "صوت شجي وأداء خاشع متميز يلامس القلوب في التلاوات الليلية."
  },
  {
    id: "qatami",
    name: "الشيخ ناصر القطامي",
    style: "مرتل • تلاوة خاشعة",
    country: "السعودية",
    edition: "ar.nasseralqatami",
    ayahFolder: "Nasser_Alqatami_128kbps",
    server: "https://server6.mp3quran.net/qtm/",
    bio: "أسلوب فريد في التلاوة والتدبر وصوت ندي محبوب لدى الملايين."
  },
  {
    id: "ajmy",
    name: "الشيخ أحمد بن علي العجمي",
    style: "مرتل • حفص عن عاصم",
    country: "السعودية",
    edition: "ar.ahmedajamy",
    ayahFolder: "ahmed_ibn_ali_al_ajamy_128kbps",
    server: "https://server10.mp3quran.net/ajm/",
    bio: "صوت قوي وعذب يجمع بين حسن الأداء ووضوح التلاوة."
  },
  {
    id: "juhany",
    name: "الشيخ عبد الله عواد الجهني",
    style: "مرتل • إمام الحرم المكي",
    country: "السعودية",
    edition: "ar.abdullahbasfar",
    ayahFolder: "Abdullaah_3awwaad_Al-Juhaynee_128kbps",
    server: "https://server13.mp3quran.net/jhn/",
    bio: "تلاوة متزنة وأداء متقن لأحكام التجويد بصوت حرمي أصيل."
  },
  {
    id: "hudhaify",
    name: "الشيخ علي بن عبد الرحمن الحذيفي",
    style: "مرتل • إمام الحرم النبوي",
    country: "السعودية",
    edition: "ar.hudhaify",
    ayahFolder: "Hudhaify_128kbps",
    server: "https://server9.mp3quran.net/hthfi/",
    bio: "شيخ أئمة المسجد النبوي الشريف، يتميز بالوقار والضبط الدقيق للتجويد."
  },
  {
    id: "banna",
    name: "الشيخ محمود علي البنا",
    style: "مرتل • المدرسة المصرية",
    country: "مصر",
    edition: "ar.mahmoudalialbanna",
    ayahFolder: "mahmoud_ali_al_banna_32kbps",
    server: "https://server8.mp3quran.net/bna/",
    bio: "من أعلام دولة التلاوة المصرية بصوت رخيم وأداء هادئ مريح للنفس."
  },
  {
    id: "tablawi",
    name: "الشيخ محمد محمود الطبلاوي",
    style: "مرتل • المدرسة المصرية",
    country: "مصر",
    edition: "ar.mohammadaltablawi",
    ayahFolder: "Mohammad_al_Tablaway_128kbps",
    server: "https://server12.mp3quran.net/tblawi/",
    bio: "نقيب القراء المصريين الأسبق، بصوته القوي الفريد ونفسه الطويل."
  },
  {
    id: "shatri",
    name: "الشيخ أبو بكر الشاطري",
    style: "مرتل • تلاوة خاشعة",
    country: "السعودية",
    edition: "ar.shaatree",
    ayahFolder: "Abu_Bakr_Ash-Shaatree_128kbps",
    server: "https://server11.mp3quran.net/shatri/",
    bio: "تلاوة هادئة وعذبة تناسب الاستماع أثناء التدبر والمراجعة."
  },
  {
    id: "fares",
    name: "الشيخ فارس عباد",
    style: "مرتل • حفص عن عاصم",
    country: "اليمن",
    edition: "ar.faresabbad",
    ayahFolder: "Fares_Abbad_64kbps",
    server: "https://server8.mp3quran.net/frs_a/",
    bio: "صوت نقي وتلاوة متدفقة واضحة محببة للمستمعين في شتى أنحاء العالم."
  },
  {
    id: "idrees",
    name: "الشيخ إدريس أبكر",
    style: "مرتل • أداء خاشع",
    country: "السعودية",
    edition: "ar.idreesabkar",
    ayahFolder: "Idrees_Abkar_128kbps",
    server: "https://server6.mp3quran.net/abkr/",
    bio: "تلاوة مؤثرة جداً تفيض بالخشوع والتدبر في آيات الذكر الحكيم."
  },
  {
    id: "jibreel",
    name: "الشيخ محمد جبريل",
    style: "مرتل • المدرسة المصرية",
    country: "مصر",
    edition: "ar.muhammadjibreel",
    ayahFolder: "Muhammad_Jibreel_128kbps",
    server: "https://server8.mp3quran.net/jbrl/",
    bio: "قارئ جامع عمرو بن العاص الشهير، بصوته القوي وتلاواته الخاشعة."
  },
  {
    id: "rifai",
    name: "الشيخ هاني الرفاعي",
    style: "مرتل • تلاوة مؤثرة",
    country: "السعودية",
    edition: "ar.hanirifai",
    ayahFolder: "Hani_Rifai_192kbps",
    server: "https://server8.mp3quran.net/hani/",
    bio: "تلاوة خاشعة وصوت دافئ يلامس الوجدان."
  },
  {
    id: "luhaidan",
    name: "الشيخ محمد اللحيدان",
    style: "مرتل • أداء حجازي",
    country: "السعودية",
    edition: "ar.muhammadayyoub",
    ayahFolder: "Muhsin_Al_Qasim_192kbps",
    server: "https://server8.mp3quran.net/lhdan/",
    bio: "أسلوب متفرد في الترتيل يجمع بين الخشوع والقوة."
  },
  {
    id: "khalid",
    name: "الشيخ خالد الجليل",
    style: "مرتل • تلاوة خاشعة",
    country: "السعودية",
    edition: "ar.alafasy",
    ayahFolder: "Khalid_Abdullah_al-Qahtanee_192kbps",
    bio: "صوت شجي ومؤثر يحظى بانتشار واسع بين محبي التلاوات الخاشعة."
  }
];
