// Student Survey Questions (15 questions) in all three languages
export const studentQuestions = [
    {
        id: 1,
        type: 'multiple', // checkbox
        required: true,
        translations: {
            ru: {
                question: 'С какими трудностями вы сталкиваетесь при подготовке к экзаменам? (можно выбрать несколько)',
                options: [
                    'Не знаю, с чего начать подготовку',
                    'Сложно найти нужные учебные материалы',
                    'Не хватает тестов для самопроверки',
                    'Нет возможности проверить свои знания',
                    'Сложно понять, какие темы нужно повторить',
                    'Не хватает мотивации заниматься регулярно',
                    'Не могу определиться с выбором кластера/направления',
                    'Другое'
                ]
            },
            tj: {
                question: 'Шумо ҳангоми тайёрӣ ба имтиҳонот бо кадом мушкилот рӯбарӯ мешавед? (чанд вариантро интихоб кардан мумкин аст)',
                options: [
                    'Намедонам аз куҷо тайёриро оғоз кунам',
                    'Маводи таълимии зарурӣ пайдо кардан душвор аст',
                    'Тестҳо барои худсанҷӣ кофӣ нест',
                    'Имконияти санҷидани дониши худ нест',
                    'Фаҳмидани он ки кадом мавзӯъҳоро такрор кардан лозим аст, душвор аст',
                    'Ҳавасманди машғул шудан ба таври мунтазам кофӣ нест',
                    'Наметавонам интихоби кластер/самтро муайян кунам',
                    'Дигар'
                ]
            },
            uz: {
                question: "Imtihonlarga tayyorgarlik ko'rishda qanday qiyinchiliklarga duch kelasiz? (bir nechtasini tanlash mumkin)",
                options: [
                    "Tayyorgarlikni qayerdan boshlashni bilmayman",
                    "Kerakli o'quv materiallarini topish qiyin",
                    "O'z-o'zini tekshirish uchun testlar yetarli emas",
                    "Bilimlarimni tekshirish imkoniyati yo'q",
                    "Qaysi mavzularni takrorlash kerakligini tushunish qiyin",
                    "Muntazam shug'ullanish uchun motivatsiya yetarli emas",
                    "Klaster/yo'nalishni tanlashda qaror qabul qila olmayman",
                    "Boshqa"
                ]
            }
        }
    },
    {
        id: 2,
        type: 'single', // radio
        required: true,
        translations: {
            ru: {
                question: 'Как часто вы пользуетесь мобильным телефоном для учебы?',
                options: [
                    'Каждый день',
                    'Несколько раз в неделю',
                    'Редко',
                    'Никогда не использую для учебы'
                ]
            },
            tj: {
                question: 'Шумо барои таҳсил аз телефони мобилӣ чӣ қадар истифода мебаред?',
                options: [
                    'Ҳар рӯз',
                    'Чанд маротиба дар ҳафта',
                    'Камтар',
                    'Ҳеҷ гоҳ барои таҳсил истифода намебарам'
                ]
            },
            uz: {
                question: "O'qish uchun mobil telefondan qanchalik tez-tez foydalanasiz?",
                options: [
                    'Har kuni',
                    'Haftada bir necha marta',
                    'Kamdan-kam',
                    "O'qish uchun hech qachon ishlatmayman"
                ]
            }
        }
    },
    {
        id: 3,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Хотели бы вы иметь мобильное приложение для подготовки к экзаменам?',
                options: [
                    'Да, очень хотел(а) бы',
                    'Скорее да',
                    'Не уверен(а)',
                    'Скорее нет',
                    'Нет'
                ]
            },
            tj: {
                question: 'Оё шумо мехоҳед барномаи мобилӣ барои тайёрӣ ба имтиҳонот дошта бошед?',
                options: [
                    'Бале, хеле мехоҳам',
                    'Бештар бале',
                    'Боварӣ надорам',
                    'Бештар не',
                    'Не'
                ]
            },
            uz: {
                question: "Imtihonlarga tayyorgarlik ko'rish uchun mobil ilovaga ega bo'lishni xohlaysizmi?",
                options: [
                    'Ha, juda xohlayman',
                    "Ko'proq ha",
                    "Ishonchim komil emas",
                    "Ko'proq yo'q",
                    "Yo'q"
                ]
            }
        }
    },
    {
        id: 4,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Какие функции для вас были бы НАИБОЛЕЕ ВАЖНЫ в таком приложении? (выберите до 5)',
                options: [
                    'Тесты по предметам для самопроверки',
                    'Электронные учебники (PDF)',
                    'Ключи и ответы к заданиям',
                    'Определение подходящего кластера через тестирование',
                    'Статистика моих результатов и прогресс',
                    'Напоминания о необходимости позаниматься',
                    'Возможность заниматься без интернета',
                    'Объяснение правильных ответов',
                    'Видео-уроки по темам',
                    'Возможность соревноваться с друзьями',
                    'Другое'
                ]
            },
            tj: {
                question: 'Кадом функсияҳо барои шумо дар чунин барнома МУҲИМТАРИН мебуданд? (то 5-ро интихоб кунед)',
                options: [
                    'Тестҳо аз фанҳо барои худсанҷӣ',
                    'Китобҳои электронӣ (PDF)',
                    'Калидҳо ва ҷавобҳо ба супоришҳо',
                    'Муайян кардани кластери мувофиқ тавассути тестгузорӣ',
                    'Статистикаи натиҷаҳо ва пешравии ман',
                    'Ёдрасониҳо дар бораи зарурати машғул шудан',
                    'Имконияти машғул шудан бе интернет',
                    'Шарҳи ҷавобҳои дуруст',
                    'Дарсҳои видеоӣ аз мавзӯъҳо',
                    'Имконияти рақобат бо дӯстон',
                    'Дигар'
                ]
            },
            uz: {
                question: "Bunday ilovada sizning uchun qaysi funksiyalar ENG MUHIM bo'lardi? (5 tagacha tanlang)",
                options: [
                    "Fanlar bo'yicha o'z-o'zini tekshirish testlari",
                    "Elektron darsliklar (PDF)",
                    "Topshiriqlar javoblari va kalitlari",
                    "Test orqali mos klasterni aniqlash",
                    "Natijalarim statistikasi va taraqqiyotim",
                    "Shug'ullanish haqida eslatmalar",
                    "Internetsiz ishlash imkoniyati",
                    "To'g'ri javoblarning tushuntirishlari",
                    "Mavzular bo'yicha video-darslar",
                    "Do'stlar bilan raqobatlashish imkoniyati",
                    "Boshqa"
                ]
            }
        },
        maxselect: 5
    },
    {
        id: 5,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Знаете ли вы, что такое образовательные кластеры (А и Б)?',
                options: [
                    'Да, хорошо знаю',
                    'Знаю, но не очень хорошо',
                    'Слышал(а), но не понимаю',
                    'Нет, не знаю'
                ]
            },
            tj: {
                question: 'Оё шумо медонед, ки кластерҳои таҳсилӣ (А ва Б) чист?',
                options: [
                    'Бале, хуб медонам',
                    'Медонам, аммо хеле хуб не',
                    'Шунидаам, аммо намефаҳмам',
                    'Не, намедонам'
                ]
            },
            uz: {
                question: "Ta'lim klasterlari (A va B) nima ekanligini bilasizmi?",
                options: [
                    'Ha, yaxshi bilaman',
                    'Bilaman, lekin unchalik yaxshi emas',
                    'Eshitganman, lekin tushunmayman',
                    "Yo'q, bilmayman"
                ]
            }
        }
    },
    {
        id: 6,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Сложно ли вам определиться с выбором образовательного кластера (направления)?',
                options: [
                    'Да, очень сложно',
                    'Скорее сложно',
                    'Не очень сложно',
                    'Нет, я уже определился(лась)'
                ]
            },
            tj: {
                question: 'Оё интихоби кластери таҳсилӣ (самт) барои шумо душвор аст?',
                options: [
                    'Бале, хеле душвор',
                    'Бештар душвор',
                    'Он қадар душвор не',
                    'Не, ман аллакай муайян кардам'
                ]
            },
            uz: {
                question: "Ta'lim klasteri (yo'nalishi)ni tanlash sizga qiyinmi?",
                options: [
                    'Ha, juda qiyin',
                    "Ko'proq qiyin",
                    "Unchalik qiyin emas",
                    "Yo'q, men allaqachon tanladim"
                ]
            }
        }
    },
    {
        id: 7,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Как вы сейчас проверяете свои знания? (можно выбрать несколько)',
                options: [
                    'Решаю задачи из учебников',
                    'Прохожу тесты на бумаге',
                    'Использую онлайн-сайты',
                    'Использую другие мобильные приложения',
                    'Занимаюсь с репетитором',
                    'Прошу помощи у учителей',
                    'Никак не проверяю',
                    'Другое'
                ]
            },
            tj: {
                question: 'Шумо ҳоло дониши худро чӣ гуна месанҷед? (чанд вариантро интихоб кардан мумкин аст)',
                options: [
                    'Масъалаҳоро аз китобҳои дарсӣ ҳал мекунам',
                    'Тестҳоро дар коғаз мегузарам',
                    'Аз сайтҳои онлайн истифода мебарам',
                    'Аз барномаҳои мобилии дигар истифода мебарам',
                    'Бо репетитор машғул мешавам',
                    'Аз муаллимон кӯмак мехоҳам',
                    'Ҳеҷ гуна намесанҷам',
                    'Дигар'
                ]
            },
            uz: {
                question: "Hozir bilimlaringizni qanday tekshirasiz? (bir nechtasini tanlash mumkin)",
                options: [
                    "Darsliklardan masalalar yechaman",
                    "Qog'ozda testlardan o'taman",
                    "Onlayn saytlardan foydalanaman",
                    "Boshqa mobil ilovalardan foydalanaman",
                    "Repetitor bilan shug'ullanaman",
                    "O'qituvchilardan yordam so'rayman",
                    "Hech qanday tekshirmayman",
                    "Boshqa"
                ]
            }
        }
    },
    {
        id: 8,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Что для вас важнее всего в образовательном приложении? (выберите ТОП-3)',
                options: [
                    'Простой и понятный интерфейс',
                    'Работа без интернета',
                    'Бесплатность',
                    'Большая база вопросов',
                    'Качественные учебные материалы',
                    'Подробная статистика прогресса',
                    'Мотивация к регулярным занятиям',
                    'Соответствие реальным экзаменам',
                    'Другое'
                ]
            },
            tj: {
                question: 'Барои шумо дар барномаи таҳсилӣ чӣ муҳимтарин аст? (ТОП-3-ро интихоб кунед)',
                options: [
                    'Интерфейси содда ва фаҳмо',
                    'Кор бе интернет',
                    'Ройгон будан',
                    'Базаи калони саволҳо',
                    'Маводи таълимии сифатнок',
                    'Статистикаи муфассали пешравӣ',
                    'Ҳавасмандӣ ба машғулиятҳои мунтазам',
                    'Мутобиқат бо имтиҳонҳои воқеӣ',
                    'Дигар'
                ]
            },
            uz: {
                question: "Ta'lim ilovasida sizning uchun eng muhimi nima? (TOP-3 ni tanlang)",
                options: [
                    "Oddiy va tushunarli interfeys",
                    "Internetsiz ishlash",
                    "Bepul bo'lishi",
                    "Katta savollar bazasi",
                    "Sifatli o'quv materiallari",
                    "Batafsil taraqqiyot statistikasi",
                    "Muntazam mashg'ulotlarga motivatsiya",
                    "Haqiqiy imtihonlarga mos kelishi",
                    "Boshqa"
                ]
            }
        },
        maxselect: 3
    },
    {
        id: 9,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'На каком языке вам было бы удобнее использовать приложение?',
                options: [
                    'Только таджикский',
                    'Только русский',
                    'Оба языка (с возможностью переключения)',
                    'Другой язык'
                ]
            },
            tj: {
                question: 'Барномаро ба кадом забон истифода бурдан барои шумо қулайтар мебуд?',
                options: [
                    'Танҳо тоҷикӣ',
                    'Танҳо русӣ',
                    'Ҳарду забон (бо имконияти иваз кардан)',
                    'Забони дигар'
                ]
            },
            uz: {
                question: "Ilovani qaysi tilda ishlatish sizga qulayroq bo'lardi?",
                options: [
                    'Faqat tojik',
                    'Faqat rus',
                    "Ikkala til (almashtirish imkoniyati bilan)",
                    "Boshqa til"
                ]
            }
        }
    },
    {
        id: 10,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Готовы ли вы заниматься в приложении регулярно (например, каждый день по 15-30 минут)?',
                options: [
                    'Да, готов(а)',
                    'Скорее да',
                    'Не уверен(а)',
                    'Скорее нет',
                    'Нет'
                ]
            },
            tj: {
                question: 'Оё шумо омодаед, ки дар барнома ба таври мунтазам машғул шавед (масалан, ҳар рӯз 15-30 дақиқа)?',
                options: [
                    'Бале, омодаам',
                    'Бештар бале',
                    'Боварӣ надорам',
                    'Бештар не',
                    'Не'
                ]
            },
            uz: {
                question: "Ilovada muntazam shug'ullanishga tayyormisiz (masalan, har kuni 15-30 daqiqa)?",
                options: [
                    'Ha, tayyorman',
                    "Ko'proq ha",
                    "Ishonchim komil emas",
                    "Ko'proq yo'q",
                    "Yo'q"
                ]
            }
        }
    },
    {
        id: 11,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Какие предметы вам было бы интересно изучать через приложение?',
                options: [
                    'Математика',
                    'Физика',
                    'Химия',
                    'Биология',
                    'Таджикский язык',
                    'Русский язык',
                    'Английский язык',
                    'История',
                    'География',
                    'Право',
                    'Другие'
                ]
            },
            tj: {
                question: 'Кадом фанҳоро тавассути барнома омӯхтан барои шумо ҷолиб мебуд?',
                options: [
                    'Математика',
                    'Физика',
                    'Химия',
                    'Биология',
                    'Забони тоҷикӣ',
                    'Забони русӣ',
                    'Забони англисӣ',
                    'Таърих',
                    'География',
                    'Ҳуқуқ',
                    'Дигар'
                ]
            },
            uz: {
                question: "Ilova orqali qaysi fanlarni o'rganish sizga qiziq bo'lardi?",
                options: [
                    'Matematika',
                    'Fizika',
                    'Kimyo',
                    'Biologiya',
                    'Tojik tili',
                    'Rus tili',
                    'Ingliz tili',
                    'Tarix',
                    'Geografiya',
                    'Huquq',
                    'Boshqalar'
                ]
            }
        }
    },
    {
        id: 12,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Пользовались ли вы раньше образовательными мобильными приложениями?',
                options: [
                    'Да, часто пользуюсь',
                    'Да, иногда',
                    'Пробовал(а), но не понравилось',
                    'Нет, никогда'
                ]
            },
            tj: {
                question: 'Оё шумо пештар аз барномаҳои мобилии таҳсилӣ истифода бурдаед?',
                options: [
                    'Бале, зиёд истифода мебарам',
                    'Бале, баъзан',
                    'Кӯшиш кардам, аммо маъқул нашуд',
                    'Не, ҳеҷ гоҳ'
                ]
            },
            uz: {
                question: "Ilgari ta'limiy mobil ilovalardan foydalanganmisiz?",
                options: [
                    'Ha, tez-tez foydalanaman',
                    'Ha, bazan',
                    "Sinab ko'rdim, lekin yoqmadi",
                    "Yo'q, hech qachon"
                ]
            }
        }
    },
    {
        id: 13,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Сколько времени в день вы готовы уделять подготовке через мобильное приложение?',
                options: [
                    'Менее 15 минут',
                    '15-30 минут',
                    '30-60 минут',
                    'Более 1 часа',
                    'Затрудняюсь ответить'
                ]
            },
            tj: {
                question: 'Шумо дар рӯз чанд вақт барои тайёрӣ тавассути барномаи мобилӣ ҷудо кардан омодаед?',
                options: [
                    'Камтар аз 15 дақиқа',
                    '15-30 дақиқа',
                    '30-60 дақиқа',
                    'Зиёда аз 1 соат',
                    'Душвор аст ҷавоб додан'
                ]
            },
            uz: {
                question: "Kuniga mobil ilova orqali tayyorgarlikka qancha vaqt ajratishga tayyorsiz?",
                options: [
                    '15 daqiqadan kam',
                    '15-30 daqiqa',
                    '30-60 daqiqa',
                    '1 soatdan ortiq',
                    "Javob berishga qiynalaman"
                ]
            }
        }
    },
    {
        id: 14,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Что могло бы заставить вас отказаться от использования приложения?',
                options: [
                    'Необходимость платить',
                    'Сложный интерфейс',
                    'Необходимость постоянного интернета',
                    'Низкое качество материалов',
                    'Много рекламы',
                    'Быстрая разрядка батареи',
                    'Другое'
                ]
            },
            tj: {
                question: 'Чӣ шуморо водор карда метавонист, ки аз истифодаи барнома даст кашед?',
                options: [
                    'Зарурати пардохт кардан',
                    'Интерфейси мураккаб',
                    'Зарурати интернети доимӣ',
                    'Сифати паст и маводҳо',
                    'Реклами зиёд',
                    'Тез холӣ шудани батарея',
                    'Дигар'
                ]
            },
            uz: {
                question: "Nima sizni ilovadan voz kechishga majbur qilishi mumkin?",
                options: [
                    "To'lash zarurligi",
                    "Murakkab interfeys",
                    "Doimiy internet zarurligi",
                    "Materiallarning past sifati",
                    "Ko'p reklama",
                    "Batareyaning tez tugashi",
                    "Boshqa"
                ]
            }
        }
    },
    {
        id: 15,
        type: 'textarea',
        required: false,
        translations: {
            ru: {
                question: 'Ваши пожелания и идеи для будущего приложения',
                placeholder: 'Напишите свои пожелания и идеи здесь...'
            },
            tj: {
                question: 'Орзуҳо ва ақидаҳои шумо барои барномаи ояндадор',
                placeholder: 'Орзуҳо ва ақидаҳои худро дар ин ҷо нависед...'
            },
            uz: {
                question: "Kelajak ilova uchun tilak va g'oyalaringiz",
                placeholder: "Bu yerda tilak va g'oyalaringizni yozing..."
            }
        }
    }
];
