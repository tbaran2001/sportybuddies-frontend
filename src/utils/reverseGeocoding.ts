export async function reverseGeocodeCity(latitude: number, longitude: number): Promise<string | null> {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        console.warn('VITE_GOOGLE_MAPS_API_KEY is not set. Reverse geocoding will return null.');
        return null;
    }

    const params = new URLSearchParams({
        latlng: `${latitude},${longitude}`,
        result_type: 'locality|postal_town|administrative_area_level_3|administrative_area_level_2',
        language: 'en',
        key: apiKey,
    });

    const url = `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error('Reverse geocoding failed with status', res.status);
            return null;
        }
        const data = (await res.json()) as GoogleGeocodeResponse;
        if (data.status !== 'OK' || !data.results?.length) return null;

        for (const result of data.results) {
            const cityComp = result.address_components.find(c =>
                c.types.includes('locality') || c.types.includes('postal_town')
            );
            if (cityComp) return cityComp.long_name;
        }

        const fallbackComp = data.results[0].address_components.find(c =>
            c.types.includes('administrative_area_level_3') || c.types.includes('administrative_area_level_2')
        );
        return fallbackComp ? fallbackComp.long_name : null;
    } catch (e) {
        console.error('Reverse geocoding error', e);
        return null;
    }
}

export type GoogleGeocodeResponse = {
    status: string;
    results: Array<{
        address_components: Array<{
            long_name: string;
            short_name: string;
            types: string[];
        }>;
        formatted_address: string;
        place_id: string;
        types: string[];
    }>;
};

