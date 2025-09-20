<template>
  <div class="pagination">
    <button
      class="pagination-btn"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Назад
    </button>
    <span
      class="page-number"
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
      >{{ page }}</span
    >
    <button
      class="pagination-btn"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Вперед
    </button>
    <span class="page-info">{{ currentPage }} из {{ totalPages }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["page-change"]);

const visiblePages = computed(() => {
  const pages = [];
  const half = Math.floor(props.maxVisiblePages / 2);
  let start = Math.max(1, props.currentPage - half);
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1);

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  } else {
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background: #f5f5f5;
}

.page-number {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.page-number:hover {
  background: #f5f5f5;
}

.page-number.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.page-info {
  margin-left: 16px;
  font-size: 14px;
  color: #666;
}
</style>
