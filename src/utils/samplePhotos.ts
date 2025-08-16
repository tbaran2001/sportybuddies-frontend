export const sampleSportsPhotos = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop', // Basketball
    'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=600&fit=crop', // Soccer
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&h=600&fit=crop', // Running
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop', // Tennis
    'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&h=600&fit=crop', // Gym workout
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=600&fit=crop', // Yoga
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=600&fit=crop', // Swimming
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop', // Cycling
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop', // Rock climbing
    'https://images.unsplash.com/photo-1506629905607-d53a47654f24?w=500&h=600&fit=crop', // Hiking
    'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=500&h=600&fit=crop', // Boxing
    'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=500&h=600&fit=crop', // Volleyball
];

export const getRandomSportsPhotos = (count: number = 3): string[] => {
    const shuffled = [...sampleSportsPhotos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getPhotosByActivity = (activity: string): string[] => {
    const activityPhotos: { [key: string]: string[] } = {
        gym: [
            'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583500178690-f7fd1d14a2df?w=500&h=600&fit=crop',
        ],
        outdoor: [
            'https://images.unsplash.com/photo-1506629905607-d53a47654f24?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop',
        ],
        ball_sports: [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=500&h=600&fit=crop',
        ],
        water_sports: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=600&fit=crop',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=600&fit=crop',
        ]
    };

    return activityPhotos[activity] || getRandomSportsPhotos(3);
};