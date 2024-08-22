  import React from "react";
  import { IconButton, Box, styled, Typography } from "@mui/material";
  import { Close } from "@mui/icons-material";
  import { Doughnut } from "react-chartjs-2";
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

  // Register required components for Chart.js
  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  const Container = styled(Box)`
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 5%;
    height:350px;
    width: 1050px;
    padding: 10px;
    margin: 10px;
    margin-right: 5%;
  `;

  const categoryColors = {
    'Cloud Accounts': ['#95aaf0', '#5779ef', '#FFCE56'],
    'Cloud Account Risk Assessment': ['#92150d', '#FF9F40', '#C9CBCF', '#21a20d'],
    'Image Risk Assessment': ['#93240c', '#f73e16', '#d6a412', '#e8c767'],
    'Image Security Issues': ['#93240c', '#f73e16', '#d6a412', '#e8c767']
  };

  // Prepare chart data for Doughnut chart
  const getChartData = (widget , categoryName) => {
    const colors = categoryColors[categoryName] || ['#c0ccf5', '#5779ef', '#FFCE56'];
    if (!widget.data || !widget.data.labels || !widget.data.values) {
      return (
        null
      );
    }
    
    return {
      labels: widget.data.labels,
      datasets: [{
        data: widget.data.values,
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 1,
      }],
    };
  };

  // Configure options for the Doughnut chart
  const chartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#333',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    maintainAspectRatio: false, // Adjust chart size to container
  };

  const Widget = ({ widget, onRemove ,categoryId }) => {
    const chartData = getChartData(widget, widget.name);
    return (
      <Container>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>{widget.name}</h4>
          <IconButton onClick={onRemove}>
            <Close />
          </IconButton>
        </Box>
        <div style={{ height: '200px', width: '350px' }}>
          {chartData?<Doughnut data={getChartData(widget , widget.name)} options={chartOptions} />
          :
          <Box style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <img
              src="https://www.clipartmax.com/png/middle/190-1906664_graph-icon-bar-logo-property-value-chart-icon.png"
              alt="No Data Available"
              style={{ width: '100px', height: '80px' }} // Adjust size if needed
              /> 
              <Typography>No Graph data available</Typography> 
            </Box>
        }
        </div>
      </Container>
    );
  };

  export default Widget;
