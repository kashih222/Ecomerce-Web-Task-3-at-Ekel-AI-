import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Typography } from "@mui/material";

interface Order {
  _id: string;
  createdAt: string;
}

interface OrdersPerDayChartProps {
  orders: Order[];
}

export default function OrdersPerDayChart({ orders = [] }: OrdersPerDayChartProps) {
  // Process orders data to get counts per weekday
  const processOrdersData = () => {
    // Initialize weekdays
    const ordersPerDay: number[] = Array(7).fill(0);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Count orders per weekday
    orders.forEach((order) => {
      try {
        const dayIndex = new Date(order.createdAt).getDay();
        ordersPerDay[dayIndex] += 1;
      } catch (error) {
        console.error("Error parsing order date:", error);
      }
    });

    return { days: weekdays, orders: ordersPerDay };
  };

  const { days, orders: ordersData } = processOrdersData();
  const totalOrders = ordersData.reduce((sum, count) => sum + count, 0);
  
  // Find day with most orders
  const maxOrders = Math.max(...ordersData);
  const maxDayIndex = ordersData.indexOf(maxOrders);
  const busiestDay = days[maxDayIndex];

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto", overflowX: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        <p className="text-black">Orders per Day of Week</p>
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        <p className="text-black">
          Total Orders: <strong>{totalOrders}</strong> | 
          Busiest Day: <strong>{busiestDay}</strong> ({maxOrders} orders)
        </p>
      </Typography>

      {orders.length > 0 ? (
        <LineChart
          width={Math.min(600, days.length * 100)}
          height={320}
          xAxis={[{ 
            scaleType: "point", 
            data: days,
            label: "Day of Week"
          }]}
          yAxis={[{
            label: "Number of Orders"
          }]}
          series={[
            {
              label: "Orders",
              data: ordersData,
              showMark: true,
              color: "#1976d2",
            },
          ]}
          sx={{
            ".MuiLineElement-root": { strokeWidth: 3 },
            ".MuiMarkElement-root": { r: 4 },
          }}
        />
      ) : (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 320,
          border: '1px dashed #ccc',
          borderRadius: 1
        }}>
          <Typography color="text.secondary">
            No order data available
          </Typography>
        </Box>
      )}
    </Box>
  );
}