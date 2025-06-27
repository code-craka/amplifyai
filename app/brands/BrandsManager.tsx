"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  Building2,
  Palette,
  FileText
} from 'lucide-react';
import Image from 'next/image';

interface Brand {
  id: string;
  brand_name: string;
  brand_description: string;
  tone_of_voice: string;
  logo_url?: string;
  created_at: string;
}

interface BrandsManagerProps {
  initialBrands: Brand[];
}

export function BrandsManager({ initialBrands }: BrandsManagerProps) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    brand_name: '',
    brand_description: '',
    tone_of_voice: '',
    logo_url: ''
  });

  const supabase = createClient();

  const resetForm = () => {
    setFormData({
      brand_name: '',
      brand_description: '',
      tone_of_voice: '',
      logo_url: ''
    });
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('brands')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      setBrands(prev => [data, ...prev]);
      setShowAddForm(false);
      resetForm();
      toast.success('Brand added successfully!');
    } catch (error: unknown) {
      toast.error(`Failed to add brand: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand.id);
    setFormData({
      brand_name: brand.brand_name,
      brand_description: brand.brand_description,
      tone_of_voice: brand.tone_of_voice,
      logo_url: brand.logo_url || ''
    });
  };

  const handleUpdateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;
    
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('brands')
        .update(formData)
        .eq('id', editingBrand);

      if (error) throw error;

      setBrands(prev => prev.map(brand => 
        brand.id === editingBrand 
          ? { ...brand, ...formData }
          : brand
      ));
      
      setEditingBrand(null);
      resetForm();
      toast.success('Brand updated successfully!');
    } catch (error: unknown) {
      toast.error(`Failed to update brand: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (!confirm('Are you sure you want to delete this brand? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);

      if (error) throw error;

      setBrands(prev => prev.filter(brand => brand.id !== brandId));
      toast.success('Brand deleted successfully!');
    } catch (error: unknown) {
      toast.error(`Failed to delete brand: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should be less than 5MB');
      return;
    }

    setIsLoading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `brand-logos/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('brand-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brand-assets')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      toast.success('Logo uploaded successfully!');
    } catch (error: unknown) {
      toast.error(`Failed to upload logo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const BrandForm = ({ isEditing = false }) => (
    <form onSubmit={isEditing ? handleUpdateBrand : handleAddBrand} className="space-y-4">
      <div>
        <Label htmlFor="brand_name">Brand Name *</Label>
        <Input
          id="brand_name"
          value={formData.brand_name}
          onChange={(e) => setFormData(prev => ({ ...prev, brand_name: e.target.value }))}
          placeholder="Enter brand name"
          required
        />
      </div>

      <div>
        <Label htmlFor="brand_description">Brand Description *</Label>
        <Textarea
          id="brand_description"
          value={formData.brand_description}
          onChange={(e) => setFormData(prev => ({ ...prev, brand_description: e.target.value }))}
          placeholder="Describe your brand, its mission, values, and what makes it unique..."
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="tone_of_voice">Tone of Voice *</Label>
        <Textarea
          id="tone_of_voice"
          value={formData.tone_of_voice}
          onChange={(e) => setFormData(prev => ({ ...prev, tone_of_voice: e.target.value }))}
          placeholder="Describe the tone and style for your brand's communication (e.g., friendly, professional, witty, authoritative...)"
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="logo_upload">Brand Logo (Optional)</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              id="logo_upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="flex-1"
            />
            <Button type="button" variant="outline" size="sm">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
          {formData.logo_url && (
            <div className="flex items-center gap-2">
              <Image 
                src={formData.logo_url} 
                alt="Logo preview" 
                width={32}
                height={32}
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-sm text-green-600">Logo uploaded</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : (isEditing ? 'Update Brand' : 'Add Brand')}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            if (isEditing) {
              setEditingBrand(null);
            } else {
              setShowAddForm(false);
            }
            resetForm();
          }}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {/* Add Brand Button */}
      {!showAddForm && !editingBrand && (
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Brand
        </Button>
      )}

      {/* Add Brand Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Brand</CardTitle>
          </CardHeader>
          <CardContent>
            <BrandForm />
          </CardContent>
        </Card>
      )}

      {/* Brands Grid */}
      {brands.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No brands yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              Create your first brand to start generating consistent AI content
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Brand
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Card key={brand.id} className="hover:shadow-md transition-shadow">
              {editingBrand === brand.id ? (
                <CardContent className="p-6">
                  <BrandForm isEditing />
                </CardContent>
              ) : (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {brand.logo_url ? (
                          <Image 
                            src={brand.logo_url} 
                            alt={`${brand.brand_name} logo`}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{brand.brand_name}</CardTitle>
                          <p className="text-xs text-gray-500">
                            Created {new Date(brand.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditBrand(brand)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteBrand(brand.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <FileText className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-medium text-gray-600">Description</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {brand.brand_description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Palette className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-medium text-gray-600">Tone of Voice</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {brand.tone_of_voice}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline">
                        {brand.logo_url ? 'Logo Added' : 'No Logo'}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        ID: {brand.id.slice(0, 8)}...
                      </span>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}