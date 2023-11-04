
import { getOne } from "@/api/getOne";

import { EmployeesCRU } from "../../components/EmployeeFormCRU";
import { getAll } from "@/api/getAll";

const EditEmployee = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const employee = await getOne<Employee>({ collection: 'employees', _id: id })
    const skills = await getAll<Skill>({ collection: 'skills' })
    return (
        <EmployeesCRU mode="edit" {...{ employee, skills }} />
    );
}
export default EditEmployee