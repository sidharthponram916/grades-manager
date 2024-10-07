import Course from "../../models/course.model";

export default defineEventHandler(async (event) => {
  try {
    const body: any = await readBody(event);

    const course = await Course.create({
      title: body.title,
      name: body.name,
      average: body.average,
      credits: body.credits,
      weights: body.weights,
      assignments: body.assignments,
    });

    return course;
  } catch (e: any) {
    return { message: e.message };
  }
});
