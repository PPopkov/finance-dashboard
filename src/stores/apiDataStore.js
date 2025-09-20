import { defineStore } from "pinia";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.PROD ? "http://109.73.206.144:6969" : "/api",
});

const generateMockData = (endpoint, count = 100) => {
  const data = [];
  const warehouses = ["Москва", "СПб", "Казань", "Новосибирск", "Екатеринбург"];

  for (let i = 1; i <= count; i++) {
    const item = {
      id: i,
      date: new Date().toISOString().split("T")[0],
      last_change_date: new Date().toISOString(),
    };

    switch (endpoint) {
      case "incomes":
        Object.assign(item, {
          income_id: i,
          supplier_article: `ART${i}`,
          quantity: Math.floor(Math.random() * 200) + 10,
          total_price: Math.floor(Math.random() * 10000) + 1000,
          warehouse_name:
            warehouses[Math.floor(Math.random() * warehouses.length)],
        });
        break;
      case "orders":
        Object.assign(item, {
          order_id: i,
          g_number: `ORDER${i}`,
          total_price: Math.floor(Math.random() * 5000) + 500,
          discount_percent: Math.floor(Math.random() * 30),
          warehouse_name:
            warehouses[Math.floor(Math.random() * warehouses.length)],
        });
        break;
      case "sales":
        Object.assign(item, {
          sale_id: i,
          total_price: Math.floor(Math.random() * 3000) + 300,
          region_name: ["Центральный", "Северо-Западный", "Сибирский"][
            Math.floor(Math.random() * 3)
          ],
          warehouse_name:
            warehouses[Math.floor(Math.random() * warehouses.length)],
        });
        break;
      case "stocks":
        Object.assign(item, {
          stock_id: i,
          quantity: Math.floor(Math.random() * 200) + 10,
          warehouse_name:
            warehouses[Math.floor(Math.random() * warehouses.length)],
          in_stock: Math.random() > 0.2,
        });
        break;
    }
    data.push(item);
  }
  return data;
};

export const useApiDataStore = defineStore("ApiData", {
  state: () => ({
    data: [],
    isLoading: false,
    error: null,
    filters: {},
    pagination: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    },
  }),

  getters: {
    filteredData: (state) => {
      if (!state.filters || Object.keys(state.filters).length === 0) {
        return state.data;
      }

      return state.data.filter((item) => {
        if (state.filters.search) {
          const searchTerm = state.filters.search.toLowerCase();
          const article = item.supplier_article?.toLowerCase() || "";
          if (!article.includes(searchTerm)) return false;
        }

        if (state.filters.minQuantity) {
          const minQty = Number(state.filters.minQuantity);
          if (item.quantity < minQty) return false;
        }

        return true;
      });
    },

    paginatedData: (state) => {
      const startIndex =
        (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
      const endIndex = startIndex + state.pagination.itemsPerPage;
      return state.filteredData.slice(startIndex, endIndex);
    },

    totalPages: (state) => {
      return Math.ceil(
        state.filteredData.length / state.pagination.itemsPerPage
      );
    },
  },

  actions: {
    async fetchData(endpoint) {
      this.isLoading = true;
      this.error = null;
      try {
        if (endpoint === "stocks") {
          const mockData = generateMockData(endpoint);
          this.data = mockData;
          this.pagination.totalItems = mockData.length;
        } else if (import.meta.env.PROD) {
          const mockData = generateMockData(endpoint);
          this.data = mockData;
          this.pagination.totalItems = mockData.length;
        } else {
          const response = await apiClient.get(
            `/${endpoint}?dateFrom=2025-08-20&dateTo=2025-09-19&page=1&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie&limit=100`
          );
          this.data = response.data.data;
          this.pagination.totalItems = response.data.data.length;
        }

        this.pagination.currentPage = 1;
      } catch (error) {
        this.error = error;
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        this.isLoading = false;
      }
    },

    setPage(page) {
      this.pagination.currentPage = page;
    },

    applyFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.pagination.currentPage = 1;
    },
  },
});
