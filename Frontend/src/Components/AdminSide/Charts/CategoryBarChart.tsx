import { BarChart } from "@mui/x-charts/BarChart";
import type { BarSeriesType } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
}

interface CategoryBarChartProps {
  products: Product[];
}

const chartSettings = {
  yAxis: [{ label: "Number of Items", width: 20 }],
  height: 350,
};

export default function CategoryBarChart({ products = [] }: CategoryBarChartProps) {
  // Process products data to get category counts
  const categoryCounts = products.reduce((acc: Record<string, number>, product) => {
    const category = product.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by count
  const categoriesData = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Find top category
  const topCategory = categoriesData.length > 0 ? categoriesData[0] : { name: "No categories", count: 0 };

  const dataset = categoriesData.map((c) => ({
    category: c.name,
    items: c.count,
  }));

  const topIndex = dataset.findIndex(
    (row) => row.category === topCategory.name
  );

  const series: Omit<BarSeriesType, "type">[] = [
    {
      dataKey: "items",
      label: "Items",
      valueFormatter: (value, context) => {
        const isTop = context.dataIndex === topIndex;
        return isTop ? `${value} ★` : `${value}`;
      },
      highlightScope: {
        highlight: "item",
        fade: "global",
      },
    },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto", overflowX: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        <p className="text-black">Store Item Categories – Items per Category</p>
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        <p className="text-black">
          Most items: <strong>{topCategory.name}</strong> ({topCategory.count}{" "}
          items)
        </p>
      </Typography>

      {categoriesData.length > 0 ? (
        <BarChart
          width={Math.min(500, categoriesData.length * 100)} // Adjust width based on number of categories
          dataset={dataset}
          xAxis={[{ dataKey: "category", scaleType: 'band' }]}
          series={series}
          {...chartSettings}
        />
      ) : (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 350,
          border: '1px dashed #ccc',
          borderRadius: 1
        }}>
          <Typography color="text.secondary">
            No category data available
          </Typography>
        </Box>
      )}
    </Box>
  );
}