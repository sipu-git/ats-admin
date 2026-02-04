import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
    requirements: "",
    responsibilities: "",
  });

  const handleSubmit = (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    toast({
      title: isDraft ? "Draft Saved" : "Job Posted Successfully",
      description: isDraft 
        ? "Your job posting has been saved as a draft." 
        : "The job posting is now live and accepting applications.",
    });
    navigate("/jobs");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="page-title">Add New Job Post</h1>
          <p className="page-description">
            Create a new job listing to attract qualified candidates.
          </p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)}>
        {/* Basic Information */}
        <div className="section-card mb-6">
          <div className="section-header">
            <h2 className="section-title">Basic Information</h2>
          </div>
          <div className="form-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select onValueChange={(v) => handleChange("department", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="policy">Policy & Planning</SelectItem>
                    <SelectItem value="admin">Administration</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="legal">Legal Affairs</SelectItem>
                    <SelectItem value="research">Research & Analytics</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Washington, D.C."
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Employment Type *</Label>
                <Select onValueChange={(v) => handleChange("type", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Compensation & Timeline */}
        <div className="section-card mb-6">
          <div className="section-header">
            <h2 className="section-title">Compensation & Timeline</h2>
          </div>
          <div className="form-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="e.g., 80000"
                  value={formData.salaryMin}
                  onChange={(e) => handleChange("salaryMin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="e.g., 120000"
                  value={formData.salaryMax}
                  onChange={(e) => handleChange("salaryMax", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleChange("deadline", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="section-card mb-6">
          <div className="section-header">
            <h2 className="section-title">Job Details</h2>
          </div>
          <div className="form-section space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the role, including key objectives and expectations..."
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements & Qualifications *</Label>
              <Textarea
                id="requirements"
                placeholder="List the required qualifications, skills, and experience (one per line)..."
                rows={5}
                value={formData.requirements}
                onChange={(e) => handleChange("requirements", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                placeholder="Outline the main duties and responsibilities of this role (one per line)..."
                rows={5}
                value={formData.responsibilities}
                onChange={(e) => handleChange("responsibilities", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Publish Job Post
          </Button>
        </div>
      </form>
    </div>
  );
}
