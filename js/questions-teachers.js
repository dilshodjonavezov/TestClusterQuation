// Teacher Survey Questions (15 questions) in all three languages
export const teacherQuestions = [
    {
        id: 1,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Какие трудности испытывают ваши ученики при подготовке к экзаменам? (можно выбрать несколько)',
                options: [
                    'Недостаточная мотивация',
                    'Отсутствие системного подхода к подготовке',
                    'Сложность материала',
                    'Нехватка учебных ресурсов',
                    'Трудности с самоорганизацией',
                    'Недостаток практических заданий',
                    'Проблемы с определением образовательного кластера',
                    'Другое'
                ]
            },
            tj: {
                question: 'Шогирдони шумо ҳангоми тайёрӣ ба имтиҳонот бо кадом мушкилот рӯбарӯ мешаванд? (чанд вариантро интихоб кардан мумкин аст)',
                options: [
                    'Ҳавасмандии нокифоя',
                    'Набудани муносибати системавӣ ба тайёрӣ',
                    'Мураккабии маводҳо',
                    'Камбудии захираҳои таълимӣ',
                    'Мушкилот бо худташкилот',
                    'Камбудии супоришҳои амалӣ',
                    'Мушкилот бо муайян кардани кластери таҳсилӣ',
                    'Дигар'
                ]
            },
            uz: {
                question: "O'quvchilaringiz imtihonlarga tayyorgarlikda qanday qiyinchiliklarga duch kelishadi? (bir nechtasini tanlash mumkin)",
                options: [
                    "Motivatsiya yetarli emas",
                    "Tayyorgarlikka tizimli yondashuv yo'qligi",
                    "Materiallarning murakkabligi",
                    "O'quv resurslarining yetarli emasligi",
                    "O'z-o'zini tashkil qilishda muammolar",
                    "Amaliy topshiriqlar yetarli emas",
                    "Ta'lim klasterini aniqlashda muammolar",
                    "Boshqa"
                ]
            }
        }
    },
    {
        id: 2,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Считаете ли вы, что мобильное приложение может помочь ученикам в подготовке к экзаменам?',
                options: [
                    'Да, определенно',
                    'Скорее да',
                    'Не уверен(а)',
                    'Скорее нет',
                    'Нет'
                ]
            },
            tj: {
                question: 'Оё шумо фикр мекунед, ки барномаи мобилӣ метавонад ба хонандагон дар тайёрӣ ба имтиҳонот кӯмак кунад?',
                options: [
                    'Бале, албатта',
                    'Бештар бале',
                    'Боварӣ надорам',
                    'Бештар не',
                    'Не'
                ]
            },
            uz: {
                question: "Sizningcha, mobil ilova o'quvchilarga imtihonlarga tayyorgarlikda yordam bera oladimi?",
                options: [
                    'Ha, albatta',
                    "Ko'proq ha",
                    "Ishonchim komil emas",
                    "Ko'proq yo'q",
                    "Yo'q"
                ]
            }
        }
    },
    {
        id: 3,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Какие функции для учеников были бы НАИБОЛЕЕ ВАЖНЫ в образовательном приложении? (выберите до 5)',
                options: [
                    'Тесты для самопроверки',
                    'Электронные учебники и материалы',
                    'Отслеживание прогресса учеников',
                    'Помощь в определении образовательного кластера',
                    'Объяснение решений и правильных ответов',
                    'Возможность работы без интернета',
                    'Напоминания и геймификация',
                    'Видео-материалы по темам',
                    'Индивидуальные рекомендации',
                    'Статистика и аналитика',
                    'Другое'
                ]
            },
            tj: {
                question: 'Кадом функсияҳо барои хонандагон дар барномаи таҳсилӣ МУҲИМТАРИН мебуданд? (то 5-ро интихоб кунед)',
                options: [
                    'Тестҳо барои худсанҷӣ',
                    'Китобҳо ва маводҳои электронӣ',
                    'Пайгирии пешравии хонандагон',
                    'Кӯмак дар муайян кардани кластери таҳсилӣ',
                    'Шарҳи ҳалҳо ва ҷавобҳои дуруст',
                    'Имконияти кор бе интернет',
                    'Ёдрасониҳо ва геймификатсия',
                    'Маводҳои видеоӣ аз мавзӯъҳо',
                    'Тавсияҳои инфиродӣ',
                    'Статистика ва аналитика',
                    'Дигар'
                ]
            },
            uz: {
                question: "O'quvchilar uchun ta'lim ilovasida qaysi funksiyalar ENG MUHIM bo'lardi? (5 tagacha tanlang)",
                options: [
                    "O'z-o'zini tekshirish uchun testlar",
                    "Elektron darsliklar va materiallar",
                    "O'quvchilar taraqqiyotini kuzatish",
                    "Ta'lim klasterini aniqlashda yordam",
                    "Yechimlar va to'g'ri javoblarning tushuntirishlari",
                    "Internetsiz ishlash imkoniyati",
                    "Eslatmalar va geymifikatsiya",
                    "Mavzular bo'yicha video-materiallar",
                    "Individual tavsiyalar",
                    "Statistika va analitika",
                    "Boshqa"
                ]
            }
        },
        maxselect: 5
    },
    {
        id: 4,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Рекомендовали бы вы такое приложение своим ученикам?',
                options: [
                    'Да, обязательно',
                    'Скорее да',
                    'Не уверен(а)',
                    'Скорее нет',
                    'Нет'
                ]
            },
            tj: {
                question: 'Оё шумо чунин барномаро ба шогирдони худ тавсия медиҳед?',
                options: [
                    'Бале, албатта',
                    'Бештар бале',
                    'Боварӣ надорам',
                    'Бештар не',
                    'Не'
                ]
            },
            uz: {
                question: "Bunday ilovani o'quvchilaringizga tavsiya qilasizmi?",
                options: [
                    'Ha, albatta',
                    "Ko'proq ha",
                    "Ishonchim komil emas",
                    "Ko'proq yo'q",
                    "Yo'q"
                ]
            }
        }
    },
    {
        id: 5,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Как часто ваши ученики используют мобильные устройства для учебы?',
                options: [
                    'Очень часто',
                    'Часто',
                    'Иногда',
                    'Редко',
                    'Почти никогда'
                ]
            },
            tj: {
                question: 'Шогирдони шумо чӣ қадар зиёд аз дастгоҳҳои мобилӣ барои таҳсил истифода мебаранд?',
                options: [
                    'Хеле зиёд',
                    'Зиёд',
                    'Баъзан',
                    'Камтар',
                    'Қариб ҳеҷ гоҳ не'
                ]
            },
            uz: {
                question: "O'quvchilaringiz mobil qurilmalaridan o'qish uchun qanchalik tez-tez foydalanadilar?",
                options: [
                    'Juda tez-tez',
                    'Tez-tez',
                    'Bazan',
                    'Kamdan-kam',
                    'Deyarli hech qachon'
                ]
            }
        }
    },
    {
        id: 6,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Какие предметы, по вашему мнению, должны быть в приложении в первую очередь?',
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
                    'Обществознание',
                    'Другие'
                ]
            },
            tj: {
                question: 'Ба фикри шумо, кадом фанҳо бояд дар барнома дар навбати аввал бошанд?',
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
                    'Ҷомеашиносӣ',
                    'Дигар'
                ]
            },
            uz: {
                question: "Sizningcha, ilovada birinchi navbatda qaysi fanlar bo'lishi kerak?",
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
                    'Ijtimoiyot',
                    'Boshqalar'
                ]
            }
        }
    },
    {
        id: 7,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Насколько важна для учеников функция определения образовательного кластера?',
                options: [
                    'Очень важна',
                    'Важна',
                    'Средне важна',
                    'Не очень важна',
                    'Не важна'
                ]
            },
            tj: {
                question: 'Функсияи муайян кардани кластери таҳсилӣ барои хонандагон чӣ қадар муҳим аст?',
                options: [
                    'Хеле муҳим',
                    'Муҳим',
                    'Миёна муҳим',
                    'Он қадар муҳим не',
                    'Муҳим нест'
                ]
            },
            uz: {
                question: "O'quvchilar uchun ta'lim klasterini aniqlash funksiyasi qanchalik muhim?",
                options: [
                    'Juda muhim',
                    'Muhim',
                    "O'rtacha muhim",
                    'Unchalik muhim emas',
                    'Muhim emas'
                ]
            }
        }
    },
    {
        id: 8,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'На каком языке, по вашему мнению, ученикам было бы удобнее использовать подобное приложение?',
                options: [
                    'Только таджикский',
                    'Только русский',
                    'Оба языка (с возможностью переключения)',
                    'Другие языки также важны'
                ]
            },
            tj: {
                question: 'Ба фикри шумо, хонандагон барномаро ба кадом забон истифода бурдан барояшон қулайтар мебуд?',
                options: [
                    'Танҳо тоҷикӣ',
                    'Танҳо русӣ',
                    'Ҳарду забон (бо имконияти иваз кардан)',
                    'Забони дигар низ муҳиманд'
                ]
            },
            uz: {
                question: "Sizningcha, o'quvchilar uchun bunday ilovani qaysi tilda ishlatish qulayroq bo'lardi?",
                options: [
                    'Faqat tojik',
                    'Faqat rus',
                    "Ikkala til (almashtirish imkoniyati bilan)",
                    "Boshqa tillar ham muhim"
                ]
            }
        }
    },
    {
        id: 9,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Хотели бы вы иметь доступ к статистике прогресса ваших учеников через приложение?',
                options: [
                    'Да, очень хотел(а) бы',
                    'Скорее да',
                    'Не уверен(а)',
                    'Скорее нет',
                    'Нет'
                ]
            },
            tj: {
                question: 'Оё шумо мехоҳед, ки тавассути барнома ба омории пешравии шогирдони худ дастрасӣ дошта бошед?',
                options: [
                    'Бале, хеле мехоҳам',
                    'Бештар бале',
                    'Боварӣ надорам',
                    'Бештар не',
                    'Не'
                ]
            },
            uz: {
                question: "Ilova orqali o'quvchilaringiz taraqqiyotining statistikasiga kirish imkoniyatiga ega bo'lishni istaysizmi?",
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
        id: 10,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Что, по вашему мнению, важнее всего для качественного образовательного приложения? (выберите ТОП-3)',
                options: [
                    'Соответствие школьной программе',
                    'Качество учебных материалов',
                    'Удобный интерфейс',
                    'Возможность отслеживания прогресса',
                    'Мотивационные элементы',
                    'Бесплатность',
                    'Работа без интернета',
                    'Адаптивность к уровню ученика',
                    'Другое'
                ]
            },
            tj: {
                question: 'Ба фикри шумо, барои барномаи таҳсилии сифатнок чӣ муҳимтарин аст? (ТОП-3-ро интихоб кунед)',
                options: [
                    'Мутобиқат бо барномаи мактабӣ',
                    'Сифати маводҳои таълимӣ',
                    'Интерфейси қулай',
                    'Имконияти пайгирии пешравӣ',
                    'Унсурҳои ҳавасмандкунанда',
                    'Ройгон будан',
                    'Кор бе интернет',
                    'Мутобиқшавӣ ба сатҳи хонанда',
                    'Дигар'
                ]
            },
            uz: {
                question: "Sizningcha, sifatli ta'lim ilovasi uchun eng muhimi nima? (TOP-3 ni tanlang)",
                options: [
                    "Maktab dasturiga mos kelishi",
                    "O'quv materiallarining sifati",
                    "Qulay interfeys",
                    "Taraqqiyotni kuzatish imkoniyati",
                    "Motivatsion elementlar",
                    "Bepul bo'lishi",
                    "Internetsiz ishlash",
                    "O'quvchi darajasiga moslashuvchanlik",
                    "Boshqa"
                ]
            }
        },
        maxselect: 3
    },
    {
        id: 11,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Используете ли вы сейчас какие-либо цифровые инструменты в обучении?',
                options: [
                    'Да, регулярно',
                    'Да, иногда',
                    'Очень редко',
                    'Нет, не использую'
                ]
            },
            tj: {
                question: 'Оё шумо ҳоло дар таълим аз абзорҳои рақамӣ истифода мебаред?',
                options: [
                    'Бале, мунтазам',
                    'Бале, баъзан',
                    'Хеле камтар',
                    'Не, истифода намебарам'
                ]
            },
            uz: {
                question: "Hozirda o'qitishda raqamli vositalardan foydalanasizmi?",
                options: [
                    'Ha, muntazam',
                    'Ha, bazan',
                    'Juda kamdan-kam',
                    "Yo'q, foydalanmayman"
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
                question: 'Как вы оцениваете готовность ваших учеников к самостоятельным занятиям через приложение?',
                options: [
                    'Высокая готовность',
                    'Средняя готовность',
                    'Низкая готовность',
                    'Очень низкая готовность',
                    'Затрудняюсь ответить'
                ]
            },
            tj: {
                question: 'Шумо омодагии шогирдони худро ба машғулиятҳои мустақилона тавассути барнома чӣ гуна арзёбӣ мекунед?',
                options: [
                    'Омодагии баланд',
                    'Омодагии миёна',
                    'Омодагии паст',
                    'Омодагии хеле паст',
                    'Душвор аст ҷавоб додан'
                ]
            },
            uz: {
                question: "O'quvchilaringizning ilova orqali mustaqil mashg'ulotlarga tayyorligini qanday baholaysiz?",
                options: [
                    'Yuqori tayyorlik',
                    "O'rta tayyorlik",
                    'Past tayyorlik',
                    'Juda past tayyorlik',
                    "Javob berishga qiynalaman"
                ]
            }
        }
    },
    {
        id: 13,
        type: 'multiple',
        required: true,
        translations: {
            ru: {
                question: 'Какие дополнительные возможности могли бы быть полезны для преподавателей?',
                options: [
                    'Создание своих тестов и заданий',
                    'Отслеживание прогресса класса',
                    'Назначение домашних заданий через приложение',
                    'Аналитика слабых мест учеников',
                    'Коммуникация с учениками',
                    'Библиотека готовых материалов',
                    'Методические рекомендации',
                    'Другое'
                ]
            },
            tj: {
                question: 'Кадом имкониятҳои иловагӣ барои омӯзгорон муфид буда метавонанд?',
                options: [
                    'Эҷоди тестҳо ва супоришҳои худӣ',
                    'Пайгирии пешравии синф',
                    'Таъин кардани супоришҳои хонагӣ тавассути барнома',
                    'Аналитикаи нуқтаҳои заъифи хонандагон',
                    'Муошират бо хонандагон',
                    'Китобхонаи маводҳои тайёр',
                    'Тавсияҳои методӣ',
                    'Дигар'
                ]
            },
            uz: {
                question: "O'qituvchilar uchun qanday qo'shimcha imkoniyatlar foydali bo'lishi mumkin?",
                options: [
                    "O'z testlari va topshiriqlarini yaratish",
                    "Sinf taraqqiyotini kuzatish",
                    "Ilova orqali uy vazifalarini belgilash",
                    "O'quvchilarning zaif tomonlari tahlili",
                    "O'quvchilar bilan muloqot",
                    "Tayyor materiallar kutubxonasi",
                    "Uslubiy tavsiyalar",
                    "Boshqa"
                ]
            }
        }
    },
    {
        id: 14,
        type: 'single',
        required: true,
        translations: {
            ru: {
                question: 'Считаете ли вы, что приложение должно быть полностью бесплатным?',
                options: [
                    'Да, обязательно бесплатным',
                    'Может быть платным, но доступным',
                    'Базовая версия бесплатна, расширенная — платная',
                    'Не важно',
                    'Затрудняюсь ответить'
                ]
            },
            tj: {
                question: 'Оё шумо фикр мекунед, ки барнома бояд пуррагӣ ройгон бошад?',
                options: [
                    'Бале, албатта ройгон',
                    'Метавонад пулакӣ бошад, аммо дастрас',
                    'Версияи асосӣ ройгон, васеъшуда — пулакӣ',
                    'Муҳим нест',
                    'Душвор аст ҷавоб додан'
                ]
            },
            uz: {
                question: "Sizningcha, ilova to'liq bepul bo'lishi kerakmi?",
                options: [
                    'Ha, albatta bepul',
                    "Pullik bo'lishi mumkin, lekin arzon",
                    "Asosiy versiya bepul, kengaytirilgan - pullik",
                    'Muhim emas',
                    "Javob berishga qiynalaman"
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
                question: 'Ваши пожелания, идеи и рекомендации для разработки приложения',
                placeholder: 'Напишите свои пожелания и рекомендации здесь...'
            },
            tj: {
                question: 'Орзуҳо, ақидаҳо ва тавсияҳои шумо барои таҳияи барнома',
                placeholder: 'Орзуҳо ва тавсияҳои худро дар ин ҷо нависед...'
            },
            uz: {
                question: "Ilova ishlab chiqish uchun tilak, g'oya va tavsiyalaringiz",
                placeholder: "Bu yerda tilak va tavsiyalaringizni yozing..."
            }
        }
    }
];
