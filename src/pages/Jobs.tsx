import { useState } from "react";
import { jobs, Job } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Search, MoreVertical, Edit, Trash2, Eye, Copy, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Active":
      return "status-badge status-active";
    case "Closed":
      return "status-badge status-closed";
    case "Draft":
      return "status-badge status-pending";
    default:
      return "status-badge";
  }
};

export default function Jobs() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const departments = [...new Set(jobs.map(j => j.department))];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="page-header mb-0">
          <h1 className="page-title">Current Job Listings</h1>
          <p className="page-description">
            Manage all active, closed, and draft job postings.
          </p>
        </div>
        <Button onClick={() => navigate("/add-job")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Job
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-status-success-bg border border-status-success/20 rounded-lg p-4">
          <p className="text-sm font-medium text-status-success-text">Active Jobs</p>
          <p className="text-2xl font-bold text-foreground">
            {jobs.filter(j => j.status === "Active").length}
          </p>
        </div>
        <div className="bg-status-warning-bg border border-status-warning/20 rounded-lg p-4">
          <p className="text-sm font-medium text-status-warning-text">Draft Jobs</p>
          <p className="text-2xl font-bold text-foreground">
            {jobs.filter(j => j.status === "Draft").length}
          </p>
        </div>
        <div className="bg-status-neutral-bg border border-status-neutral/20 rounded-lg p-4">
          <p className="text-sm font-medium text-status-neutral-text">Closed Jobs</p>
          <p className="text-2xl font-bold text-foreground">
            {jobs.filter(j => j.status === "Closed").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="section-card">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, ID, or location..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-52">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="section-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Type</th>
                <th>Applications</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td className="font-mono text-xs text-muted-foreground">
                    {job.id}
                  </td>
                  <td>
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.salary}</p>
                  </td>
                  <td>{job.department}</td>
                  <td>{job.location}</td>
                  <td>
                    <Badge variant="secondary" className="font-normal">
                      {job.type}
                    </Badge>
                  </td>
                  <td>
                    <span className="font-semibold text-primary">{job.applications}</span>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(job.deadline).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(job.status)}>
                      {job.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Job
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
