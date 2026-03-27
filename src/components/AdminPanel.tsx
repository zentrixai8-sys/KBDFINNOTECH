import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Briefcase, 
  MapPin, 
  Building2, 
  DollarSign, 
  Save, 
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  FileText,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  salary: string;
  description: string;
  skills: string[];
  posted_date: string;
}

const CATEGORIES = [
  'Banking & Finance',
  'IT & Software',
  'Marketing & Sales',
  'Human Resources',
  'Operations',
  'Customer Support'
];

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applications' | 'settings'>('dashboard');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    category: CATEGORIES[0],
    type: JOB_TYPES[0],
    salary: '',
    description: '',
    skills: ''
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    if (!isSupabaseConfigured) return;
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_details (
            title,
            company
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status } : app
      ));
      
      showStatus('success', `Application status updated to ${status}`);
    } catch (error) {
      console.error('Error updating application status:', error);
      showStatus('error', 'Failed to update status');
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('job_details')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      showStatus('error', 'Failed to fetch jobs');
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const showStatus = (type: 'success' | 'error', message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Publish Job button clicked');
    
    if (!isSupabaseConfigured) {
      showStatus('error', 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANONYMOUS_KEY in settings.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        category: formData.category,
        type: formData.type,
        salary: formData.salary,
        description: formData.description,
        skills: skillsArray
      };

      console.log('Submitting job data:', jobData);

      // Check if we are in demo mode or not authenticated
      const isDemo = localStorage.getItem('kbd_demo_session') === 'true';
      const { data: { session } } = await supabase.auth.getSession();
      
      if (isDemo && !session) {
        console.warn('App is in Demo Mode. Real database operations will fail.');
        showStatus('error', 'You are in Demo Mode. Please login with a real Supabase account to publish jobs.');
        setIsSubmitting(false);
        return;
      }

      if (!session) {
        showStatus('error', 'Session expired. Please login again.');
        navigate('/login');
        return;
      }

      if (editingJob) {
        console.log('Updating job:', editingJob.id);
        const { error } = await supabase
          .from('job_details')
          .update(jobData)
          .eq('id', editingJob.id);

        if (error) {
          showStatus('error', `Failed to update job: ${error.message}`);
        } else {
          showStatus('success', 'Job updated successfully');
          setEditingJob(null);
          setIsAdding(false);
          fetchJobs();
        }
      } else {
        const { error } = await supabase
          .from('job_details')
          .insert([jobData]);

        if (error) {
          showStatus('error', `Failed to add job: ${error.message}`);
        } else {
          showStatus('success', 'Job added successfully');
          setIsAdding(false);
          setFormData({
            title: '',
            company: '',
            location: '',
            category: CATEGORIES[0],
            type: JOB_TYPES[0],
            salary: '',
            description: '',
            skills: ''
          });
          fetchJobs();
        }
      }
    } catch (err: any) {
      console.error('Unexpected error:', err);
      showStatus('error', `An unexpected error occurred: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    const { error } = await supabase
      .from('job_details')
      .delete()
      .eq('id', id);

    if (error) {
      showStatus('error', `Failed to delete job: ${error.message}`);
    } else {
      showStatus('success', 'Job deleted successfully');
      fetchJobs();
    }
  };

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      category: job.category,
      type: job.type,
      salary: job.salary,
      description: job.description || '',
      skills: job.skills.join(', ')
    });
    setIsAdding(true);
  };

  const Sidebar = () => (
    <div className="w-64 bg-primary text-white h-screen fixed left-0 top-0 flex flex-col border-r border-white/5 shadow-2xl z-50">
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
            <Briefcase className="text-primary w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight font-outfit">Admin <span className="text-accent">Panel</span></span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'dashboard' ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
        >
          <LayoutDashboard size={20} className={activeTab === 'dashboard' ? 'text-primary' : 'group-hover:text-accent transition-colors'} /> 
          <span className="font-outfit">Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('jobs')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'jobs' ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
        >
          <Briefcase size={20} className={activeTab === 'jobs' ? 'text-primary' : 'group-hover:text-accent transition-colors'} /> 
          <span className="font-outfit">Jobs</span>
        </button>
        <button 
          onClick={() => setActiveTab('applications')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'applications' ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
        >
          <Users size={20} className={activeTab === 'applications' ? 'text-primary' : 'group-hover:text-accent transition-colors'} /> 
          <span className="font-outfit">Applications</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === 'settings' ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/20' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
        >
          <Settings size={20} className={activeTab === 'settings' ? 'text-primary' : 'group-hover:text-accent transition-colors'} /> 
          <span className="font-outfit">Settings</span>
        </button>
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" /> 
          <span className="font-outfit">Logout</span>
        </button>
      </div>
    </div>
  );

  const ApplicationsView = () => (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-primary font-bold text-sm uppercase tracking-wider font-outfit">Candidate</th>
                <th className="px-6 py-4 text-primary font-bold text-sm uppercase tracking-wider font-outfit">Job Title</th>
                <th className="px-6 py-4 text-primary font-bold text-sm uppercase tracking-wider font-outfit">Status</th>
                <th className="px-6 py-4 text-primary font-bold text-sm uppercase tracking-wider font-outfit">Applied On</th>
                <th className="px-6 py-4 text-primary font-bold text-sm uppercase tracking-wider font-outfit">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <FileText size={40} className="opacity-20" />
                      </div>
                      <p className="text-xl font-medium font-outfit">No applications found</p>
                      <p className="text-sm max-w-xs">When candidates apply for jobs, they will appear here for your review.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary font-bold font-outfit">
                          {app.candidate_name[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-primary font-bold font-outfit">{app.candidate_name}</span>
                          <span className="text-gray-400 text-xs">{app.candidate_email}</span>
                          <span className="text-gray-400 text-xs">{app.candidate_phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-primary font-medium font-outfit">{app.job_details?.title}</span>
                        <span className="text-gray-400 text-xs">{app.job_details?.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className={`bg-gray-50 border border-gray-200 text-xs font-bold rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all cursor-pointer ${
                          app.status === 'pending' ? 'text-yellow-600 bg-yellow-50 border-yellow-100' :
                          app.status === 'reviewed' ? 'text-blue-600 bg-blue-50 border-blue-100' :
                          app.status === 'shortlisted' ? 'text-green-600 bg-green-50 border-green-100' :
                          app.status === 'rejected' ? 'text-red-600 bg-red-50 border-red-100' : 'text-primary'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-5 text-gray-500 text-sm font-medium">
                      {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={`mailto:${app.candidate_email}`}
                          className="p-2.5 bg-white border border-gray-100 hover:bg-accent hover:text-primary hover:border-accent rounded-xl transition-all text-gray-400 shadow-sm"
                          title="Email Candidate"
                        >
                          <Mail size={16} />
                        </a>
                        <a
                          href={`tel:${app.candidate_phone}`}
                          className="p-2.5 bg-white border border-gray-100 hover:bg-accent hover:text-primary hover:border-accent rounded-xl transition-all text-gray-400 shadow-sm"
                          title="Call Candidate"
                        >
                          <Phone size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bento-card p-8 bg-white border border-gray-100 group hover:border-accent/30 transition-all duration-500">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Briefcase size={28} />
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-outfit">{jobs.length}</div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Jobs</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-500 font-bold bg-green-50 w-fit px-3 py-1 rounded-full">
            <TrendingUp size={12} /> +12% from last month
          </div>
        </div>
        <div className="bento-card p-8 bg-white border border-gray-100 group hover:border-accent/30 transition-all duration-500">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Users size={28} />
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-outfit">{applications.length}</div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Applications</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-500 font-bold bg-green-50 w-fit px-3 py-1 rounded-full">
            <TrendingUp size={12} /> +5% from last month
          </div>
        </div>
        <div className="bento-card p-8 bg-white border border-gray-100 group hover:border-accent/30 transition-all duration-500">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <TrendingUp size={28} />
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-outfit">85%</div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Placement Rate</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-500 font-bold bg-green-50 w-fit px-3 py-1 rounded-full">
            <TrendingUp size={12} /> +2% from last month
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3 font-outfit">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-accent" />
            </div>
            Recent Activity
          </h3>
          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="py-10 text-center text-gray-400 font-outfit">No recent activity</div>
            ) : (
              jobs.slice(0, 5).map((job, i) => (
                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-all group">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-bold font-outfit group-hover:bg-accent group-hover:text-primary transition-all">
                    {job.company[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-bold text-primary font-outfit">New Job Posted: {job.title}</div>
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                      <Building2 size={14} /> {job.company} • {new Date(job.posted_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3 font-outfit">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-accent" />
            </div>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => { setActiveTab('jobs'); setIsAdding(true); }}
              className="p-8 bg-gray-50 rounded-[2rem] hover:bg-accent hover:text-primary transition-all duration-500 text-left group shadow-sm border border-transparent hover:border-accent"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="text-accent" size={24} />
              </div>
              <div className="font-bold text-primary group-hover:text-primary font-outfit text-lg">Add New Job</div>
              <div className="text-sm text-gray-400 group-hover:text-primary/70">Post a new opening</div>
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className="p-8 bg-gray-50 rounded-[2rem] hover:bg-accent hover:text-primary transition-all duration-500 text-left group shadow-sm border border-transparent hover:border-accent"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Settings className="text-accent" size={24} />
              </div>
              <div className="font-bold text-primary group-hover:text-primary font-outfit text-lg">Settings</div>
              <div className="text-sm text-gray-400 group-hover:text-primary/70">Manage portal</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-3xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center">
          <Settings size={28} className="text-accent" />
        </div>
        <div>
          <h3 className="text-3xl font-bold text-primary font-outfit">Portal Settings</h3>
          <p className="text-gray-400">Manage your consultancy profile and security</p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="space-y-6">
          <h4 className="font-bold text-primary uppercase tracking-[0.2em] text-xs font-outfit flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span> General Information
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Consultancy Name</label>
              <input 
                type="text" 
                defaultValue="KBD FINNOTECH" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Admin Email</label>
              <input 
                type="email" 
                defaultValue="admin@kbdfinnotech.com" 
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium" 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-bold text-primary uppercase tracking-[0.2em] text-xs font-outfit flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span> Security & Access
          </h4>
          <div className="flex flex-wrap gap-4">
            <button className="text-primary font-bold text-sm bg-gray-50 px-8 py-4 rounded-2xl hover:bg-accent hover:text-primary transition-all duration-300 shadow-sm border border-transparent hover:border-accent">
              Change Password
            </button>
            <button className="text-primary font-bold text-sm bg-gray-50 px-8 py-4 rounded-2xl hover:bg-accent hover:text-primary transition-all duration-300 shadow-sm border border-transparent hover:border-accent">
              Two-Factor Auth
            </button>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100">
          <button className="bg-primary text-white px-12 py-5 rounded-[1.5rem] font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
            <Save size={20} className="text-accent" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-12">
        <div className="max-w-7xl mx-auto">
          {!isSupabaseConfigured && (
            <div className="mb-10 p-8 bg-amber-50 border border-amber-100 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 text-amber-900 shadow-sm">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                <AlertCircle className="text-amber-600" size={32} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1 font-outfit">Supabase Configuration Required</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  To manage jobs, you need to set up your Supabase environment variables (URL and Anonymous Key) in the AI Studio settings. 
                  Once configured, your job listings will be stored in your own database.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-5xl font-bold text-primary capitalize font-outfit tracking-tight">{activeTab}</h1>
              <p className="text-gray-400 mt-2 text-lg">Welcome back, <span className="text-primary font-bold">Admin</span></p>
            </div>
            {activeTab === 'jobs' && (
              <button 
                onClick={() => {
                  setIsAdding(!isAdding);
                  setEditingJob(null);
                  setFormData({
                    title: '',
                    company: '',
                    location: '',
                    category: CATEGORIES[0],
                    type: JOB_TYPES[0],
                    salary: '',
                    description: '',
                    skills: ''
                  });
                }}
                className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all duration-500 shadow-xl ${
                  isAdding 
                    ? 'bg-white text-primary border border-gray-100 hover:bg-gray-50' 
                    : 'bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 shadow-primary/20'
                }`}
              >
                {isAdding ? <X size={20} className="text-accent" /> : <Plus size={20} className="text-accent" />}
                <span className="font-outfit">{isAdding ? 'Cancel' : 'Add New Job'}</span>
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}
              >
                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span className="font-medium">{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'applications' && <ApplicationsView />}
            {activeTab === 'settings' && <SettingsView />}
            {activeTab === 'jobs' && (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <AnimatePresence>
                  {isAdding && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="lg:col-span-1"
                    >
                      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 sticky top-12">
                        <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3 font-outfit">
                          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                            {editingJob ? <Edit size={20} className="text-accent" /> : <Plus size={20} className="text-accent" />}
                          </div>
                          {editingJob ? 'Edit Job' : 'Create Job'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Job Title</label>
                            <input 
                              type="text" 
                              name="title"
                              required
                              value={formData.title}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium"
                              placeholder="e.g. Senior Accountant"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Company Name</label>
                            <input 
                              type="text" 
                              name="company"
                              required
                              value={formData.company}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium"
                              placeholder="e.g. HDFC Bank"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Location</label>
                              <input 
                                type="text" 
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium"
                                placeholder="Raipur, CG"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Salary Range</label>
                              <input 
                                type="text" 
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium"
                                placeholder="e.g. 25k - 40k"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Category</label>
                              <select 
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium cursor-pointer"
                              >
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Job Type</label>
                              <select 
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium cursor-pointer"
                              >
                                {JOB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Skills (Comma separated)</label>
                            <input 
                              type="text" 
                              name="skills"
                              value={formData.skills}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium"
                              placeholder="React, Node, SQL"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700 font-outfit ml-1">Description</label>
                            <textarea 
                              name="description"
                              rows={4}
                              required
                              value={formData.description}
                              onChange={handleInputChange}
                              className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all font-medium resize-none"
                              placeholder="Job roles and responsibilities..."
                            ></textarea>
                          </div>
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                          >
                            {isSubmitting ? <Loader2 className="animate-spin text-accent" size={20} /> : <Save size={20} className="text-accent" />}
                            <span className="font-outfit">{isSubmitting ? (editingJob ? 'Updating...' : 'Publishing...') : (editingJob ? 'Update Job' : 'Publish Job')}</span>
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* List Section */}
                <div className={`${isAdding ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                  <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                      <h2 className="font-bold text-primary font-outfit text-xl">Active Listings ({jobs.length})</h2>
                      <div className="flex items-center gap-3 text-sm text-green-600 font-bold bg-green-50 px-4 py-1.5 rounded-full">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                        Live on Website
                      </div>
                    </div>
                    
                    {loading ? (
                      <div className="p-32 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="animate-spin mb-6 text-accent" size={48} />
                        <p className="text-lg font-outfit">Loading your listings...</p>
                      </div>
                    ) : jobs.length === 0 ? (
                      <div className="p-32 flex flex-col items-center justify-center text-gray-400">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                          <Briefcase className="opacity-20" size={48} />
                        </div>
                        <p className="text-xl font-bold font-outfit text-primary">No jobs found</p>
                        <p className="mt-2">Start by adding your first job listing!</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-[0.2em] font-outfit">
                              <th className="px-8 py-5 font-bold">Job Details</th>
                              <th className="px-8 py-5 font-bold">Category</th>
                              <th className="px-8 py-5 font-bold">Type</th>
                              <th className="px-8 py-5 font-bold">Posted</th>
                              <th className="px-8 py-5 font-bold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {jobs.map((job) => (
                              <tr key={job.id} className="hover:bg-gray-50/30 transition-all duration-300 group">
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-bold font-outfit group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-sm">
                                      {job.company[0]}
                                    </div>
                                    <div>
                                      <div className="font-bold text-primary font-outfit text-lg">{job.title}</div>
                                      <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                        <Building2 size={14} /> {job.company} • <MapPin size={14} /> {job.location}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                  <span className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full font-outfit uppercase tracking-wider">
                                    {job.category}
                                  </span>
                                </td>
                                <td className="px-8 py-6">
                                  <span className="text-sm text-gray-600 font-bold font-outfit">{job.type}</span>
                                </td>
                                <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                  {new Date(job.posted_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                    <button 
                                      onClick={() => startEdit(job)}
                                      className="p-3 bg-white border border-gray-100 text-blue-600 hover:bg-blue-50 hover:border-blue-100 rounded-xl transition-all shadow-sm"
                                      title="Edit Job"
                                    >
                                      <Edit size={18} />
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(job.id)}
                                      className="p-3 bg-white border border-gray-100 text-red-600 hover:bg-red-50 hover:border-red-100 rounded-xl transition-all shadow-sm"
                                      title="Delete Job"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
