﻿using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.Repositories
{
    public class InvoiceRepository : BaseRepository<Invoice>
    {
        public InvoiceRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<List<Invoice>> GetInvoicesWithDetailsAsync(int userId)
        {
            return await _context.Invoices
                .Include(i => i.Client)
                .Include(i => i.Items.OrderBy(item => item.Id))  // Add OrderBy here
                .Where(i => i.UserId == userId)
                .ToListAsync();
        }


        public async Task<Invoice?> GetInvoiceById(int invoiceId) // Add '?' to Invoice
        {
            return await _context.Invoices
                .Where(e => e.Id == invoiceId)
                .Include(i => i.Client)
                .Include(i => i.Items)
                .Include(e=>e.InvoiceTemplate)
                .FirstOrDefaultAsync();
        }





    }
}
