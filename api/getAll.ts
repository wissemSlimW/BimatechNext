
export const getAll = async <T>({ collection, handleSuccess, handleError }: {
    collection: CollectionNames,
    handleSuccess?: (res: any) => void,
    handleError?: (err: any) => void,

}) => {
    try {
        const res = await fetch(`/api/${collection}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data: Promise<T[]> = res.json()
        handleSuccess?.(data)
        return data || [];
    } catch (error) {
        console.log(`Error loading : ${collection}`, error);
        handleError?.(error)
        return [];

    }
};