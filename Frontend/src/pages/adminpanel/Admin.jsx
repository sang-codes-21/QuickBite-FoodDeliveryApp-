import { useState, useEffect } from "react";
import SideBar from "./sidebar";
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Package, 
  Clock,
  CheckCircle,
  XCircle,
  Search,
  LayoutGrid,
  Table as TableIcon
} from "lucide-react";
import { getAdminStats, getRecentOrders, getTodayActivity } from "./adminserver";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [activity, setActivity] = useState({ ordersCompleted: 0, ordersPending: 0 });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [statsData, ordersData, activityData] = await Promise.all([
          getAdminStats(),
          getRecentOrders(),
          getTodayActivity()
        ]);

        // Set stats
        setStats([
          { 
            icon: DollarSign, 
            label: "Total Revenue", 
            value: statsData.totalRevenue, 
            change: "+12.5%", 
            trend: "up",
            gradient: "from-[#c44569] to-[#7b2d42]"
          },
          { 
            icon: ShoppingCart, 
            label: "Total Orders", 
            value: statsData.totalOrders, 
            change: "+8.2%", 
            trend: "up",
            gradient: "from-[#eb3349] to-[#f45c43]"
          },
          { 
            icon: Users, 
            label: "Total Users", 
            value: statsData.totalUsers, 
            change: "+23.1%", 
            trend: "up",
            gradient: "from-[#ff416c] to-[#ff4b2b]"
          },
        ]);

        setAllOrders(ordersData);
        setRecentOrders(ordersData);
        setActivity(activityData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter orders based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setRecentOrders(allOrders);
    } else {
      const filtered = allOrders.filter(order => 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecentOrders(filtered);
    }
  }, [searchQuery, allOrders]);

  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusAura = (status) => {
    switch(status) {
      case "completed": return "shadow-[0_0_15px_rgba(34,197,94,0.2)]";
      case "pending": return "shadow-[0_0_15px_rgba(234,179,8,0.2)]";
      case "cancelled": return "shadow-[0_0_15px_rgba(239,68,68,0.2)]";
      default: return "";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "completed": return CheckCircle;
      case "pending": return Clock;
      case "cancelled": return XCircle;
      default: return Package;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        } p-8`}
      >
        {/* Header with Search */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#c44569] to-[#7b2d42] bg-clip-text text-transparent mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders, customers, menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#c44569] focus:outline-none transition-colors bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    <TrendingUp size={16} className={stat.trend === "down" ? "rotate-180" : ""} />
                    {stat.change}
                  </div>
                </div>
                
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>

              <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#c44569]/5 to-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Latest customer orders and their status</p>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('card')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'card' 
                        ? 'bg-white text-[#c44569] shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'table' 
                        ? 'bg-white text-[#c44569] shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <TableIcon size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Card View */}
            {viewMode === 'card' && (
              <div className="p-6 space-y-5">
                {recentOrders.map((order, idx) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:border-[#c44569]/30 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-bold text-[#c44569]">{order.id}</span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)} ${getStatusAura(order.status)}`}>
                              <StatusIcon size={14} />
                              {order.status}
                            </span>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-1.5">{order.customer}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{order.items}</p>
                        </div>
                        
                        <div className="text-right ml-6">
                          <p className="text-2xl font-bold text-gray-900 mb-1">{order.total}</p>
                          <p className="text-xs text-gray-600 opacity-60">{order.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order, idx) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#c44569]">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.total}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)} ${getStatusAura(order.status)}`}>
                              <StatusIcon size={14} />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 opacity-60">{order.time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Today's Activity - Enhanced */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden relative">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Activity</h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Radial background */}
                      <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform">
                        <CheckCircle className="text-white" size={22} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Orders Completed</p>
                      <p className="text-xs text-gray-500">Successfully delivered</p>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-200 mx-4" />
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{activity.ordersCompleted}</span>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Radial background */}
                      <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform">
                        <Clock className="text-white" size={22} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Orders Pending</p>
                      <p className="text-xs text-gray-500">Awaiting processing</p>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-200 mx-4" />
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{activity.ordersPending}</span>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Radial background */}
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center relative shadow-lg group-hover:scale-110 transition-transform">
                        <Users className="text-white" size={22} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">New Customers</p>
                      <p className="text-xs text-gray-500">Registered today</p>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-200 mx-4" />
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
