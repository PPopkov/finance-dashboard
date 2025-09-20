<template>
  <div class="data-table">
    <table v-if="data && data.length > 0">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.key">
            {{ field.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.income_id + '-' + index">
          <td v-for="field in fields">{{ item[field.key] }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-data">Нет данных для отображения</p>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.data-table {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

tr:hover {
  background-color: #f9f9f9;
}

.no-data {
  text-align: center;
  color: #999;
  padding: 20px;
}
</style>
