
export const handleEdit = async <T>({ _id, collection, data, handleSuccess, handleError }: {
    _id: string,
    data: T,
    collection: CollectionNames,
    handleSuccess?: (res: any) => void,
    handleError?: (err: any) => void,

}) => {
    try {
        const res = await fetch(`/api/${collection}/${_id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            handleSuccess?.(res);
        } else {
            throw new Error("Failed to update element");
        }
    } catch (error) {
        console.log(error);
        handleError?.(error)
    }
};