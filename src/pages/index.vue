<template>
  <div class="p-2 m-2 text-3xl font-bold">
    <div class="text-center text-xl mb-10 font-medium">fall 2024 grades</div>

    <table
      class="w-1/2 mx-auto border-separate border-spacing-x-10 border-spacing-y-3"
    >
      <tr v-for="course in courses" :key="course.name" class="cursor-pointer">
        <td
          class="rounded hover:bg-gray-100 p-2"
          @click="course.assignmentsVisible = true"
        >
          <div>
            <div class="text-left">
              {{ course.name }}
            </div>
            <div class="text-sm font-medium">{{ course.title }}</div>
          </div>
        </td>
        <td class="text-center text-white">
          <div :class="getAverageColor(course.average)" class="p-2 rounded">
            {{
              course.average == 100
                ? course.average.toFixed(1)
                : course.average.toFixed(2)
            }}
          </div>
        </td>
        <Modal
          :show="course.assignmentsVisible"
          :course="course"
          @close="course.assignmentsVisible = false"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      openModal: false,
      courses: [],
    };
  },
  async created() {
    let data = await $fetch("/api/courses/all");
    for (let course of data) {
      course.assignmentsVisible = false;
    }

    this.courses = data;
  },
  methods: {
    getAverageColor(average) {
      if (average == 0) {
        return "bg-slate-600";
      }
      else if (average >= 93) {
        return "bg-green-700";
      } else if (average >= 90) {
        return "bg-green-500";
      } else if (average >= 83) {
        return "bg-lime-500";
      } else if (average >= 80) {
        return "bg-lime-400";
      } else if (average >= 73) {
        return "bg-orange-400";
      } else if (average >= 70) {
        return "bg-orange-700";
      } else if (average < 70) {
        return "bg-red-700";
      }
    },
  },
  closeModal(course) {
    course.assignmentsVisible = false;
  },
  mounted() {
    document.title = "my grades";
  },
};
</script>
