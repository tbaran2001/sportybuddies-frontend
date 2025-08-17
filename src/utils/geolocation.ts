export type Coordinates = { latitude: number; longitude: number };

export function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(resolve, (err) => {
            let msg = 'Failed to get current position.';
            if (err?.code === err.PERMISSION_DENIED) msg = 'Location permission was denied.';
            if (err?.code === err.POSITION_UNAVAILABLE) msg = 'Location position unavailable.';
            if (err?.code === err.TIMEOUT) msg = 'Location request timed out.';
            const error = new Error(msg);
            Object.assign(error, {cause: err});
            reject(error);
        }, options);
    });
}

export async function getCurrentCoordinates(options?: PositionOptions): Promise<Coordinates> {
    const pos = await getCurrentPosition(options);
    const {latitude, longitude} = pos.coords;
    return {latitude, longitude};
}
