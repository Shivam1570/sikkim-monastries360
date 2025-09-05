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
    virtualTourImage: string;
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
        image: 'https://picsum.photos/800/600',
        virtualTourImage: 'https://picsum.photos/1200/800'
    },
    {
        id: 'pemayangtse-monastery',
        name: 'Pemayangtse Monastery',
        location: { lat: 27.3005, lng: 88.2612 },
        district: 'West Sikkim',
        established: '1705',
        description: 'Pemayangtse Monastery is a Buddhist monastery in Pemayangtse, near Pelling in the northeastern Indian state of Sikkim. Planned, designed and founded by Lama Lhatsun Chempo, it is one of the oldest and premier monasteries of Sikkim.',
        history: 'The monastery was built by Lama Lhatsun Chempo in 1705. The monastery is part of the Nyingma order and all other Nyingma monasteries in Sikkim are subordinate to it. The monks of this monastery are normally chosen from the Bhutias of Sikkim.',
        image: 'https://picsum.photos/800/601',
        virtualTourImage: 'https://picsum.photos/1200/801'
    },
    {
        id: 'tashiding-monastery',
        name: 'Tashiding Monastery',
        location: { lat: 27.2764, lng: 88.2934 },
        district: 'West Sikkim',
        established: '1641',
        description: 'Tashiding Monastery is a Buddhist monastery of the Nyingma sect of Tibetan Buddhism in Western Sikkim, northeastern India. It is located on top of the hill rising between the Rathong chu and the Rangeet River.',
        history: 'Tashiding means "The Devoted Central Glory". The monastery was founded in 1641 by Ngadak Sempa Chempo Phunshok Rigzing who belonged to the Nyingma sect of Tibetan Buddhism. It is believed that a single glimpse of the monastery can cleanse one of all sins.',
        image: 'https://picsum.photos/800/602',
        virtualTourImage: 'https://picsum.photos/1200/802'
    },
    {
        id: 'enchanting-enigma',
        name: 'Enchey Monastery',
        location: { lat: 27.3400, lng: 88.6160 },
        district: 'East Sikkim',
        established: '1909',
        description: 'The Enchey Monastery ("Solitary Temple") is located 3 kilometres (1.9 mi) northeast of Gangtok, the capital of Sikkim. It belongs to the Nyingma order of Vajrayana Buddhism.',
        history: 'The monastery was built on the spot which was blessed by Lama Drupthob Karpo, a renowned exponent of tantric (Vajrayana) art in Buddhism with flying powers. The present monastery was built during the reign of Sikyong Tulku (1909–1910).',
        image: 'https://picsum.photos/800/603',
        virtualTourImage: 'https://picsum.photos/1200/803'
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
