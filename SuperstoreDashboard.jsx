import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, ComposedChart, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine
} from "recharts";

const DATA = {"kpis": {"totalSales": 2297200.86, "totalProfit": 286397.02, "totalOrders": 5009, "totalCustomers": 793, "avgMargin": 12.47, "avgDiscount": 15.62, "avgShipDays": 3.96, "dateStart": "2014-01-03", "dateEnd": "2017-12-30"}, "category": [{"Category": "Furniture", "sales": 741999.8, "profit": 18451.27, "orders": 1764, "margin": 2.49}, {"Category": "Office Supplies", "sales": 719047.03, "profit": 122490.8, "orders": 3742, "margin": 17.04}, {"Category": "Technology", "sales": 836154.03, "profit": 145454.95, "orders": 1544, "margin": 17.4}], "subcategory": [{"Sub-Category": "Tables", "sales": 206965.53, "profit": -17725.48}, {"Sub-Category": "Bookcases", "sales": 114880.0, "profit": -3472.56}, {"Sub-Category": "Supplies", "sales": 46673.54, "profit": -1189.1}, {"Sub-Category": "Fasteners", "sales": 3024.28, "profit": 949.52}, {"Sub-Category": "Machines", "sales": 189238.63, "profit": 3384.76}, {"Sub-Category": "Labels", "sales": 12486.31, "profit": 5546.25}, {"Sub-Category": "Art", "sales": 27118.79, "profit": 6527.79}, {"Sub-Category": "Envelopes", "sales": 16476.4, "profit": 6964.18}, {"Sub-Category": "Furnishings", "sales": 91705.16, "profit": 13059.14}, {"Sub-Category": "Appliances", "sales": 107532.16, "profit": 18138.01}, {"Sub-Category": "Storage", "sales": 223843.61, "profit": 21278.83}, {"Sub-Category": "Chairs", "sales": 328449.1, "profit": 26590.17}, {"Sub-Category": "Binders", "sales": 203412.73, "profit": 30221.76}, {"Sub-Category": "Paper", "sales": 78479.21, "profit": 34053.57}, {"Sub-Category": "Accessories", "sales": 167380.32, "profit": 41936.64}, {"Sub-Category": "Phones", "sales": 330007.05, "profit": 44515.73}, {"Sub-Category": "Copiers", "sales": 149528.03, "profit": 55617.82}], "region": [{"Region": "Central", "sales": 501239.89, "profit": 39706.36, "orders": 1175}, {"Region": "East", "sales": 678781.24, "profit": 91522.78, "orders": 1401}, {"Region": "South", "sales": 391721.9, "profit": 46749.43, "orders": 822}, {"Region": "West", "sales": 725457.82, "profit": 108418.45, "orders": 1611}], "segment": [{"Segment": "Consumer", "sales": 1161401.34, "profit": 134119.21}, {"Segment": "Corporate", "sales": 706146.37, "profit": 91979.13}, {"Segment": "Home Office", "sales": 429653.15, "profit": 60298.68}], "shipmode": [{"Ship Mode": "First Class", "avgDays": 2.18, "orders": 787}, {"Ship Mode": "Same Day", "avgDays": 0.04, "orders": 264}, {"Ship Mode": "Second Class", "avgDays": 3.24, "orders": 964}, {"Ship Mode": "Standard Class", "avgDays": 5.01, "orders": 2994}], "trend": [{"YearMonth": "2014-01", "sales": 14236.9, "profit": 2450.19}, {"YearMonth": "2014-02", "sales": 4519.89, "profit": 862.31}, {"YearMonth": "2014-03", "sales": 55691.01, "profit": 498.73}, {"YearMonth": "2014-04", "sales": 28295.34, "profit": 3488.84}, {"YearMonth": "2014-05", "sales": 23648.29, "profit": 2738.71}, {"YearMonth": "2014-06", "sales": 34595.13, "profit": 4976.52}, {"YearMonth": "2014-07", "sales": 33946.39, "profit": -841.48}, {"YearMonth": "2014-08", "sales": 27909.47, "profit": 5318.1}, {"YearMonth": "2014-09", "sales": 81777.35, "profit": 8328.1}, {"YearMonth": "2014-10", "sales": 31453.39, "profit": 3448.26}, {"YearMonth": "2014-11", "sales": 78628.72, "profit": 9292.13}, {"YearMonth": "2014-12", "sales": 69545.62, "profit": 8983.57}, {"YearMonth": "2015-01", "sales": 18174.08, "profit": -3281.01}, {"YearMonth": "2015-02", "sales": 11951.41, "profit": 2813.85}, {"YearMonth": "2015-03", "sales": 38726.25, "profit": 9732.1}, {"YearMonth": "2015-04", "sales": 34195.21, "profit": 4187.5}, {"YearMonth": "2015-05", "sales": 30131.69, "profit": 4667.87}, {"YearMonth": "2015-06", "sales": 24797.29, "profit": 3335.56}, {"YearMonth": "2015-07", "sales": 28765.32, "profit": 3288.65}, {"YearMonth": "2015-08", "sales": 36898.33, "profit": 5355.81}, {"YearMonth": "2015-09", "sales": 64595.92, "profit": 8209.16}, {"YearMonth": "2015-10", "sales": 31404.92, "profit": 2817.37}, {"YearMonth": "2015-11", "sales": 75972.56, "profit": 12474.79}, {"YearMonth": "2015-12", "sales": 74919.52, "profit": 8016.97}, {"YearMonth": "2016-01", "sales": 18542.49, "profit": 2824.82}, {"YearMonth": "2016-02", "sales": 22978.82, "profit": 5004.58}, {"YearMonth": "2016-03", "sales": 51715.88, "profit": 3611.97}, {"YearMonth": "2016-04", "sales": 38750.04, "profit": 2977.81}, {"YearMonth": "2016-05", "sales": 56987.73, "profit": 8662.15}, {"YearMonth": "2016-06", "sales": 40344.53, "profit": 4750.38}, {"YearMonth": "2016-07", "sales": 39261.96, "profit": 4432.88}, {"YearMonth": "2016-08", "sales": 31115.37, "profit": 2062.07}, {"YearMonth": "2016-09", "sales": 73410.02, "profit": 9328.66}, {"YearMonth": "2016-10", "sales": 59687.74, "profit": 16243.14}, {"YearMonth": "2016-11", "sales": 79411.97, "profit": 4011.41}, {"YearMonth": "2016-12", "sales": 96999.04, "profit": 17885.31}, {"YearMonth": "2017-01", "sales": 43971.37, "profit": 7140.44}, {"YearMonth": "2017-02", "sales": 20301.13, "profit": 1613.87}, {"YearMonth": "2017-03", "sales": 58872.35, "profit": 14751.89}, {"YearMonth": "2017-04", "sales": 36521.54, "profit": 933.29}, {"YearMonth": "2017-05", "sales": 44261.11, "profit": 6342.58}, {"YearMonth": "2017-06", "sales": 52981.73, "profit": 8223.34}, {"YearMonth": "2017-07", "sales": 45264.42, "profit": 6952.62}, {"YearMonth": "2017-08", "sales": 63120.89, "profit": 9040.96}, {"YearMonth": "2017-09", "sales": 87866.65, "profit": 10991.56}, {"YearMonth": "2017-10", "sales": 77776.92, "profit": 9275.28}, {"YearMonth": "2017-11", "sales": 118447.82, "profit": 9690.1}, {"YearMonth": "2017-12", "sales": 83829.32, "profit": 8483.35}], "yearly": [{"Order Year": 2014, "sales": 484247.5, "profit": 49543.97}, {"Order Year": 2015, "sales": 470532.51, "profit": 61618.6}, {"Order Year": 2016, "sales": 609205.6, "profit": 81795.17}, {"Order Year": 2017, "sales": 733215.26, "profit": 93439.27}], "topProducts": [{"Product Name": "Canon imageCLASS 2200 Advanced Copier", "sales": 61599.82, "profit": 25199.93}, {"Product Name": "Fellowes PB500 Electric Punch Plastic Comb Binding Machine with Manual Bind", "sales": 27453.38, "profit": 7753.04}, {"Product Name": "Cisco TelePresence System EX90 Videoconferencing Unit", "sales": 22638.48, "profit": -1811.08}, {"Product Name": "HON 5400 Series Task Chairs for Big and Tall", "sales": 21870.58, "profit": 0.0}, {"Product Name": "GBC DocuBind TL300 Electric Binding System", "sales": 19823.48, "profit": 2233.51}, {"Product Name": "GBC Ibimaster 500 Manual ProClick Binding System", "sales": 19024.5, "profit": 760.98}, {"Product Name": "Hewlett Packard LaserJet 3310 Copier", "sales": 18839.69, "profit": 6983.88}, {"Product Name": "HP Designjet T520 Inkjet Large Format Printer - 24\" Color", "sales": 18374.9, "profit": 4094.98}, {"Product Name": "GBC DocuBind P400 Electric Binding System", "sales": 17965.07, "profit": -1878.17}, {"Product Name": "High Speed Automatic Electric Letter Opener", "sales": 17030.31, "profit": -262.0}], "topCustomers": [{"Customer Name": "Sean Miller", "sales": 25043.05, "profit": -1980.74, "orders": 5}, {"Customer Name": "Tamara Chand", "sales": 19052.22, "profit": 8981.32, "orders": 5}, {"Customer Name": "Raymond Buch", "sales": 15117.34, "profit": 6976.1, "orders": 6}, {"Customer Name": "Tom Ashbrook", "sales": 14595.62, "profit": 4703.79, "orders": 4}, {"Customer Name": "Adrian Barton", "sales": 14473.57, "profit": 5444.81, "orders": 10}, {"Customer Name": "Ken Lonsdale", "sales": 14175.23, "profit": 806.86, "orders": 12}, {"Customer Name": "Sanjit Chand", "sales": 14142.33, "profit": 5757.41, "orders": 9}, {"Customer Name": "Hunter Lopez", "sales": 12873.3, "profit": 5622.43, "orders": 6}, {"Customer Name": "Sanjit Engle", "sales": 12209.44, "profit": 2650.68, "orders": 11}, {"Customer Name": "Christopher Conant", "sales": 12129.07, "profit": 2177.05, "orders": 5}], "discountImpact": [{"DiscBucket": "0%", "avgProfit": 66.9, "count": 4798}, {"DiscBucket": "1-10%", "avgProfit": 96.06, "count": 94}, {"DiscBucket": "11-20%", "avgProfit": 24.74, "count": 3709}, {"DiscBucket": "21-30%", "avgProfit": -45.68, "count": 227}, {"DiscBucket": "31-40%", "avgProfit": -109.22, "count": 233}, {"DiscBucket": "41-50%", "avgProfit": -298.7, "count": 77}, {"DiscBucket": "51-60%", "avgProfit": -43.08, "count": 138}, {"DiscBucket": "61-80%", "avgProfit": -98.35, "count": 718}], "scatterSample": [{"Discount": 0.2, "Profit": -8.51, "Category": "Furniture", "Sales": 170.14}, {"Discount": 0.0, "Profit": 8.33, "Category": "Office Supplies", "Sales": 30.84}, {"Discount": 0.0, "Profit": 6.66, "Category": "Office Supplies", "Sales": 22.96}, {"Discount": 0.2, "Profit": 35.66, "Category": "Office Supplies", "Sales": 98.38}, {"Discount": 0.0, "Profit": 19.46, "Category": "Office Supplies", "Sales": 41.4}, {"Discount": 0.2, "Profit": -84.82, "Category": "Furniture", "Sales": 484.7}, {"Discount": 0.2, "Profit": -3.35, "Category": "Furniture", "Sales": 24.37}, {"Discount": 0.4, "Profit": -209.99, "Category": "Technology", "Sales": 1049.97}, {"Discount": 0.2, "Profit": 5.97, "Category": "Office Supplies", "Sales": 59.71}, {"Discount": 0.0, "Profit": 19.25, "Category": "Furniture", "Sales": 46.94}, {"Discount": 0.0, "Profit": 45.53, "Category": "Office Supplies", "Sales": 94.85}, {"Discount": 0.0, "Profit": 9.88, "Category": "Office Supplies", "Sales": 20.16}, {"Discount": 0.2, "Profit": 1.37, "Category": "Office Supplies", "Sales": 4.06}, {"Discount": 0.7, "Profit": -2.0, "Category": "Office Supplies", "Sales": 2.5}, {"Discount": 0.0, "Profit": 14.04, "Category": "Office Supplies", "Sales": 30.53}, {"Discount": 0.0, "Profit": 266.45, "Category": "Furniture", "Sales": 1268.82}, {"Discount": 0.6, "Profit": -67.14, "Category": "Furniture", "Sales": 127.88}, {"Discount": 0.2, "Profit": 3.63, "Category": "Office Supplies", "Sales": 10.37}, {"Discount": 0.0, "Profit": 10.87, "Category": "Office Supplies", "Sales": 22.18}, {"Discount": 0.2, "Profit": 161.99, "Category": "Technology", "Sales": 479.98}, {"Discount": 0.0, "Profit": 109.75, "Category": "Technology", "Sales": 391.98}, {"Discount": 0.0, "Profit": 6.22, "Category": "Furniture", "Sales": 18.28}, {"Discount": 0.0, "Profit": 47.73, "Category": "Office Supplies", "Sales": 265.17}, {"Discount": 0.0, "Profit": 28.86, "Category": "Office Supplies", "Sales": 60.12}, {"Discount": 0.0, "Profit": 4.06, "Category": "Office Supplies", "Sales": 8.82}, {"Discount": 0.8, "Profit": -26.23, "Category": "Office Supplies", "Sales": 16.39}, {"Discount": 0.2, "Profit": 1.87, "Category": "Office Supplies", "Sales": 5.34}, {"Discount": 0.2, "Profit": 5.84, "Category": "Office Supplies", "Sales": 17.96}, {"Discount": 0.0, "Profit": 160.62, "Category": "Office Supplies", "Sales": 535.41}, {"Discount": 0.2, "Profit": 41.12, "Category": "Office Supplies", "Sales": 117.49}, {"Discount": 0.0, "Profit": 14.65, "Category": "Office Supplies", "Sales": 29.9}, {"Discount": 0.0, "Profit": 5.76, "Category": "Office Supplies", "Sales": 11.76}, {"Discount": 0.2, "Profit": 22.53, "Category": "Furniture", "Sales": 225.3}, {"Discount": 0.0, "Profit": 11.78, "Category": "Office Supplies", "Sales": 25.06}, {"Discount": 0.0, "Profit": 3.58, "Category": "Office Supplies", "Sales": 7.61}, {"Discount": 0.7, "Profit": -336.78, "Category": "Office Supplies", "Sales": 505.18}, {"Discount": 0.0, "Profit": 38.97, "Category": "Furniture", "Sales": 155.88}, {"Discount": 0.0, "Profit": 3.58, "Category": "Office Supplies", "Sales": 7.16}, {"Discount": 0.2, "Profit": 26.56, "Category": "Office Supplies", "Sales": 75.88}, {"Discount": 0.2, "Profit": 9.87, "Category": "Office Supplies", "Sales": 29.24}, {"Discount": 0.0, "Profit": 18.24, "Category": "Technology", "Sales": 75.98}, {"Discount": 0.0, "Profit": 13.34, "Category": "Technology", "Sales": 45.99}, {"Discount": 0.2, "Profit": 9.19, "Category": "Office Supplies", "Sales": 73.54}, {"Discount": 0.2, "Profit": 4.11, "Category": "Office Supplies", "Sales": 12.19}, {"Discount": 0.0, "Profit": 36.18, "Category": "Technology", "Sales": 78.66}, {"Discount": 0.2, "Profit": 4.11, "Category": "Office Supplies", "Sales": 13.16}, {"Discount": 0.0, "Profit": 19.87, "Category": "Office Supplies", "Sales": 40.56}, {"Discount": 0.0, "Profit": 24.46, "Category": "Office Supplies", "Sales": 50.96}, {"Discount": 0.0, "Profit": 176.17, "Category": "Technology", "Sales": 677.58}, {"Discount": 0.2, "Profit": 1.91, "Category": "Technology", "Sales": 19.14}, {"Discount": 0.4, "Profit": 192.0, "Category": "Technology", "Sales": 1439.98}, {"Discount": 0.7, "Profit": -39.46, "Category": "Office Supplies", "Sales": 51.46}, {"Discount": 0.0, "Profit": 2.17, "Category": "Office Supplies", "Sales": 8.34}, {"Discount": 0.0, "Profit": 15.55, "Category": "Office Supplies", "Sales": 32.4}, {"Discount": 0.2, "Profit": 2.37, "Category": "Office Supplies", "Sales": 14.58}, {"Discount": 0.2, "Profit": 15.59, "Category": "Furniture", "Sales": 77.95}, {"Discount": 0.2, "Profit": 61.38, "Category": "Furniture", "Sales": 409.22}, {"Discount": 0.0, "Profit": 22.23, "Category": "Office Supplies", "Sales": 45.36}, {"Discount": 0.0, "Profit": 83.99, "Category": "Technology", "Sales": 299.98}, {"Discount": 0.0, "Profit": 6.57, "Category": "Office Supplies", "Sales": 19.9}, {"Discount": 0.0, "Profit": 0.3, "Category": "Technology", "Sales": 29.97}, {"Discount": 0.7, "Profit": -2.59, "Category": "Office Supplies", "Sales": 3.88}, {"Discount": 0.0, "Profit": 43.78, "Category": "Furniture", "Sales": 150.98}, {"Discount": 0.0, "Profit": 1.52, "Category": "Office Supplies", "Sales": 3.9}, {"Discount": 0.0, "Profit": 31.61, "Category": "Furniture", "Sales": 85.44}, {"Discount": 0.0, "Profit": 3.9, "Category": "Technology", "Sales": 27.88}, {"Discount": 0.2, "Profit": 9.0, "Category": "Technology", "Sales": 71.98}, {"Discount": 0.0, "Profit": 239.91, "Category": "Furniture", "Sales": 2665.62}, {"Discount": 0.0, "Profit": 19.97, "Category": "Office Supplies", "Sales": 43.41}, {"Discount": 0.0, "Profit": 4.36, "Category": "Technology", "Sales": 22.96}, {"Discount": 0.1, "Profit": 71.16, "Category": "Office Supplies", "Sales": 376.74}, {"Discount": 0.2, "Profit": 5.44, "Category": "Office Supplies", "Sales": 15.55}, {"Discount": 0.3, "Profit": -160.3, "Category": "Furniture", "Sales": 863.13}, {"Discount": 0.2, "Profit": 11.26, "Category": "Furniture", "Sales": 112.65}, {"Discount": 0.2, "Profit": 62.82, "Category": "Technology", "Sales": 837.6}, {"Discount": 0.3, "Profit": -12.08, "Category": "Furniture", "Sales": 845.49}, {"Discount": 0.7, "Profit": -22.8, "Category": "Office Supplies", "Sales": 31.09}, {"Discount": 0.3, "Profit": -14.14, "Category": "Furniture", "Sales": 141.37}, {"Discount": 0.0, "Profit": 28.09, "Category": "Office Supplies", "Sales": 61.06}, {"Discount": 0.0, "Profit": 170.51, "Category": "Technology", "Sales": 587.97}, {"Discount": 0.0, "Profit": 18.45, "Category": "Office Supplies", "Sales": 70.95}, {"Discount": 0.2, "Profit": 124.93, "Category": "Office Supplies", "Sales": 999.43}, {"Discount": 0.0, "Profit": 138.36, "Category": "Office Supplies", "Sales": 288.24}, {"Discount": 0.0, "Profit": 55.65, "Category": "Technology", "Sales": 206.1}, {"Discount": 0.8, "Profit": -6.57, "Category": "Office Supplies", "Sales": 3.98}, {"Discount": 0.3, "Profit": -4.5, "Category": "Furniture", "Sales": 104.93}, {"Discount": 0.2, "Profit": 22.68, "Category": "Technology", "Sales": 302.38}, {"Discount": 0.2, "Profit": 22.68, "Category": "Technology", "Sales": 302.38}, {"Discount": 0.0, "Profit": 0.23, "Category": "Office Supplies", "Sales": 23.34}, {"Discount": 0.4, "Profit": -19.55, "Category": "Furniture", "Sales": 53.32}, {"Discount": 0.2, "Profit": 28.13, "Category": "Furniture", "Sales": 77.6}, {"Discount": 0.2, "Profit": 4.63, "Category": "Office Supplies", "Sales": 46.34}, {"Discount": 0.2, "Profit": -55.26, "Category": "Office Supplies", "Sales": 221.02}, {"Discount": 0.2, "Profit": 20.24, "Category": "Technology", "Sales": 85.2}, {"Discount": 0.0, "Profit": 6.46, "Category": "Office Supplies", "Sales": 129.3}, {"Discount": 0.2, "Profit": 2.88, "Category": "Office Supplies", "Sales": 8.54}, {"Discount": 0.0, "Profit": 18.32, "Category": "Office Supplies", "Sales": 67.84}, {"Discount": 0.4, "Profit": -11.99, "Category": "Technology", "Sales": 59.97}, {"Discount": 0.2, "Profit": 1.99, "Category": "Office Supplies", "Sales": 5.9}, {"Discount": 0.0, "Profit": 13.2, "Category": "Technology", "Sales": 29.99}, {"Discount": 0.2, "Profit": 50.1, "Category": "Furniture", "Sales": 801.57}, {"Discount": 0.0, "Profit": 7.77, "Category": "Furniture", "Sales": 17.67}, {"Discount": 0.0, "Profit": 1159.99, "Category": "Technology", "Sales": 3999.95}, {"Discount": 0.2, "Profit": 19.08, "Category": "Furniture", "Sales": 72.7}, {"Discount": 0.2, "Profit": 13.32, "Category": "Furniture", "Sales": 266.35}, {"Discount": 0.0, "Profit": 4.39, "Category": "Office Supplies", "Sales": 8.96}, {"Discount": 0.3, "Profit": -30.29, "Category": "Furniture", "Sales": 424.12}, {"Discount": 0.6, "Profit": -77.47, "Category": "Furniture", "Sales": 73.78}, {"Discount": 0.2, "Profit": 3.79, "Category": "Furniture", "Sales": 15.17}, {"Discount": 0.0, "Profit": 11.6, "Category": "Technology", "Sales": 39.99}, {"Discount": 0.2, "Profit": 6.13, "Category": "Office Supplies", "Sales": 17.52}, {"Discount": 0.0, "Profit": 201.31, "Category": "Office Supplies", "Sales": 419.4}, {"Discount": 0.5, "Profit": -167.99, "Category": "Furniture", "Sales": 299.98}, {"Discount": 0.0, "Profit": 62.92, "Category": "Office Supplies", "Sales": 128.4}, {"Discount": 0.2, "Profit": 0.48, "Category": "Office Supplies", "Sales": 4.22}, {"Discount": 0.2, "Profit": 5.39, "Category": "Office Supplies", "Sales": 15.97}, {"Discount": 0.2, "Profit": 21.84, "Category": "Furniture", "Sales": 436.7}, {"Discount": 0.0, "Profit": 4.75, "Category": "Office Supplies", "Sales": 10.56}, {"Discount": 0.2, "Profit": 1.48, "Category": "Office Supplies", "Sales": 13.12}, {"Discount": 0.2, "Profit": 6.27, "Category": "Office Supplies", "Sales": 17.9}, {"Discount": 0.0, "Profit": 105.98, "Category": "Furniture", "Sales": 529.9}, {"Discount": 0.3, "Profit": -29.28, "Category": "Furniture", "Sales": 1024.72}, {"Discount": 0.6, "Profit": -8.49, "Category": "Furniture", "Sales": 12.13}, {"Discount": 0.0, "Profit": 9.89, "Category": "Furniture", "Sales": 27.46}, {"Discount": 0.0, "Profit": 2.61, "Category": "Office Supplies", "Sales": 5.32}, {"Discount": 0.0, "Profit": 22.89, "Category": "Office Supplies", "Sales": 45.78}, {"Discount": 0.0, "Profit": 70.31, "Category": "Technology", "Sales": 159.8}, {"Discount": 0.0, "Profit": 0.88, "Category": "Office Supplies", "Sales": 87.92}, {"Discount": 0.0, "Profit": 144.52, "Category": "Office Supplies", "Sales": 294.93}, {"Discount": 0.0, "Profit": 3.38, "Category": "Office Supplies", "Sales": 11.64}, {"Discount": 0.0, "Profit": 6.06, "Category": "Office Supplies", "Sales": 23.32}, {"Discount": 0.0, "Profit": 735.03, "Category": "Office Supplies", "Sales": 2625.12}, {"Discount": 0.7, "Profit": -20.09, "Category": "Office Supplies", "Sales": 27.4}, {"Discount": 0.2, "Profit": 7.21, "Category": "Furniture", "Sales": 24.05}, {"Discount": 0.0, "Profit": 14.8, "Category": "Office Supplies", "Sales": 29.6}, {"Discount": 0.2, "Profit": 0.33, "Category": "Office Supplies", "Sales": 4.46}, {"Discount": 0.8, "Profit": -179.78, "Category": "Office Supplies", "Sales": 67.84}, {"Discount": 0.0, "Profit": 81.13, "Category": "Office Supplies", "Sales": 579.51}, {"Discount": 0.0, "Profit": 84.51, "Category": "Office Supplies", "Sales": 704.25}, {"Discount": 0.0, "Profit": 0.41, "Category": "Office Supplies", "Sales": 40.74}, {"Discount": 0.2, "Profit": 18.53, "Category": "Office Supplies", "Sales": 49.41}, {"Discount": 0.2, "Profit": 29.69, "Category": "Office Supplies", "Sales": 91.36}, {"Discount": 0.7, "Profit": -3399.98, "Category": "Technology", "Sales": 2549.98}, {"Discount": 0.2, "Profit": 33.36, "Category": "Technology", "Sales": 333.58}, {"Discount": 0.7, "Profit": -5.71, "Category": "Office Supplies", "Sales": 8.16}, {"Discount": 0.0, "Profit": 4.48, "Category": "Office Supplies", "Sales": 17.24}, {"Discount": 0.3, "Profit": -169.64, "Category": "Furniture", "Sales": 913.43}, {"Discount": 0.2, "Profit": 2.89, "Category": "Office Supplies", "Sales": 7.97}, {"Discount": 0.2, "Profit": 3.8, "Category": "Technology", "Sales": 21.73}, {"Discount": 0.0, "Profit": 5.06, "Category": "Office Supplies", "Sales": 19.46}, {"Discount": 0.0, "Profit": 1.79, "Category": "Office Supplies", "Sales": 5.43}, {"Discount": 0.2, "Profit": 4.4, "Category": "Technology", "Sales": 18.53}, {"Discount": 0.0, "Profit": 22.65, "Category": "Technology", "Sales": 83.9}, {"Discount": 0.2, "Profit": 50.4, "Category": "Technology", "Sales": 503.96}, {"Discount": 0.0, "Profit": 112.57, "Category": "Office Supplies", "Sales": 255.85}, {"Discount": 0.0, "Profit": 21.04, "Category": "Office Supplies", "Sales": 70.12}, {"Discount": 0.2, "Profit": 68.6, "Category": "Technology", "Sales": 783.96}, {"Discount": 0.2, "Profit": -28.96, "Category": "Furniture", "Sales": 579.14}, {"Discount": 0.0, "Profit": 6.85, "Category": "Office Supplies", "Sales": 14.9}, {"Discount": 0.0, "Profit": 6.22, "Category": "Office Supplies", "Sales": 12.96}, {"Discount": 0.2, "Profit": 130.21, "Category": "Technology", "Sales": 385.8}, {"Discount": 0.2, "Profit": 88.48, "Category": "Technology", "Sales": 1415.76}, {"Discount": 0.7, "Profit": -5.94, "Category": "Office Supplies", "Sales": 8.1}, {"Discount": 0.0, "Profit": 69.99, "Category": "Technology", "Sales": 199.98}, {"Discount": 0.2, "Profit": 5.51, "Category": "Office Supplies", "Sales": 15.19}, {"Discount": 0.2, "Profit": 6.72, "Category": "Office Supplies", "Sales": 19.92}, {"Discount": 0.0, "Profit": 27.24, "Category": "Office Supplies", "Sales": 57.96}, {"Discount": 0.0, "Profit": 0.61, "Category": "Office Supplies", "Sales": 15.14}, {"Discount": 0.2, "Profit": 50.41, "Category": "Office Supplies", "Sales": 155.12}, {"Discount": 0.0, "Profit": 47.81, "Category": "Technology", "Sales": 164.85}, {"Discount": 0.2, "Profit": -3.12, "Category": "Office Supplies", "Sales": 16.66}, {"Discount": 0.2, "Profit": 6.7, "Category": "Office Supplies", "Sales": 18.5}, {"Discount": 0.8, "Profit": -1.73, "Category": "Office Supplies", "Sales": 1.08}, {"Discount": 0.0, "Profit": 9.0, "Category": "Office Supplies", "Sales": 18.75}, {"Discount": 0.0, "Profit": 219.65, "Category": "Office Supplies", "Sales": 477.51}, {"Discount": 0.8, "Profit": -59.37, "Category": "Office Supplies", "Sales": 39.58}, {"Discount": 0.0, "Profit": 11.18, "Category": "Furniture", "Sales": 39.92}, {"Discount": 0.0, "Profit": 7.13, "Category": "Office Supplies", "Sales": 15.84}, {"Discount": 0.2, "Profit": 5.44, "Category": "Office Supplies", "Sales": 15.55}, {"Discount": 0.0, "Profit": 11.89, "Category": "Office Supplies", "Sales": 25.3}, {"Discount": 0.0, "Profit": 18.21, "Category": "Office Supplies", "Sales": 37.94}, {"Discount": 0.2, "Profit": 25.6, "Category": "Technology", "Sales": 127.98}, {"Discount": 0.2, "Profit": 2.24, "Category": "Office Supplies", "Sales": 7.18}, {"Discount": 0.0, "Profit": 32.6, "Category": "Office Supplies", "Sales": 66.54}, {"Discount": 0.4, "Profit": -13.98, "Category": "Furniture", "Sales": 209.67}, {"Discount": 0.2, "Profit": 64.2, "Category": "Office Supplies", "Sales": 171.2}, {"Discount": 0.0, "Profit": 1013.13, "Category": "Furniture", "Sales": 4404.9}, {"Discount": 0.0, "Profit": 0.3, "Category": "Office Supplies", "Sales": 14.96}, {"Discount": 0.0, "Profit": 8.76, "Category": "Office Supplies", "Sales": 19.05}, {"Discount": 0.0, "Profit": 119.2, "Category": "Furniture", "Sales": 476.8}, {"Discount": 0.2, "Profit": 70.2, "Category": "Technology", "Sales": 1123.13}, {"Discount": 0.0, "Profit": 6.25, "Category": "Office Supplies", "Sales": 16.9}, {"Discount": 0.0, "Profit": 18.2, "Category": "Office Supplies", "Sales": 36.4}, {"Discount": 0.2, "Profit": 1.36, "Category": "Office Supplies", "Sales": 13.58}, {"Discount": 0.2, "Profit": 88.0, "Category": "Technology", "Sales": 703.97}, {"Discount": 0.2, "Profit": 3.63, "Category": "Office Supplies", "Sales": 10.37}, {"Discount": 0.2, "Profit": 4.77, "Category": "Furniture", "Sales": 21.18}, {"Discount": 0.2, "Profit": 3.48, "Category": "Furniture", "Sales": 25.34}, {"Discount": 0.0, "Profit": 10.32, "Category": "Office Supplies", "Sales": 36.84}, {"Discount": 0.0, "Profit": 12.53, "Category": "Office Supplies", "Sales": 25.06}, {"Discount": 0.2, "Profit": -17.99, "Category": "Technology", "Sales": 79.97}, {"Discount": 0.0, "Profit": 163.19, "Category": "Technology", "Sales": 479.97}, {"Discount": 0.4, "Profit": -115.43, "Category": "Furniture", "Sales": 384.77}, {"Discount": 0.2, "Profit": 3.28, "Category": "Office Supplies", "Sales": 9.73}, {"Discount": 0.7, "Profit": -386.96, "Category": "Technology", "Sales": 269.97}, {"Discount": 0.7, "Profit": -58.86, "Category": "Office Supplies", "Sales": 76.78}, {"Discount": 0.0, "Profit": 3.18, "Category": "Office Supplies", "Sales": 11.76}, {"Discount": 0.2, "Profit": 5.92, "Category": "Office Supplies", "Sales": 18.94}, {"Discount": 0.0, "Profit": 24.47, "Category": "Office Supplies", "Sales": 48.94}, {"Discount": 0.2, "Profit": -31.65, "Category": "Furniture", "Sales": 253.18}, {"Discount": 0.2, "Profit": 77.22, "Category": "Technology", "Sales": 686.4}, {"Discount": 0.0, "Profit": 51.75, "Category": "Furniture", "Sales": 172.5}, {"Discount": 0.2, "Profit": 7.27, "Category": "Furniture", "Sales": 38.78}, {"Discount": 0.2, "Profit": 16.68, "Category": "Technology", "Sales": 222.38}, {"Discount": 0.7, "Profit": -4.76, "Category": "Office Supplies", "Sales": 5.72}, {"Discount": 0.0, "Profit": 45.53, "Category": "Office Supplies", "Sales": 94.85}, {"Discount": 0.2, "Profit": -8.18, "Category": "Technology", "Sales": 65.44}, {"Discount": 0.0, "Profit": 78.95, "Category": "Technology", "Sales": 281.97}, {"Discount": 0.0, "Profit": 4.86, "Category": "Office Supplies", "Sales": 242.94}, {"Discount": 0.2, "Profit": 24.5, "Category": "Office Supplies", "Sales": 70.01}, {"Discount": 0.2, "Profit": 26.39, "Category": "Office Supplies", "Sales": 70.37}, {"Discount": 0.0, "Profit": 15.76, "Category": "Office Supplies", "Sales": 56.3}, {"Discount": 0.0, "Profit": 130.0, "Category": "Technology", "Sales": 499.99}, {"Discount": 0.0, "Profit": 2.38, "Category": "Office Supplies", "Sales": 8.82}, {"Discount": 0.2, "Profit": 20.39, "Category": "Office Supplies", "Sales": 203.88}, {"Discount": 0.2, "Profit": 226.79, "Category": "Technology", "Sales": 3023.93}, {"Discount": 0.0, "Profit": 343.98, "Category": "Technology", "Sales": 799.96}, {"Discount": 0.2, "Profit": 7.7, "Category": "Office Supplies", "Sales": 23.69}, {"Discount": 0.2, "Profit": 58.46, "Category": "Technology", "Sales": 519.68}, {"Discount": 0.2, "Profit": 7.26, "Category": "Office Supplies", "Sales": 20.74}, {"Discount": 0.6, "Profit": -7.0, "Category": "Furniture", "Sales": 8.0}, {"Discount": 0.0, "Profit": 220.48, "Category": "Technology", "Sales": 881.93}, {"Discount": 0.2, "Profit": -9.15, "Category": "Furniture", "Sales": 146.35}, {"Discount": 0.2, "Profit": -22.14, "Category": "Furniture", "Sales": 196.78}, {"Discount": 0.0, "Profit": 29.6, "Category": "Office Supplies", "Sales": 59.2}, {"Discount": 0.0, "Profit": 244.62, "Category": "Technology", "Sales": 1287.45}, {"Discount": 0.2, "Profit": 1.29, "Category": "Office Supplies", "Sales": 3.98}, {"Discount": 0.0, "Profit": 50.58, "Category": "Office Supplies", "Sales": 180.66}, {"Discount": 0.2, "Profit": 5.73, "Category": "Furniture", "Sales": 19.1}, {"Discount": 0.0, "Profit": 4.47, "Category": "Furniture", "Sales": 12.42}, {"Discount": 0.0, "Profit": 5.35, "Category": "Office Supplies", "Sales": 11.88}, {"Discount": 0.0, "Profit": 23.95, "Category": "Office Supplies", "Sales": 48.87}, {"Discount": 0.0, "Profit": 394.27, "Category": "Furniture", "Sales": 1408.1}, {"Discount": 0.6, "Profit": -1.88, "Category": "Furniture", "Sales": 4.71}, {"Discount": 0.8, "Profit": -7.39, "Category": "Office Supplies", "Sales": 2.69}, {"Discount": 0.4, "Profit": -299.26, "Category": "Furniture", "Sales": 945.04}, {"Discount": 0.2, "Profit": 1.57, "Category": "Office Supplies", "Sales": 25.12}, {"Discount": 0.0, "Profit": 82.29, "Category": "Office Supplies", "Sales": 167.94}, {"Discount": 0.0, "Profit": 30.7, "Category": "Office Supplies", "Sales": 63.96}, {"Discount": 0.0, "Profit": 94.96, "Category": "Office Supplies", "Sales": 193.8}, {"Discount": 0.2, "Profit": 51.5, "Category": "Technology", "Sales": 823.96}, {"Discount": 0.2, "Profit": 3.48, "Category": "Technology", "Sales": 11.12}, {"Discount": 0.1, "Profit": -6.55, "Category": "Furniture", "Sales": 589.41}, {"Discount": 0.0, "Profit": 1.96, "Category": "Office Supplies", "Sales": 7.27}, {"Discount": 0.0, "Profit": 35.98, "Category": "Office Supplies", "Sales": 79.96}, {"Discount": 0.7, "Profit": -48.12, "Category": "Office Supplies", "Sales": 68.74}, {"Discount": 0.0, "Profit": 2.74, "Category": "Furniture", "Sales": 5.82}, {"Discount": 0.7, "Profit": -6.12, "Category": "Office Supplies", "Sales": 7.66}, {"Discount": 0.2, "Profit": 3.12, "Category": "Office Supplies", "Sales": 9.25}, {"Discount": 0.7, "Profit": -169.37, "Category": "Office Supplies", "Sales": 254.06}, {"Discount": 0.0, "Profit": 36.45, "Category": "Technology", "Sales": 134.99}, {"Discount": 0.2, "Profit": -9.16, "Category": "Furniture", "Sales": 81.42}, {"Discount": 0.0, "Profit": 2.88, "Category": "Office Supplies", "Sales": 10.68}, {"Discount": 0.7, "Profit": -4.6, "Category": "Office Supplies", "Sales": 6.27}, {"Discount": 0.0, "Profit": 9.47, "Category": "Office Supplies", "Sales": 947.17}, {"Discount": 0.6, "Profit": -19.86, "Category": "Furniture", "Sales": 30.56}, {"Discount": 0.0, "Profit": 2.24, "Category": "Office Supplies", "Sales": 8.62}, {"Discount": 0.0, "Profit": 214.16, "Category": "Office Supplies", "Sales": 713.88}, {"Discount": 0.0, "Profit": 25.12, "Category": "Technology", "Sales": 100.49}, {"Discount": 0.0, "Profit": 115.0, "Category": "Technology", "Sales": 499.98}, {"Discount": 0.0, "Profit": 3.87, "Category": "Technology", "Sales": 128.85}, {"Discount": 0.32, "Profit": -11.6, "Category": "Furniture", "Sales": 78.85}, {"Discount": 0.0, "Profit": 32.98, "Category": "Technology", "Sales": 113.73}, {"Discount": 0.2, "Profit": 21.95, "Category": "Office Supplies", "Sales": 195.1}, {"Discount": 0.2, "Profit": 100.2, "Category": "Furniture", "Sales": 1603.14}, {"Discount": 0.8, "Profit": -3.41, "Category": "Office Supplies", "Sales": 2.07}, {"Discount": 0.2, "Profit": 25.58, "Category": "Office Supplies", "Sales": 75.79}, {"Discount": 0.2, "Profit": 3.22, "Category": "Office Supplies", "Sales": 9.91}, {"Discount": 0.2, "Profit": 19.44, "Category": "Office Supplies", "Sales": 59.81}, {"Discount": 0.0, "Profit": 4.58, "Category": "Office Supplies", "Sales": 9.96}, {"Discount": 0.0, "Profit": 30.43, "Category": "Technology", "Sales": 95.1}, {"Discount": 0.2, "Profit": 10.68, "Category": "Office Supplies", "Sales": 106.8}, {"Discount": 0.0, "Profit": 15.27, "Category": "Office Supplies", "Sales": 56.56}, {"Discount": 0.2, "Profit": 5.38, "Category": "Office Supplies", "Sales": 15.94}, {"Discount": 0.2, "Profit": 11.2, "Category": "Technology", "Sales": 111.98}, {"Discount": 0.2, "Profit": -1.74, "Category": "Office Supplies", "Sales": 8.72}, {"Discount": 0.2, "Profit": -16.55, "Category": "Technology", "Sales": 73.57}, {"Discount": 0.0, "Profit": 0.08, "Category": "Office Supplies", "Sales": 3.96}, {"Discount": 0.2, "Profit": -10.39, "Category": "Office Supplies", "Sales": 51.97}, {"Discount": 0.0, "Profit": 13.35, "Category": "Office Supplies", "Sales": 27.24}, {"Discount": 0.0, "Profit": 11.23, "Category": "Office Supplies", "Sales": 22.92}, {"Discount": 0.8, "Profit": -1.4, "Category": "Office Supplies", "Sales": 0.88}, {"Discount": 0.2, "Profit": 2.13, "Category": "Office Supplies", "Sales": 13.12}, {"Discount": 0.0, "Profit": 20.06, "Category": "Technology", "Sales": 118.0}, {"Discount": 0.2, "Profit": 9.6, "Category": "Technology", "Sales": 95.99}, {"Discount": 0.8, "Profit": -2.54, "Category": "Office Supplies", "Sales": 1.7}, {"Discount": 0.0, "Profit": 67.11, "Category": "Office Supplies", "Sales": 248.57}, {"Discount": 0.0, "Profit": 133.97, "Category": "Technology", "Sales": 461.97}, {"Discount": 0.2, "Profit": 7.21, "Category": "Office Supplies", "Sales": 21.36}, {"Discount": 0.0, "Profit": 60.66, "Category": "Furniture", "Sales": 356.85}, {"Discount": 0.2, "Profit": 43.84, "Category": "Furniture", "Sales": 389.7}, {"Discount": 0.0, "Profit": 11.18, "Category": "Furniture", "Sales": 39.92}, {"Discount": 0.2, "Profit": 6.29, "Category": "Technology", "Sales": 71.93}, {"Discount": 0.0, "Profit": 5.84, "Category": "Office Supplies", "Sales": 12.7}, {"Discount": 0.2, "Profit": 3.01, "Category": "Technology", "Sales": 18.54}, {"Discount": 0.6, "Profit": -24.8, "Category": "Furniture", "Sales": 58.36}, {"Discount": 0.0, "Profit": 8.41, "Category": "Office Supplies", "Sales": 17.52}, {"Discount": 0.2, "Profit": 29.37, "Category": "Office Supplies", "Sales": 83.92}, {"Discount": 0.7, "Profit": -2.61, "Category": "Office Supplies", "Sales": 3.13}, {"Discount": 0.0, "Profit": 8.22, "Category": "Office Supplies", "Sales": 17.48}, {"Discount": 0.1, "Profit": 72.53, "Category": "Furniture", "Sales": 408.01}, {"Discount": 0.0, "Profit": 303.34, "Category": "Technology", "Sales": 631.96}, {"Discount": 0.2, "Profit": 17.77, "Category": "Office Supplies", "Sales": 50.78}, {"Discount": 0.2, "Profit": 0.0, "Category": "Furniture", "Sales": 258.07}, {"Discount": 0.2, "Profit": 2.46, "Category": "Furniture", "Sales": 17.92}, {"Discount": 0.4, "Profit": -295.98, "Category": "Furniture", "Sales": 1044.63}, {"Discount": 0.0, "Profit": 27.56, "Category": "Furniture", "Sales": 59.92}, {"Discount": 0.0, "Profit": 240.56, "Category": "Office Supplies", "Sales": 511.84}, {"Discount": 0.0, "Profit": 12.44, "Category": "Office Supplies", "Sales": 25.92}, {"Discount": 0.2, "Profit": 7.26, "Category": "Office Supplies", "Sales": 20.74}, {"Discount": 0.0, "Profit": 28.0, "Category": "Office Supplies", "Sales": 58.34}, {"Discount": 0.2, "Profit": 100.2, "Category": "Furniture", "Sales": 1603.14}, {"Discount": 0.0, "Profit": 2.26, "Category": "Technology", "Sales": 37.6}, {"Discount": 0.0, "Profit": 1.18, "Category": "Office Supplies", "Sales": 23.55}, {"Discount": 0.0, "Profit": 700.98, "Category": "Furniture", "Sales": 3504.9}, {"Discount": 0.5, "Profit": -170.8, "Category": "Furniture", "Sales": 275.49}, {"Discount": 0.2, "Profit": 3.51, "Category": "Office Supplies", "Sales": 18.72}, {"Discount": 0.0, "Profit": 427.44, "Category": "Furniture", "Sales": 1526.56}, {"Discount": 0.0, "Profit": 7.68, "Category": "Office Supplies", "Sales": 16.34}, {"Discount": 0.0, "Profit": 2.22, "Category": "Office Supplies", "Sales": 8.22}, {"Discount": 0.2, "Profit": 6.92, "Category": "Office Supplies", "Sales": 18.46}, {"Discount": 0.2, "Profit": 6.49, "Category": "Office Supplies", "Sales": 64.86}, {"Discount": 0.0, "Profit": 33.06, "Category": "Office Supplies", "Sales": 71.88}, {"Discount": 0.0, "Profit": 6.22, "Category": "Office Supplies", "Sales": 12.96}, {"Discount": 0.3, "Profit": -95.67, "Category": "Furniture", "Sales": 744.1}, {"Discount": 0.2, "Profit": -58.87, "Category": "Office Supplies", "Sales": 294.37}, {"Discount": 0.8, "Profit": -10.34, "Category": "Office Supplies", "Sales": 6.08}, {"Discount": 0.2, "Profit": 83.99, "Category": "Technology", "Sales": 239.96}, {"Discount": 0.0, "Profit": 9.72, "Category": "Office Supplies", "Sales": 485.88}, {"Discount": 0.2, "Profit": 6.81, "Category": "Office Supplies", "Sales": 20.96}, {"Discount": 0.2, "Profit": 7.92, "Category": "Office Supplies", "Sales": 25.34}, {"Discount": 0.5, "Profit": -53.29, "Category": "Furniture", "Sales": 61.96}, {"Discount": 0.7, "Profit": -10.04, "Category": "Office Supplies", "Sales": 13.09}, {"Discount": 0.2, "Profit": 4.31, "Category": "Office Supplies", "Sales": 13.27}, {"Discount": 0.2, "Profit": 0.33, "Category": "Office Supplies", "Sales": 2.67}, {"Discount": 0.2, "Profit": 377.99, "Category": "Technology", "Sales": 1119.98}, {"Discount": 0.2, "Profit": 10.32, "Category": "Office Supplies", "Sales": 30.58}, {"Discount": 0.0, "Profit": 38.0, "Category": "Technology", "Sales": 99.99}, {"Discount": 0.0, "Profit": 52.63, "Category": "Technology", "Sales": 187.98}, {"Discount": 0.0, "Profit": 17.37, "Category": "Office Supplies", "Sales": 34.74}, {"Discount": 0.0, "Profit": 163.79, "Category": "Furniture", "Sales": 1819.86}, {"Discount": 0.0, "Profit": 89.96, "Category": "Office Supplies", "Sales": 199.9}, {"Discount": 0.3, "Profit": -140.2, "Category": "Furniture", "Sales": 981.37}, {"Discount": 0.2, "Profit": 11.75, "Category": "Office Supplies", "Sales": 33.57}, {"Discount": 0.2, "Profit": -11.69, "Category": "Furniture", "Sales": 77.95}, {"Discount": 0.0, "Profit": 2.33, "Category": "Office Supplies", "Sales": 4.96}, {"Discount": 0.0, "Profit": 33.33, "Category": "Technology", "Sales": 119.02}, {"Discount": 0.0, "Profit": 18.7, "Category": "Furniture", "Sales": 84.98}, {"Discount": 0.2, "Profit": 0.84, "Category": "Office Supplies", "Sales": 2.69}, {"Discount": 0.2, "Profit": 0.69, "Category": "Technology", "Sales": 7.92}, {"Discount": 0.15, "Profit": -12.1, "Category": "Furniture", "Sales": 205.67}, {"Discount": 0.2, "Profit": 13.0, "Category": "Office Supplies", "Sales": 35.86}, {"Discount": 0.2, "Profit": 9.56, "Category": "Office Supplies", "Sales": 95.62}, {"Discount": 0.0, "Profit": 46.58, "Category": "Furniture", "Sales": 155.25}, {"Discount": 0.0, "Profit": 18.59, "Category": "Office Supplies", "Sales": 40.41}, {"Discount": 0.0, "Profit": 6.35, "Category": "Office Supplies", "Sales": 12.96}, {"Discount": 0.2, "Profit": 33.85, "Category": "Furniture", "Sales": 902.71}, {"Discount": 0.0, "Profit": 2.94, "Category": "Furniture", "Sales": 41.96}, {"Discount": 0.0, "Profit": 28.86, "Category": "Office Supplies", "Sales": 61.4}, {"Discount": 0.2, "Profit": 97.19, "Category": "Technology", "Sales": 287.97}, {"Discount": 0.2, "Profit": 5.44, "Category": "Office Supplies", "Sales": 15.55}, {"Discount": 0.2, "Profit": 12.83, "Category": "Furniture", "Sales": 513.02}, {"Discount": 0.2, "Profit": 6.7, "Category": "Office Supplies", "Sales": 18.5}, {"Discount": 0.0, "Profit": 12.32, "Category": "Office Supplies", "Sales": 26.22}, {"Discount": 0.2, "Profit": -73.05, "Category": "Furniture", "Sales": 449.57}, {"Discount": 0.0, "Profit": 8.79, "Category": "Office Supplies", "Sales": 17.94}, {"Discount": 0.2, "Profit": 4.04, "Category": "Furniture", "Sales": 15.38}, {"Discount": 0.0, "Profit": 35.28, "Category": "Technology", "Sales": 125.99}, {"Discount": 0.4, "Profit": -81.85, "Category": "Furniture", "Sales": 409.27}, {"Discount": 0.2, "Profit": -34.64, "Category": "Furniture", "Sales": 307.92}, {"Discount": 0.0, "Profit": 14.92, "Category": "Office Supplies", "Sales": 30.44}, {"Discount": 0.2, "Profit": 107.98, "Category": "Technology", "Sales": 863.88}, {"Discount": 0.2, "Profit": 1.5, "Category": "Furniture", "Sales": 15.01}, {"Discount": 0.0, "Profit": 10.06, "Category": "Office Supplies", "Sales": 21.4}, {"Discount": 0.0, "Profit": 41.43, "Category": "Office Supplies", "Sales": 142.86}, {"Discount": 0.0, "Profit": 6.87, "Category": "Office Supplies", "Sales": 14.94}, {"Discount": 0.2, "Profit": -0.6, "Category": "Technology", "Sales": 24.03}, {"Discount": 0.7, "Profit": -2.24, "Category": "Office Supplies", "Sales": 2.69}, {"Discount": 0.2, "Profit": 15.49, "Category": "Office Supplies", "Sales": 49.57}, {"Discount": 0.45, "Profit": -255.59, "Category": "Furniture", "Sales": 562.29}, {"Discount": 0.7, "Profit": -6.38, "Category": "Office Supplies", "Sales": 8.7}, {"Discount": 0.0, "Profit": 0.0, "Category": "Technology", "Sales": 59.97}, {"Discount": 0.2, "Profit": 1.38, "Category": "Technology", "Sales": 22.0}, {"Discount": 0.2, "Profit": 22.62, "Category": "Office Supplies", "Sales": 64.62}, {"Discount": 0.0, "Profit": 90.74, "Category": "Office Supplies", "Sales": 362.94}, {"Discount": 0.2, "Profit": 1.0, "Category": "Office Supplies", "Sales": 8.02}, {"Discount": 0.2, "Profit": 13.76, "Category": "Furniture", "Sales": 122.35}, {"Discount": 0.0, "Profit": 83.87, "Category": "Office Supplies", "Sales": 289.2}, {"Discount": 0.1, "Profit": 32.63, "Category": "Furniture", "Sales": 172.76}, {"Discount": 0.2, "Profit": 1.7, "Category": "Furniture", "Sales": 17.02}], "state": [{"State": "California", "sales": 457687.63, "profit": 76381.39}, {"State": "New York", "sales": 310876.27, "profit": 74038.55}, {"State": "Texas", "sales": 170188.05, "profit": -25729.36}, {"State": "Washington", "sales": 138641.27, "profit": 33402.65}, {"State": "Pennsylvania", "sales": 116511.91, "profit": -15559.96}, {"State": "Florida", "sales": 89473.71, "profit": -3399.3}, {"State": "Illinois", "sales": 80166.1, "profit": -12607.89}, {"State": "Ohio", "sales": 78258.14, "profit": -16971.38}, {"State": "Michigan", "sales": 76269.61, "profit": 24463.19}, {"State": "Virginia", "sales": 70636.72, "profit": 18597.95}, {"State": "North Carolina", "sales": 55603.16, "profit": -7490.91}, {"State": "Indiana", "sales": 53555.36, "profit": 18382.94}, {"State": "Georgia", "sales": 49095.84, "profit": 16250.04}, {"State": "Kentucky", "sales": 36591.75, "profit": 11199.7}, {"State": "New Jersey", "sales": 35764.31, "profit": 9772.91}, {"State": "Arizona", "sales": 35282.0, "profit": -3427.92}, {"State": "Wisconsin", "sales": 32114.61, "profit": 8401.8}, {"State": "Colorado", "sales": 32108.12, "profit": -6527.86}, {"State": "Tennessee", "sales": 30661.87, "profit": -5341.69}, {"State": "Minnesota", "sales": 29863.15, "profit": 10823.19}, {"State": "Massachusetts", "sales": 28634.43, "profit": 6785.5}, {"State": "Delaware", "sales": 27451.07, "profit": 9977.37}, {"State": "Maryland", "sales": 23705.52, "profit": 7031.18}, {"State": "Rhode Island", "sales": 22627.96, "profit": 7285.63}, {"State": "Missouri", "sales": 22205.15, "profit": 6436.21}, {"State": "Oklahoma", "sales": 19683.39, "profit": 4853.96}, {"State": "Alabama", "sales": 19510.64, "profit": 5786.83}, {"State": "Oregon", "sales": 17431.15, "profit": -1190.47}, {"State": "Nevada", "sales": 16729.1, "profit": 3316.77}, {"State": "Connecticut", "sales": 13384.36, "profit": 3511.49}, {"State": "Arkansas", "sales": 11678.13, "profit": 4008.69}, {"State": "Utah", "sales": 11220.06, "profit": 2546.53}, {"State": "Mississippi", "sales": 10771.34, "profit": 3172.98}, {"State": "Louisiana", "sales": 9217.03, "profit": 2196.1}, {"State": "Vermont", "sales": 8929.37, "profit": 2244.98}, {"State": "South Carolina", "sales": 8481.71, "profit": 1769.06}, {"State": "Nebraska", "sales": 7464.93, "profit": 2037.09}, {"State": "New Hampshire", "sales": 7292.52, "profit": 1706.5}, {"State": "Montana", "sales": 5589.35, "profit": 1833.33}, {"State": "New Mexico", "sales": 4783.52, "profit": 1157.12}, {"State": "Iowa", "sales": 4579.76, "profit": 1183.81}, {"State": "Idaho", "sales": 4382.49, "profit": 826.72}, {"State": "Kansas", "sales": 2914.31, "profit": 836.44}, {"State": "District of Columbia", "sales": 2865.02, "profit": 1059.59}, {"State": "Wyoming", "sales": 1603.14, "profit": 100.2}, {"State": "South Dakota", "sales": 1315.56, "profit": 394.83}, {"State": "Maine", "sales": 1270.53, "profit": 454.49}, {"State": "West Virginia", "sales": 1209.82, "profit": 185.92}, {"State": "North Dakota", "sales": 919.91, "profit": 230.15}]};

