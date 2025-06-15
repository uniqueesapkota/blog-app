import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const DashboardCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-4`}>
      <img src={icon} alt="" className="w-6 h-6" />
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-semibold mt-2">{value}</p>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalBlogs: 0,
      publishedBlogs: 0,
      draftBlogs: 0,
      totalComments: 0
    },
    latestBlogs: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getDashboardData();
        if (response.success) {
          setDashboardData(response.data);
        } else {
          setError(response.error || 'Failed to fetch dashboard data');
        }
      } catch (error) {
        setError(error.message || 'Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={assets.blog_icon}
          title="Total Blogs"
          value={dashboardData.stats.totalBlogs}
          color="bg-blue-50"
        />
        <DashboardCard
          icon={assets.tick_icon}
          title="Published Blogs"
          value={dashboardData.stats.publishedBlogs}
          color="bg-green-50"
        />
        <DashboardCard
          icon={assets.list_icon}
          title="Draft Blogs"
          value={dashboardData.stats.draftBlogs}
          color="bg-yellow-50"
        />
        <DashboardCard
          icon={assets.comment_icon}
          title="Total Comments"
          value={dashboardData.stats.totalComments}
          color="bg-purple-50"
        />
      </div>

      {/* Latest Blogs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Blogs</h2>
        <div className="space-y-4">
          {dashboardData.latestBlogs.length > 0 ? (
            dashboardData.latestBlogs.map((blog) => (
              <div key={blog._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {blog.isPublished ? 'Published' : 'Draft'} • {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/admin/editBlog/${blog._id}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No blogs found</p>
          )}
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}
    </div>
  );
};

export default Dashboard;