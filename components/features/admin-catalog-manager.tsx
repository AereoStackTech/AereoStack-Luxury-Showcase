'use client';

import * as React from 'react';
import Image from 'next/image';
import { createProductAction, deleteProductAction, createFAQAction, deleteFAQAction } from '@/app/actions/catalog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Trash2, Edit3, ExternalLink, Sparkles, Loader2, HelpCircle } from 'lucide-react';
import type { LuxuryProductItem, LuxuryCategory, LuxuryFAQ } from '@/lib/db';
import Link from 'next/link';

export function AdminCatalogManager({
  products: initialProducts,
  categories,
  faqs: initialFaqs,
}: {
  products: LuxuryProductItem[];
  categories: LuxuryCategory[];
  faqs: LuxuryFAQ[];
}) {
  const [products, setProducts] = React.useState<LuxuryProductItem[]>(initialProducts);
  const [faqs, setFaqs] = React.useState<LuxuryFAQ[]>(initialFaqs);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Form State for new creation
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [subtitle, setSubtitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [categoryId, setCategoryId] = React.useState(categories[0]?.id || '');
  const [imageUrls, setImageUrls] = React.useState('');
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [materials, setMaterials] = React.useState('');
  const [leadTime, setLeadTime] = React.useState('');

  // Form State for FAQ
  const [faqQuestion, setFaqQuestion] = React.useState('');
  const [faqAnswer, setFaqAnswer] = React.useState('');

  // Auto generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    );
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('images', imageUrls);
    formData.append('isFeatured', isFeatured ? 'true' : 'false');
    formData.append('materials', materials);
    formData.append('leadTime', leadTime);

    const result = await createProductAction(formData);
    setIsPending(false);

    if (result.success && result.data) {
      setProducts((prev) => [result.data as LuxuryProductItem, ...prev]);
      setIsAddModalOpen(false);
      // Reset form
      setTitle('');
      setSlug('');
      setSubtitle('');
      setDescription('');
      setPrice('');
      setImageUrls('');
      setIsFeatured(false);
      setMaterials('');
      setLeadTime('');
    } else {
      setErrorMessage(result.message || 'Error creating product.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you wish to decommission this catalog piece?')) return;
    const result = await deleteProductAction(id);
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append('question', faqQuestion);
    formData.append('answer', faqAnswer);
    formData.append('order', String(faqs.length + 1));

    const result = await createFAQAction(formData);
    setIsPending(false);
    if (result.success && result.data) {
      setFaqs((prev) => [...prev, result.data as LuxuryFAQ]);
      setIsFaqModalOpen(false);
      setFaqQuestion('');
      setFaqAnswer('');
    }
  };

  const handleDeleteFaq = async (id: string) => {
    const result = await deleteFAQAction(id);
    if (result.success) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-12">
      {/* Products Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif text-[#111111]">
              Catalog Inventory ({products.length} Items)
            </h3>
            <p className="text-xs text-[#737373]">
              Manage pieces, specifications, imagery, and boutique availability.
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Creation
          </Button>
        </div>

        {/* Product Grid Table */}
        <div className="bg-[#FFFFFF] border border-[#E5E2DB] overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E5E2DB] bg-[#FAF9F6] text-[10px] uppercase tracking-[0.2em] text-[#737373]">
                <th className="py-3.5 px-6">Piece</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Price (USD)</th>
                <th className="py-3.5 px-6">Featured</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DB]">
              {products.map((product) => {
                const cat = categories.find((c) => c.id === product.categoryId);
                const thumb = product.images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=85';
                return (
                  <tr key={product.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 bg-[#F4F1EA] border border-[#E5E2DB] shrink-0 overflow-hidden">
                          <Image
                            src={thumb}
                            alt={product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="font-serif text-sm text-[#111111] font-medium">
                            {product.title}
                          </div>
                          <span className="text-[11px] text-[#737373]">
                            /{product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-[#555555]">
                      {cat?.name || 'Uncategorized'}
                    </td>

                    <td className="py-4 px-6 font-serif text-sm font-medium text-[#111111]">
                      ${product.price.toLocaleString()}
                    </td>

                    <td className="py-4 px-6">
                      {product.isFeatured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase font-medium bg-[#111111] text-[#C5A880]">
                          <Sparkles className="w-2.5 h-2.5" /> Featured
                        </span>
                      ) : (
                        <span className="text-[#888888]">Standard</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/catalog/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#737373] hover:text-[#111111] border border-[#E5E2DB] hover:border-[#111111]"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 border border-[#E5E2DB] hover:border-red-600"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs Manager Section */}
      <div className="space-y-6 pt-8 border-t border-[#E5E2DB]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif text-[#111111]">
              Client Care & FAQs ({faqs.length} Entries)
            </h3>
            <p className="text-xs text-[#737373]">
              Curate frequently asked questions regarding authentication, provenance, and delivery.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFaqModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add FAQ Entry
          </Button>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E2DB] divide-y divide-[#E5E2DB]">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-6 flex items-start justify-between gap-4">
              <div className="space-y-1 max-w-3xl">
                <h4 className="font-serif text-base text-[#111111] font-medium">
                  {faq.question}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
              <button
                onClick={() => handleDeleteFaq(faq.id)}
                className="p-2 text-red-600 hover:text-red-800 border border-[#E5E2DB] hover:border-red-600 shrink-0"
                title="Delete FAQ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl bg-[#FAF9F6]">
          <DialogHeader>
            <DialogTitle>Commission New Catalog Piece</DialogTitle>
            <DialogDescription>
              Introduce a new timepiece, leathercraft item, or private sanctuary journey to the showcase.
            </DialogDescription>
          </DialogHeader>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-xs text-red-700 border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#555555] font-medium block">
                  Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Celestial Chronograph"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#555555] font-medium block">
                  URL Slug *
                </label>
                <Input
                  required
                  placeholder="celestial-chronograph"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#555555] font-medium block">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full h-11 px-3 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111111]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#555555] font-medium block">
                  Price (USD) *
                </label>
                <Input
                  type="number"
                  required
                  placeholder="45000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#555555] font-medium block">
                Subtitle / Edition Tagline
              </label>
              <Input
                placeholder="e.g. Limited Edition of 20 Pieces worldwide"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#555555] font-medium block">
                Description *
              </label>
              <Textarea
                required
                rows={3}
                placeholder="Narrative description detailing the craftsmanship and heritage of this creation..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#555555] font-medium block">
                  Artisanal Materials
                </label>
                <Input
                  placeholder="e.g. 18k Rose Gold, Grand Feu Enamel"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="uppercase tracking-wider text-[#555555] font-medium block">
                  Lead Time / Commission Terms
                </label>
                <Input
                  placeholder="e.g. Handcrafted in 4 weeks"
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#555555] font-medium block">
                High-Resolution Image URLs (one per line)
              </label>
              <Textarea
                rows={3}
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured-checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 accent-[#111111]"
              />
              <label htmlFor="isFeatured-checkbox" className="text-xs text-[#111111] font-medium">
                Feature on Homepage & Editorial Banner
              </label>
            </div>

            <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Publishing...' : 'Publish to Catalog'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add FAQ Modal */}
      <Dialog open={isFaqModalOpen} onOpenChange={setIsFaqModalOpen}>
        <DialogContent className="max-w-lg bg-[#FAF9F6]">
          <DialogHeader>
            <DialogTitle>Add Client FAQ</DialogTitle>
            <DialogDescription>
              Answer common client queries regarding bespoke commissions or delivery.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateFaq} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#555555] font-medium block">
                Question *
              </label>
              <Input
                required
                placeholder="e.g. How are commissions insured during global transit?"
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="uppercase tracking-wider text-[#555555] font-medium block">
                Answer *
              </label>
              <Textarea
                required
                rows={4}
                placeholder="Comprehensive, reassuring answer outlining maison protocols..."
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
              />
            </div>
            <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsFaqModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Add FAQ'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
