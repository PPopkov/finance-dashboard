<template>
  <div>
    <h1>Страница продаж</h1>
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
        label-field="region_name"
        value-field="total_price"
        title="Продажи по регионам"
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
  { key: "sale_id", title: "ID продажи" },
  { key: "date", title: "Дата" },
  { key: "supplier_article", title: "Артикул поставщика" },
  { key: "total_price", title: "Общая цена" },
  { key: "finished_price", title: "Финальная цена" },
  { key: "discount_percent", title: "Скидка %" },
  { key: "region_name", title: "Регион" },
  { key: "warehouse_name", title: "Склад" },
];

const handlePageChange = (newPage) => {
  store.setPage(newPage);
};

onMounted(() => {
  store.fetchData("sales");
});
</script>
