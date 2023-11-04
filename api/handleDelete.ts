
export const handleDelete = ({ _id, collection, handleSuccess, handleError }: {
    _id: string,
    collection: CollectionNames,
    handleSuccess?: (res: any) => void,
    handleError?: (err: any) => void,

}) => {

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${collection}/${_id}`, {
        method: "DELETE",
    }).then((res) => {
        handleSuccess?.(res);
    }).catch((error) => {
        console.log(error);
        handleError?.(error)
    })
};