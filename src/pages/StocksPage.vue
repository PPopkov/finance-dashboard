<template>
  <div>
    <h1>Страница остатков</h1>
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
        title="Остатки товаров по складам"
      />

      <PaginationControls
        :current-page="store.pagination.currentPage"
        :total-pages="store.totalPages"
        @page-change="handlePageChange"
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
  { key: "stock_id", title: "ID остатка" },
  { key: "supplier_article", title: "Артикул" },
  { key: "quantity", title: "Количество" },
  { key: "warehouse_name", title: "Склад" },
  { key: "in_stock", title: "В наличии" },
];

const handlePageChange = (newPage) => {
  store.setPage(newPage);
};

onMounted(() => {
  store.fetchData("stocks");
});
</script>
