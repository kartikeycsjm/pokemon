export function Loading() {
    return <div className="text-center p-10 animate-pulse text-gray-500">Loading Pokémons...</div>;
}


export function Error({ message }: { message: string }) {
    return <div className="text-center p-10 text-red-500">{message}</div>;
}
