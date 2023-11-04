

import { getAll } from '../../api/getAll';
import { Table } from './components/Table';

const EmployeesList =async () => {
    const data = await getAll<Employee>({ collection: 'employees', });
    return (
        <div >
            <h1>Employees</h1>
            <Table {...{data}} />
        </div>
    )
}
export default EmployeesList
