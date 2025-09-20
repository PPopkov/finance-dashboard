<template>
  <div class="filters">
    <h3>Фильтрация</h3>

    <div class="filter-group">
      <label>Поиск по артикулу:</label>
      <input
        type="text"
        placeholder="Введите артикул..."
        v-model="filters.search"
        @input="applyFilters"
      />
    </div>

    <div class="filter-group">
      <label>Количество от:</label>
      <input
        type="number"
        placeholder="0"
        v-model="filters.minQuantity"
        @input="applyFilters"
      />
    </div>

    <button @click="resetFilters" class="reset-btn">Сбросить фильтры</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["filter-change"]);

const filters = ref({
  search: "",
  minQuantity: "",
});

const applyFilters = () => {
  emit("filter-change", filters.value);
};

const resetFilters = () => {
  filters.value = {
    search: "",
    minQuantity: "",
  };
  applyFilters();
};
</script>

<style scoped>
.filters {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.filter-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

.reset-btn {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn:hover {
  background: #c0392b;
}
</style>
