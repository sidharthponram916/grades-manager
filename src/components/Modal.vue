<template lang="">
  <div v-if="show" class="modal">
    <div class="mx-auto my-4 rounded w-1/2 text-xl bg-slate-100 text-center">
      <div class="text-right mr-7 mt-4" @click="this.$emit('close')">x</div>
      <div class="text-black m-auto w-1/6 rounded text-center">
        <div class="font-bold">{{ course.average.toFixed(2) }}%</div>
      </div>
      <div class="text-center text-sm">
        {{ course.name }} - {{ course.title }}
      </div>
      <div class="h-72 mb-5 mt-4 overflow-y-auto">
        <table class="w-11/12 text-sm mt-5 rounded mb-5 m-auto bg-slate-200">
          <thead>
            <tr>
              <th class="pt-5">Name</th>
              <th class="pt-5">% of Grade</th>
              <th class="pt-5">Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assignment in course.assignments" :key="assignment.name">
              <td class="pb-3 font-bold">{{ assignment.name }}</td>
              <td class="pb-3 font-medium">{{ assignment.percentage }}{{ assignment && "%"}}</td>
              <td class="pb-3 font-medium">
                <div
                  :class="getAverageColor(assignment.grade)"
                  class="p-2 m-2 rounded text-white font-bold text-sm w-1/2 m-auto"
                >
                  {{ assignment.grade ? assignment.grade.toFixed(2) : "" }}
                </div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td class="pt-3 pb-3 font-medium">
                <input
                  type="text"
                  v-model="assignment.name"
                  class="bg-transparent border-none outline-none text-center w-3/4"
                  placeholder="Assignment"
                />
              </td>
              <td class="pt-3 pb-3 font-medium">
                <input
                  type="text"
                  v-model="assignment.percentage"
                  placeholder="% of Grade"
                  class="bg-transparent border-none outline-none text-center w-1/2 border-slate-800"
                />
              </td>
              <td class="pt-3 pb-3 font-medium w-1/3">
                <input
                  type="text"
                  v-model="assignment.grade"
                  placeholder="Grade"
                  class="bg-transparent border-none outline-none text-center w-1/2 border-slate-800"
                />
              </td>
            </tr>
            <tr>
              <td class="pt-3 pb-3 font-medium"></td>
              <td class="pt-3 pb-3 font-medium"></td>
              <td class="pt-3 pb-3 font-medium">
                <div
                  @click="addGrade()"
                  class="p-2 m-2 cursor-pointer rounded bg-slate-800 text-white font-bold text-sm w-1/2 m-auto"
                >
                  Add Grade
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      assignment: {
        name: "",
        category: "Select Type",
        grade: "",
      },
    };
  },
  props: {
    course: {
      type: Object,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getAverageColor(average) {
      if (average >= 93) {
        return "bg-green-700";
      } else if (average >= 90) {
        return "bg-green-500";
      } else if (average >= 83) {
        return "bg-lime-500";
      } else if (average >= 80) {
        return "bg-lime-500";
      } else if (average >= 73) {
        return "bg-orange-400";
      } else if (average >= 70) {
        return "bg-orange-700";
      } else if (average < 70) {
        return "bg-red-700";
      }
    },
    async addGrade() {
      this.course.assignments.push({
        name: this.assignment.name,
        percentage: this.assignment.percentage,
        grade: parseFloat(this.assignment.grade),
      });

      this.assignment = {
        name: "Assignment",
        category: "Enter a Category",
        grade: 100,
      };

      this.calculateAverage();

      await $fetch("/api/courses/update", {
        method: "PUT",
        body: this.course,
      });
    },
    calculateAverage() {
      let nums = 0;
      let dens = 0;

      for (let i = 0; i < this.course.assignments.length; i++) {
        if (i == 0) continue;
        let assignment = this.course.assignments[i];
        let weight = assignment.percentage / 100.00;

        nums += assignment.grade * weight;
        dens += weight;
      }

      this.course.average = nums / dens;
      console.log(nums);
    },
  },
};
</script>

<style>
/* The Modal (background) */
.modal {
  display: flex; /* Show by default when the state is true */
  justify-content: center;
  align-items: flex-start;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
