
import { getOne } from "@/api/getOne";

import { SkillsCRU } from "../../components/SkillFormCRU";

const EditSkill = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const skill = await getOne<Skill>({ collection: 'skills', _id: id })
    return (
        <SkillsCRU mode="edit" {...{ skill }} />
    );
}
export default EditSkill