const INK = "#241F1A";
const PAPER = "#F6F1E4";
const CARD = "#FFFDF7";
const HAIRLINE = "#DCD2BC";
const SLATE = "#766C5E";
const PROFIT = "#2F6F4E";
const LOSS = "#A8392B";
const AMBER = "#CE8A2E";
const AMBER_SOFT = "#EFD9AE";

const fmtMoney = (n, opts = {}) => {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return sign + "$" + abs.toLocaleString("en-US", { maximumFractionDigits: opts.decimals ?? 0 });
};
const fmtNum = (n) => n.toLocaleString("en-US");

function ReceiptLine({ label, value, mono = true }) {
  return (
    <div className="receipt-line">
      <span className="receipt-label">{label}</span>
      <span className="receipt-dots" />
      <span className={mono ? "receipt-value mono" : "receipt-value"}>{value}</span>
    </div>
  );
}

function SectionTitle({ index, title, note }) {
  return (
    <div className="section-title">
      <span className="section-index mono">{index}</span>
      <h2>{title}</h2>
      {note && <span className="section-note mono">{note}</span>}
    </div>
  );
}

function Card({ children, className = "", style = {} }) {
  return <div className={"card " + className} style={style}>{children}</div>;
}

function CustomTooltip({ active, payload, label, money = true }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="tooltip-box mono">
      <div className="tooltip-label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="tooltip-row" style={{ color: p.color }}>
          {p.name}: {money ? fmtMoney(p.value, { decimals: p.value % 1 !== 0 ? 2 : 0 }) : fmtNum(p.value)}
        </div>
      ))}
    </div>
  );
}

