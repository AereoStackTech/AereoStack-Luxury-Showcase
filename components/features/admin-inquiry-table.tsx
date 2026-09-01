'use client';

import * as React from 'react';
import { updateInquiryStatusAction } from '@/app/actions/inquiry';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Search, Filter, CheckCircle2, Clock, Eye, AlertCircle, Phone, Mail, FileText, Loader2 } from 'lucide-react';
import type { LuxuryInquiry } from '@/lib/db';
import { cn } from '@/lib/utils';

export function AdminInquiryTable({
  initialInquiries,
}: {
  initialInquiries: LuxuryInquiry[];
}) {
  const [inquiries, setInquiries] = React.useState<LuxuryInquiry[]>(initialInquiries);
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedInquiry, setSelectedInquiry] = React.useState<LuxuryInquiry | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [advisorNotes, setAdvisorNotes] = React.useState<string>('');

  const filteredInquiries = React.useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === 'ALL' || inq.status === statusFilter;
      const matchesSearch =
        inq.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (inq.productItem?.title && inq.productItem.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  const handleStatusChange = async (
    id: string,
    newStatus: 'PENDING' | 'REVIEWED' | 'RESOLVED',
    notes?: string
  ) => {
    setUpdatingId(id);
    const result = await updateInquiryStatusAction({
      id,
      status: newStatus,
      notes: notes !== undefined ? notes : undefined,
    });
    setUpdatingId(null);

    if (result.success) {
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus, notes: notes ?? item.notes } : item
        )
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus, notes: notes ?? prev.notes } : null));
      }
    }
  };

  const statusBadge = (status: 'PENDING' | 'REVIEWED' | 'RESOLVED') => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
            <Clock className="w-3 h-3" /> Awaiting Review
          </span>
        );
      case 'REVIEWED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
            <Eye className="w-3 h-3" /> Advisor Assigned
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
            <CheckCircle2 className="w-3 h-3" /> Concluded
          </span>
        );
    }
  };

  const formatDate = (d: Date | string) => {
    return new Date(d).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#FFFFFF] p-4 border border-[#E5E2DB]">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'PENDING', 'REVIEWED', 'RESOLVED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 text-xs uppercase tracking-wider font-medium border transition-colors whitespace-nowrap',
                statusFilter === st
                  ? 'bg-[#111111] text-[#FAF9F6] border-[#111111]'
                  : 'bg-[#FAF9F6] text-[#666666] border-[#E5E2DB] hover:border-[#111111] hover:text-[#111111]'
              )}
            >
              {st === 'ALL' ? `All Inquiries (${inquiries.length})` : st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Search client, email, creation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full pl-9 pr-3 text-xs bg-[#FAF9F6] border border-[#E5E2DB] text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111]"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      {filteredInquiries.length === 0 ? (
        <div className="py-20 bg-[#FFFFFF] border border-[#E5E2DB] text-center p-8 flex flex-col items-center space-y-3">
          <FileText className="w-8 h-8 text-[#888888]" />
          <h4 className="text-base font-serif text-[#111111]">No Inquiries Located</h4>
          <p className="text-xs text-[#737373]">
            There are currently no client consultation records matching this status or query.
          </p>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E5E2DB] overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E2DB] bg-[#FAF9F6] text-[10px] uppercase tracking-[0.2em] text-[#737373] font-medium">
                <th className="py-3.5 px-6">Client / Contact</th>
                <th className="py-3.5 px-6">Creation / Focus</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Received</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E2DB] text-xs">
              {filteredInquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="hover:bg-[#FAF9F6] transition-colors group cursor-pointer"
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    setAdvisorNotes(inquiry.notes || '');
                  }}
                >
                  <td className="py-4 px-6">
                    <div className="font-serif text-sm font-medium text-[#111111]">
                      {inquiry.clientName}
                    </div>
                    <div className="text-[11px] text-[#737373] flex items-center gap-1 pt-0.5">
                      <Mail className="w-3 h-3" /> {inquiry.clientEmail}
                    </div>
                    {inquiry.phone && (
                      <div className="text-[11px] text-[#737373] flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {inquiry.phone}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-6 max-w-xs">
                    {inquiry.productItem ? (
                      <span className="font-medium text-[#111111] block truncate">
                        {inquiry.productItem.title}
                      </span>
                    ) : (
                      <span className="text-[#888888] italic">Bespoke Atelier Consultation</span>
                    )}
                    <span className="text-[11px] text-[#555555] line-clamp-1 mt-0.5">
                      {inquiry.message}
                    </span>
                  </td>

                  <td className="py-4 px-6 whitespace-nowrap">
                    {statusBadge(inquiry.status)}
                  </td>

                  <td className="py-4 px-6 text-[#737373] whitespace-nowrap text-[11px]">
                    {formatDate(inquiry.createdAt)}
                  </td>

                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInquiry(inquiry);
                        setAdvisorNotes(inquiry.notes || '');
                      }}
                      className="px-3 py-1.5 bg-[#111111] text-[#FAF9F6] text-[10px] uppercase tracking-wider font-medium hover:bg-[#262626] transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      <Dialog
        open={!!selectedInquiry}
        onOpenChange={(open) => {
          if (!open) setSelectedInquiry(null);
        }}
      >
        <DialogContent className="max-w-2xl bg-[#FAF9F6]">
          {selectedInquiry && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                    Inquiry Dossier #{selectedInquiry.id.slice(-6)}
                  </span>
                  {statusBadge(selectedInquiry.status)}
                </div>
                <DialogTitle className="text-2xl font-serif">
                  {selectedInquiry.clientName}
                </DialogTitle>
                <DialogDescription>
                  Submitted on {formatDate(selectedInquiry.createdAt)}
                </DialogDescription>
              </DialogHeader>

              {/* Client Contact Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FFFFFF] border border-[#E5E2DB] text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                    Client Email
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.clientEmail}`}
                    className="text-[#111111] hover:underline font-medium"
                  >
                    {selectedInquiry.clientEmail}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                    Telephone / Mobile
                  </span>
                  <span className="text-[#111111] font-medium">
                    {selectedInquiry.phone || 'Not provided'}
                  </span>
                </div>
                {selectedInquiry.productItem && (
                  <div className="sm:col-span-2 pt-2 border-t border-[#E5E2DB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                      Referenced Piece
                    </span>
                    <span className="font-serif text-sm text-[#111111]">
                      {selectedInquiry.productItem.title} (${selectedInquiry.productItem.price.toLocaleString()})
                    </span>
                  </div>
                )}
              </div>

              {/* Message Payload */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#737373] font-medium block">
                  Client Message
                </span>
                <div className="p-4 bg-[#FFFFFF] border border-[#E5E2DB] text-xs sm:text-sm text-[#333333] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Internal Curator Notes */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#737373] font-medium block">
                  Curator Internal Notes & Assignment
                </span>
                <textarea
                  value={advisorNotes}
                  onChange={(e) => setAdvisorNotes(e.target.value)}
                  placeholder="Record advisor assignments, viewing appointments, or bespoke quotation records..."
                  rows={3}
                  className="w-full bg-[#FFFFFF] p-3 text-xs border border-[#E5E2DB] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {/* Status Mutation Actions */}
              <div className="pt-4 border-t border-[#E5E2DB] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-[#737373]">
                  Update Status:
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === 'PENDING' ? 'default' : 'outline'}
                    disabled={updatingId === selectedInquiry.id}
                    onClick={() => handleStatusChange(selectedInquiry.id, 'PENDING', advisorNotes)}
                  >
                    Pending
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === 'REVIEWED' ? 'default' : 'outline'}
                    disabled={updatingId === selectedInquiry.id}
                    onClick={() => handleStatusChange(selectedInquiry.id, 'REVIEWED', advisorNotes)}
                  >
                    Advisor Assigned
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedInquiry.status === 'RESOLVED' ? 'gold' : 'outlineGold'}
                    disabled={updatingId === selectedInquiry.id}
                    onClick={() => handleStatusChange(selectedInquiry.id, 'RESOLVED', advisorNotes)}
                  >
                    Resolved / Concluded
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
