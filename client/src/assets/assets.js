import blog_pic_1 from './blog_pic_1.png';
import blog_pic_2 from './blog_pic_2.png';
import blog_pic_3 from './blog_pic_3.png';
import blog_pic_4 from './blog_pic_4.png';
import blog_pic_5 from './blog_pic_5.png';
import blog_pic_6 from './blog_pic_6.png';
import blog_pic_7 from './blog_pic_7.png';
import blog_pic_8 from './blog_pic_8.png';
import blog_pic_9 from './blog_pic_9.png';
import blog_pic_10 from './blog_pic_10.png';
import facebook_icon from './facebook_icon.svg'
import googleplus_icon from './googleplus_icon.svg'
import twitter_icon from './twitter_icon.svg'
import logo from './logo.svg'
import arrow from './arrow.svg'
import logo_light from './logo_light.svg'
import blog_icon from './blog_icon.png'
import add_icon from './add_icon.svg'
import list_icon from './list_icon.svg'
import email_icon from './email_icon.png'
import upload_area from './upload_area.svg'
import user_icon from './user_icon.svg'
import bin_icon from './bin_icon.svg'
import comment_icon from './comment_icon.svg'
import tick_icon from './tick_icon.svg'
import star_icon from './star_icon.svg'
import cross_icon from './cross_icon.svg'
import home_icon from './home_icon.svg'
import gradientBackground from './gradientBackground.png'
import dashboard_icon_1 from './dashboard_icon_1.svg'
import dashboard_icon_2 from './dashboard_icon_2.svg'
import dashboard_icon_3 from './dashboard_icon_3.svg'
import dashboard_icon_4 from './dashboard_icon_4.svg'


export const assets = {
    facebook_icon,
    googleplus_icon,
    twitter_icon,
    logo,
    arrow,
    logo_light,
    blog_icon,
    add_icon,
    email_icon,
    upload_area,
    user_icon,
    bin_icon,
    comment_icon,
    tick_icon,
    star_icon,
    home_icon,
    gradientBackground,
    list_icon,
    cross_icon,
    dashboard_icon_1,
    dashboard_icon_2,
    dashboard_icon_3,
    dashboard_icon_4,
}
export const blogCategories = ["All", "Technology", "Lifestyle", "Education", "Health"];

export const blog_data = [
  {
    use: 'managing-lifestyle',
    title: 'A detailed step by step guide to manage your lifestyle',
    subtitle: 'A Simple Step-by-Step Guide to Managing Your Lifestyle',
    author: 'Michael Brown',
    date: 'May 28th 2025',
    image: '/src/assets/blog_pic_1.png',
    category: 'Lifestyle',
    description: 'This blog provides a comprehensive guide to help you take control of your daily habits and overall well-being.',
    content: `If you're looking to improve your health, boost productivity, and create a balanced life, managing your lifestyle intentionally is key. Here's a short guide to help you take control of your daily habits and overall well-being.

1. Assess Your Current Lifestyle
Track your habits for a week. Note your energy levels, sleep, diet, and daily routines. Reflect on what's working and what needs change.

2. Focus on Health
Eat balanced meals, stay hydrated, get enough sleep, and move your body daily. Mental health matters too—set boundaries and practice mindfulness.

...`,
    comments: [],
  },
  {
    use: 'startup-resources',
    title: 'Maximizing returns by minimizing resources in your startup',
    subtitle: 'Maximizing Returns by Minimizing Resources in Your Startup',
    author: 'Michael Brown',
    date: 'May 28th 2025',
    image: '/src/assets/blog_pic_2.png',
    category: 'Business',
    description: 'Learn how to optimize your startup operations by effectively utilizing minimal resources.',
    content: `Startups often face the challenge of limited resources. This blog explores strategies to maximize returns while minimizing resource usage.

1. Prioritize Key Operations
Focus on the core activities that drive your business forward.

2. Leverage Technology
Use cost-effective tools and platforms to streamline operations.

...`,
    comments: [],
  },
  {
    use: 'healthy-eating',
    title: 'The ultimate guide to healthy eating habits',
    subtitle: 'Transform Your Life with Healthy Eating',
    author: 'Sarah Johnson',
    date: 'June 1st 2025',
    image: '/src/assets/blog_pic_3.png',
    category: 'Health',
    description: 'Discover how to build sustainable healthy eating habits for a better lifestyle.',
    content: `Healthy eating is not just about dieting; it's about creating a sustainable lifestyle. This blog provides tips to transform your eating habits.

1. Plan Your Meals
Prepare a weekly meal plan to avoid unhealthy choices.

2. Stay Hydrated
Drink plenty of water throughout the day.

...`,
    comments: [],
  },
  {
    use: 'remote-work',
    title: 'How to excel in remote work environments',
    subtitle: 'Mastering Remote Work',
    author: 'John Doe',
    date: 'June 5th 2025',
    image: '/src/assets/blog_pic_4.png',
    category: 'Work',
    description: 'Tips and strategies to thrive in remote work settings.',
    content: `Remote work has become the norm for many. This blog shares strategies to excel in remote work environments.

1. Create a Dedicated Workspace
Set up a space that minimizes distractions.

2. Maintain a Routine
Stick to a schedule to stay productive.

...`,
    comments: [],
  },
  {
    use: 'financial-planning',
    title: 'Financial planning for young professionals',
    subtitle: 'Secure Your Future with Smart Financial Planning',
    author: 'Emily Davis',
    date: 'June 10th 2025',
    image: '/src/assets/blog_pic_5.png',
    category: 'Finance',
    description: 'Learn how to manage your finances effectively as a young professional.',
    content: `Financial planning is crucial for young professionals. This blog provides actionable tips to secure your financial future.

1. Budget Wisely
Track your income and expenses to avoid overspending.

2. Invest Early
Start investing to build wealth over time.

...`,
    comments: [],
  },
  {
    use: 'mental-health',
    title: 'Understanding and improving mental health',
    subtitle: 'Prioritize Your Mental Well-being',
    author: 'Dr. Lisa Green',
    date: 'June 12th 2025',
    image: '/src/assets/blog_pic_6.png',
    category: 'Health',
    description: 'Explore ways to understand and improve your mental health.',
    content: `Mental health is as important as physical health. This blog discusses ways to prioritize your mental well-being.

1. Practice Mindfulness
Engage in activities that help you stay present.

2. Seek Support
Don't hesitate to reach out for professional help.

...`,
    comments: [],
  },
  {
    use: 'travel-tips',
    title: 'Top travel tips for solo adventurers',
    subtitle: 'Explore the World on Your Own Terms',
    author: 'Alex Carter',
    date: 'June 13th 2025',
    image: '/src/assets/blog_pic_7.png',
    category: 'Travel',
    description: 'Essential tips for solo travelers to make the most of their adventures.',
    content: `Solo travel can be an enriching experience. This blog shares tips to make your solo adventures memorable.

1. Plan Ahead
Research your destination and create an itinerary.

2. Stay Safe
Keep your belongings secure and stay aware of your surroundings.

...`,
    comments: [],
  },
  {
    use: 'fitness-goals',
    title: 'Achieving your fitness goals effectively',
    subtitle: 'Stay Fit and Healthy',
    author: 'Chris Evans',
    date: 'June 14th 2025',
    image: '/src/assets/blog_pic_8.png',
    category: 'Fitness',
    description: 'Learn how to set and achieve your fitness goals effectively.',
    content: `Fitness goals require dedication and planning. This blog provides tips to help you stay on track.

1. Set Realistic Goals
Define achievable milestones for your fitness journey.

2. Track Progress
Monitor your progress to stay motivated.

...`,
    comments: [],
  },
];

