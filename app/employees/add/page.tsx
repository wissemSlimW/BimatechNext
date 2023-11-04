
import { EmployeesCRU } from "../components/EmployeeFormCRU";
import { getAll } from "@/api";

const AddEmployee = async() => {
    const skills = await getAll<Skill>({ collection: 'skills' })

    return (
        <EmployeesCRU mode="add" {...{skills}} />
    );
}
export default AddEmployee