import Course from "../../models/course.model";

export default defineEventHandler(async (event) => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (e: any) {
    return { message: e.message };
  }
});
