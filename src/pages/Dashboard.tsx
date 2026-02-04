import { StatCard } from "@/components/StatCard";
import { 
  Briefcase, 
  FileText, 
  UserCheck, 
  Users,
  TrendingUp,
  Clock
} from "lucide-react";
import { dashboardStats, applications, jobs } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "New":
      return "status-badge bg-blue-100 text-blue-800";
    case "Reviewed":
      return "status-badge status-reviewed";
    case "Shortlisted":
      return "status-badge bg-purple-100 text-purple-800";
    case "Hired":
      return "status-badge status-active";
    case "Rejected":
      return "status-badge status-closed";
    default:
      return "status-badge";
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const recentApplications = applications.slice(0, 5);
  const activeJobs = jobs.filter(j => j.status === "Active").slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-description">
          Welcome back! Here's what's happening with your job portal today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Job Posts"
          value={dashboardStats.activeJobs}
          change="+2 from last month"
          changeType="positive"
          icon={Briefcase}
        />
        <StatCard
          title="Total Applications"
          value={dashboardStats.totalApplications}
          change="+18% from last week"
          changeType="positive"
          icon={FileText}
        />
        <StatCard
          title="New Applications"
          value={dashboardStats.newApplications}
          change="Awaiting review"
          changeType="neutral"
          icon={Clock}
        />
        <StatCard
          title="Candidates Hired"
          value={dashboardStats.hired}
          change="+3 this month"
          changeType="positive"
          icon={UserCheck}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="section-card">
          <div className="section-header flex items-center justify-between">
            <h2 className="section-title">Recent Applications</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/applications")}
            >
              View All
            </Button>
          </div>
          <div className="divide-y divide-border">
            {recentApplications.map((app) => (
              <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-accent/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {app.applicantName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.applicantName}</p>
                    <p className="text-xs text-muted-foreground">{app.jobTitle}</p>
                  </div>
                </div>
                <span className={getStatusBadgeClass(app.status)}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="section-card">
          <div className="section-header flex items-center justify-between">
            <h2 className="section-title">Active Job Listings</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/jobs")}
            >
              View All
            </Button>
          </div>
          <div className="divide-y divide-border">
            {activeJobs.map((job) => (
              <div key={job.id} className="px-6 py-4 hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {job.department} • {job.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{job.applications}</p>
                    <p className="text-xs text-muted-foreground">applications</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  <span className="status-badge status-active">{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/add-job")}
          >
            <Briefcase className="h-5 w-5" />
            <span>Post New Job</span>
          </Button>
          <Button 
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/applications")}
          >
            <FileText className="h-5 w-5" />
            <span>Review Applications</span>
          </Button>
          <Button 
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/jobs")}
          >
            <TrendingUp className="h-5 w-5" />
            <span>View Analytics</span>
          </Button>
          <Button 
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2"
          >
            <Users className="h-5 w-5" />
            <span>Manage Team</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
