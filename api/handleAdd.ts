
export const handleAdd = async <T>({ collection, data, handleSuccess, handleError }: {
    data: T,
    collection: CollectionNames,
    handleSuccess?: (res: any) => void,
    handleError?: (err: any) => void,

}) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${collection}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.status === 201) {
            handleSuccess?.(res);
        } else if (res.status === 400) {
            const error = await res.json();
            throw new Error(error.error);
        }
        else {
            throw new Error("Failed to create element");
        }
    } catch (error) {
        handleError?.(error)
    }
};