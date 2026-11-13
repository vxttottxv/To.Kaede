/**
 * 🎂 Birthday Celebration Website - Memory Data Configuration (English)
 * Customized for Kaede with 6 Treasured Memories
 */

const BIRTHDAY_CONFIG = {
    name: "Kaede",
    title: "HBD Kaede",
    subtitle: "Drifting pieces of our memories beneath the tranquil water ✨",
    hint: "Click on any floating polaroid to open our moments",
    
    // Heartfelt Birthday Letter for Kaede
    letter: {
        title: "Dear. Kaede 💌",
        date: "November 13, 2026",
        content: `Dearest Kaede,

Happy, happiest birthday to you! 🎂✨

From the very first day we shared ice cream together on that cold street, to freezing our hands off building a giant snowman, welcoming the new year under the glowing tower, partying like crazy devils at Mariana's farewell, and chasing the ocean breeze...

Every single memory with you is so deeply precious and full of pure joy.
Thank you for bringing so much laughter, warmth, and light into my life.

I hope today is as wonderfully bright, kind, and magical as you are.
May your new year be blessed with great adventures, gentle days, and boundless happiness! 🤍

With all my love and gratitude,
Forever your soulmate`
    }
};

// 🌟 The 6 Floating Memories (Clean, concise titles that fit perfectly)
const MEMORIES = [
    {
        id: 1,
        title: "Our First Meet 🍦",
        date: "Memory 01",
        description: "Where our story began! Freezing cold hands, sweet ice cream bars, and delicious mango bubble tea.",
        coverImage: "static/images/memories/group1/first_meet.jpg",
        photos: [
            {
                src: "static/images/memories/group1/first_meet.jpg",
                caption: "Our very first sweet moment together 🍦✨"
            },
            {
                src: "static/images/memories/group1/bubble_tea.jpg",
                caption: "Sweet real fruit mango bubble tea 🥭🧋"
            }
        ]
    },
    {
        id: 2,
        title: "Happy New Year ✨",
        date: "Memory 02",
        description: "Counting down to the brand new year under the glowing lights of Toronto!",
        coverImage: "static/images/memories/group2/toronto_sign.jpg",
        photos: [
            {
                src: "static/images/memories/group2/toronto_sign.jpg",
                caption: "Happy New Year in front of TORONTO sign ✨🤍"
            },
            {
                src: "static/images/memories/group2/new_year_video.mov",
                caption: "Capturing our vibrant New Year celebration moments 🎥🎆"
            },
            {
                src: "static/images/memories/group2/new_year.jpg",
                caption: "Pure chaotic joy jumping under the night tower 🎆"
            },
            {
                src: "static/images/memories/group2/toronto_skate.jpg",
                caption: "Sparkling night at the illuminated ice rink ⛸️💫"
            },
            {
                src: "static/images/memories/group2/toronto_selfie.jpg",
                caption: "Cute glowing selfie with the city lights 🌃"
            },
            {
                src: "static/images/memories/group2/sunglasses_filter.jpg",
                caption: "Cool glitter sunglasses party mood 🕶️✨"
            }
        ]
    },
    {
        id: 3,
        title: "Crazy Squad 🍻",
        date: "Memory 03",
        description: "Giant beer mugs, subway giggles, Tim Hortons, and the chaotic fun of our craziest gatherings.",
        coverImage: "static/images/memories/group3/crazy_crew.jpg",
        photos: [
            {
                src: "static/images/memories/group3/crazy_crew.jpg",
                caption: "Cheers to our crazy, lovely squad 🍻🤍"
            },
            {
                src: "static/images/memories/group3/crazy_video.mov",
                caption: "Chaotic energy and unforgettable laughs with the squad 🎥😂"
            },
            {
                src: "static/images/memories/group3/subway_laugh.jpg",
                caption: "Bursting out laughing together on the subway 🚇😆"
            },
            {
                src: "static/images/memories/group3/tim_hortons.jpg",
                caption: "Tim Hortons coffee and our funniest lock screen ☕📱"
            },
            {
                src: "static/images/memories/group3/mirror_chandelier.jpg",
                caption: "Golden mirror selfie under the chandelier ✨🪞"
            },
            {
                src: "static/images/memories/group3/sunny_snow.jpg",
                caption: "Squinting and smiling on a bright winter street ❄️☀️"
            },
            {
                src: "static/images/memories/group3/funny_glasses.jpg",
                caption: "Silly purple sunglasses filter moments 🤪🕶️"
            },
            {
                src: "static/images/memories/group3/subway_peace.jpg",
                caption: "Double peace signs heading back home ✌️🚇"
            }
        ]
    },
    {
        id: 4,
        title: "Mr. Snowman ⛄",
        date: "Memory 04",
        description: "Bundled up in thick winter jackets, rolling giant snowballs, and laughing while making snow angels.",
        coverImage: "static/images/memories/group4/snowman.jpg",
        photos: [
            {
                src: "static/images/memories/group4/snowman.jpg",
                caption: "Chilling with Mr. Snowman on a winter day ❄️⛄"
            },
            {
                src: "static/images/memories/group4/snow_angel.jpg",
                caption: "Laughing out loud making a snow angel in deep snow ❄️👼"
            }
        ]
    },
    {
        id: 5,
        title: "Mariana Farewell 😈",
        date: "Memory 05",
        description: "Devil horns, shimmering glitter filters, party hand stamps, and dancing the bittersweet night away.",
        coverImage: "static/images/memories/group5/farewell_party.jpg",
        photos: [
            {
                src: "static/images/memories/group5/farewell_party.jpg",
                caption: "Two cute devils at Mariana's farewell night 😈✨"
            },
            {
                src: "static/images/memories/group5/bluebird_glitter.jpg",
                caption: "Bluebirds and sparkling glitter selfie 🐦✨"
            },
            {
                src: "static/images/memories/group5/beaver_filter.jpg",
                caption: "The cutest beaver smiles and funny laughs 🦫🤍"
            },
            {
                src: "static/images/memories/group5/party_trio.jpg",
                caption: "Cozy bar table with our favorite crew 🍸🍷"
            },
            {
                src: "static/images/memories/group5/fist_numbers.jpg",
                caption: "Table number stamps on our fists at W Burger Bar 🍔✊"
            },
            {
                src: "static/images/memories/group5/mirror_peace.jpg",
                caption: "High peace signs in the restroom mirror selfie ✌️🖤"
            }
        ]
    },
    {
        id: 6,
        title: "Trip to the Sea 🌊",
        date: "Memory 06",
        description: "The calm waters, sea breeze, and sunny memories by the ocean with Kaede.",
        coverImage: "static/images/memories/group6/sea_dock.jpg",
        photos: [
            {
                src: "static/images/memories/group6/sea_dock.jpg",
                caption: "Gazing out into the vast blue ocean dock 🌊✨"
            },
            {
                src: "static/images/memories/group6/sea_video.mov",
                caption: "Our unforgettable memories by the sea breeze 🎥🌊"
            },
            {
                src: "static/images/memories/group6/sea_trip.jpg",
                caption: "Mirror selfie before feeling the ocean breeze ☕🌊"
            }
        ]
    },
    {
        id: 7,
        title: "Roomie 🏠",
        date: "Memory 07",
        description: "Cozy moments, late night talks, and everyday laughs shared as the best roommates.",
        coverImage: "static/images/memories/group7/roomie_cover.png",
        photos: [
            {
                src: "static/images/memories/group7/roomie_video1.mov",
                caption: "Unfiltered, funny roommate moments with Kaede 🎥✨"
            },
            {
                src: "static/images/memories/group7/roomie_video2.mov",
                caption: "Late night laughs and sweet memories at our room 🎥🤍"
            }
        ]
    }
];
