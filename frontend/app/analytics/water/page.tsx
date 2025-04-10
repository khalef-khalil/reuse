  // Create more detailed monthly water usage trend data
  const monthlyWaterTrend = [
    { month: 'Jan', usage: 824, saved: 142, target: 780 },
    { month: 'Feb', usage: 792, saved: 158, target: 780 },
    { month: 'Mar', usage: 813, saved: 172, target: 780 },
    { month: 'Apr', usage: 789, saved: 185, target: 780 },
    { month: 'May', usage: 764, saved: 201, target: 780 },
    { month: 'Jun', usage: 752, saved: 213, target: 780 },
    { month: 'Jul', usage: 728, saved: 237, target: 780 },
    { month: 'Aug', usage: 705, saved: 259, target: 780 },
    { month: 'Sep', usage: 694, saved: 271, target: 780 },
    { month: 'Oct', usage: 683, saved: 282, target: 780 },
    { month: 'Nov', usage: 675, saved: 290, target: 780 },
    { month: 'Dec', usage: 668, saved: 297, target: 780 },
  ];

  // Usage breakdown by category
  const usageBreakdown = [
    { category: 'Irrigation', percentage: 41, gallons: 4920, reduction: 28 },
    { category: 'Processing', percentage: 23, gallons: 2760, reduction: 18 },
    { category: 'Cleaning', percentage: 17, gallons: 2040, reduction: 22 },
    { category: 'Cooling', percentage: 12, gallons: 1440, reduction: 15 },
    { category: 'Other', percentage: 7, gallons: 840, reduction: 10 },
  ];

  // Conservation metrics
  const conservationMetrics = [
    { 
      metric: 'Total Water Saved', 
      value: 2707, 
      unit: 'kGal',
      percentage: 22.5,
      icon: 'droplet',
      color: 'blue'
    },
    { 
      metric: 'Efficiency Improvement', 
      value: 18.2, 
      unit: '%',
      percentage: 18.2,
      icon: 'trending-up',
      color: 'green'
    },
    { 
      metric: 'Cost Reduction', 
      value: 12540, 
      unit: 'USD',
      percentage: 16.8,
      icon: 'dollar-sign',
      color: 'emerald'
    },
    { 
      metric: 'Carbon Reduction', 
      value: 4.2, 
      unit: 'tons',
      percentage: 12.3,
      icon: 'leaf',
      color: 'teal'
    }
  ];

  // Water-saving initiatives
  const waterInitiatives = [
    { 
      name: 'Drip Irrigation', 
      status: 'Completed', 
      savings: 834, 
      implementation: 100,
      roi: 2.4
    },
    { 
      name: 'Water Recycling', 
      status: 'In Progress', 
      savings: 625, 
      implementation: 75,
      roi: 1.8
    },
    { 
      name: 'Leak Detection', 
      status: 'Completed', 
      savings: 512, 
      implementation: 100,
      roi: 3.2
    },
    { 
      name: 'Process Optimization', 
      status: 'In Progress', 
      savings: 428, 
      implementation: 60,
      roi: 2.1
    },
    { 
      name: 'Smart Metering', 
      status: 'Planning', 
      savings: 308, 
      implementation: 25,
      roi: 1.5
    },
  ];

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-lg font-semibold mb-4">Monthly Water Usage</h3>
              <div className="h-64">
                <div className="h-full flex items-end">
                  {monthlyWaterTrend.map((item, index) => (
                    <div key={item.month} className="w-full flex-1 flex flex-col items-center group">
                      <div className="w-full flex flex-col items-center justify-end h-full relative">
                        {/* Target line */}
                        <div 
                          className="absolute border-t-2 border-dashed border-gray-400 dark:border-gray-600 w-full" 
                          style={{ 
                            top: `${100 - ((item.target / 900) * 100)}%`,
                          }}
                        ></div>
                        
                        {/* Usage bar */}
                        <motion.div
                          className="w-6 bg-blue-500 rounded-t-sm"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(item.usage / 900) * 100}%`,
                            transition: { delay: 0.5 + index * 0.03, duration: 0.8, ease: "easeOut" }
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.usage} kGal
                          </div>
                        </motion.div>
                        
                        {/* Saved indicator */}
                        <motion.div
                          className="w-2 bg-green-500 rounded-t-sm absolute -right-4"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(item.saved / 900) * 100}%`,
                            transition: { delay: 0.6 + index * 0.03, duration: 0.8, ease: "easeOut" }
                          }}
                          style={{
                            bottom: `${(item.usage / 900) * 100}%`,
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.saved} kGal saved
                          </div>
                        </motion.div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Usage</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Saved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 border border-gray-400 dark:border-gray-600 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Target</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-lg font-semibold mb-4">Usage Breakdown</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {usageBreakdown.map((category, index) => (
                    <motion.div 
                      key={category.category}
                      className="mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.5 + index * 0.1, duration: 0.5 }
                      }}
                    >
                      <div className="flex justify-between mb-1">
                        <div>
                          <span className="font-medium">{category.category}</span>
                          <span className="text-sm text-gray-500 ml-2">({category.percentage}%)</span>
                        </div>
                        <div>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">{category.gallons} kGal</span>
                          <span className="text-green-600 dark:text-green-400 text-sm ml-2">-{category.reduction}%</span>
                        </div>
                      </div>
                      <div className="w-full flex h-6 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-blue-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${category.percentage}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                        <motion.div 
                          className="bg-green-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${category.reduction}%` }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-lg font-semibold mb-4">Conservation Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                {conservationMetrics.map((metric, index) => (
                  <motion.div 
                    key={metric.metric}
                    className={`bg-${metric.color}-50 dark:bg-${metric.color}-900/20 p-4 rounded-lg relative overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.5 + index * 0.1, duration: 0.5 }
                    }}
                  >
                    <div className={`text-${metric.color}-600 dark:text-${metric.color}-400 mb-1 text-sm flex items-center`}>
                      <span>{metric.metric}</span>
                      <svg className={`w-4 h-4 ml-2 text-${metric.color}-600 dark:text-${metric.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold">
                      {metric.value.toLocaleString()} {metric.unit}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <motion.div 
                          className={`bg-${metric.color}-500 h-1.5 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{metric.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              variants={fadeIn}
            >
              <h3 className="text-lg font-semibold mb-4">Water-Saving Initiatives</h3>
              <div className="space-y-3">
                {waterInitiatives.map((initiative, index) => (
                  <motion.div 
                    key={initiative.name}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.5 + index * 0.1, duration: 0.5 }
                    }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{initiative.name}</div>
                        <div className="text-xs">
                          <span className={`
                            ${initiative.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                            ${initiative.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                            ${initiative.status === 'Planning' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                            px-2 py-0.5 rounded text-xs
                          `}>
                            {initiative.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-primary font-medium">{initiative.savings} kGal</div>
                        <div className="text-xs text-gray-500">ROI: {initiative.roi}x</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Implementation</span>
                        <span>{initiative.implementation}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <motion.div 
                          className={`
                            ${initiative.status === 'Completed' ? 'bg-green-500' : ''}
                            ${initiative.status === 'In Progress' ? 'bg-blue-500' : ''}
                            ${initiative.status === 'Planning' ? 'bg-amber-500' : ''}
                            h-1.5 rounded-full
                          `}
                          initial={{ width: 0 }}
                          animate={{ width: `${initiative.implementation}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div> 