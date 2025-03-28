export const formatDate = (dateInput, locale = "en-US") => {
    if (!dateInput) return "N/A";

    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};
export const countiesData = [
    {
        name: "Nairobi",
        subCounties: ["Westlands", "Dagoretti North", "Dagoretti South", "Langata", "Kibra", "Roysambu", "Kasarani", "Ruaraka", "Embakasi South", "Embakasi North", "Embakasi Central", "Embakasi East", "Embakasi West", "Makadara", "Kamukunji", "Starehe", "Mathare"]
    },
    {
        name: "Baringo",
        subCounties: ["Baringo Central", "Baringo North", "Baringo South", "Eldama Ravine", "Mogotio", "Tiaty East", "Tiaty West"]
    },
    {
        name: "Kakamega",
        subCounties: ["Butere", "Khwisero", "Lugari", "Likuyani", "Lurambi", "Malava", "Matungu", "Mumias East", "Mumias West", "Navakholo", "Shinyalu"]
    },
    {
        name: "Kiambu",
        subCounties: ["Gatundu North", "Gatundu South", "Githunguri", "Juja", "Kabete", "Kiambaa", "Kiambu Town", "Kikuyu", "Lari", "Limuru", "Ruiru", "Thika Town"]
    },
    {
        name: "Mombasa",
        subCounties: ["Changamwe", "Jomvu", "Kisauni", "Likoni", "Mvita", "Nyali"]
    },
    {
        name: "Nakuru",
        subCounties: ["Naivasha", "Nakuru Town East", "Nakuru Town West", "Rongai", "Gilgil", "Subukia", "Kuresoi North", "Kuresoi South", "Molo", "Njoro"]
    },
    {
        name: "Kisumu",
        subCounties: ["Kisumu East", "Kisumu West", "Kisumu Central", "Muhoroni", "Nyakach", "Nyando", "Seme"]
    },
    {
        name: "Bungoma",
        subCounties: ["Bumula", "Kanduyi", "Kimilili", "Mt. Elgon", "Sirisia", "Tongaren", "Webuye East", "Webuye West"]
    },
    {
        name: "Nyeri",
        subCounties: ["Kieni East", "Kieni West", "Mathira East", "Mathira West", "Mukurweini", "Nyeri Town", "Othaya", "Tetu"]
    },
    {
        name: "Uasin Gishu",
        subCounties: ["Ainabkoi", "Kapseret", "Kesses", "Moiben", "Soy", "Turbo"]
    },
    {
        name: "Kilifi",
        subCounties: ["Ganze", "Kaloleni", "Kilifi North", "Kilifi South", "Magarini", "Malindi", "Rabai"]
    },
    {
        name: "Garissa",
        subCounties: ["Balambala", "Dadaab", "Fafi", "Garissa Township", "Hulugho", "Ijara", "Lagdera"]
    },
    {
        name: "Siaya",
        subCounties: ["Alego Usonga", "Bondo", "Gem", "Rarieda", "Ugenya", "Ugunja"]
    },
    {
        name: "Kirinyaga",
        subCounties: ["Gichugu", "Kirinyaga Central", "Kirinyaga East", "Kirinyaga West", "Mwea East", "Mwea West"]
    },
    {
        name: "Meru",
        subCounties: ["Buuri", "Igembe Central", "Igembe North", "Igembe South", "Imenti Central", "Imenti North", "Imenti South", "Tigania East", "Tigania West"]
    },
    {
        name: "Machakos",
        subCounties: ["Kangundo", "Kathiani", "Machakos Town", "Masinga", "Matungulu", "Mavoko", "Mwala", "Yatta"]
    },
    {
        name: "Kajiado",
        subCounties: ["Isinya", "Kajiado Central", "Kajiado East", "Kajiado North", "Kajiado South", "Loitokitok"]
    },
    {
        name: "Turkana",
        subCounties: ["Turkana Central", "Turkana East", "Turkana North", "Turkana South", "Turkana West", "Loima"]
    },
    {
        name: "Mandera",
        subCounties: ["Banisa", "Lafey", "Mandera East", "Mandera North", "Mandera South", "Mandera West"]
    },
    {
        name: "Migori",
        subCounties: ["Awendo", "Kuria East", "Kuria West", "Nyatike", "Rongo", "Suna East", "Suna West", "Uriri"]
    },
    {
        name: "Nyamira",
        subCounties: ["Borabu", "Manga", "Masaba North", "Nyamira North", "Nyamira South"]
    },
    {
        name: "Vihiga",
        subCounties: ["Emuhaya", "Hamisi", "Luanda", "Sabatia", "Vihiga"]
    },
    {
        name: "Trans Nzoia",
        subCounties: ["Cherangany", "Endebess", "Kwanza", "Saboti", "Kiminini"]
    },
    {
        name: "Narok",
        subCounties: ["Narok East", "Narok North", "Narok South", "Narok West", "Trans Mara East", "Trans Mara West"]
    },
    {
        name: "Laikipia",
        subCounties: ["Laikipia Central", "Laikipia East", "Laikipia North", "Laikipia West"]
    },
    {
        name: "Taita Taveta",
        subCounties: ["Mwatate", "Taita", "Taveta", "Voi"]
    },
    {
        name: "Samburu",
        subCounties: ["Samburu Central", "Samburu East", "Samburu North"]
    },
    {
        name: "Tharaka Nithi",
        subCounties: ["Chuka", "Igambang’ombe", "Maara", "Tharaka North", "Tharaka South"]
    },
    {
        name: "Wajir",
        subCounties: ["Eldas", "Tarbaj", "Wajir East", "Wajir North", "Wajir South", "Wajir West"]
    },
    {
        name: "West Pokot",
        subCounties: ["Kipkomo", "Pokot Central", "Pokot North", "Pokot South", "West Pokot"]
    }
];

