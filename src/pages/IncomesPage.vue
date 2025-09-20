<template>
  <div>
    <h1>Страница доходов</h1>
    <div v-if="store.isLoading">Загрузка данных...</div>
    <div v-else-if="store.error">
      Произошла ошибка при загрузке: {{ store.error.message }}
    </div>

    <div v-else>
      <p>
        Данные успешно загружены! Всего элементов:
        {{ store.pagination.totalItems }}
      </p>

      <DataFilters :data="store.data" @filter-change="handleFilterChange" />

      <BarChart
        :data="store.data"
        label-field="warehouse_name"
        value-field="quantity"
        title="Доходы по складам"
      />

      <DataTable :data="store.paginatedData" :fields="tableFields" />
      <PaginationControls
        :current-page="store.pagination.currentPage"
        :total-pages="store.totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useApiDataStore } from "../stores/apiDataStore";
import DataTable from "../components/DataTable.vue";
import PaginationControls from "../components/PaginationControls.vue";
import BarChart from "../components/BarChart.vue";
import DataFilters from "../components/DataFilters.vue";

const store = useApiDataStore();

const handleFilterChange = (newFilters) => {
  store.applyFilters(newFilters);
};

const tableFields = [
  { key: "income_id", title: "ID дохода" },
  { key: "date", title: "Дата" },
  { key: "supplier_article", title: "Артикул поставщика" },
  { key: "quantity", title: "Количество" },
  { key: "barcode", title: "Штрихкод" },
  { key: "warehouse_name", title: "Склад" },
];

const handlePageChange = (newPage) => {
  store.setPage(newPage);
};

onMounted(() => {
  store.fetchData("incomes");
});
</script>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
