import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "1",
      name: "CSPM Executive",
      widgets: [
        { id: "w1", name: "Cloud Accounts","data": {"labels":["Connected","Not Connected"],"values":[2,2]} },
          { id: "w2", name: "Cloud Account Risk Assessment","data":{"labels":["Failed","Warning","Not available","Passed"],"values":[1689,681,36,7253]}  }
      ]
    },
    {
      id: "2",
      name: "CWPP",
      widgets: [
        { id: "w1", name: "Top 5 Namespace Specific Alerts", text: "Some random text for widget 2" },
        { id: "w2", name: "Workloads Alerts",  }
      ]
    },
    {
      id: "3",
      name: "Registry Scan",
      widgets: [
        { id: "w1", name: "Image Risk Assessment", "data":{"labels":["Critical","High","Medium","Low"],"values":[9,150,236,723]} },
        { id: "w2", name: "Image Security Issues", "data":{"labels":["Critical","High","Medium","Low"],"values":[2,2,2,2]} }
      ]
    }
  ],
  searchTerm: ""
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) category.widgets.push(widget);
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

export const { addWidget, removeWidget, setSearchTerm } = dashboardSlice.actions;
export default dashboardSlice.reducer;
