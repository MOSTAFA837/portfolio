import prismadb from "@/lib/prismadb";
import SkillsClient from "./components/client";

const CategoriesPage = async () => {
  const skills = await prismadb.skill.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1  pt-6">
        <SkillsClient data={skills} />
      </div>
    </div>
  );
};

export default CategoriesPage;
