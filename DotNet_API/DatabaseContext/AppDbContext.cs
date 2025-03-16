using DotNet_API.DataModels;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.DatabaseContext
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options)
         : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<InvoiceItem> InvoiceItems { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<InvoiceTemplate> InvoiceTemplates { get; set; }

        public DbSet<EmailSettings> EmailSettings { get; set; }


        public DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example: Configuring an entity
         
        }
    }
}
