
export type Monastery = {
    id: string;
    name: string;
    location: {
      lat: number;
      lng: number;
    };
    district: string;
    established: string;
    description: string;
    history: string;
    image: string;
};

export const monasteries: Monastery[] = [
    {
        id: 'rumtek-monastery',
        name: 'Rumtek Monastery',
        location: { lat: 27.2885, lng: 88.5701 },
        district: 'East Sikkim',
        established: '16th century',
        description: 'Rumtek Monastery, also called the Dharmachakra Centre, is a gompa located in the Indian state of Sikkim near the capital Gangtok. It is a focal point for the Karma Kagyu lineage of Tibetan Buddhism.',
        history: 'Originally built by the 9th Karmapa Wangchuk Dorje in the 16th century, Rumtek served as the main seat of the Karma Kagyu lineage in Sikkim for some time. But when the 16th Karmapa arrived in Sikkim in 1959, after fleeing Tibet, the monastery was in ruins. He decided to rebuild Rumtek. The new monastery was completed in four years.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Rumtek_Monastery_in_Sikkim.jpg/1280px-Rumtek_Monastery_in_Sikkim.jpg',
    },
    {
        id: 'pemayangtse-monastery',
        name: 'Pemayangtse Monastery',
        location: { lat: 27.3005, lng: 88.2612 },
        district: 'West Sikkim',
        established: '1705',
        description: 'Pemayangtse Monastery is a Buddhist monastery in Pemayangtse, near Pelling in the northeastern Indian state of Sikkim. Planned, designed and founded by Lama Lhatsun Chempo, it is one of the oldest and premier monasteries of Sikkim.',
        history: 'The monastery was built by Lama Lhatsun Chempo in 1705. The monastery is part of the Nyingma order and all other Nyingma monasteries in Sikkim are subordinate to it. The monks of this monastery are normally chosen from the Bhutias of Sikkim.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Pemayangtse_Monastery_in_Sikkim%2C_India.jpg/1280px-Pemayangtse_Monastery_in_Sikkim%2C_India.jpg',
    },
    {
        id: 'tashiding-monastery',
        name: 'Tashiding Monastery',
        location: { lat: 27.2764, lng: 88.2934 },
        district: 'West Sikkim',
        established: '1641',
        description: 'Tashiding Monastery is a Buddhist monastery of the Nyingma sect of Tibetan Buddhism in Western Sikkim, northeastern India. It is located on top of the hill rising between the Rathong chu and the Rangeet River.',
        history: 'Tashiding means "The Devoted Central Glory". The monastery was founded in 1641 by Ngadak Sempa Chempo Phunshok Rigzing who belonged to the Nyingma sect of Tibetan Buddhism. It is believed that a single glimpse of the monastery can cleanse one of all sins.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tashiding_Monastery_Sikkim.jpg/1280px-Tashiding_Monastery_Sikkim.jpg',
    },
    {
        id: 'enche-monastery',
        name: 'Enchey Monastery',
        location: { lat: 27.3400, lng: 88.6160 },
        district: 'East Sikkim',
        established: '1909',
        description: 'The Enchey Monastery ("Solitary Temple") is located 3 kilometres (1.9 mi) northeast of Gangtok, the capital of Sikkim. It belongs to the Nyingma order of Vajrayana Buddhism.',
        history: 'The monastery was built on the spot which was blessed by Lama Drupthob Karpo, a renowned exponent of tantric (Vajrayana) art in Buddhism with flying powers. The present monastery was built during the reign of Sikyong Tulku (1909–1910).',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Enchey_Monastery_Sikkim_India.jpg/1280px-Enchey_Monastery_Sikkim_India.jpg',
    },
    {
        id: 'dubdi-monastery',
        name: 'Dubdi Monastery',
        location: { lat: 27.368, lng: 88.225 },
        district: 'West Sikkim',
        established: '1701',
        description: 'Dubdi Monastery, also known as the "Hermit\'s Cell", is considered to be the oldest monastery in Sikkim. It is located on a hilltop near Yuksom, surrounded by pristine forests.',
        history: 'Founded in 1701 by Chogyar Namgyal, Dubdi is a pivotal site for the Nyingma sect. It was the first monastery established after the consecration of the first Chogyal of Sikkim and served as a hermitage for meditating lamas.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dubdi_Monastery_Yuksom_Sikkim_India.jpg/1280px-Dubdi_Monastery_Yuksom_Sikkim_India.jpg',
    },
    {
        id: 'ralang-monastery',
        name: 'Ralang Monastery',
        location: { lat: 27.391, lng: 88.399 },
        district: 'South Sikkim',
        established: '1768',
        description: 'Ralang Monastery is a significant Kagyu monastery known for its impressive collection of paintings and thangkas. It hosts the annual Pang Lhabsol festival with vibrant masked dances.',
        history: 'The monastery was built in 1768 after the 4th Gyaltsab Rinpoche returned from a pilgrimage. Legend says that upon his return, he threw grains of rice from his seat in Tsurphu, Tibet, and where they landed, the Ralang Monastery was built.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ralang_monastery.jpg/1280px-Ralang_monastery.jpg',
    },
    {
        id: 'lachen-monastery',
        name: 'Lachen Monastery',
        location: { lat: 27.72, lng: 88.55 },
        district: 'North Sikkim',
        established: '1858',
        description: 'Perched on a hilltop overlooking the Lachen village, this Nyingma monastery offers breathtaking views of the surrounding mountains. It serves as the spiritual center for the local Lachenpa community.',
        history: 'Founded in 1858 by the Nyingma sect, Lachen Monastery has been a beacon of Buddhism in the remote northern regions of Sikkim. It houses a statue of Guru Padmasambhava and is an important pilgrimage site.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Lachen_Monastery_in_North_Sikkim.jpg/1280px-Lachen_Monastery_in_North_Sikkim.jpg',
    },
    {
        id: 'phodong-monastery',
        name: 'Phodong Monastery',
        location: { lat: 27.46, lng: 88.61 },
        district: 'North Sikkim',
        established: '18th century',
        description: 'Phodong Monastery is one of the six most important monasteries in Sikkim, belonging to the Kagyupa sect. It has a beautiful collection of ancient murals and is known for its annual festival featuring religious dances.',
        history: 'The monastery was founded in the early 18th century by the Chogyal Gyurmed Namgyal. However, the current structure was rebuilt in the early 20th century as the original had been destroyed by an earthquake. It remains an important religious institution.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Phodong_Monastery_Sikkim_India_-_2.jpg/1280px-Phodong_Monastery_Sikkim_India_-_2.jpg'
    }
];

export type CulturalEvent = {
    id: string;
    date: Date;
    title: string;
    description: string;
    monasteryId: string;
};

export const events: CulturalEvent[] = [
    {
        id: 'saga-dawa-2024',
        date: new Date('2024-06-23'),
        title: 'Saga Dawa',
        description: 'An auspicious month for Sikkimese Buddhists, with the full moon day of this month being the most sacred. It is believed that on this day the Buddha was born, attained Enlightenment and achieved nirvana.',
        monasteryId: 'rumtek-monastery',
    },
    {
        id: 'losar-2025',
        date: new Date('2025-02-28'),
        title: 'Losar Festival',
        description: 'The Tibetan New Year, a festival of great importance marked by ancient ceremonies, rituals, and a festive atmosphere.',
        monasteryId: 'pemayangtse-monastery',
    },
    {
        id: 'bumchu-2025',
        date: new Date('2025-03-15'),
        title: 'Bumchu Festival',
        description: 'A holy water ceremony at Tashiding Monastery. The level of water in the sacred pot is believed to forecast the fortunes of the coming year.',
        monasteryId: 'tashiding-monastery',
    }
];
