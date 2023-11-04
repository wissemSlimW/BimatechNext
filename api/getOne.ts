
export const getOne = async <T>({ collection,_id, handleSuccess, handleError }: {
    collection: CollectionNames,
    _id:string,
    handleSuccess?: (res: any) => void,
    handleError?: (err: any) => void,

}) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${collection}/${_id}`,{
            cache: "no-store",
          });

        if (!(res.status === 200)) {
            throw new Error("Failed to fetch data");
        }
        const data: Promise<T> = res.json()
        handleSuccess?.(data)
        return data 
    } catch (error) {
        console.log(`Error loading : ${collection}`, error);
        handleError?.(error)
    }
};

