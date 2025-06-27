"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bookmark,
  Plus,
  Search,
  Copy,
  Edit,
  Trash2,
  Tag,
  Clock,
  TrendingUp
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  hashtags: string[];
  platforms: string[];
  created_at: string;
  usage_count: number;
  performance_score?: number;
}

interface ContentTemplatesProps {
  onApplyTemplate?: (template: ContentTemplate) => void;
  onSaveTemplate?: (template: Omit<ContentTemplate, 'id' | 'created_at' | 'usage_count'>) => void;
}

// Mock templates data - in real app this would come from API
const mockTemplates: ContentTemplate[] = [
  {
    id: '1',
    name: 'Product Launch',
    description: 'Template for announcing new product launches',
    category: 'Marketing',
    content: '🚀 Excited to announce our latest [PRODUCT_NAME]! \n\n✨ Key features:\n• [FEATURE_1]\n• [FEATURE_2]\n• [FEATURE_3]\n\nAvailable now at [LINK]. What do you think? 👇',
    hashtags: ['#ProductLaunch', '#Innovation', '#NewProduct'],
    platforms: ['LinkedIn', 'Twitter', 'Facebook'],
    created_at: '2024-06-20',
    usage_count: 15,
    performance_score: 8.5
  },
  {
    id: '2',
    name: 'Behind the Scenes',
    description: 'Show the process behind your work',
    category: 'Engagement',
    content: '👀 Behind the scenes at [COMPANY_NAME]!\n\n[PROCESS_DESCRIPTION]\n\nIt\'s amazing what goes into [END_RESULT]. Our team works hard to [VALUE_PROPOSITION].\n\nWhat would you like to see more of? 💭',
    hashtags: ['#BehindTheScenes', '#TeamWork', '#Process'],
    platforms: ['Instagram', 'LinkedIn', 'Facebook'],
    created_at: '2024-06-18',
    usage_count: 22,
    performance_score: 9.2
  },
  {
    id: '3',
    name: 'Industry Insight',
    description: 'Share valuable industry knowledge',
    category: 'Thought Leadership',
    content: '💡 Industry Insight: [MAIN_INSIGHT]\n\nHere\'s what this means for [TARGET_AUDIENCE]:\n\n1️⃣ [POINT_1]\n2️⃣ [POINT_2]\n3️⃣ [POINT_3]\n\nWhat\'s your take on this trend? Share your thoughts! 🧠',
    hashtags: ['#IndustryInsights', '#ThoughtLeadership', '#Trends'],
    platforms: ['LinkedIn', 'Twitter'],
    created_at: '2024-06-15',
    usage_count: 8,
    performance_score: 7.8
  }
];

const categories = ['All', 'Marketing', 'Engagement', 'Thought Leadership', 'Sales', 'Educational'];

export function ContentTemplates({ onApplyTemplate, onSaveTemplate }: ContentTemplatesProps) {
  const [templates, setTemplates] = useState<ContentTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // New template form state
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: '',
    content: '',
    hashtags: '',
    platforms: [] as string[]
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyTemplate = (template: ContentTemplate) => {
    // Update usage count
    setTemplates(prev => prev.map(t => 
      t.id === template.id 
        ? { ...t, usage_count: t.usage_count + 1 }
        : t
    ));
    onApplyTemplate?.(template);
  };

  const handleCreateTemplate = () => {
    const template = {
      ...newTemplate,
      hashtags: newTemplate.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    
    onSaveTemplate?.(template);
    
    // Add to local state (in real app, this would be handled by API response)
    const newTemplateWithId: ContentTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString().split('T')[0],
      usage_count: 0
    };
    
    setTemplates(prev => [newTemplateWithId, ...prev]);
    setCreateDialogOpen(false);
    setNewTemplate({
      name: '',
      description: '',
      category: '',
      content: '',
      hashtags: '',
      platforms: []
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      'LinkedIn': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Twitter': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
      'Facebook': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Instagram': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Content Templates
          </CardTitle>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>
                  Create a reusable content template for your social media posts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="e.g., Product Launch"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-category">Category</Label>
                    <Select onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== 'All').map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-description">Description</Label>
                  <Input
                    id="template-description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                    placeholder="Brief description of when to use this template"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-content">Content</Label>
                  <Textarea
                    id="template-content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    placeholder="Write your template content here. Use [VARIABLE_NAME] for dynamic content."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template-hashtags">Hashtags</Label>
                  <Input
                    id="template-hashtags"
                    value={newTemplate.hashtags}
                    onChange={(e) => setNewTemplate({...newTemplate, hashtags: e.target.value})}
                    placeholder="Comma-separated hashtags (without #)"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate} disabled={!newTemplate.name || !newTemplate.content}>
                  Create Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No templates found</p>
            <p className="text-sm mt-2">Create your first template to get started</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant="outline">{template.category}</Badge>
                        {template.performance_score && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {template.performance_score}/10
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApplyTemplate(template)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Use
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-sm whitespace-pre-wrap">
                        {template.content.length > 200 
                          ? `${template.content.substring(0, 200)}...` 
                          : template.content
                        }
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {template.hashtags.map((hashtag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {template.platforms.map(platform => (
                          <Badge key={platform} className={`text-xs ${getPlatformColor(platform)}`}>
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Copy className="h-3 w-3" />
                          Used {template.usage_count} times
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {template.created_at}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}