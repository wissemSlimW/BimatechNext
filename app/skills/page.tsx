

import { getAll } from '../../api/getAll';
import { Table } from './components/Table';

const SkillsList =async () => {
    const data = await getAll<Skill>({ collection: 'skills', });
    return (
        <div >
            <h1>Skills</h1>
            <Table {...{data}} />
        </div>
    )
}
export default SkillsList
