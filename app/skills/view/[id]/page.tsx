
import { getOne } from "@/api/getOne";
import { SkillsCRU } from "../../components/SkillFormCRU";

const ViewSkill = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const skill = await getOne<Skill>({ collection: 'skills', _id: id })

    return (
        <SkillsCRU mode="view"  {...{ skill }}  />
    );
}
export default ViewSkill