export const comments_data = [
        {
            "_id": "6811ed9e7836a82ba747cb25",
            "blog": blog_data[0],
            "name": "Michael Scott",
            "content": "This is my new comment",
            "isApproved": false,
            "createdAt": "2025-04-30T09:30:06.918Z",
            "updatedAt": "2025-04-30T09:30:06.918Z",
            "__v": 0
        },
        {
            "_id": "6810a752fbb942aa7cbf4adb",
            "blog": blog_data[1],
            "name": "John Doe",
            "content": "This is a nice blog",
            "isApproved": false,
            "createdAt": "2025-04-29T10:17:54.832Z",
            "updatedAt": "2025-04-29T10:17:54.832Z",
            "__v": 0
        },
        {
            "_id": "680779aebef75c08f8b4898f",
            "blog": blog_data[2],
            "name": "Jack London",
            "content": "Hi this blog is must to read",
            "isApproved": true,
            "createdAt": "2025-04-22T11:12:46.547Z",
            "updatedAt": "2025-04-22T11:13:10.015Z",
            "__v": 0
        },
        {
            "_id": "680770aeb2897e5c28bf9b26",
            "blog": blog_data[3],
            "name": "Sam Smith",
            "content": "This is the best blog, everybody should read it",
            "isApproved": false,
            "createdAt": "2025-04-22T10:34:22.020Z",
            "updatedAt": "2025-04-22T10:34:22.020Z",
            "__v": 0
        },
        {
            "_id": "68076468e32055c94a696cf5",
            "blog": blog_data[4],
            "name": "Peter Lawrence",
            "content": "Honestly, I did not expect this to work, but it totally did. Saved my project!",
            "isApproved": true,
            "createdAt": "2025-04-22T09:42:00.444Z",
            "updatedAt": "2025-04-22T10:24:55.626Z",
            "__v": 0
        }
    ]

export const dashboard_data = {
    "blogs": 10,
    "comments": 5,
    "drafts": 0,
    "recentBlogs": blog_data.slice(0, 5),
}

export const footer_data = [
      {
          title: "Quick Links",
          links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
      },
      {
          title: "Need Help?",
          links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
      },
      {
          title: "Follow Us",
          links: ["Instagram", "Twitter", "Facebook", "YouTube"]
      }
  ];