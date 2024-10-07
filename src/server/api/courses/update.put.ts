import Course from "../../models/course.model";

export default defineEventHandler(async (event) => {
  try {
    const body: any = await readBody(event);
    const course = await Course.findOneAndUpdate({ name: body.name }, body);

    console.log("Document Updated Successfully!");
    return course;
  } catch (e: any) {
    return { message: e.message };
  }
});