const TABS = [
  { id: "overview", label: "Overview", num: "01" },
  { id: "categories", label: "Categories", num: "02" },
  { id: "regions", label: "Regions", num: "03" },
  { id: "people", label: "Customers & Products", num: "04" },
  { id: "discounts", label: "Discount Effect", num: "05" },
];

export default function SuperstoreDashboard() {
  const [tab, setTab] = useState("overview");
  const d = DATA;

  const yearTrend = d.yearly.map((y) => ({
    year: String(y["Order Year"]),
    sales: y.sales,
    profit: y.profit,
  }));

  const monthTrend = d.trend.map((t) => ({
    month: t.YearMonth,
    sales: t.sales,
    profit: t.profit,
  }));

  const subSorted = [...d.subcategory].sort((a, b) => a.profit - b.profit);

  const stateTop = [...d.state].sort((a, b) => b.profit - a.profit).slice(0, 6);
  const stateBottom = [...d.state].sort((a, b) => a.profit - b.profit).slice(0, 6);

  const discBuckets = d.discountImpact;

  const totalLossSubcats = d.subcategory.filter((s) => s.profit < 0).length;

  return (
    <div className="dash-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .dash-root {
          --ink: ${INK}; --paper: ${PAPER}; --card: ${CARD}; --hair: ${HAIRLINE};
          --slate: ${SLATE}; --profit: ${PROFIT}; --loss: ${LOSS}; --amber: ${AMBER};
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          min-height: 100%;
          padding: 28px 28px 60px;
          box-sizing: border-box;
        }
        .dash-root * { box-sizing: border-box; }
        .mono { font-family: 'IBM Plex Mono', monospace; }

        /* ---------- RECEIPT HEADER ---------- */
        .receipt {
          background: var(--card);
          border: 1px solid var(--hair);
          max-width: 880px;
          margin: 0 auto;
          padding: 26px 32px 18px;
          position: relative;
          box-shadow: 0 1px 0 var(--hair), 0 18px 30px -24px rgba(36,31,26,0.35);
        }
        .receipt-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }
        .receipt-brand {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .receipt-no {
          font-size: 11px;
          color: var(--slate);
          letter-spacing: 0.05em;
        }
        .receipt-sub {
          font-size: 11px;
          color: var(--slate);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .receipt-rule {
          border-top: 1px dashed var(--hair);
          margin: 14px 0;
        }
        .receipt-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px 36px;
        }
        .receipt-line {
          display: flex;
          align-items: baseline;
          font-size: 13px;
          padding: 3px 0;
        }
        .receipt-label { color: var(--slate); letter-spacing: 0.04em; text-transform: uppercase; font-size: 11px; white-space: nowrap; }
        .receipt-dots {
          flex: 1;
          border-bottom: 1px dotted var(--hair);
          margin: 0 8px;
          transform: translateY(-3px);
        }
        .receipt-value { font-weight: 600; font-size: 14px; white-space: nowrap; }
        .receipt-foot {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          font-size: 10px;
          color: var(--slate);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .perforation {
          height: 14px;
          margin: 0 auto;
          max-width: 880px;
          background:
            radial-gradient(circle at 8px 0, transparent 7px, var(--paper) 7.5px) repeat-x;
          background-size: 16px 14px;
          background-position-y: -7px;
        }

        /* ---------- TABS ---------- */
        .tabbar {
          max-width: 880px;
          margin: 22px auto 0;
          display: flex;
          gap: 2px;
          flex-wrap: wrap;
        }
        .tabbtn {
          font-family: 'Oswald', sans-serif;
          font-size: 12.5px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid var(--hair);
          border-bottom: none;
          color: var(--slate);
          padding: 10px 16px 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s, color 0.15s;
        }
        .tabbtn .tabnum { font-family: 'IBM Plex Mono', monospace; font-size: 10px; opacity: 0.7; }
        .tabbtn:hover { background: rgba(206,138,46,0.08); color: var(--ink); }
        .tabbtn.active { background: var(--card); color: var(--ink); border-color: var(--hair); position: relative; }
        .tabbtn.active::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--amber);
        }

        .panel {
          max-width: 880px;
          margin: 0 auto;
          background: var(--card);
          border: 1px solid var(--hair);
          border-top: none;
          padding: 28px 32px 36px;
        }

        .section-title { display: flex; align-items: baseline; gap: 10px; margin: 30px 0 14px; }
        .section-title:first-child { margin-top: 0; }
        .section-index { font-size: 11px; color: var(--amber); }
        .section-title h2 { font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.03em; margin: 0; text-transform: uppercase; font-weight: 600; }
        .section-note { font-size: 10.5px; color: var(--slate); margin-left: auto; }

        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .kpi-tile {
          border: 1px solid var(--hair);
          padding: 14px 14px 12px;
          background: #fff;
        }
        .kpi-label { font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--slate); margin-bottom: 6px; }
        .kpi-value { font-family: 'Oswald', sans-serif; font-size: 22px; font-weight: 600; }
        .kpi-delta { font-size: 11px; margin-top: 4px; }

        .grid-2 { display: grid; grid-template-columns: 1.3fr 1fr; gap: 18px; }
        .grid-1 { display: grid; grid-template-columns: 1fr; gap: 18px; }

        .chart-card { border: 1px solid var(--hair); background: #fff; padding: 16px 18px 8px; }
        .chart-card h3 { font-family: 'Oswald', sans-serif; font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 10px; font-weight: 600; color: var(--ink); }
        .chart-card .desc { font-size: 11px; color: var(--slate); margin: -6px 0 10px; }

        table.ledger { width: 100%; border-collapse: collapse; font-size: 12px; }
        table.ledger th { text-align: left; font-family: 'Oswald', sans-serif; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--slate); border-bottom: 1px solid var(--hair); padding: 6px 8px; }
        table.ledger td { padding: 7px 8px; border-bottom: 1px dotted var(--hair); }
        table.ledger tr:last-child td { border-bottom: none; }
        table.ledger td.num { text-align: right; font-family: 'IBM Plex Mono', monospace; }
        .pos { color: var(--profit); }
        .neg { color: var(--loss); }

        .stamp {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 2px solid var(--loss);
          color: var(--loss);
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          transform: rotate(-2deg);
          border-radius: 3px;
        }

        .tooltip-box { background: var(--ink); color: var(--paper); padding: 8px 10px; font-size: 11.5px; border-radius: 2px; line-height: 1.5; }
        .tooltip-label { color: var(--amber); margin-bottom: 3px; font-weight: 600; }

        .legend-row { display: flex; gap: 18px; font-size: 11px; color: var(--slate); margin-bottom: 6px; }
        .legend-dot { width: 8px; height: 8px; display: inline-block; margin-right: 5px; border-radius: 1px; position: relative; top: 1px; }

        .footer-note { max-width: 880px; margin: 18px auto 0; font-size: 10.5px; color: var(--slate); text-align: center; letter-spacing: 0.03em; }

        @media (max-width: 760px) {
          .receipt-grid { grid-template-columns: 1fr; }
          .kpi-row { grid-template-columns: repeat(2, 1fr); }
          .grid-2 { grid-template-columns: 1fr; }
          .receipt, .panel, .tabbar, .footer-note { max-width: 100%; }
          .dash-root { padding: 16px; }
        }
      `}</style>

      {/* ============ RECEIPT HEADER ============ */}
      <div className="receipt">
        <div className="receipt-top">
          <div className="receipt-brand">Superstore · Performance Receipt</div>
          <div className="receipt-no mono">No. {d.kpis.dateStart.slice(0,4)}–{d.kpis.dateEnd.slice(0,4)}</div>
        </div>
        <div className="receipt-sub">{d.kpis.dateStart} thru {d.kpis.dateEnd} &nbsp;·&nbsp; {fmtNum(d.kpis.totalOrders)} orders &nbsp;·&nbsp; {fmtNum(d.kpis.totalCustomers)} customers</div>
        <div className="receipt-rule" />
        <div className="receipt-grid">
          <ReceiptLine label="Total Sales" value={fmtMoney(d.kpis.totalSales)} />
          <ReceiptLine label="Total Profit" value={fmtMoney(d.kpis.totalProfit)} />
          <ReceiptLine label="Profit Margin" value={d.kpis.avgMargin + "%"} />
          <ReceiptLine label="Avg. Discount" value={d.kpis.avgDiscount + "%"} />
          <ReceiptLine label="Avg. Ship Time" value={d.kpis.avgShipDays + " days"} />
          <ReceiptLine label="Unprofitable Sub-Cats" value={totalLossSubcats + " of " + d.subcategory.length} />
        </div>
        <div className="receipt-foot">
          <span>generated from cleaned dataset · 9,994 line items</span>
          <span>thank you for shopping</span>
        </div>
      </div>
      <div className="perforation" />

      {/* ============ TABS ============ */}
      <div className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={"tabbtn" + (tab === t.id ? " active" : "")}
            onClick={() => setTab(t.id)}
          >
            <span className="tabnum">{t.num}</span>{t.label}
          </button>
        ))}
      </div>

      {/* ============ PANEL ============ */}
      <div className="panel">

        {tab === "overview" && (
          <>
            <SectionTitle index="01" title="Yearly Performance" note="2014 – 2017" />
            <div className="chart-card">
              <h3>Sales vs. Profit by Year</h3>
              <ResponsiveContainer width="100%" height={230}>
                <ComposedChart data={yearTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + (v/1000) + "k"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" name="Sales" fill={AMBER_SOFT} barSize={46} />
                  <Line dataKey="profit" name="Profit" stroke={PROFIT} strokeWidth={2.5} dot={{ r: 3, fill: PROFIT }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <SectionTitle index="02" title="Monthly Sales Trend" note="seasonal spikes Nov–Dec" />
            <div className="chart-card">
              <h3>Monthly Sales, Jan 2014 – Dec 2017</h3>
              <ResponsiveContainer width="100%" height={190}>
                <LineChart data={monthTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} vertical={false} />
                  <XAxis dataKey="month" tick={false} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + (v/1000) + "k"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line dataKey="sales" name="Sales" stroke={AMBER} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <SectionTitle index="03" title="Key Tallies" />
            <div className="kpi-row">
              <div className="kpi-tile">
                <div className="kpi-label">Best Category</div>
                <div className="kpi-value" style={{ fontSize: 18 }}>Technology</div>
                <div className="kpi-delta pos">17.4% margin</div>
              </div>
              <div className="kpi-tile">
                <div className="kpi-label">Weakest Category</div>
                <div className="kpi-value" style={{ fontSize: 18 }}>Furniture</div>
                <div className="kpi-delta neg">2.5% margin</div>
              </div>
              <div className="kpi-tile">
                <div className="kpi-label">Top Region</div>
                <div className="kpi-value" style={{ fontSize: 18 }}>West</div>
                <div className="kpi-delta pos">{fmtMoney(108418)} profit</div>
              </div>
              <div className="kpi-tile">
                <div className="kpi-label">Biggest Drag</div>
                <div className="kpi-value" style={{ fontSize: 18 }}>Tables</div>
                <div className="kpi-delta neg">−$17,725 profit</div>
              </div>
            </div>
          </>
        )}

        {tab === "categories" && (
          <>
            <SectionTitle index="01" title="Category Breakdown" />
            <div className="grid-2">
              <div className="chart-card">
                <h3>Sales &amp; Profit by Category</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={d.category} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid stroke={HAIRLINE} vertical={false} />
                    <XAxis dataKey="Category" tick={{ fontSize: 11 }} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + (v/1000) + "k"} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="sales" name="Sales" fill={AMBER_SOFT} barSize={28} />
                    <Bar dataKey="profit" name="Profit" fill={PROFIT} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-card">
                <h3>Margin by Category</h3>
                <table className="ledger">
                  <thead><tr><th>Category</th><th style={{textAlign:"right"}}>Margin</th></tr></thead>
                  <tbody>
                    {d.category.map((c) => (
                      <tr key={c.Category}>
                        <td>{c.Category}</td>
                        <td className={"num " + (c.margin >= 0 ? "pos" : "neg")}>{c.margin}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 14 }}>
                  <span className="stamp">⚠ Furniture margin thin</span>
                </div>
              </div>
            </div>

            <SectionTitle index="02" title="Sub-Category Profit" note="sorted lowest → highest" />
            <div className="chart-card">
              <h3>Profit by Sub-Category (17 total)</h3>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={subSorted} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: HAIRLINE }} tickLine={false} tickFormatter={(v) => "$" + (v/1000) + "k"} />
                  <YAxis type="category" dataKey="Sub-Category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x={0} stroke={INK} />
                  <Bar dataKey="profit" name="Profit">
                    {subSorted.map((s, i) => (
                      <Cell key={i} fill={s.profit < 0 ? LOSS : PROFIT} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <SectionTitle index="03" title="Fulfillment Speed by Ship Mode" />
            <div className="chart-card">
              <h3>Average Shipping Days</h3>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={d.shipmode} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                  <YAxis type="category" dataKey="Ship Mode" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip content={<CustomTooltip money={false} />} />
                  <Bar dataKey="avgDays" name="Avg Days" fill={AMBER} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {tab === "regions" && (
          <>
            <SectionTitle index="01" title="Regional Performance" />
            <div className="chart-card">
              <h3>Sales &amp; Profit by Region</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={d.region} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} vertical={false} />
                  <XAxis dataKey="Region" tick={{ fontSize: 11 }} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + (v/1000) + "k"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" name="Sales" fill={AMBER_SOFT} barSize={30} />
                  <Bar dataKey="profit" name="Profit" fill={PROFIT} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <SectionTitle index="02" title="State Ledger" note="top & bottom by profit" />
            <div className="grid-2">
              <div className="chart-card">
                <h3>Top 6 States by Profit</h3>
                <table className="ledger">
                  <thead><tr><th>State</th><th style={{textAlign:"right"}}>Sales</th><th style={{textAlign:"right"}}>Profit</th></tr></thead>
                  <tbody>
                    {stateTop.map((s) => (
                      <tr key={s.State}>
                        <td>{s.State}</td>
                        <td className="num">{fmtMoney(s.sales)}</td>
                        <td className="num pos">{fmtMoney(s.profit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="chart-card">
                <h3>Bottom 6 States by Profit</h3>
                <table className="ledger">
                  <thead><tr><th>State</th><th style={{textAlign:"right"}}>Sales</th><th style={{textAlign:"right"}}>Profit</th></tr></thead>
                  <tbody>
                    {stateBottom.map((s) => (
                      <tr key={s.State}>
                        <td>{s.State}</td>
                        <td className="num">{fmtMoney(s.sales)}</td>
                        <td className={"num " + (s.profit < 0 ? "neg" : "pos")}>{fmtMoney(s.profit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 14 }}>
                  <span className="stamp">⚠ Texas, Ohio, PA in the red</span>
                </div>
              </div>
            </div>

            <SectionTitle index="03" title="Customer Segment Mix" />
            <div className="chart-card">
              <h3>Sales &amp; Profit by Segment</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={d.segment} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} vertical={false} />
                  <XAxis dataKey="Segment" tick={{ fontSize: 11 }} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + (v/1000) + "k"} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="sales" name="Sales" fill={AMBER_SOFT} barSize={30} />
                  <Bar dataKey="profit" name="Profit" fill={PROFIT} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {tab === "people" && (
          <>
            <SectionTitle index="01" title="Top 10 Products by Sales" />
            <div className="chart-card">
              <table className="ledger">
                <thead><tr><th>Product</th><th style={{textAlign:"right"}}>Sales</th><th style={{textAlign:"right"}}>Profit</th></tr></thead>
                <tbody>
                  {d.topProducts.map((p, i) => (
                    <tr key={i}>
                      <td style={{ maxWidth: 380 }}>{p["Product Name"]}</td>
                      <td className="num">{fmtMoney(p.sales)}</td>
                      <td className={"num " + (p.profit < 0 ? "neg" : "pos")}>{fmtMoney(p.profit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionTitle index="02" title="Top 10 Customers by Sales" />
            <div className="chart-card">
              <table className="ledger">
                <thead><tr><th>Customer</th><th style={{textAlign:"right"}}>Orders</th><th style={{textAlign:"right"}}>Sales</th><th style={{textAlign:"right"}}>Profit</th></tr></thead>
                <tbody>
                  {d.topCustomers.map((c, i) => (
                    <tr key={i}>
                      <td>{c["Customer Name"]}</td>
                      <td className="num">{c.orders}</td>
                      <td className="num">{fmtMoney(c.sales)}</td>
                      <td className={"num " + (c.profit < 0 ? "neg" : "pos")}>{fmtMoney(c.profit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 14 }}>
                <span className="stamp">⚠ Sean Miller: high sales, negative profit</span>
              </div>
            </div>
          </>
        )}

        {tab === "discounts" && (
          <>
            <SectionTitle index="01" title="Discount vs. Average Profit" note="the steeper the markdown, the deeper the loss" />
            <div className="chart-card">
              <h3>Average Profit per Order by Discount Bucket</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={discBuckets} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} vertical={false} />
                  <XAxis dataKey="DiscBucket" tick={{ fontSize: 10.5 }} axisLine={{ stroke: HAIRLINE }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + v} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={0} stroke={INK} />
                  <Bar dataKey="avgProfit" name="Avg Profit">
                    {discBuckets.map((b, i) => (
                      <Cell key={i} fill={b.avgProfit < 0 ? LOSS : PROFIT} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="desc">Profit turns negative around 21–30% discount and stays negative beyond it.</div>
            </div>

            <SectionTitle index="02" title="Order-Level Scatter" note="sample of 400 orders" />
            <div className="chart-card">
              <h3>Discount % vs. Profit ($), by Category</h3>
              <div className="legend-row">
                <span><span className="legend-dot" style={{ background: "#8E7CC3" }} />Furniture</span>
                <span><span className="legend-dot" style={{ background: AMBER }} />Office Supplies</span>
                <span><span className="legend-dot" style={{ background: PROFIT }} />Technology</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={HAIRLINE} />
                  <XAxis type="number" dataKey="Discount" name="Discount" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: HAIRLINE }} tickLine={false} tickFormatter={(v) => (v*100).toFixed(0) + "%"} />
                  <YAxis type="number" dataKey="Profit" name="Profit" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + v} />
                  <ReferenceLine y={0} stroke={INK} strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  {["Furniture", "Office Supplies", "Technology"].map((cat) => (
                    <Scatter
                      key={cat}
                      name={cat}
                      data={d.scatterSample.filter((s) => s.Category === cat)}
                      fill={cat === "Furniture" ? "#8E7CC3" : cat === "Office Supplies" ? AMBER : PROFIT}
                      opacity={0.7}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <SectionTitle index="03" title="Reading" />
            <div className="kpi-row" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="kpi-tile">
                <div className="kpi-label">Correlation: Discount → Profit</div>
                <div className="kpi-value neg" style={{ fontSize: 18 }}>−0.22</div>
                <div className="kpi-delta">weak negative — discounts erode margin</div>
              </div>
              <div className="kpi-tile">
                <div className="kpi-label">Orders at ≥30% Discount</div>
                <div className="kpi-value" style={{ fontSize: 18 }}>1,166</div>
                <div className="kpi-delta neg">avg profit goes negative</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="footer-note">Source: Sample Superstore dataset, cleaned &amp; aggregated with pandas / numpy · visualized with React + Recharts</div>
    </div>
  );
}
